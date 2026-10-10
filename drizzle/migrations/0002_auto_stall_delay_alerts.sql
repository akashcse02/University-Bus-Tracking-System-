-- lovable-cron-fallback-reviewed: a stalled bus sends no updates, so detecting 5 minutes without movement is inherently time-based
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS last_moved_at timestamptz;
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS stall_alerted boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.trip_track_movement()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  IF NEW.current_lat IS NOT NULL AND NEW.current_lng IS NOT NULL AND (
       OLD.current_lat IS NULL OR OLD.current_lng IS NULL OR NEW.last_moved_at IS NULL
       OR abs(NEW.current_lat - OLD.current_lat) > 0.0003
       OR abs(NEW.current_lng - OLD.current_lng) > 0.0003) THEN
    NEW.last_moved_at := now();
    NEW.stall_alerted := false;
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status AND NEW.status = 'in_progress' THEN
    NEW.last_moved_at := now();
    NEW.stall_alerted := false;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trips_track_movement ON public.trips;
CREATE TRIGGER trips_track_movement BEFORE UPDATE ON public.trips
FOR EACH ROW EXECUTE FUNCTION public.trip_track_movement();

CREATE OR REPLACE FUNCTION public.check_stalled_trips()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE r record; rslug text;
BEGIN
  FOR r IN
    SELECT t.id, t.driver_id, ro.name AS rname, b.bus_number AS bnum
    FROM public.trips t
    LEFT JOIN public.routes ro ON ro.id = t.route_id
    LEFT JOIN public.buses b ON b.id = t.bus_id
    WHERE t.status = 'in_progress' AND NOT t.stall_alerted
      AND t.last_moved_at IS NOT NULL AND t.last_moved_at < now() - interval '5 minutes'
  LOOP
    rslug := lower(regexp_replace(regexp_replace(coalesce(r.rname,''), '\s*route$', '', 'i'), '[\s/]+', '-', 'g'));
    INSERT INTO public.route_alerts (route_id, alert_type, message, created_by)
    VALUES (rslug, 'delay', coalesce(r.bnum,'A bus') || ' has been stopped for over 5 minutes on the ' || coalesce(r.rname,'route') || ' — expect a delay.', r.driver_id);
    UPDATE public.trips SET stall_alerted = true WHERE id = r.id;
  END LOOP;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.check_stalled_trips() FROM PUBLIC, anon, authenticated;

CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.unschedule('check-stalled-trips') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'check-stalled-trips');
SELECT cron.schedule('check-stalled-trips', '* * * * *', 'SELECT public.check_stalled_trips()');