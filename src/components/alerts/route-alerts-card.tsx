import { useCallback, useEffect, useRef, useState } from "react";
import { BellRing, BellOff } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ROUTES } from "@/lib/bus-fleet";
import {
  ALERT_LABEL,
  ALERT_TYPES,
  wantsAlert,
  type RouteAlert,
  type RouteSubscription,
} from "@/lib/route-alerts";

export function RouteAlertsCard({ userId }: { userId: string }) {
  const [subs, setSubs] = useState<RouteSubscription[]>([]);
  const [alerts, setAlerts] = useState<RouteAlert[]>([]);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const subsRef = useRef(subs);
  subsRef.current = subs;

  const load = useCallback(async () => {
    const [{ data: s }, { data: a }] = await Promise.all([
      supabase.from("route_subscriptions").select("*").eq("user_id", userId),
      supabase.from("route_alerts").select("*").order("created_at", { ascending: false }).limit(30),
    ]);
    setSubs(s ?? []);
    setAlerts(a ?? []);
  }, [userId]);

  useEffect(() => {
    setPermission(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
    load();
    const channel = supabase
      .channel(`route-alerts-${userId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "route_alerts" }, (payload) => {
        const alert = payload.new as RouteAlert;
        setAlerts((prev) => [alert, ...prev]);
        const sub = subsRef.current.find((s) => s.route_id === alert.route_id);
        if (!wantsAlert(sub, alert.alert_type)) return;
        const route = ROUTES.find((r) => r.id === alert.route_id)?.name ?? alert.route_id;
        const title = `${ALERT_LABEL[alert.alert_type]} · ${route}`;
        toast.warning(title, { description: alert.message });
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          new Notification(title, { body: alert.message, icon: "/favicon.png" });
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, load]);

  const toggleRoute = async (routeId: string, on: boolean) => {
    if (on) {
      const { data, error } = await supabase
        .from("route_subscriptions")
        .insert({ user_id: userId, route_id: routeId })
        .select()
        .single();
      if (error) return toast.error("Couldn't turn on alerts");
      setSubs((p) => [...p, data]);
    } else {
      const { error } = await supabase.from("route_subscriptions").delete().eq("user_id", userId).eq("route_id", routeId);
      if (error) return toast.error("Couldn't turn off alerts");
      setSubs((p) => p.filter((s) => s.route_id !== routeId));
    }
  };

  const toggleType = async (sub: RouteSubscription, field: (typeof ALERT_TYPES)[number]["field"], value: boolean) => {
    setSubs((p) => p.map((s) => (s.id === sub.id ? { ...s, [field]: value } : s)));
    const { error } = await supabase.from("route_subscriptions").update({ [field]: value }).eq("id", sub.id);
    if (error) {
      toast.error("Couldn't save preference");
      load();
    }
  };

  const askPermission = async () => {
    if (typeof Notification === "undefined") return;
    setPermission(await Notification.requestPermission());
  };

  const visible = alerts.filter((a) => wantsAlert(subs.find((s) => s.route_id === a.route_id), a.alert_type));

  return (
    <Card className="rounded-[2rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BellRing className="h-5 w-5 text-primary" /> Route alerts
        </CardTitle>
        <p className="text-sm text-muted-foreground">Get notified about delays, route changes and cancellations.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {permission === "default" && (
          <Button variant="outline" size="sm" className="w-full rounded-full" onClick={askPermission}>
            Allow device notifications
          </Button>
        )}
        {permission === "denied" && (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <BellOff className="h-4 w-4" /> Device notifications are blocked; you'll still see alerts here.
          </p>
        )}

        <ul className="space-y-3">
          {ROUTES.map((r) => {
            const sub = subs.find((s) => s.route_id === r.id);
            const switchId = `route-sub-${r.id}`;
            return (
              <li key={r.id} className="rounded-2xl border p-3">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor={switchId} className="flex items-center gap-2 text-sm font-bold">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} aria-hidden />
                    {r.name}
                  </label>
                  <Switch id={switchId} checked={!!sub} onCheckedChange={(v) => toggleRoute(r.id, v)} />
                </div>
                {sub && (
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {ALERT_TYPES.map((t) => {
                      const id = `${switchId}-${t.value}`;
                      return (
                        <label key={t.value} htmlFor={id} className="flex items-center gap-1.5 text-xs font-medium">
                          <Checkbox id={id} checked={sub[t.field]} onCheckedChange={(v) => toggleType(sub, t.field, v === true)} />
                          {t.label}
                        </label>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div aria-live="polite">
          <h3 className="mb-2 text-sm font-bold">Recent alerts</h3>
          {visible.length === 0 ? (
            <p className="text-xs italic text-muted-foreground">
              {subs.length ? "No alerts for your routes." : "Turn on a route to start receiving alerts."}
            </p>
          ) : (
            <ul className="space-y-2">
              {visible.slice(0, 5).map((a) => (
                <li key={a.id} className="rounded-xl bg-accent/10 p-2.5 text-xs">
                  <p className="font-bold">
                    {ALERT_LABEL[a.alert_type]} · {ROUTES.find((r) => r.id === a.route_id)?.name ?? a.route_id}
                  </p>
                  <p>{a.message}</p>
                  <p className="mt-1 text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
