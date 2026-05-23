import { NextRequest, NextResponse } from "next/server";
import { ensureAdminRequest } from "@/lib/admin-api";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("program_categories").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: "Supabase is not configured yet" }, { status: 500 });
  }

  return NextResponse.json({ message: "הקטגוריה נמחקה." });
}
