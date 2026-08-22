import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const verbatimText = `'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            now \n\n\"Enhance the existing PUB Bus Track landing page with the following updates:\n\n1. FAQ Accordion Accessibility: Upgrade the FAQ accordion section with full keyboard navigation (Tab to focus, Enter/Space to expand-collapse, Arrow Up/Down to move between questions), proper ARIA attributes (aria-expanded, aria-controls, role='button' on triggers, aria-hidden on collapsed panels), and smooth CSS height transitions (using max-height or grid-template-rows animation, not abrupt show/hide) when opening and closing each answer.\n\n2. Email Signup Section: Add a dedicated email signup section (place it after the FAQ or before the footer) with a headline like 'Stay Updated' and subtext: 'Get notified about new routes, schedule changes, and pickup alerts.' Include an email input field with validation and a submit button styled to match the site's color scheme, plus a success message state after submission (frontend only for now, no backend wiring needed yet).\n\n3. SEO & Discoverability: Add proper SEO meta tags (title, description, keywords), Open Graph tags (og:title, og:description, og:image, og:type) for social sharing previews, a favicon, and a sitemap-friendly semantic HTML structure (proper heading hierarchy h1-h3, semantic tags like <section>, <nav>, <footer>) so the landing page is easily indexed by search engines.\n\n4. Contact Form in Footer: Add a contact form inside the footer section with Name, Email, and Message fields, plus a Submit button, so students can ask questions about live tracking or pickup notifications. Include basic client-side validation and a confirmation message on submit.\n\n5. 'How It Works' Section — Premium Scroll-Stacking Cards: Redesign the 'How It Works' section as a premium scroll-stacking card sequence with 4 cards, each explaining a step and each in a distinct color:\n\nCard 1 (Blue theme) — Title: 'Enter Your Location'. Description: 'Students enter their home/pickup location once. The app saves it so the nearest bus route is automatically matched.' Icon: location pin.\n\nCard 2 (Teal/Cyan theme) — Title: 'Select Your Bus'. Description: 'Choose your assigned bus number and route from the list — Gobindaganj, Sherpur, Sathmatha, or Gabtoli.' Icon: bus.\n\nCard 3 (Orange theme) — Title: 'Track in Real-Time'. Description: 'See your bus moving live on the map, with accurate ETA so you know exactly when to head to your stop.' Icon: map/radar.\n\nCard 4 (Green theme) — Title: 'Get Notified'. Description: 'Receive instant alerts for arrival time, delays, or route changes — never miss your bus again.' Icon: bell.\n\nDesign for each card: solid or gradient background in its theme color, white/light text and icon, rounded corners (16-20px), soft drop shadow, large icon at top, bold title, short description text below — clean, professional SaaS-style card design (like Linear or Stripe), not cartoonish.\n\nScroll behavior (pinned stacking effect): as the user scrolls into this section, Card 1 becomes sticky/pinned in the viewport center. Continued scrolling brings Card 2 sliding up from below, layering on top of Card 1 with a slight offset (so a sliver of Card 1's edge/color remains visible behind it), plus a subtle scale-down and fade on the card underneath as it gets covered. This repeats for Card 3 over Card 2, and Card 4 over Card 3. Each transition should be smooth and scroll-linked (using Intersection Observer or a scroll-progress-driven transform — translateY and scale), not instant — should feel physics-based and premium, like Apple product pages or Stripe's scroll sections. After the last card is fully stacked, the section unpins and normal page scroll continues.\n\nEnsure smooth 60fps performance (use transform/opacity only), add a subtle parallax/scale effect on the icons, and make sure it works well on both desktop and a simplified mobile version.\n\nFrame this section with a heading: 'How PUB Bus Track Works' and subheading: 'From your home to campus — track every step of the way.'\n\n6. Hero Section — Two-Sided Animated Location Flow: Redesign the hero section animation so it tells a visual story:\n\nOn the left side, show a student's house/home illustration with a small mobile phone icon showing a pulsing location pin (representing the student entering their pickup location).\n\nAnimate a location marker/ping traveling from the left (student's home) across the hero section toward the right side.\n\nOn the right side, show the Pundra University building illustration with a bus arriving, and the location pin animation settling there — representing the bus route connecting student pickup points to the university.\n\nThis should loop or trigger smoothly on page load, using CSS/SVG path animation so it feels like a live connection being drawn between home and campus.\n\nKeep the existing sky-blue background, green/orange accent colors, and playful illustrated style consistent across all these additions (except the 'How It Works' cards, which should follow their own premium color-coded theme as described above). Fully responsive on mobile and desktop.\"`;

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
