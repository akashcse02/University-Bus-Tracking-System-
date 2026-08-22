import { Bus, Navigation, BellRing } from "lucide-react";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: Bus,
    title: "Select your bus",
    text: "Pick your route and the shuttle you ride every morning.",
    anim: "animate-float",
  },
  {
    icon: Navigation,
    title: "View live location",
    text: "Watch your bus move on the map, updated every few seconds.",
    anim: "animate-float-slow",
  },
  {
    icon: BellRing,
    title: "Get notified",
    text: "A friendly ping before the bus reaches your stop.",
    anim: "animate-float",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          How it <span className="text-accent">works</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
          Three taps between your hostel gate and a seat on the bus.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 130}>
            <div className="h-full rounded-[1.75rem] bg-card p-7 text-center shadow-[0_24px_44px_-34px_var(--color-ink)]">
              <span
                className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-secondary text-primary ${s.anim}`}
              >
                <s.icon className="h-7 w-7" />
              </span>
              <p className="mt-5 font-display text-xs font-extrabold uppercase tracking-widest text-accent">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
