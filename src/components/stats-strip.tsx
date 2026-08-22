import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

const stats = [
  { value: 4, suffix: "", label: "Routes" },
  { value: 8, suffix: "", label: "Buses" },
  { value: 1000, suffix: "+", label: "Students" },
  { value: 99, suffix: "%", label: "On-time trips" },
];

function CountUp({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export function StatsStrip() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <div
      ref={ref}
      id="stats"
      className="grid grid-cols-2 gap-3 rounded-[2rem] bg-card p-5 shadow-[0_28px_50px_-36px_var(--color-ink)] sm:gap-5 lg:grid-cols-4"
    >
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl bg-secondary px-4 py-6 text-center">
          <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
            <CountUp target={s.value} suffix={s.suffix} run={inView} />
          </p>
          <p className="mt-1 text-sm font-bold text-ink/70">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
