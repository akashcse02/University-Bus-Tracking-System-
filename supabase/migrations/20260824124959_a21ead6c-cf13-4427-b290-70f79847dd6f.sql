CREATE TABLE public.app_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);

GRANT SELECT ON public.app_config TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_config TO authenticated;
GRANT ALL ON public.app_config TO service_role;

ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "app_config readable by everyone" ON public.app_config
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "app_config admins can insert" ON public.app_config
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "app_config admins can update" ON public.app_config
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "app_config admins can delete" ON public.app_config
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.app_config (key, value) VALUES
('map_settings', '{"centerLat":24.9223067,"centerLng":89.3490259,"defaultZoom":15,"showRouteLines":true,"hiddenRouteIds":[],"gpsBanner":"Live GPS tracking coming soon — bus positions shown are default (Pundra University campus) until drivers connect their location.","bannerEnabled":true,"refreshIntervalMs":15000,"markerScatterMeters":60}'::jsonb),
('fleet_routes', '{"routes":[]}'::jsonb);