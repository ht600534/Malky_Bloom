-- Extra program fields (all optional except title + slug)

alter table public.programs
  alter column short_description drop not null,
  alter column full_description drop not null,
  alter column category drop not null;

alter table public.programs
  add column if not exists topic text,
  add column if not exists target_audience text,
  add column if not exists duration text,
  add column if not exists notes text;

alter table public.program_images
  add column if not exists asset_type text not null default 'photo'
    check (asset_type in ('photo', 'graphic'));

create table if not exists public.program_files (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  label text not null default '',
  file_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.program_files enable row level security;

drop policy if exists "Public can read program files" on public.program_files;
create policy "Public can read program files"
on public.program_files for select
to anon, authenticated
using (true);

drop policy if exists "Admins full access program files" on public.program_files;
create policy "Admins full access program files"
on public.program_files for all
to authenticated
using ((select auth.jwt() ->> 'role') = 'admin')
with check ((select auth.jwt() ->> 'role') = 'admin');

grant all on table public.program_files to service_role;
grant select on table public.program_files to anon, authenticated;
