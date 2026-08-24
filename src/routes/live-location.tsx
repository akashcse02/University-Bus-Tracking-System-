import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { DriverDashboard } from "@/components/dashboards/driver-dashboard";
import { LiveTracking } from "@/components/live-location/live-tracking";
import { SiteFooter } from "@/components/site-footer";
import { Clouds } from "@/components/auth-layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/live-location")({
  loader: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { profile: null, role: "guest" as const };

    const [{ data: profile }, { data: roleData }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", session.user.id).single(),
      supabase.from("user_roles").select("role").eq("user_id", session.user.id).single(),
    ]);

    return { profile, role: (roleData?.role as string) || "student" };
  },
  head: () => ({
    meta: [
      { title: "Live Bus Location — PUB Bus Track" },
      {
        name: "description",
        content:
          "Track all 8 Pundra University buses on a live map with route lines, stops and status for every campus route.",
      },
      { property: "og:title", content: "Live Bus Location — PUB Bus Track" },
      {
        property: "og:description",
        content: "See every PUB bus on the map, filter by route, and search buses, routes and stops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LiveLocationPage,
});

function LiveLocationPage() {
  const { role, profile } = Route.useLoaderData();

  if (role === "driver" && profile) {
    return <DriverDashboard driverId={profile.id} />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,var(--color-sky-top),#F0F9FF_45%)]">
      <Clouds />
      <section className="relative mx-auto w-full max-w-[1280px] px-4 pb-16 pt-10 sm:px-6 lg:pt-14">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-ink/70 shadow-sm transition-all hover:-translate-y-0.5 hover:text-ink hover:shadow-md motion-reduce:transform-none"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <header className="mb-6 max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Live Bus Location</h1>
          <p className="mt-2 text-base font-medium text-ink/60">
            All 8 PUB buses, their routes and stops on one map — centred on Pundra University campus.
          </p>
        </header>

        <LiveTracking />
      </section>
      <SiteFooter />
    </main>
  );
}
