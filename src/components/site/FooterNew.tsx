"use client";
import React, { useState } from 'react';

import Image from "next/image";

export default function SiteFooter() {
  return (
    <section className="w-full bg-black text-white relative overflow-visible py-28 min-h-[640px]">      {/* קישוט עליון */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
        <Image src="/figma/Elements.svg" alt="קישוט" width={64} height={32} />
      </div> */}
      <div className="absolute top-0 left-0 w-full h-[74px] bg-black">
        <div
          className="
      absolute
      left-1/2
      top-0
      h-[74px]
      w-[120px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-b-[999px]
      bg-[#F3F3F3]
    "
        />

        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[58%]">
          <Image
            src="/figma/Vector (10).svg"
            alt=""
            width={34}
            height={34}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[minmax(280px,340px)_minmax(220px,260px)_minmax(420px,1fr)] gap-y-14 gap-x-12 relative z-20 w-full">
        {/* פרטי קשר */}
        <div className="flex flex-col items-start text-left gap-6">
          <span className="text-[42px] leading-[1.05] bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] bg-clip-text text-transparent mb-20 mt-10" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
            מרכזות <span className="font-light" style={{ color: "white" }}>אונליין</span>
          </span>
          <div className="flex items-center gap-3 mt-6">
            {/* <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black border border-[#96FFA7]"> */}
            <Image src="/figma/Vector%20(7).svg" alt="טלפון" width={24} height={24} />
            {/* </span> */}
            <span className="text-[24px] font-normal" style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}>
              050-418-5505
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black border border-[#96FFA7]"> */}
            <Image src="/figma/Vector%20(8).svg" alt="מייל" width={24} height={24} />
            {/* </span> */}
            <span className="text-[24px] font-normal" style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}>
              malki2310@gmail.com
            </span>
          </div>
        </div>
        {/* תפריט */}
        <div className="flex  items-center text-right justify-center gap-20 mt-30 mr-30 font-light leading-[2.05]">

          <div className="flex flex-col gap-2 text-[24px] font-normal text-[#96FFA7]" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
            <span>אודות</span>
            <span className="whitespace-nowrap">מחנות קיץ וחורף</span>
            <span>תוכניות נושא</span>
          </div>
          <div className="flex flex-col gap-2 text-[24px]  text-[#96FFA7]" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
            <span>אודות</span>
            <span className="whitespace-nowrap">מחנות קיץ וחורף</span>
            <span>תוכניות נושא</span>
          </div>

        </div>
        {/* טופס ניוזלטר */}
        <div className="flex flex-col items-end text-right gap-6 mt-20 mr-0">
          <div className="flex flex-col items-end gap-3">

            <Image src="/figma/Vector%20(6).svg" alt="חץ כתום " width={110} height={82} style={{ marginLeft: '240px', marginBottom: '10px' }} />

            <span className="text-[42px]  leading-[1.05]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", fontWeight: 'none' }}>
              {/* md:text-[28px] font-light leading-[1.05] text-white max-w-[380px] */}
              רוצה להתעדכן<br />כשתוכנית חדשה <br /> עולה לאתר?
            </span>
          </div>
          <form className="flex items-right gap-3 w-full max-w-[320px] ml-6 mb-10">
            <input
              dir="rtl"
              className="flex-1 rounded-full border border-white/40 bg-black/60 px-5 py-3 text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#96FFA7]"
              placeholder="מייל"
              style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}
            />
            <button
              type="submit"
              className="rounded-full bg-[#96FFA7] hover:bg-[#4FDAB3] px-8 py-3 text-base font-bold text-black transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}
            >
              שלח
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
