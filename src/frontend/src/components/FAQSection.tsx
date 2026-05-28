import GlitchText from "./GlitchText";

const faqs = [
  {
    q: "Can I get prescription lenses?",
    a: "Not at launch. Prescription glazing is on the roadmap. We will announce it when it is ready.",
  },
  {
    q: "Can I wear these outdoors?",
    a: "Yes, though they are designed for indoor artificial light. Outdoors the deep-red tint will significantly reduce brightness and shift colour perception. Most wearers use them at a desk, not in the sun.",
  },
  {
    q: "Do these cure migraines or fix my sleep?",
    a: "No. They are not a medical device. They reduce the intensity of the wavelengths most associated with visual fatigue in artificial light. If you have a medical condition, speak to a clinician.",
  },
  {
    q: "Where are they made?",
    a: "Frames are manufactured at a specialist factory in China. Lenses are glazed in the UK. We are direct about this because there is no reason not to be.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" data-ocid="faq.section" style={{ padding: "6rem 0" }}>
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
          <GlitchText text="FAQ" durationMs={120} />
        </h2>

        <dl style={{ margin: 0, padding: 0 }}>
          {faqs.map((item, i) => (
            <div key={item.q} data-ocid={`faq.item.${i + 1}`}>
              <dt
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontVariant: "small-caps",
                  color: "#e8e4de",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                  marginTop: i === 0 ? 0 : "1.5rem",
                }}
              >
                {item.q}
              </dt>
              <dd
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#7a7570",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                  marginLeft: 0,
                }}
              >
                {item.a}
              </dd>
              {i < faqs.length - 1 && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #9e1a1a",
                    margin: 0,
                  }}
                />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
