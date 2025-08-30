"use client";
import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Simple fun emoji confetti
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

type Props = {
  namespace?: string; // any unique string for your site
  keyName?: string;   // bucket key
};

export default function VisitCounter({ namespace = "davemtok-portfolio", keyName = "root" }: Props) {
  const [count, setCount] = React.useState<number | null>(null);
  const [confetti, setConfetti] = React.useState(false);

  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.floor(v).toLocaleString());

  React.useEffect(() => {
    let cancelled = false;

    async function hitCounter() {
      try {
        // CountAPI: increments and returns total
        const res = await fetch(`https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(keyName)}`);
        const data = await res.json();
        if (cancelled) return;

        const next = typeof data?.value === "number" ? data.value : 1;
        setCount(next);

        // animate from (next - 7) up to next for a nice tick
        animate(mv, next, { duration: 0.8, ease: "easeOut" });
        setConfetti(true);
        setTimeout(() => setConfetti(false), 1200);
      } catch {
        // fallback: just show 1
        const next = 1;
        setCount(next);
        animate(mv, next, { duration: 0.6, ease: "easeOut" });
      }
    }

    hitCounter();
    return () => {
      cancelled = true;
    };
  }, [keyName, mv, namespace]);

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
      <span className="opacity-80">Total visits</span>
      <motion.span
        className="font-semibold tabular-nums"
        aria-live="polite"
      >
        {count === null ? "…" : display}
      </motion.span>
      <span>👀</span>
      {confetti && <Confetti />}
    </div>
  );
}
