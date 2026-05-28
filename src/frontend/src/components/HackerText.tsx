import { useEffect, useRef, useState } from "react";

interface HackerTextProps {
  text: string;
  className?: string;
}

const CHARACTERS = "X7#9@!$%&*+=<>?[]{}|~^ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FRAME_DURATION = 40; // 40ms per frame (between 30-50ms)
const SCRAMBLE_FRAMES = 10; // First 10 frames are pure scrambling

export default function HackerText({ text, className = "" }: HackerTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameCountRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  const getRandomChar = () =>
    CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

  const generateRandomString = (length: number) => {
    return Array.from({ length }, () => getRandomChar()).join("");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: generateRandomString is a stable local fn; only re-run when text changes
  useEffect(() => {
    // Initialize with random characters
    setDisplayText(generateRandomString(text.length));
  }, [text]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: startAnimation uses refs internally; only re-subscribe when text changes
  useEffect(() => {
    // Use IntersectionObserver to trigger animation when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            startAnimation();
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-100px",
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]);

  const startAnimation = () => {
    frameCountRef.current = 0;
    const locked = new Set<number>();
    setLockedIndices(locked);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      frameCountRef.current++;
      const currentFrame = frameCountRef.current;

      // First 10 frames: pure scrambling
      if (currentFrame <= SCRAMBLE_FRAMES) {
        setDisplayText(generateRandomString(text.length));
        return;
      }

      // After scramble phase: resolve letters from left to right
      const resolvePhaseFrame = currentFrame - SCRAMBLE_FRAMES;
      const totalResolveFrames = text.length * 2; // Spread resolution across frames
      const charsToLock = Math.floor(
        (resolvePhaseFrame / totalResolveFrames) * text.length,
      );

      // Lock characters progressively from left to right
      const newLocked = new Set<number>();
      for (let i = 0; i < Math.min(charsToLock, text.length); i++) {
        newLocked.add(i);
      }
      setLockedIndices(newLocked);

      // Generate new display text
      const newDisplay = text
        .split("")
        .map((char, index) => {
          if (newLocked.has(index)) {
            return char; // Locked character
          }
          return getRandomChar(); // Still scrambling
        })
        .join("");

      setDisplayText(newDisplay);

      // Stop when all characters are locked
      if (newLocked.size >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text); // Ensure final text is exact
      }
    }, FRAME_DURATION);
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block font-mono uppercase tracking-[0.24em] ${className}`}
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: '"tnum"',
      }}
    >
      {displayText.split("").map((char, index) => {
        const isLocked = lockedIndices.has(index);
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: character positions are stable by index in a fixed-length scramble animation
            key={index}
            className="inline-block transition-colors duration-300"
            style={{
              color: isLocked ? "#FFFFFF" : "#a4161a",
              textShadow: isLocked
                ? "none"
                : "0 0 10px rgba(164, 22, 26, 0.5), 0 0 20px rgba(164, 22, 26, 0.3)",
              transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
