import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";

export function ProgramCategories() {
  return (
    // flex-row items-end
    <section className="w-full bg-[#0a0a0d]  rtl relative overflow-visible">
      <div className="max-w-7xl mx-auto flex  justify-center  md:gap-40 relative z-10">
        {/* עיגול שמאלי - ירוק בתוך ריבוע */}
        <div className="flex flex-col items-center" style={{ marginTop: '150px' }}>
          <div className="w-[320px] h-[320px] rounded-3xl bg-[#101012] flex flex-col items-center justify-center shadow-lg">
            <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] flex items-center justify-center">
              <img src="/figma/Vector-6.svg" alt="מעגל השנה" className="w-10 h-10" />
            </div>
            <div className="mt-8 text-2xl font-bold bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] bg-clip-text text-transparent text-center leading-tight">סביב<br />מעגל השנה</div>
          </div>
        </div>
        {/* עיגול אמצעי - לבן בתוך ריבוע */}
        <div className="flex flex-col items-o" style={{ marginTop: '250px' }}>
          <div className="w-[320px] h-[320px] rounded-3xl bg-[#101012] flex flex-col items-center justify-center shadow-lg">
            <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center border-4 border-[#111116]">
              <img src="/figma/spark-orange.svg" alt="תוכניות נושא" className="w-8 h-8 filter invert-0 brightness-0" />
            </div>
            <div className="mt-8 text-2xl font-bold text-white text-center leading-tight">תוכניות<br />נושא</div>
          </div>
        </div>
        {/* עיגול ימני - כתום בתוך ריבוע */}
        <div className="flex flex-col items-center" style={{ marginTop: '150px' }}>
          <div className="w-[320px] h-[320px] rounded-3xl bg-[#101012] flex flex-col items-center justify-center shadow-lg">
            <div className="w-[80px] h-[80px] rounded-full bg-[#FF7458] flex items-center justify-center">
              <img src="/figma/11.svg" alt="מחנות קיץ וחורף" className="w-10 h-10" />
            </div>
            <div className="mt-8 text-2xl font-bold text-[#FF7458] text-center leading-tight">מחנות<br />קיץ וחורף</div>
          </div>
        </div>
      </div>
      {/* קו עם עיגול ירוק */}
      {/* <div className="w-full flex justify-center mt-2 mb-0 relative z-0">
        <div className="w-[340px] h-0.5 bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-[-14px] w-8 h-8 rounded-full border-4 border-[#111116] bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#111116" strokeWidth="2" />
              <circle cx="9" cy="9" r="3" fill="#111116" />
            </svg>
          </div>
        </div>
      </div> */}
      {/* מעבר לרקע לבן בהמשך - רווח בלבד */}
      <div className="w-full h-100 bg-transparent" />
      {/* בלוק תוכנית ערכית ומיוחדת ממורכז לימין, צמוד לריבועים */}
      <div className="w-full flex items-end justify-center gap-0.2 bg-white relative z-20 py-24 px-2" >
        {/* בלוק ימין */}
        <div className="relative flex flex-col items-end">
          {/* עיגול שחור עם כתר */}
          <div className="absolute -top-14 right-12 z-30">
            <div className="size-24 bg-black rounded-full flex items-center justify-center relative">
              <img src="/figma/Vector-10.svg" alt="כתר" className="w-11 h-12" />
            </div>
          </div>
          {/* ריבוע שחור עם טקסטים */}
          <div className="flex bg-black rounded-tr-[30px] rounded-br-[30px] border-2 border-white px-10 py-8 shadow-xl items-end gap-6" style={{ width: '520px', minHeight: '200px' }}>
            <div className="flex-1 text-right text-green-300 text-4xl font-bold leading-10 flex items-center justify-end" style={{fontFamily: "'Placebo_FM', Arial, sans-serif", marginRight: '-100px' }}>
              <span>תוכנית<br />ערכית<br />ומיוחדת</span>
            </div>
            <div className="flex-1 text-right text-white text-2xl font-light leading-9 flex items-center justify-start" style={{fontFamily: 'Arial, sans-serif'}}>
              <span>התוכניות מותאמות<br />באופן מלא לצרכים<br />ולאופי של התיכון שלך</span>
            </div>
          </div>
        </div>
        {/* בלוק שמאל */}
        <div className="relative flex flex-col items-end">
          {/* עיגול שחור עם אייקון כפול */}
          <div className="absolute -top-14 right-12 z-30">
            <div className="size-24 bg-black rounded-full flex items-center justify-center relative">
              <img src="/figma/OBJECTS (2).svg" alt="אייקון עליון" className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-12" style={{zIndex:2}} />
              <img src="/figma/OBJECTS (1).svg" alt="אייקון תחתון" className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12" style={{zIndex:1}} />
            </div>
          </div>
          {/* ריבוע שחור עם טקסטים */}
          <div className="flex bg-black rounded-tl-[30px] rounded-bl-[30px] border-2 border-white px-10 py-8 shadow-xl items-end gap-12" style={{ width: '520px', minHeight: '200px' }}>
            <div className="flex-1 text-right text-red-400 text-4xl font-bold leading-10 flex items-center justify-end" style={{fontFamily: "'Placebo_FM', Arial, sans-serif", marginRight: '-80px'}}>
              <span>תוכנית<br/>בהתאמה<br/>אישית</span>
            </div>
            <div className="flex-1 text-right text-white text-2xl font-light leading-9 flex items-center justify-start" style={{fontFamily: 'Arial, sans-serif'}}>
              <span>תוכלי לשלב תוכן<br/>ייחודי משלך: תמונות, <br/>הסרטות והימנונים</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full h-50 bg-white" />
      <div className="w-full flex justify-center bg-white pb-12">
      </div> */}
      <TestimonialsCarousel />
    </section>
  );
}
