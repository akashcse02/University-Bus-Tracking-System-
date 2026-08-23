# Implementation Plan - Login & Sign Up Pages with Hidden Admin

Create professional, theme-consistent Login and Sign Up pages for PUB Bus Track with role-specific fields and hidden admin access.

## User Review Required

> [!IMPORTANT]
> - The Admin access is implemented as a hidden feature (5 clicks on the footer copyright).
> - Backend authentication is mocked for now as requested.

## Proposed Changes

### Styles & Animations
- Add new animations to `src/styles.css`:
    - `butterfly-flutter`: Figure-eight flight path.
    - `bird-glide`: Slow horizontal gliding.
    - `bus-idle`: Subtle bobbing for the bus illustration.
- Ensure `prefers-reduced-motion` disables these.

### Shared Components
- **AuthLayout**: A wrapper for Login/Signup pages containing the sky-blue gradient, realistic clouds, and decorative animations (bus, butterflies, birds).
- **AdminLoginForm**: A simple two-field form (Phone, Password) for hidden admin access.

### Pages & Routes
- **Sign Up (`/signup`)**:
    - Tabs for Student, Teacher, Driver.
    - Fields:
        - Student: ID, Name, Dept, Batch, Email, Password.
        - Teacher: Name, Dept, Profession, Email, Password.
        - Driver: Name, Route, Bus No, Phone (opt), Email, Password.
    - Link to Login.
- **Login (`/login`)**:
    - Tabs for Student, Teacher, Driver.
    - Fields:
        - Student: ID/Email, Password.
        - Teacher/Driver: Email, Password.
    - Link to Sign Up & Forgot Password.

### Hidden Admin Access
- Update `SiteFooter` to track clicks on the copyright text.
- After 5 clicks, show a modal or redirect to a hidden admin login state.
- Implement mock validation for `Phone: 01700000000`, `Password: admin123`.

## Technical Details

- **Framework**: TanStack Start (React 19).
- **Styling**: Tailwind CSS v4 with oklch colors.
- **Validation**: Zod (for client-side checks) + standard HTML5 validation.
- **State Management**: React `useState` for form fields and tab switching.
- **Accessibility**: ARIA labels for all form inputs and tabs.
