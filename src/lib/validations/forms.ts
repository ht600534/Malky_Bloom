import { z } from "zod";

const trimmedString = z.string().trim();

export const newsletterSchema = z.object({
  email: trimmedString
    .min(1, "אימייל נדרש")
    .email("אימייל לא תקין")
    .transform((value) => value.toLowerCase()),
  turnstileToken: trimmedString.optional(),
});

export const contactSchema = z.object({
  name: trimmedString
    .min(2, "שם קצר מדי")
    .max(100, "שם ארוך מדי"),
  phone: trimmedString
    .min(8, "טלפון קצר מדי")
    .max(25, "טלפון לא תקין")
    .transform((value) => value.replace(/[^\d+]/g, ""))
    .refine((value) => value.length >= 8 && value.length <= 25, "טלפון לא תקין"),
  email: trimmedString
    .min(1, "אימייל נדרש")
    .email("אימייל לא תקין")
    .transform((value) => value.toLowerCase()),
  message: trimmedString.optional().transform((value) => (value ? value : null)),
  programId: trimmedString.optional(),
  requestType: z.enum(["proposal", "details"]).optional(),
  details: trimmedString.optional().transform((value) => (value ? value : null)),
  turnstileToken: trimmedString.optional(),
});
