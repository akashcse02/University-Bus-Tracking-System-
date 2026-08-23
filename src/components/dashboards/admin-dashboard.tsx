import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLiveMap } from "@/components/maps/google-live-map";
import { 
  Users, 
  Bus, 
  MapPin, 
  AlertCircle, 
  TrendingUp,
  BarChart3,
  Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type BusRow = Database["public"]["Tables"]["buses"]["Row"];
type TripRow = Database["public"]["Tables"]["trips"]["Row"];

export function AdminDashboard() {
  const [buses, setBuses] = useState<BusRow[]>([]);
  const [activeTrips, setActiveTrips] = useState<TripRow[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDrivers: 0,
    activeBuses: 0,
    reportedIssues: 0
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      const [
        { data: busesData },
        { data: tripsData },
        { count: studentsCount },
        { count: driversCount },
        { count: issuesCount }
      ] = await Promise.all([
        supabase.from("buses").select("*"),
        supabase.from("trips").select("*").eq("status", "in_progress"),
        supabase.from("user_roles").select("*", { count: 'exact', head: true }).eq("role", "student"),
        supabase.from("user_roles").select("*", { count: 'exact', head: true }).eq("role", "driver"),
        supabase.from("issues").select("*", { count: 'exact', head: true }).eq("status", "pending"),
      ]);

      if (busesData) setBuses(busesData);
      if (tripsData) setActiveTrips(tripsData);
      setStats({
        totalStudents: studentsCount || 0,
        totalDrivers: driversCount || 0,
        activeBuses: tripsData?.length || 0,
        reportedIssues: issuesCount || 0
      });
    };

    fetchAdminData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="blue" />
        <StatCard title="Active Drivers" value={stats.totalDrivers} icon={MapPin} color="green" />
        <StatCard title="Buses in Motion" value={stats.activeBuses} icon={Bus} color="orange" />
        <StatCard title="Pending Issues" value={stats.reportedIssues} icon={AlertCircle} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[600px] rounded-[2.5rem] overflow-hidden border-none shadow-xl ring-1 ring-black/5 bg-white">
          <CardHeader className="absolute z-10 p-8">
            <CardTitle className="font-display text-2xl font-black">Fleet Overview</CardTitle>
            <p className="text-sm text-ink/40 font-medium">Real-time tracking of all active university buses.</p>
          </CardHeader>
          <div className="w-full h-full">
            <GoogleLiveMap 
              buses={activeTrips.map(trip => ({
                id: trip.id,
                busNumber: buses.find(b => b.id === trip.bus_id)?.bus_number || '?',
                location: { lat: trip.current_lat || 24.8949, lng: trip.current_lng || 89.3758 },
                occupancy: trip.occupancy || 'low'
              }))}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-xl ring-1 ring-black/5 bg-white p-6">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-4 h-[200px] flex items-center justify-center text-ink/20">
              <BarChart3 className="h-16 w-16" />
              <p className="ml-4 font-bold uppercase tracking-widest text-[10px]">Data loading...</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-xl ring-1 ring-black/5 bg-slate-900 text-white p-6">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" /> System Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3">
               <AdminButton label="Manage Users" />
               <AdminButton label="Schedule Editor" />
               <AdminButton label="Maintenance Logs" />
               <AdminButton label="Broadcast Alert" variant="danger" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    green: "bg-green-50 text-green-600 ring-green-100",
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
    red: "bg-red-50 text-red-600 ring-red-100",
  };
  
  return (
    <Card className="rounded-3xl border-none shadow-sm ring-1 ring-black/5 p-6 hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ring-1 ${colors[color as keyof typeof colors]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-ink/40 uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-black text-ink">{value}</p>
        </div>
      </div>
    </Card>
  );
}

function AdminButton({ label, variant }: any) {
  return (
    <button className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-between group ${
      variant === 'danger' ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
    }`}>
      {label}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </button>
  );
}
