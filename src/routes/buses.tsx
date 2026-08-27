import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Bus, MapPin, Info, Menu, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { Clouds } from "@/components/auth-layout";
import { BusIllustration, RoadStrip, Scenery, routeAccent, PREMIUM_TRIM } from "@/components/buses/bus-illustration";
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

function BusTile({ bus, onOpen }: { bus: BusData; onOpen: () => void }) {
  const premium = bus.type === "Staff & Teacher";
  const accent = premium ? PREMIUM_TRIM : routeAccent(bus.route);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card-hover-premium group relative flex w-full flex-col items-center rounded-3xl bg-white/85 p-5 pt-7 text-left shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-primary sm:p-6 sm:pt-8"
    >
      <BusIllustration
        number={bus.number}
        route={bus.route}
        status={bus.status}
        premium={premium}
      />

      <div className="mt-4 w-full text-center">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{bus.number}</h3>
        <p className="mt-1 text-xs font-medium text-ink/50">{bus.route} Route</p>
        <p className="mt-0.5 text-[11px] font-medium text-ink/40">{bus.name}</p>
        {premium && (
          <span
            className="mt-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold"
            style={{ backgroundColor: `color-mix(in oklab, ${accent} 22%, transparent)`, color: "#7a5a12" }}
          >
            Staff & Teacher Bus
          </span>
        )}
      </div>
    </button>
  );
}

function BusModal({ bus, onClose }: { bus: BusData; onClose: () => void }) {
  const premium = bus.type === "Staff & Teacher";
  const accent = premium ? PREMIUM_TRIM : routeAccent(bus.route);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm animate-in fade-in sm:items-center">
      <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl animate-in slide-in-from-bottom-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-2 text-ink/40 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `color-mix(in oklab, ${accent} 15%, transparent)`, color: accent }}>
            <Bus className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold text-ink">{bus.number}</h3>
            <p className="text-xs font-medium text-ink/60">{bus.name} &middot; {bus.route}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/40">Status</span>
            <span className="text-sm font-bold text-ink">{bus.status}</span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/40">ETA</span>
            <span className="text-sm font-bold text-primary">{bus.eta}</span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/40">Next Stop</span>
            <span className="text-sm font-bold text-ink">{bus.nextStop}</span>
          </div>
        </div>

        <div className="mt-6 relative space-y-4 pl-4 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-100">
          {bus.stops.map((stop, i) => (
            <div key={i} className="relative flex items-center gap-4">
              <div
                className="z-10 h-2 w-2 rounded-full ring-4 ring-white"
                style={{ backgroundColor: stop === bus.nextStop ? accent : "#c3d3e6" }}
              />
              <span className={`text-xs font-medium ${stop === bus.nextStop ? "font-bold text-ink" : "text-ink/60"}`}>
                {stop}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/live-location"
          className="mt-7 block rounded-2xl py-3 text-center text-xs font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: accent }}
        >
          Track on Map
        </a>
      </div>
    </div>
  );
}

function BusesPage() {
  const [activeRoute, setActiveRoute] = useState("All");
  const [selected, setSelected] = useState<BusData | null>(null);

  const filteredBuses = useMemo(() => {
    if (activeRoute === "All") return BUSES_DATA;
    return BUSES_DATA.filter(b => b.route === activeRoute);
  }, [activeRoute]);

  const busesByRoute = useMemo(() => {
    const grouped: Record<string, BusData[]> = {};
    filteredBuses.forEach(bus => {
      const route = bus.route;
      if (!grouped[route]) grouped[route] = [];
      grouped[route]!.push(bus);
    });
    return grouped;
  }, [filteredBuses]);


  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,var(--color-sky-top),#F2F7FD_45%)]">
      <Clouds />
      <Scenery />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 gap-4">
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src={pubLogo.url} alt="Logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-ink nav-item-nowrap">
              PUB Bus Track
            </span>
          </a>
          <nav className="hidden items-center gap-4 lg:flex">
            <a href="/" className="nav-link-clean text-ink/60">Home</a>
            <a href="/live-location" className="nav-link-clean text-ink/60">Live Location</a>
            <a href="/buses" className="nav-link-clean active">Buses</a>
          </nav>

          <button 
            className="lg:hidden p-2 hover:bg-white/40 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6 text-ink" />
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
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
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {buses.map((bus, idx) => (
                  <Reveal key={bus.id} delay={idx * 80}>
                    <BusTile bus={bus} onOpen={() => setSelected(bus)} />
                  </Reveal>
                ))}
              </div>
              <RoadStrip className="mt-2" />
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

      {selected && <BusModal bus={selected} onClose={() => setSelected(null)} />}

      <SiteFooter />

    </main>
  );
}

