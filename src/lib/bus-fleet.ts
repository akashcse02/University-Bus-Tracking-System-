export type BusStatus = "On Route" | "Not Started" | "Delayed";

export interface LatLng {
  lat: number;
  lng: number;
}

export const PUB_CAMPUS: LatLng = { lat: 24.9223067, lng: 89.3490259 };

/** Route accent colors — must stay in sync with the Buses page illustrations. */
export const ROUTE_COLORS: Record<string, string> = {
  Gobindaganj: "#3b82f6",
  Sherpur: "#f97316",
  Gabtoli: "#14b8a6",
  "Sathmatha/Bogura": "#8b5cf6",
  Dupchachia: "#ec4899",
};

export const PREMIUM_TRIM = "#d4a017";

export interface Stop {
  name: string;
  position: LatLng;
}

export interface RouteInfo {
  id: string;
  name: string;
  color: string;
  stops: Stop[];
}

export const ROUTES: RouteInfo[] = [
  {
    id: "gobindaganj",
    name: "Gobindaganj",
    color: ROUTE_COLORS["Gobindaganj"]!,
    stops: [
      { name: "Gobindaganj", position: { lat: 25.1449, lng: 89.3781 } },
      { name: "Fashitola", position: { lat: 25.0532, lng: 89.3712 } },
      { name: "Mokamtola", position: { lat: 24.9744, lng: 89.3661 } },
      { name: "Mohasthan", position: { lat: 24.9646, lng: 89.34 } },
      { name: "PUB Campus", position: PUB_CAMPUS },
    ],
  },
  {
    id: "sherpur",
    name: "Sherpur",
    color: ROUTE_COLORS["Sherpur"]!,
    stops: [
      { name: "Sherpur", position: { lat: 24.6684, lng: 89.4183 } },
      { name: "Inner Road", position: { lat: 24.7601, lng: 89.4004 } },
      { name: "Sathmatha", position: { lat: 24.8482, lng: 89.372 } },
      { name: "Rail Gate", position: { lat: 24.8523, lng: 89.3705 } },
      { name: "PUB Campus", position: PUB_CAMPUS },
    ],
  },
  {
    id: "gabtoli",
    name: "Gabtoli",
    color: ROUTE_COLORS["Gabtoli"]!,
    stops: [
      { name: "Gabtoli", position: { lat: 24.907, lng: 89.2758 } },
      { name: "Sukhanpukur", position: { lat: 24.9256, lng: 89.3053 } },
      { name: "Mohasthan Bazar", position: { lat: 24.9598, lng: 89.3358 } },
      { name: "PUB Campus", position: PUB_CAMPUS },
    ],
  },
  {
    id: "sathmatha-bogura",
    name: "Sathmatha/Bogura",
    color: ROUTE_COLORS["Sathmatha/Bogura"]!,
    stops: [
      { name: "Sathmatha (Bogura)", position: { lat: 24.8482, lng: 89.372 } },
      { name: "Town Hall", position: { lat: 24.8535, lng: 89.3701 } },
      { name: "College Road", position: { lat: 24.8641, lng: 89.3652 } },
      { name: "Charmatha", position: { lat: 24.8815, lng: 89.3585 } },
      { name: "PUB Campus", position: PUB_CAMPUS },
    ],
  },
  {
    id: "dupchachia",
    name: "Dupchachia",
    color: ROUTE_COLORS["Dupchachia"]!,
    stops: [
      { name: "Dupchachia", position: { lat: 24.9192, lng: 89.07 } },
      { name: "Market Area", position: { lat: 24.9207, lng: 89.0741 } },
      { name: "Bus Stand", position: { lat: 24.9179, lng: 89.1503 } },
      { name: "Kahaloo", position: { lat: 24.8901, lng: 89.2333 } },
      { name: "PUB Campus", position: PUB_CAMPUS },
    ],
  },
];

