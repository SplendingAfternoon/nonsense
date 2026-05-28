const smoothScrollTo = (id: string) => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
};

export default function CTASection() {
  return (
    <section
      id="cta"
      data-ocid="cta.section"
      style={{ padding: "8rem 2rem", textAlign: "center" }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(22px, 3vw, 28px)",
          color: "#e8e4de",
          maxWidth: "600px",
          margin: "0 auto 2.5rem auto",
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
        style={{
          border: "1px solid #9e1a1a",
          color: "#9e1a1a",
          background: "transparent",
          padding: "14px 40px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
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
