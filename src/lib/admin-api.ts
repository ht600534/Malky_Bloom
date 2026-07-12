import type { NextRequest } from "next/server";
import { isValidAdminSessionToken } from "@/lib/admin-session";

export function ensureAdminRequest(request: NextRequest) {
  const token = request.cookies.get("merkazot_admin")?.value;
  return isValidAdminSessionToken(token);
}
