-- ============================================
-- Admin Notes Table
-- ============================================

CREATE TABLE IF NOT EXISTS admin_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL DEFAULT '',
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Note',
    color VARCHAR(50) DEFAULT 'default',
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

-- Only authenticated (admin) users can do CRUD
CREATE POLICY "Admin full access to notes"
    ON admin_notes FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