export interface FleetBus {
  id: string;
  number: string;
  label: string;
  routeId: string;
  routeName: string;
  color: string;
  premium: boolean;
  status: BusStatus;
  nextStop: string;
  eta: string;
  /** Fallback position used until the driver's device broadcasts real GPS. */
  defaultPosition: LatLng;
}

/**
 * Small offsets so all 8 default markers are individually visible/clickable
 * while still sitting on the PUB campus.
 */
function scatter(index: number): LatLng {
  const ring = Math.floor(index / 4);
  const angle = (index % 4) * (Math.PI / 2) + ring * 0.7;
  const radius = 0.00055 + ring * 0.00045;
  return {
    lat: PUB_CAMPUS.lat + Math.sin(angle) * radius,
    lng: PUB_CAMPUS.lng + Math.cos(angle) * radius,
  };
}

const RAW: Array<Omit<FleetBus, "color" | "defaultPosition" | "routeName"> & { routeName: string }> = [
  { id: "bus-01", number: "Bus 01", label: "Staff & Teacher Bus", routeId: "gobindaganj", routeName: "Gobindaganj", premium: true, status: "On Route", nextStop: "Mokamtola", eta: "5 mins" },
  { id: "bus-02", number: "Bus 02", label: "General Student Bus", routeId: "gobindaganj", routeName: "Gobindaganj", premium: false, status: "On Route", nextStop: "Fashitola", eta: "8 mins" },
  { id: "bus-03", number: "Bus 03", label: "General Student Bus", routeId: "gobindaganj", routeName: "Gobindaganj", premium: false, status: "Not Started", nextStop: "N/A", eta: "N/A" },
  { id: "bus-04", number: "Bus 04", label: "via Sathmatha (Rail Gate)", routeId: "sherpur", routeName: "Sherpur", premium: false, status: "On Route", nextStop: "Sathmatha", eta: "12 mins" },
  { id: "bus-05", number: "Bus 05", label: "via Inner Road", routeId: "sherpur", routeName: "Sherpur", premium: false, status: "Delayed", nextStop: "Inner Road", eta: "15 mins" },
  { id: "bus-06", number: "Bus 06", label: "Gabtoli Special", routeId: "gabtoli", routeName: "Gabtoli", premium: false, status: "Not Started", nextStop: "N/A", eta: "N/A" },
  { id: "bus-07", number: "Bus 07", label: "Bogura Express", routeId: "sathmatha-bogura", routeName: "Sathmatha/Bogura", premium: false, status: "On Route", nextStop: "Town Hall", eta: "3 mins" },
  { id: "bus-08", number: "Bus 08", label: "Dupchachia Line", routeId: "dupchachia", routeName: "Dupchachia", premium: false, status: "On Route", nextStop: "Market Area", eta: "10 mins" },
];

export const FLEET: FleetBus[] = RAW.map((bus, index) => ({
  ...bus,
  color: ROUTE_COLORS[bus.routeName] ?? "#3b82f6",
  defaultPosition: scatter(index),
}));

export const STATUS_DOT: Record<BusStatus, string> = {
  "On Route": "#22c55e",
  Delayed: "#f59e0b",
  "Not Started": "#94a3b8",
};

/** Live GPS positions keyed by bus id — empty until drivers broadcast. */
export type LivePositions = Record<string, LatLng & { updatedAt?: string }>;

/** Resolve the marker position: live GPS when available, campus default otherwise. */
export function resolvePosition(bus: FleetBus, live: LivePositions): { position: LatLng; isLive: boolean } {
  const gps = live[bus.id];
  if (gps) return { position: { lat: gps.lat, lng: gps.lng }, isLive: true };
  return { position: bus.defaultPosition, isLive: false };
}

/** Teal / sky-blue map theme matching the site palette. */
export const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#eef7f6" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4a635f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#cfe4e1" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#e6f4ee" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d7eedd" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#dbe9e7" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#fdf3e3" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#f3dcb6" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#bfe3ef" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#7ba8b6" }] },
];
