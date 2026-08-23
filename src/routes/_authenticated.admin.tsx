import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: ({ context }) => {
    if (context.role !== "admin") {
      throw redirect({
        to: "/live-location",
      });
    }
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
