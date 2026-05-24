import { NextRequest, NextResponse } from "next/server";
import { ensureAdminRequest } from "@/lib/admin-api";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { categorySchema } from "@/lib/validations/category";

export async function GET(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("program_categories").select("*").order("sort_order", { ascending: true });
    if (error) {
      return NextResponse.json({ categories: [] });
    }
    return NextResponse.json({ categories: data });
  } catch {
    return NextResponse.json({ categories: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("program_categories").insert({
      name: parsed.data.name,
      slug: parsed.data.slug,
      sort_order: parsed.data.sortOrder,
    });
    if (error) {
      return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: "Supabase is not configured yet" }, { status: 500 });
  }

  return NextResponse.json({ message: "הקטגוריה נוספה." });
}
