"use client";

import { useActionState } from "react";
import { createContactLead } from "@/app/actions";
import { TurnstileWidget } from "@/components/site/turnstile";

const initialState = { ok: false, message: "" };

export default function ContactConsultBox() {
    const [state, formAction, pending] = useActionState(
      async (_: typeof initialState, formData: FormData) => createContactLead(formData),
      initialState,
    );

    return (
        <div className="relative z-0 -mt-10 w-full justify-center overflow-x-clip sm:-mt-14 md:-mt-20 lg:-mt-[100px]">
            <div
                className="mx-auto flex w-[calc(100%-2rem)] max-w-5xl flex-col items-center rounded-[30px] bg-black px-5 py-8 sm:w-[calc(100%-3rem)] sm:rounded-[40px] sm:px-8 md:px-12 lg:px-16"
                style={{ backgroundColor: "#000000", zIndex: 20 }}
            >
                <h2
                    className="mb-4 pt-6 text-center text-4xl font-bold sm:pt-8 md:text-5xl lg:pt-12"
                    style={{
                        color: "#ff7a6b",
                        fontFamily: "'Placebo_FM', Arial, sans-serif",
                        lineHeight: 1.1,
                    }}
                >
                    מתלבטת?
                </h2>
                <div
                    className="mb-8 text-center text-lg font-light text-white sm:text-xl md:text-2xl lg:text-3xl"
                    style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                >
                    צרי קשר להתייעצות והתאמה אישית!                </div>
                <form action={formAction} className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row" id="consult-box-form">
                    <input
                        name="name"
                        type="text"
                        placeholder="השם שלך"
                        required
                        className="w-full rounded-full bg-white px-4 py-3 text-center text-base font-normal text-black transition focus:outline-none focus:ring-2 focus:ring-[#4be6b5] sm:text-lg lg:w-44"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        name="phone"
                        type="text"
                        placeholder="טלפון לשיחה"
                        required
                        className="w-full rounded-full bg-white px-4 py-3 text-center text-base font-normal text-black transition focus:outline-none focus:ring-2 focus:ring-[#4be6b5] sm:text-lg lg:w-44"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="כתובת מייל"
                        required
                        className="w-full rounded-full bg-white px-4 py-3 text-center text-base font-normal text-black transition focus:outline-none focus:ring-2 focus:ring-[#4be6b5] sm:text-lg lg:w-44"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        type="hidden"
                        name="message"
                        value="בקשת ייעוץ והתאמה אישית מהדף הראשי"
                    />
                    <TurnstileWidget />
                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full rounded-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] px-4 py-3 text-center text-base font-bold text-black transition hover:scale-105 disabled:opacity-60 sm:text-lg lg:w-34"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    >
                        {pending ? "שולח..." : "שלח"}
                    </button>
                </form>

                <div className="mt-4 flex w-full flex-col items-center gap-3">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-white" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                        <label className="flex items-center gap-2 text-base">
                            <input type="radio" name="requestType" value="proposal" form="consult-box-form" defaultChecked />
                            הצעת תוכנית
                        </label>
                        <label className="flex items-center gap-2 text-base">
                            <input type="radio" name="requestType" value="details" form="consult-box-form" />
                            קבלת פרטים על תוכנית
                        </label>
                    </div>
                    <textarea
                        name="details"
                        form="consult-box-form"
                        rows={2}
                        placeholder="יש לך משהו לשאול? אפשר לפרט כאן"
                        className="w-full rounded-2xl border-none bg-white px-4 py-3 text-base text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#4be6b5]"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                </div>
                {state.message ? (
                  <div className={`text-sm ${state.ok ? "text-brand" : "text-brand-2"} mt-3`}>{state.message}</div>
                ) : null}
            </div>


            <div className="-mt-8 h-[110px] w-full bg-[#F7F7F7] sm:-mt-10 sm:h-[130px] md:h-[160px]" >

                <div
                    className="mx-auto flex w-[calc(100%-2rem)] max-w-5xl flex-col items-center bg-black px-8 py-10 sm:w-[calc(100%-3rem)] md:px-16 md:py-16"
                    style={{
                        backgroundColor: "#000000", zIndex: 20, borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px'
                    }}></div>

            </div>
        </div>
    );
}
