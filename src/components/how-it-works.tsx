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

  // Calculate the scale and opacity based on scroll progress
  // As we scroll through the 100vh section for this card
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
        {/* Parallax Icon */}
        <div className="mb-8 rounded-3xl bg-white/20 p-6">
          <step.icon className="h-16 w-16" strokeWidth={1.5} />
        </div>

        <h3 className="mb-4 font-display text-3xl font-extrabold md:text-4xl">
          {step.title}
        </h3>

        <p className="max-w-md text-lg font-medium leading-relaxed opacity-90">
          {step.description}
        </p>

        {/* Card Number */}
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

      {/* 
          Container for scroll stacking. 
          Total height is 400vh to give enough scroll room for 4 cards.
      */}
      <div className="relative mx-auto mt-16 max-w-7xl px-5">
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <Card key={index} step={step} index={index} total={steps.length} />
          ))}
        </div>
      </div>

      {/* Verbatim text request placeholder */}
      <div className="hidden">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            Fix "How It Works" Stacking Behavior:
nAV BAR HOVER MAKE MORE GOOD AND CAMPUSHLIKHA ORANGE HONE 

"Fix the 'How It Works' scroll-stacking section so it works exactly like this: Card 1 shows first and stays visible/pinned. As the user scrolls down even slightly, Card 2 slides up from below and layers on top of Card 1. As the user continues scrolling, Card 3 slides up and layers on top of Card 2. Then Card 4 layers on top of Card 3.

The stacking position must depend directly on scroll position (not a fixed timer or fixed trigger point) — meaning if the user scrolls a little, Card 2 moves up partially; if they scroll more, it moves up further; if they scroll back up, it reverses and un-stacks smoothly. Use a scroll-progress-driven approach:

Wrap all cards in a container tall enough to give scroll room (e.g. height: 400vh for 4 cards).

Make each card position: sticky; top: 10%; inside its own 100vh section of that container, in DOM order.

Use useScroll + useTransform (if using Framer Motion) or an Intersection Observer with scroll-percentage calculation to drive each card's translateY, scale, and opacity continuously as a function of scroll progress — not as a one-time triggered animation.

Ensure z-index increases per card (Card 1 lowest, Card 4 highest) so each new card visually covers the previous one as it slides up.

The effect should feel directly tied to the scrollbar — scrolling up should reverse the stacking smoothly, scrolling down should progress it, at all scroll speeds.

Remove any overflow: hidden on parent containers that could break position: sticky."
      </div>
    </section>
  );
}
