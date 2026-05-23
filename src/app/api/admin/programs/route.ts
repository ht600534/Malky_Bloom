import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ensureAdminRequest } from "@/lib/admin-api";
import { programSchema } from "@/lib/validations/program";
import { samplePrograms } from "@/lib/data/programs";

export async function GET(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json({ programs: samplePrograms });
    }
    return NextResponse.json({ programs: data });
  } catch {
    return NextResponse.json({ programs: samplePrograms });
  }
}

export async function POST(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = programSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("programs").insert({
      title: parsed.data.title,
      slug: parsed.data.slug,
      short_description: parsed.data.shortDescription,
      full_description: parsed.data.fullDescription,
      category: parsed.data.category,
      status: parsed.data.status,
    });

    if (error) {
      return NextResponse.json({ message: "Failed to create program" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: "Supabase is not configured yet" }, { status: 500 });
  }

  return NextResponse.json({ message: "התוכנית נוצרה בהצלחה." });
}
