import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleLiveMap } from "@/components/maps/google-live-map";
import { MapSettingsPanel } from "@/components/admin/map-settings-panel";
import { RoutesEditor } from "@/components/admin/routes-editor";
import { MapsKeyPanel } from "@/components/admin/maps-key-panel";
import {
  Users,
  Bus,
  MapPin,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Star,
  Check,
  EyeOff,
  Trash2,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useLanguage } from "@/lib/i18n";

type BusRow = Database["public"]["Tables"]["buses"]["Row"];
type TripRow = Database["public"]["Tables"]["trips"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
type ClassRow = Database["public"]["Tables"]["class_schedules"]["Row"] & { approved?: boolean };
type AppRole = Database["public"]["Enums"]["app_role"];

const ROLES: AppRole[] = ["student", "teacher", "driver", "admin"];

export function AdminDashboard() {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="overview" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1 lg:grid-cols-5">
        <TabsTrigger value="overview" className="rounded-xl font-bold">
          {t("admin.tab.overview")}
        </TabsTrigger>
        <TabsTrigger value="users" className="rounded-xl font-bold">
          {t("admin.tab.users")}
        </TabsTrigger>
        <TabsTrigger value="reviews" className="rounded-xl font-bold">
          {t("admin.tab.reviews")}
        </TabsTrigger>
        <TabsTrigger value="schedules" className="rounded-xl font-bold">
          {t("admin.tab.schedules")}
        </TabsTrigger>
        <TabsTrigger value="config" className="rounded-xl font-bold">
          {t("admin.tab.config")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <Overview />
      </TabsContent>
      <TabsContent value="users">
        <UserManagement />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewModeration />
      </TabsContent>
      <TabsContent value="schedules">
        <ScheduleApproval />
      </TabsContent>
      <TabsContent value="config">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <MapSettingsPanel />
            <RoutesEditor />
          </div>
          <MapsKeyPanel />
        </div>
      </TabsContent>
    </Tabs>
  );
}

/* ---------------------------------- Overview --------------------------------- */

function Overview() {
  const [buses, setBuses] = useState<BusRow[]>([]);
  const [activeTrips, setActiveTrips] = useState<TripRow[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDrivers: 0,
    activeBuses: 0,
    reportedIssues: 0,
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      const [
        { data: busesData },
        { data: tripsData },
        { count: studentsCount },
        { count: driversCount },
        { count: issuesCount },
      ] = await Promise.all([
        supabase.from("buses").select("*"),
        supabase.from("trips").select("*").eq("status", "in_progress"),
        supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "student"),
        supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "driver"),
        supabase.from("issues").select("*", { count: "exact", head: true }).eq("status", "pending"),
      ]);

      if (busesData) setBuses(busesData);
      if (tripsData) setActiveTrips(tripsData);
      setStats({
        totalStudents: studentsCount || 0,
        totalDrivers: driversCount || 0,
        activeBuses: tripsData?.length || 0,
        reportedIssues: issuesCount || 0,
      });
    };

    void fetchAdminData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="blue" />
        <StatCard title="Active Drivers" value={stats.totalDrivers} icon={MapPin} color="green" />
        <StatCard title="Buses in Motion" value={stats.activeBuses} icon={Bus} color="orange" />
        <StatCard title="Pending Issues" value={stats.reportedIssues} icon={AlertCircle} color="red" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="h-[600px] overflow-hidden rounded-[2.5rem] border-none bg-white shadow-xl ring-1 ring-black/5 lg:col-span-2">
          <CardHeader className="absolute z-10 p-8">
            <CardTitle className="font-display text-2xl font-black">Fleet Overview</CardTitle>
            <p className="text-sm font-medium text-ink/40">
              Real-time tracking of all active university buses.
            </p>
          </CardHeader>
          <div className="h-full w-full">
            <GoogleLiveMap
              buses={activeTrips.map((trip) => ({
                id: trip.id,
                busNumber: buses.find((b) => b.id === trip.bus_id)?.bus_number || "?",
                location: {
                  lat: trip.current_lat || 24.9223067,
                  lng: trip.current_lng || 89.3490259,
                },
                occupancy: trip.occupancy || "low",
              }))}
            />
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none bg-white p-6 shadow-xl ring-1 ring-black/5">
          <CardHeader className="px-0">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <TrendingUp className="h-5 w-5 text-primary" /> Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-[200px] items-center justify-center px-0 pt-4 text-ink/20">
            <BarChart3 className="h-16 w-16" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------ User management ------------------------------ */

