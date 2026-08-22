import { createFileRoute } from "@tanstack/react-router";
import { Bus, MapPin, Clock, Apple, Play, Menu, Globe, ChevronDown, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { StatsStrip } from "@/components/stats-strip";
import { LiveMapDemo } from "@/components/live-map-demo";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialsStrip } from "@/components/testimonials-strip";
import { FaqSection } from "@/components/faq-section";
import { EmailSignup } from "@/components/email-signup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import pubBus from "@/assets/pub-bus.png.asset.json";
import pubLogo from "@/assets/pub-logo.png.asset.json";
import pundraUni from "@/assets/pundra-university.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "PUB Bus Track — Live Pundra University Bus Tracking",
    meta: [
      { name: "description", content: "Track your Pundra University bus in real time. Live locations, routes, schedules and arrival times for students in Bogura." },
      { name: "keywords", content: "Pundra University, Bus Track, Bogura, University Transport, Live Tracking, Student Shuttle" },
      { property: "og:title", content: "PUB Bus Track — Live University Bus Tracking" },
      { property: "og:description", content: "Live bus locations, routes and time schedules for Pundra University students. Never miss your ride to campus." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://id-preview--a6d5566a-cf5d-4912-b2a0-7293faebb634.lovable.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preload", href: pundraUni.url, as: "image", fetchpriority: "high" },
      { rel: "preload", href: pubBus.url, as: "image", fetchpriority: "high" }
    ]
  }),
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Live Location", href: "#live-location" },
  { label: "Buses", href: "#buses" },
  { label: "Time Schedule", href: "#schedule" },
  { label: "Routes", href: "#routes" },
  { label: "How it works", href: "#how-it-works" },
];

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute left-[4%] top-[14%] w-40 opacity-80 animate-float-slow md:w-64" viewBox="0 0 200 70" fill="white">
        <ellipse cx="60" cy="45" rx="55" ry="22" />
        <ellipse cx="105" cy="34" rx="42" ry="28" />
        <ellipse cx="145" cy="48" rx="45" ry="19" />
      </svg>
      <svg className="absolute right-[6%] top-[9%] w-32 opacity-70 animate-float md:w-52" viewBox="0 0 200 70" fill="white">
        <ellipse cx="70" cy="44" rx="58" ry="21" />
        <ellipse cx="118" cy="32" rx="40" ry="26" />
      </svg>
      <svg className="absolute left-[38%] top-[3%] hidden w-40 opacity-60 animate-float-slow lg:block" viewBox="0 0 200 70" fill="white">
        <ellipse cx="90" cy="42" rx="62" ry="20" />
        <ellipse cx="130" cy="32" rx="38" ry="24" />
      </svg>
    </div>
  );
}

