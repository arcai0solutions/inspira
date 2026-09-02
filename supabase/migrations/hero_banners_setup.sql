-- ============================================================
-- Hero Banner System
-- Backend-managed rotating banners for the homepage hero.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.hero_banners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    eyebrow TEXT,                        -- small label above the headline
    title TEXT NOT NULL,                 -- main headline
    subtitle TEXT,                       -- supporting line
    image_url TEXT NOT NULL,             -- background image
    image_alt TEXT,                      -- accessible description of the image
    cta_label TEXT,                      -- primary button text  e.g. "Book a Meeting"
    cta_href TEXT,                       -- primary button link
    cta_secondary_label TEXT,            -- secondary button text e.g. "Call"
    cta_secondary_href TEXT,             -- secondary button link
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fast lookup for the public site: active banners in display order
CREATE INDEX IF NOT EXISTS hero_banners_active_order_idx
    ON public.hero_banners (is_active, sort_order);

-- Keep updated_at fresh on every edit
CREATE OR REPLACE FUNCTION public.set_hero_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hero_banners_set_updated_at ON public.hero_banners;
CREATE TRIGGER hero_banners_set_updated_at
    BEFORE UPDATE ON public.hero_banners
    FOR EACH ROW EXECUTE FUNCTION public.set_hero_banners_updated_at();

-- ---------- Row Level Security ----------
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active banners" ON public.hero_banners;
CREATE POLICY "Public can read active banners"
    ON public.hero_banners FOR SELECT
    USING (true);

-- Writes are restricted to signed-in admin users (same model as the rest of the dashboard).
DROP POLICY IF EXISTS "Authenticated can insert banners" ON public.hero_banners;
CREATE POLICY "Authenticated can insert banners"
    ON public.hero_banners FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can update banners" ON public.hero_banners;
CREATE POLICY "Authenticated can update banners"
    ON public.hero_banners FOR UPDATE
    TO authenticated
    USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can delete banners" ON public.hero_banners;
CREATE POLICY "Authenticated can delete banners"
    ON public.hero_banners FOR DELETE
    TO authenticated
    USING (true);

-- ---------- Storage bucket for banner artwork ----------
INSERT INTO storage.buckets (id, name, public)
VALUES ('banner-images', 'banner-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read of banner images" ON storage.objects;
CREATE POLICY "Public read of banner images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'banner-images');

DROP POLICY IF EXISTS "Authenticated upload of banner images" ON storage.objects;
CREATE POLICY "Authenticated upload of banner images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'banner-images');

DROP POLICY IF EXISTS "Authenticated delete of banner images" ON storage.objects;
CREATE POLICY "Authenticated delete of banner images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'banner-images');
