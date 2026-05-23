import type { NextRequest } from "next/server";

export function ensureAdminRequest(request: NextRequest) {
  const token = request.cookies.get("merkazot_admin")?.value;
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  return Boolean(token && expected && token === expected);
}
