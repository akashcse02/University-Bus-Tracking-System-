import type { Database } from "@/integrations/supabase/types";

export type AlertType = Database["public"]["Enums"]["alert_type"];
export type RouteAlert = Database["public"]["Tables"]["route_alerts"]["Row"];
export type RouteSubscription = Database["public"]["Tables"]["route_subscriptions"]["Row"];

export const ALERT_TYPES: { value: AlertType; label: string; field: "notify_delay" | "notify_route_change" | "notify_cancellation" }[] = [
  { value: "delay", label: "Delays", field: "notify_delay" },
  { value: "route_change", label: "Route changes", field: "notify_route_change" },
  { value: "cancellation", label: "Cancellations", field: "notify_cancellation" },
];

export const ALERT_LABEL: Record<AlertType, string> = {
  delay: "Delay",
  route_change: "Route change",
  cancellation: "Cancellation",
};

export function wantsAlert(sub: RouteSubscription | undefined, type: AlertType) {
  if (!sub) return false;
  return Boolean(sub[ALERT_TYPES.find((t) => t.value === type)!.field]);
}
