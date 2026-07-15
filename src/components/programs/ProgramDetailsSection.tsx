"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { isPdfUrl, normalizeImageUrl } from "@/lib/url";
import { createContactLead } from "@/app/actions";
import { TurnstileWidget } from "@/components/site/turnstile";
import { ContactForm } from "@/components/site/contact-form";
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
    { q: 'האם התוכניות מגיעות מוכנות לחלוטין או שנדרשת עבודת הכנה מצידי?', a: 'מטרה שלי היא להקל עלייך מקסימום! \n התוכניות מגיעות כערכה מקיפה הכוללת את כתיבת הרעיון, המהלך, ההנחיות לרכזת,\n  חומרים להדפסה ומדיה (במידה ויש).\n  יחד עם זאת, בכל תוכנית ישנו מרחב המאפשר לך להכניס את הטאץ האישי שלך ולהתאים את התוכן לאופי המדויק של המוסד שלך.' },

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

    const questions = program.notes
        ? program.notes
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .slice(0, 3)
        : [
            "למה זה מתאים לקהל שלי?",
            "מה כלול בתכנית?",
            "איך מתבצעת ההרשמה?",
        ];

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

    return (
        <main className="bg-[#F7F7F7] text-[#111116]"  >
            <section className="relative bg-black mb-20  ">
                <div className="max-w-[1400px] mx-auto px-6 pt-20">
                    <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[40px]">
                        {cover ? (
                            isPdfUrl(cover.url) ? (
                                renderPdfFrame(cover.url, cover.alt || program.title, "h-[520px] w-full bg-white")
                            ) : (
                                <Image
                                    src={normalizeImageUrl(cover.url)}
                                    alt={cover.alt || program.title}
                                    width={980}
                                    height={520}
                                    className="w-full h-auto"
                                />
                            )
                        ) : (
                            <div className="flex h-[520px] items-center justify-center bg-white text-center">
                                <span
                                    className="px-8 text-[42px] leading-tight md:text-[64px]"
                                    style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: categoryStyle.placeholderTextColor }}
                                >
                                    {program.title}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* רקע אפור שמתחיל מוקדם יותר */}
                <div className="mt-[-120px] h-[120px] bg-[#F7F7F7]" />
            </section>

            {/* TITLE + DESCRIPTION */}
            <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-16" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="  max-w-[900px] mr-40  text-right">

                    {program.category && (
                        <span className={`inline-flex rounded-full px-5 py-2 text-sm shadow-sm ${categoryStyle.badgeClassName}`}>
                            {categoryLabels[program.category as keyof typeof categoryLabels] || program.category}
                        </span>
                    )}
                </div>
                <div className=" flex max-w-[900px] mr-40  text-right">

                    <h1
                        className="mt-8 text-[72px] leading-[0.9] text-black"
                        style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                    >
                        {program.title.split(/\s+/).map((word, index) => (
                            <span key={index} className="block">
                                {word}
                            </span>
                        ))}
                    </h1>

                    <p
                        className="mt-8 mr-20 text-[18px] leading-9 text-[#555] whitespace-pre-line"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    >
                        {program.fullDescription || program.shortDescription}
                    </p>
                </div>

                {/* DETAILS */}
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 mt-26 text-right mr-40 mb-40">

                    <div className="flex items-start gap-4">
                        <Image
                            src="/figma/flag-alt 1.svg"
                            alt=""
                            width={34}
                            height={34}
                        //   className="shrink-0 mt-1"
                        />

                        <div className="flex gap-1">
                            <p className="text-[22px] text-black font-medium">
                                נושא:
                            </p>

                            <p className="text-[22px] text-black ">
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

                        <div className="flex gap-1">
                            <p className="text-[22px] text-black font-medium">
                                אורך:
                            </p>

                            <p className="text-[22px] text-black ">
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

                        <div className="flex gap-1">
                            <p className="text-[22px] text-black font-medium">
                                חומרים נלווים:
                            </p>

                            <p className="text-[22px] text-black ">
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


                        <div className="flex gap-1">
                            <p className="text-[22px] text-black font-medium">
                                קהל יעד:
                            </p>

                            <p className="text-[22px] text-black ">
                                {program.targetAudience || "-"}
                            </p>
                        </div>
                    </div>


                </div>
            </section>

            {/* GALLERY */}
            {galleryItems.length > 0 && (
                <section className="max-w-[1280px] mx-auto px-6 pb-20 overflow-x-clip">
                    <div className="grid md:grid-cols-3 gap-4">
                        {galleryItems.map((item) => (
                            <div
                                key={`${item.url}-${item.alt}`}
                                className="relative h-[240px] overflow-hidden cursor-pointer group"
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
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={() => setLightboxIdx(null)}
                >
                    <button
                        className="absolute top-4 left-4 text-white text-2xl hover:text-[#4FDAB3] transition-colors z-10 cursor-pointer"
                        onClick={() => setLightboxIdx(null)}
                    >
                        ✕
                    </button>

                    {allGalleryItems.length > 1 && (
                        <>
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-[#4FDAB3] transition-colors z-10 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + allGalleryItems.length) % allGalleryItems.length); }}
                            >
                                ‹
                            </button>
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-[#4FDAB3] transition-colors z-10 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % allGalleryItems.length); }}
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
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
            <section className="w-full bg-white py-24" dir="rtl" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="max-w-7xl mx-auto px-4 flex">
                    {/* כותרת */}
                    <div className=" flex-col items-end mb-12" style={{ direction: 'rtl', marginLeft: '-80px' }}>
                        <img src="/figma/Vector-9.svg" alt="סמל המלצות" className="w-6 h-6 mb-2 ml-1" style={{ display: 'inline-block' }} />
                        <h2 className="text-4xl  text-right mb-12" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#000' }}>
                            שאלות <br /> יש?
                        </h2>
                    </div>
                    {/* שאלות */}
                    <div className="flex-1 flex flex-col gap-6 mr-50">
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
            <section className="bg-black py-24">
                <div className="max-w-[1100px] mx-auto px-6 text-center">
                    <h2
                        className="text-[64px] leading-none text-[#FF7458]"
                        style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                    >
                        מעוניינת?
                    </h2>

                    <InterestedForm programId={program.id} />
                </div>
            </section>
            <section className="bg-white py-24 " style={{ backgroundColor: '#F7F7F7' }}>
                <div className="max-w-[1280px] mx-auto px-6 ">

                    <div className="text-center mb-14">
                        {/* <p className="text-[14px] tracking-[0.3em] text-[#96FFA7] mb-4">
        תוכניות נוספות
      </p> */}

                        <h2
                            className="text-[56px] leading-none text-black"
                            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                        >
                            עוד תוכניות שתוכלי לאהוב
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center w-340">
                        {relatedPrograms.map((item) => {
                            const relatedCategoryStyle = getProgramCategoryStyle(item.category);

                            return (
                            <article
                                key={item.id}
                                className="overflow-hidden rounded-[32px] bg-white"
                            >
                                <div className="relative h-[280px]  mr-5 mt-5 ml-5 border border-[#f0f0f0] rounded-[32px] overflow-hidden">
                                    {item.images[0] ? (
                                        <Image
                                            src={item.images[0].url}
                                            alt={item.images[0].alt || item.title}
                                            fill
                                            className="object-cover"
                                            sizes="28vw"
                                        />
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
                                    {/* <p className="text-[#96FFA7] text-sm mb-3">תוכנית</p> */}
                                    <h3 className="text-[28px] font-bold text-black mb-4" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: relatedCategoryStyle.titleColor }}>{item.title}</h3>
                                    <p className="text-[#666] leading-7 line-clamp-3" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>{item.shortDescription}</p>
                                    <div className="mt-8 text-right">
                                        <Link
                                            href={`/programs/${item.slug}`}
                                            className={`inline-flex rounded-full px-10 py-3 font-semibold ${relatedCategoryStyle.buttonClassName}`}
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
        <form action={formAction} className="mt-10 flex flex-wrap justify-center gap-4 items-start">
            <input type="hidden" name="programId" value={programId} />

            <input
                name="name"
                type="text"
                required
                placeholder="השם שלך"
                className="w-[180px] h-[50px] px-5 rounded-full bg-white text-black text-center text-base focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />
            <input
                name="phone"
                type="text"
                required
                placeholder="טלפון לשיחה"
                className="w-[180px] h-[50px] px-5 rounded-full bg-white text-black text-center text-base focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />
            <input
                name="email"
                type="email"
                required
                placeholder="כתובת מייל"
                className="w-[180px] h-[50px] px-5 rounded-full bg-white text-black text-center text-base focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            />

            <TurnstileWidget />

            <button
                type="submit"
                disabled={pending}
                className="w-[140px] h-[50px] rounded-full bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black font-bold text-base transition hover:scale-105 disabled:opacity-60"
                style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
            >
                {pending ? "שולח..." : "שלח"}
            </button>

            {state.message && (
                <div className="w-full text-center text-sm mt-2" style={{ color: state.ok ? '#4FDAB3' : '#FF7458' }}>
                    {state.message}
                </div>
            )}
        </form>
    );
}