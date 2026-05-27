"use client";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    text: `"לאחר שנים של נסיון בתחום הריכוז החברתי ומאות תוכניות מוצלחות שכבשו את התלמידות בתיכונים ובסמינרים הגדולים, הצלחות שכבשו את התלת הגדולים, לורם פסום!!"`,
    name: "שרה כהן",
    logo: "/figma/Group%2061.svg",
    title: "סמינר בית יעקב"
  },
  {
    text: `"לאחר שנים של נסיון בתחום הריכוז החברתי ומאות תוכניות מוצלחות שכבשו את התלמידות בתיכונים ובסמינרים הגדולים, הצלחות שכבשו את התלת הגדולים, לורם פסום!!"`,
    name: "שרה כהן",
    logo: "/figma/Group%2061.svg",
    title: "סמינר בית יעקב"
  },
  {
    text: `"לאחר שנים של נסיון בתחום הריכוז החברתי ומאות תוכניות מוצלחות שכבשו את התלמידות בתיכונים ובסמינרים הגדולים, הצלחות שכבשו את התלת הגדולים, לורם פסום!!"`,
    name: "שרה כהן",
    logo: "/figma/Group%2061.svg",
    title: "סמינר בית יעקב"
  }
];

export default function TestimonialsCarousel() {
  return (
    <section className="w-full bg-white py-24" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 flex">
         
        <div className=" flex-col items-end mb-12" style={{direction: 'rtl'}}>
          <img src="/figma/Vector-9.svg" alt="סמל המלצות" className="w-6 h-6 mb-2 mr-1" style={{display:'inline-block'}} />
          <h2 className="text-4xl font-bold text-right mb-12" style={{fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#000'}}>
            המלצות <br /> מהשטח
          </h2>
        </div>
        
        {/* <h2 className="text-4xl font-bold text-right mb-12" style={{fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#000'}}>
          המלצות מהשטח
        </h2> */}
        <div className="overflow-x-hidden w-full relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            speed={2000}
            loop
            dir="rtl"
            slidesPerView={1}
            spaceBetween={32}
            style={{ paddingBottom: '2rem', direction: 'rtl' }}
          >
            {/* מעבר חלק יותר */}
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center justify-between bg-transparent min-w-[420px] max-w-[420px] mx-auto px-4">
                  <p
                    className="text-right text-black text-xl leading-relaxed mb-6 font-normal break-words"
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      direction: 'rtl',
                      maxWidth: '380px',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {t.text}
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <img src={t.logo} alt="לוגו" className="w-14 h-14 object-contain" />
                    <span className="font-bold text-black text-base mt-2">{t.name}</span>
                    <span className="text-gray-600 text-sm">{t.title}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* marquee animation CSS הוסר, הכל דרך react-fast-marquee */}
      </div>
    </section>
  );
}
