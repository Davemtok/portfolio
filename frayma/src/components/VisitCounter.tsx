"use client";
import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function Confetti() {
  const emojis = ["🎉", "✨", "🚀", "🎈", "💫", "🪩"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-lg"
          style={{ left: `${Math.random() * 100}%`, top: -10 }}
          initial={{ y: -20, opacity: 0, rotate: 0, scale: 0.8 }}
          animate={{ y: 160, opacity: [0, 1, 1, 0], rotate: Math.random() * 360, scale: 1 }}
          transition={{ duration: 1.6 + Math.random() * 0.8, ease: "easeOut", delay: Math.random() * 0.2 }}
        >
          {emojis[i % emojis.length]}
        </motion.span>
      ))}
    </div>
  );
}

export default function VisitCounter() {
  const [count, setCount] = React.useState<number | null>(null);
  const [confetti, setConfetti] = React.useState(false);
  const ranOnce = React.useRef(false);
  const mv = useMotionValue(0);
  const display = useTransform(mv, v => Math.floor(Math.max(0, v)).toLocaleString());

  React.useEffect(() => {
    if (ranOnce.current) return; // avoid double-run in Strict Mode
    ranOnce.current = true;
    
    const animateTo = (next: number) => {
      setCount(next);
      mv.set(Math.max(0, next - 7));
      animate(mv, next, { duration: 0.8, ease: "easeOut" });
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1200);
    };

    (async () => {
      try
      {
            // Cache-busted request to avoid any CDN caching along the way
            const res = await fetch(`/api/visits?_=${Date.now()}`, { cache: "no-store" });
            const data = await res.json();

            // Helpful console log while we debug
            // (You can remove this once it's working)
            console.log("visit counter /api/visits response:", data);

            if (typeof data?.value === "number") {
                animateTo(data.value);
            } else {
                throw new Error("Bad response shape from /api/visits");
            }
            } catch {
            // final local fallback so UI still animates
            try {
                const k = "visits-local";
                const prev = parseInt(localStorage.getItem(k) || "0", 10) || 0;
                const next = prev + 1;
                localStorage.setItem(k, String(next));
                animateTo(next);
            } catch {
                animateTo(1);
            }
        }
    })();
  }, [mv]);

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
      <span className="opacity-80">Total visits</span>
      <motion.span className="font-semibold tabular-nums" aria-live="polite">
        {count === null ? "…" : display}
      </motion.span>
      <span role="img" aria-label="eyes">👀</span>
      {confetti && <Confetti />}
    </div>
  );
}
