"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions";

const initialState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    async (_: typeof initialState, formData: FormData) => subscribeNewsletter(formData),
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-2xl border border-stroke bg-surface p-4">
      <h3 className="text-lg font-semibold">הרשמה לרשימת תפוצה</h3>
      <p className="text-sm text-muted">עדכונים על תוכניות חדשות, אירועים ותכנים.</p>
      <input
        type="email"
        name="email"
        required
        placeholder="כתובת אימייל"
        className="rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand px-4 py-2 font-semibold text-[#041410] disabled:opacity-60"
      >
        {pending ? "שולח..." : "הרשמה"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-brand" : "text-brand-2"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}

// נמחק – קובץ לא רלוונטי
"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions";

const initialState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    async (_: typeof initialState, formData: FormData) => subscribeNewsletter(formData),
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-2xl border border-stroke bg-surface p-4">
      <h3 className="text-lg font-semibold">הרשמה לרשימת תפוצה</h3>
      <p className="text-sm text-muted">עדכונים על תוכניות חדשות, אירועים ותכנים.</p>
      <input
        type="email"
        name="email"
        required
        placeholder="כתובת אימייל"
        className="rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand px-4 py-2 font-semibold text-[#041410] disabled:opacity-60"
      >
        {pending ? "שולח..." : "הרשמה"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-brand" : "text-brand-2"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
