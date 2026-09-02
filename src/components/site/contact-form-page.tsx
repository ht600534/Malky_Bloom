"use client";

import Image from "next/image";
import { useActionState } from "react";
import { createContactLead } from "@/app/actions";
import { TurnstileWidget } from "@/components/site/turnstile";

const initialState = { ok: false, message: "" };

export function ContactFormPage() {
  const [state, formAction, pending] = useActionState(
    async (_: typeof initialState, formData: FormData) => createContactLead(formData),
    initialState,
  );

  return (
    <main className="bg-[#171717]" dir="rtl">
      <section className="relative overflow-hidden bg-[#171717] px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
<div className="relative mb-5 h-[145px] w-[210px] md:h-[165px] md:w-[240px]">
  {/* Scribble */}
  <Image
    src="/figma/Vector (15).svg"
    alt=""
    width={76}
    height={76}
    className="absolute left-[18px] top-[6px] h-[76px] w-[76px] object-contain"
    priority
  />

  {/* Orange top marks */}
  <Image
    src="/figma/Group 117.svg"
    alt=""
    width={48}
    height={22}
    className="absolute right-[26px] top-[4px] h-[22px] w-[48px] object-contain"
    priority
  />

  {/* Smile */}
  <Image
    src="/figma/OBJECTS (5).svg"
    alt=""
    width={82}
    height={82}
    className="absolute left-[28px] bottom-[4px] h-[82px] w-[82px] object-contain"
    priority
  />

  {/* Stars */}
  <Image
    src="/figma/OBJECTS (4).svg"
    alt=""
    width={68}
    height={62}
    className="absolute right-[18px] bottom-[10px] h-[62px] w-[68px] object-contain"
    priority
  />
</div>
          <h1
            className="mb-3 text-[38px] leading-[1.05] text-[#ff7a6b] md:mb-4 md:text-[56px]"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
          >
            נשמח להיות בקשר:)
          </h1>

          <p
            className="mb-8 text-[22px] leading-[1.55] text-white md:mb-10 md:text-[36px]"
            style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontWeight: 300 }}
          >
            השאירי פרטים ונחזור אלייך בהקדם!
          </p>

          <form action={formAction} className="flex w-full max-w-[900px] flex-col gap-3 md:flex-row md:items-center md:justify-center md:gap-[10px]" id="contact-page-form">
            <input
              name="name"
              type="text"
              required
              placeholder="השם שלך"
              className="h-[51px] w-full rounded-full border-none bg-white px-6 text-center text-[20px] text-black placeholder:text-black/70 focus:outline-none focus:ring-2 focus:ring-[#4be6b5] md:w-[230px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontWeight: 300 }}
            />
            <input
              name="phone"
              type="text"
              required
              placeholder="טלפון לשיחה"
              className="h-[51px] w-full rounded-full border-none bg-white px-6 text-center text-[20px] text-black placeholder:text-black/70 focus:outline-none focus:ring-2 focus:ring-[#4be6b5] md:w-[230px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontWeight: 300 }}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="כתובת מייל"
              className="h-[51px] w-full rounded-full border-none bg-white px-6 text-center text-[20px] text-black placeholder:text-black/70 focus:outline-none focus:ring-2 focus:ring-[#4be6b5] md:w-[230px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontWeight: 300 }}
            />
            <button
              type="submit"
              disabled={pending}
              className="h-[51px] w-full rounded-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] text-[22px] font-bold text-black transition hover:scale-[1.02] disabled:opacity-60 md:w-[165px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            >
              {pending ? "שולח..." : "שלח"}
            </button>
          </form>

          <div className="mt-4 flex w-full max-w-[900px] flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-6 text-white" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              <label className="flex items-center gap-2 text-[18px]">
                <input type="radio" name="requestType" value="proposal" form="contact-page-form" defaultChecked />
                הצעת תוכנית
              </label>
              <label className="flex items-center gap-2 text-[18px]">
                <input type="radio" name="requestType" value="details" form="contact-page-form" />
                קבלת פרטים על תוכנית
              </label>
            </div>
            <textarea
              name="details"
              form="contact-page-form"
              rows={3}
              placeholder="יש לך משהו לשאול? אפשר לפרט כאן"
              className="w-full max-w-[900px] rounded-2xl border-none bg-white px-6 py-3 text-[18px] text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#4be6b5]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontWeight: 300 }}
            />
          </div>

          <div className="mt-5 flex justify-center">
            <TurnstileWidget />
          </div>

          {state.message ? (
            state.ok ? (
              <div className="mt-6 w-full max-w-[430px] overflow-hidden border border-[#4be6b5]/25 bg-[#0a0a0d]">
                <div className="h-[3px] w-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5]/20" />
                <div className="px-6 py-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-[#4be6b5]/30 bg-[#4be6b5]/10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 8L6.5 12L13.5 4" stroke="#4be6b5" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                    </div>
                    <p className="text-[20px] text-white" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
                      ההודעה נשלחה!
                    </p>
                  </div>
                  <p className="border-r-2 border-[#4be6b5]/40 pr-3 text-sm leading-7 text-white/55" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                    {state.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 max-w-md rounded-2xl border border-[#fecaca] bg-[#fff1f1] px-4 py-3 text-center text-sm text-[#991b1b]">
                {state.message}
              </div>
            )
          ) : null}
        </div>
      </section>
    </main>
  );
}
