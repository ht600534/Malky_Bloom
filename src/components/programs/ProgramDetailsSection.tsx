"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/site/contact-form";
import { categoryLabels } from "@/lib/data/programs";
import type { Program } from "@/lib/types";
import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
const QUESTIONS = [
    { q: 'לורם איפסום דולור שי ט אמ ת קופלר?', a: 'תשובה לדוגמה לשאלה הראשונה. כאן תופיע תשובה מפורטת.' },
    { q: 'לורם איפסום עני קלון צלום?', a: 'תשובה לדוגמה לשאלה השנייה. כאן תופיע תשובה מפורטת.' },
    { q: 'לורם איפסום דולור שי ט אמ ת קופלר סינטומר לנוג?', a: 'תשובה לדוגמה לשאלה השלישית. כאן תופיע תשובה מפורטת.' },

];
type Props = {
    program: Program;
    relatedPrograms: Program[];
};

export default function ProgramDetailsSection({ program, relatedPrograms }: Props) {
    const cover = program.images[0];
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const galleryItems = [
        ...program.images.slice(1),
        ...program.graphics,
    ].slice(0, 6);

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

    return (
        <main className="bg-[#F7F7F7] text-[#111116]"  >
            <section className="relative bg-black mb-20  ">
                <div className="max-w-[1400px] mx-auto px-6 pt-20">
                    <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[40px]">
                        {cover ? (
                            <Image
                                src={cover.url}
                                alt={cover.alt || program.title}
                                width={980}
                                height={520}
                                className="w-full h-auto"
                            />
                        ) : (
                            <div className="h-[520px] flex items-center justify-center text-white">
                                אין תמונה
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
                        <span className="inline-flex rounded-full bg-white px-5 py-2 text-sm shadow-sm">
                            {categoryLabels[program.category]}
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

                    <p className="mt-8 text-[18px] mr-20 leading-9 text-[#555]" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                        {program.shortDescription}
                    </p>

                    {/* {program.fullDescription && (
                        <p className="mt-6 text-[18px] leading-9 text-[#555]">
                            {program.fullDescription}
                        </p>
                    )} */}
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
                <section className="max-w-[1280px] mx-auto px-6 pb-20">
                    <div className="grid md:grid-cols-3 gap-4">
                        {galleryItems.map((item) => (
                            <div
                                key={item.url}
                                className="relative h-[240px] overflow-hidden "
                            >
                                <Image
                                    src={item.url}
                                    alt={item.alt || program.title}
                                    fill
                                    className="object-cover"
                                    sizes="33vw"
                                />
                            </div>
                        ))}
                    </div>
                </section>
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
                                    className={`flex flex-row-reverse items-center bg-white rounded-full  px-6 py-2 transition-all duration-300 cursor-pointer hover:shadow-md  `}
                                    style={{ minHeight: 52 }}
                                    // ${openIdx === idx ? 'rounded-b-2xl' : ''}
                                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                >
                                    {/* כפתור חץ עגול בצד שמאל */}
                                    <div className="flex-shrink-0 -ml-2 z-10">
                                        <Image src="/figma/Ellipse 106.svg" alt="עיגול כתום" width={56} height={56} />
                                        <span className={`absolute left-1/20 top-1/2 -translate-x-1/2 -translate-y-1/2  ${openIdx === idx ? 'left-1/20 top-1/4 -translate-x-1/2 -translate-y-1/2' : ''}`}>
                                            <Image src="/figma/Elements (1).svg" alt="חץ שחור" width={28} height={28} />
                                        </span>
                                    </div>
                                    {/* שאלה */}
                                    <div className="flex-1 text-right text-lg md:text-xl font-normal text-black px-2 select-none" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                                        {item.q}
                                    </div>
                                </div>
                                {/* תשובה */}
                                {openIdx === idx && (
                                    <div className="w-full  rounded-b-2xl  px-8 py-6 text-right text-base md:text-lg text-black font-normal " style={{ fontFamily: "Tahoma, Geneva, sans-serif", marginTop: '-8px' }}>
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black py-24">
                <div className="max-w-[1100px] mx-auto px-6 text-center">
                    <h2
                        className="text-[64px] leading-none text-[#FF7458]"
                        style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                    >
                        מעוניינת?
                    </h2>

                    <div className="mt-10 flex  justify-center gap-4">


                        <TextField
                            placeholder="השם שלך"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#000000",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "55px",
                                    height: '50px',

                                    "& fieldset": { borderColor: "#2a2b35" },
                                    "&:hover fieldset": { borderColor: "#2ce5b0" },
                                },
                                "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
                            }}
                        />

                        <TextField
                            placeholder="טלפון לשיחה"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#000000",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "55px",
                                    height: '50px',

                                    "& fieldset": { borderColor: "#2a2b35" },
                                    "&:hover fieldset": { borderColor: "#2ce5b0" },
                                },
                                "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
                            }}
                        />

                        <TextField
                            placeholder="כתובת מייל"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#000000",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "55px",
                                    height: '50px',
                                    "& fieldset": { borderColor: "#2a2b35" },
                                    "&:hover fieldset": { borderColor: "#2ce5b0" },
                                },
                                "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
                            }}
                        />
                        <Button

                            sx={{
                                background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
                                color: "#0a0a0d",
                                // py: 1.5,
                                fontWeight: 700,
                                // textTransform: "none",
                                borderRadius: "55px",
                                width: '140px',
                                height: '50px',

                                "&:hover": {
                                    opacity: 1.9,
                                },
                            }}
                        >
                            שלח
                        </Button>
                    </div>
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
                        {relatedPrograms.map((item) => (
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
                                        <div className="flex h-full items-center justify-center bg-[#f3f3f3] text-[#666]">
                                            אין תמונה
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 text-right">
                                    {/* <p className="text-[#96FFA7] text-sm mb-3">תוכנית</p> */}
                                    <h3 className="text-[28px] font-bold text-black mb-4" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: '#FF7458' }}>{item.title}</h3>
                                    <p className="text-[#666] leading-7 line-clamp-3" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>{item.shortDescription}</p>
                                    <div className="mt-8 text-right">
                                        <Link
                                            href={`/programs/${item.slug}`}
                                            className="inline-flex rounded-full bg-[#FF7458] px-10 py-3 text-white font-semibold"
                                        >
                                            לתוכנית
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
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