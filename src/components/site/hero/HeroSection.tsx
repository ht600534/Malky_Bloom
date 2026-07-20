
export default function HeroSection() {
  return (
    <section className="relative flex min-h-[420px] w-auto flex-grow flex-col items-center justify-center overflow-hidden bg-black px-4 pb-10 pt-16 sm:min-h-[480px] sm:px-6 sm:pb-14 sm:pt-20 md:min-h-[540px] md:pb-16 md:pt-24">
    

      {/* שכבת תוכן */}
      <div className="relative z-10 rounded-[40px] bg-transparent p-0 text-center shadow-none">
        <div
          className="text-white"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2rem, 6.5vw, 3.8rem)',
            lineHeight: 1.2,
            marginBottom: 0,
            letterSpacing: '-1.5px',
            textShadow: '0 2px 8px #0008',
          }}
        >
          <span style={{ background: 'none', display: 'block', fontFamily: "'Placebo_FM', Arial, sans-serif" }}>מאפס מאמץ ותקציב נמוך</span>
          <span style={{ background: 'none', display: 'block', marginTop: '0.2em', fontFamily: "'Placebo_FM', Arial, sans-serif" }}>עד לתוכנית <span style={{ color: '#ff7a6b', fontWeight: 900 }}>מוצלחת</span></span>
        </div>
        <div
          className="mt-7 text-[#4be6b5] sm:mt-8"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2rem, 6.5vw, 3.8rem)',
            fontFamily: "'Placebo_FM', Arial, sans-serif",
            lineHeight: 1.2,
          }}
        >
          זה אף פעם <br /> לא היה פשוט יותר!
        </div>
        {/* <div style={{
          color: '#bfc9d1',
          fontSize: 30,
          margin: '18px 0 0 0',
        }}>
          פתרון מלא לניהול תוכניות עם כלים חכמים ודקוק פשוט
        </div> */}
        <div className="h-3 sm:h-4" />
        {/* <div style={{display: 'flex', gap: 24, justifyContent: 'center', marginTop: 36}}>
          <button style={{
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            borderRadius: 40,
            padding: '16px 48px',
            fontSize: 22,
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(75,230,181,0.15)',
            transition: 'background 0.2s',
          }}>
            בואו נתחיל →
          </button>
          <button style={{
            background: 'transparent',
            color: '#fff',
            border: '2px solid #4be6b5',
            borderRadius: 40,
            padding: '16px 48px',
            fontSize: 22,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}>
            מידע נוסף
          </button> */}
        {/* </div> */}
      </div>

      <img
        src="/figma/Vector (13).svg"
        alt=""
        className="pointer-events-none mt-6 mb-4 w-3.5 select-none sm:mt-8 sm:mb-8"
      />
    </section>
  );
}
