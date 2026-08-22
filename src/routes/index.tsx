import { createFileRoute } from "@tanstack/react-router";
import { Bus, MapPin, Clock, Apple, Play, Menu } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { StatsStrip } from "@/components/stats-strip";
import { LiveMapDemo } from "@/components/live-map-demo";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import campusScene from "@/assets/campus-scene.png";
import phoneMap from "@/assets/phone-map.png";
import busImg from "@/assets/bus.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PUB Bus Track — Live Pundra University Bus Tracking" },
      {
        name: "description",
        content:
          "Track your Pundra University bus in real time. Live locations, routes, schedules and arrival times in one friendly app.",
      },
      { property: "og:title", content: "PUB Bus Track — Live University Bus Tracking" },
      {
        property: "og:description",
        content:
          "Live bus locations, routes and time schedules for Pundra University students. Never miss your ride to campus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = ["Home", "Live Location", "Buses", "Time Schedule", "Routes"];

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

function RouteLine() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 120"
      className="absolute left-8 -bottom-4 w-64 md:w-96"
    >
      <path
        id="pubRoute"
        d="M10 100 C 90 100, 100 30, 190 30 S 320 90, 390 60"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 14"
        className="animate-dash opacity-70"
      />
      <g
        className="animate-drive"
        style={{
          offsetPath: 'path("M10 100 C 90 100, 100 30, 190 30 S 320 90, 390 60")',
          offsetRotate: "0deg",
        }}
      >
        <circle r="16" fill="var(--color-brand)" />
        <g transform="translate(-8,-8) scale(0.67)">
          <path
            d="M4 2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 4v5h14V6H5Zm1 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
            fill="var(--color-brand-foreground)"
          />
        </g>
      </g>
    </svg>
  );
}

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,var(--color-sky-top),var(--color-sky-bottom)_62%,var(--color-background))]">
      <Clouds />

      <header className="relative z-20 mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 lg:flex lg:justify-between">
        <a href="#" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_6px_14px_-6px_var(--color-ink)]">
            <Bus className="h-5 w-5" />
          </span>
          <span className="truncate font-display text-xl font-extrabold tracking-tight text-ink">
            PUB Bus Track
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="story-link text-sm font-bold text-ink/80 transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
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
                <a key={l} href="#" className="rounded-xl px-3 py-2 text-sm font-bold text-ink hover:bg-secondary">
                  {l}
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
          <h1 className="animate-rise font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Your Ride to <span className="text-accent">Campus</span>,
            <br className="hidden sm:block" /> On Time
          </h1>
          <p className="mx-auto mt-5 max-w-lg animate-rise text-base text-ink/75 [animation-delay:120ms] sm:text-lg">
            Track your university bus in real-time — buses, routes, and schedules in one
            place.
          </p>
          <div className="mt-8 flex animate-rise justify-center [animation-delay:220ms]">
            <a
              href="#download"
              className="rounded-full bg-primary px-9 py-4 font-display text-lg font-bold text-primary-foreground shadow-[0_18px_30px_-14px_var(--color-ink)] transition-transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="relative mt-12 grid items-end gap-10 lg:mt-0 lg:grid-cols-[1.05fr_0.9fr] lg:gap-4">
          {/* Left illustration */}
          <div className="relative animate-slide-left lg:-mt-24">
            <img
              src={campusScene}
              alt="Pundra University campus building with a bus stop sign and a student holding a backpack"
              width={1024}
              height={912}
              className="w-full max-w-xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.08)]"
            />
            <div className="absolute left-2 top-4 animate-float rounded-2xl bg-accent px-3 py-2 text-center font-display text-xs font-extrabold text-accent-foreground shadow-lg">
              6 Routes
              <span className="block text-[0.6rem] font-bold opacity-80">across Bogura</span>
            </div>
            <RouteLine />
          </div>

          {/* Right illustration */}
          <div className="relative animate-slide-right [animation-delay:150ms] lg:-mt-16">
            <div className="relative mx-auto w-full max-w-sm">
              <img
                src={phoneMap}
                alt="Phone showing the PUB Bus Track live map with a bus moving along its route"
                width={800}
                height={1008}
                className="w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
              />
              <div className="absolute -left-4 top-[38%] animate-float rounded-2xl bg-card px-4 py-3 shadow-[0_16px_30px_-14px_var(--color-ink)] sm:-left-10">
                <p className="font-display text-base font-extrabold text-ink">12 minutes</p>
                <p className="text-xs font-semibold text-muted-foreground">Arrive at 9:15</p>
              </div>
              <div className="absolute -right-2 top-[12%] grid h-11 w-11 animate-float-slow place-items-center rounded-full bg-accent text-accent-foreground shadow-lg">
                <MapPin className="h-5 w-5" />
              </div>
            </div>

            <div className="relative mt-2">
              <img
                src={busImg}
                alt="Pundra University shuttle bus"
                loading="lazy"
                width={1104}
                height={608}
                className="mx-auto w-full max-w-md"
              />
              <span className="absolute left-1/2 top-[52%] -translate-x-1/2 rounded-md bg-primary px-2.5 py-1 font-display text-[0.6rem] font-extrabold uppercase tracking-widest text-primary-foreground sm:text-xs">
                PUB Route 3 · Satmatha
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <Reveal className="mt-14">
          <StatsStrip />
        </Reveal>
      </section>

      {/* Live map demo */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16">
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

      <HowItWorks />

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
