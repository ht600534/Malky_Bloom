"use client";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    text: `כמרכזת אני רוצה לשתף מהלב –
אני פוגשת לא מעט תוכניות אבל יש כאלו מושלמות באמת!!
אנחנו בתיכון זכינו לארח את התוכניות הנפלאות של מלכי,
הבנות היו מרותקות, הקשיבו, שיתפו, צחקו – ובעיקר יצאו עם ערך.
יש בתוכניות האלה איזון מדויק בין תוכן עמוק, שמעורר מחשבה, לבין קלילות והנאה שמדברות בדיוק בגובה העיניים.
כמרכזת, זה לא מובן מאליו לראות בנות יוצאות מהפעילות עם ברק בעיניים ושיחות שממשיכות גם אחרי...
אני ממליצה בחום – לכל מי שמחפשת תוכן איכותי, שמחבר, מרגש ומותאם באמת לבנות שלנו.
זה לא עוד תוכנית זה מתנה חינוכית אמיתית!
אפשר להתקשר אלי בשמחה!`,
    name: `פנינה כהן`,
    contact: "pnina6147@gmail.com",
    // title: "סמינר בית יעקב"
  },
  {
    text: `התוכנית שקבלתי ממנה היה הצלחה מסחררת
הבנות התחברו לשירים, למסר
ההקרנה הייתה מדהימה
וקבלנו פידבקים מעולים מהצוות ומההורים
ממליצה בחום
גם על השירות האישי והמיוחד`,
    name: "רבקה גרינברג",
    contact: "r0504195505@gmail.com",
    logo: "",
    title: ""
  },
  // {
  //   text: `"לאחר שנים של נסיון בתחום הריכוז החברתי ומאות תוכניות מוצלחות שכבשו את התלמידות בתיכונים ובסמינרים הגדולים, הצלחות שכבשו את התלת הגדולים, לורם פסום!!"`,
  //   name: "שרה כהן",
  //   contact: "sarah.cohen@gmail.com",
  //   logo: "/figma/Group%2061.svg",
  //   title: "סמינר בית יעקב"
  // }
];

export default function TestimonialsCarousel() {
 return (
  <section className="w-full bg-white py-24" dir="rtl">

   <style>{`
  .swiper-button-prev,
  .swiper-button-next {
    top: 28% !important;
    color: black !important;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    color: black !important;
    font-size: 28px !important;
    font-weight: bold;
  }

  .swiper-button-prev {
    right: 80px !important;
  }

  .swiper-button-next {
    left: 80px !important;
  }
`}</style>

    <div className="max-w-7xl mx-auto px-4 flex">

      <div className="flex-col items-end mb-12" style={{ direction: 'rtl' }}>
        <img
          src="/figma/Vector-9.svg"
          alt="סמל המלצות"
          className="w-6 h-6 mb-2 mr-1"
          style={{ display: 'inline-block' }}
        />
        <h2
          className="text-4xl font-bold text-right mb-12"
          style={{
            fontFamily: "'Placebo_FM', Arial, sans-serif",
            color: '#000'
          }}
        >
          המלצות <br /> מהשטח
        </h2>
      </div>

      <div className="overflow-x-hidden w-full relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 8500,
            disableOnInteraction: false
          }}
          speed={1000}
          loop
          dir="rtl"
          slidesPerView={1}
          spaceBetween={32}
          style={{
            paddingBottom: '2rem',
            direction: 'rtl',
            color: 'black',
            minHeight: '500px'
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
                <div className="flex flex-col items-right justify-between bg-transparent min-w-[620px] max-w-[620px] mx-auto px-4">

                <p
                  className="text-right text-black text-xl leading-relaxed mb-6 font-normal break-words"
                  style={{
                    fontFamily: 'Tahoma, Geneva, sans-serif',
                    direction: 'rtl',
                    maxWidth: '620px',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word'
                  }}
                >
                  {t.text}
                </p>

                <div
                  className="flex flex-col text-right gap-2"
                  style={{
                    fontFamily: 'Tahoma, Geneva, sans-serif',
                    color: 'black'
                  }}
                >
                  {t.logo && (
                    <img
                      src={t.logo}
                      alt="לוגו"
                      className="w-14 h-14"
                    />
                  )}

                  {t.name && (
                    <span className="font-bold text-black text-xl mt-2">
                      {t.name}
                    </span>
                  )}

                  {t.contact && (
                    <span className="text-gray-600 text-xl">
                      {t.contact}
                    </span>
                  )}

                  {t.title && (
                    <span className="text-gray-600 text-sm">
                      {t.title}
                    </span>
                  )}
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  </section>
); }