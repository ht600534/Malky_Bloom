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
        <div className="w-full  justify-center relative z-0" style={{ marginTop: "-100px" }}>
            <div
                className="bg-black rounded-[50px] max-w-5xl w-full px-8 md:px-16 py-6 flex flex-col items-center "
                style={{ backgroundColor: "#000000", zIndex: 20, marginRight: '250px' }}
            >
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-4 pt-12"
                    style={{
                        color: "#ff7a6b",
                        fontFamily: "'Placebo_FM', Arial, sans-serif",
                        lineHeight: 1.1,
                    }}
                >
                    מתלבטת?
                </h2>
                <div
                    className="text-white text-center text-xl md:text-3xl font-light mb-8"
                    style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                >
                    צרי קשר להתייעצות והתאמה אישית!                </div>
                <form action={formAction} className="w-full flex flex-col gap-4 md:flex-row justify-center items-center">
                    <input
                        name="name"
                        type="text"
                        placeholder="השם שלך"
                        required
                        className="w-full md:w-44 px-4 py-2 rounded-full bg-white text-black text-center text-lg font-normal focus:outline-none focus:ring-2 focus:ring-[#4be6b5] transition"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        name="phone"
                        type="text"
                        placeholder="טלפון לשיחה"
                        required
                        className="w-full md:w-44 px-4 py-2 rounded-full bg-white text-black text-center text-lg font-normal focus:outline-none focus:ring-2 focus:ring-[#4be6b5] transition"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="כתובת מייל"
                        required
                        className="w-full md:w-44 px-4 py-2 rounded-full bg-white text-black text-center text-lg font-normal focus:outline-none focus:ring-2 focus:ring-[#4be6b5] transition"
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
                        className="w-full md:w-34 px-4 py-2 rounded-full bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] text-black font-bold text-lg text-center transition hover:scale-105 disabled:opacity-60"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    >
                        {pending ? "שולח..." : "שלח"}
                    </button>
                </form>
                {state.message ? (
                  <div className={`text-sm ${state.ok ? "text-brand" : "text-brand-2"} mt-3`}>{state.message}</div>
                ) : null}
            </div>


            <div style={{ width: '100%', height: '160px', backgroundColor: '#F7F7F7', marginTop: '-50px' }} >

                <div
                    className="bg-black  max-w-5xl w-full px-8 md:px-16 py-16 flex flex-col items-center "
                    style={{
                        backgroundColor: "#000000", zIndex: 20, borderTopLeftRadius: 0, marginRight: '250px',
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px'
                    }}></div>

            </div>
        </div>
    );
}
