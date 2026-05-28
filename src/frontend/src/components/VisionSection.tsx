import GlitchText from "./GlitchText";

const paragraphs = [
  "Functional tints have existed for decades. They are worn by people with photosensitivity conditions, by surgeons, by shooters. They are not a new idea. What is new is treating them as a design-first choice rather than a clinical compromise.",
  "We built Hollow Optical because the gap between utility and considered design should not exist. If a material improves your experience of a hostile environment, the question of whether it looks worth wearing is not cosmetic — it is the whole problem.",
  "The wearer should not look like a patient. They should not look like someone who bought the cheapest thing on Amazon. They should look like someone who made a deliberate decision.",
  "One tint. Three frames. No unnecessary variation, no product sprawl. The constraints are intentional.",
];

export default function VisionSection() {
  return (
    <section
      id="vision"
      data-ocid="vision.section"
      style={{ padding: "6rem 0" }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 3vw, 32px)",
            textTransform: "uppercase",
            color: "#e8e4de",
            textAlign: "center",
            marginBottom: "3rem",
            letterSpacing: "0.1em",
            fontWeight: 500,
          }}
        >
          <GlitchText text="VISION" durationMs={180} />
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {paragraphs.map((p) => (
            <p
              key={p.slice(0, 20)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#e8e4de",
                textAlign: "left",
                marginBottom: "1.5rem",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
