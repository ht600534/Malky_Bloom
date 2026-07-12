import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureAdminRequest } from "@/lib/admin-api";
import { isTrustedOrigin } from "@/lib/request-security";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const MAX_BYTES = 10 * 1024 * 1024;
const BUCKET = "program-assets";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

function safeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function POST(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "לא נבחר קובץ." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ message: "הקובץ גדול מדי (מקסימום 10MB)." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ message: "סוג קובץ לא נתמך. רק תמונות או PDF." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const bytes = Buffer.from(await file.arrayBuffer());
    const path = `programs/${randomUUID()}-${safeFileName(file.name)}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (error) {
    const message = error instanceof Error ? error.message : "העלאה נכשלה";
    return NextResponse.json({ message }, { status: 500 });
  }
}
