import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map,
  Bus,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Users,
  ShieldCheck,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

type Item = {
  icon: typeof Map;
  labelKey: string;
  to: "/dashboard" | "/live-location" | "/buses" | "/time-schedule";
  search?: { view: "student" | "teacher" | "driver" | "admin" };
};

const commonByRole: Record<string, Item[]> = {
  student: [
    { icon: LayoutDashboard, labelKey: "side.dashboard", to: "/dashboard" },
    { icon: Map, labelKey: "side.map", to: "/live-location" },
    { icon: Bus, labelKey: "side.myBus", to: "/buses" },
    { icon: Calendar, labelKey: "side.schedule", to: "/time-schedule" },
  ],
  teacher: [
    { icon: LayoutDashboard, labelKey: "side.dashboard", to: "/dashboard" },
    { icon: Map, labelKey: "side.map", to: "/live-location" },
    { icon: Calendar, labelKey: "side.schedule", to: "/time-schedule" },
    { icon: Bell, labelKey: "side.notifications", to: "/live-location" },
  ],
  driver: [
    { icon: LayoutDashboard, labelKey: "side.myTrip", to: "/dashboard" },
    { icon: Map, labelKey: "side.map", to: "/live-location" },
    { icon: AlertCircle, labelKey: "side.sos", to: "/dashboard" },
  ],
  admin: [
    { icon: LayoutDashboard, labelKey: "side.dashboard", to: "/dashboard" },
    { icon: Users, labelKey: "admin.users", to: "/dashboard" },
    { icon: Bus, labelKey: "admin.fleet", to: "/buses" },
    { icon: Calendar, labelKey: "side.schedule", to: "/time-schedule" },
  ],
};

const roleViews: Item[] = [
  {
    icon: GraduationCap,
    labelKey: "side.student",
    to: "/dashboard",
    search: { view: "student" },
  },
  { icon: Users, labelKey: "side.teacher", to: "/dashboard", search: { view: "teacher" } },
  { icon: Bus, labelKey: "side.driver", to: "/dashboard", search: { view: "driver" } },
  { icon: ShieldCheck, labelKey: "side.admin", to: "/dashboard", search: { view: "admin" } },
];

export function Sidebar({ role }: { role: string }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const items = commonByRole[role] || commonByRole['student']!;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate({ to: "/login" });
  };

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col overflow-y-auto border-r border-slate-200 bg-white">
      <div className="p-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Bus className="h-6 w-6" />
          </div>
          <span className="font-display text-xl font-black tracking-tight text-ink">PUB BUS</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-6">
        {items.map((item, i) => (
          <SidebarLink key={`${item.labelKey}-${i}`} item={item} label={t(item.labelKey)} />
        ))}

        {role === "admin" && (
          <div className="pt-6">
            <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-widest text-ink/30">
              {t("nav.dashboard")}
            </p>
            <div className="space-y-2">
              {roleViews.map((item) => (
                <SidebarLink key={item.labelKey} item={item} label={t(item.labelKey)} />
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="space-y-2 border-t border-slate-100 p-6">
        <Link
          to="/live-location"
          className="flex items-center gap-4 rounded-2xl px-4 py-3 font-bold text-ink/60 transition-all hover:bg-slate-50"
        >
          <Settings className="h-5 w-5" />
          {t("side.settings")}
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 font-bold text-red-500 transition-all hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          {t("side.logout")}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ item, label }: { item: Item; label: string }) {
  return (
    <Link
      to={item.to}
      search={item.search ?? {}}
      className="flex items-center gap-4 rounded-2xl px-4 py-3 font-bold text-ink/60 transition-all hover:bg-slate-50 hover:text-primary active:scale-[0.98]"
      activeProps={{ className: "bg-primary/5 text-primary" }}
    >
      <item.icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
