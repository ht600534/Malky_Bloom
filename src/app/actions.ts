"use server";

import { contactSchema, newsletterSchema } from "@/lib/validations/forms";
import { insertNewsletterSubscriber } from "@/lib/supabase/newsletter-repository";
import { insertContactLead } from "@/lib/supabase/contact-repository";
import { sendContactRequestNotification, sendNewsletterNotification } from "@/lib/email/resend";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { headers } from "next/headers";
import { hitRateLimit } from "@/lib/rate-limit";

type ActionResult = {
  ok: boolean;
  message: string;
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export async function subscribeNewsletter(formData: FormData): Promise<ActionResult> {
  const headerStore = await headers();
  const ipKey = headerStore.get("x-forwarded-for") ?? "anonymous";

  if (hitRateLimit(`newsletter:${ipKey}`, 4, 60_000)) {
    return { ok: false, message: "יותר מדי ניסיונות. נסי שוב בעוד דקה." };
  }

  const parsed = newsletterSchema.safeParse({
    email: getFormValue(formData, "email"),
    turnstileToken: getFormValue(formData, "cf-turnstile-response"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "קלט לא תקין." };
  }

  const turnstileValid = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!turnstileValid) {
    return { ok: false, message: "אי אפשר לאמת את הבקשה. נסי שוב." };
  }

  try {
    const { duplicate, error } = await insertNewsletterSubscriber(parsed.data.email);

    if (error) {
      if (duplicate) {
        return { ok: false, message: "האימייל כבר רשום." };
      }

      return { ok: false, message: "נכשל שמירת המנוי. נסי שוב מאוחר יותר." };
    }

    try {
      const emailSent = await sendNewsletterNotification(parsed.data.email);
      if (!emailSent) {
        return {
          ok: true,
          message:
            "נרשמת בהצלחה לרשימת התפוצה, אבל לא הצלחנו לשלוח את ההתראה למנהל. בדקי את קובץ ההגדרות." ,
        };
      }
    } catch (error) {
      console.error("Newsletter notification failed:", error);
      return {
        ok: true,
        message:
          "נרשמת בהצלחה לרשימת התפוצה, אבל לא הצלחנו לשלוח את ההתראה למנהל. בדקי את קובץ ההגדרות.",
      };
    }

    return { ok: true, message: "נרשמת בהצלחה. אשלח לך עדכון כשיעלו תוכניות חדשות." };
  } catch (error) {
    console.error("Newsletter flow failed:", error);
    return { ok: false, message: "נכשל חיבור למסד הנתונים. נסי שוב מאוחר יותר." };
  }
}

export async function createContactLead(formData: FormData): Promise<ActionResult> {
  const headerStore = await headers();
  const ipKey = headerStore.get("x-forwarded-for") ?? "anonymous";

  if (hitRateLimit(`contact:${ipKey}`, 4, 60_000)) {
    return { ok: false, message: "יותר מדי ניסיונות. נסי שוב בעוד דקה." };
  }

  const parsed = contactSchema.safeParse({
    name: getFormValue(formData, "name"),
    phone: getFormValue(formData, "phone"),
    email: getFormValue(formData, "email"),
    message: getFormValue(formData, "message"),
    programId: getFormValue(formData, "programId"),
    turnstileToken: getFormValue(formData, "cf-turnstile-response"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "קלט לא תקין." };
  }

  const turnstileValid = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!turnstileValid) {
    return { ok: false, message: "אי אפשר לאמת את הבקשה. נסי שוב." };
  }

  try {
    const { error } = await insertContactLead({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      message: parsed.data.message,
      programId: parsed.data.programId || null,
    });

    if (error) {
      return { ok: false, message: "לא ניתן לשלוח כרגע. נסי שוב." };
    }

    try {
      const emailSent = await sendContactRequestNotification({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
      });

      if (!emailSent) {
        return {
          ok: true,
          message:
            "הפנייה נקלטה, אך לא הצלחנו לשלוח התראה לבעל האתר. ודאי ש־RESEND_API_KEY מוגדר נכון ב‑.env.local והפעלת מחדש את השרת.",
        };
      }
    } catch (error) {
      console.error("Contact notification failed:", error);
      return {
        ok: true,
        message:
          "הפנייה נקלטה, אך לא הצלחנו לשלוח התראה לבעל האתר. ודאי ש־RESEND_API_KEY מוגדר נכון ב‑.env.local והפעלת מחדש את השרת.",
      };
    }

    return { ok: true, message: "הפנייה נשלחה בהצלחה. נחזור אלייך בהקדם." };
  } catch (error) {
    console.error("Contact lead flow failed:", error);
    return { ok: false, message: "חסר חיבור למסד הנתונים בסביבה הנוכחית." };
  }
}
