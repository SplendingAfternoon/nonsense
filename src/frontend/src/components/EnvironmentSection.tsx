import { useEffect, useRef } from "react";
import GlitchText from "./GlitchText";

const paragraphs = [
  "People spend, on average, ten hours a day under cool-spectrum LED light \u2014 at screens, in offices, under fluorescent ceilings. The lighting conditions in most working environments are determined by architects, facilities teams, and procurement decisions that have nothing to do with you.",
  "You cannot change the light. The intervention, if there is one, has to be personal and wearable. Something you carry into the environment rather than something you negotiate with the environment to change.",
  "Existing options fail on both sides. Cheap blue-light glasses lack spectral precision and design conviction. Clinical FL-41 eyewear \u2014 originally developed for photosensitivity management \u2014 works, but looks medical. Most people who would benefit from it will not wear it. Nothing sits in between.",
];

export default function EnvironmentSection() {
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
      id="environment"
      ref={sectionRef}
      data-ocid="environment.section"
      className="py-20"
      style={{
        borderTop: "1px solid #9e1a1a",
        opacity: 0,
        transition: "opacity 400ms ease-out",
        willChange: "opacity",
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* 12-column asymmetric grid: heading cols 1–4, copy cols 5–12 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-6">
          {/* Heading — columns 1–4 */}
          <div className="md:col-span-4">
            <h2
              className="font-serif uppercase text-[#e8e4de] text-left tracking-[0.1em] font-medium"
              style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
            >
              <GlitchText text="THE LIGHT IS THE PROBLEM" durationMs={180} />
            </h2>
          </div>

          {/* Body paragraphs — columns 5–12 (col-start-5 col-span-8) */}
          <div className="md:col-start-5 md:col-span-8 flex flex-col gap-6">
            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 20)}
                className="font-sans text-[16px] leading-[1.6] text-[#e8e4de] text-left m-0"
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
