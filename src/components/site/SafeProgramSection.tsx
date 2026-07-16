import Image from "next/image";

export default function SafeProgramSection() {
    return (
        <section className="relative z-10 -mb-10 flex w-full flex-col items-center justify-center bg-transparent px-4 sm:-mb-14 sm:px-6 md:-mb-[60px]">
            <div className="mx-auto w-full max-w-6xl gap-8 py-12 md:py-16" >
                <Image src="/figma/Vector (5).svg" alt="עיגול ירוק " className="mb-4 mr-auto ml-auto lg:mr-[448px] lg:ml-0" width={76} height={76} />
                {/* צד ימין: כותרת ומלל */}
                <div className="flex flex-1 flex-col items-center gap-6 text-right md:items-end" >
                    <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-8">

                        <div className="text-center text-4xl font-bold leading-tight whitespace-pre-line text-[#4be6b5] md:text-right md:text-6xl lg:mr-28 lg:text-7xl" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
                            תוכנית  <br /> על  בטוח
                        </div>

                        <div className="mt-0 max-w-md text-center text-base font-normal text-white md:mt-6 md:text-right lg:mr-6" style={{ fontFamily: "Tahoma", fontSize: '20px' }}>
                            מייד בסיום ההזמנה את מקבלת קישור לתקיה <br /> מסודרת ומאורגנת עם כל הקבצים לפעילות.<br />
                            במידה ובקשת שינויים, נשלח לך הקבצים <br /> עם העדכונים הייחודיים לצרכים שלך.
                        </div>
                    </div>
                    {/* אייקונים */}
                    <div className="mb-10 mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-48 lg:mt-16 lg:grid-cols-3 lg:gap-10" >
                        {["זמינות מלאה\nלכל שאלה", "התאמה אישית\nלתכנון שלך", "הצלחה והגעה\nמכל רגע"].map((txt, i) => (
                            <div key={i} className="relative mt-2 flex items-center justify-center gap-4 sm:justify-start lg:mt-10">
                                <div className="relative mb-1 flex items-center justify-center">
                                    <Image src="/figma/Vector-16.svg" alt="עיגול ירוק" width={56} height={56} />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Image src="/figma/Vector-14.svg" alt="וי ירוק" width={28} height={28} />
                                    </span>
                                </div>
                                <div className="whitespace-pre-line text-right text-base text-white sm:text-lg lg:text-[24px]" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
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
