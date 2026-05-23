create extension if not exists "pgcrypto";

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  category text not null check (category in ('events', 'camp', 'year-circle', 'workshops')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.program_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0
);

create table if not exists public.program_category_links (
  program_id uuid not null references public.programs(id) on delete cascade,
  category_id uuid not null references public.program_categories(id) on delete cascade,
  primary key (program_id, category_id)
);

create table if not exists public.program_images (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order int not null default 0,
  is_cover boolean not null default false
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'site_form',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  message text not null,
  program_id uuid null references public.programs(id) on delete set null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.programs enable row level security;
alter table public.program_categories enable row level security;
alter table public.program_category_links enable row level security;
alter table public.program_images enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_leads enable row level security;

drop policy if exists "Public can read published programs" on public.programs;
create policy "Public can read published programs"
on public.programs for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read categories" on public.program_categories;
create policy "Public can read categories"
on public.program_categories for select
to anon, authenticated
using (true);

drop policy if exists "Public can read links" on public.program_category_links;
create policy "Public can read links"
on public.program_category_links for select
to anon, authenticated
using (true);

drop policy if exists "Public can read images" on public.program_images;
create policy "Public can read images"
on public.program_images for select
to anon, authenticated
using (true);

drop policy if exists "Public can insert newsletter" on public.newsletter_subscribers;
create policy "Public can insert newsletter"
on public.newsletter_subscribers for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can insert contact leads" on public.contact_leads;
create policy "Public can insert contact leads"
on public.contact_leads for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins full access programs" on public.programs;
create policy "Admins full access programs"
on public.programs for all
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin')
with check ((select auth.jwt() ->> 'role') = 'admin');

drop policy if exists "Admins full access categories" on public.program_categories;
create policy "Admins full access categories"
on public.program_categories for all
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin')
with check ((select auth.jwt() ->> 'role') = 'admin');

drop policy if exists "Admins full access links" on public.program_category_links;
create policy "Admins full access links"
on public.program_category_links for all
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin')
with check ((select auth.jwt() ->> 'role') = 'admin');

drop policy if exists "Admins full access images" on public.program_images;
create policy "Admins full access images"
on public.program_images for all
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin')
with check ((select auth.jwt() ->> 'role') = 'admin');

drop policy if exists "Admins read newsletter" on public.newsletter_subscribers;
create policy "Admins read newsletter"
on public.newsletter_subscribers for select
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin');

drop policy if exists "Admins read leads" on public.contact_leads;
create policy "Admins read leads"
on public.contact_leads for select
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin');
