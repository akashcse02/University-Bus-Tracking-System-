import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
    answer: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
  },
  {
    question: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
    answer: "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Implement smooth scrolling and active link highlighting across the landing page sections (Home, How it works, Stats, Footer).\n\nAdd a testimonials/reviews strip from students with star ratings and short quotes to build trust.\n\nAdd an FAQ section with expandable questions about live tracking, routes, and pickup notifications. also add laguace select Bangla English  Arabic",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-20">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Frequently Asked <span className="text-accent">Questions</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
          Everything you need to know about the PUB Bus Track system.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-ink/10">
              <AccordionTrigger className="font-display text-base font-bold text-ink hover:no-underline whitespace-pre-wrap">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-ink/70 whitespace-pre-wrap">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
