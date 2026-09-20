GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.class_schedules TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance_records TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.announcements TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.issues TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trips TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.buses TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.routes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_config TO authenticated;

GRANT SELECT ON public.reviews TO anon;
GRANT SELECT ON public.buses TO anon;
GRANT SELECT ON public.routes TO anon;
GRANT SELECT ON public.trips TO anon;
GRANT SELECT ON public.app_config TO anon;

GRANT ALL ON public.profiles, public.user_roles, public.reviews, public.class_schedules,
  public.attendance_records, public.announcements, public.issues, public.trips,
  public.buses, public.routes, public.app_config TO service_role;