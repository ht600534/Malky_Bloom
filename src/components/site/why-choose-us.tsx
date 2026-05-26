
export function WhyChooseUs() {
  return (
    <section className="w-full bg-[#0a0a0d] py-16 md:py-20 rtl">
      <div className="max-w-6xl mx-auto px-4">
        {/* כותרת */}
        <div className="text-center text-muted uppercase tracking-widest font-semibold text-base md:text-lg mb-6">
          אחרי שנים של ניסיון בתחום הריכוז החברתי
        </div>
        {/* כותרת ראשית */}
        <div className="text-center font-black text-2xl md:text-4xl lg:text-5xl mb-6 bg-gradient-to-r from-[#96ffa7] to-[#4fdab3] bg-clip-text text-transparent leading-snug">
          הגיע הזמן לאפשר לכל רכזת חברתית להביא את התוכניות המקצועיות ביותר גם עם תקציב נמוך או לו״ז קצר
        </div>
        {/* תיאור */}
        <div className="text-center text-muted max-w-xl mx-auto text-sm md:text-base leading-8 mb-10">
          בין אם זה ליום עיון תוכנית בת שעתיים או מחנה שלם, את לא צריכה לעבוד מסביב לשעון כדי להביא הצלחה והנאה לתלמידות
        </div>
        {/* שתי עמודות */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1 bg-gradient-to-br from-[rgba(44,229,176,0.10)] to-transparent border border-[rgba(44,229,176,0.20)] rounded-xl p-6 text-right">
            <div className="text-lg font-bold text-brand mb-2">תוכניות ערכיות ומיוחדות</div>
            <div className="text-muted leading-7">תוכניות מותאמות באופן מלא לערכים והאופי של התיכון שלך</div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[rgba(255,122,89,0.10)] to-transparent border border-[rgba(255,122,89,0.20)] rounded-xl p-6 text-right">
            <div className="text-lg font-bold text-brand-2 mb-2">תוכניות בהתאמה אישית</div>
            <div className="text-muted leading-7">חבילות תוכן ייחודיות לכל שכבה ולכל צוות</div>
          </div>
        </div>
      </div>
    </section>
  );
}
