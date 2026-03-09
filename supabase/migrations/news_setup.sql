-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow public read access to news
CREATE POLICY "Allow public read access to news"
    ON public.news FOR SELECT
    USING (true);

-- Allow authenticated/service role to insert news
CREATE POLICY "Allow authenticated insert to news"
    ON public.news FOR INSERT
    WITH CHECK (true); -- In a real app, restrict this to authenticated admins

-- Create Storage bucket for news images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for news-images bucket
-- Allow public read access to bucket
CREATE POLICY "Public Access to news images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'news-images');

-- Allow authenticated/service role to insert to bucket
CREATE POLICY "Allow authenticated uploads to news images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'news-images'); -- In a real app, restrict this similarly
