import type { NextRequest } from "next/server";

function normalizeOrigin(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isTrustedOrigin(request: NextRequest) {
  const origin = normalizeOrigin(request.headers.get("origin"));
  const host = request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const siteUrl = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? null);
  const requestOrigin = host ? `${forwardedProto}://${host}` : null;

  if (!origin) {
    return true;
  }

  return origin === siteUrl || origin === requestOrigin;
}