import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "נדרש שם קטגוריה"),
  slug: z
    .string()
    .min(1, "נדרש slug")
    .regex(/^[a-z0-9֐-׿-]+$/i, "נא להזין אותיות (עברית/אנגלית), מספרים או מקף"),
  sortOrder: z.number().int().min(0).default(0),
});
