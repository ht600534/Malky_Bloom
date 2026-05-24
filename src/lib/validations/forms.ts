import { z } from "zod";

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
