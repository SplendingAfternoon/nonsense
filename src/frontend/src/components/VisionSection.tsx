import { useEffect, useRef } from "react";
import GlitchText from "./GlitchText";

const paragraphs = [
  "Functional tints have existed for decades. They are worn by people with photosensitivity conditions, by surgeons, by shooters. They are not a new idea. What is new is treating them as a design-first choice rather than a clinical compromise.",
  "We built Hollow Optical because the gap between utility and considered design should not exist. If a material improves your experience of a hostile environment, the question of whether it looks worth wearing is not cosmetic \u2014 it is the whole problem.",
  "The wearer should not look like a patient. They should not look like someone who bought the cheapest thing on Amazon. They should look like someone who made a deliberate decision.",
  "One tint. Three frames. No unnecessary variation, no product sprawl. The constraints are intentional.",
];

export default function VisionSection() {
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
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      data-ocid="vision.section"
      className="py-20"
      style={{
        opacity: 0,
        transition: "opacity 400ms ease-out",
        willChange: "opacity",
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-[700px]">
          <h2
            className="font-serif uppercase text-[#e8e4de] text-left mb-10 tracking-[0.1em] font-medium"
            style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
          >
            <GlitchText text="VISION" durationMs={180} />
          </h2>

          <div className="flex flex-col">
            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 20)}
                className="font-sans text-[16px] leading-[1.6] text-[#e8e4de] text-left mb-6 m-0 last:mb-0"
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
