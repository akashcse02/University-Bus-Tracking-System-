import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bus, MapPin, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const detailSections = [
  { title: "vision.details.why.title", body: "vision.details.why.body" },
  { title: "vision.details.future.title", body: "vision.details.future.body" },
  { title: "vision.details.commitment.title", body: "vision.details.commitment.body" },
] as const;

const visionStats = [
  "vision.details.stats.buses",
  "vision.details.stats.routes",
  "vision.details.stats.students",
  "vision.details.stats.pundra",
] as const;

export function OurVision() {
  const { t } = useLanguage();

  return (
    <section id="vision" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,var(--color-secondary)_0%,transparent_50%)] opacity-40" />
      
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="mx-auto max-w-2xl space-y-5 text-center sm:space-y-6 lg:mx-0 lg:text-start">
              <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {t("vision.title1")} <span className="text-primary">{t("vision.title2")}</span>
              </h2>
              <div className="space-y-4 text-base font-medium leading-relaxed text-ink/70 sm:text-lg">
                <p>{t("vision.p1")}</p>
                <p>{t("vision.p2")}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="group h-12 rounded-full bg-primary px-7 font-display text-base font-bold shadow-lg transition-all hover:scale-105 sm:h-14 sm:px-8 sm:text-lg">
                    {t("vision.cta")}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-3xl gap-0 overflow-y-auto rounded-2xl border-border bg-card p-0 shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100%-3rem)] sm:rounded-3xl">
                  <div className="bg-[linear-gradient(135deg,var(--color-sky-top),var(--color-card))] px-5 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-10 lg:px-10">
                    <DialogHeader className="text-start">
                      <DialogTitle className="max-w-2xl font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
                        {t("vision.details.title")}
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        {t("vision.details.description")}
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <div className="space-y-6 px-5 py-6 text-start sm:px-8 sm:py-8 lg:px-10">
                    {detailSections.map((section) => (
                      <section key={section.title} className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-primary sm:text-2xl">
                          {t(section.title)}
                        </h3>
                        <p className="text-sm font-medium leading-7 text-ink/75 sm:text-base">
                          {t(section.body)}
                        </p>
                      </section>
                    ))}

                    <div className="grid grid-cols-2 gap-2 border-t border-border pt-6 sm:grid-cols-4 sm:gap-3">
                      {visionStats.map((stat) => (
                        <div key={stat} className="flex min-h-20 items-center justify-center rounded-lg bg-secondary/40 px-2 py-3 text-center">
                          <span className="text-xs font-extrabold leading-snug text-ink sm:text-sm">
                            {t(stat)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative mx-auto h-[330px] w-full max-w-xl sm:h-[420px] lg:h-[500px]">
              {/* Layered Collage Animation */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 motion-reduce:transform-none"
              >
                {/* Phone Mockup */}
                <div className="relative z-20 h-72 w-36 rounded-[2rem] border-[6px] border-ink bg-card shadow-2xl sm:h-96 sm:w-48 sm:rounded-[2.5rem]">
                  <div className="absolute top-0 left-1/2 h-6 w-20 -translate-x-1/2 rounded-b-xl bg-ink" />
                  <div className="h-full w-full overflow-hidden rounded-[1.6rem] p-2 sm:rounded-[2rem]">
                    <div className="h-full w-full rounded-[1.4rem] bg-muted p-3 sm:rounded-[1.8rem] sm:p-4">
                      <div className="h-4 w-20 rounded-full bg-border sm:w-24" />
                      <div className="mt-4 h-full w-full rounded-2xl bg-secondary/50">
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
                  className="absolute -right-7 top-12 z-30 rounded-2xl bg-card p-3 shadow-xl sm:-right-8"
                >
                  <MapPin className="h-6 w-6 text-accent" />
                </motion.div>

                <motion.div
                  animate={{ x: [0, -10, 0], y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-9 bottom-16 z-30 rounded-2xl bg-card p-3 shadow-xl sm:-left-12 sm:bottom-20"
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
