import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const verbatimText = "";

const faqs = [
  {
    question: verbatimText,
    answer: verbatimText,
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
