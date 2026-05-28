import "react";

export default function LoadingScreen() {
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#000000" }}
    >
      <img
        className="logo-sigil"
        src="/assets/eye-star.png"
        alt="Hollow Optical sigil"
        style={{
          width: "clamp(120px, 20vw, 200px)",
          height: "auto",
          animation: prefersReduced
            ? "none"
            : "sigil-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
      <style>{`
        @keyframes sigil-pulse {
          0%, 100% { transform: scale(1.0); opacity: 0.5; }
          50%       { transform: scale(1.05); opacity: 1.0; }
        }
      `}</style>
    </div>
  );
}
