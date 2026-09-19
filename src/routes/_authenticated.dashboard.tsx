import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { StudentDashboard } from "@/components/dashboards/student-dashboard";
import { TeacherDashboard } from "@/components/dashboards/teacher-dashboard";
import { DriverDashboard } from "@/components/dashboards/driver-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";

type View = "student" | "teacher" | "driver" | "admin";

const VIEWS: View[] = ["student", "teacher", "driver", "admin"];

export const Route = createFileRoute("/_authenticated/dashboard")({
  validateSearch: (search: Record<string, unknown>): { view?: View } => {
    const raw = typeof search['view'] === "string" ? (search['view'] as View) : undefined;
    return raw && VIEWS.includes(raw) ? { view: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "Dashboard — PUB Bus Track" },
      {
        name: "description",
        content: "Your personal PUB Bus Track dashboard: live bus tracking, schedules and alerts.",
      },
      { property: "og:title", content: "Dashboard — PUB Bus Track" },
      {
        property: "og:description",
        content: "Your personal PUB Bus Track dashboard: live bus tracking, schedules and alerts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { session, profile, role } = useLoaderData({ from: "/_authenticated" });
  const { view } = Route.useSearch();

  // Only an admin may preview another role's dashboard.
  const active: View = role === "admin" && view ? view : (role as View);
  const userId = session.user.id;
  const displayName = profile?.full_name || "PUB User";

  switch (active) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
      return <TeacherDashboard teacherId={userId} />;
    case "driver":
      return <DriverDashboard driverId={userId} />;
    default:
      return <StudentDashboard userId={userId} displayName={displayName} />;
  }
}
