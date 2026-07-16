"use client";

import Link from "next/link";
import { AnimatePresence, motion, useAnimationControls, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function HomeLeadNudge() {
  const { scrollYProgress } = useScroll();
  const cardControls = useAnimationControls();
  const [hasShownCard, setHasShownCard] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (hasShownCard || isDismissed || latest < 0.45 || latest > 0.55) {
      return;
    }

    setHasShownCard(true);
  });

  useEffect(() => {
    if (!hasShownCard) {
      return;
    }

    void cardControls.start({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 118,
        damping: 15,
        mass: 0.9,
      },
    });
  }, [cardControls, hasShownCard]);

  const glowAnimation = useMemo(
    () => ({
      boxShadow: [
        "0 0 0 rgba(79, 230, 181, 0.0)",
        "0 0 18px rgba(79, 230, 181, 0.12)",
        "0 0 28px rgba(79, 230, 181, 0.18)",
        "0 0 18px rgba(79, 230, 181, 0.12)",
        "0 0 0 rgba(79, 230, 181, 0.0)",
      ],
      borderColor: [
        "rgba(79, 230, 181, 0.16)",
        "rgba(79, 230, 181, 0.24)",
        "rgba(79, 230, 181, 0.3)",
        "rgba(79, 230, 181, 0.24)",
        "rgba(79, 230, 181, 0.16)",
      ],
    }),
    [],
  );

  return (
    <>
      <motion.div
        className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6"
        animate={glowAnimation}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Link
          href="/contact"
          className="block border border-[#4be6b5]/20 bg-black/80 px-4 py-3 text-right text-white backdrop-blur-[10px] sm:px-5"
          style={{ borderRadius: "20px 20px 20px 8px" }}
        >
          <span className="block text-[13px] text-white/70" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
            יש לך תוכנית?
          </span>
          <span className="mt-1 block text-[18px] text-[#4be6b5]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
            בואי נדבר →
          </span>
        </Link>
      </motion.div>

      <AnimatePresence>
        {hasShownCard && !isDismissed ? (
          <motion.aside
            initial={{ x: -420, y: -140, rotate: -15, skewY: 7, opacity: 0, scale: 0.92 }}
            animate={cardControls}
            exit={{ x: -120, opacity: 0, transition: { duration: 0.24, ease: "easeOut" } }}
            className="fixed left-4 top-[15vh] z-40 w-[min(430px,calc(100vw-2rem))] overflow-hidden border border-white/12 bg-[#131317]/95 text-right text-white shadow-[0_34px_120px_rgba(0,0,0,0.38)] backdrop-blur-[24px] sm:left-6 md:left-8"
            style={{ borderRadius: "28px 28px 28px 10px" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,230,181,0.18),transparent_34%),linear-gradient(155deg,rgba(255,255,255,0.06),transparent_45%)]" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#4be6b5] via-[#6de8c2] to-transparent" />

            <div className="relative p-6 sm:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setIsDismissed(true)}
                  className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-white/72 transition-colors hover:bg-white/10 hover:text-white"
                  style={{ borderRadius: "14px 14px 14px 6px" }}
                  aria-label="סגירת החלון"
                >
                  <span className="text-lg leading-none">×</span>
                </button>

                <div className="flex-1">
                  <div className="mb-3 inline-flex items-center gap-2 border border-[#4be6b5]/20 bg-[#4be6b5]/8 px-3 py-1 text-[13px] text-[#7df0ca]" style={{ borderRadius: "999px" }}>
                    <span className="text-[12px]">חדש</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4be6b5]" />
                    <span>הזדמנות להכניס עוד תוכן</span>
                  </div>

                  <h3 className="text-[32px] leading-[0.95] text-[#4be6b5] sm:text-[38px]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
                    יש לך תוכנית
                    <br />
                    מעניינת?
                  </h3>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr] sm:items-end">
                <div>
                  <p className="text-[15px] leading-8 text-white/82 sm:text-base" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                    אלפי מרכזות מחפשות בדיוק תוכן רענן, חד ומדויק. אם יש לך תוכנית טובה, זה המקום להציג אותה בצורה שמכבדת את העבודה שלך.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center bg-[#ff7a6b] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-[#ff8e82]"
                      style={{ fontFamily: "Tahoma, Geneva, sans-serif", borderRadius: "18px 18px 18px 7px" }}
                    >
                      בואי נדבר
                    </Link>
                    <span className="text-sm text-white/55" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                      בלי התחייבות, עם התאמה מדויקת
                    </span>
                  </div>
                </div>

                <div className="border border-white/10 bg-black/20 p-4" style={{ borderRadius: "22px 22px 22px 8px" }}>
                  <div className="mb-2 text-xs tracking-[0.22em] text-white/45">MALKY BLOOM NETWORK</div>
                  <div className="text-lg leading-7 text-white" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
                    תוכן איכותי מגיע לקהל הנכון כשנותנים לו במה נכונה.
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
