"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full bg-black relative overflow-hidden py-24 flex flex-col items-center justify-center min-h-[600px]">
      {/* כותרת ענקית */}
      <h1
        className="text-center text-[64px] md:text-[108px] font-bold leading-[0.9] mb-8"
        style={{
          fontFamily: "'Placebo_FM', Arial, sans-serif",
          background: "linear-gradient(90deg, #96FFA7 0%, #4FDAB3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-4px",
        }}
      >
        זה אף פעם<br />לא היה פשוט יותר!
      </h1>
      {/* טקסט תיאור */}
      <p className="text-white text-2xl font-light text-center max-w-xl mx-auto mb-8" style={{fontFamily: "'Noto Sans Hebrew New', Arial, sans-serif"}}>
        פלטפורמה חדשנית ומיוחדת לרכזות תיכון שרוצות הצלחה, עם מגוון ענק של תוכניות מקצועיות ויצירתיות מוכנות להפעלה
      </p>
      {/* כפתור */}
      <button className="mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black text-xl font-bold shadow-lg transition hover:scale-105">
        התחילי עכשיו
      </button>
      {/* SVG/אלמנטים גרפיים - דוגמה */}
      <img src="/figma/Vector-1.svg" alt="גרפיקה" className="absolute left-1/2 top-10 w-16 h-24 -translate-x-1/2 opacity-80" />
      {/* אפשר להוסיף עוד SVG/תמונות לפי הצורך */}
    </section>
  );
}
