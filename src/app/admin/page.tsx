import { redirect } from "next/navigation";
import { ProgramManager } from "@/components/admin/program-manager";
import { adminLogoutAction } from "@/app/admin/auth-actions";
import { isAdminAuthenticated } from "@/lib/admin-session";

export default async function AdminPage() {
  const authorized = await isAdminAuthenticated();
  if (!authorized) {
    redirect("/admin/login");
  }

  return (
    <main className="container flex-1 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">ניהול תוכניות</h1>
        <form action={adminLogoutAction}>
          <button type="submit" className="chip">
            התנתקות
          </button>
        </form>
      </div>
      <ProgramManager />
    </main>
  );
}
