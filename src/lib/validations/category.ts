import { randomBytes } from "crypto";
import { z } from "zod";

function generateCategorySlug(name: string, preferred?: string) {
  const source = preferred?.trim() || name.trim();

  const normalized = source
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9֐-׿-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (normalized.length >= 1) {
    return normalized;
  }

  return `category-${randomBytes(4).toString("hex")}`;
}

export const categorySchema = z
  .object({
    name: z.string().trim().min(2, "נדרש שם קטגוריה"),
    slug: z.string().trim().optional(),
    sortOrder: z.number().int().min(0).default(0),
  })
  .transform((data) => ({
    ...data,
    slug: generateCategorySlug(data.name, data.slug),
  }));
