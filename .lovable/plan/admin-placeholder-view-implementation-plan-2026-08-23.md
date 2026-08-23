# Admin Placeholder View Implementation Plan

Implement a simple admin dashboard for PUB Bus Track, accessible after a successful admin login (mock validation).

## User Review Required

> [!IMPORTANT]
> The admin dashboard uses mock data and frontend-only validation (`01700000000` / `admin123`). This must be replaced with a secure backend implementation before production.

## Proposed Changes

### Dashboard Shell
- Create `src/routes/admin.tsx` as a protected admin route.
- Implement a dashboard layout with a sidebar for navigation and a main content area.
- Visual style consistent with the app's theme: Poppins font, rounded containers, and premium hover effects.

### Management Sections (Demo Data)
- **Bus Management**: List of buses with status (Active/Maintenance), driver names, and route names.
- **Route Schedules**: Timetable for various routes (e.g., Campus to Gobindaganj).
- **User Roles**: Table showing users and their assigned roles (Student, Teacher, Driver, Admin).

### Auth Integration
- Update `src/routes/login.tsx` to redirect to `/admin` upon successful mock admin login.

## Technical Details

- **Components**: Use `Card`, `Table`, `Badge`, and `Tabs` components from the UI library.
- **State Management**: Simple React state for toggling between dashboard sections.
- **Navigation**: Sidebar using `Lucide` icons for each management area.
- **Metadata**: Add SEO meta tags specifically for the admin panel.
