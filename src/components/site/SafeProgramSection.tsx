import Image from "next/image";

export default function SafeProgramSection() {
    return (
        <section className="w-full flex flex-col items-center justify-center bg-transparent relative z-10" style={{ marginBottom: '-60px' }}>
            <div className="w-full max-w-6xl mx-auto px-4 py-16  md:flex-row md:items-start md:justify-center gap-8" >
                <Image src="/figma/Vector (5).svg" alt="עיגול ירוק "  style={{ marginRight: '448px', marginBottom: '-30px'}} width={76} height={76} />
                {/* צד ימין: כותרת ומלל */}
                <div className="flex-1 flex flex-col md:items-end items-center text-right gap-4" >
                    <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full">

                        <div className="text-4xl md:text-7xl font-bold leading-tight whitespace-pre-line mr-40" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#96FFA7' }}>
                            תוכנית  <br /> על  בטוח
                        </div>

                        <div className="text-base  text-white font-normal max-w-md mt-10  mr-6" style={{ fontFamily: "Tahoma", fontSize: '20px' }}>
                            מייד בסיום ההזמנה את מקבלת קישור לתקיה <br /> מסודרת ומאורגנת עם כל הקבצים לפעילות.<br />
                            במידה ובקשת שינויים, נשלח לך הקבצים <br /> עם העדכונים הייחודיים לצרכים שלך.
                        </div>
                    </div>
                    {/* אייקונים */}
                    <div className="flex flex-row gap-20 mt-16 mb-80 ml-38" >
                        {["זמינות מלאה\nלכל שאלה", "התאמה אישית\nלתכנון שלך", "הצלחה והגעה\nמכל רגע"].map((txt, i) => (
                            <div key={i} className="flex  items-center gap-6 relative mt-10 ">
                                <div className="relative flex items-center justify-center mb-1 ">
                                    <Image src="/figma/Vector-16.svg" alt="עיגול ירוק" width={56} height={56} />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Image src="/figma/Vector-14.svg" alt="וי ירוק" width={28} height={28} />
                                    </span>
                                </div>
                                <div className="text-white text-right text-sm  whitespace-pre-line" style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontSize: '24px' }}>
                                    {txt}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
