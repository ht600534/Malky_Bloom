import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import SiteFooter from "@/components/site/FooterNew";

export default function ProgramNotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#06070a] px-6 py-24 text-center">
        <div className="mx-auto w-full max-w-[460px] overflow-hidden border border-white/8 bg-[#0e0e12]">
          <div className="h-[3px] w-full bg-gradient-to-r from-[#4be6b5] via-[#7df0ca] to-transparent" />
          <div className="px-8 py-10 sm:px-10">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v5M12 16h.01" stroke="#4be6b5" strokeWidth="1.8" strokeLinecap="square" />
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" stroke="#4be6b5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-white/35" style={{ fontFamily: "Tahoma, sans-serif" }}>
              עמוד לא נמצא
            </p>
            <h1
              className="mb-4 text-[40px] leading-[0.95] text-white sm:text-[48px]"
              style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
            >
              התוכנית<br />
              <span className="text-[#4be6b5]">לא זמינה</span>
            </h1>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <p className="mb-8 text-[14px] leading-7 text-white/50" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              ייתכן שהכתובת השתנתה או שהתוכנית הוסרה.<br />
              נסי לחפש ברשימת התוכניות.
            </p>

            {/* <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/programs"
                className="flex items-center justify-center bg-[#4be6b5] px-6 py-3 text-[14px] font-bold text-black transition-opacity hover:opacity-90"
              >
                כל התוכניות
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center border border-white/12 bg-white/5 px-6 py-3 text-[14px] text-white/70 transition-colors hover:bg-white/10"
              >
                יצירת קשר
              </Link>
            </div> */}
          </div>
        </div>
      </main>
      {/* <SiteFooter /> */}
    </>
  );
}