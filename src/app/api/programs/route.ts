import { NextRequest, NextResponse } from "next/server";
import { getProgramsPage } from "@/lib/data/programs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") ?? undefined;
  const searchQuery = searchParams.get("q") ?? undefined;
  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "6");

  const safeOffset = Number.isFinite(offset) ? Math.max(0, offset) : 0;
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(1, limit), 24) : 6;

  const result = await getProgramsPage({
    category,
    searchQuery,
    offset: safeOffset,
    limit: safeLimit,
  });

  return NextResponse.json(result);
}