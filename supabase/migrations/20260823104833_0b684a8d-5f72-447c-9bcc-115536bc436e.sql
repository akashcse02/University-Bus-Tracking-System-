-- announcements_no_update_delete
-- Fix: Add update and delete policies for announcements
DROP POLICY IF EXISTS "Admins and Teachers can delete their own announcements" ON public.announcements;
CREATE POLICY "Admins and Teachers can delete their own announcements"
ON public.announcements
FOR DELETE
TO authenticated
USING (
  (auth.uid() = author_id) AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
);

DROP POLICY IF EXISTS "Admins and Teachers can update their own announcements" ON public.announcements;
CREATE POLICY "Admins and Teachers can update their own announcements"
ON public.announcements
FOR UPDATE
TO authenticated
USING (
  (auth.uid() = author_id) AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
)
WITH CHECK (
  (auth.uid() = author_id) AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
);

-- buses_routes_broad_select
-- Fix: Restrict SELECT access to buses and routes to authenticated users
DROP POLICY IF EXISTS "Anyone can view buses" ON public.buses;
CREATE POLICY "Anyone can view buses"
ON public.buses
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Anyone can view routes" ON public.routes;
CREATE POLICY "Anyone can view routes"
ON public.routes
FOR SELECT
TO authenticated
USING (true);

-- trips_broad_select_exposure
-- Fix: Restrict SELECT access to active trips to authenticated users
DROP POLICY IF EXISTS "Anyone can view active trips" ON public.trips;
CREATE POLICY "Anyone can view active trips"
ON public.trips
FOR SELECT
TO authenticated
USING (true);
