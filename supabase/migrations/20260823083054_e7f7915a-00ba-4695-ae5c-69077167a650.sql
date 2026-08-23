-- Seed Routes
INSERT INTO public.routes (id, name, description)
VALUES 
  (gen_random_uuid(), 'Campus Main', 'Main campus loop covering all departments'),
  (gen_random_uuid(), 'Sherpur Route', 'Route from Sherpur to Pundra University'),
  (gen_random_uuid(), 'Gobindaganj Route', 'Route from Gobindaganj to Pundra University');

-- Seed Buses
INSERT INTO public.buses (id, bus_number, license_plate, capacity, status, current_route_id)
SELECT 
  gen_random_uuid(), 
  'Bus 01', 
  'BOG-1234', 
  40, 
  'active', 
  id 
FROM public.routes WHERE name = 'Campus Main' LIMIT 1;

INSERT INTO public.buses (id, bus_number, license_plate, capacity, status, current_route_id)
SELECT 
  gen_random_uuid(), 
  'Bus 02', 
  'BOG-5678', 
  40, 
  'active', 
  id 
FROM public.routes WHERE name = 'Sherpur Route' LIMIT 1;

-- Grant access (already granted in previous migration, but good to be sure)
GRANT SELECT ON public.routes TO authenticated;
GRANT SELECT ON public.buses TO authenticated;
