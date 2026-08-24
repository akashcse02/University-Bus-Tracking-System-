/**
 * App-wide configuration.
 *
 * These are the build-time defaults for PUB Bus Track. Admins can override the
 * map-related values at runtime from the Admin dashboard (stored in the
 * `app_config` table); everything here is the fallback used before/without
 * an override.
 */

export interface LatLngConfig {
  lat: number;
  lng: number;
}

/** Pundra University of Science & Technology campus. */
export const CAMPUS_COORDS: LatLngConfig = {
  lat: 24.9223067,
  lng: 89.3490259,
};

export interface MapSettings {
  centerLat: number;
  centerLng: number;
  defaultZoom: number;
  showRouteLines: boolean;
  hiddenRouteIds: string[];
  gpsBanner: string;
  bannerEnabled: boolean;
  /** How often live positions are re-polled as a realtime fallback (ms). */
  refreshIntervalMs: number;
  /** Spread of the default campus markers so all 8 buses stay clickable (m). */
  markerScatterMeters: number;
}

export const DEFAULT_MAP_SETTINGS: MapSettings = {
  centerLat: CAMPUS_COORDS.lat,
  centerLng: CAMPUS_COORDS.lng,
  defaultZoom: 15,
  showRouteLines: true,
  hiddenRouteIds: [],
  gpsBanner:
    "Live GPS tracking coming soon — bus positions shown are default (Pundra University campus) until drivers connect their location.",
  bannerEnabled: true,
  refreshIntervalMs: 15_000,
  markerScatterMeters: 60,
};

/** Route accent colors — shared by the Buses page, map polylines and markers. */
export const ROUTE_COLOR_DEFAULTS: Record<string, string> = {
  Gobindaganj: "#3b82f6",
  Sherpur: "#f97316",
  Gabtoli: "#14b8a6",
  "Sathmatha/Bogura": "#8b5cf6",
  Dupchachia: "#ec4899",
};

/** Gold trim reserved for the Staff & Teacher bus (Bus 01). */
export const PREMIUM_TRIM_COLOR = "#d4a017";

export const STATUS_COLORS = {
  "On Route": "#22c55e",
  Delayed: "#f59e0b",
  "Not Started": "#94a3b8",
} as const;

/** Google Maps browser key: managed connector key first, then your own key. */
export function getGoogleMapsApiKey(): string {
  return (
    (import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY'] as string | undefined) ||
    (import.meta.env['VITE_GOOGLE_MAPS_API_KEY'] as string | undefined) ||
    ""
  );
}

export function isUsingManagedMapsKey(): boolean {
  return Boolean(import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY']);
}

export const APP_META = {
  name: "PUB Bus Track",
  university: "Pundra University of Science & Technology",
  supportEmail: "support@pubbustrack.app",
} as const;