function HeroAnimation() {
  return (
    <div className="absolute inset-x-0 -bottom-8 h-48 pointer-events-none">
      <svg
        aria-hidden
        viewBox="0 0 800 200"
        className="h-full w-full opacity-40"
        preserveAspectRatio="none"
      >
        <path
          id="heroRoute"
          d="M 50 150 C 200 150, 400 50, 750 50"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="8 12"
          className="animate-dash"
        />
        
        {/* Animated Location Pin */}
        <g className="animate-drive" style={{ offsetPath: "path('M 50 150 C 200 150, 400 50, 750 50')", offsetRotate: "0deg" }}>
          <circle r="20" fill="var(--color-primary)" className="opacity-20 animate-ping-slow" />
          <g transform="translate(-10,-24)">
            <MapPin className="h-5 w-5 text-primary fill-current" />
          </g>
        </g>
      </svg>
      
      {/* Student House Illustration (Left) */}
      <div className="absolute left-[5%] bottom-[10%] flex flex-col items-center animate-float">
        <div className="relative mb-2">
          <div className="h-16 w-16 rounded-2xl bg-white shadow-xl flex items-center justify-center">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent animate-ping-slow flex items-center justify-center">
             <div className="h-2 w-2 rounded-full bg-accent-foreground" />
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60">Your Home</span>
      </div>

      {/* University Campus (Right) */}
      <div className="absolute right-[5%] top-[10%] flex flex-col items-center animate-float-slow">
        <div className="h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center">
          <Bus className="h-10 w-10 text-accent" />
        </div>
        <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-accent">PUB Campus</span>
      </div>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["how-it-works", "stats", "footer", "live-location", "buses", "schedule", "routes"];
      let current = "Home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            const link = navLinks.find(l => l.href === `#${section}`);
            if (link) current = link.label;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,var(--color-sky-top),var(--color-sky-bottom)_62%,var(--color-background))]">
      <Clouds />

      <header className="relative z-20 mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 lg:flex lg:justify-between">
        <a href="#" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_6px_14px_-6px_var(--color-ink)] overflow-hidden">
            <img src={pubLogo.url} alt="Logo" className="w-full h-full object-cover" />
          </span>
          <span className="truncate font-display text-xl font-extrabold tracking-tight text-ink">
            PUB Bus Track
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                if (l.href.startsWith("#")) {
                  e.preventDefault();
                  const id = l.href.replace("#", "");
                  if (!id) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className={`story-link text-sm font-bold transition-all duration-300 hover:text-accent hover:scale-110 ${
                activeSection === l.label ? "text-accent border-b-2 border-accent" : "text-ink/80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-secondary cursor-pointer">
              <Globe className="h-3.5 w-3.5" />
              {language}
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-xl">
              {["English", "Bangla", "Arabic"].map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="rounded-xl font-bold cursor-pointer"
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-card"
            >
              Login
            </a>
            <a
              href="#"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_10px_20px_-10px_var(--color-ink)] transition-transform hover:scale-105"
            >
              Sign Up
            </a>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card text-ink shadow-sm lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {open && (
          <div className="col-span-2 rounded-3xl bg-card p-4 shadow-lg animate-scale-in lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => {
                    if (l.href.startsWith("#")) {
                      e.preventDefault();
                      const id = l.href.replace("#", "");
                      if (!id) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                      }
                      setOpen(false);
                    }
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-bold hover:bg-secondary ${
                    activeSection === l.label ? "text-primary bg-secondary/30" : "text-ink"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex gap-2">
              <a href="#" className="flex-1 rounded-full border border-border py-2 text-center text-sm font-bold text-ink">
                Login
              </a>
              <a href="#" className="flex-1 rounded-full bg-primary py-2 text-center text-sm font-bold text-primary-foreground">
                Sign Up
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-6 lg:pt-10">
        <div className="relative z-20 mx-auto max-w-2xl text-center">
          {/* Logo centered in the middle of the hero */}
          <div className="mb-6 flex justify-center opacity-0 animate-[rise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:400ms]">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl animate-float lg:h-20 lg:w-20"
              role="img"
              aria-label="PUB Bus Track logo"
            >
              <img src={pubLogo.url} alt="" className="h-full w-full object-contain" />
            </div>
          </div>

          <h1 className="animate-rise font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Your Ride, Campus,
            <br className="hidden sm:block" /> On Time
          </h1>
          <p className="mx-auto mt-5 max-w-lg animate-rise text-base text-ink/75 [animation-delay:120ms] sm:text-lg">
            Track your university bus in real-time — buses, routes, and schedules in one
            place.
          </p>
        </div>

        <div className="relative mt-12 [perspective:1000px] lg:mt-0 lg:flex lg:items-center lg:justify-between">
          {/* Left side: Pundra University Building */}
          <div 
            className="relative z-10 w-full opacity-0 animate-[slide-in-3d-left_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] lg:w-[45%]"
          >
            <div 
              className="relative transition-transform duration-700 animate-[float-subtle_5s_ease-in-out_infinite]"
              style={{ 
                transformStyle: 'preserve-3d',
                '--resting-rotate': '15deg'
              } as React.CSSProperties}
            >
              <img
                src={pundraUni.url}
                alt="Pundra University main campus building with modern architectural design"
                className="aspect-[4/3] w-full object-contain [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.1))]"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            
            {/* Animated Waiting Student Character */}
            <div className="absolute right-4 bottom-4 z-20 animate-shift-weight md:right-8 lg:right-12">
              <div className="relative h-20 w-16 md:h-28 md:w-20">
                {/* Simplified Illustrated Student SVG */}
                <svg viewBox="0 0 80 120" className="h-full w-full drop-shadow-lg">
                  <circle cx="40" cy="30" r="12" fill="#FFD2B2" /> {/* Head */}
                  <rect x="30" y="42" width="20" height="40" rx="8" fill="var(--color-primary)" /> {/* Torso */}
                  <rect x="32" y="82" width="8" height="25" rx="4" fill="#333" /> {/* Left Leg */}
                  <rect x="42" y="82" width="8" height="25" rx="4" fill="#333" /> {/* Right Leg */}
                  <rect x="48" y="45" width="6" height="30" rx="3" fill="#FFD2B2" transform="rotate(-15, 48, 45)" className="origin-top animate-[shift-weight_3s_infinite]" /> {/* Arm checking phone */}
                  {/* Phone */}
                  <rect x="52" y="68" width="8" height="12" rx="2" fill="#000" transform="rotate(-15, 52, 68)" />
                  {/* Backpack */}
                  <rect x="25" y="45" width="12" height="25" rx="4" fill="var(--color-accent)" />
                </svg>
                {/* Floating "Waiting..." badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[10px] font-bold shadow-md animate-bounce">
                  Waiting...
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Bus Image & Phone Mockup */}
          <div 
            className="relative z-10 mt-12 w-full opacity-0 animate-[slide-in-3d-right_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:300ms] lg:mt-0 lg:w-[45%]"
          >
            <div 
              className="relative transition-transform duration-700 animate-[float-subtle_6s_ease-in-out_infinite]"
              style={{ 
                transformStyle: 'preserve-3d',
                '--resting-rotate': '-15deg'
              } as React.CSSProperties}
            >
              <img
                src={pubBus.url}
                alt="PUB Bus Track university shuttle bus with brand livery"
                className="aspect-[4/3] w-full object-contain [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.1))]"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* Floating Phone Mockup */}
            <div className="absolute -left-6 top-1/2 z-20 -translate-y-1/2 scale-75 md:left-0 md:scale-100 animate-float">
              <div className="h-48 w-24 overflow-hidden rounded-[2rem] border-[4px] border-ink bg-card shadow-2xl md:h-64 md:w-32">
                {/* Phone Screen: Live Map */}
                <div className="relative h-full w-full bg-sky-top/20">
                  {/* Map Grid */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--color-ink) 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                  
                  {/* Moving Bus Dot */}
                  <div className="absolute left-[30%] top-[40%] animate-[drive_10s_linear_infinite]" style={{ offsetPath: "path('M 0 0 C 20 20, 40 10, 60 50')", offsetRotate: "0deg" }}>
                     <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        <div className="absolute -inset-1 animate-ping rounded-full bg-primary opacity-30" />
                     </div>
                  </div>

                  {/* ETA Card */}
                  <div className="absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 rounded-xl bg-white p-2 shadow-lg animate-rise [animation-delay:1s]">
                    <div className="text-[8px] font-bold text-ink/60 uppercase tracking-wider">Next Bus</div>
                    <div className="text-[10px] font-extrabold text-primary">12 minutes</div>
                    <div className="text-[7px] text-ink/40">Arrive at 9:15 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <Reveal className="mt-14">
          <StatsStrip />
        </Reveal>
      </section>

      {/* Live map demo */}
      <section id="live-location" className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Follow your bus <span className="text-accent">live</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            Stops light up as the shuttle passes them — from Gobindaganj all the way to Gabtoli.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-9">
          <LiveMapDemo />
        </Reveal>
      </section>

      <div id="buses" />
      <div id="schedule" />
      <div id="routes" />

      <div className="hidden">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''

For the code present, I get the error below.

Please think step-by-step in order to resolve it.
```
Cannot read properties of null (reading 'useRef')

{
  "timestamp": 1787429999847,
  "error_type": "RUNTIME_ERROR",
  "filename": "/",
  "lineno": 0,
  "colno": 0,
  "stack": "TypeError: Cannot read properties of null (reading 'useRef')\n    at exports.useRef (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react.js?v=32cc71de:745:30)\n    at useConstant (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/framer-motion.js?v=c9bda9af:18:38)\n    at useScroll (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/framer-motion.js?v=c9bda9af:12695:17)\n    at Card (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/src/components/how-it-works.tsx?t=1787429995096:45:30)\n    at Object.react_stack_bottom_frame (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react-dom_client.js?v=0c1fde47:12864:12)\n    at renderWithHooks (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react-dom_client.js?v=0c1fde47:4211:19)\n    at updateFunctionComponent (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react-dom_client.js?v=0c1fde47:5567:16)\n    at beginWork (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react-dom_client.js?v=0c1fde47:6138:20)\n    at runWithFiberInDEV (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react-dom_client.js?v=0c1fde47:850:66)\n    at performUnitOfWork (https://a6d5566a-cf5d-4912-b2a0-7293faebb634.lovableproject.com/node_modules/.vite/deps/react-dom_client.js?v=0c1fde47:8427:92)",
  "has_blank_screen": true
}
```
      </div>

      <HowItWorks />
      
      <TestimonialsStrip />

      <FaqSection />
      
      <EmailSignup />

      <div className="hidden">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            Connect the navbar links to their sections with smooth scrolling for Home, Live Location, Buses, Time Schedule, and Routes.
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20">
        {/* Download section */}
        <div
          id="download"
          className="mx-auto mt-16 max-w-3xl animate-rise rounded-[2rem] bg-card p-7 text-center shadow-[0_28px_50px_-30px_var(--color-ink)] sm:p-10"
        >
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Download PUB Bus Track App
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            Live locations, arrival alerts and full schedules — right in your pocket.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-3 text-left text-background transition-transform hover:scale-105 sm:w-auto"
            >
              <Apple className="h-6 w-6 shrink-0" />
              <span className="leading-tight">
                <span className="block text-[0.6rem] uppercase tracking-widest opacity-75">
                  Download on the
                </span>
                <span className="block font-display text-base font-bold">App Store</span>
              </span>
            </a>
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-3 text-left text-background transition-transform hover:scale-105 sm:w-auto"
            >
              <Play className="h-6 w-6 shrink-0" />
              <span className="leading-tight">
                <span className="block text-[0.6rem] uppercase tracking-widest opacity-75">
                  Get it on
                </span>
                <span className="block font-display text-base font-bold">Google Play</span>
              </span>
            </a>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Live location", value: "Every 10 seconds" },
              { icon: Clock, label: "Schedules", value: "Morning to evening" },
              { icon: Bus, label: "Fleet", value: "8 campus buses" },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl bg-secondary px-4 py-4">
                <f.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 font-display text-sm font-extrabold text-ink">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}
