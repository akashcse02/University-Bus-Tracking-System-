CREATE OR REPLACE FUNCTION public.trip_status_alert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  rname text;
  rslug text;
  bnum text;
BEGIN
  SELECT name INTO rname FROM public.routes WHERE id = NEW.route_id;
  SELECT bus_number INTO bnum FROM public.buses WHERE id = NEW.bus_id;
  rslug := lower(regexp_replace(regexp_replace(coalesce(rname,''), '\s*route$', '', 'i'), '[\s/]+', '-', 'g'));

  IF NEW.status IS DISTINCT FROM OLD.status AND NEW.status = 'delayed' THEN
    INSERT INTO public.route_alerts (route_id, alert_type, message, created_by)
    VALUES (rslug, 'delay', coalesce(bnum,'A bus') || ' is running late on the ' || coalesce(rname,'route') || '.', NEW.driver_id);
  ELSIF NEW.status IS DISTINCT FROM OLD.status AND NEW.status = 'cancelled' THEN
    INSERT INTO public.route_alerts (route_id, alert_type, message, created_by)
    VALUES (rslug, 'cancellation', coalesce(bnum,'A bus') || ' trip on the ' || coalesce(rname,'route') || ' has been cancelled.', NEW.driver_id);
  ELSIF NEW.route_id IS DISTINCT FROM OLD.route_id THEN
    INSERT INTO public.route_alerts (route_id, alert_type, message, created_by)
    VALUES (rslug, 'route_change', coalesce(bnum,'A bus') || ' has switched to the ' || coalesce(rname,'route') || '.', NEW.driver_id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trips_status_alert
AFTER UPDATE OF status, route_id ON public.trips
FOR EACH ROW EXECUTE FUNCTION public.trip_status_alert();