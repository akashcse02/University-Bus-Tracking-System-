# Implementation Plan - Complete Authenticated Dashboards with Live GPS Tracking

Implement a comprehensive transit management system with 4 user roles, real backend authentication, live GPS tracking on Google Maps, and role-specific features.

## User Review Required

> [!IMPORTANT]
> To enable full functionality, you must:
> 1.  **Provide a Google Maps API Key**: Once you have one, provide it to me or set it in the backend settings as `VITE_GOOGLE_MAPS_API_KEY`.
> 2.  **Enable Lovable Cloud**: (Done)
> 3.  **Approve Database Schema**: I will create the necessary tables and RLS policies.

## Technical Details

### 1. Database Schema (Supabase)
-   **Profiles**: Extend user data (full name, student/employee ID, department, avatar URL).
-   **User Roles**: Implement `user_roles` table with `app_role` enum (`student`, `teacher`, `driver`, `admin`).
-   **Buses & Routes**: Manage the fleet and their assigned paths.
-   **Trips & GPS**: Real-time tracking of active buses, including latitude, longitude, and occupancy.
-   **Communication**: Tables for Announcements, Issues, and Lost & Found.
-   **History**: Logs for commute punctuality and bus usage.

### 2. Authentication Flow
-   **Real Auth**: Migrate from mock auth to Lovable Cloud Auth (Email/Password + Google).
-   **Role-Based Access**: Secure dashboards using TanStack Router middleware and Supabase RLS.
-   **Admin Gateway**: Maintain the hidden admin login sequence linked to real credentials.

### 3. Interactive Maps
-   **Google Maps Integration**: Replace static SVG maps with real-time interactive Google Maps.
-   **Driver Tracking**: Use Geolocation API to broadcast coordinates to the database every 10s.
-   **Live Sync**: Use Supabase Realtime to update bus positions on Student/Teacher/Admin maps without page refreshes.

### 4. Role-Specific Dashboards
-   **Student**: Focus on ETA, route alerts, and commute logs.
-   **Teacher**: Focus on announcements and schedule management.
-   **Driver**: Focus on trip execution, SOS alerts, and passenger counting.
-   **Admin**: Fleet-wide overview, analytics charts, and user management.

### 5. Features & UI
-   **Storage**: Profile picture uploads using Lovable Cloud Storage.
-   **Notifications**: Integrated in-app notification center.
-   **Pill UI**: Modern, glass-shine buttons and staggered entrance animations.
-   **Responsive**: Optimized for mobile (for students/drivers on the move) and desktop.

## Proposed Changes

### Database & Auth
-   [ ] Create migration for all schema tables and RLS policies.
-   [ ] Update `src/integrations/supabase/types.ts` (auto-generated).
-   [ ] Refactor `signup.tsx` and `login.tsx` for real backend auth.

### Components & Routes
-   [ ] `src/components/maps/GoogleLiveMap.tsx`: Core map component.
-   [ ] `src/routes/_authenticated/dashboard/index.tsx`: Main dashboard entry.
-   [ ] `src/routes/_authenticated/profile.tsx`: User settings and avatar upload.
-   [ ] `src/routes/_authenticated/admin/` (Fleet, Users, Analytics).
-   [ ] `src/routes/_authenticated/driver/` (Trip Control).

### Services
-   [ ] `src/lib/location.functions.ts`: Server functions for location updates.
-   [ ] `src/hooks/use-bus-tracking.ts`: Custom hook for Realtime location sync.
