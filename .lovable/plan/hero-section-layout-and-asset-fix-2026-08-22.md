# Hero Section Layout and Asset Fix

The goal is to fix visual overlaps in the hero section by separating content into two columns (text vs building), correctly anchoring badges to the building image, moving the stats strip to a dedicated section below the hero, and ensuring authentic Pundra University assets are used instead of placeholders.

## Layout Changes

- **Columns**: Wrap the hero content (Headline, Subtext, CTA) in a central/right-aligned column and the university building in a separate left column to prevent overlap.
- **Badge Anchoring**: Move 'Student ID' and 'Classes 9:00' badges inside the building image container using absolute positioning relative to that container.
- **Stats Row**: Relocate the `StatsStrip` component from inside the hero's vertical flow to a new full-width section below the hero visuals with significant top margin.

## Asset Verification

- Ensure `pundra-university.jpg` and `pub-bus.png` are the primary sources for the building and bus images respectively.
- Remove any remaining generic illustrations or placeholders in the hero.

## Spacing and Responsiveness

- Apply a consistent 24px minimum gap between adjacent elements.
- Add a 100px vertical gap between the hero visuals and the stats strip.
- Verify layouts at 1440px (Desktop), 768px (Tablet), and 375px (Mobile).

## Technical Details

- Use a grid/flex layout in `src/routes/index.tsx` for the two-column hero.
- Adjust z-index and absolute positioning values for badges to keep them "contained".
- Move the `Reveal` wrapper for `StatsStrip` outside the main hero `<section>`.
- Append the verbatim request text to the hidden metadata section for record-keeping.
