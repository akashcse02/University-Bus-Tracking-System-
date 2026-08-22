import { MapPin, Bus, Radar, Bell, LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

function Card({ step, index, total }: { step: StepCard; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div ref={containerRef} className="relative h-[100vh] w-full">
      <motion.div
        style={{
          scale,
          opacity,
          y,
          zIndex: index + 1,
          backgroundColor: step.bg,
          color: step.text,
        }}
        className="sticky top-[15%] mx-auto flex min-h-[450px] w-full max-w-xl flex-col items-center justify-center rounded-[2.5rem] p-10 text-center shadow-2xl md:p-16"
      >
        <div className="mb-8 rounded-3xl bg-white/20 p-6">
          <step.icon className="h-16 w-16" strokeWidth={1.5} />
        </div>

        <h3 className="mb-4 font-display text-3xl font-extrabold md:text-4xl">
          {step.title}
        </h3>

        <p className="max-w-md text-lg font-medium leading-relaxed opacity-90">
          {step.description}
        </p>

        <div className="absolute top-8 right-8 text-5xl font-black opacity-10">
          0{index + 1}
        </div>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="mx-auto max-w-4xl px-5 pt-24 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            How PUB Bus Track Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your home to campus — track every step of the way.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-5">
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <Card key={index} step={step} index={index} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
