# Plan: Premium Hero Section Update for PUB Bus Track

Update the hero section to feature high-fidelity animations, brand assets, and enhanced accessibility/performance as requested.

## Proposed Changes

### 1. Style & Animation (CSS)
- Add GPU-accelerated keyframes for entrance and idle animations in `src/styles.css`.
- Implement `prefers-reduced-motion` support for all animations.
- Define a `floating` animation for the idle state of the building and bus.
- Create a `shift-weight` animation for the waiting student character.

### 2. Hero Section Refactor (`src/routes/index.tsx`)
- **Layout**: Center the PUB logo above the headline. Remove the "Get Started" button.
- **Brand Assets**: Use `pundraUni` (building) and `pubBus` (bus) with transparent backgrounds (simulated via `bg-transparent` and `mix-blend-mode` if needed, or assuming the provided images are transparent).
- **Animations**:
    - Slide-in from left/right with 3D tilt on load.
    - Continuous subtle floating motion after entrance.
- **Waiting Character**: Add a CSS/SVG animated student character near the building with an idle animation (checking phone/shifting weight).
- **Accessibility**: 
    - Add descriptive `alt` text and `aria-label` for all hero elements.
    - Wrap animations in motion-aware components or use CSS variables controlled by media queries.
- **Performance**:
    - Add `fetchpriority="high"` to the building and bus images.
    - Use responsive `sizes` attribute for LCP optimization.

### 3. SEO & Head Metadata (`src/routes/index.tsx`)
- Add `<link rel="preload">` tags in the `head` function for critical hero images.

### 4. Mobile Optimization
- Stack building and bus images vertically on small screens.
- Stagger entrance animations (Building -> Bus -> Logo/Character).

## Technical Details
- **Stacking Context**: Ensure the logo remains centered and above the content.
- **Image Handling**: Use `object-fit: contain` to prevent distortion.
- **Animations**: Use `transform: translate3d()` and `opacity` to ensure GPU acceleration.
- **Reduced Motion**: Implement via `@media (prefers-reduced-motion: reduce)` in `src/styles.css`.
