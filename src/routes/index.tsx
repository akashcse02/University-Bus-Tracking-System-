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
      const sections = ["how-it-works", "stats", "live-location", "buses", "schedule", "routes", "footer"];
      let current = "Home";

      // Calculate scroll position once
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Special case: bottom of the page highlights the last section
      if (scrollY + windowHeight >= documentHeight - 50) {
        current = "How it works"; // Or whichever is the last link you want to highlight
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Using a threshold that accounts for the sticky navbar
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

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-6 md:pb-32 lg:pt-10">
        <div className="relative z-20 mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center opacity-0 animate-[rise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:400ms]">
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
          <p className="mx-auto mt-8 max-w-lg animate-rise text-lg font-medium text-ink/75 [animation-delay:120ms] sm:text-xl">
            Track your university bus in real-time — buses,
            <br className="hidden sm:block" />
            routes, and schedules in one place.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 animate-rise [animation-delay:240ms]">
            <a
              href="#how-it-works"
              className="group relative flex h-14 items-center justify-center rounded-full bg-primary px-10 font-display text-lg font-bold text-primary-foreground shadow-[0_20px_40px_-10px_var(--color-primary)] transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </a>

            <div className="flex flex-col items-center gap-4">
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

        <div className="relative mt-20 lg:mt-0">
          {/* Left side: Pundra University Building with floating labels */}
          <div className="pointer-events-none absolute -left-12 bottom-0 z-10 hidden w-[45%] opacity-0 animate-[slide-in-3d-left_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] lg:block">
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
              <img
                src={pundraUni.url}
                alt="Pundra University Building"
                className="w-full object-contain [filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.12))]"
              />
              
              {/* Floating Labels like the image */}
              <div className="absolute top-[40%] -left-4 flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-bold text-accent-foreground shadow-lg">
                <Clock className="h-3.5 w-3.5" /> Classes 9:00
              </div>
              <div className="absolute top-[20%] right-[10%] flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-primary-foreground shadow-lg">
                <Globe className="h-3.5 w-3.5" /> Student ID
              </div>
              <div className="absolute bottom-[20%] right-0 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-lg">
                <Bus className="h-3.5 w-3.5" /> Bus Pass
              </div>
              
              {/* Student Avatar standing in front */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <div className="relative h-32 w-24">
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

          {/* Right side group: Phone Mockup and Bus */}
          <div className="pointer-events-none absolute -right-12 top-0 z-10 hidden w-[45%] flex-col items-end opacity-0 animate-[slide-in-3d-right_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] lg:flex">
            {/* Large Phone Mockup */}
            <div className="mr-12 mb-12 animate-[float_5s_ease-in-out_infinite]">
              <div className="relative h-96 w-48 overflow-hidden rounded-[3rem] border-[8px] border-ink bg-[#f0f4f8] shadow-2xl">
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

            {/* Bus Image */}
            <div className="animate-[float-slow_7s_ease-in-out_infinite]">
              <img
                src={pubBus.url}
                alt="PUB Bus"
                className="w-80 object-contain [filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.1))]"
              />
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
        {`'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''

For the code present, I get the error below.

Please think step-by-step in order to resolve it.
\`\`\`
# Error number 1:
#################

Transform failed with 1 error:

[PARSE_ERROR] Unexpected JSX expression
    ╭─[ src/components/how-it-works.js:50:13 ]
    │
 50 │     return (<div ref={containerRef} className="relative h-[100vh] w-full" data-tsd-source="/src/components/how-it-works.js:50:13">
    │             ┬  
    │             ╰── 
    │ 
    │ Help: JSX syntax is disabled and should be enabled via the parser options
────╯


{
  "timestamp": 1787430126602,
  "error_type": "RUNTIME_ERROR",
  "filename": "/dev-server/src/components/how-it-works.js",
  "lineno": 0,
  "colno": 0,
  "stack": "    at transformWithOxc (file:///dev-server/node_modules/vite/dist/node/chunks/node.js:4033:19)\\n    at TransformPluginContext.transform (file:///dev-server/node_modules/vite/dist/node/chunks/node.js:4104:26)\\n    at EnvironmentPluginContainer.transform (file:///dev-server/node_modules/vite/dist/node/chunks/node.js:30201:51)\\n    at async loadAndTransform (file:///dev-server/node_modules/vite/dist/node/chunks/node.js:20124:26)\\n    at async viteTransformMiddleware (file:///dev-server/node_modules/vite/dist/node/chunks/node.js:24604:20)",
  "has_blank_screen": true
}

# Error number 2:
#################

Dev server returned 500 for GET /src/components/how-it-works.js before the app handler ran. This is usually a Vite build/transform error — check the dev server output for the underlying error.

{
  "timestamp": 1787430126809,
  "error_type": "RUNTIME_ERROR",
  "filename": "Unknown file",
  "lineno": 0,
  "colno": 0,
  "stack": "Unavailable",
  "has_blank_screen": true
}

# Error number 3:
#################

Uncaught Error: Switched to client rendering because the server rendering errored:

Transform failed with 1 error:

[PARSE_ERROR] Unexpected JSX expression
    ╭─[ src/components/how-it-works.js:50:13 ]
    │
 50 │     return (<div ref={containerRef} className="relative h-[100vh] w-full" data-tsd-source="/src/components/how-it-works.js:50:13">
    │             ┬  
    │             ╰── 
    │ 
    │ Help: JSX syntax is disabled and should be enabled via the parser options
────╯
\`\`\``}
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

      <div className="hidden" aria-hidden="true">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.''' Adjust smooth scrolling so section headings land correctly below the navbar height, with consistent offsets across screen sizes.
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.''' Add scroll-spy behavior so the active section link highlights as I scroll.
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.''' OLD NAV BAR WAS BETTER
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            "Fix the following visual issues in the hero section:

1. Remove white background boxes:
The bus image and the phone mockup currently sit inside visible white rectangular background boxes/cards. Remove these white backgrounds completely — both the bus image and the phone mockup should blend directly into the sky-blue hero background with no visible box, frame, or edge around them. If a shadow is desired for depth, use a soft drop-shadow only (no solid background fill).

2. Fix building image cropping:
The building photo is still getting cut off at the bottom of the viewport/section. Increase the hero section's height and add proper padding so the entire building image is visible within its container without being clipped.

3. Fix 'Waiting...' character placement:
The waiting student character and 'Waiting...' label are currently overlapping messily with the bottom-right corner of the building photo, looking disconnected and awkward. Reposition this character to stand clearly beside or in front of the building (e.g. near a bus stop sign at the building's base, on clear ground/pavement), not overlapping the photo's edge. Ensure proper z-index layering and spacing so it looks intentionally placed, not accidentally overlapping.

4. Add proper spacing:
Add at least 60-80px of vertical spacing between the subtext ('Track your university bus in real-time...') and the building/bus images below it, so text and images don't feel cramped together.

5. Consistent framing:
Both the building image and the bus + phone mockup group should have matching visual treatment — either both with soft drop shadows and no hard edges, or both with a subtle rounded-corner mask — so they look like a cohesive pair, not two different styles (one a raw photo, one in a white box).

Keep the sky-blue background, current headline, and logo badge as they are. Focus only on cleaning up spacing, removing the white background boxes, and fixing the character overlap."
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            MAKE HERO SECTION LIKE THAT IMAGE
      </div>


    </main>
  );
}
