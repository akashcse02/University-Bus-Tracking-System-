import { Reveal } from "@/components/reveal";
import { Star, Apple, Play } from "lucide-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import pubBus from "@/assets/pub-bus.png.asset.json";

const reviews = [
  {
    name: "Md Akash Islam",
    quote: "PUB Bus Track helps me catch the bus on time and reduces waiting stress. It's an essential tool for every student commuting to Pundra University.",
    rating: 5,
    source: "Google Play",
    role: "Student",
  },
  {
    name: "Md Nahid Hasan",
    quote: "PUB Bus Track has made monitoring student commute easier and more organized for the department. A great leap forward.",
    rating: 5,
    source: "Faculty Review",
    role: "Faculty",
  },
  {
    name: "Habib Ehsanul Hoque",
    quote: "The app reflects well on the university's tech-forward approach and helps both students and faculty stay on schedule.",
    rating: 5,
    source: "Staff Review",
    role: "Head of CSE",
  },
  {
    name: "Md Sabbir Hossain",
    quote: "The real-time tracking and ETA notifications are incredibly accurate. It makes planning my day so much easier.",
    rating: 5,
    source: "App Store",
    role: "Student",
  },
  {
    name: "Indronil Mishra",
    quote: "The app's reliability has significantly reduced complaints about missed buses. It's a game changer for campus logistics.",
    rating: 5,
    source: "Faculty Review",
    role: "Faculty",
  },
  {
    name: "Ononto",
    quote: "From an operations perspective, the app helps coordinate bus routes and respond to delays more efficiently.",
    rating: 5,
    source: "Staff Review",
    role: "Transport System Controller",
  },
  {
    name: "Irin Mim",
    quote: "Seeing the live bus location and getting delay alerts makes my commute stress-free. Very intuitive interface.",
    rating: 5,
    source: "Google Play",
    role: "Student",
  },
];

// Double the reviews for seamless looping
const extendedReviews = [...reviews, ...reviews];

export function TestimonialsStrip() {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    controls.start({
      x: -2000,
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    };
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
    if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    autoScrollRef.current = setTimeout(() => {
      startAutoScroll();
    }, 3000);
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-24">
      <Reveal className="text-center mb-16 px-5">
        <h2 className="font-display text-4xl font-extrabold text-ink sm:text-6xl">
          Loved by <span className="text-accent">Users</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-xl font-medium text-ink/75">
          What our daily commuters, faculty, and staff have to say about PUB Bus Track.
        </p>
      </Reveal>

      <div 
        ref={containerRef}
        className={`relative flex w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
          {/* Tow Bus */}
          <div className="relative z-20 flex shrink-0 items-center gap-4">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 drop-shadow-2xl pointer-events-none"
            >
              <img src={pubBus.url} alt="PUB Bus" className="w-full object-contain" />
            </motion.div>
            
            {/* Tow Rope Graphic */}
            <div className="h-0.5 w-12 border-t-2 border-dashed border-ink/30" />
          </div>

          {/* Cards Row */}
          <div className="flex gap-6">
            {extendedReviews.map((r, i) => (
              <div 
                key={i} 
                className="card-hover-premium w-[350px] shrink-0 flex flex-col rounded-[2.5rem] bg-[#FEF9EC] p-10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                
                <p className="flex-1 text-lg font-bold leading-relaxed text-ink/90">
                  "{r.quote}"
                </p>
                
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-ink/70 font-bold text-sm shadow-inner">
                      {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-display text-sm font-black text-ink">{r.name}</p>
                      <p className="text-[10px] font-bold text-ink/50 uppercase tracking-tighter">{r.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-ink/50 shadow-sm">
                    {r.source.includes("App Store") ? <Apple className="h-3 w-3" /> : (r.source.includes("Google Play") ? <Play className="h-3 w-3" /> : null)}
                    {r.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
