import { SiteHeader } from "@/components/site/header";
import SiteFooter from "@/components/site/FooterNew";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main dir="rtl" className="bg-[#F3F3F3]">
        {/* HERO */}
        <section className="bg-black">
          <div className="mx-auto flex h-[420px] max-w-[1440px] flex-col items-center justify-center px-4">
            <div className="-mb-5 flex justify-right">
                <img
                  src="/figma/OBJECTS (3).svg"
                  alt=""
                  className="h-auto w-[60px]"
                />
              </div>
            <h1
              className="text-center text-[92px] font-semibold leading-none text-[#FF7458]"
              style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
            >
              אודות
            </h1>
          </div>
        </section>
        {/* Divider */}
        <div className="relative h-[74px] bg-[#F3F3F3]">
          <div
            className="
      absolute
      left-1/2
      top-0
      h-[74px]
      w-[120px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-b-[99px]
      bg-black
    "
          />

          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[58%]">
            <img
              src="/figma/Vector (9).svg"
              alt=""
              className="h-[34px] w-[34px]"
            />
          </div>
        </div>
        {/* CONTENT */}
        <section className="bg-[#F3F3F3] px-6 py-[10px] mt-10">
          <div className="mx-auto max-w-auto mr-50 ml-20">

            <h2
              className="mb-16 text-right text-[38px] font-semibold leading-[1.2] text-[#FF7458] "
              style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
            >
              <div className="mb-4 flex justify-right">
                <img
                  src="/figma/Vector (6).svg"
                  alt=""
                  className="h-auto w-[90px]"
                />
              </div>



              ברוכה הבאה לעולם התוכן היצירתי והחווייתי
              <br />
              שמאפשר לכל רכזת להכין תוכנית מדהימה
              <br />
              בקלות ובמהירות עם הצלחה מקסימלית!
            </h2>

            <div
              className="space-y-10 text-right text-[22px] leading-[1.5] text-[#1A1A1A]"
              style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}
            >

              <p style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                <strong>שמי מלכי בלום,</strong>
                <br />
                רכזת חברתית כבר למעלה מעשור במגוון תיכונים וסמינרים. <br />
                במהלך השנים יצרתי תוכניות מגוונות ואירועים החל משלב כתיבת
                הרעיון, פיתוח והפקה. <br />
                יצרתי תוכניות בנושאים שונים, בסגנונות שונים, אך המשותף לכולם
                הוא – <br /> פעילות שמבוססת על נושא אקטואלי שמדבר לבנות תיכון.
              </p>

              <p style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                אני מפצחת את הנושא, מפשטת אותו באופן שיהיה מעניין, מסקרן ומניע
                לפעולה לכל המשתתפות. <br />
                מאמינה שלכל בת, בכל מקום בארץ, יש את הזכות להשתתף בפעילויות
                ברמה עיונית, רוחנית ומקצועית. <br />
                ומאמינה שכל רכזת שמרגישה שהעבודה הזו אינסופית, צריכה אפשרות
                להקל על עצמה.
              </p>

              <p style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontWeight: 'bold' }}>
                הקמתי את הפלטפורמה הזו על מנת לתת לכל רכזת את האפשרות להפיק
                פעילות ברמה גבוהה בלחיצת כפתור. <br />
                כאן תמצאי מנעד רחב של תוכניות מוכנות, עם אפשרות להתאמה אישית
                לתיכון שלך.
              </p>

              <p style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                כחלק מהחזון להנגיש מגוון רחב ככל האפשר של תוכניות – <br /> רכזת
                המעוניינת להעלות תוכניות ולשתף בפעילויות אקטואליות מוצלחות, <br />
                מוזמנת לשתף אותנו באמצעות יצירת קשר ולהנגיש את התוכניות לקהל
                רכזות רחב.<br /> כולן תורמות לכולן.
              </p>

              <p className="text-[26px] font-semibold text-[#FF7458] mb-70" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                אני כאן לכל שאלה!
              </p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}