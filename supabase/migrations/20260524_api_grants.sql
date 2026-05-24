-- Run this in Supabase SQL Editor if inserts return "permission denied".
-- Needed when "automatic exposure of new tables" is disabled in project settings.

grant usage on schema public to anon, authenticated, service_role;

grant all on table public.programs to service_role;
grant all on table public.program_categories to service_role;
grant all on table public.program_category_links to service_role;
grant all on table public.program_images to service_role;
grant all on table public.newsletter_subscribers to service_role;
grant all on table public.contact_leads to service_role;

grant select on table public.programs to anon, authenticated;
grant select on table public.program_categories to anon, authenticated;
grant select on table public.program_category_links to anon, authenticated;
grant select on table public.program_images to anon, authenticated;

grant insert on table public.newsletter_subscribers to anon, authenticated;
grant insert on table public.contact_leads to anon, authenticated;
