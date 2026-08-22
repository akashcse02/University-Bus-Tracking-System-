import { MapPin, Bus, Radar, Bell, LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useInView } from "@/hooks/use-in-view";
import { useRef } from "react";

interface StepCard {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  text: string;
}

const steps: StepCard[] = [
  {
    title: "Enter Your Location",
    description: "Students enter their home/pickup location once. The app saves it so the nearest bus route is automatically matched.",
    icon: MapPin,
    color: "oklch(0.6 0.15 250)", // Blue
    bg: "oklch(0.6 0.15 250)",
    text: "white"
  },
  {
    title: "Select Your Bus",
    description: "Choose your assigned bus number and route from the list — Gobindaganj, Sherpur, Sathmatha, or Gabtoli.",
    icon: Bus,
    color: "oklch(0.6 0.15 190)", // Teal
    bg: "oklch(0.6 0.15 190)",
    text: "white"
  },
  {
    title: "Track in Real-Time",
    description: "See your bus moving live on the map, with accurate ETA so you know exactly when to head to your stop.",
    icon: Radar,
    color: "oklch(0.7 0.18 45)", // Orange
    bg: "oklch(0.7 0.18 45)",
    text: "white"
  },
  {
    title: "Get Notified",
    description: "Receive instant alerts for arrival time, delays, or route changes — never miss your bus again.",
    icon: Bell,
    color: "oklch(0.6 0.16 150)", // Green
    bg: "oklch(0.6 0.16 150)",
    text: "white"
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-4xl px-5 text-center mb-16">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            How PUB Bus Track Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your home to campus — track every step of the way.
          </p>
        </Reveal>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-xl px-5">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="sticky top-32 mb-12 sm:mb-24 last:mb-0"
            style={{ 
              zIndex: index + 1,
            }}
          >
            <Reveal 
              className="h-full"
              delay={index * 100}
            >
              <div 
                className="group relative flex flex-col items-center justify-center rounded-[2rem] p-10 text-center shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ 
                  backgroundColor: step.bg,
                  color: step.text,
                  minHeight: "400px"
                }}
              >
                {/* Parallax Icon */}
                <div className="mb-8 rounded-3xl bg-white/20 p-6 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <step.icon className="h-16 w-16" strokeWidth={1.5} />
                </div>
                
                <h3 className="mb-4 font-display text-3xl font-extrabold">
                  {step.title}
                </h3>
                
                <p className="max-w-md text-lg font-medium opacity-90 leading-relaxed">
                  {step.description}
                </p>

                {/* Stacking indicator sliver (visual only) */}
                <div className="absolute -bottom-4 left-1/2 h-4 w-[90%] -translate-x-1/2 rounded-b-[2rem] opacity-20" style={{ backgroundColor: step.bg }} />
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}