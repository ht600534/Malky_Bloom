-- Add creator/seminar name to programs, and request type/details to contact_leads

alter table public.programs
  add column if not exists creator_name text,
  add column if not exists seminar_name text;

alter table public.contact_leads
  add column if not exists request_type text,
  add column if not exists details text;
