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
      {/* Soft Realistic Clouds using SVG filters */}
      <svg className="absolute h-0 w-0">
        <filter id="cloud-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="25" />
        </filter>
      </svg>

      <div 
        className="absolute left-[5%] top-[12%] h-24 w-64 opacity-60 animate-float-slow blur-xl lg:h-32 lg:w-96"
        style={{ filter: 'url(#cloud-filter)', background: 'radial-gradient(circle, white, transparent 70%)' }}
      />
      <div 
        className="absolute right-[8%] top-[8%] h-20 w-48 opacity-50 animate-float blur-lg lg:h-28 lg:w-72"
        style={{ filter: 'url(#cloud-filter)', background: 'radial-gradient(circle, white, transparent 70%)' }}
      />
      <div 
        className="absolute left-[40%] top-[4%] hidden h-20 w-56 opacity-40 animate-float-slow blur-lg lg:block"
        style={{ filter: 'url(#cloud-filter)', background: 'radial-gradient(circle, white, transparent 70%)' }}
      />
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
      const sections = ["how-it-works", "stats", "live-location", "buses", "schedule", "routes", "footer"];
      let current = "Home";

      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 50) {
        current = "How it works";
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 120) {
              const link = navLinks.find(l => l.href === `#${section}`);
              if (link) current = link.label;
            }
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

      <header className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-8 lg:flex lg:justify-between">
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
                      const element = document.getElementById(id);
                      if (element) {
                        const navbarHeight = 0;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                        });
                      }
                    }
                  }
                }}
              className={`story-link text-sm font-bold transition-all duration-300 hover:text-accent hover:scale-110 ${
                activeSection === l.label ? "text-accent" : "text-ink/80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-white cursor-pointer">
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
                        const element = document.getElementById(id);
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                          });
                        }
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

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pt-6 lg:pt-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: University Building */}
          <div className="relative order-2 lg:order-1 lg:pr-12">
            <div className="relative mx-auto max-w-lg animate-[slide-in-3d-left_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] lg:mx-0 lg:max-w-none">
              <div className="relative animate-[float_6s_ease-in-out_infinite]">
                <img
                  src={pundraUni.url}
                  alt="Pundra University Building"
                  className="w-full object-contain [filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.12))]"
                />
                
                {/* Floating Labels properly anchored to image container */}
                <div className="absolute top-[30%] -left-4 z-20 flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-bold text-accent-foreground shadow-lg sm:text-xs">
                  <Clock className="h-3.5 w-3.5" /> Classes 9:00
                </div>
                <div className="absolute top-[10%] right-[10%] z-20 flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-primary-foreground shadow-lg sm:text-xs">
                  <Globe className="h-3.5 w-3.5" /> Student ID
                </div>
                <div className="absolute bottom-[20%] right-0 z-20 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-lg sm:text-xs">
                  <Bus className="h-3.5 w-3.5" /> Bus Pass
                </div>
                
                {/* Student Avatar standing beside building */}
                <div className="absolute -bottom-10 left-10 z-20">
                  <div className="relative h-24 w-16 sm:h-32 sm:w-24">
                    <svg viewBox="0 0 80 120" className="h-full w-full drop-shadow-xl">
                      <circle cx="40" cy="30" r="14" fill="#FFD2B2" />
                      <rect x="28" y="44" width="24" height="45" rx="10" fill="#4CAF50" />
                      <rect x="30" y="89" width="8" height="28" rx="4" fill="#3F51B5" />
                      <rect x="42" y="89" width="8" height="28" rx="4" fill="#3F51B5" />
                      <rect x="52" y="48" width="6" height="35" rx="3" fill="#FFD2B2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="relative z-20 order-1 text-center lg:order-2 lg:text-left">
            <div className="mb-6 flex justify-center opacity-0 animate-[rise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:400ms] lg:justify-start">
              <span className="rounded-full bg-white/60 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase shadow-sm">
                Pundra University
              </span>
            </div>

            <h1 className="animate-rise font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              Your Ride to
              <br />
              <span className="text-accent">Campus,</span>
              <br />
              On Time
            </h1>
            <p className="mx-auto mt-8 animate-rise text-lg font-medium text-ink/75 [animation-delay:120ms] sm:text-xl lg:mx-0 lg:max-w-md">
              Track your university bus in real-time — buses,
              routes, and schedules in one place.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-8 animate-rise [animation-delay:240ms] lg:items-start lg:justify-start">
              <a
                href="#how-it-works"
                className="group relative flex h-14 items-center justify-center rounded-full bg-primary px-10 font-display text-lg font-bold text-primary-foreground shadow-[0_20px_40px_-10px_var(--color-primary)] transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </a>

              <div className="flex flex-col items-center gap-4 lg:items-start">
                <span className="text-xs font-bold uppercase tracking-widest text-ink/40">
                  Download PUB Bus Track App
                </span>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex h-10 items-center gap-2 rounded-xl bg-ink px-4 text-background transition-transform hover:scale-105">
                    <Apple className="h-5 w-5" />
                    <div className="text-left leading-none">
                      <span className="block text-[0.5rem] uppercase opacity-60">Download on the</span>
                      <span className="block text-xs font-bold">App Store</span>
                    </div>
                  </a>
                  <a href="#" className="flex h-10 items-center gap-2 rounded-xl bg-ink px-4 text-background transition-transform hover:scale-105">
                    <Play className="h-5 w-5" />
                    <div className="text-left leading-none">
                      <span className="block text-[0.5rem] uppercase opacity-60">Get it on</span>
                      <span className="block text-xs font-bold">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bus and Phone visuals */}
        <div className="mt-20 hidden lg:block">
          <div className="flex items-end justify-between gap-12">
             {/* Large Phone Mockup */}
             <div className="relative z-10 w-[35%] animate-[slide-in-3d-right_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:200ms]">
                <div className="animate-[float_5s_ease-in-out_infinite]">
                  <div className="relative mx-auto h-[480px] w-60 overflow-hidden rounded-[3rem] border-[10px] border-ink bg-[#f0f4f8] shadow-2xl">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--color-ink) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 200">
                        <path d="M20 180 Q 50 150, 80 120 T 50 40" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
                        <circle cx="50" cy="40" r="4" fill="#FF9800" />
                        <MapPin className="absolute left-[45%] top-[15%] h-5 w-5 text-accent" />
                      </svg>
                      <div className="absolute top-1/2 left-4 w-40 rounded-xl bg-white p-3 shadow-lg">
                        <div className="text-[10px] font-bold text-ink/40">12 minutes</div>
                        <div className="text-xs font-bold text-primary">Arrive at 9:15</div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <div className="h-full w-2/3 bg-primary" />
                        </div>
                      </div>
                      <div className="absolute bottom-6 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                        <span className="text-[10px] font-bold">GO</span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>

             {/* Bus Image */}
             <div className="relative z-10 w-[55%] animate-[slide-in-3d-right_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:400ms]">
                <div className="animate-[float-slow_7s_ease-in-out_infinite]">
                  <img
                    src={pubBus.url}
                    alt="PUB Bus"
                    className="w-full object-contain [filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.1))]"
                  />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 mx-auto max-w-7xl px-5 mt-24 mb-16 lg:mt-32">
        <Reveal>
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

      <HowItWorks />
      
      <TestimonialsStrip />

      <FaqSection />
      
      <EmailSignup />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20">
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

      <div className="hidden" aria-hidden="true">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
        "Fix the hero section layout. Below are the exact issues, each clearly identified by element and location:

ISSUE 1 — Headline text overlapping building image
Fix: Create two separate columns in the hero — a LEFT column reserved only for the building image, and a RIGHT/CENTER column reserved only for the headline, subtext, and CTA button.

ISSUE 2 — 'Student ID' badge overlapping subtext
Fix: Anchor the badges directly to the building image's own bounding box.

ISSUE 3 — Stats row overlapping phone mockup
Fix: Move the entire stats row into its own full-width section BELOW the hero.

ISSUE 4 — Wrong/placeholder assets being used
Fix: Confirm real Pundra building and Teal bus assets are used.

ISSUE 5 — General inconsistent spacing across the hero
Fix: Apply a consistent spacing system with minimum 24px/60px gaps."
      </div>
    </main>
  );
}
