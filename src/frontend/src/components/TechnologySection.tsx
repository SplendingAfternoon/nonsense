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

  const toggleSection = (title: string) => {
    setOpenSection((current) => (current === title ? null : title));
  };

  return (
    <section
      id="technology"
      data-ocid="technology.section"
      style={{ padding: "6rem 0" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
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
          <GlitchText text="TECHNOLOGY" durationMs={180} />
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {ITEMS.map((item, index) => (
            <TechItem
              key={item.title}
              item={item}
              isOpen={openSection === item.title}
              onToggle={() => toggleSection(item.title)}
              index={index}
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
  index: number;
}

function TechItem({ item, isOpen, onToggle }: TechItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`tech-panel-${item.title}`}
        onClick={onToggle}
        data-ocid={`technology.item.${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "16px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#e8e4de",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLButtonElement).style.outline =
            "2px solid #9e1a1a";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLButtonElement).style.outline = "none";
        }}
      >
        <span>{item.title}</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "18px",
            color: "#9e1a1a",
            flexShrink: 0,
            marginLeft: "1rem",
            lineHeight: 1,
          }}
        >
          {isOpen ? "\u2212" : "+"}
        </span>
      </button>

      <section
        id={`tech-panel-${item.title}`}
        aria-label={item.title}
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 300ms ease, opacity 250ms ease",
        }}
      >
        <div ref={contentRef} style={{ paddingBottom: "1.25rem" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              lineHeight: "1.7",
              color: "#7a7570",
              margin: 0,
            }}
          >
            {item.content}
          </p>
        </div>
      </section>
    </div>
  );
}
