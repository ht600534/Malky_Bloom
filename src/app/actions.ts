"use server";

import { contactSchema, newsletterSchema } from "@/lib/validations/forms";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { hitRateLimit } from "@/lib/rate-limit";

type ActionResult = {
  ok: boolean;
  message: string;
};

export async function subscribeNewsletter(formData: FormData): Promise<ActionResult> {
  const headerStore = await headers();
  const ipKey = headerStore.get("x-forwarded-for") ?? "anonymous";
  if (hitRateLimit(`newsletter:${ipKey}`, 4, 60_000)) {
    return { ok: false, message: "יותר מדי ניסיונות. נסי שוב בעוד דקה." };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "קלט לא תקין." };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: parsed.data.email,
      source: "site_form",
      is_active: true,
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, message: "האימייל כבר רשום." };
      }
      return { ok: false, message: `לא ניתן לשמור: ${error.message}` };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "חסר חיבור למסד נתונים";
    return { ok: false, message };
  }

  return { ok: true, message: "נרשמת בהצלחה לרשימת התפוצה." };
}

export async function createContactLead(formData: FormData): Promise<ActionResult> {
  const headerStore = await headers();
  const ipKey = headerStore.get("x-forwarded-for") ?? "anonymous";
  if (hitRateLimit(`contact:${ipKey}`, 4, 60_000)) {
    return { ok: false, message: "יותר מדי ניסיונות. נסי שוב בעוד דקה." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    programId: formData.get("programId"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "קלט לא תקין." };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("contact_leads").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      message: parsed.data.message,
      program_id: parsed.data.programId || null,
      status: "new",
    });

    if (error) {
      return { ok: false, message: "לא ניתן לשלוח כרגע. נסי שוב." };
    }
  } catch {
    return { ok: false, message: "חסר חיבור למסד נתונים בסביבה הנוכחית." };
  }

  return { ok: true, message: "הפנייה נקלטה, נחזור אליך בהקדם." };
}
