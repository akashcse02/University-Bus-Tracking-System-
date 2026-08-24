import { useState } from "react";
import { Check, Loader2, MapPin, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEFAULT_MAP_SETTINGS, type MapSettings } from "@/config/app-config";
import { useMapSettings, useRouteConfig } from "@/lib/app-config";

export function MapSettingsPanel() {
  const { settings, setSettings, loading, save } = useMapSettings();
  const { routeConfig } = useRouteConfig();
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof MapSettings>(key: K, value: MapSettings[K]) =>
    setSettings({ ...settings, [key]: value });

  const toggleRoute = (id: string) => {
    const hidden = settings.hiddenRouteIds.includes(id)
      ? settings.hiddenRouteIds.filter((r) => r !== id)
      : [...settings.hiddenRouteIds, id];
    update("hiddenRouteIds", hidden);
  };

  const persist = async (next: MapSettings) => {
    setSaving(true);
    const { error } = await save(next);
    setSaving(false);
    if (error) toast.error(`Could not save map settings: ${error}`);
    else toast.success("Map settings saved");
  };

  return (
    <Card className="rounded-[2rem] border-none bg-white p-6 shadow-xl ring-1 ring-black/5">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <MapPin className="h-5 w-5 text-primary" /> Map Settings
        </CardTitle>
        <p className="text-sm font-medium text-ink/40">
          Controls the default view of the public Live Location map.
        </p>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Center latitude">
            <input
              type="number"
              step="0.0000001"
              value={settings.centerLat}
              onChange={(e) => update("centerLat", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Center longitude">
            <input
              type="number"
              step="0.0000001"
              value={settings.centerLng}
              onChange={(e) => update("centerLng", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Default zoom">
            <input
              type="number"
              min={3}
              max={20}
              value={settings.defaultZoom}
              onChange={(e) => update("defaultZoom", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Live refresh interval (seconds)">
            <input
              type="number"
              min={5}
              max={120}
              value={Math.round(settings.refreshIntervalMs / 1000)}
              onChange={(e) => update("refreshIntervalMs", Math.max(5, Number(e.target.value)) * 1000)}
              className={inputClass}
            />
          </Field>
          <Field label="Default marker spread (metres)">
            <input
              type="number"
              min={10}
              max={400}
              value={settings.markerScatterMeters}
              onChange={(e) => update("markerScatterMeters", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="GPS status banner">
          <textarea
            rows={3}
            value={settings.gpsBanner}
            onChange={(e) => update("gpsBanner", e.target.value)}
            className={`${inputClass} resize-none leading-relaxed`}
          />
        </Field>

        <div className="flex flex-wrap gap-3">
          <Toggle
            active={settings.bannerEnabled}
            onClick={() => update("bannerEnabled", !settings.bannerEnabled)}
            label="Show GPS banner"
          />
          <Toggle
            active={settings.showRouteLines}
            onClick={() => update("showRouteLines", !settings.showRouteLines)}
            label="Show route lines"
          />
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">
            Visible routes on load
          </p>
          <div className="flex flex-wrap gap-2">
            {routeConfig.map((route) => (
              <Toggle
                key={route.id}
                active={!settings.hiddenRouteIds.includes(route.id)}
                onClick={() => toggleRoute(route.id)}
                label={route.name}
                color={route.color}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            onClick={() => persist(settings)}
            disabled={saving || loading}
            className="rounded-2xl font-bold shadow-lift glass-shine"
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Save map settings
          </Button>
          <Button
            variant="ghost"
            onClick={() => persist(DEFAULT_MAP_SETTINGS)}
            disabled={saving}
            className="rounded-2xl font-bold text-ink/50"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset to defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const inputClass =
  "h-11 w-full rounded-2xl bg-sky/40 px-4 text-sm font-semibold text-ink outline-none ring-primary/20 transition-all focus:ring-4";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-ink/40">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-shine flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
        active ? "bg-primary text-primary-foreground shadow-lift" : "bg-sky/60 text-ink/40"
      }`}
    >
      {color && <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />}
      {label}
    </button>
  );
}
