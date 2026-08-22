# Plan: PUB Bus Track Full Build Integration

Implement the complete landing page for "PUB Bus Track" based on the detailed requirements, ensuring all sections are present, animations are smooth, and the brand identity is consistent.

## Proposed Changes

### 1. New Component: Our Vision
- Create `src/components/our-vision.tsx` with a two-column layout.
- Left: "Our Vision" heading, mission statement, and "Learn More" button.
- Right: Layered collage animation (phone, bus icon, pins).

### 2. Component Refinement
- **Navbar**: Add "How it Works" link. Ensure language selector and Sign Up buttons match the pill-shaped design.
- **Hero Section**:
    - Add 'Pundra University' badge.
    - Anchor 'Student ID' and 'Classes 9:00' badges directly to the building image.
    - Add animated waiting-student character near a bus stop sign at the building's base.
    - Implement staggered entrance animations (building slide-in-left, bus slide-in-right).
- **Stats Strip**:
    - Update stats to: '4 Routes', '8 Buses', '1000+ Students', '6 Routes across Bogura'.
    - Ensure 80-100px top margin to prevent overlap.
- **How It Works**:
    - Verify 4 cards with specific SaaS colors (Blue, Teal, Orange, Green).
    - Ensure scroll-linked stacking behavior works correctly with `framer-motion`.
- **Testimonials**:
    - Ensure reviews for Md Akash Islam, Md Sabbir Hossain, and Irin Mim are present.
- **Site Footer**:
    - Reorganize into 4 columns as specified.
    - Ensure the contact form is nested correctly.
- **Email Signup**:
    - Update heading to "Never Miss Your Bus Again".

### 3. Page Assembly (`src/routes/index.tsx`)
- Organize sections in the exact order: Navbar, Hero, Stats Row, How It Works, Student Reviews, Our Vision, Newsletter Signup, Footer.
- Implement SEO and Open Graph metadata in the `head()` function.
- Add the verbatim user prompt text to a hidden container at the end of the file.

### 4. Styles and Performance
- Optimize animations for mobile to prevent layout shifts.
- Ensure `prefers-reduced-motion` is respected across all components.

## Technical Details
- Use `framer-motion` for complex scroll-driven animations (stacking cards, collage).
- Use `lucide-react` for consistent iconography.
- Maintain `oklch` color system for consistent branding.
- Ensure semantic HTML (`<section>`, `<nav>`, `<footer>`) for SEO.

## Verification Plan
- **Desktop/Mobile Responsiveness**: Test layout at various breakpoints.
- **Animations**: Verify entrance and scroll-triggered animations.
- **Interactions**: Test smooth scrolling, language selector, and contact form validation.
- **Accessibility**: Check ARIA labels and reduced-motion behavior.
