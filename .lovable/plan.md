# Implementation Plan - Time Schedule Enhancements

I will implement the requested administrative interface, deep linking, and notification preferences for the PUB Bus Tracking System.

## User Review Required

> [!IMPORTANT]
> - The admin interface will be added to the existing `/admin` dashboard.
> - Deep linking will use URL search parameters (`?day=...&route=...&type=...`).
> - Notification preferences will be stored locally in the browser for now, simulating a backend alert system.

## Proposed Changes

### Administrative Interface
- Update `src/routes/admin.tsx` to include a new "Schedule Manager" tab.
- Add forms to edit `CLASS_TIME_SCHEDULE` and `EXAM_TIME_SCHEDULE` (simulated via state).
- Add a toggle to "Publish" or "Activate" the Exam Time dataset globally.

### Deep Linking
- Modify `src/routes/time-schedule.tsx` to read `day`, `route`, and `type` from the URL on load.
- Automatically switch the tab and filter the table based on these parameters.

### Notification Preferences
- Create a new component `src/components/notification-settings.tsx` as a slide-over or modal.
- Allow users to toggle between Push and SMS alerts.
- Add a slider/input for "Alert Lead Time" (e.g., 5, 10, 15 minutes before departure).
- Integrate this component into the Time Schedule page via the existing "Settings" icon.

### Visual Edits (Literal Text)
- Update the hidden metadata container in `src/routes/time-schedule.tsx` with the exact text requested.

## Technical Details

- **Routing:** Use `@tanstack/react-router`'s `useSearch` hook for deep links.
- **State Management:** Use `useState` and `localStorage` for notification preferences.
- **Components:** Use `shadcn/ui` components (Dialog, Switch, Slider) for the settings panel.
- **Mock Data:** Extend the existing schedule constants to be editable within the session.
