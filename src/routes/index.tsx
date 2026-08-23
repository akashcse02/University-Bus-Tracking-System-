import { createFileRoute } from "@tanstack/react-router";
import { Bus, MapPin, Clock, Apple, Play, Menu, Globe, ChevronDown, Home } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
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
    title: "PUB Bus Track — Pundra University Bus Tracking System",
    meta: [
      { name: "description", content: "Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required." },
      { property: "og:title", content: "PUB Bus Track — Pundra University Bus Tracking System" },
      { property: "og:description", content: "Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
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
  { label: "Home", href: "/" },
  { label: "Live Location", href: "/live-location" },
  { label: "Buses", href: "/buses" },
  { label: "Time Schedule", href: "/time-schedule" },
  { label: "Routes", href: "/#routes" },
  { label: "How it works", href: "/#how-it-works" },
];

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top Left Cloud */}
      <div 
        className="absolute left-[2%] top-[10%] opacity-30 blur-2xl animate-cloud-drift lg:opacity-40"
        style={{ 
          width: '300px', 
          height: '120px', 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
          borderRadius: '50%'
        }}
      />
      {/* Top Right Cloud */}
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
      {/* Center Background Cloud (Large/Soft) */}
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
      {/* Lower Right Cloud */}
      <div 
        className="absolute right-[15%] top-[60%] opacity-20 blur-2xl animate-cloud-drift hidden lg:block"
        style={{ 
          width: '350px', 
          height: '130px', 
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
          animationDuration: '90s',
          borderRadius: '50%'
        }}
      />
    </div>
  );
}

