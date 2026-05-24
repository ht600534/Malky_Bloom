-- Bucket for program images, graphics and PDF materials (public read).
-- Uploads go through the site API (service_role), not directly from the browser.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'program-assets',
  'program-assets',
  true,
  10485760,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
