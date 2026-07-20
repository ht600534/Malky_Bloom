"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { isPdfUrl, normalizeImageUrl } from "@/lib/url";
import { createContactLead } from "@/app/actions";
import { TurnstileWidget } from "@/components/site/turnstile";
import { categoryLabels, getProgramCategoryStyle } from "@/lib/data/programs";
import type { Program } from "@/lib/types";
import React, { useState } from 'react';

const initialState = { ok: false, message: "" };
const QUESTIONS = [
    {
        q: 'איך מתבצעת הרכישה ואיך אני מקבלת את התוכנית?',
        a: 'הרכישה והקשר מתבצעים בצורה אישית ופשוטה – במייל או בטלפון.\nלאחר שניצור קשר ונבין יחד מהי התוכנית המדויקת עבורך, החומרים יישלחו אלייך ישירות.\nהערכה מגיעה בצורה מסודרת ומוכנה לחלוטין, ובנוסף, כחלק מהשירות, את מקבלת מענה מלא הכולל עזרה והתאמה של התכנים לאופי ולצרכים המדויקים של המוסד שלך.'
    },
    { q: 'מה קורה אם אני צריכה עזרה, שינוי או התאמה מיוחדת בתוכנית שרכשתי?', a: 'אני כאן בשבילך!\n  אם נתקלת בשאלה תוך כדי תנועה, או שאת זקוקה לייעוץ קל לגבי התאמת הפעילות, את תמיד יכולה לפנות אליי דרך עמוד יצירת הקשר באתר או במייל ואשמח לסייע לך כדי שהתוכנית תצליח בצורה המקסימלית.' },
    { q: 'האם התוכניות מגיעות מוכנות לחלוטין או שנדרשת עבודת הכנה מצידי?', a: 'המטרה שלנו היא להקל עלייך מקסימום! \n התוכניות מגיעות כערכה מקיפה הכוללת את כתיבת הרעיון, המהלך, ההנחיות לרכזת,\n  חומרים להדפסה ומדיה (במידה ויש).\n  יחד עם זאת, בכל תוכנית ישנו מרחב המאפשר לך להכניס את הטאץ האישי שלך ולהתאים את התוכן לאופי המדויק של המוסד שלך.' },

];
type Props = {
    program: Program;
    relatedPrograms: Program[];
};

