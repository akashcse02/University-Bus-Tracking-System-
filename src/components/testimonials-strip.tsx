import { Reveal } from "@/components/reveal";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sakib Ahmed",
    role: "Engineering Student",
    quote: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
    rating: 5,
  },
  {
    name: "Fariha Kabir",
    role: "Business Studies Student",
    quote: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
    rating: 5,
  },
  {
    name: "Tanvir Hossain",
    role: "Science Faculty",
    quote: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
    rating: 4,
  },
];

export function TestimonialsStrip() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-5 py-16">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Loved by <span className="text-accent">Students</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
          See what our daily commuters have to say about PUB Bus Track.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="flex h-full flex-col rounded-[2rem] bg-card p-8 shadow-[0_24px_44px_-34px_var(--color-ink)]">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm italic leading-relaxed text-ink/80 whitespace-pre-wrap">
                {r.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary" />
                <div>
                  <p className="font-display text-sm font-extrabold text-ink">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
