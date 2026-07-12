"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { clearAdminSession, setAdminSession } from "@/lib/admin-session";
import { hitRateLimit } from "@/lib/rate-limit";

export async function adminLoginAction(formData: FormData) {
  const headerStore = await headers();
  const ipKey = headerStore.get("x-forwarded-for") ?? "anonymous";

  if (hitRateLimit(`admin-login:${ipKey}`, 5, 15 * 60_000)) {
    redirect("/admin/login?error=rate");
  }

  const password = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PANEL_PASSWORD || password !== process.env.ADMIN_PANEL_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
