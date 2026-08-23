import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const updateBusLocation = createServerFn({ method: "POST" })
  .validator((data: { tripId: string; lat: number; lng: number }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("trips")
      .update({
        current_lat: data.lat,
        current_lng: data.lng,
      })
      .eq("id", data.tripId);

    if (error) throw error;
    return { success: true };
  });

export const updateOccupancy = createServerFn({ method: "POST" })
  .validator((data: { tripId: string; occupancy: "low" | "medium" | "high" }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("trips")
      .update({
        occupancy: data.occupancy,
      })
      .eq("id", data.tripId);

    if (error) throw error;
    return { success: true };
  });

