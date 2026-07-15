"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// ConstellationEffect
//
// Strategy for "play once per real visit, not on SPA back-nav":
//   • On mount, check sessionStorage for a flag.
//   • If flag is set → animation already played this session → skip.
//   • If flag is NOT set → play animation, then set the flag.
//   • On browser "beforeunload" (refresh / tab close) → clear the flag.
//     This means F5 always replays, but SPA navigation within the site
//     (which does NOT fire beforeunload) keeps the flag → no replay.
// ---------------------------------------------------------------------------

const FLAG = "__c_played__";

function played(): boolean {
  if (typeof window === "undefined") return false;
  try { return sessionStorage.getItem(FLAG) === "1"; } catch { return false; }
}
function setFlag(): void {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(FLAG, "1"); } catch { /* ignore */ }
}
function clearFlag(): void {
  if (typeof window === "undefined") return;
  try { sessionStorage.removeItem(FLAG); } catch { /* ignore */ }
}

interface ConstellationEffectProps {
  text?: string;
  color?: string;
}

export default function ConstellationEffect({
  text = "הכל כאן",
  color = "#ff897c",
}: ConstellationEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // On browser refresh/tab-close → clear so next load replays.
    // SPA navigations do NOT fire beforeunload, so the flag survives.
    window.addEventListener("beforeunload", clearFlag);

    if (played()) return;

    const tid = setTimeout(() => {
      setFlag();
      setShow(true);
    }, 50);

    return () => {
      window.removeEventListener("beforeunload", clearFlag);
      clearTimeout(tid);
    };
  }, []);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // ---------- size ----------
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ---------- scan text shape ----------
    const FW = 1080;
    const FH = 390;
    const off = document.createElement("canvas");
    off.width = FW;
    off.height = FH;
    const offCtx = off.getContext("2d", { willReadFrequently: true })!;
    // offCtx.fillStyle = "#fff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = "bold 200px Tahoma";
    offCtx.fillText(text, FW / 2, FH / 2);
    const img = offCtx.getImageData(0, 0, FW, FH).data;

    const cx = canvas.width / 2 - FW / 2;
    const cy = canvas.height / 2 - FH / 2;

    interface Star {
      tx: number;
      ty: number;
      startX: number;
      startY: number;
      size: number;
      twinkle: number;
    }

    const stars: Star[] = [];
    const STEP = 6;
    for (let y = 0; y < FH; y += STEP) {
      for (let x = 0; x < FW; x += STEP) {
        const i = (y * FW + x) * 4;
        if (img[i + 3] > 0) {
          stars.push({
            tx: cx + x,
            ty: cy + y,
            startX: Math.random() * canvas.width,
            startY: -400 - Math.random() * 600,
            size: 1 + Math.random() * 2.5,
            twinkle: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    // ---------- draw a 4-point star ----------
    const drawStar = (
      x: number,
      y: number,
      innerR: number,
      outerR: number,
      c: string,
      blur: number,
    ) => {
      ctx.save();
      ctx.shadowColor = c;
      ctx.shadowBlur = blur;
      const step = Math.PI / 4;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = i * step - Math.PI / 2;
        if (i === 0) ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        else ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fillStyle = c;
      ctx.fill();
      ctx.restore();
    };

    // ---------- animation ----------
    let raf = 0;
    let t0 = 0;
    const FLIGHT = 3000, HOLD = 3000, FADE = 1000;
    const ease = (t: number) => 1 - Math.pow(1 - t, 2.5);

    const frame = (time: number) => {
      if (!t0) t0 = time;
      const e = time - t0;
      const ft = Math.min(1, e / FLIGHT);
      const phase = e < FLIGHT ? "f" : e < FLIGHT + HOLD ? "h" : "d";

      let ga = 1;
      if (phase === "d")
        ga = Math.max(0, 1 - (e - FLIGHT - HOLD) / FADE);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(0,0,0,${0.65 * ga})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalAlpha = ga;

      for (const s of stars) {
        const ev = ease(ft);
        const x = s.startX + (s.tx - s.startX) * ev;
        const y = s.startY + (s.ty - s.startY) * ev;
        const tw = 0.7 + 0.3 * Math.sin(e * 0.006 + s.twinkle);
        const ou = s.size * 2.5;
        const inn = s.size * 0.4;

        // All layers in the same color — pure #ff7a6b
        drawStar(x, y, inn * 2, ou * 2, color, 28);
        drawStar(x, y, inn * 1.2, ou * 1.2, color, 16);
        drawStar(x, y, inn * tw, ou * tw, color, 8);
      }

      ctx.restore();

      if (phase === "d" && ga <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [show, text, color]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
