/** Supabase project URL only — no /rest/v1 suffix (the client adds that). */
export function normalizeSupabaseUrl(url: string | undefined): string | undefined {
  if (!url) {
    return undefined;
  }

  return url.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
}
