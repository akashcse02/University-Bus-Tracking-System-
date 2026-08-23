import { createFileRoute, redirect } from "@tanstack/react-router";
import { StudentDashboard } from "@/components/dashboards/student-dashboard";
import { DriverDashboard } from "@/components/dashboards/driver-dashboard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/live-location")({
  loader: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/login" });

    const [{ data: profile }, { data: roleData }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", session.user.id).single(),
      supabase.from("user_roles").select("role").eq("user_id", session.user.id).single(),
    ]);

    // Fetch assigned bus/route if any
    const { data: bus } = await supabase
      .from("buses")
      .select("*, routes(name)")
      .limit(1)
      .maybeSingle();

    return {
      profile,
      role: roleData?.role || "student",
      bus,
    };
  },
  head: () => ({
    title: "Live Location — PUB Bus Track",
    meta: [{ name: "description", content: "Track Pundra University buses in real-time." }],
  }),
  component: LiveLocationPage,
});

function LiveLocationPage() {
  const { role, profile, bus } = Route.useLoaderData();

  if (role === "driver") {
    return <DriverDashboard driverId={profile.id} />;
  }

  // Handle case where route data might be missing in TS due to maybeSingle/join
  const routeName = (bus as any)?.routes?.name;

  return <StudentDashboard bus={bus as any} routeName={routeName} />;
}
