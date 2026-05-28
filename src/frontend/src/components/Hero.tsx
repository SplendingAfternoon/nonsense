import { useEffect, useRef, useState } from "react";

const smoothScrollTo = (id: string) => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
};

export default function Hero() {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background sigil */}
      <img
        className="hero-sigil"
        src="/assets/eye-star.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(300px, 40vw, 500px)",
          height: "auto",
          opacity: 0.06,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content stack */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        {/* Wordmark */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7a7570",
            marginBottom: "2rem",
            margin: "0 0 2rem 0",
          }}
        >
          HOLLOW OPTICAL
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 5vw, 44px)",
            textTransform: "uppercase",
            color: "#e8e4de",
            lineHeight: "1.2",
            letterSpacing: "0.02em",
            animation: "heroFadeUp 600ms ease 300ms both",
            maxWidth: "680px",
            margin: "0 0 1.5rem 0",
            fontWeight: 500,
          }}
        >
          MADE FOR THE LIGHT YOU CANNOT CHANGE.
        </h1>

        {/* Supporting text */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            color: "#7a7570",
            maxWidth: "480px",
            margin: "0 auto 2.5rem auto",
            lineHeight: "1.7",
          }}
        >
          Grade-5 titanium frames with FL-41 deep-red lenses, built for people
          who spend their days under hostile artificial light.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => smoothScrollTo("products")}
            style={{
              border: "1px solid #9e1a1a",
              color: "#9e1a1a",
              background: "transparent",
              padding: "12px 32px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 200ms ease, color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#9e1a1a";
              e.currentTarget.style.color = "#e8e4de";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#9e1a1a";
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = "2px solid #9e1a1a";
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = "none";
            }}
          >
            View frames
          </button>

          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => smoothScrollTo("technology")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#7a7570",
              textDecoration: "underline",
              cursor: "pointer",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e8e4de";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7a7570";
            }}
          >
            Read the technology
          </button>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-heading { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
