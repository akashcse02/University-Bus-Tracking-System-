import { Reveal } from "@/components/reveal";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
}

function StatCard({ number, label, suffix = "" }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = number;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / 16)); // smoother increments
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <div ref={ref} className="card-hover-premium flex flex-col items-center justify-center rounded-[2.5rem] bg-white p-8 text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
      <span className="font-display text-4xl font-black text-primary sm:text-5xl">
        {count}{suffix}
      </span>
      <span className="mt-2 text-sm font-bold uppercase tracking-widest text-ink/50">
        {label}
      </span>
    </div>
  );
}

export function StatsStrip() {
  return (
    <section id="stats" className="mx-auto max-w-7xl px-5 mt-24 mb-12 lg:mt-32">
      <Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          <StatCard number={4} label="Routes" />
          <StatCard number={8} label="Buses" />
          <StatCard number={1000} label="Students" suffix="+" />
          <StatCard number={6} label="Routes across Bogura" />
        </div>
      </Reveal>
    </section>
  );
}
