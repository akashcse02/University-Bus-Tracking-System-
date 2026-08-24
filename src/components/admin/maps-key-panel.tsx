import { CheckCircle2, KeyRound, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGoogleMapsApiKey, isUsingManagedMapsKey } from "@/config/app-config";

export function MapsKeyPanel() {
  const key = getGoogleMapsApiKey();
  const managed = isUsingManagedMapsKey();
  const hasKey = key.length > 0;

  return (
    <Card className="rounded-[2rem] border-none bg-white p-6 shadow-xl ring-1 ring-black/5">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <KeyRound className="h-5 w-5 text-primary" /> Google Maps Key
        </CardTitle>
        <p className="text-sm font-medium text-ink/40">Which key the live map currently loads with.</p>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div
          className={`flex items-start gap-3 rounded-3xl p-4 ${
            hasKey ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {hasKey ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          )}
          <div className="text-sm font-semibold leading-relaxed">
            {hasKey ? (
              <>
                Active key: <strong>{managed ? "Managed Google Maps key" : "Custom project key"}</strong>
                <span className="ml-1 font-mono text-xs opacity-70">
                  ({key.slice(0, 6)}…{key.slice(-4)})
                </span>
              </>
            ) : (
              <>No Google Maps key configured — the live map will not render.</>
            )}
          </div>
        </div>

        {managed && (
          <p className="text-sm font-medium leading-relaxed text-ink/50">
            The managed key only works on <code className="font-mono text-xs">*.lovable.app</code> domains. To use a
            custom domain, add your own browser key as <code className="font-mono text-xs">VITE_GOOGLE_MAPS_API_KEY</code>{" "}
            and allow that domain in the key's HTTP referrer list.
          </p>
        )}

        <ol className="space-y-2 rounded-3xl bg-sky/40 p-5 text-sm font-medium text-ink/60">
          <li>1. Create a Google Cloud project with billing enabled.</li>
          <li>2. Enable Maps JavaScript API (plus Places / Geocoding if needed).</li>
          <li>3. Create a browser API key.</li>
          <li>
            4. Restrict it to your domains — both <code className="font-mono text-xs">https://example.com/*</code> and{" "}
            <code className="font-mono text-xs">https://*.example.com/*</code>.
          </li>
          <li>
            5. Set it as <code className="font-mono text-xs">VITE_GOOGLE_MAPS_API_KEY</code>.
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
