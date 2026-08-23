import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLiveMap } from "@/components/maps/google-live-map";
import { Database } from "@/integrations/supabase/types";

type Bus = Database["public"]["Tables"]["buses"]["Row"];

export function StudentDashboard({ bus }: { bus?: Bus }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="h-[500px] shadow-sm rounded-[2rem] overflow-hidden">
          <CardHeader className="absolute z-10 p-6">
            <CardTitle className="font-display text-2xl font-bold">Live Bus Location</CardTitle>
          </CardHeader>
          <div className="w-full h-full">
            <GoogleLiveMap 
              buses={bus ? [{
                id: bus.id,
                busNumber: bus.bus_number,
                location: { lat: 24.8949, lng: 89.3758 }, // Demo loc
              }] : []}
            />
          </div>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-lg">Your Bus</CardTitle>
          </CardHeader>
          <CardContent>
            {bus ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{bus.bus_number}</p>
                  <p className="text-sm text-slate-500">Route: {bus.route_name}</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {bus.bus_number}
                </div>
              </div>
            ) : (
              <p className="text-slate-500 italic">No bus assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