export default function ProgramDetailsSection({ program, relatedPrograms }: Props) {
    const categoryStyle = getProgramCategoryStyle(program.category);
    const visualAssets = [...program.images, ...program.graphics];
    const cover = visualAssets.find((item) => item.isCover) ?? visualAssets[0] ?? null;
    const [openItems, setOpenItems] = useState<number[]>([]);

    // Lightbox state
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
    const allGalleryItems = visualAssets;

    const galleryItems = cover
        ? visualAssets.filter((item, index) => !(index === 0 && item.url === cover.url && item.alt === cover.alt))
        : visualAssets;

    const materialsText = program.materials.length
        ? program.materials.map((material) => material.label).join(" • ")
        : "אין חומרים נלווים";

    function renderPdfFrame(url: string, title: string, className: string) {
        return (
            <iframe
                src={`${normalizeImageUrl(url)}#toolbar=0&navpanes=0&scrollbar=0`}
                title={title}
                className={className}
            />
        );
    }

    useEffect(() => {
        if (lightboxIdx === null) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setLightboxIdx(null);
                return;
            }

            if (allGalleryItems.length <= 1) {
                return;
            }

            if (event.key === "ArrowLeft") {
                setLightboxIdx((currentIdx) => {
                    if (currentIdx === null) {
                        return currentIdx;
                    }

                    return (currentIdx - 1 + allGalleryItems.length) % allGalleryItems.length;
                });
            }

            if (event.key === "ArrowRight") {
                setLightboxIdx((currentIdx) => {
                    if (currentIdx === null) {
                        return currentIdx;
                    }

                    return (currentIdx + 1) % allGalleryItems.length;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [allGalleryItems.length, lightboxIdx]);

    return (
        <main className="bg-[#F7F7F7] text-[#111116]"  >
            <section className="relative mb-12 bg-black sm:mb-16 md:mb-20">
                <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 sm:pt-12 md:pt-20">
                    <div className="mx-auto mb-6 flex max-w-[980px] justify-end sm:mb-8">
                        <Link
                            href="/programs"
                            className="inline-flex items-center rounded-full  px-5 text-sm text-white transition-colors "
                            style={{ fontFamily: "Tahoma, Geneva, sans-serif",color:'white' }}
                        >
                        <p>{ ` חזרה לעמוד התוכניות -> `}  </p> 
                        </Link>
                    </div>
                    <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px]">
                        {cover ? (
                            isPdfUrl(cover.url) ? (
                                renderPdfFrame(cover.url, cover.alt || program.title, "h-[280px] w-full bg-white sm:h-[420px] md:h-[520px]")
                            ) : (
                                <Image
                                    src={normalizeImageUrl(cover.url)}
                                    alt={cover.alt || program.title}
                                    width={980}
                                    height={520}
                                    className="h-auto w-full"
                                />
                            )
                        ) : (
                            <div className="flex h-[280px] items-center justify-center bg-white text-center sm:h-[420px] md:h-[520px]">
                                <span
                                    className="px-6 text-[30px] leading-tight sm:px-8 sm:text-[42px] md:text-[64px]"
                                    style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: categoryStyle.placeholderTextColor }}
                                >
                                    {program.title}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* רקע אפור שמתחיל מוקדם יותר */}
                <div className="mt-[-60px] h-[60px] bg-[#F7F7F7] sm:mt-[-90px] sm:h-[90px] md:mt-[-120px] md:h-[120px]" />
            </section>

            {/* TITLE + DESCRIPTION */}
            <section className="mx-auto max-w-[1280px] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6 md:pt-10" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="mx-auto max-w-[900px] text-right">

                    {program.category && (
                        <span className={`inline-flex rounded-full px-5 py-2 text-sm shadow-sm ${categoryStyle.badgeClassName}`}>
                            {categoryLabels[program.category as keyof typeof categoryLabels] || program.category}
                        </span>
                    )}
                </div>
                <div className="mx-auto flex max-w-[900px] flex-col gap-6 text-right lg:flex-row lg:items-start lg:gap-10">

                    <h1
                        className="mt-6 text-[42px] leading-[0.9] text-black sm:text-[56px] md:text-[72px]"
                        style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                    >
                        {program.title.split(/\s+/).map((word, index) => (
                            <span key={index} className="block">
                                {word}
                            </span>
                        ))}
                    </h1>

                    <p
                        className="mt-0 text-[16px] leading-8 whitespace-pre-line text-[#555] sm:text-[18px] sm:leading-9 lg:mt-8 lg:mr-6"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    >
                        {program.fullDescription || program.shortDescription}
                    </p>
                </div>

                {/* DETAILS */}
                <div className="mx-auto mt-12 grid max-w-[900px] gap-x-10 gap-y-8 text-right sm:mt-16 md:grid-cols-2 md:gap-y-10 lg:mt-20 lg:mb-32">

                    <div className="flex items-start gap-4">
                        <Image
                            src="/figma/flag-alt 1.svg"
                            alt=""
                            width={34}
                            height={34}
                        //   className="shrink-0 mt-1"
                        />

                        <div className="flex flex-wrap gap-1">
                            <p className="text-[18px] font-medium text-black sm:text-[22px]">
                                נושא:
                            </p>

                            <p className="text-[18px] text-black sm:text-[22px]">
                                {program.topic || "-"}
                            </p>
                        </div>
                    </div>




                    <div className="flex items-start gap-4">
                        <Image
                            src="/figma/Group 76.svg"
                            alt=""
                            width={34}
                            height={34}
                        //   className="shrink-0 mt-1"
                        />

                        <div className="flex flex-wrap gap-1">
                            <p className="text-[18px] font-medium text-black sm:text-[22px]">
                                אורך:
                            </p>

                            <p className="text-[18px] text-black sm:text-[22px]">
                                {program.duration || "-"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Image
                            src="/figma/Group 77.svg"
                            alt=""
                            width={34}
                            height={34}
                        //   className="shrink-0 mt-1"
                        />

                        <div className="flex flex-wrap gap-1">
                            <p className="text-[18px] font-medium text-black sm:text-[22px]">
                                חומרים נלווים:
                            </p>

                            <p className="text-[18px] text-black sm:text-[22px]">
                                {materialsText}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Image
                            src="/figma/puzzle-piece 1.svg"
                            alt=""
                            width={34}
                            height={34}
                        //   className="shrink-0 mt-1"
                        />


                        <div className="flex flex-wrap gap-1">
                            <p className="text-[18px] font-medium text-black sm:text-[22px]">
                                קהל יעד:
                            </p>

                            <p className="text-[18px] text-black sm:text-[22px]">
                                {program.targetAudience || "-"}
                            </p>
                        </div>
                    </div>


                </div>
            </section>

            {/* GALLERY */}
            {galleryItems.length > 0 && (
                <section className="mx-auto max-w-[1280px] overflow-x-clip px-4 pb-16 sm:px-6 sm:pb-20">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {galleryItems.map((item) => (
                            <div
                                key={`${item.url}-${item.alt}`}
                                className="group relative h-[220px] cursor-pointer overflow-hidden sm:h-[240px]"
                                onClick={() => setLightboxIdx(allGalleryItems.findIndex((asset) => asset.url === item.url && asset.alt === item.alt))}
                            >
                                {isPdfUrl(item.url) ? (
                                    renderPdfFrame(item.url, item.alt || program.title, "h-full w-full bg-white")
                                ) : (
                                    <Image
                                        src={normalizeImageUrl(item.url)}
                                        alt={item.alt || program.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="33vw"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* LIGHTBOX */}
            {lightboxIdx !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
                    onClick={() => setLightboxIdx(null)}
                >
                    <button
                        className="absolute left-4 top-4 z-10 cursor-pointer text-2xl text-white transition-colors hover:text-[#4be6b5]"
                        onClick={() => setLightboxIdx(null)}
                    >
                        ✕
                    </button>

                    {allGalleryItems.length > 1 && (
                        <>
                            <button
                                className="absolute right-2 top-1/2 z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-black/35 -translate-y-1/2 text-5xl text-white transition-colors hover:text-[#4be6b5] sm:right-4 sm:h-20 sm:w-20 sm:text-6xl"
                                onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + allGalleryItems.length) % allGalleryItems.length); }}
                                aria-label="לתמונה הקודמת"
                            >
                                ‹
                            </button>
                            <button
                                className="absolute left-2 top-1/2 z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-black/35 -translate-y-1/2 text-5xl text-white transition-colors hover:text-[#4be6b5] sm:left-4 sm:h-20 sm:w-20 sm:text-6xl"
                                onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % allGalleryItems.length); }}
                                aria-label="לתמונה הבאה"
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
                        {isPdfUrl(allGalleryItems[lightboxIdx].url) ? (
                            renderPdfFrame(allGalleryItems[lightboxIdx].url, allGalleryItems[lightboxIdx].alt || program.title, "h-[85vh] w-[90vw] rounded-xl bg-white")
                        ) : (
                            <Image
                                src={normalizeImageUrl(allGalleryItems[lightboxIdx].url)}
                                alt={allGalleryItems[lightboxIdx].alt || program.title}
                                width={1200}
                                height={800}
                                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
                            />
                        )}
                    </div>

                    <div className="absolute bottom-6 text-white/60 text-sm">
                        {lightboxIdx + 1} / {allGalleryItems.length}
                    </div>
                </div>
            )}

            {/* QUESTIONS */}
            <section className="w-full bg-white py-16 sm:py-20 md:py-24" dir="rtl" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:flex-row lg:items-start">
                    {/* כותרת */}
                    <div className="mb-0 flex-col items-end lg:mb-12" style={{ direction: 'rtl' }}>
                        <img src="/figma/Vector-9.svg" alt="סמל המלצות" className="w-6 h-6 mb-2 ml-1" style={{ display: 'inline-block' }} />
                        <h2 className="mb-6 text-right text-3xl sm:text-4xl lg:mb-12" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#000' }}>
                            שאלות <br /> יש?
                        </h2>
                    </div>
                    {/* שאלות */}
                    <div className="flex-1 flex flex-col gap-4 sm:gap-6 lg:mr-16 xl:mr-24">
                        {QUESTIONS.map((item, idx) => (
                            <div key={idx} className="relative">
                                <div
                                    className="relative flex flex-row-reverse items-center bg-white rounded-full px-6 py-2 transition-all duration-300 cursor-pointer hover:shadow-md"
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
                                        <Image src="/figma/Ellipse 106.svg" alt="עיגול כתום" width={56} height={56} />
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
                                    <div className="flex-1 text-right text-lg md:text-xl font-normal text-black px-2 select-none" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                                        {item.q}
                                    </div>
                                </div>
                                {/* תשובה */}
                                {openItems.includes(idx) && (
                                    <div className="w-full  rounded-b-2xl  px-8 py-6 text-right text-base md:text-lg text-black font-normal " style={{ fontFamily: "Tahoma, Geneva, sans-serif", marginTop: '-8px', whiteSpace: 'pre-line' }}>
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — Interested form */}
            <section className="bg-black py-16 sm:py-20 md:py-24">
                <div className="mx-auto max-w-[1100px] px-4 text-center sm:px-6">
                    <h2
                        className="text-[40px] leading-none text-[#ff7a6b] sm:text-[52px] md:text-[64px]"
                        style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                    >
                        מעוניינת?
                    </h2>

                    <InterestedForm programId={program.id} />
                </div>
            </section>
            <section className="bg-white py-16 sm:py-20 md:py-24" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

                    <div className="mb-10 text-center sm:mb-14">
                        {/* <p className="text-[14px] tracking-[0.3em] text-[#4be6b5] mb-4">
        תוכניות נוספות
      </p> */}

                        <h2
                            className="text-[34px] leading-none text-black sm:text-[44px] md:text-[56px]"
                            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                        >
                            עוד תוכניות שתוכלי לאהוב
                        </h2>
                    </div>

                    <div className="grid gap-6 text-center sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {relatedPrograms.map((item) => {
                            const relatedCategoryStyle = getProgramCategoryStyle(item.category);
                            const relatedCover = [...item.images, ...item.graphics].find((asset) => asset.isCover) ?? [...item.images, ...item.graphics][0];

                            return (
                            <article
                                key={item.id}
                                className="overflow-hidden rounded-[32px] bg-white shadow-sm"
                            >
                                <div className="relative mx-4 mt-4 h-[240px] overflow-hidden rounded-[28px] border border-[#f0f0f0] sm:mx-5 sm:mt-5 sm:h-[280px] sm:rounded-[32px]">
                                    {relatedCover?.url ? (
                                        isPdfUrl(relatedCover.url) ? (
                                            <iframe
                                                src={`${normalizeImageUrl(relatedCover.url)}#toolbar=0&navpanes=0&scrollbar=0`}
                                                title={relatedCover.alt || item.title}
                                                className="h-full w-full bg-white"
                                            />
                                        ) : (
                                            <Image
                                                src={relatedCover.url}
                                                alt={relatedCover.alt || item.title}
                                                fill
                                                className="object-cover"
                                                sizes="28vw"
                                            />
                                        )
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-black text-center">
                                            <span
                                                className="px-6 text-[34px] leading-tight"
                                                style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: relatedCategoryStyle.titleColor }}
                                            >
                                                {item.title}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 text-right">
                                    {/* <p className="text-[#4be6b5] text-sm mb-3">תוכנית</p> */}
                                    <h3 className="mb-4 text-[24px] font-bold text-black sm:text-[28px]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: relatedCategoryStyle.titleColor }}>{item.title}</h3>
                                    <p className="text-[#666] leading-7 line-clamp-3" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>{item.shortDescription}</p>
                                    <div className="mt-8 text-right">
                                        <Link
                                            href={`/programs/${item.slug}`}
                                            className={`inline-flex rounded-full px-8 py-3 font-semibold sm:px-10 ${relatedCategoryStyle.buttonClassName}`}
                                        >
                                            לתוכנית
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );})}
                    </div>

                </div>
            </section>
            {/* CONTACT FORM */}
            <section className="max-w-[auto] mx-auto px-6 py-24 bg-[#F7F7F7]">
                {/* <ContactForm programId={program.id} /> */}
            </section>
        </main>
    );
}

/** Inline form for the "מעוניינת?" CTA section — uses createContactLead with Turnstile + Zod validation. */
function InterestedForm({ programId }: { programId: string }) {
    const [state, formAction, pending] = useActionState(
        async (_: typeof initialState, formData: FormData) => createContactLead(formData),
        initialState,
    );

    return (
        <form action={formAction} className="mt-8 flex flex-wrap items-start justify-center gap-4 sm:mt-10">
            <input type="hidden" name="programId" value={programId} />

            <input
                name="name"
                type="text"
                required
                placeholder="השם שלך"
                className="h-[50px] w-full max-w-[320px] rounded-full bg-white px-5 text-center text-base text-black transition focus:outline-none focus:ring-2 focus:ring-[#4be6b5] sm:w-[180px]"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />
            <input
                name="phone"
                type="text"
                required
                placeholder="טלפון לשיחה"
                className="h-[50px] w-full max-w-[320px] rounded-full bg-white px-5 text-center text-base text-black transition focus:outline-none focus:ring-2 focus:ring-[#4be6b5] sm:w-[180px]"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />
            <input
                name="email"
                type="email"
                required
                placeholder="כתובת מייל"
                className="h-[50px] w-full max-w-[320px] rounded-full bg-white px-5 text-center text-base text-black transition focus:outline-none focus:ring-2 focus:ring-[#4be6b5] sm:w-[180px]"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />

            <TurnstileWidget />

            <button
                type="submit"
                disabled={pending}
                className="h-[50px] w-full max-w-[320px] rounded-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] text-base font-bold text-black transition hover:scale-105 disabled:opacity-60 sm:w-[140px]"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            >
                {pending ? "שולח..." : "שלח"}
            </button>

            {state.message && (
                <div className="w-full text-center text-sm mt-2" style={{ color: state.ok ? '#4be6b5' : '#ff7a6b' }}>
                    {state.message}
                </div>
            )}
        </form>
    );
}