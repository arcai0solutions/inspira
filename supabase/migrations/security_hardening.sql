-- ============================================================
-- SECURITY HARDENING  —  run this in the Supabase SQL editor
-- ============================================================
-- Fixes verified against the live database on 2026-10-08:
--
--  1. public.news           INSERT was open to the anon role (site defacement)
--  2. storage news-images   INSERT was open to the anon role (storage abuse)
--  3. public.news           had no UPDATE/DELETE policy, so admins could not
--                           edit or remove an article once published
--  4. public.crm_stages     "protected" stages were deletable anyway, because
--                           permissive RLS policies are OR'd together
--  5. public.chat_messages  table was never created, so AI chat logging fails
--
-- Root cause of 1 and 2: a policy written without a `TO` clause defaults to
-- PUBLIC, which includes `anon`. The anon key ships in the browser bundle, so
-- those policies were effectively "anyone on the internet".
-- ============================================================


-- ------------------------------------------------------------
-- 1 + 3. public.news — restrict writes to signed-in admins
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated insert to news" ON public.news;

CREATE POLICY "Authenticated can insert news"
    ON public.news FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can update news" ON public.news;
CREATE POLICY "Authenticated can update news"
    ON public.news FOR UPDATE
    TO authenticated
    USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can delete news" ON public.news;
CREATE POLICY "Authenticated can delete news"
    ON public.news FOR DELETE
    TO authenticated
    USING (true);

-- Public read stays as-is: the newsroom is meant to be world-readable.


-- ------------------------------------------------------------
-- 2. storage: news-images — restrict uploads to signed-in admins
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated uploads to news images" ON storage.objects;

CREATE POLICY "Authenticated upload of news images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'news-images');

DROP POLICY IF EXISTS "Authenticated update of news images" ON storage.objects;
CREATE POLICY "Authenticated update of news images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'news-images')
    WITH CHECK (bucket_id = 'news-images');

DROP POLICY IF EXISTS "Authenticated delete of news images" ON storage.objects;
CREATE POLICY "Authenticated delete of news images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'news-images');

-- Public SELECT on the bucket stays: article images must load for visitors.


-- ------------------------------------------------------------
-- 4. public.crm_stages — actually protect the default stages
-- ------------------------------------------------------------
-- The existing "Allow authenticated full access" policy is permissive and
-- covers DELETE, and permissive policies are OR'd, so the old protection
-- policy never had any effect. A RESTRICTIVE policy is AND'd instead.
DROP POLICY IF EXISTS "Prevent deleting protected stages" ON public.crm_stages;

CREATE POLICY "Protected stages cannot be deleted"
    ON public.crm_stages AS RESTRICTIVE FOR DELETE
    TO authenticated
    USING (is_protected = false);


-- ------------------------------------------------------------
-- 5. public.chat_messages — create the missing table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_messages_session_created_idx
    ON public.chat_messages (session_id, created_at);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public insert to chat_messages"
    ON public.chat_messages FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read access to chat_messages" ON public.chat_messages;
CREATE POLICY "Allow authenticated read access to chat_messages"
    ON public.chat_messages FOR SELECT
    TO authenticated
    USING (true);


-- ------------------------------------------------------------
-- 6. public.hero_banners — don't expose unpublished banners
-- ------------------------------------------------------------
-- Anonymous visitors should only see banners that are actually live;
-- the dashboard (authenticated) still needs to list drafts.
DROP POLICY IF EXISTS "Public can read active banners" ON public.hero_banners;

CREATE POLICY "Public can read active banners"
    ON public.hero_banners FOR SELECT
    TO anon
    USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated can read all banners" ON public.hero_banners;
CREATE POLICY "Authenticated can read all banners"
    ON public.hero_banners FOR SELECT
    TO authenticated
    USING (true);


-- ------------------------------------------------------------
-- Verification — every row below should read "restricted"
-- ------------------------------------------------------------
-- SELECT tablename, policyname, roles, cmd
-- FROM pg_policies
-- WHERE schemaname = 'public' AND cmd <> 'SELECT'
-- ORDER BY tablename, cmd;
--
-- Anything showing roles = {public} for INSERT/UPDATE/DELETE is reachable by
-- anonymous visitors and needs a TO authenticated clause.
