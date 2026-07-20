"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro_shown")) return;
    sessionStorage.setItem("intro_shown", "1");
    setShow(true);

    const t1 = setTimeout(() => setPhase("out"), 2400);
    const t2 = setTimeout(() => setShow(false), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Confetti
  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#4be6b5", "#ff7a6b", "#ffffff", "#ffd966", "#b57bee", "#7df0ca"];
    type P = { x: number; y: number; vx: number; vy: number; color: string; w: number; h: number; rot: number; rotV: number };
    const particles: P[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -40 - Math.random() * 300,
      vx: (Math.random() - 0.5) * 5,
      vy: 1.8 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: 7 + Math.random() * 9,
      h: 3 + Math.random() * 5,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 7,
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        p.vy += 0.05;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.vy = 1.8 + Math.random() * 3.5;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.88;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, [show]);

  if (!show) return null;

  const EASE = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ pointerEvents: phase === "in" ? "all" : "none" }}>
      {/* Left curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#05050a]"
        animate={phase === "out" ? { x: "-101%" } : { x: 0 }}
        transition={{ duration: 1.0, ease: EASE }}
      />
      {/* Right curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#05050a]"
        animate={phase === "out" ? { x: "101%" } : { x: 0 }}
        transition={{ duration: 1.0, ease: EASE }}
      />

      {/* Subtle center seam line */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-gradient-to-b from-transparent via-[#4be6b5]/30 to-transparent pointer-events-none"
        animate={phase === "out" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Center content */}
      <AnimatePresence>
        {phase === "in" && (
          <motion.div
            key="text"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {/* Sparkle icon */}
            <motion.div
              className="mb-5 text-[#4be6b5]"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 2 L22 18 L38 20 L22 22 L20 38 L18 22 L2 20 L18 18 Z" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Main wow text */}
            <div
              className="text-[#4be6b5] leading-none mb-4"
              style={{
                fontFamily: "'Placebo_FM', Arial, sans-serif",
                fontSize: "clamp(72px, 16vw, 140px)",
                textShadow: "0 0 60px rgba(75,230,181,0.4), 0 0 120px rgba(75,230,181,0.15)",
              }}
            >
              וואו!
            </div>

            {/* Subtitle */}
            <div
              className="text-white"
              style={{
                fontFamily: "'Placebo_FM', Arial, sans-serif",
                fontSize: "clamp(18px, 4vw, 34px)",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}
            >
              הגעת למקום הנכון
            </div>

            {/* Small tagline */}
            <div
              className="mt-3 text-white/45"
              style={{
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontSize: "clamp(12px, 2vw, 15px)",
                letterSpacing: "0.08em",
              }}
            >
              כל התוכניות של המרכזות — כאן
            </div>

            {/* Bottom decorative line */}
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-transparent via-[#4be6b5]/50 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "min(320px, 60vw)" }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
