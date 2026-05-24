import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "נדרש שם קטגוריה"),
  slug: z
    .string()
    .min(2, "נדרש slug")
    .regex(/^[a-z0-9-]+$/, "רק אותיות קטנות באנגלית, מספרים ומקף"),
  sortOrder: z.number().int().min(0),
});
