import { useEffect, useRef } from "react";

const smoothScrollTo = (id: string) => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
};

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      data-ocid="cta.section"
      className="py-32 px-8 text-center"
      style={{
        opacity: 0,
        transition: "opacity 400ms ease-out",
        willChange: "opacity",
      }}
    >
      <p
        className="font-serif text-[#e8e4de] mx-auto mb-10 text-left"
        style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          maxWidth: "600px",
          lineHeight: "1.4",
          fontStyle: "italic",
          letterSpacing: "0.02em",
        }}
      >
        If the light will not change, change what you wear in it.
      </p>

      {/* TODO: replace scrollTo with checkout URL when ready */}
      <button
        type="button"
        data-ocid="cta.primary_button"
        onClick={() => smoothScrollTo("products")}
        className="uppercase"
        style={{
          border: "1px solid #9e1a1a",
          color: "#9e1a1a",
          background: "transparent",
          padding: "14px 40px",
          minHeight: "44px",
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.1em",
          cursor: "pointer",
          transition: "background 200ms ease, color 200ms ease",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.background = "#9e1a1a";
          btn.style.color = "#e8e4de";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.background = "transparent";
          btn.style.color = "#9e1a1a";
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLButtonElement).style.outline =
            "2px solid #9e1a1a";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLButtonElement).style.outline = "none";
        }}
      >
        Pre-order £159
      </button>
    </section>
  );
}
