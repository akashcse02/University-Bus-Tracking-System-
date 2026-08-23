import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const updateBusLocation = createServerFn({ method: "POST" })
  .input((data: { tripId: string; lat: number; lng: number }) => data)
  .handler(async ({ input }) => {
    const { error } = await supabase
      .from("trips")
      .update({
        current_lat: input.lat,
        current_lng: input.lng,
      })
      .eq("id", input.tripId);

    if (error) throw error;
    return { success: true };
  });

export const updateOccupancy = createServerFn({ method: "POST" })
  .input((data: { tripId: string; occupancy: "low" | "medium" | "high" }) => data)
  .handler(async ({ input }) => {
    const { error } = await supabase
      .from("trips")
      .update({
        occupancy: input.occupancy,
      })
      .eq("id", input.tripId);

    if (error) throw error;
    return { success: true };
  });
