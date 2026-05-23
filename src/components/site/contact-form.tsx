"use client";

import { useActionState } from "react";
import { createContactLead } from "@/app/actions";

const initialState = { ok: false, message: "" };

type Props = {
  programId?: string;
};

export function ContactForm({ programId }: Props) {
  const [state, formAction, pending] = useActionState(
    async (_: typeof initialState, formData: FormData) => createContactLead(formData),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3 rounded-2xl border border-stroke bg-surface p-5">
      <h3 className="text-xl font-semibold">רוצה פרטים נוספים?</h3>
      <input type="hidden" name="programId" value={programId ?? ""} />
      <input
        name="name"
        required
        placeholder="שם מלא"
        className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <input
        name="phone"
        required
        placeholder="טלפון"
        className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="אימייל"
        className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <textarea
        name="message"
        rows={4}
        required
        placeholder="תוכן הפנייה"
        className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand px-4 py-2 font-semibold text-[#041410] disabled:opacity-60"
      >
        {pending ? "שולח..." : "שליחת פנייה"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-brand" : "text-brand-2"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
