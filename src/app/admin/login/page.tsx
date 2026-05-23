import { adminLoginAction } from "@/app/admin/auth-actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className="container flex min-h-screen items-center justify-center py-12">
      <form action={adminLoginAction} className="w-full max-w-md space-y-4 rounded-2xl border border-stroke bg-surface p-6">
        <h1 className="text-2xl font-bold">כניסת מנהלת</h1>
        <p className="text-sm text-muted">הזיני סיסמת ניהול כדי לגשת למסך הניהול.</p>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
          placeholder="סיסמה"
        />
        <button type="submit" className="w-full rounded-full bg-brand px-4 py-2 font-semibold text-[#041410]">
          כניסה
        </button>
        {query.error ? <p className="text-sm text-brand-2">סיסמה שגויה, נסי שוב.</p> : null}
      </form>
    </main>
  );
}
