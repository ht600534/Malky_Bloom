"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession } from "@/lib/admin-session";

export async function adminLoginAction(formData: FormData) {
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
