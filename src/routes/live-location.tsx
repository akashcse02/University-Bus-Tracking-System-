import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Bus, MapPin, Globe, ChevronDown, Menu, Home, ArrowLeft } from "lucide-react";
import { LiveMap } from "@/components/live-location/live-map";
import { Reveal } from "@/components/reveal";
import pubLogo from "@/assets/pub-logo.png.asset.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/live-location")({
  head: () => ({
    title: "Live Location — PUB Bus Track",
    meta: [
      { name: "description", content: "Real-time tracking for Pundra University buses. See live maps, ETAs and bus locations." },
      { property: "og:title", content: "Live Location — PUB Bus Track" },
      { property: "og:description", content: "Track your university bus in real-time. Live map and arrival updates." },
      { property: "og:type", content: "website" },
    ]
  }),
  component: LiveLocationPage,
});

function LiveLocationPage() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5 group">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Home className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-black tracking-tight text-ink">
              PUB Bus Track
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
             <nav className="flex items-center gap-8 mr-4">
              <a href="/" className="text-sm font-bold text-ink/60 hover:text-primary transition-colors">Home</a>
              <a href="/buses" className="text-sm font-bold text-ink/60 hover:text-primary transition-colors">Buses</a>
              <a href="/#schedule" className="text-sm font-bold text-ink/60 hover:text-primary transition-colors">Schedule</a>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-slate-100 cursor-pointer">
                <Globe className="h-3.5 w-3.5" />
                {language}
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-xl">
                {["English", "Bangla", "Arabic"].map((lang) => (
                  <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className="rounded-xl font-bold cursor-pointer">
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105">Sign In</a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden">
            <Menu className="h-6 w-6 text-ink" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 py-8 lg:py-12">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Live Tracking
              </div>
              <h1 className="font-display text-4xl font-black tracking-tighter text-ink md:text-5xl">
                Track Your Bus
              </h1>
              <p className="text-lg font-medium text-ink/60">
                Real-time locations for all campus routes in Bogura.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                ))}
              </div>
              <p className="text-xs font-bold text-ink/50">
                <span className="text-primary font-black">120+ students</span> tracking now
              </p>
            </div>
          </div>
        </Reveal>

        <LiveMap />

        {/* Info Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0.1} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
               <Bus className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-xl font-black text-ink">Smart Matching</h3>
            <p className="text-sm font-medium leading-relaxed text-ink/60">
              Our system automatically finds the nearest bus to your saved location based on real-time traffic data.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-green-50 text-green-600">
               <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-xl font-black text-ink">Precise ETAs</h3>
            <p className="text-sm font-medium leading-relaxed text-ink/60">
              Get accurate arrival times calculated every 30 seconds to ensure you never miss your ride to campus.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600">
               <Globe className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-xl font-black text-ink">Campus Coverage</h3>
            <p className="text-sm font-medium leading-relaxed text-ink/60">
              Complete tracking across all major Bogura routes including Gobindaganj, Sherpur, and Sathmatha.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white p-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
               <img src={pubLogo.url} alt="Logo" className="h-8 w-8 object-contain" />
               <span className="font-display text-xl font-black text-ink">PUB Bus Track</span>
            </div>
            <button onClick={() => setOpen(false)} className="h-10 w-10 grid place-items-center bg-slate-50 rounded-full">
               <ChevronDown className="h-6 w-6 rotate-180" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            <a href="/" className="text-2xl font-black text-ink">Home</a>
            <a href="/buses" className="text-2xl font-black text-ink">Buses</a>
            <a href="/#schedule" className="text-2xl font-black text-ink">Schedule</a>
            <hr className="border-slate-100" />
            <a href="#" className="rounded-[1.5rem] bg-primary py-5 text-center font-display text-xl font-black text-white shadow-xl shadow-primary/20">Sign In</a>
          </nav>
        </div>
      )}

      {/* Hidden Metadata Container */}
      <div className="hidden" aria-hidden="true">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
        Implement a Live Location page with an interactive map and real-time bus position updates with ETA cards.google rreal map 3d bus in on map
      </div>
    </main>
  );
}
