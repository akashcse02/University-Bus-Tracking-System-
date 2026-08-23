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
import { OurVision } from "@/components/our-vision";
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
  { label: "Live Location", href: "/live-location" },
  { label: "Buses", href: "#buses" },
  { label: "Time Schedule", href: "#schedule" },
  { label: "Routes", href: "#routes" },
  { label: "How it works", href: "#how-it-works" },
];

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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

function Index() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["how-it-works", "stats", "live-location", "buses", "schedule", "routes", "vision", "footer"];
      let current = "Home";

      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 100) {
        current = "How it works"; // fallback or handle footer highlighting
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

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      if (!id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
      setOpen(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[linear-gradient(to_bottom,var(--color-sky-top),var(--color-sky-bottom)_62%,var(--color-background))]">
      <Clouds />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <a href="#" onClick={(e) => smoothScroll(e, "#")} className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src={pubLogo.url} alt="Logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">
              PUB Bus Track
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => smoothScroll(e, l.href)}
                className={`text-sm font-bold transition-colors hover:text-primary ${
                  activeSection === l.label ? "text-primary" : "text-ink/80"
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
                  <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className="rounded-xl font-bold cursor-pointer">
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#" className="rounded-full px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-white/50">Login</a>
            <a href="#" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105">Sign Up</a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden">
            <Menu className="h-6 w-6 text-ink" />
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white p-5 shadow-xl animate-in fade-in slide-in-from-top-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => smoothScroll(e, l.href)}
                  className={`text-base font-bold ${activeSection === l.label ? "text-primary" : "text-ink"}`}
                >
                  {l.label}
                </a>
              ))}
              <hr className="border-border" />
              <div className="flex flex-col gap-3">
                <a href="#" className="text-center font-bold text-ink">Login</a>
                <a href="#" className="rounded-full bg-primary py-3 text-center font-bold text-primary-foreground">Sign Up</a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pt-12 pb-20 lg:pt-16">
        {/* Centered Headline & Subtext */}
        <div className="mb-12 text-center">
          <Reveal>
            <div className="mb-4 flex justify-center">
              <span className="rounded-full bg-white/60 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase shadow-sm">
                Pundra University
              </span>
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-7xl">
              Your Ride to
              <br />
              <span className="text-accent">Campus,</span> On Time
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-lg font-medium text-ink/75 sm:text-xl">
              Track your university bus in real-time — buses, routes, and schedules in one place.
            </p>
            <div className="mt-8 flex flex-col items-center gap-6">
              <a href="#how-it-works" onClick={(e) => smoothScroll(e, "#how-it-works")} className="rounded-full bg-primary px-10 py-4 font-display text-lg font-bold text-primary-foreground shadow-2xl transition-all hover:scale-105 active:scale-95">
                Get Started
              </a>
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                  Download PUB Bus Track App
                </span>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex h-10 items-center gap-2 rounded-xl bg-ink px-3 text-background transition-transform hover:scale-105">
                    <Apple className="h-4 w-4" />
                    <div className="text-left leading-none">
                      <span className="block text-[0.4rem] uppercase opacity-60">Download on the</span>
                      <span className="block text-[10px] font-bold">App Store</span>
                    </div>
                  </a>
                  <a href="#" className="flex h-10 items-center gap-2 rounded-xl bg-ink px-3 text-background transition-transform hover:scale-105">
                    <Play className="h-4 w-4" />
                    <div className="text-left leading-none">
                      <span className="block text-[0.4rem] uppercase opacity-60">Get it on</span>
                      <span className="block text-[10px] font-bold">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visuals Layout: Building (Left), Phone (Center-ish), Bus (Right) */}
        <div className="relative mt-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
            
            {/* Left Column: Building */}
            <div className="relative animate-[slide-in-3d-left_1.2s_ease-out_forwards]">
              <div className="relative animate-float-slow">
                <img src={pundraUni.url} alt="Pundra University" className="mx-auto w-full max-w-[450px] rounded-[2.5rem] object-contain drop-shadow-2xl" />
                {/* Floating Badges */}
                <div className="absolute top-[20%] -left-4 z-20 flex items-center gap-2 rounded-xl bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-lg">
                  <Clock className="h-3.5 w-3.5" /> Classes 9:00
                </div>
                <div className="absolute bottom-[20%] -right-4 z-20 flex items-center gap-2 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg">
                  <Globe className="h-3.5 w-3.5" /> Student ID
                </div>
                {/* Student Animation */}
                <div className="absolute -bottom-10 left-1/4 z-20 flex flex-col items-center">
                  <div className="h-20 w-16 animate-bounce">
                    <svg viewBox="0 0 80 120" className="h-full w-full drop-shadow-xl">
                      <circle cx="40" cy="30" r="14" fill="#FFD2B2" />
                      <rect x="28" y="44" width="24" height="45" rx="10" fill="#4CAF50" />
                      <rect x="30" y="89" width="8" height="28" rx="4" fill="#3F51B5" />
                      <rect x="42" y="89" width="8" height="28" rx="4" fill="#3F51B5" />
                    </svg>
                  </div>
                  <div className="flex h-12 w-1 items-center justify-center rounded-full bg-ink/20" />
                  <div className="rounded-full bg-ink px-3 py-1 text-[8px] font-bold text-white uppercase tracking-tighter shadow-sm">Bus Stop</div>
                </div>
              </div>
            </div>

            {/* Center: Small Phone Mockup */}
            <div className="relative z-20 mx-auto w-32 animate-float lg:w-40">
              <div className="rounded-[2rem] border-[4px] border-ink bg-white shadow-2xl overflow-hidden aspect-[9/19]">
                <div className="h-full w-full bg-blue-50/50 p-1.5">
                  <div className="h-full w-full rounded-[1.4rem] bg-white shadow-inner overflow-hidden flex flex-col">
                    <div className="flex-1 bg-blue-100/30 p-2">
                       <div className="h-full w-full rounded-xl bg-white shadow-sm flex items-center justify-center">
                         <MapPin className="h-6 w-6 text-primary animate-bounce" />
                       </div>
                    </div>
                    <div className="p-2 space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-slate-100" />
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                          <Bus className="h-2.5 w-2.5 text-white" />
                        </div>
                        <div className="h-2 w-10 rounded-full bg-slate-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bus */}
            <div className="relative animate-[slide-in-right_1.2s_ease-out_forwards]">
              <div className="relative animate-float">
                <img src={pubBus.url} alt="PUB Bus" className="mx-auto w-full max-w-[450px] rounded-[2rem] object-contain drop-shadow-2xl" />
                <div className="absolute -bottom-6 right-10 z-20 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-ink shadow-lg">
                  <Bus className="h-4 w-4 text-primary" /> Route: Gobindaganj
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsStrip />

      {/* How it Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <TestimonialsStrip />

      {/* Vision Section */}
      <OurVision />

      {/* FAQ Section */}
      <FaqSection />

      {/* Email Signup Section */}
      <EmailSignup />

      {/* Footer Section */}
      <SiteFooter />

      <div className="hidden" aria-hidden="true">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            "Update the hero section layout as follows:

1. Headline position:
Move the headline 'Your Ride to Campus, On Time' to be horizontally centered in the hero section (not left-aligned), positioned above or between the building and bus visuals.

2. Building placement:
Keep the Pundra University building image on the LEFT side of the hero, with its 'Classes 9:00', 'Student ID', and 'Bus Stop' badges anchored within the image's own bounding box as they currently are.

3. Phone mockup size:
Reduce the size of the phone mockup (the one showing the live location pin) — make it noticeably smaller/more compact than its current size, so it doesn't dominate the layout.

4. Bus placement and animation:
Position the bus image on the RIGHT side of the hero. Animate it to slide in from the right edge of the screen into its resting position on page load (fade-in + slide, settling smoothly with ease-out timing), rather than appearing statically.

5. Match reference image exactly:
I will upload a reference image showing the exact composition and positioning I want for this hero section. Please match the layout, spacing, and element placement in that reference image as closely as possible — including where the headline, subtext, CTA button, building, bus, and phone mockup are positioned relative to each other.

Keep the sky-blue background, current color scheme (green CTA, orange accent), and existing content/copy unchanged — this is a layout/positioning adjustment only."
      </div>
    </main>
  );
}
