"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// שאלות לדוגמה - להחליף בנתונים אמיתיים או API
const QUESTIONS = [
    {
        q: 'איך מתבצעת הרכישה ואיך אני מקבלת את התוכנית?',
        a: 'הרכישה והקשר מתבצעים בצורה אישית ופשוטה – במייל או בטלפון.\nלאחר שניצור קשר ונבין יחד מהי התוכנית המדויקת עבורך, החומרים יישלחו אלייך ישירות.\nהערכה מגיעה בצורה מסודרת ומוכנה לחלוטין, ובנוסף, כחלק מהשירות, את מקבלת מענה מלא הכולל עזרה והתאמה של התכנים לאופי ולצרכים המדויקים של המוסד שלך.'
    },
    { q: 'האם התוכניות מגיעות מוכנות לחלוטין או שנדרשת עבודת הכנה מצידי?', a: 'המטרה שלי היא להקל עלייך מקסימום! \n התוכניות מגיעות כערכה מקיפה הכוללת את כתיבת הרעיון, המהלך, ההנחיות לרכזת,\n  חומרים להדפסה ומדיה (במידה ויש).\n  יחד עם זאת, בכל תוכנית ישנו מרחב המאפשר לך להכניס את הטאץ האישי שלך ולהתאים את התוכן לאופי המדויק של המוסד שלך.' },
    { q: 'לאילו גילאים התוכניות באתר מתאימות?', a: 'התוכניות מיועדות ומותאמות במיוחד עבור בנות תיכון וסמינרים.\n התוכן בנוי בצורה שמתכתבת עם עולמן של הנערות, מעורר מחשבה ומותאם בדיוק למאפיינים ולדרישות החינוכיות של הגילאים הללו.  ' },
    { q: 'מה קורה אם אני צריכה עזרה, שינוי או התאמה מיוחדת בתוכנית שרכשתי?', a: 'אני כאן בשבילך!\n  אם נתקלת בשאלה תוך כדי תנועה, או שאת זקוקה לייעוץ קל לגבי התאמת הפעילות, את תמיד יכולה לפנות אליי דרך עמוד יצירת הקשר באתר או במייל ואשמח לסייע לך כדי שהתוכנית תצליח בצורה המקסימלית.' },
    { q: 'יש לי תוכנית מדהימה שהרמתי אצלי בסמינר ואני רוצה למכור או לשתף אותה באתר. איך זה עובד?', a: 'איזה יופי! המוטו של האתר הוא "כולן תורמות לכולן". \n את מוזמנת להשאיר פרטים בעמוד "יצירת קשר" או לשלוח לנו מייל עם פרטי התוכנית בקווים כלליים.\n אנחנו נחזור אלייך, נבחן יחד את התאמת התוכן, ונסביר לך את כל המודל של שיתוף או מכירת התוכנית שלך בפלטפורמה.  ' },
];

export default function FaqSection() {
    const [openItems, setOpenItems] = useState<number[]>([]);
    return (
        <section className="w-full bg-white py-16 sm:py-20 md:py-24" dir="rtl" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:flex-row lg:items-start">
                {/* כותרת */}
                <div className="mb-0 flex-col items-end lg:mb-12" style={{ direction: 'rtl' }}>
                    <img src="/figma/Vector-9.svg" alt="סמל המלצות" className="w-6 h-6 mb-2 ml-1" style={{ display: 'inline-block' }} />
                    <h2 className="mb-6 text-right text-3xl sm:text-4xl lg:mb-12" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#000' }}>
                        שאלות <br /> נפוצות
                    </h2>
                </div>
                {/* שאלות */}
                <div className="flex-1 flex flex-col gap-4 sm:gap-6 lg:mr-16 xl:mr-24">
                    {QUESTIONS.map((item, idx) => (
                        <div key={idx} className="relative">
                            <div
                                className="relative flex min-h-[52px] flex-row-reverse items-center rounded-[28px] bg-white px-4 py-3 transition-all duration-300 cursor-pointer hover:shadow-md sm:rounded-full sm:px-6 sm:py-2"
                                style={{ minHeight: 52 }}
                                onClick={() =>
                                    setOpenItems(prev =>
                                        prev.includes(idx)
                                            ? prev.filter(i => i !== idx)
                                            : [...prev, idx]
                                    )
                                }                            >
                                {/* כפתור חץ עגול בצד שמאל */}
                                <div className="flex-shrink-0 -ml-2 z-10">
                                    <Image src="/figma/Ellipse 106.svg" alt="עיגול כתום" width={48} height={48} className="sm:h-14 sm:w-14" />
                                    <span className="absolute left-1/20 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Image
                                            src="/figma/Elements (1).svg"
                                            alt="חץ שחור"
                                            width={28}
                                            height={28}
                                        />
                                    </span>
                                </div>
                                {/* שאלה */}
                                <div className="flex-1 select-none px-2 text-right text-base font-normal text-black sm:text-lg md:text-xl" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                                    {item.q}
                                </div>
                            </div>
                            {/* תשובה */}
                            {openItems.includes(idx) && (
                                <div className="w-full rounded-b-2xl px-5 py-5 text-right text-sm font-normal text-black sm:px-8 sm:text-base md:text-lg" style={{ fontFamily: "Tahoma, Geneva, sans-serif", marginTop: '-8px', whiteSpace: 'pre-line' }}>
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