function VisualsScene() {
  const { ref, inView } = useInView(0.3);
  
  return (
    <div ref={ref} className="absolute inset-x-0 bottom-0 grid h-full items-end gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
      {/* Left: Building Card */}
      <div 
        className={`relative z-10 hidden lg:block opacity-0 ${inView ? 'animate-scroll-left' : ''}`}
        style={{ animationDelay: '0ms' }}
      >
        <div className="card-hover-premium overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-2xl ring-1 ring-black/5">
          <img 
            src={pundraUni.url} 
            alt="Pundra University" 
            className="h-64 w-full rounded-[2rem] object-cover lg:h-80" 
          />
          <div className="absolute top-6 left-6 z-20 flex animate-float-slow items-center gap-2 rounded-xl bg-accent px-3 py-1.5 text-[10px] font-bold text-accent-foreground shadow-lg sm:text-xs">
            <Clock className="h-3.5 w-3.5" /> Classes 9:00
          </div>
          <div className="absolute top-20 right-6 z-20 flex animate-float items-center gap-2 rounded-xl bg-primary px-3 py-1.5 text-[10px] font-bold text-primary-foreground shadow-lg sm:text-xs">
            <Globe className="h-3.5 w-3.5" /> Student ID
          </div>
        </div>
      </div>

      {/* Center: Phone Mockup */}
      <div 
        className={`relative z-30 mx-auto w-28 sm:w-32 lg:w-40 opacity-0 ${inView ? 'animate-scroll-zoom' : ''}`}
        style={{ animationDelay: '100ms' }}
      >
        <div className="card-hover-premium overflow-hidden rounded-[2.5rem] border-[6px] border-ink bg-white p-1.5 shadow-2xl ring-1 ring-black/5 animate-float">
          <div className="aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-slate-100">
            <div className="h-full w-full bg-blue-100/20 p-2">
               <div className="h-full w-full rounded-xl flex items-center justify-center">
                 <MapPin className="h-6 w-6 text-primary animate-bounce" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Bus Card */}
      <div 
        className={`relative z-20 hidden lg:block opacity-0 ${inView ? 'animate-scroll-right' : ''}`}
        style={{ animationDelay: '200ms' }}
      >
        <div className="card-hover-premium overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-2xl ring-1 ring-black/5">
          <img 
            src={pubBus.url} 
            alt="PUB Bus" 
            className="h-64 w-full rounded-[2rem] object-cover lg:h-80" 
          />
          <div className="absolute top-6 right-6 z-20 flex animate-float items-center gap-2 rounded-xl bg-white px-3 py-2 text-[10px] font-bold text-ink shadow-lg sm:text-xs">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <span className="text-primary">3</span>
            </div>
            min away
          </div>
          <div className="absolute bottom-12 -left-4 z-20 flex animate-float-slow items-center gap-2 rounded-xl bg-white px-4 py-2 text-[10px] font-bold text-ink shadow-lg sm:text-xs">
            <Bus className="h-4 w-4 text-primary" /> Route: Gobindaganj
          </div>
        </div>
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
      const sections = ["how-it-works", "stats", "live-location", "buses", "schedule", "routes", "vision", "footer"];
      let current = "Home";

      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 100) {
        current = "How it works";
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 120) {
              const link = navLinks.find(l => l.href === `/#${section}` || l.href === `#${section}`);
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
    if (href.includes("#")) {
      e.preventDefault();
      const id = href.split("#")[1];
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 gap-4">
          <a href="/" onClick={(e) => smoothScroll(e, "/")} className="flex items-center gap-2.5 shrink-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white shadow-sm overflow-hidden">
              <img src={pubLogo.url} alt="Logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-ink nav-item-nowrap">
              PUB Bus Track
            </span>
          </a>

          <nav className="hidden items-center gap-4 xl:gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => smoothScroll(e, l.href)}
                className={`text-[14px] xl:text-sm nav-link-clean ${
                  activeSection === l.label ? "text-primary active" : "text-ink/80"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:gap-4 lg:flex shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link-clean flex items-center gap-1.5 px-4 py-2 text-[14px] xl:text-sm text-ink cursor-pointer">
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <span className="nav-item-nowrap">{language}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-50 shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-xl">
                {["English", "Bangla", "Arabic"].map((lang) => (
                  <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className="rounded-xl font-bold cursor-pointer">
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="/login" className="nav-link-clean px-6 py-2.5 text-[14px] xl:text-sm text-ink nav-item-nowrap">Login</a>
            <a href="/signup" className="btn-hover-premium rounded-full bg-primary px-6 py-2.5 text-[14px] xl:text-sm font-bold text-primary-foreground shadow-lg nav-item-nowrap">Sign Up</a>
          </div>

          <button 
            onClick={() => setOpen(!open)} 
            className="lg:hidden p-2 hover:bg-white/40 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6 text-ink" />
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl p-5 shadow-2xl border-b border-ink/5 animate-in fade-in slide-in-from-top-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => smoothScroll(e, l.href)}
                  className={`nav-link-clean w-full justify-start ${
                    activeSection === l.label ? "text-primary active" : "text-ink/80"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <div className="h-px bg-ink/5 my-2" />
              <div className="flex flex-col gap-3">
                <a href="/login" className="nav-link-clean w-full justify-start text-ink">Login</a>
                <a href="/signup" className="btn-hover-premium rounded-full bg-primary py-3.5 text-center font-bold text-primary-foreground shadow-lg">Sign Up</a>
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
              <a href="#how-it-works" onClick={(e) => smoothScroll(e, "#how-it-works")} className="btn-hover-premium rounded-full bg-primary px-10 py-4 font-display text-lg font-bold text-primary-foreground shadow-2xl">
                Get Started
              </a>
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                  Download PUB Bus Track App
                </span>
                <div className="flex items-center gap-3">
                  <a href="#" className="btn-hover-premium flex h-10 items-center gap-2 rounded-xl bg-ink px-3 text-background">
                    <Apple className="h-4 w-4" />
                    <div className="text-left leading-none">
                      <span className="block text-[0.4rem] uppercase opacity-60">Download on the</span>
                      <span className="block text-[10px] font-bold">App Store</span>
                    </div>
                  </a>
                  <a href="#" className="btn-hover-premium flex h-10 items-center gap-2 rounded-xl bg-ink px-3 text-background">
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

        {/* Visuals Scene: Building (Left), Phone (Center), Bus (Right) */}
        <div 
          className="relative mt-8 h-[300px] sm:h-[400px] lg:h-[450px]"
          id="hero-visuals-scene"
        >
          <VisualsScene />
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

      {/* Email Signup Section */}
      <EmailSignup />

      {/* Footer Section */}
      <SiteFooter />

      <div className="hidden" aria-hidden="true">
            {`'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            এখানে আগের full dashboard প্রম্পট (auth + live map + GPS + profile) আর এই এক্সটেন্ডেড ফিচার লিস্ট — দুটো মিলিয়ে একটা সম্পূর্ণ প্রম্পট:

Lovable Prompt — Complete Authenticated Dashboards with Live GPS Map + Extended Features:

"Build complete, authenticated dashboards for all 4 user roles — Student, Teacher, Driver, Admin — with real backend authentication, live GPS bus tracking on a real Google Map, and an extended feature set per role. This requires enabling Lovable Cloud (backend) for auth, database, and real-time data.

1. Authentication (real, backend-based):

Real email/password authentication via Lovable Cloud, replacing the earlier frontend-only demo validation.

Each user signs up with their role-specific fields (Student, Teacher, Driver as previously defined) and is stored in a database with their role.

After login, redirect to the correct role-specific dashboard.

Protected routes: dashboards only accessible to authenticated users; redirect to Login otherwise.

Keep the hidden Admin login flow, connected to real backend authentication instead of hardcoded credentials.

2. Live Google Map integration:

Real interactive map using the Google Maps JavaScript API (API key to be provided), showing campus, bus stops, and routes.

When a Driver starts a trip (Start Trip toggle), their GPS location (via browser Geolocation API) updates in the database every 10-15 seconds.

Student/Teacher dashboards subscribe to their assigned bus's live location, showing a historical bus marker, route path, and ETA in real-time.

3. Profile picture upload:

Every user can upload/update a profile picture (via Lovable Cloud storage), shown in dashboard header and profile section, with circular avatar preview and upload/crop UI.

4. Student Dashboard features:

Live map with bus location, ETA, route info, delay/arrival notifications

Favorite/pinned bus for quick-switching

'Notify Me' toggle for proximity alerts

Weekly commute history (missed/on-time log)

Lost & Found / Report an Issue form

Bus occupancy status (Low/Medium/High)

Dark mode toggle

Working language switch (Bangla/English)

Class schedule sync — suggests which bus to catch based on next class time

Opt-in friend/group bus tracking

5. Teacher Dashboard features:

Live tracking view for assigned/relevant bus

Notice/announcement panel

Class-based bus assignment override when class timing changes

Broadcast announcements to specific routes or all students

6. Driver Dashboard features:

Start/End Trip toggle to broadcast GPS location

Current route and stop list, trip status panel

Route deviation alert if GPS drifts from expected path

Emergency/SOS button for breakdown/accident reporting — instant alert to Admin

Daily trip log/history

Fuel/maintenance reminder

Passenger count input per stop (feeds occupancy status shown to students)

7. Admin Dashboard features:

Real-time overview map showing ALL active buses at once

Reported issues inbox (status: pending/resolved)

Analytics dashboard — most-used routes, delay patterns, ridership trends (charts)

Driver performance/punctuality overview

Broadcast announcements to all users

User approval queue (new sign-ups, especially Driver/Admin accounts)

Route/schedule editor

Bus maintenance tracker (service due dates, issue logs per bus)

User management (view/manage students, teachers, drivers)

8. Shared across all dashboards:

Notification bell/center (in-dashboard alert history)

Settings page (change password, notification preferences)

Search bar (find route/bus/stop quickly)

Export data (commute history or analytics as PDF/CSV)

Accessibility settings (font size, high-contrast mode)

9. Design & animation consistency:

Match the main site's theme — sky-blue backgrounds where appropriate, green/orange/teal accents, pill-shaped buttons with the established glass-shine + shadow-lift hover effect, smooth fade/slide entrance animations for dashboard panels and cards, consistent typography.

Subtle loading-state animations (skeleton loaders or smooth spinners) while map/location data loads.

Respect prefers-reduced-motion across all dashboard animations.

Fully responsive across desktop, tablet, and mobile for all 4 dashboards.

Note: Before this works fully, you'll need to (a) enable Lovable Cloud for backend/auth/database, and (b) provide a valid Google Maps API key with billing set up in your Google Cloud account. Without these, the map and live GPS features cannot function beyond a static/mock preview."`}
      </div>
    </main>
  );
}
