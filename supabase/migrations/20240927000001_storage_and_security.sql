-- 5. STORAGE BUCKETS
-- Create a bucket for project images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
-- Anyone can view project images
CREATE POLICY "Project images are public"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Only admins can upload/manage project images
CREATE POLICY "Admins can manage project images"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'project-images' AND 
  public.is_admin()
);

-- REFINEMENT: Ensure leads can only be inserted with status='NEW'
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
CREATE POLICY "Public can submit leads" ON public.leads
    FOR INSERT WITH CHECK (status = 'NEW');

-- REFINEMENT: Explicitly block any profile insert from public (only handle_new_user trigger should do it)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can update their own non-sensitive profile data" ON public.profiles;
CREATE POLICY "Users can update their own non-sensitive profile data" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND 
        (role = (SELECT role FROM public.profiles WHERE id = auth.uid()))
    );
