-- 1. Create Contacts Table (Permanent Repository)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Website Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL, -- Link to master contact
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create CRM Pipeline Stages Table
CREATE TABLE IF NOT EXISTS public.crm_stages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    position INTEGER NOT NULL,
    is_protected BOOLEAN DEFAULT false, -- To prevent deleting "New Leads"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create CRM Leads Table
CREATE TABLE IF NOT EXISTS public.crm_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL, -- e.g., "Inquiry from John Doe" or Company Name
    contact_id UUID REFERENCES public.contacts(id) ON DELETE RESTRICT,
    stage_id UUID REFERENCES public.crm_stages(id) ON DELETE CASCADE,
    value NUMERIC(15, 2), -- Optional deal value
    notes TEXT,
    position INTEGER NOT NULL, -- For drag and drop ordering within a stage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- INSERT DEFAULT DATA
-- Create the default protected "New Leads" stage
INSERT INTO public.crm_stages (name, position, is_protected)
VALUES ('New Leads', 0, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.crm_stages (name, position, is_protected)
VALUES ('Qualified', 1, false)
ON CONFLICT DO NOTHING;

INSERT INTO public.crm_stages (name, position, is_protected)
VALUES ('Proposal Sent', 2, false)
ON CONFLICT DO NOTHING;

INSERT INTO public.crm_stages (name, position, is_protected)
VALUES ('Closed Won', 3, false)
ON CONFLICT DO NOTHING;

INSERT INTO public.crm_stages (name, position, is_protected)
VALUES ('Closed Lost', 4, false)
ON CONFLICT DO NOTHING;


-- RLS POLICIES FOR ALL TABLES (assuming basic authenticated access for admin)

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

-- Allow public to INSERT inquiries (from contact form on website)
CREATE POLICY "Allow public insert to inquiries"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

-- Allow public to INSERT contacts (created alongside their inquiry)
CREATE POLICY "Allow public insert to contacts"
    ON public.contacts FOR INSERT
    WITH CHECK (true);


-- Allow authenticated users to do everything (Admin Dashboard)
CREATE POLICY "Allow authenticated full access to contacts" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to crm_stages" ON public.crm_stages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to crm_leads" ON public.crm_leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Prevent deletion of protected stages (New Leads) via policy
CREATE POLICY "Prevent deleting protected stages"
    ON public.crm_stages FOR DELETE TO authenticated
    USING (is_protected = false);
