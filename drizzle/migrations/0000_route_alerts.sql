CREATE TYPE public.alert_type AS ENUM ('delay','route_change','cancellation');

CREATE TABLE public.route_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id text NOT NULL,
  alert_type public.alert_type NOT NULL,
  message text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.route_alerts TO authenticated;
GRANT INSERT, DELETE ON public.route_alerts TO authenticated;
GRANT ALL ON public.route_alerts TO service_role;
ALTER TABLE public.route_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in users can read route alerts" ON public.route_alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and drivers can post alerts" ON public.route_alerts FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid() AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'driver')));
CREATE POLICY "Admins can delete alerts" ON public.route_alerts FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.route_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  route_id text NOT NULL,
  notify_delay boolean NOT NULL DEFAULT true,
  notify_route_change boolean NOT NULL DEFAULT true,
  notify_cancellation boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, route_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.route_subscriptions TO authenticated;
GRANT ALL ON public.route_subscriptions TO service_role;
ALTER TABLE public.route_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own subscriptions" ON public.route_subscriptions FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

ALTER PUBLICATION supabase_realtime ADD TABLE public.route_alerts;