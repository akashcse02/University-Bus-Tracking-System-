# Plan: PUB Bus Track Enhancements

Enhance the PUB Bus Track landing page with advanced animations, improved accessibility, and new interactive sections while maintaining the playful illustrated style.

## User Review Required
> [!IMPORTANT]
> The "How It Works" section will be redesigned into a scroll-stacking card layout. This requires a significant change to the current grid layout.

- **Framer Motion**: Since `framer-motion` is not in the project, I will implement scroll-stacking using `Intersection Observer` and CSS sticky positioning for maximum performance.

## Proposed Changes

### 1. Hero Section: Animated Location Flow
- **Left Side**: Add a student's house illustration with a pulsing phone icon.
- **Right Side**: Use the existing Pundra University building.
- **Animation**: Add a location pin SVG that travels along a curved path from the student's home to the university building, looping continuously.

### 2. How It Works: Scroll-Stacking Cards
- Redesign `src/components/how-it-works.tsx`.
- Create 4 premium cards (Location, Select Bus, Track, Notified) with distinct colors (Blue, Teal, Orange, Green).
- Implement a sticky stacking effect where cards layer on top of each other as the user scrolls, with scale and opacity transitions.

### 3. FAQ Section: Accessibility & Content
- Update `src/components/faq-section.tsx` with the new verbatim text.
- Ensure the Radix UI Accordion has smooth height transitions using the `accordion-down` and `accordion-up` keyframes (already defined in `src/styles.css`).
- Verify ARIA attributes and keyboard navigation.

### 4. New: Email Signup Section
- Create `src/components/email-signup.tsx`.
- Add a "Stay Updated" section with a clean input field and a mock success state.

### 5. Site Footer: Contact Form & SEO
- Update `src/components/site-footer.tsx` to include a contact form with basic validation.
- Update `src/routes/index.tsx` `head` metadata with keywords and Open Graph tags.
- Ensure semantic HTML hierarchy (h1, h2, h3, section, footer).

## Technical Details
- **Stacking Logic**: Use `position: sticky` and `top` offsets for the cards.
- **Path Animation**: Use SVG `<animateMotion>` or CSS `offset-path`.
- **Validation**: Use `react-hook-form` and `zod` for the new forms.
