import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  loader: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // Fetch profile and role
    const [{ data: profile }, { data: roleData }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", session.user.id).single(),
      supabase.from("user_roles").select("role").eq("user_id", session.user.id).single(),
    ]);

    return {
      session,
      profile,
      role: roleData?.role || "student",
    };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session, profile, role } = Route.useLoaderData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Implementation coming in next step */}
      <div className="flex-1 flex flex-col">
        {/* Header - Implementation coming in next step */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
             <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold text-ink">
                    Welcome back, {profile?.full_name?.split(' ')[0]}
                  </h1>
                  <p className="text-ink/60 font-medium">Here's what's happening with PUB Bus Track today.</p>
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">{role}</span>
                </div>
             </div>
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
