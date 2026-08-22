import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, User, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function OurVision() {
  return (
    <section id="vision" className="relative overflow-hidden py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,var(--color-secondary)_0%,transparent_50%)] opacity-40" />
      
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="space-y-6">
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
                Our <span className="text-primary">Vision</span>
              </h2>
              <div className="space-y-4 text-lg font-medium text-ink/70">
                <p>
                  We believe that university transit should be seamless, predictable, and stress-free. 
                  By providing real-time data to every student, we're reducing wasted waiting time 
                  at bus stops and helping our community start their academic day on the right foot.
                </p>
                <p>
                  Our goal is to build a connected, punctual campus commute that prioritizes 
                  student safety and convenience through innovative tracking technology.
                </p>
              </div>
              <Button className="group rounded-full bg-primary px-8 py-6 font-display text-lg font-bold shadow-lg transition-all hover:scale-105">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative h-[400px] w-full lg:h-[500px]">
              {/* Layered Collage Animation */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {/* Phone Mockup */}
                <div className="relative z-20 h-80 w-40 rounded-[2.5rem] border-[6px] border-ink bg-white shadow-2xl sm:h-96 sm:w-48">
                  <div className="absolute top-0 left-1/2 h-6 w-20 -translate-x-1/2 rounded-b-xl bg-ink" />
                  <div className="h-full w-full overflow-hidden rounded-[2rem] p-2">
                    <div className="h-full w-full rounded-[1.8rem] bg-slate-50 p-4">
                      <div className="h-4 w-24 rounded-full bg-slate-200" />
                      <div className="mt-4 h-full w-full rounded-2xl bg-blue-100/50">
                        {/* Fake map */}
                        <div className="relative h-full w-full overflow-hidden rounded-2xl">
                           <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary animate-ping" />
                           <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary" />
                           <div className="absolute bottom-1/3 right-1/4 h-3 w-3 text-accent">
                             <Bus className="h-full w-full" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlapping elements */}
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-12 z-30 rounded-2xl bg-white p-3 shadow-xl"
                >
                  <MapPin className="h-6 w-6 text-accent" />
                </motion.div>

                <motion.div
                  animate={{ x: [0, -10, 0], y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-12 bottom-20 z-30 rounded-2xl bg-white p-3 shadow-xl"
                >
                  <User className="h-6 w-6 text-primary" />
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 left-10 z-10 opacity-20"
                >
                  <Bus className="h-24 w-24 text-primary" />
                </motion.div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
