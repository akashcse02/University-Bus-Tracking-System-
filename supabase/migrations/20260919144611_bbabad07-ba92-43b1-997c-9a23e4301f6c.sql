ALTER TABLE public.class_schedules
  ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

GRANT INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;