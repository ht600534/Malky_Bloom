import { NextRequest, NextResponse } from "next/server";
import { ensureAdminRequest } from "@/lib/admin-api";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * GET /api/admin/newsletter-export
 * מייצא CSV של כל מנויי הניוזלטר
 */
export async function GET(request: NextRequest) {
  if (!ensureAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("email, source, is_active, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: "אין מנויים עדיין." }, { status: 200 });
    }

    // Build CSV
    const header = "email,source,is_active,created_at";
    const rows = data.map((row) =>
      [row.email, row.source, row.is_active, row.created_at].join(",")
    );
    const csv = [header, ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: "שגיאה בייצוא." }, { status: 500 });
  }
}
