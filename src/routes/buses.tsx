import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Bus, MapPin, Clock, ChevronRight, Info } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import pubLogo from "@/assets/pub-logo.png.asset.json";

export const Route = createFileRoute("/buses")({
  head: () => ({
    title: "Buses | PUB Bus Track",
    meta: [
      { name: "description", content: "View all active buses, routes, and live status for Pundra University." },
      { property: "og:title", content: "Buses | PUB Bus Track" },
      { property: "og:description", content: "View all active buses, routes, and live status for Pundra University." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BusesPage,
});

type BusStatus = "On Route" | "Not Started" | "Delayed";

interface BusData {
  id: string;
  number: string;
  name: string;
  type: "Student" | "Staff & Teacher";
  status: BusStatus;
  nextStop: string;
  eta: string;
  route: string;
  stops: string[];
}

const BUSES_DATA: BusData[] = [
  // Route 1
  {
    id: "bus-01",
    number: "Bus 01",
    name: "Staff & Teacher Bus",
    type: "Staff & Teacher",
    status: "On Route",
    nextStop: "Mokamtola",
    eta: "5 mins",
    route: "Gobindaganj",
    stops: ["Gobindaganj", "Fashitola", "Mokamtola", "Sathmatha", "Mohasthan", "PUB Campus"],
  },
  {
    id: "bus-02",
    number: "Bus 02",
    name: "General Student Bus",
    type: "Student",
    status: "On Route",
    nextStop: "Fashitola",
    eta: "8 mins",
    route: "Gobindaganj",
    stops: ["Gobindaganj", "Fashitola", "Mokamtola", "Sathmatha", "Mohasthan", "PUB Campus"],
  },
  {
    id: "bus-03",
    number: "Bus 03",
    name: "General Student Bus",
    type: "Student",
    status: "Not Started",
    nextStop: "N/A",
    eta: "N/A",
    route: "Gobindaganj",
    stops: ["Gobindaganj", "Fashitola", "Mokamtola", "Sathmatha", "Mohasthan", "PUB Campus"],
  },
  // Route 2
  {
    id: "bus-04",
    number: "Bus 04",
    name: "via Sathmatha (Rail Gate)",
    type: "Student",
    status: "On Route",
    nextStop: "Sathmatha",
    eta: "12 mins",
    route: "Sherpur",
    stops: ["Sherpur", "Sathmatha", "Rail Gate", "PUB Campus"],
  },
  {
    id: "bus-05",
    number: "Bus 05",
    name: "via Inner Road",
    type: "Student",
    status: "Delayed",
    nextStop: "Inner Road",
    eta: "15 mins",
    route: "Sherpur",
    stops: ["Sherpur", "Inner Road", "Sathmatha", "PUB Campus"],
  },
  // Route 3
  {
    id: "bus-06",
    number: "Bus 06",
    name: "Gabtoli Special",
    type: "Student",
    status: "Not Started",
    nextStop: "N/A",
    eta: "N/A",
    route: "Gabtoli",
    stops: ["Gabtoli", "Intermediate Stop 1", "Intermediate Stop 2", "PUB Campus"],
  },
  // Route 4
  {
    id: "bus-07",
    number: "Bus 07",
    name: "Bogura Express",
    type: "Student",
    status: "On Route",
    nextStop: "Town Hall",
    eta: "3 mins",
    route: "Sathmatha/Bogura",
    stops: ["Sathmatha/Bogura", "Town Hall", "College Road", "PUB Campus"],
  },
  // Route 5
  {
    id: "bus-08",
    number: "Bus 08",
    name: "Dupchachia Line",
    type: "Student",
    status: "On Route",
    nextStop: "Market Area",
    eta: "10 mins",
    route: "Dupchachia",
    stops: ["Dupchachia", "Market Area", "Bus Stand", "PUB Campus"],
  },
];

const ROUTES = ["All", "Gobindaganj", "Sherpur", "Gabtoli", "Sathmatha/Bogura", "Dupchachia"];

function BusCard({ bus }: { bus: BusData }) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    "On Route": "bg-green-500",
    "Not Started": "bg-slate-400",
    "Delayed": "bg-amber-500",
  };

  return (
    <div 
      className="card-hover-premium group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Bus className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{bus.number}</h3>
            <p className="text-xs font-medium text-ink/60">{bus.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-ink/70">
            {bus.route}
          </span>
          {bus.type === "Staff & Teacher" && (
            <span className="animate-pulse rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold text-accent">
              Staff & Teacher Bus
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${statusColors[bus.status]}`} />
            <span className="text-sm font-bold text-ink/80">{bus.status}</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/40">ETA</span>
            <span className="text-sm font-bold text-primary">{bus.eta}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/40">Next Stop</span>
            <span className="text-sm font-bold text-ink">{bus.nextStop}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setExpanded(!expanded)}
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-slate-50 py-3 text-xs font-bold text-ink/70 transition-colors hover:bg-slate-100"
      >
        {expanded ? "Hide Route" : "View Full Route"}
        <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>

      {expanded && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
          <div className="relative space-y-4 pl-4 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-100">
            {bus.stops.map((stop, i) => (
              <div key={i} className="relative flex items-center gap-4">
                <div className={`z-10 h-2 w-2 rounded-full ring-4 ring-white ${stop === bus.nextStop ? "bg-primary scale-125" : "bg-slate-300"}`} />
                <span className={`text-xs font-medium ${stop === bus.nextStop ? "font-bold text-primary" : "text-ink/60"}`}>
                  {stop}
                </span>
              </div>
            ))}
          </div>
          <a 
            href="/live-location" 
            className="mt-6 block rounded-2xl bg-primary/10 py-3 text-center text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Track on Map
          </a>
        </div>
      )}
    </div>
  );
}

function BusesPage() {
  const [activeRoute, setActiveRoute] = useState("All");

  const filteredBuses = useMemo(() => {
    if (activeRoute === "All") return BUSES_DATA;
    return BUSES_DATA.filter(b => b.route === activeRoute);
  }, [activeRoute]);

  const busesByRoute = useMemo(() => {
    const grouped: Record<string, BusData[]> = {};
    filteredBuses.forEach(bus => {
      if (!grouped[bus.route]) grouped[bus.route] = [];
      grouped[bus.route].push(bus);
    });
    return grouped;
  }, [filteredBuses]);

  return (
    <main className="min-h-screen bg-[#F0F9FF]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src={pubLogo.url} alt="Logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">
              PUB Bus Track
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="/" className="text-sm font-bold text-ink/60 hover:text-primary transition-colors">Home</a>
            <a href="/live-location" className="text-sm font-bold text-ink/60 hover:text-primary transition-colors">Live Location</a>
            <a href="/buses" className="text-sm font-bold text-primary">Buses</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">Active Buses</h1>
            <p className="mt-4 max-w-2xl text-lg font-medium text-ink/60">
              Track all Pundra University buses in real-time. Check live status, next stops, and arrival estimates.
            </p>
          </div>
        </Reveal>

        {/* Filters */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-2">
            {ROUTES.map(route => (
              <button
                key={route}
                onClick={() => setActiveRoute(route)}
                className={`whitespace-nowrap rounded-2xl px-6 py-3 text-sm font-bold transition-all ${
                  activeRoute === route 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "bg-white text-ink/60 hover:bg-slate-50"
                }`}
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        {/* Routes & Cards */}
        <div className="space-y-16">
          {Object.entries(busesByRoute).map(([routeName, buses]) => (
            <div key={routeName} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-display text-2xl font-bold text-ink">{routeName} Route</h2>
                <div className="h-px flex-1 bg-slate-200" />
                <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-ink/40 shadow-sm ring-1 ring-black/5">
                  {buses.length} {buses.length === 1 ? "Bus" : "Buses"}
                </span>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {buses.map((bus, idx) => (
                  <Reveal key={bus.id} delay={idx * 0.1}>
                    <BusCard bus={bus} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(busesByRoute).length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-[3rem] bg-white py-20 text-center shadow-xl ring-1 ring-black/5">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
                <Info className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-ink">No buses found</h3>
              <p className="mt-2 text-ink/60">Try selecting a different route filter.</p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
