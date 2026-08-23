import { useState, useEffect } from "react";
import { Bus, Clock, MapPin, Navigation, Info, Shield, Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

interface BusData {
  id: string;
  number: string;
  route: string;
  status: "on-time" | "delayed" | "stopped";
  eta: string;
  passengers: number;
  lat: number;
  lng: number;
}

const DUMMY_BUSES: BusData[] = [
  { id: "1", number: "PUB-01", route: "Gobindaganj Route", status: "on-time", eta: "5 min", passengers: 42, lat: 24.8481, lng: 89.3730 },
  { id: "2", number: "PUB-02", route: "Sherpur Route", status: "delayed", eta: "12 min", passengers: 38, lat: 24.8510, lng: 89.3690 },
  { id: "3", number: "PUB-03", route: "Sathmatha Route", status: "on-time", eta: "8 min", passengers: 55, lat: 24.8450, lng: 89.3780 },
  { id: "4", number: "PUB-04", route: "Gabtoli Route", status: "on-time", eta: "15 min", passengers: 20, lat: 24.8550, lng: 89.3850 },
];

export function LiveMap() {
  const [selectedBus, setSelectedBus] = useState<BusData | null>(DUMMY_BUSES[0] || null);
  const [search, setSearch] = useState("");

  const filteredBuses = DUMMY_BUSES.filter(b => 
    b.number.toLowerCase().includes(search.toLowerCase()) || 
    b.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
      {/* Sidebar: Bus List */}
      <Reveal className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input 
            type="text" 
            placeholder="Search bus or route..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-2xl bg-white px-11 text-sm font-medium shadow-sm outline-none ring-primary/20 transition-all focus:ring-4"
          />
        </div>

        <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredBuses.map((bus) => (
            <button
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className={`flex items-start gap-4 rounded-3xl p-4 text-left transition-all ${
                selectedBus?.id === bus.id 
                  ? "bg-primary text-primary-foreground shadow-xl scale-[1.02]" 
                  : "bg-white hover:bg-white/80 text-ink shadow-sm"
              }`}
            >
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                selectedBus?.id === bus.id ? "bg-white/20" : "bg-primary/10 text-primary"
              }`}>
                <Bus className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black tracking-tight">{bus.number}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    bus.status === 'delayed' 
                      ? "bg-orange-500/20 text-orange-200" 
                      : (selectedBus?.id === bus.id ? "bg-white/20 text-white" : "bg-green-500/10 text-green-600")
                  }`}>
                    {bus.status}
                  </span>
                </div>
                <p className={`text-xs font-bold opacity-80 line-clamp-1`}>{bus.route}</p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <Clock className="h-3 w-3" />
                    {bus.eta}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <Navigation className="h-3 w-3" />
                    Live
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Main Map View */}
      <Reveal delay={0.2} className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-2xl lg:min-h-full">
        {/* Mock Map Background (Realistic Gradient-based Grid) */}
        <div className="absolute inset-0 bg-[#e5e7eb]">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Mock Roads */}
          <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
             <path d="M0 100 Q 400 150 800 100" stroke="#fff" strokeWidth="40" fill="none" />
             <path d="M100 0 Q 150 300 100 600" stroke="#fff" strokeWidth="40" fill="none" />
             <path d="M600 0 Q 550 300 600 600" stroke="#fff" strokeWidth="40" fill="none" />
             <path d="M0 400 Q 400 350 800 400" stroke="#fff" strokeWidth="40" fill="none" />
          </svg>

          {/* Bus Markers */}
          {DUMMY_BUSES.map((bus) => (
            <div 
              key={bus.id}
              className={`absolute transition-all duration-1000 ease-in-out cursor-pointer hover:z-50`}
              style={{ 
                left: `${(bus.lng - 89.36) * 4000}%`, 
                top: `${(bus.lat - 24.84) * 4000}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedBus(bus)}
            >
              <div className="relative group">
                <div className={`relative flex items-center justify-center h-12 w-12 rounded-full shadow-lg transition-transform group-hover:scale-110 ${
                  selectedBus?.id === bus.id ? "bg-primary scale-110" : "bg-white"
                }`}>
                  <Bus className={`h-6 w-6 ${selectedBus?.id === bus.id ? "text-white" : "text-primary"}`} />
                  
                  {/* Pulse Effect */}
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                    selectedBus?.id === bus.id ? "bg-primary" : "bg-white"
                  }`} />
                </div>
                
                {/* Mini Label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-[10px] font-black text-white shadow-md opacity-0 transition-opacity group-hover:opacity-100">
                  {bus.number}
                </div>
              </div>
            </div>
          ))}

          {/* User Location Marker */}
          <div className="absolute left-[45%] top-[55%] -translate-x-1/2 -translate-y-1/2">
            <div className="h-6 w-6 rounded-full border-4 border-white bg-blue-500 shadow-lg animate-pulse" />
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute right-6 top-6 flex flex-col gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-xl bg-white text-ink shadow-lg transition-colors hover:bg-slate-50">
            <Search className="h-5 w-5" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-xl bg-white text-ink shadow-lg transition-colors hover:bg-slate-50">
             <MapPin className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Bus Info Card Overlay */}
        {selectedBus && (
          <div className="absolute bottom-6 left-6 right-6 animate-in slide-in-from-bottom-8 duration-500 lg:left-auto lg:right-6 lg:w-[350px]">
            <div className="rounded-[2.5rem] bg-white p-6 shadow-2xl ring-1 ring-ink/5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-black text-ink">{selectedBus.number}</h3>
                  <p className="text-xs font-bold text-ink/60 uppercase tracking-widest">{selectedBus.route}</p>
                </div>
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                  selectedBus.status === 'delayed' ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
                }`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${selectedBus.status === 'delayed' ? "bg-orange-600" : "bg-green-600"}`} />
                  {selectedBus.status}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold text-ink/40 uppercase tracking-wider">Estimated Arrival</p>
                  <p className="text-xl font-black text-primary">{selectedBus.eta}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold text-ink/40 uppercase tracking-wider">Bus Occupancy</p>
                  <p className="text-xl font-black text-ink">{selectedBus.passengers} Students</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1 rounded-2xl bg-primary py-6 font-display font-black shadow-lg shadow-primary/20 transition-transform active:scale-95">
                  Track Live
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-2 border-slate-100 text-ink transition-colors hover:bg-slate-50">
                  <Info className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </div>
  );
}
