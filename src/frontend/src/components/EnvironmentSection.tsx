import GlitchText from "./GlitchText";

const paragraphs = [
  "People spend, on average, ten hours a day under cool-spectrum LED light — at screens, in offices, under fluorescent ceilings. The lighting conditions in most working environments are determined by architects, facilities teams, and procurement decisions that have nothing to do with you.",
  "You cannot change the light. The intervention, if there is one, has to be personal and wearable. Something you carry into the environment rather than something you negotiate with the environment to change.",
  "Existing options fail on both sides. Cheap blue-light glasses lack spectral precision and design conviction. Clinical FL-41 eyewear — originally developed for photosensitivity management — works, but looks medical. Most people who would benefit from it will not wear it. Nothing sits in between.",
];

export default function EnvironmentSection() {
  return (
    <section
      id="environment"
      data-ocid="environment.section"
      style={{ padding: "6rem 0", borderTop: "1px solid #9e1a1a" }}
    >
      <div
        style={{
          maxWidth: "1100px",
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
          <GlitchText text="THE LIGHT IS THE PROBLEM" durationMs={180} />
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "2.5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 20)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#e8e4de",
                  textAlign: "left",
                  margin: 0,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
