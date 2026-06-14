import { getSupabaseServerClient } from "@/lib/supabase/server";

export type InsertNewsletterSubscriberResult = {
  duplicate: boolean;
  error: unknown | null;
};

export async function insertNewsletterSubscriber(email: string): Promise<InsertNewsletterSubscriberResult> {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({
      email,
      source: "site_form",
      is_active: true,
    });

  if (error) {
    return {
      duplicate: error.code === "23505",
      error,
    };
  }

  return { duplicate: false, error: null };
}
