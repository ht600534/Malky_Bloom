import { randomBytes } from "crypto";

/** Internal URL id for /programs/[slug] — generated automatically, not shown in admin. */
export function generateProgramSlug(title: string, preferred?: string) {
  const cleanedPreferred = preferred
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (cleanedPreferred && cleanedPreferred.length >= 2) {
    return cleanedPreferred;
  }

  const fromTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (fromTitle.length >= 2) {
    return fromTitle;
  }

  return `program-${randomBytes(4).toString("hex")}`;
}
