import { adminLoginAction } from "@/app/admin/auth-actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const query = await searchParams;
  const location = typeof window !== "undefined" ? window.location.href : "";
  return (
    <main className="flex min-h-screen items-center justify-center px-4" dir="rtl">
      <form
        action={adminLoginAction}
        className="w-full max-w-sm rounded-lg bg-white shadow-sm border border-[#e5e7eb] p-8 text-center"
      >
        <h1 className="text-2xl font-bold text-[#111827] mb-1">ברוכה הבאה ללוח הבקרה</h1>
        <p className="text-sm text-[#6b7280] mb-8">הזיני סיסמת ניהול כדי להמשיך.</p>

        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-md border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4FDAB3]/30 focus:border-[#4FDAB3] transition-all mb-5 text-center"
          placeholder="סיסמה"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-[#111827] hover:bg-[#1f2937] px-5 py-3  font-medium text-white transition"
          style={{ fontFamily: "Tahoma, Geneva, sans-serif",cursor:'pointer' }}
        >
          כניסה
        </button>
        <div 
          className="bg-[#111827] hover:bg-[#1f2937] "
        
        style={{ fontFamily: "Tahoma, Geneva, sans-serif", 
           padding: '10px', borderRadius: '8px',
           marginTop: '15px',cursor:'pointer' }}>
          <a
            href="/">
            המשך לאתר 
          </a>
        </div>
        {query.error ? (
          <p className="mt-5 text-sm text-[#dc2626] bg-[#fef2f2] rounded-md px-4 py-2 border border-[#fecaca]">
            סיסמה שגויה, נסי שוב.
          </p>
        ) : null}
      </form>
    </main>
  );
}
