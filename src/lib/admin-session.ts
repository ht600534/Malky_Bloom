import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "merkazot_admin";

function getAdminPassword() {
  const secret = process.env.ADMIN_PANEL_PASSWORD?.trim();
  if (!secret) {
    throw new Error("Missing ADMIN_PANEL_PASSWORD env variable.");
  }

  return secret;
}

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret) {
    return secret;
  }

  return getAdminPassword();
}

function createAdminSessionToken(secret: string) {
  return createHmac("sha256", secret).update("merkazot-admin-session").digest("hex");
}

export function isValidAdminSessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const expected = createAdminSessionToken(getAdminSessionSecret());
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  if (tokenBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return isValidAdminSessionToken(token);
}

export async function setAdminSession() {
  const store = await cookies();
  const token = createAdminSessionToken(getAdminSessionSecret());
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
