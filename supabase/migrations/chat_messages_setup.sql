-- Create chat_messages table for logging AI conversations
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from the chat widget)
CREATE POLICY "Allow public insert to chat_messages"
    ON public.chat_messages FOR INSERT
    WITH CHECK (true);

-- Only authenticated users can read chat logs (admin dashboard)
CREATE POLICY "Allow authenticated read access to chat_messages"
    ON public.chat_messages FOR SELECT
    TO authenticated
    USING (true);
