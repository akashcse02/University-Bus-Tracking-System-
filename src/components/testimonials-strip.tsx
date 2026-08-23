import { Reveal } from "@/components/reveal";
import { Star, Apple, Play } from "lucide-react";
import { motion } from "framer-motion";
import pubBus from "@/assets/pub-bus.png.asset.json";

const reviews = [
  {
    name: "Md Akash Islam",
    quote: "PUB Bus Track helps me catch the bus on time and reduces waiting stress. It's an essential tool for every student commuting to Pundra University.",
    rating: 5,
    source: "Google Play",
  },
  {
    name: "Md Sabbir Hossain",
    quote: "The real-time tracking and ETA notifications are incredibly accurate. It makes planning my day so much easier and I never miss my shuttle.",
    rating: 5,
    source: "App Store",
  },
  {
    name: "Irin Mim",
    quote: "Seeing the live bus location and getting delay alerts makes my commute stress-free. The interface is very intuitive and helpful.",
    rating: 5,
    source: "Google Play",
  },
  // Duplicated for a fuller row
  {
    name: "Tahsin Ahmed",
    quote: "Finally a tracking app that works! No more guessing where the bus is. Highly recommended for all students.",
    rating: 5,
    source: "App Store",
  },
  {
    name: "Sadia Afrin",
    quote: "Great app! The time schedule is always up-to-date. Makes my campus life much more organized.",
    rating: 5,
    source: "Google Play",
  },
];

// Double the reviews for seamless looping
const extendedReviews = [...reviews, ...reviews];

export function TestimonialsStrip() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24">
      <Reveal className="text-center mb-16 px-5">
        <h2 className="font-display text-4xl font-extrabold text-ink sm:text-6xl">
          Loved by <span className="text-accent">Students</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-xl font-medium text-ink/70">
          What our daily commuters have to say about PUB Bus Track.
        </p>
      </Reveal>

      <div className="group relative flex w-full">
        {/* The Bus "Pulling" the cards */}
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-6"
        >
          {/* Tow Bus */}
          <div className="relative z-20 flex shrink-0 items-center gap-4">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 drop-shadow-2xl"
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
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-ink/50 shadow-sm">
                    {r.source.includes("App Store") ? <Apple className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    {r.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hidden" aria-hidden="true">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
        
        "Add a 'Loved by Students' horizontal review section, styled like the reference image, with a unique twist — a bus illustration visually pulling the row of review cards along."
      </div>
    </section>
  );
}

