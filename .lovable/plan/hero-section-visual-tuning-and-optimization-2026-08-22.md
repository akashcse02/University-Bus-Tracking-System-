# Hero Section Visual Tuning and Optimization

The goal is to refine the hero section layout and animations to match the reference image (Transit app) more closely, specifically by scaling down elements for better composition and adding realistic clouds. Performance optimizations for mobile will also be implemented.

## Design Adjustments

- **Element Scaling**: Reduce the size of the building, bus, and phone mockup to create a more "airy" and professional look, similar to the reference image.
- **Visual Composition**: Adjust the positions of the building (left) and bus/phone (right) so they sit lower in the layout, framing the central text without crowding it.
- **Realistic Clouds**: Replace the current basic SVG clouds with more realistic, soft-edged CSS/SVG clouds that feel "real" rather than "flat".

## Animation & Performance

- **Layout Shift Reduction**: Use `transform` (translate/scale) for entrance animations instead of properties that trigger layout shifts (like margin or padding).
- **Mobile Optimization**: Reduce the complexity of animations (e.g., simpler floating paths) for mobile devices to ensure a consistent 60fps experience.
- **Reduced Motion**: Ensure `prefers-reduced-motion` is fully respected to disable heavy parallax or float effects.

## Technical Details

- Use a more refined SVG filter for the clouds to achieve a "soft" look.
- Apply `will-change: transform` to animated hero elements.
- Adjust the grid/flex containers in `src/routes/index.tsx` to accommodate smaller element sizes.
- Append the verbatim request text to the hidden metadata section.
