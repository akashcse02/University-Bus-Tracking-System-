import { useMemo, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin, Radio } from "lucide-react";
import {
  MAP_STYLE,
  PREMIUM_TRIM,
  PUB_CAMPUS,
  STATUS_DOT,
  resolvePosition,
  type FleetBus,
} from "@/lib/bus-fleet";
import { useLiveBusPositions } from "./use-live-positions";
import { getGoogleMapsApiKey } from "@/config/app-config";
import { resolveFleet, resolveRoutes, useMapSettings, useRouteConfig } from "@/lib/app-config";

const API_KEY = getGoogleMapsApiKey();
const CONTAINER_STYLE = { width: "100%", height: "100%" } as const;

function busMarkerSvg(color: string, plate: string, statusColor: string) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="76" height="60" viewBox="0 0 76 60">
  <ellipse cx="38" cy="53" rx="19" ry="4.5" fill="rgba(15,42,40,0.18)"/>
  <rect x="13" y="10" width="50" height="34" rx="9" fill="${color}" stroke="#ffffff" stroke-width="3"/>
  <rect x="18" y="15" width="40" height="12" rx="5" fill="#ffffff" fill-opacity="0.85"/>
  <rect x="24" y="31" width="28" height="10" rx="4" fill="#ffffff"/>
  <text x="38" y="39" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="9" font-weight="700" fill="#123">${plate}</text>
  <circle cx="20" cy="46" r="4.5" fill="#243b3a"/>
  <circle cx="56" cy="46" r="4.5" fill="#243b3a"/>
  <circle cx="61" cy="12" r="6" fill="${statusColor}" stroke="#ffffff" stroke-width="2.5"/>
</svg>`.trim();
}

function markerIcon(bus: FleetBus): google.maps.Icon {
  const color = bus.premium ? PREMIUM_TRIM : bus.color;
  const plate = bus.number.replace(/^Bus\s*/i, "");
  const svg = busMarkerSvg(color, plate, STATUS_DOT[bus.status]);
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(60, 47),
    anchor: new window.google.maps.Point(30, 44),
  };
}

export function HeroLiveMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "pub-google-map",
    googleMapsApiKey: API_KEY,
  });

  const { settings } = useMapSettings();
  const { routeConfig } = useRouteConfig();
  const routes = useMemo(() => resolveRoutes(routeConfig), [routeConfig]);
  const fleet = useMemo(() => resolveFleet(routes), [routes]);
  const live = useLiveBusPositions();
  const [ready, setReady] = useState(false);

  const center = { lat: settings.centerLat, lng: settings.centerLng };
  const anyLive = fleet.some((b) => resolvePosition(b, live).isLive);

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl ring-1 ring-black/5">
      <div className="relative h-[400px] w-full overflow-hidden rounded-[1.6rem] bg-sky-100/60 lg:h-[480px]">
        {loadError || !API_KEY ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-ink/60">
            <MapPin className="h-7 w-7 text-primary" />
            <p className="font-display text-base font-bold text-ink">Live map unavailable</p>
            <p className="text-xs">Map service could not be loaded right now.</p>
          </div>
        ) : !isLoaded ? (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-ink/50">
            Loading live map…
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={CONTAINER_STYLE}
            center={center}
            zoom={settings.defaultZoom}
            onLoad={() => setReady(true)}
            options={{
              styles: MAP_STYLE,
              disableDefaultUI: true,
              zoomControl: true,
              gestureHandling: "cooperative",
              clickableIcons: false,
            }}
          >
            {ready &&
              fleet.map((bus) => (
                <Marker
                  key={bus.id}
                  position={resolvePosition(bus, live).position}
                  icon={markerIcon(bus)}
                  title={`${bus.number} — ${bus.routeName}`}
                />
              ))}
          </GoogleMap>
        )}

        {/* GPS status badge */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[11px] font-bold text-ink shadow-lg ring-1 ring-black/5 sm:text-xs">
          <Radio className={anyLive ? "h-3.5 w-3.5 text-primary" : "h-3.5 w-3.5 text-amber-500"} />
          {anyLive ? "Live GPS Connected" : "GPS Not Connected — Default Location"}
        </div>

        <a
          href="/live-location"
          className="absolute bottom-3 right-3 z-10 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg"
        >
          Open Live Location
        </a>
      </div>
    </div>
  );
}
