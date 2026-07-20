"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export default function HomeLeadNudge() {
  const { scrollYProgress } = useScroll();
  const [hasShownCard, setHasShownCard] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const revealCard = useCallback(() => {
    setHasShownCard((current) => current || !isDismissed);
  }, [isDismissed]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (hasShownCard || isDismissed || latest < 0.32) {
      return;
    }
    revealCard();
  });

  useEffect(() => {
    if (hasShownCard || isDismissed) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      revealCard();
    }, 1800);
    return () => window.clearTimeout(timeoutId);
  }, [hasShownCard, isDismissed, revealCard]);

  return (
    <>
      {/* Small persistent badge */}
      <motion.div
        className="fixed bottom-8 left-0 z-40"
        initial={{ x: -160 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.6 }}
      >
        <Link href="/contact" className="group flex items-stretch">
          {/* Left glow bar */}
          <motion.div
            className="w-[4px] flex-shrink-0 bg-[#4be6b5]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
          />
          {/* Body */}
          <div
            className="flex items-center gap-4 border border-l-0 border-white/10 bg-[#0b0b0f]/95 px-5 py-4 backdrop-blur-sm transition-colors group-hover:bg-[#111116]"
            style={{ borderRadius: "0 6px 6px 0", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
          >
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/38" style={{ fontFamily: "Tahoma, sans-serif" }}>יש לך תוכנית?</span>
              <span className="text-[16px] text-[#4be6b5]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>בואי נדבר</span>
            </div>
            <motion.svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className="text-[#4be6b5]/70"
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <path d="M14 10H6M6 10L10 6M6 10L10 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </motion.svg>
          </div>
        </Link>
      </motion.div>

      {/* Main popup card */}
      <AnimatePresence>
        {hasShownCard && !isDismissed ? (
          <motion.aside
            dir="rtl"
            style={{ transformOrigin: "top right", perspective: "900px" }}
            initial={{ x: -520, rotateZ: -42, y: -80, opacity: 0 }}
            animate={{
              x: 0,
              rotateZ: 0,
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 58,
                damping: 15,
                mass: 1.6,
              },
            }}
            exit={{
              x: -400,
              rotateZ: -30,
              y: -40,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            className="fixed left-0 top-[10vh] z-50 w-[min(500px,calc(100vw-0.5rem))] text-right text-white"
          >
            {/* Shadow layer for depth */}
            <div
              className="absolute inset-0 translate-x-1 translate-y-1 bg-black/30"
              style={{ borderRadius: "0 8px 8px 0" }}
            />

            {/* Card body */}
            <div
              className="relative overflow-hidden border border-white/10 border-l-0 bg-[#0e0e12] shadow-[0_32px_100px_rgba(0,0,0,0.7),0_0_80px_rgba(75,230,181,0.06)]"
              style={{ borderRadius: "0 8px 8px 0" }}
            >
              {/* Top accent stripe */}
              <div className="h-[3px] w-full bg-gradient-to-r from-[#4be6b5] via-[#7df0ca] to-transparent" />

              {/* Background radial glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(75,230,181,0.1),transparent)]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 bg-[radial-gradient(circle,rgba(255,122,107,0.07),transparent_65%)]" />

              {/* Subtle grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Diagonal accent line */}
              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(75,230,181,0.15) 30%, rgba(75,230,181,0.08) 70%, transparent)",
                }}
              />

              <div className="relative px-7 pb-8 pt-6 sm:px-9 sm:pb-9 sm:pt-7">
                {/* Top bar: badge + close */}
                <div className="mb-7 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setIsDismissed(true)}
                    className="group flex h-8 w-8 flex-shrink-0 items-center justify-center border border-white/12 bg-white/5 text-white/40 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                    style={{ borderRadius: "4px" }}
                    aria-label="סגירת החלון"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="transition-transform group-hover:scale-110 cursor-pointer"
                    >
                      <path
                        d="M1 1L11 11M11 1L1 11"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>

                  <div
                    className="inline-flex items-center gap-2 border border-[#4be6b5]/22 bg-[#4be6b5]/8 px-3 py-1.5 text-[11px] tracking-[0.1em] text-[#7df0ca]"
                    style={{ borderRadius: "3px" }}
                  >
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#4be6b5]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span>הזדמנות עכשיו</span>
                  </div>
                </div>

                {/* Main headline */}
                <div className="mb-5">
                  <h3
                    className="text-[46px] leading-[0.88] text-white sm:text-[56px]"
                    style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
                  >
                    יש לך
                    <br />
                    <span className="text-[#4be6b5]">תוכנית</span>
                    <br />
                    <span className="text-white/80">מעניינת?</span>
                  </h3>
                </div>

                {/* Divider */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-white/18 to-transparent" />
                  <div className="h-1 w-1 rotate-45 bg-[#4be6b5]/60" />
                </div>

                {/* Body text */}
                <p
                  className="mb-6 text-[14.5px] leading-[1.9] text-white/68"
                  style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                >
                  אלפי מרכזות מחפשות בדיוק תוכן רענן וטוב.
                  <br />
                  אם יש לך תוכנית, זה המקום להציג אותה בצורה
                  <br />
                  שמכבדת את העבודה שלך.
                </p>

                {/* CTA button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-3 bg-[#ff7a6b] py-4 text-[15px] font-bold text-black transition-colors hover:bg-[#ff8a7c]"
                    style={{ fontFamily: "Tahoma, Geneva, sans-serif", borderRadius: "4px 4px 4px 2px" }}
                  >
                    <span>דברי איתנו עכשיו</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13 8H3M3 8L8 3M3 8L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                    </svg>
                  </Link>
                </motion.div>

                <p
                  className="mt-3 text-center text-[11px] text-white/30"
                  style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                >
                  ללא התחייבות · עם התאמה מלאה 
                </p>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
