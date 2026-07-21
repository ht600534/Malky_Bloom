import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ensureAdminRequest } from "@/lib/admin-api";
import { isTrustedOrigin } from "@/lib/request-security";
import {
  dbProgramToAdminForm,
  getProgramByIdAdmin,
  programPayloadToRow,
  syncProgramAssets,
} from "@/lib/supabase/program-repository";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { programSchema } from "@/lib/validations/program";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { data, error } = await getProgramByIdAdmin(id);
    if (error || !data) {
      return NextResponse.json({ message: error?.message ?? "לא נמצא" }, { status: 404 });
    }
    return NextResponse.json({ program: data, form: dbProgramToAdminForm(data) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase is not configured yet";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = programSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("programs").update(programPayloadToRow(parsed.data, false)).eq("id", id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    await syncProgramAssets(id, parsed.data);
    revalidatePath("/");
    revalidatePath("/programs");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase is not configured yet";
    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({ message: "התוכנית עודכנה." });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("programs").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { message: error.code === "22P02" ? "מזהה לא תקין — רענני את הרשימה." : "מחיקה נכשלה." },
        { status: 500 },
      );
    }
    revalidatePath("/");
    revalidatePath("/programs");
    revalidatePath("/programs/[slug]", "page");
  } catch {
    return NextResponse.json({ message: "Supabase is not configured yet" }, { status: 500 });
  }

  return NextResponse.json({ message: "התוכנית נמחקה." });
}
