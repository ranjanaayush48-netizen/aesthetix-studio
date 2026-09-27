-- Initial Database Schema for Aesthetix Studio
-- Target: Supabase / PostgreSQL

--------------------------------------------------------------------------------
-- TABLES
--------------------------------------------------------------------------------

-- 1. PROFILES Table (Public info, linked to Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS Table (Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LEADS Table (Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    whatsapp TEXT,
    service TEXT NOT NULL,
    business_description TEXT,
    existing_website BOOLEAN DEFAULT FALSE,
    website_url TEXT,
    budget TEXT,
    timeline TEXT,
    reference_websites TEXT,
    project_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'DISCUSSION', 'QUOTED', 'WON', 'LOST')),
    notes TEXT -- Internal admin notes
);

-- 4. REVIEWS Table (Client Feedback)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    project TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'removed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- INDEXES
--------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);

--------------------------------------------------------------------------------
-- SECURITY & RLS
--------------------------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT (role = 'admin')
        FROM public.profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

-- FIX: Users can update their own profile, but NOT their role
CREATE POLICY "Users can update their own non-sensitive profile data" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND 
        (CASE WHEN role IS DISTINCT FROM (SELECT role FROM public.profiles WHERE id = auth.uid()) THEN is_admin() ELSE true END)
    );

CREATE POLICY "Admins can manage all profiles" ON public.profiles
    FOR ALL USING (is_admin());

-- PROJECTS Policies
CREATE POLICY "Projects are viewable by everyone" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON public.projects
    FOR ALL USING (is_admin());

-- LEADS Policies (Strict)
CREATE POLICY "Public can submit leads" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view leads" ON public.leads
    FOR SELECT USING (is_admin());

CREATE POLICY "Only admins can update/delete leads" ON public.leads
    FOR ALL USING (is_admin());

-- REVIEWS Policies
CREATE POLICY "Published reviews are viewable by everyone" ON public.reviews
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can submit reviews" ON public.reviews
    FOR INSERT WITH CHECK (status = 'pending'); -- Ensure they can't set status to 'published' on insert

CREATE POLICY "Admins can manage all reviews" ON public.reviews
    FOR ALL USING (is_admin());

--------------------------------------------------------------------------------
-- TRIGGERS
--------------------------------------------------------------------------------

-- Update updated_at helper
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_project_update BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_profile_update BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (new.id, new.email, 'user');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
