import { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, InfoWindow, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { Bus, ChevronUp, MapPin, Radio, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FLEET,
  MAP_STYLE,
  PREMIUM_TRIM,
  PUB_CAMPUS,
  ROUTES,
  STATUS_DOT,
  resolvePosition,
  type FleetBus,
  type LatLng,
} from "@/lib/bus-fleet";
import { useLiveBusPositions } from "./use-live-positions";

const API_KEY =
  (import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY'] as string | undefined) ||
  (import.meta.env['VITE_GOOGLE_MAPS_API_KEY'] as string | undefined) ||
  "";

const CONTAINER_STYLE = { width: "100%", height: "100%" } as const;

function busMarkerSvg(color: string, plate: string, statusColor: string, active: boolean) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="76" height="60" viewBox="0 0 76 60">
  <ellipse cx="38" cy="53" rx="19" ry="4.5" fill="rgba(15,42,40,0.18)"/>
  ${active ? '<circle cx="38" cy="26" r="27" fill="rgba(34,197,94,0.14)"/>' : ""}
  <rect x="13" y="10" width="50" height="34" rx="9" fill="${color}" stroke="#ffffff" stroke-width="3"/>
  <rect x="18" y="15" width="40" height="12" rx="5" fill="#ffffff" fill-opacity="0.85"/>
  <rect x="18" y="15" width="40" height="6" rx="4" fill="#ffffff" fill-opacity="0.45"/>
  <rect x="24" y="31" width="28" height="10" rx="4" fill="#ffffff"/>
  <text x="38" y="39" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="9" font-weight="700" fill="#123">${plate}</text>
  <circle cx="20" cy="46" r="4.5" fill="#243b3a"/>
  <circle cx="56" cy="46" r="4.5" fill="#243b3a"/>
  <circle cx="61" cy="12" r="6" fill="${statusColor}" stroke="#ffffff" stroke-width="2.5"/>
</svg>`.trim();
}

function markerIcon(bus: FleetBus, active: boolean): google.maps.Icon {
  const color = bus.premium ? PREMIUM_TRIM : bus.color;
  const plate = bus.number.replace(/^Bus\s*/i, "");
  const svg = busMarkerSvg(color, plate, STATUS_DOT[bus.status], active);
  const size = active ? 1.18 : 1;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(76 * size, 60 * size),
    anchor: new window.google.maps.Point(38 * size, 55 * size),
  };
}

export function LiveTracking() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "pub-google-map",
    googleMapsApiKey: API_KEY,
  });

  const live = useLiveBusPositions();
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hiddenRoutes, setHiddenRoutes] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [bannerOpen, setBannerOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const visibleBuses = useMemo(
    () => FLEET.filter((bus) => !hiddenRoutes.includes(bus.routeId)),
    [hiddenRoutes],
  );

  const selected = useMemo(() => FLEET.find((b) => b.id === selectedId) ?? null, [selectedId]);

  const focus = useCallback((position: LatLng, zoom = 16) => {
    const map = mapRef.current;
    if (!map) return;
    map.panTo(position);
    map.setZoom(zoom);
  }, []);

  const selectBus = useCallback(
    (bus: FleetBus) => {
      setSelectedId(bus.id);
      setSheetOpen(false);
      setHiddenRoutes((prev) => prev.filter((id) => id !== bus.routeId));
      focus(resolvePosition(bus, live).position, 17);
    },
    [focus, live],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const busHits = FLEET.filter(
      (b) =>
        b.number.toLowerCase().includes(q) ||
        b.label.toLowerCase().includes(q) ||
        b.routeName.toLowerCase().includes(q),
    ).map((b) => ({ kind: "bus" as const, key: b.id, title: b.number, subtitle: b.routeName, bus: b }));

    const stopHits = ROUTES.flatMap((route) =>
      route.stops
        .filter((stop) => stop.name.toLowerCase().includes(q))
        .map((stop) => ({
          kind: "stop" as const,
          key: `${route.id}-${stop.name}`,
          title: stop.name,
          subtitle: `${route.name} route stop`,
          position: stop.position,
        })),
    );

    return [...busHits, ...stopHits].slice(0, 8);
  }, [query]);

  const toggleRoute = (routeId: string) =>
    setHiddenRoutes((prev) => (prev.includes(routeId) ? prev.filter((id) => id !== routeId) : [...prev, routeId]));

  const busList = (
    <div className="grid gap-2.5">
      {visibleBuses.map((bus) => {
        const { isLive } = resolvePosition(bus, live);
        const active = bus.id === selectedId;
        return (
          <button
            key={bus.id}
            onClick={() => selectBus(bus)}
            className={cn(
              "group flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none",
              active && "ring-2 ring-primary/50 shadow-lg",
            )}
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-inner"
              style={{ background: bus.premium ? PREMIUM_TRIM : bus.color }}
            >
              <Bus className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-bold text-ink">{bus.number}</span>
                {bus.premium && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Staff</span>
                )}
              </span>
              <span className="block truncate text-xs font-medium text-ink/55">{bus.routeName}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-ink/60">
              <span className="h-2 w-2 rounded-full" style={{ background: STATUS_DOT[bus.status] }} />
              {isLive ? "Live" : bus.status}
            </span>
          </button>
        );
      })}
    </div>
  );

  const legend = (
    <div className="rounded-2xl border border-white/70 bg-white/85 p-3 shadow-sm">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink/45">Routes</p>
      <div className="flex flex-wrap gap-2">
        {ROUTES.map((route) => {
          const on = !hiddenRoutes.includes(route.id);
          return (
            <button
              key={route.id}
              onClick={() => toggleRoute(route.id)}
              aria-pressed={on}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
                on ? "border-transparent bg-white text-ink shadow-sm" : "border-dashed border-ink/20 bg-transparent text-ink/40",
              )}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: on ? route.color : "transparent", boxShadow: on ? "none" : `inset 0 0 0 2px ${route.color}` }}
              />
              {route.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="animate-[fade-in_0.6s_ease-out_both] motion-reduce:animate-none">
      {bannerOpen && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-4 shadow-sm">
          <Radio className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="flex-1 text-sm font-medium text-amber-900">
            Live GPS tracking coming soon — bus positions shown are default (Pundra University campus) until drivers
            connect their location.
          </p>
          <button
            onClick={() => setBannerOpen(false)}
            aria-label="Dismiss GPS notice"
            className="rounded-full p-1 text-amber-700/70 transition hover:bg-amber-100 hover:text-amber-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="hidden flex-col gap-3 lg:flex">
          <SearchBox
            query={query}
            setQuery={setQuery}
            results={results}
            onPick={(r) => {
              if (r.kind === "bus") selectBus(r.bus);
              else focus(r.position, 14);
              setQuery("");
            }}
          />
          {legend}
          <div className="max-h-[520px] overflow-y-auto pr-1">{busList}</div>
        </aside>

        {/* Map */}
        <div className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-sky-100/60 shadow-xl">
          <div className="absolute inset-x-3 top-3 z-10 lg:hidden">
            <SearchBox
              query={query}
              setQuery={setQuery}
              results={results}
              onPick={(r) => {
                if (r.kind === "bus") selectBus(r.bus);
                else focus(r.position, 14);
                setQuery("");
              }}
            />
          </div>

          {!API_KEY ? (
            <MapPlaceholder text="Google Maps API key required to render the live map." />
          ) : loadError ? (
            <MapPlaceholder text="Google Maps failed to load. Check the API key and its allowed domains." />
          ) : !isLoaded ? (
            <MapPlaceholder text="Loading map…" />
          ) : (
            <GoogleMap
              mapContainerStyle={CONTAINER_STYLE}
              center={PUB_CAMPUS}
              zoom={15}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              options={{
                styles: MAP_STYLE,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                clickableIcons: false,
              }}
            >
              {ROUTES.filter((r) => !hiddenRoutes.includes(r.id)).map((route) => (
                <Polyline
                  key={route.id}
                  path={route.stops.map((s) => s.position)}
                  options={{ strokeColor: route.color, strokeOpacity: 0.85, strokeWeight: 4 }}
                />
              ))}

              {visibleBuses.map((bus) => {
                const { position } = resolvePosition(bus, live);
                return (
                  <Marker
                    key={bus.id}
                    position={position}
                    icon={markerIcon(bus, bus.id === selectedId)}
                    zIndex={bus.id === selectedId ? 999 : 1}
                    onClick={() => selectBus(bus)}
                  />
                );
              })}

              {selected && (
                <InfoWindow
                  position={resolvePosition(selected, live).position}
                  onCloseClick={() => setSelectedId(null)}
                >
                  <div className="min-w-[190px] p-1">
                    <p className="text-sm font-bold text-ink">
                      {selected.number}
                      {selected.premium ? " · Staff & Teacher" : ""}
                    </p>
                    <p className="mb-2 text-xs font-medium text-ink/60">{selected.routeName} route</p>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-ink/70">
                      <span className="h-2 w-2 rounded-full" style={{ background: STATUS_DOT[selected.status] }} />
                      {selected.status}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/60">
                      <MapPin className="h-3.5 w-3.5" /> Next stop: {selected.nextStop} ({selected.eta})
                    </p>
                    {!resolvePosition(selected, live).isLive && (
                      <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-800">
                        GPS Not Connected — Default Location
                      </p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}

          {/* Mobile drawer */}
          <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden">
            <div
              className={cn(
                "rounded-t-[1.5rem] border-t border-white/70 bg-white/95 p-4 shadow-2xl backdrop-blur transition-transform duration-500 motion-reduce:transition-none",
                sheetOpen ? "translate-y-0" : "translate-y-[calc(100%-3.5rem)]",
              )}
            >
              <button
                onClick={() => setSheetOpen((v) => !v)}
                className="mb-3 flex w-full items-center justify-between text-sm font-bold text-ink"
              >
                <span>All buses ({visibleBuses.length})</span>
                <ChevronUp className={cn("h-4 w-4 transition-transform", sheetOpen && "rotate-180")} />
              </button>
              <div className="max-h-[45vh] space-y-3 overflow-y-auto">
                {legend}
                {busList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SearchResult =
  | { kind: "bus"; key: string; title: string; subtitle: string; bus: FleetBus }
  | { kind: "stop"; key: string; title: string; subtitle: string; position: LatLng };

function SearchBox({
  query,
  setQuery,
  results,
  onPick,
}: {
  query: string;
  setQuery: (v: string) => void;
  results: SearchResult[];
  onPick: (r: SearchResult) => void;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search bus, route or stop…"
        aria-label="Search buses, routes and stops"
        className="h-12 w-full rounded-2xl border border-white/70 bg-white/90 px-11 text-sm font-medium text-ink shadow-sm outline-none ring-primary/20 backdrop-blur transition-all focus:ring-4 motion-reduce:transition-none"
      />
      {results.length > 0 && (
        <ul className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl">
          {results.map((r) => (
            <li key={r.key}>
              <button
                onClick={() => onPick(r)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-sky-50"
              >
                {r.kind === "bus" ? (
                  <Bus className="h-4 w-4 text-primary" />
                ) : (
                  <MapPin className="h-4 w-4 text-orange-500" />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{r.title}</span>
                  <span className="block truncate text-xs text-ink/50">{r.subtitle}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MapPlaceholder({ text }: { text: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-sky-50/70 p-8 text-center">
      <p className="max-w-xs text-sm font-semibold text-ink/45">{text}</p>
    </div>
  );
}
