import { useState } from "react";
import { Megaphone } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ROUTES } from "@/lib/bus-fleet";
import { ALERT_LABEL, type AlertType } from "@/lib/route-alerts";

export function PostAlertForm() {
  const [routeId, setRouteId] = useState(ROUTES[0]!.id);
  const [type, setType] = useState<AlertType>("delay");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("route_alerts")
      .insert({ route_id: routeId, alert_type: type, message: message.trim(), created_by: user?.id ?? null });
    setSaving(false);
    if (error) { toast.error("Couldn't send alert"); return; }
    toast.success("Alert sent to subscribed students");
    setMessage("");
  };

  return (
    <Card className="rounded-[2rem]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Megaphone className="h-5 w-5 text-primary" /> Send route alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="alert-route">Route</Label>
            <Select value={routeId} onValueChange={setRouteId}>
              <SelectTrigger id="alert-route"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ROUTES.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="alert-type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as AlertType)}>
              <SelectTrigger id="alert-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.keys(ALERT_LABEL) as AlertType[]).map((k) => (
                  <SelectItem key={k} value={k}>{ALERT_LABEL[k]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="alert-msg">Message</Label>
            <Textarea id="alert-msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Bus 05 is running 20 minutes late due to traffic at Inner Road." />
          </div>
          <Button type="submit" disabled={saving || !message.trim()} className="rounded-full sm:col-span-2">
            {saving ? "Sending…" : "Send alert"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
