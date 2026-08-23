import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Trip = Database["public"]["Tables"]["trips"]["Row"];

export function useBusTracking(busId?: string) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!busId) return;

    // Fetch initial trip data
    const fetchTrip = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("bus_id", busId)
        .eq("status", "in_progress")
        .maybeSingle();

      if (!error && data) {
        setTrip(data);
      }
      setIsLoading(false);
    };

    fetchTrip();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`bus-${busId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "trips",
          filter: `bus_id=eq.${busId}`,
        },
        (payload) => {
          setTrip(payload.new as Trip);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [busId]);

  return { trip, isLoading };
}
