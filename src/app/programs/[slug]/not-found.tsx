import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import SiteFooter from "@/components/site/FooterNew";

export default function ProgramNotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F7F7F7] px-6 py-24 text-center text-[#111116]">
        <div className="mx-auto max-w-2xl rounded-[32px] bg-white p-10 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-[#ff7a6b]">עמוד התוכנית לא זמין כרגע</p>
          <h1
            className="mb-6 text-[42px] leading-tight text-[#111116] md:text-[56px]"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
          >
            ייתכן שהתוכנית עודכנה ממש עכשיו
          </h1>
          <p className="mb-8 text-[18px] leading-8 text-[#555]" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
            נסי לרענן שוב בעוד כמה שניות. אם העמוד עדיין לא נטען, אפשר לחזור לרשימת התוכניות ולהיכנס מחדש.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/programs"
              className="rounded-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] px-8 py-3 font-bold text-black"
            >
              חזרה לתוכניות
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-[#ff7a6b] px-8 py-3 font-bold text-white"
            >
              יצירת קשר
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}