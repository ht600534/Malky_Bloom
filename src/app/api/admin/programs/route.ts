import { NextRequest, NextResponse } from "next/server";
import { ensureAdminRequest } from "@/lib/admin-api";
import { isTrustedOrigin } from "@/lib/request-security";
import {
  dbProgramToAdminForm,
  listProgramsAdmin,
  programPayloadToRow,
  syncProgramAssets,
} from "@/lib/supabase/program-repository";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { programSchema } from "@/lib/validations/program";

export async function GET(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await listProgramsAdmin();
    if (error) {
      return NextResponse.json({ programs: [], message: error.message }, { status: 500 });
    }
    const programs = (data ?? []).map((row) => ({
      ...row,
      form: dbProgramToAdminForm(row),
    }));
    return NextResponse.json({ programs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase is not configured yet";
    return NextResponse.json({ programs: [], message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = programSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("programs")
      .insert(programPayloadToRow(parsed.data))
      .select("id")
      .single();

    if (error || !data) {
      return NextResponse.json({ message: error?.message || "Failed to create program" }, { status: 500 });
    }

    await syncProgramAssets(data.id, parsed.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase is not configured yet";
    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({ message: "התוכנית נוצרה בהצלחה." });
}
