import { useEffect, useState } from "react";

interface HUDFrameProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const GLITCH_TEXTS = ["[ NULL ]", "[ 0xFF ]", "[ //// ]", "[ ER:40 ]"];
const NORMAL_TEXT = "[ MENU ]";
const BREACH_TEXTS = ["⚠ SIGNAL LOST", "⚠ BREACH DETECTED"];

export default function HUDFrame({ isMenuOpen, setIsMenuOpen }: HUDFrameProps) {
  const [buttonText, setButtonText] = useState(NORMAL_TEXT);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [statusText, setStatusText] = useState("STATUS: SECURE.");

  // Menu button glitch effect
  useEffect(() => {
    const scheduleNextGlitch = () => {
      // Random interval between 3-8 seconds
      const nextGlitchDelay = 3000 + Math.random() * 5000;

      return setTimeout(() => {
        // Start glitch
        setIsGlitching(true);
        const randomGlitchText =
          GLITCH_TEXTS[Math.floor(Math.random() * GLITCH_TEXTS.length)];
        setButtonText(randomGlitchText);

        // Random glitch duration between 100-200ms
        const glitchDuration = 100 + Math.random() * 100;

        setTimeout(() => {
          // End glitch
          setIsGlitching(false);
          setButtonText(NORMAL_TEXT);

          // Schedule next glitch
          scheduleNextGlitch();
        }, glitchDuration);
      }, nextGlitchDelay);
    };

    const timeoutId = scheduleNextGlitch();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // HUD Exit Warning System ("The Breach")
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsExited(true);
      // Randomly choose breach text
      const randomBreachText =
        BREACH_TEXTS[Math.floor(Math.random() * BREACH_TEXTS.length)];
      setStatusText(randomBreachText);
    };

    const handleMouseEnter = () => {
      setIsExited(false);
      setStatusText("STATUS: SECURE.");
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[900]"
      style={{ fontFamily: 'Orbitron, "Roboto Mono", monospace' }}
    >
      {/* Top-Left */}
      <div className="absolute top-5 left-5 text-white text-[10px] tracking-[2px] uppercase pointer-events-none">
        HOLLOW OPTICAL.
      </div>

      {/* Top-Right - Menu Button with Pixel-Stable Positioning */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="hud-menu-button absolute top-5 text-white text-[10px] tracking-[2px] uppercase pointer-events-auto hover:text-blood-red transition-all duration-600 hover:glow-red-text"
        style={{
          right: "calc(1.25rem + var(--scrollbar-width, 0px))",
          transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      >
        <span
          className="hud-menu-text"
          style={{
            transform: isGlitching
              ? `translateX(${Math.random() > 0.5 ? 2 : -2}px)`
              : "translateX(0)",
            transition: isGlitching
              ? "transform 0ms linear"
              : "transform 600ms cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
        >
          {buttonText}
        </span>
      </button>

      {/* Bottom-Left */}
      <div className="absolute bottom-5 left-5 text-white text-[10px] tracking-[2px] uppercase pointer-events-none">
        {"SYS.VER.4.0 // LAT: 51.507."}
      </div>

      {/* Bottom-Right - Dynamic Status with Exit Warning */}
      <div
        className="absolute bottom-5 right-5 text-[10px] tracking-[2px] uppercase pointer-events-none"
        style={{
          color: isExited ? "#9e1a1a" : "#FFFFFF",
          animation: isExited ? "signal-fail 0.2s infinite" : "none",
        }}
      >
        {statusText}
      </div>
    </div>
  );
}
