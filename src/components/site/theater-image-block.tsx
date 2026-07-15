import Image from "next/image";
import Link from "next/link";

export function TheaterImageBlock() {
  return (
    <section dir="rtl" className="relative w-full flex items-center justify-center min-h-[420px] md:min-h-[520px] py-0 md:py-8 overflow-hidden bg-[#111116]">
      {/* גל עליון */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-24 z-10 pointer-events-none">
        {/* <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,80 Q720,0 1440,80 V0 H0 Z" fill="#0a0a0d" />
        </svg> */}
      </div>
      {/* תמונת רקע */}
      <div className="absolute inset-0 w-full h-full z-0" >
        <Image
          src="/figma/Rectangle 61.png"
          alt="אולם כיסאות - מרכזות אונליין"
          fill
          className="object-cover w-full h-full"
          priority
          sizes="100vw"
        />
        {/* Overlay כהה לגרדיאנט */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18181cdd] via-[#18181cbb] to-[#18181cfa]" />
      </div>
      {/* SVG עיצובי מעל התמונה */}
      {/* <img
        src="/figma/Group 61.svg"
        alt="עיטור עיגול גיזעי"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -40%)',
          width: '220px',
          height: '220px',
          opacity: 0.18,
          zIndex: 12,
          pointerEvents: 'none',
        }}
      /> */}
      {/* תוכן ממורכז מעל התמונה */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-2xl px-4 py-12 text-center">
        <span className="inline-block text-4xl md:text-6xl font-black leading-tight bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] bg-clip-text text-transparent mb-2 md:mb-4 mt-2 drop-shadow-lg" style={{letterSpacing: '-2px',fontFamily: "'Placebo_FM', Arial, sans-serif"}}>
          מרכזות אונליין
        </span>
        <div className="text-white text-base md:text-xl font-light leading-snug max-w-md mb-4 drop-shadow-lg" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
          פלטפורמה חדשנית ומיוחדת <br /> לרכזות תיכון שרוצות הצלחה,<br />עם מגוון ענק של תוכניות מקצועיות <br /> ויצירתיות מוכנות להפעלה
        </div>
        <br />
        <Link href="/programs" className="inline-block bg-[#ff7a6b] hover:bg-[#ff7a6b] text-white rounded-full px-8 py-2 text-lg font-bold transition-all shadow-lg mx-auto mb-8" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
          לתוכניות שלנו
        </Link>
      </div>
    </section>
  );
}
