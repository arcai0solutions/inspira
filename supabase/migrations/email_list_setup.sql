-- Create email subscribers table
create table public.email_subscribers (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    name text,
    source text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.email_subscribers enable row level security;

-- Drop existing policies if they exist (for idempotency)
drop policy if exists "Enable insert for anonymous users" on public.email_subscribers;
drop policy if exists "Enable select for authenticated users only" on public.email_subscribers;
drop policy if exists "Enable delete for authenticated users only" on public.email_subscribers;

-- Public can insert (for the newsletter/popup forms)
create policy "Enable insert for anonymous users" 
on public.email_subscribers for insert 
with check (true);

-- Only authenticated admins can view list
create policy "Enable select for authenticated users only" 
on public.email_subscribers for select 
to authenticated 
using (true);

-- Only authenticated admins can delete from list
create policy "Enable delete for authenticated users only" 
on public.email_subscribers for delete 
to authenticated 
using (true);
