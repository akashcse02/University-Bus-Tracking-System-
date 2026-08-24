import { useState } from "react";
import { Check, Loader2, Plus, Route as RouteIcon, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CAMPUS_COORDS } from "@/config/app-config";
import { useRouteConfig, type RouteConfig } from "@/lib/app-config";

export function RoutesEditor() {
  const { routeConfig, setRouteConfig, loading, save, resetToDefaults } = useRouteConfig();
  const [saving, setSaving] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const updateRoute = (id: string, patch: Partial<RouteConfig>) =>
    setRouteConfig(routeConfig.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const updateStop = (routeId: string, index: number, patch: Partial<RouteConfig["stops"][number]>) =>
    setRouteConfig(
      routeConfig.map((r) =>
        r.id === routeId
          ? { ...r, stops: r.stops.map((s, i) => (i === index ? { ...s, ...patch } : s)) }
          : r,
      ),
    );

  const addStop = (routeId: string) =>
    setRouteConfig(
      routeConfig.map((r) =>
        r.id === routeId
          ? { ...r, stops: [...r.stops, { name: "New stop", lat: CAMPUS_COORDS.lat, lng: CAMPUS_COORDS.lng }] }
          : r,
      ),
    );

  const removeStop = (routeId: string, index: number) =>
    setRouteConfig(
      routeConfig.map((r) => (r.id === routeId ? { ...r, stops: r.stops.filter((_, i) => i !== index) } : r)),
    );

  const addRoute = () => {
    const id = `route-${Date.now()}`;
    setRouteConfig([
      ...routeConfig,
      { id, name: "New Route", color: "#0ea5e9", stops: [{ name: "PUB Campus", ...CAMPUS_COORDS }] },
    ]);
    setOpenId(id);
  };

  const removeRoute = (id: string) => setRouteConfig(routeConfig.filter((r) => r.id !== id));

  const persist = async () => {
    setSaving(true);
    const { error } = await save(routeConfig);
    setSaving(false);
    if (error) toast.error(`Could not save routes: ${error}`);
    else toast.success("Routes and stops saved");
  };

  const reset = async () => {
    setSaving(true);
    const { error } = await resetToDefaults();
    setSaving(false);
    if (error) toast.error(`Could not reset routes: ${error}`);
    else toast.success("Routes reset to built-in defaults");
  };

  return (
    <Card className="rounded-[2rem] border-none bg-white p-6 shadow-xl ring-1 ring-black/5">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <RouteIcon className="h-5 w-5 text-primary" /> Routes &amp; Stops
        </CardTitle>
        <p className="text-sm font-medium text-ink/40">
          Edit route names, colours, and stop coordinates used by the map lines and markers.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {routeConfig.map((route) => {
          const open = openId === route.id;
          return (
            <div key={route.id} className="rounded-3xl bg-sky/40 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="color"
                  value={route.color}
                  onChange={(e) => updateRoute(route.id, { color: e.target.value })}
                  className="h-9 w-9 cursor-pointer rounded-full border-none bg-transparent p-0"
                  aria-label={`${route.name} colour`}
                />
                <input
                  value={route.name}
                  onChange={(e) => updateRoute(route.id, { name: e.target.value })}
                  className="h-10 flex-1 min-w-[140px] rounded-2xl bg-white px-4 text-sm font-bold text-ink outline-none ring-primary/20 focus:ring-4"
                />
                <span className="text-xs font-bold text-ink/40">{route.stops.length} stops</span>
                <Button
                  variant="ghost"
                  onClick={() => setOpenId(open ? null : route.id)}
                  className="rounded-2xl text-xs font-bold"
                >
                  {open ? "Close" : "Edit stops"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => removeRoute(route.id)}
                  className="rounded-2xl text-red-500 hover:bg-red-500/10"
                  aria-label={`Remove ${route.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {open && (
                <div className="mt-4 space-y-2">
                  {route.stops.map((stop, index) => (
                    <div key={`${route.id}-${index}`} className="flex flex-wrap items-center gap-2">
                      <input
                        value={stop.name}
                        onChange={(e) => updateStop(route.id, index, { name: e.target.value })}
                        placeholder="Stop name"
                        className="h-10 flex-1 min-w-[150px] rounded-2xl bg-white px-4 text-sm font-semibold outline-none ring-primary/20 focus:ring-4"
                      />
                      <input
                        type="number"
                        step="0.0000001"
                        value={stop.lat}
                        onChange={(e) => updateStop(route.id, index, { lat: Number(e.target.value) })}
                        className="h-10 w-32 rounded-2xl bg-white px-3 text-sm font-semibold outline-none ring-primary/20 focus:ring-4"
                        aria-label="Latitude"
                      />
                      <input
                        type="number"
                        step="0.0000001"
                        value={stop.lng}
                        onChange={(e) => updateStop(route.id, index, { lng: Number(e.target.value) })}
                        className="h-10 w-32 rounded-2xl bg-white px-3 text-sm font-semibold outline-none ring-primary/20 focus:ring-4"
                        aria-label="Longitude"
                      />
                      <button
                        type="button"
                        onClick={() => removeStop(route.id, index)}
                        className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-red-500 transition-colors hover:bg-red-500/10"
                        aria-label={`Remove ${stop.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => addStop(route.id)}
                    className="rounded-2xl text-xs font-bold text-primary"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add stop
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button onClick={persist} disabled={saving || loading} className="rounded-2xl font-bold shadow-lift glass-shine">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Save routes
          </Button>
          <Button variant="ghost" onClick={addRoute} className="rounded-2xl font-bold text-primary">
            <Plus className="mr-1 h-4 w-4" /> Add route
          </Button>
          <Button variant="ghost" onClick={reset} disabled={saving} className="rounded-2xl font-bold text-ink/50">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset to defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
