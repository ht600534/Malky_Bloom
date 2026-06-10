// HeroSection.tsx
// קומפוננטת Hero Section – עיצוב ראשי מהפיגמה
// אין לוגיקה, רק מבנה ותצוגה

export default function HeroSection() {
  return (
    <section style={{
      width: 'auto',
      background: '#000',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1
    }}>
      {/* שכבת תוכן */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginTop: 0,
        marginBottom: 0,
        background: 'rgba(0,0,0,0)',
        borderRadius: 40,
        padding: '0',
        // width: 800,
        // maxWidth: '90vw',
        boxShadow: 'none',
        border: 'none',
        textAlign: 'center',
      }}>
        <div style={{
          fontWeight: 900,
          fontSize: 80,
          color: '#fff',
          lineHeight: 0.99,
          marginBottom: 0,
          letterSpacing: '-2px',
          textShadow: '0 2px 8px #0008',
        }}>

          <br /><span style={{ background: 'none', display: 'inline', fontFamily: "'Placebo_FM', Arial, sans-serif" }}>מאפס מאמץ ותקציב נמוך<br /></span>
          <span style={{ background: 'none', display: 'inline', fontFamily: "'Placebo_FM', Arial, sans-serif" }}>עד לתוכנית <span style={{ color: '#ff7a6b', fontWeight: 900 }}>מוצלחת</span></span>
        </div>
        <div style={{
          fontWeight: 800,
          fontSize: 80,
          color: '#4be6b5',
          margin: '24px 0 0 0',
          fontFamily: "'Placebo_FM', Arial, sans-serif",
          lineHeight: 0.99,
        }}>
          זה אף פעם <br /> לא היה פשוט יותר!
        </div>
        {/* <div style={{
          color: '#bfc9d1',
          fontSize: 30,
          margin: '18px 0 0 0',
        }}>
          פתרון מלא לניהול תוכניות עם כלים חכמים ודקוק פשוט
        </div> */}
        <br />
        <br />
        <br /><br />
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
        style={{
          marginTop: 20,
          // position: "absolute",
          marginBottom: '60px',
          left: "12%",
          width: 14,
          pointerEvents: "none",
          userSelect: "none",
          // transform: "translateY(-6px)",
        }}
      />
    </section>
  );
}
