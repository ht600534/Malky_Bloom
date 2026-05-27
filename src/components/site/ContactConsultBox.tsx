import React from "react";

export default function ContactConsultBox() {
    return (
        <div className="w-full  justify-center relative z-0" style={{ marginTop: "-100px" }}>
            <div
                className="bg-black rounded-[50px] max-w-5xl w-full px-8 md:px-16 py-6 flex flex-col items-center "
                style={{ backgroundColor: "#000000", zIndex: 20, marginRight: '250px' }}
            >
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-4 pt-12"
                    style={{
                        color: "#FF7458",
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
                <form className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
                    <input
                        type="text"
                        placeholder="השם שלך"
                        className="w-full md:w-44 px-4 py-2 rounded-full bg-white text-black text-center text-lg font-normal focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        type="text"
                        placeholder="טלפון לשיחה"
                        className="w-full md:w-44 px-4 py-2 rounded-full bg-white text-black text-center text-lg font-normal focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <input
                        type="email"
                        placeholder="כתובת מייל"
                        className="w-full md:w-44 px-4 py-2 rounded-full bg-white text-black text-center text-lg font-normal focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    />
                    <button
                        type="submit"
                        className="w-full md:w-34 px-4 py-2 rounded-full bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black font-bold text-lg text-center transition hover:scale-105"
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                    >
                        שלח
                    </button>
                </form>
            </div>


            <div style={{ width: '100%', height: '800px', backgroundColor: 'white', marginTop: '-50px' }} >

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
