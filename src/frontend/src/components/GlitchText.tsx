import { useEffect, useRef } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&";

interface GlitchTextProps {
  text: string;
  className?: string;
  durationMs?: number;
}

export default function GlitchText({
  text,
  className = "",
  durationMs = 180,
}: GlitchTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      el.textContent = text;
      return;
    }

    const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];
    const scramble = () => Array.from({ length: text.length }, rand).join("");

    el.textContent = scramble();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRunRef.current) {
            hasRunRef.current = true;
            observer.disconnect();

            const tickInterval = 16;
            const ticks = Math.floor(durationMs / tickInterval);
            let tick = 0;

            const id = setInterval(() => {
              tick++;
              if (tick >= ticks) {
                clearInterval(id);
                el.textContent = text;
                return;
              }
              // Progressive lock from left
              const locked = Math.floor((tick / ticks) * text.length);
              el.textContent =
                text.slice(0, locked) +
                Array.from({ length: text.length - locked }, rand).join("");
            }, tickInterval);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, durationMs]);

  return (
    <span ref={spanRef} className={className}>
      {text}
    </span>
  );
}
