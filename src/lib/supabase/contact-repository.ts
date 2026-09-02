import { getSupabaseServerClient } from "@/lib/supabase/server";

type InsertContactLeadPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  programId?: string | null;
  requestType?: string | null;
  details?: string | null;
};

export type InsertContactLeadResult = {
  error: unknown | null;
};

export async function insertContactLead(payload: InsertContactLeadPayload): Promise<InsertContactLeadResult> {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.from("contact_leads").insert({
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    message: payload.message || "בקשת ייעוץ והתאמה אישית",
    program_id: payload.programId || null,
    request_type: payload.requestType || null,
    details: payload.details || null,
    status: "new",
  });

  return { error: error ?? null };
}
