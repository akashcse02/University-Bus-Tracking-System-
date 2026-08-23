import React from "react";
import pubBus from "@/assets/pub-bus.png.asset.json";
import pubLogo from "@/assets/pub-logo.png.asset.json";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div 
        className="absolute left-[2%] top-[10%] opacity-30 blur-2xl animate-cloud-drift lg:opacity-40"
        style={{ 
          width: '300px', 
          height: '120px', 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
          borderRadius: '50%'
        }}
      />
      <div 
        className="absolute right-[5%] top-[5%] opacity-20 blur-3xl animate-cloud-drift lg:opacity-30"
        style={{ 
          width: '400px', 
          height: '150px', 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)',
          animationDirection: 'reverse',
          borderRadius: '50%'
        }}
      />
      <div 
        className="absolute left-[20%] top-[30%] opacity-15 blur-[80px] animate-cloud-drift lg:opacity-20"
        style={{ 
          width: '800px', 
          height: '300px', 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 60%, transparent 90%)',
          animationDuration: '120s',
          borderRadius: '50%',
          zIndex: -1
        }}
      />
    </div>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_bottom,var(--color-sky-top),var(--color-sky-bottom)_62%,var(--color-background))] font-sans pb-10">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-10">
        <Link to="/" className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white shadow-sm overflow-hidden">
            <img src={pubLogo.url} alt="Logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink hidden sm:block">
            PUB Bus Track
          </span>
        </Link>

        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-bold text-ink/70 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <Clouds />
      
      {/* Birds */}
      <div className="absolute top-[5%] left-0 z-0 opacity-20 animate-bird-glide">
         <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor" className="text-ink">
            <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="currentColor" fill="none" strokeWidth="2" />
         </svg>
      </div>

      {/* Butterflies */}
      <div className="absolute top-[20%] left-[10%] z-0 opacity-40 animate-butterfly-1">
         <div className="h-4 w-4 rounded-full bg-accent/40 blur-sm" />
      </div>
      <div className="absolute bottom-[20%] right-[10%] z-0 opacity-40 animate-butterfly-2">
         <div className="h-4 w-4 rounded-full bg-primary/40 blur-sm" />
      </div>

      {/* Idling Bus (only desktop) */}
      <div className="absolute bottom-10 left-10 z-0 hidden lg:block opacity-60 animate-bus-idle">
        <img src={pubBus.url} alt="" className="w-48 object-contain" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-5">
        {children}
      </div>
    </div>
  );
}
