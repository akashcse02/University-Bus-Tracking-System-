-- 1. Create Enums
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'driver', 'admin');
CREATE TYPE public.bus_status AS ENUM ('active', 'maintenance', 'inactive');
CREATE TYPE public.trip_status AS ENUM ('not_started', 'in_progress', 'completed', 'delayed', 'cancelled');
CREATE TYPE public.occupancy_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.issue_status AS ENUM ('pending', 'investigating', 'resolved', 'closed');

-- 2. Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    id_number TEXT UNIQUE,
    department TEXT,
    avatar_url TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 3. User Roles Table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Security Definer Function for Roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Routes Table
CREATE TABLE public.routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    path_points JSONB,
    stops JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT SELECT ON public.routes TO authenticated;
GRANT ALL ON public.routes TO service_role;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view routes" ON public.routes FOR SELECT TO authenticated USING (true);

-- 6. Buses Table
CREATE TABLE public.buses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_number TEXT NOT NULL UNIQUE,
    license_plate TEXT,
    capacity INTEGER DEFAULT 52,
    status public.bus_status DEFAULT 'active',
    current_route_id UUID REFERENCES public.routes(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT SELECT ON public.buses TO authenticated;
GRANT ALL ON public.buses TO service_role;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view buses" ON public.buses FOR SELECT TO authenticated USING (true);

-- 7. Trips Table
CREATE TABLE public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_id UUID REFERENCES public.buses(id) NOT NULL,
    driver_id UUID REFERENCES auth.users(id) NOT NULL,
    route_id UUID REFERENCES public.routes(id) NOT NULL,
    status public.trip_status DEFAULT 'not_started',
    current_lat DOUBLE PRECISION,
    current_lng DOUBLE PRECISION,
    occupancy public.occupancy_level DEFAULT 'low',
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT SELECT, INSERT, UPDATE ON public.trips TO authenticated;
GRANT ALL ON public.trips TO service_role;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active trips" ON public.trips FOR SELECT TO authenticated USING (true);
CREATE POLICY "Drivers can insert their trips" ON public.trips FOR INSERT TO authenticated WITH CHECK (driver_id = auth.uid());
CREATE POLICY "Drivers can update their trips" ON public.trips FOR UPDATE TO authenticated USING (driver_id = auth.uid()) WITH CHECK (driver_id = auth.uid());

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.trips;

-- 8. Issues Table
CREATE TABLE public.issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    status public.issue_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT SELECT, INSERT, UPDATE ON public.issues TO authenticated;
GRANT ALL ON public.issues TO service_role;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own issues" ON public.issues FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can view all issues" ON public.issues FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 9. Announcements Table
CREATE TABLE public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    target_role public.app_role,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT SELECT, INSERT ON public.announcements TO authenticated;
GRANT ALL ON public.announcements TO service_role;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view announcements" ON public.announcements FOR SELECT TO authenticated USING (target_role IS NULL OR target_role = (SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1));
CREATE POLICY "Admins and Teachers can create announcements" ON public.announcements FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
