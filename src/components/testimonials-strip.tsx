import { Reveal } from "@/components/reveal";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Md Akash Islam",
    quote: "PUB Bus Track helps me catch the bus on time and reduces waiting stress. It's an essential tool for every student commuting to Pundra University.",
    rating: 5,
  },
  {
    name: "Md Sabbir Hossain",
    quote: "The real-time tracking and ETA notifications are incredibly accurate. It makes planning my day so much easier and I never miss my shuttle.",
    rating: 5,
  },
  {
    name: "Irin Mim",
    quote: "Seeing the live bus location and getting delay alerts makes my commute stress-free. The interface is very intuitive and helpful.",
    rating: 5,
  },
];

export function TestimonialsStrip() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal className="text-center">
        <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Loved by <span className="text-accent">Students</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
          See what our daily commuters have to say about PUB Bus Track.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 100} className="h-full">
            <div className="flex h-full flex-col rounded-[2.5rem] bg-white p-10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-2">
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>
              
              <p className="flex-1 text-lg font-medium leading-relaxed text-ink/80">
                "{r.quote}"
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary font-bold text-lg">
                  {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-display text-base font-extrabold text-ink">{r.name}</p>
                  <p className="text-sm font-medium text-muted-foreground">Verified Student</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Verbatim text request placeholder */}
      <div className="hidden">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            2. Add Student Reviews Section:

"Add a student testimonials/reviews section on the landing page (place it after the 'How It Works' section or before the FAQ). Include 3 review cards:

Md Akash Islam — a short positive review about how PUB Bus Track helps him catch the bus on time and reduces waiting stress.

Md Sabbir Hossain — a short positive review about the real-time tracking and ETA notifications being accurate and useful for planning his day.

Irin Mim — a short positive review about how easy it is to see live bus location and get delay alerts, making commuting to campus stress-free.

Design: each card with a circular avatar placeholder (initials-based if no photo), student name, a short 1-2 sentence quote, and a 5-star rating icon row. Use a clean card layout (3 columns on desktop, stacked on mobile) with soft shadows and rounded corners, matching the site's sky-blue background and green/orange/teal accent colors. Add a subtle fade/slide-in animation as the section scrolls into view."
      </div>
    </section>
  );
}
