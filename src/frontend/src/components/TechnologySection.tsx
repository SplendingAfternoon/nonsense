import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";

const ITEMS = [
  {
    title: "FL-41 SPECTRAL FILTER",
    content:
      "FL-41 is a rose-tinted filter developed originally for photosensitivity management. In our lenses, it attenuates the 480\u2013520nm band \u2014 the range most associated with sustained visual fatigue under LED and fluorescent sources. It does not treat any condition. It reduces the intensity of the wavelengths you encounter most in artificially lit rooms.",
  },
  {
    title: "VACUUM-DEPOSITED ANTI-GLARE",
    content:
      "A multi-layer anti-reflective coating is applied under vacuum to eliminate surface reflections and internal lens bounce-back. This removes visual noise without affecting the spectral properties of the FL-41 tint. The result is cleaner, lower-effort vision through the lens.",
  },
  {
    title: "GRADE-5 TITANIUM CHASSIS",
    content:
      "Grade-5 titanium \u2014 the same alloy used in aerospace and surgical instruments \u2014 offers an exceptional strength-to-weight ratio. The frames weigh approximately 18g. They flex without fatiguing, resist corrosion, and do not deform under normal daily use. There is no planned obsolescence in the material.",
  },
  {
    title: "SMALL-BATCH PRODUCTION",
    content:
      "We produce in small quantities. This is not a marketing position \u2014 it is a quality constraint. Fewer units per run means each pair receives individual inspection. We would rather slow the business than ship a frame we would not keep ourselves.",
  },
];

export default function TechnologySection() {
  const [openSection, setOpenSection] = useState<string | null>(ITEMS[0].title);
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

  const toggleSection = (title: string) => {
    setOpenSection((current) => (current === title ? null : title));
  };

  return (
    <section
      id="technology"
      ref={sectionRef}
      data-ocid="technology.section"
      className="pt-10 pb-24"
      style={{
        opacity: 0,
        transition: "opacity 400ms ease-out",
        willChange: "opacity",
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <h2
          className="font-serif uppercase text-[#e8e4de] text-left mb-8 tracking-[0.1em] font-medium"
          style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
        >
          <GlitchText text="TECHNOLOGY" durationMs={180} />
        </h2>

        {/* Monolithic blueprint grid — adjacent items share borders, no gap */}
        <div
          className="border border-[#111111]"
          style={{ outline: "1px solid #111111" }}
        >
          {ITEMS.map((item, index) => (
            <TechItem
              key={item.title}
              item={item}
              isOpen={openSection === item.title}
              onToggle={() => toggleSection(item.title)}
              isLast={index === ITEMS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TechItemProps {
  item: { title: string; content: string };
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function TechItem({ item, isOpen, onToggle, isLast }: TechItemProps) {
  return (
    <div
      className="bg-[#0a0a0a] p-6"
      style={{
        borderBottom: isLast ? "none" : "1px solid #111111",
        transition: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#9e1a1a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#111111";
      }}
      data-ocid={`technology.item.${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`tech-panel-${item.title}`}
        onClick={onToggle}
        className="flex w-full justify-between items-start gap-4 font-serif text-[14px] uppercase tracking-[0.08em] text-[#e8e4de] bg-transparent border-none cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9e1a1a] mb-0"
      >
        <span
          className="text-left"
          style={{
            fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#e8e4de",
          }}
        >
          {item.title}
        </span>
        <span
          className="text-[#9e1a1a] shrink-0 leading-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
          }}
        >
          {isOpen ? "\u2212" : "+"}
        </span>
      </button>

      <section
        id={`tech-panel-${item.title}`}
        aria-label={item.title}
        className={
          isOpen
            ? "tech-content-open overflow-hidden"
            : "tech-content-closed overflow-hidden"
        }
      >
        <div className="pt-4">
          <p className="font-sans text-[14px] leading-[1.6] text-[#7a7570] m-0 text-left">
            {item.content}
          </p>
        </div>
      </section>
    </div>
  );
}
