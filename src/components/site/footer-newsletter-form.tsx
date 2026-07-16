"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions";
import { TurnstileWidget } from "@/components/site/turnstile";

const initialState = { ok: false, message: "" };

type FooterNewsletterFormProps = {
  className?: string;
  messageClassName?: string;
};

export default function FooterNewsletterForm({
  className,
  messageClassName,
}: FooterNewsletterFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_: typeof initialState, formData: FormData) => subscribeNewsletter(formData),
    initialState,
  );

  return (
    <>
      <form action={formAction} className={`flex items-right gap-3 ${className ?? ""}`.trim()}>
        <input
          name="email"
          type="email"
          dir="rtl"
          required
          className="flex-1 rounded-full border border-white/40 bg-black/60 px-5 py-3 text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#4be6b5]"
          placeholder="מייל"
          style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif", width:'200px',height:'40px',marginRight:'100px' }}
        />
        <TurnstileWidget />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#4be6b5] hover:bg-[#4be6b5] px-6 py-2 text-base font-bold text-black transition-colors whitespace-nowrap disabled:opacity-60"
          style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}
        >
          {pending ? "שולח..." : "שלח"}
        </button>
      </form>
      {state.message ? (
        <p className={`${messageClassName ?? "text-right text-sm direction-rtl"} ${state.ok ? "text-brand" : "text-brand-2"}`.trim()}>
          {state.message}
        </p>
      ) : null}
    </>
  );
}
