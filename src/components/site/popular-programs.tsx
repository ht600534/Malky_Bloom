"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { SafeImage } from "@/components/site/safe-image";
import { getProgramCategoryStyle } from "@/lib/data/programs";
import type { Program } from "@/lib/types";
import { isPdfUrl, normalizeImageUrl } from "@/lib/url";

type Props = {
  programs: Program[];
};

export default function PopularPrograms({ programs }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const popularPrograms = programs.slice(0, 10);
  const totalPrograms = popularPrograms.length;

  const nextPrograms = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(totalPrograms - 2, 0)));
  }, [totalPrograms]);

  const prevPrograms = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const visiblePrograms = popularPrograms.slice(currentIndex, currentIndex + 2);
  const hasNext = currentIndex + 2 < totalPrograms;
  const hasPrev = currentIndex > 0;

  return (
    <section className="w-full bg-[#0a0a0d] py-16 md:py-24 relative">

      {/* עיגול SVG Vector-8 מעל הכותרת */}
<div className="flex">
        <div className="flex-col items-end mb-12">
          <div className="flex" style={{ marginRight: '138px' }}>
            <img src="/figma/Vector-8.svg" alt="עיגול דקורטיבי" className="w-6 h-6 mb-2 mr-1" />
          </div>
          <div className="max-w-7xl relative">
            {/* כותרת במרכז */}
            <div className="flex flex-col mb-10 md:mb-14 mr-5">
              <h2
                className="text-4xl font-bold text-right mb-12 bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] bg-clip-text text-transparent leading-tight mb-4 text-right"
                style={{
                  letterSpacing: '-1px',
                  direction: 'rtl',
                  marginRight: '118px',
                  fontFamily: "'Placebo_FM', Arial, sans-serif"
                }}
              >
                התוכניות<br />הפופולאריות<br />שלנו
              </h2>
            </div>
          </div>
        </div>
        <div className="relative mx-auto mt-6 flex w-full max-w-[780px] items-stretch justify-center gap-6 overflow-hidden md:mt-20 md:gap-10">
          {/* כרטיסים */}
          {visiblePrograms.map((program) => {
            const categoryStyle = getProgramCategoryStyle(program.category);
            const coverAsset = [...program.images, ...program.graphics].find((item) => item.isCover) ?? [...program.images, ...program.graphics][0];
            return (
              <div
                key={program.id}
                className="h-[480px] w-full max-w-[361px] min-w-0 flex-1 rounded-[30px] bg-[#0E0E0E] p-5 shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="w-full h-[200px] overflow-hidden rounded-[12px] mb-5 bg-[#232326]">
                  {coverAsset?.url ? (
                    isPdfUrl(coverAsset.url) ? (
                      <iframe
                        src={`${normalizeImageUrl(coverAsset.url)}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={coverAsset.alt || program.title}
                        className="h-full w-full bg-white"
                      />
                    ) : (
                      <SafeImage
                        src={coverAsset.url}
                        alt={coverAsset.alt || program.title}
                        width={361}
                        height={200}
                        className="w-full h-full object-cover"
                        fallbackTitle={program.title}
                        fallbackCategory={program.category}
                      />
                    )
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white text-center">
                      <span
                        className="px-6 text-[28px] leading-tight"
                        style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: categoryStyle.placeholderTextColor }}
                      >
                        {program.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="mb-4 text-right text-2xl font-bold leading-tight md:text-3xl"
                  style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: categoryStyle.titleColor }}
                >
                  {program.title}
                </h3>

                {/* Description */}
                  <p className="min-h-[56px] flex-1 text-right text-base font-light leading-7 text-white" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                  {program.shortDescription}
                </p>

                {/* Button */}
                <div className="mt-6 w-full">
                  <Link
                    href={`/programs/${program.slug}`}
                    className={`block w-40 rounded-full py-3 text-center text-base font-bold transition-all duration-300 ${categoryStyle.buttonClassName}`}
                    style={{ fontFamily: "Tahoma, Geneva, sans-serif", color: categoryStyle.buttonClassName.includes("text-white") ? "white" : "black" }}
                  >
                    לדף התוכנית ←
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* חצי ניווט — פעילים */}
      <div
        className="hidden md:flex items-center justify-center absolute"
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`relative flex items-center justify-center cursor-pointer transition-opacity ${hasPrev ? 'opacity-100 hover:scale-110' : 'opacity-30'}`}
          style={{ marginRight: '340px', pointerEvents: hasPrev ? 'auto' : 'none' }}
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); prevPrograms(); }}
          aria-label="הקודמות"
        >
          <img src="/figma/Ellipse 111.svg" alt="עיגול ניווט" className="w-14 h-14" />
          <img src="/figma/Vector (3).svg" alt="חץ ימינה" className="w-5 h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>
        <span
          className={`relative flex items-center justify-center cursor-pointer transition-opacity ${hasNext ? 'opacity-100 hover:scale-110' : 'opacity-30'}`}
          style={{ marginRight: '10px', pointerEvents: hasNext ? 'auto' : 'none' }}
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); nextPrograms(); }}
          aria-label="הבאות"
        >
          <img src="/figma/Ellipse 111.svg" alt="עיגול ניווט" className="w-14 h-14" />
          <img src="/figma/Vector (4).svg" alt="חץ שמאלה" className="w-5 h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>
      </div>
      <img src="/figma/Vector-2.svg" alt="עיגול דקורטיבי" className="mx-auto mt-10 h-10 w-10 text-center" />

    </section>
  );
}
