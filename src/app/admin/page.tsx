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
    <main dir="rtl">
      <div className="py-8 px-4 md:py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between rounded-lg bg-white shadow-sm border border-[#e5e7eb] p-5 md:p-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#111827]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
                מרכזות<span className="text-[#4FDAB3]">אונליין</span>
              </h1>
              <p className="text-sm text-[#6b7280] mt-1">פאנל ניהול התוכניות</p>
            </div>
            <div className="flex items-center gap-3">
              {/* ייצוא אקסל */}
              <a
                href="/api/admin/newsletter-export"
                // className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#6b7280] hover:text-[green] transition cursor-pointer"
              >
                 <button
                  type="submit"
                  className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f9fafb] hover:text-[GREEN] transition cursor-pointer"
                >
                ייצוא נרשמים ל Excel
                </button>
              </a>
              {/* התנתקות */}
              <form action={adminLogoutAction}>
                <button
                  type="submit"
                  className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#dc2626] transition cursor-pointer"
                >
                  התנתקות
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* תוכן */}
        <ProgramManager />
      </div>
    </main>
  );
}
