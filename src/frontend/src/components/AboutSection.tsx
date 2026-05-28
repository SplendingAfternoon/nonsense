import { useEffect, useRef } from "react";
import HackerText from "./HackerText";
import TextReveal from "./TextReveal";

const contentBlocks = [
  {
    heading: "THE PROBLEM",
    body: "Screen light runs hot in the blue-green range — roughly 480nm to 520nm. Sustained exposure triggers a physiological response in some people: malaise, dull headaches, a low-level overstimulation that accumulates through the day. It is not a medical condition. It is not screen addiction. It is a mismatch between the light environment humans evolved in and the one most of us now spend eight-plus hours inside. 62.6% of UK working adults report symptoms consistent with digital eye strain. The light is the variable.",
  },
  {
    heading: "WHY NOTHING WORKED",
    body: "The clinical options are effective. They are also the kind of thing you would only wear if aesthetics genuinely did not matter to you. The generic blue-light market went the other way — fashion-adjacent frames with a near-clear lens that filters almost nothing. There was no product that took both problems seriously at the same time.",
  },
  {
    heading: "WHAT WE BUILT",
    body: "Three frames. One tint. The FL-41 filter targets the 480–520nm range specifically — not broad-spectrum filtering, not a slight tint. Titanium was chosen for the same reason it is used in surgical instruments: strength-to-weight ratio, hinge durability, no corrosion. The constraints are intentional. One tint because one tint is correct. Three frames because three is enough. The name refers to negative space. The product should disappear except for what it does.",
  },
  {
    heading: "WHAT WE WON'T SAY",
    body: "These glasses do not cure anything. They are not a wellness product. They will not fix your sleep or your focus or your relationship with screens. What they do is filter a specific light frequency. That is a narrow, useful thing. We are not going to overclaim it.",
  },
];

const values = [
  {
    label: "HONESTY",
    definition: "We say what the product does. We do not say what it might do.",
  },
  {
    label: "DURABILITY",
    definition: "The frames outlast the trend. That is the point.",
  },
  {
    label: "SIMPLICITY",
    definition: "One decision made well, not ten decisions made adequately.",
  },
  {
    label: "DIRECTNESS",
    definition: "Short copy. No subtext. You can read what we mean.",
  },
];

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("scale-x-100", "opacity-100");
            entry.target.classList.remove("scale-x-0", "opacity-0");
          }
        }
      },
      { threshold: 0.1, rootMargin: "-30px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-px mb-16">
      <div
        ref={ref}
        className="absolute left-0 w-full h-full bg-gradient-to-r from-transparent via-[#a4161a] to-transparent scale-x-0 opacity-0 transition-all duration-700 origin-center"
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
          boxShadow: "0 0 8px rgba(164, 22, 26, 0.4)",
        }}
      />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about-brand"
      className="relative py-24 px-8"
      data-ocid="about.section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <h2 className="text-[2.5rem] md:text-[4rem] font-extralight text-center mb-10">
          <HackerText text="ABOUT" />
        </h2>

        <SectionDivider />

        {/* Content blocks */}
        <div className="flex flex-col gap-16">
          {contentBlocks.map((block, i) => (
            <TextReveal key={block.heading} delay={i * 80}>
              <div data-ocid={`about.block.${i + 1}`}>
                <p
                  className="text-sm tracking-widest uppercase mb-3"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "#a4161a",
                  }}
                >
                  {block.heading}
                </p>
                <p
                  className="text-base leading-relaxed max-w-2xl"
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {block.body}
                </p>
              </div>
            </TextReveal>
          ))}

          {/* Values block */}
          <TextReveal delay={contentBlocks.length * 80}>
            <div data-ocid="about.values">
              <p
                className="text-sm tracking-widest uppercase mb-6"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#a4161a",
                }}
              >
                THE VALUES
              </p>
              <div className="flex flex-col gap-4">
                {values.map((v, i) => (
                  <TextReveal
                    key={v.label}
                    delay={contentBlocks.length * 80 + i * 80}
                  >
                    <div
                      className="border-l-2 border-[#a4161a] pl-4"
                      data-ocid={`about.value.${i + 1}`}
                    >
                      <span
                        className="text-xs tracking-widest uppercase mr-3"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          color: "#ffffff",
                        }}
                      >
                        {v.label}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "'Tenor Sans', sans-serif",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {v.definition}
                      </span>
                    </div>
                  </TextReveal>
                ))}
              </div>
            </div>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
