import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";

export const Route = createFileRoute("/_authenticated/admin")({
  loader: async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({ to: "/login" });
    }

    // Role is verified against the database (RLS-protected user_roles table),
    // never from client state or props.
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: session.user.id,
      _role: "admin",
    });

    if (!isAdmin) {
      throw redirect({ to: "/live-location" });
    }

    return { isAdmin: true };
  },
  head: () => ({
    title: "Admin Dashboard — PUB Bus Track",
    meta: [{ name: "description", content: "Administrative overview and management." }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  return <AdminDashboard />;
}
