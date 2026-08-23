import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Square, AlertTriangle, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { updateBusLocation, updateOccupancy } from "@/lib/location.functions";

export function DriverDashboard({ driverId }: { driverId: string }) {
  const [isTripActive, setIsTripActive] = useState(false);
  const [currentTripId, setCurrentTripId] = useState<string | null>(null);
  const [occupancy, setOccupancy] = useState<"low" | "medium" | "high">("low");
  const [locationInterval, setLocationInterval] = useState<NodeJS.Timeout | null>(null);

  const startTrip = async () => {
    try {
      // For demo, we'll pick the first available bus/route
      const { data: bus } = await supabase.from("buses").select("id, current_route_id").limit(1).single();
      
      if (!bus || !bus.current_route_id) {
        toast.error("No bus or route assigned");
        return;
      }

      const { data: trip, error } = await supabase
        .from("trips")
        .insert({
          bus_id: bus.id,
          driver_id: driverId,
          route_id: bus.current_route_id,
          status: "in_progress",
          start_time: new Date().toISOString(),
          occupancy: "low",
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentTripId(trip.id);
      setIsTripActive(true);
      toast.success("Trip Started! Location broadcasting active.");

      // Start location broadcasting
      const interval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            await updateBusLocation({
              data: {
                tripId: trip.id,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
            });
          });

        }
      }, 15000); // Every 15s

      setLocationInterval(interval);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const endTrip = async () => {
    if (!currentTripId) return;
    
    try {
      const { error } = await supabase
        .from("trips")
        .update({ status: "completed", end_time: new Date().toISOString() })
        .eq("id", currentTripId);

      if (error) throw error;

      if (locationInterval) clearInterval(locationInterval);
      setIsTripActive(false);
      setCurrentTripId(null);
      toast.success("Trip Completed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleOccupancyChange = async (level: "low" | "medium" | "high") => {
    setOccupancy(level);
    if (currentTripId) {
      await updateOccupancy({ data: { tripId: currentTripId, occupancy: level } });
    }

  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="rounded-[2rem] shadow-sm border-none bg-white p-6">
        <CardHeader className="px-0">
          <CardTitle className="font-display text-2xl flex items-center gap-2">
            <Play className={`h-6 w-6 ${isTripActive ? 'text-green-500' : 'text-slate-300'}`} />
            Trip Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-8">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="font-bold text-ink">Trip Status</p>
              <p className="text-sm text-ink/60">{isTripActive ? "Broadcasting GPS..." : "Ready to start"}</p>
            </div>
            <Switch 
              checked={isTripActive} 
              onCheckedChange={(val) => val ? startTrip() : endTrip()} 
            />
          </div>

          <div className="space-y-4">
            <Label className="font-bold flex items-center gap-2">
              <Users className="h-4 w-4" /> Bus Occupancy
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <Button
                  key={level}
                  variant={occupancy === level ? "default" : "outline"}
                  className={`rounded-xl capitalize font-bold h-12 transition-all ${
                    occupancy === level ? 'bg-primary shadow-lg scale-105' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleOccupancyChange(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            variant="destructive" 
            className="w-full h-14 rounded-xl font-bold flex items-center gap-2 shadow-lg"
            onClick={() => toast.warning("Emergency Alert Sent to Admin")}
          >
            <AlertTriangle className="h-5 w-5" /> SOS / Emergency
          </Button>
        </CardContent>
      </Card>
      
      {/* Route Info Card */}
      <Card className="rounded-[2rem] shadow-sm border-none bg-slate-900 text-white p-6">
        <CardHeader className="px-0">
          <CardTitle className="font-display text-2xl">Current Route</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl">1</div>
              <div>
                <p className="font-bold">Campus Main</p>
                <p className="text-sm text-white/60">Next Stop: Administrative Building</p>
              </div>
            </div>
            {/* Add more route steps here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
