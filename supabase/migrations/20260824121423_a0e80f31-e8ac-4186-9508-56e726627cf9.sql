-- Allow server-verified role checks from the app
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- BUSES: keep readable to authenticated users, but hide license plates from non-admins
DROP POLICY IF EXISTS "Anyone can view buses" ON public.buses;
CREATE POLICY "Authenticated users can view buses"
ON public.buses FOR SELECT TO authenticated USING (true);

REVOKE SELECT ON public.buses FROM authenticated;
GRANT SELECT (id, bus_number, capacity, status, current_route_id, created_at) ON public.buses TO authenticated;
GRANT ALL ON public.buses TO service_role;

-- ROUTES: scope explicitly to authenticated users
DROP POLICY IF EXISTS "Anyone can view routes" ON public.routes;
CREATE POLICY "Authenticated users can view routes"
ON public.routes FOR SELECT TO authenticated USING (true);
GRANT SELECT ON public.routes TO authenticated;
GRANT ALL ON public.routes TO service_role;

-- TRIPS: only active trips, own trips (driver), or admin
DROP POLICY IF EXISTS "Anyone can view active trips" ON public.trips;
CREATE POLICY "Users can view active or own trips"
ON public.trips FOR SELECT TO authenticated
USING (
  status = 'in_progress'::trip_status
  OR driver_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin'::app_role)
);
GRANT SELECT, INSERT, UPDATE ON public.trips TO authenticated;
GRANT ALL ON public.trips TO service_role;

-- ANNOUNCEMENTS: ensure author-scoped update/delete policies exist
DROP POLICY IF EXISTS "Admins and Teachers can update their own announcements" ON public.announcements;
CREATE POLICY "Admins and Teachers can update their own announcements"
ON public.announcements FOR UPDATE TO authenticated
USING (auth.uid() = author_id AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role)))
WITH CHECK (auth.uid() = author_id AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role)));

DROP POLICY IF EXISTS "Admins and Teachers can delete their own announcements" ON public.announcements;
CREATE POLICY "Admins and Teachers can delete their own announcements"
ON public.announcements FOR DELETE TO authenticated
USING (auth.uid() = author_id AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role)));

CREATE POLICY "Admins can delete any announcement"
ON public.announcements FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.announcements TO authenticated;
GRANT ALL ON public.announcements TO service_role;