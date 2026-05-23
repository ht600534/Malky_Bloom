import { z } from "zod";

export const programSchema = z.object({
  title: z.string().min(2, "נדרש שם תוכנית"),
  slug: z
    .string()
    .min(2, "נדרש slug")
    .regex(/^[a-z0-9-]+$/, "רק אותיות קטנות באנגלית, מספרים ומקף"),
  shortDescription: z.string().min(10, "נדרש תיאור קצר"),
  fullDescription: z.string().min(30, "נדרש פירוט מלא"),
  category: z.enum(["events", "camp", "year-circle", "workshops"]),
  status: z.enum(["draft", "published"]),
});

export const newsletterSchema = z.object({
  email: z.string().email("אימייל לא תקין"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "שם קצר מדי"),
  phone: z.string().min(8, "טלפון קצר מדי"),
  email: z.string().email("אימייל לא תקין"),
  message: z.string().min(10, "הודעה קצרה מדי"),
  programId: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "נדרש שם קטגוריה"),
  slug: z
    .string()
    .min(2, "נדרש slug")
    .regex(/^[a-z0-9-]+$/, "רק אותיות קטנות באנגלית, מספרים ומקף"),
  sortOrder: z.number().int().min(0),
});
