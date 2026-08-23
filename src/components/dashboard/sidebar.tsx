import { Link, useNavigate } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Map, 
  Bus, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut, 
  HelpCircle,
  FileText,
  Users,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", to: "/live-location" },
    { icon: Map, label: "Live Map", to: "/live-location" },
    { icon: Bus, label: "My Bus", to: "/buses" },
    { icon: Calendar, label: "Schedule", to: "/time-schedule" },
    { icon: Bell, label: "Notifications", to: "/live-location" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", to: "/live-location" },
    { icon: Map, label: "Live Map", to: "/live-location" },
    { icon: Calendar, label: "Schedule", to: "/time-schedule" },
    { icon: Bell, label: "Notice Board", to: "/live-location" },
  ],
  driver: [
    { icon: LayoutDashboard, label: "My Trip", to: "/live-location" },
    { icon: Map, label: "Route Map", to: "/live-location" },
    { icon: AlertCircle, label: "SOS Report", to: "/live-location" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Overview", to: "/admin" },
    { icon: Users, label: "User Manager", to: "/admin" },
    { icon: Bus, label: "Fleet status", to: "/admin" },
    { icon: FileText, label: "System Logs", to: "/admin" },
  ],
};

export function Sidebar({ role }: { role: string }) {
  const navigate = useNavigate();
  const items = menuItems[role as keyof typeof menuItems] || menuItems.student;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate({ to: "/login" });
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Bus className="h-6 w-6" />
          </div>
          <span className="font-display text-xl font-black tracking-tight text-ink">
            PUB BUS
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-ink/60 font-bold hover:bg-slate-50 hover:text-primary transition-all active:scale-[0.98]"
            activeProps={{ className: "bg-primary/5 text-primary" }}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100 space-y-2">
        <Link
          to="/live-location"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-ink/60 font-bold hover:bg-slate-50 transition-all"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
