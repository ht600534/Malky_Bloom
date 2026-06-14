"use client";

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
    <main className="bg-[#171717] min-h-screen" dir="rtl">
      {/* ========== סקשן עליון — כותרת + טופס ========== */}
      <section className="relative max-w-[1280px] mx-auto px-6 pt-20 pb-24">

        {/* אייקונים דקורטיביים */}
        <div className="flex items-start justify-between mb-8">
          <img src="/figma/OBJECTS (5).svg" alt="" className="w-[68px] h-[61px]" />
          <img src="/figma/Group 117.svg" alt="" className="w-[49px] h-[29px] mt-4" />
        </div>

        {/* כותרת */}
        <div className="text-right">
          <h1
            className="text-[100px] md:text-[120px] leading-[0.85] text-[#96FFA7]"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
          >
            צרי
            <br />
            קשר
          </h1>
        </div>

        {/* אייקונים + תת-כותרת */}
        <div className="flex items-start justify-between mb-4">
          <img src="/figma/Vector (14).svg" alt="" className="w-[86px] h-[62px]" />
        </div>

        <p
          className="text-white/70 text-xl text-right mr-8 mt-[-10px]"
          style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
        >
          נשמח לעזור! השאירי פרטים <br className="md:hidden" />
          ונחזור אלייך בהקדם
        </p>

        {/* ========== טופס ========== */}
        <form action={formAction} className="mt-16 space-y-4">

          {/* שורה 1 — אייקון טלפון + שם + טלפון */}
          <div className="flex flex-wrap items-center gap-3">
            {/* אייקון טלפון */}
            <div className="hidden md:flex items-center justify-center w-[50px] h-[51px] rounded-full bg-[#FF7458] shrink-0">
              <img src="/figma/phone-icon.svg" alt="טלפון" className="w-6 h-6" />
            </div>

            {/* שם */}
            <input
              name="name"
              type="text"
              required
              placeholder="השם שלך"
              className="h-[51px] px-5 rounded-full bg-white text-black text-right text-base focus:outline-none focus:ring-2 focus:ring-[#96FFA7] transition w-full md:w-[165px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />

            {/* טלפון */}
            <input
              name="phone"
              type="text"
              required
              placeholder="טלפון לשיחה"
              className="h-[51px] px-5 rounded-full bg-white text-black text-right text-base focus:outline-none focus:ring-2 focus:ring-[#96FFA7] transition w-full md:w-[230px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />

            {/* אימייל */}
            <input
              name="email"
              type="email"
              required
              placeholder="כתובת מייל"
              className="h-[51px] px-5 rounded-full bg-white text-black text-right text-base focus:outline-none focus:ring-2 focus:ring-[#96FFA7] transition w-full md:w-[230px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />

            {/* הודעה */}
            <input
              name="message"
              type="text"
              placeholder="תוכן הפנייה"
              className="h-[51px] px-5 rounded-full bg-white text-black text-right text-base focus:outline-none focus:ring-2 focus:ring-[#96FFA7] transition w-full md:w-[230px]"
              style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />
          </div>

          <TurnstileWidget />

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center h-[39px] px-8 rounded-full bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black font-bold text-base transition hover:scale-[1.03] hover:shadow-lg disabled:opacity-60"
            style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
          >
            {pending ? "שולחת..." : "שליחה"}
          </button>

          {state.message && (
            <div
              className={`text-sm px-5 py-3 rounded-2xl border ${
                state.ok
                  ? "bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]"
                  : "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]"
              }`}
            >
              {state.message}
            </div>
          )}
        </form>
      </section>

      {/* ========== Footer / חצי תחתון ========== */}
      <footer className="bg-black py-12 mt-20">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p
            className="text-white/50 text-sm"
            style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
          >
            © {new Date().getFullYear()} מרכזות אונליין. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </main>
  );
}