function UserManagement() {
  const { t } = useLanguage();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [roles, setRoles] = useState<Record<string, AppRole>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [{ data: profileData }, { data: roleData }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    setProfiles(profileData ?? []);
    const map: Record<string, AppRole> = {};
    (roleData ?? []).forEach((r) => {
      map[r.user_id] = r.role;
    });
    setRoles(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const changeRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
    if (error) {
      toast.error(t("admin.failed"));
      return;
    }
    // Keep a single role per person.
    await supabase.from("user_roles").delete().eq("user_id", userId).neq("role", role);
    setRoles((prev) => ({ ...prev, [userId]: role }));
    toast.success(t("admin.users.updated"));
  };

  return (
    <Card className="rounded-[2.5rem] border-none bg-white shadow-xl ring-1 ring-black/5">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-black">{t("admin.users.title")}</CardTitle>
        <p className="text-sm font-medium text-ink/40">{t("admin.users.sub")}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="italic text-ink/50">{t("common.loading")}</p>
        ) : profiles.length === 0 ? (
          <p className="italic text-ink/50">{t("admin.users.none")}</p>
        ) : (
          <div className="space-y-3">
            {profiles.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-5 py-4"
              >
                <div>
                  <p className="font-display font-black text-ink">{p.full_name}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/40">
                    {p.department || t("admin.users.dept")}
                  </p>
                </div>
                <Select
                  value={roles[p.id] ?? "student"}
                  onValueChange={(v) => changeRole(p.id, v as AppRole)}
                >
                  <SelectTrigger className="w-44 rounded-xl bg-white">
                    <SelectValue placeholder={t("admin.users.role")} />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ----------------------------- Review moderation ----------------------------- */

function ReviewModeration() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setApproved = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
    if (error) {
      toast.error(t("admin.failed"));
      return;
    }
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
    toast.success(t("admin.updated"));
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error(t("admin.failed"));
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success(t("admin.updated"));
  };

  return (
    <Card className="rounded-[2.5rem] border-none bg-white shadow-xl ring-1 ring-black/5">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-black">
          {t("admin.reviews.title")}
        </CardTitle>
        <p className="text-sm font-medium text-ink/40">{t("admin.reviews.sub")}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="italic text-ink/50">{t("common.loading")}</p>
        ) : reviews.length === 0 ? (
          <p className="italic text-ink/50">{t("admin.reviews.none")}</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display font-black text-ink">
                      {r.display_name}{" "}
                      <span className="text-xs font-bold uppercase tracking-widest text-ink/40">
                        {r.role_label}
                      </span>
                    </p>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: Math.max(1, Math.min(5, r.rating)) }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                      r.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {r.approved ? t("admin.reviews.published") : t("admin.reviews.hidden")}
                  </span>
                </div>
                <p className="mt-3 font-medium text-ink/70">"{r.comment}"</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.approved ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setApproved(r.id, false)}
                    >
                      <EyeOff className="mr-1 h-4 w-4" />
                      {t("admin.reviews.hide")}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-full bg-primary"
                      onClick={() => setApproved(r.id, true)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      {t("admin.reviews.approve")}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-red-500 hover:bg-red-50"
                    onClick={() => remove(r.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    {t("admin.reviews.delete")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ----------------------------- Schedule approval ----------------------------- */

function ScheduleApproval() {
  const { t } = useLanguage();
  const [rows, setRows] = useState<ClassRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("class_schedules")
      .select("*")
      .order("day_of_week")
      .order("start_time");
    setRows((data ?? []) as ClassRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setApproved = async (id: string, approved: boolean) => {
    const { error } = await supabase
      .from("class_schedules")
      .update({ approved } as never)
      .eq("id", id);
    if (error) {
      toast.error(t("admin.failed"));
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
    toast.success(t("admin.updated"));
  };

  return (
    <Card className="rounded-[2.5rem] border-none bg-white shadow-xl ring-1 ring-black/5">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-black">
          {t("admin.schedules.title")}
        </CardTitle>
        <p className="text-sm font-medium text-ink/40">{t("admin.schedules.sub")}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="italic text-ink/50">{t("common.loading")}</p>
        ) : rows.length === 0 ? (
          <p className="italic text-ink/50">{t("admin.schedules.none")}</p>
        ) : (
          <div className="space-y-3">
            {rows.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-5 py-4"
              >
                <div>
                  <p className="font-display font-black text-ink">
                    {c.course_name}
                    {c.section ? ` · ${c.section}` : ""}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                    <Clock className="h-3.5 w-3.5" />
                    {t(`day.${c.day_of_week}`)} · {c.start_time}–{c.end_time}
                    {c.room ? ` · ${c.room}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                      c.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {c.approved ? t("teacher.approved") : t("admin.schedules.pending")}
                  </span>
                  {c.approved ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setApproved(c.id, false)}
                    >
                      {t("admin.schedules.revoke")}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-full bg-primary"
                      onClick={() => setApproved(c.id, true)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      {t("admin.schedules.approve")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* --------------------------------- Stat card --------------------------------- */

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: typeof Users;
  color: "blue" | "green" | "orange" | "red";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    green: "bg-green-50 text-green-600 ring-green-100",
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
    red: "bg-red-50 text-red-600 ring-red-100",
  };

  return (
    <Card className="rounded-3xl border-none p-6 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${colors[color]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink/40">{title}</p>
          <p className="text-3xl font-black text-ink">{value}</p>
        </div>
      </div>
    </Card>
  );
}
