import { Reveal } from "@/components/reveal";
import { Star, MessageSquarePlus } from "lucide-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import pubBus from "@/assets/pub-bus.png.asset.json";
import { useApprovedReviews, type Review } from "@/lib/reviews";
import { useLanguage } from "@/lib/i18n";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="card-hover-premium flex w-[350px] shrink-0 flex-col rounded-[2.5rem] bg-[#F2F8F4] p-10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.06)]">
      <div className="mb-6 flex gap-1">
        {Array.from({ length: Math.max(1, Math.min(5, r.rating)) }).map((_, idx) => (
          <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>

      <p className="flex-1 text-lg font-bold leading-relaxed text-ink/90">"{r.comment}"</p>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-sm font-bold text-ink/70 shadow-inner">
            {initials(r.display_name)}
          </div>
          <div>
            <p className="font-display text-sm font-black text-ink">{r.display_name}</p>
            <p className="text-[10px] font-bold uppercase tracking-tighter text-ink/50">
              {r.role_label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsStrip() {
  const { t } = useLanguage();
  const { reviews, loading } = useApprovedReviews();
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate only when there are enough cards to make looping look natural.
  const cards = reviews.length >= 4 ? [...reviews, ...reviews] : reviews;
  const shouldScroll = reviews.length >= 4;

  useEffect(() => {
    if (!shouldScroll) {
      controls.stop();
      controls.set({ x: 0 });
      return;
    }
    controls.start({
      x: -2000,
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    });
    return () => {
      if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    };
  }, [shouldScroll, controls, reviews.length]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
    if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!shouldScroll) return;
    autoScrollRef.current = setTimeout(() => {
      controls.start({
        x: -2000,
        transition: { duration: 40, repeat: Infinity, ease: "linear" },
      });
    }, 3000);
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-24">
      <Reveal className="mb-16 px-5 text-center">
        <h2 className="font-display text-4xl font-extrabold text-ink sm:text-6xl">
          {t("reviews.title1")} <span className="text-accent">{t("reviews.title2")}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-xl font-medium text-ink/75">
          {t("reviews.subtitle")}
        </p>
      </Reveal>

      {loading ? (
        <p className="px-5 text-center font-bold text-ink/50">{t("reviews.loading")}</p>
      ) : reviews.length === 0 ? (
        <Reveal>
          <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-[2.5rem] bg-[#F2F8F4] px-8 py-14 text-center shadow-[0_24px_48px_-20px_rgba(0,0,0,0.06)]">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MessageSquarePlus className="h-7 w-7" />
            </span>
            <p className="font-display text-2xl font-black text-ink">{t("reviews.empty.title")}</p>
            <p className="font-medium text-ink/60">{t("reviews.empty.body")}</p>
          </div>
        </Reveal>
      ) : (
        <div
          ref={containerRef}
          className={`relative flex w-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -3000, right: 0 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x }}
            className="flex items-center gap-6"
          >
            <div className="relative z-20 flex shrink-0 items-center gap-4">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none w-48 drop-shadow-2xl"
              >
                <img src={pubBus.url} alt="PUB Bus" className="w-full object-contain" />
              </motion.div>
              <div className="h-0.5 w-12 border-t-2 border-dashed border-ink/30" />
            </div>

            <div className="flex gap-6">
              {cards.map((r, i) => (
                <ReviewCard key={`${r.id}-${i}`} r={r} />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
