import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { LivePositions } from "@/lib/bus-fleet";

/** "Bus 01" | "01" | "PUB-01" -> "bus-01" so live GPS maps onto our fleet list. */
export function fleetIdFromBusNumber(busNumber: string | null | undefined): string | null {
  if (!busNumber) return null;
  const match = busNumber.match(/(\d{1,2})\s*$/);
  if (!match) return null;
  return `bus-${match[1]!.padStart(2, "0")}`;
}

/**
 * Live GPS feed. Empty until a driver starts a trip and broadcasts coordinates;
 * markers then switch from their default campus position automatically.
 */
export function useLiveBusPositions() {
  const [positions, setPositions] = useState<LivePositions>({});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data } = await supabase
        .from("trips")
        .select("bus_id, current_lat, current_lng, status, buses(bus_number)")
        .in("status", ["in_progress", "delayed"]);

      if (cancelled || !data) return;
      const next: LivePositions = {};
      for (const trip of data as Array<Record<string, any>>) {
        const id = fleetIdFromBusNumber(trip['buses']?.bus_number);
        const lat = trip['current_lat'];
        const lng = trip['current_lng'];
        if (id && typeof lat === "number" && typeof lng === "number") {
          next[id] = { lat, lng, updatedAt: new Date().toISOString() };
        }
      }
      setPositions(next);
    };

    void load();

    const channel = supabase
      .channel("live-bus-positions")
      .on("postgres_changes", { event: "*", schema: "public", table: "trips" }, () => {
        void load();
      })
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  return positions;
}
