import { useEffect, useRef } from "react";
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
      id="faq"
      ref={sectionRef}
      data-ocid="faq.section"
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
            <GlitchText text="FAQ" durationMs={120} />
          </h2>

          <dl className="m-0 p-0">
            {faqs.map((item, i) => (
              <div key={item.q} data-ocid={`faq.item.${i + 1}`}>
                <dt
                  className="font-sans text-[16px] text-[#e8e4de] font-medium mb-2"
                  style={{
                    fontVariant: "small-caps",
                    marginTop: i === 0 ? 0 : "1.5rem",
                  }}
                >
                  {item.q}
                </dt>
                <dd className="font-sans text-[16px] text-[#7a7570] leading-[1.6] mb-4 ml-0">
                  {item.a}
                </dd>
                {i < faqs.length - 1 && (
                  <div className="h-px bg-[#9e1a1a] w-full" />
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
