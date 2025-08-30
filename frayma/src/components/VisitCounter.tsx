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

type Props = {
  namespace?: string; // keep unique to your site
  keyName?: string;   // key within that namespace
};

export default function VisitCounter({
  namespace = "davemtok-portfolio",
  keyName = "root",
}: Props) {
  const [count, setCount] = React.useState<number | null>(null);
  const [confetti, setConfetti] = React.useState(false);
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.max(0, Math.floor(v)).toLocaleString());
  const ranOnce = React.useRef(false); // prevent double-run in React StrictMode dev

  React.useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const NS = encodeURIComponent(namespace);
    const KEY = encodeURIComponent(keyName);

    const endpoints = [
      // prefer update (explicit +1), then hit (auto-create)
      `https://api.countapi.xyz/update/${NS}/${KEY}?amount=1`,
      `https://api.countapi.xyz/hit/${NS}/${KEY}`,
    ];

    const animateTo = (next: number) => {
      setCount(next);
      // start slightly below and tick up; clamp to >= 0
      const start = Math.max(0, next - 7);
      mv.set(start);
      animate(mv, next, { duration: 0.8, ease: "easeOut" });
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1200);
    };

    const useLocalFallback = () => {
      try {
        const k = `visits-local-${namespace}-${keyName}`;
        const prev = parseInt(localStorage.getItem(k) || "0", 10) || 0;
        const next = prev + 1;
        localStorage.setItem(k, String(next));
        animateTo(next);
      } catch {
        animateTo(1);
      }
    };

    (async () => {
      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-store",
            headers: { "Cache-Control": "no-cache" },
          });
          if (!res.ok) continue;
          const data = await res.json();
          const val = typeof data?.value === "number" ? data.value : undefined;
          if (typeof val === "number") {
            animateTo(val);
            return;
          }
        } catch {
          // try next endpoint
        }
      }
      // All attempts failed (likely blocked) -> local fallback
      useLocalFallback();
    })();
  }, [keyName, mv, namespace]);

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
