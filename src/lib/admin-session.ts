import { cookies } from "next/headers";

const COOKIE_NAME = "merkazot_admin";

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  return Boolean(expected && token && token === expected);
}

export async function setAdminSession() {
  const store = await cookies();
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  if (!expected) {
    throw new Error("Missing ADMIN_PANEL_PASSWORD env variable.");
  }
  store.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
