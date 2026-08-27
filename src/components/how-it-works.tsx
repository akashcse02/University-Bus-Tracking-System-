import { MapPin, Bus, Radar, Bell, LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { motion } from "framer-motion";

interface StepCard {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  illustration: string;
}

const steps: StepCard[] = [
  {
    title: "Enter Your Location",
    description: "Students enter their home/pickup location once. The app saves it so the nearest bus route is automatically matched.",
    icon: MapPin,
    color: "#1F72C8", // Azure
    illustration: "map"
  },
  {
    title: "Select Your Bus",
    description: "Choose your assigned bus number and route from the list — Gobindaganj, Sherpur, Sathmatha, or Gabtoli.",
    icon: Bus,
    color: "#2E8FDD", // Sky
    illustration: "selection"
  },
  {
    title: "Track in Real-Time",
    description: "See your bus moving live on the map, with accurate ETA so you know exactly when to head to your stop.",
    icon: Radar,
    color: "#E0A03A", // Sunlight
    illustration: "tracking"
  },
  {
    title: "Get Notified",
    description: "Receive instant alerts for arrival time, delays, or route changes — never miss your bus again.",
    icon: Bell,
    color: "#3E8E5C", // Foliage
    illustration: "notifications"
  },
];

function CardIllustration({ type, color }: { type: string; color: string }) {
  return (
    <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-3xl bg-white/10 p-4 backdrop-blur-sm shadow-inner md:h-64">
      {type === "map" && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-48 w-48 rounded-full bg-white/20 p-8 shadow-2xl animate-pulse">
            <MapPin className="h-full w-full text-white" strokeWidth={1} />
          </div>
        </div>
      )}
      {type === "selection" && (
        <div className="flex h-full w-full flex-col gap-4 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-white/20 p-4 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-white/30 flex items-center justify-center">
                <Bus className="h-5 w-5 text-white" />
              </div>
              <div className="h-4 w-32 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
      )}
      {type === "tracking" && (
        <div className="flex h-full w-full items-center justify-center">
           <div className="relative h-full w-full rounded-2xl border-2 border-white/30 bg-white/10 overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Radar className="h-32 w-32 text-white animate-spin-slow opacity-50" strokeWidth={0.5} />
                <Bus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-white drop-shadow-lg" />
             </div>
           </div>
        </div>
      )}
      {type === "notifications" && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative">
            <Bell className="h-40 w-40 text-white animate-bounce" strokeWidth={0.5} />
            <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-red-500 border-4 border-white flex items-center justify-center text-white font-bold shadow-lg">1</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative pb-20">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold text-ink sm:text-6xl">
            How PUB Bus Track Works
          </h2>
          <p className="mt-6 text-xl text-ink/70 font-medium">
            From your home to campus — track every step of the way.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-8 max-w-[1200px]">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="sticky top-[100px] w-full px-5"
            style={{ 
              paddingTop: `${index * 40}px`,
              zIndex: index + 1
            }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ backgroundColor: step.color }}
              className="relative min-h-[400px] w-full overflow-hidden rounded-[2.5rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:p-14"
            >
              <div className="grid h-full w-full gap-8 md:grid-cols-2 md:items-center">
                <div className="text-white">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-xl">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 font-display text-3xl font-black md:text-5xl tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-lg font-medium leading-relaxed opacity-90">
                    {step.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-center">
                  <CardIllustration type={step.illustration} color={step.color} />
                </div>
              </div>

              {/* Step number watermark removed for cleaner look */}

            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

