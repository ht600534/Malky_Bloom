import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";

export function ProgramCategories() {
  return (
    // flex-row items-end
    <section className="w-full bg-[#0a0a0d]  rtl relative overflow-visible">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:items-start lg:gap-10">
        {/* עיגול שמאלי - ירוק בתוך ריבוע */}
        <div className="flex flex-col items-center lg:pt-20">
          <div className="flex h-[260px] w-full max-w-[300px] flex-col items-center justify-center rounded-3xl bg-[#101012] shadow-lg sm:h-[300px]">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] sm:h-[80px] sm:w-[80px]">
              <img src="/figma/Vector-6.svg" alt="מעגל השנה" className="w-10 h-10" />
            </div>
            <div className="mt-8 bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] bg-clip-text text-center text-xl font-bold leading-tight text-transparent sm:text-2xl" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              סביב<br />מעגל השנה
            </div>
          </div>
        </div>
        {/* עיגול אמצעי - לבן בתוך ריבוע */}
        <div className="flex flex-col items-center lg:translate-y-24">
          <div className="flex h-[260px] w-full max-w-[300px] flex-col items-center justify-center rounded-3xl bg-[#101012] shadow-lg sm:h-[300px]">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-[#111116] bg-white sm:h-[80px] sm:w-[80px]">
              <img src="/figma/spark-orange.svg" alt="תוכניות נושא" className="w-8 h-8 filter invert-0 brightness-0" />
            </div>
            <div className="mt-8 text-center text-xl font-bold leading-tight text-white sm:text-2xl" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              תוכניות<br />נושא
            </div>
          </div>
        </div>
        {/* עיגול ימני - כתום בתוך ריבוע */}
        <div className="flex flex-col items-center lg:pt-20">
          <div className="flex h-[260px] w-full max-w-[300px] flex-col items-center justify-center rounded-3xl bg-[#101012] shadow-lg sm:h-[300px]">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#ff7a6b] sm:h-[80px] sm:w-[80px]">
              <img src="/figma/11.svg" alt="מחנות קיץ וחורף" className="w-10 h-10" />
            </div>
            <div className="mt-8 text-center text-xl font-bold leading-tight text-[#ff7a6b] sm:text-2xl" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              מחנות<br />קיץ וחורף
            </div>
          </div>
        </div>
      </div>
      {/* קו עם עיגול ירוק */}
      {/* <div className="w-full flex justify-center mt-2 mb-0 relative z-0">
        <div className="w-[340px] h-0.5 bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-[-14px] w-8 h-8 rounded-full border-4 border-[#111116] bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#111116" strokeWidth="2" />
              <circle cx="9" cy="9" r="3" fill="#111116" />
            </svg>
          </div>
        </div>
      </div> */}
      {/* ריווח שחור קצר מתחת לריבועים */}
    
      {/* מעבר לרקע לבן בהמשך - רווח בלבד */}
      <div className="h-14 w-full bg-transparent sm:h-20 lg:h-32" />
      {/* בלוק תוכנית ערכית ומיוחדת ממורכז לימין, צמוד לריבועים */}
      <div className="relative z-20 flex w-full flex-col items-stretch justify-center gap-6 bg-white px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:gap-1 lg:py-24" >
        {/* בלוק ימין */}
        <div className="relative flex flex-col items-end">
          {/* עיגול שחור עם כתר */}
          <div className="absolute -top-12 right-6 z-30 sm:right-12 sm:-top-14">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-black sm:size-24">
              <img src="/figma/Vector-10.svg" alt="כתר" className="w-11 h-12" />
            </div>
          </div>
          {/* ריבוע שחור עם טקסטים */}
          <div className="flex min-h-[200px] w-full max-w-[520px] flex-col gap-6 rounded-[30px] border-2 border-white bg-black px-6 py-8 shadow-xl sm:px-10 lg:h-[200px] lg:min-h-[200px] lg:flex-row lg:items-center lg:rounded-br-[30px] lg:rounded-tr-[30px] lg:rounded-bl-none lg:rounded-tl-none">
            <div className=" text-right text-3xl font-bold leading-10 text-green-300 sm:text-4xl lg:flex lg:items-center lg:justify-end lg:leading-[1]" style={{fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
              <span>תוכנית<br />ערכית<br />ומיוחדת</span>
            </div>
            <div className="flex-1 text-right text-lg font-light leading-8 text-white sm:text-xl lg:flex lg:items-center lg:justify-start lg:text-2xl lg:leading-8" style={{fontFamily: 'Tahoma, Geneva, sans-serif'}}>
              <span>התוכניות מותאמות<br />באופן מלא לצרכים<br />ולאופי של התיכון שלך</span>
            </div>
          </div>
        </div>
        {/* בלוק שמאל */}
        <div className="relative flex flex-col items-end">
          {/* עיגול שחור עם אייקון כפול */}
          <div className="absolute -top-12 right-6 z-30 sm:right-12 sm:-top-14">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-black sm:size-24">
              <img src="/figma/OBJECTS (2).svg" alt="אייקון עליון" className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-12" style={{zIndex:2}} />
              <img src="/figma/OBJECTS (1).svg" alt="אייקון תחתון" className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12" style={{zIndex:1}} />
            </div>
          </div>
          {/* ריבוע שחור עם טקסטים */}
          <div className="flex min-h-[200px] w-full max-w-[520px] flex-col gap-6 rounded-[30px] border-2 border-white bg-black px-6 py-8 shadow-xl sm:px-10 lg:h-[200px] lg:min-h-[200px] lg:flex-row lg:items-center lg:rounded-bl-[30px] lg:rounded-tl-[30px] lg:rounded-br-none lg:rounded-tr-none">
            <div className="text-right text-3xl font-bold leading-10 text-red-400 sm:text-4xl lg:flex lg:items-center lg:justify-end lg:leading-[1.05]" style={{fontFamily: "'Placebo_FM', Arial, sans-serif"}}>
              <span>תוכנית<br/>בהתאמה<br/>אישית</span>
            </div>
            <div className="flex-1 text-right text-lg font-light leading-8 text-white sm:text-xl lg:flex lg:items-center lg:justify-start lg:text-2xl lg:leading-8" style={{fontFamily: 'Tahoma, Geneva, sans-serif'}}>
              <span>תוכלי לשלב תוכן<br/>ייחודי משלך: תמונות, <br/>הסרטות והמנונים</span>
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
