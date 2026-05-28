import { useEffect, useRef } from "react";
import GlitchText from "./GlitchText";

const PRODUCTS = [
  {
    id: "hollow-drift",
    name: "HOLLOW DRIFT",
    description: "Low-profile rectangle. Minimal temple, maximum wear.",
    image: "/assets/product-hollow-drift.jpg",
    alt: "Hollow Drift — grade-5 titanium frame with FL-41 deep-red lenses",
  },
  {
    id: "hollow-i",
    name: "HOLLOW I",
    description: "Precision oval. Clean geometry for sustained focus.",
    image: "/assets/product-hollow-i.jpg",
    alt: "Hollow I — grade-5 titanium frame with FL-41 deep-red lenses",
  },
  {
    id: "uriel",
    name: "URIEL",
    description:
      "Angular statement. Built for the room that won\u2019t adjust its lighting.",
    image: "/assets/uriel.jpg",
    alt: "Uriel — grade-5 titanium frame with FL-41 deep-red lenses",
  },
];

const SPECS = [
  { label: "Frame Material", value: "Grade-5 Titanium" },
  { label: "Lens Tint", value: "FL-41 Deep Red" },
  { label: "Filter Range", value: "480\u2013520nm" },
  { label: "Weight", value: "~18g" },
];

export default function ProductSection() {
  return (
    <section id="products" data-ocid="products.section" className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2
          className="font-serif uppercase text-[#e8e4de] text-left mb-12 tracking-[0.1em] font-medium"
          style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
        >
          <GlitchText text="PRODUCTS" durationMs={180} />
        </h2>

        {/* Monolithic border grid — cards share borders, no gaps */}
        <div
          className="grid grid-cols-1"
          style={{ border: "1px solid #111111" }}
        >
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: (typeof PRODUCTS)[number];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      data-ocid={`products.item.${index + 1}`}
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        opacity: 0,
        transition: "opacity 400ms ease-out",
        willChange: "opacity",
        borderTop: index > 0 ? "1px solid #111111" : undefined,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#9e1a1a";
        (e.currentTarget as HTMLDivElement).style.borderTopColor = "#9e1a1a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
        (e.currentTarget as HTMLDivElement).style.borderTopColor =
          index > 0 ? "#111111" : "";
      }}
    >
      {/* Image side */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
        <img
          src={product.image}
          alt={product.alt}
          className="absolute inset-0 w-full h-full object-cover block"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = "none";
          }}
        />
      </div>

      {/* Text side */}
      <div
        className="flex flex-col justify-center p-8"
        style={{ borderLeft: "1px solid #111111" }}
      >
        <h3 className="font-serif text-[22px] uppercase tracking-[0.1em] text-[#e8e4de] mb-2 font-medium text-left">
          {product.name}
        </h3>
        <p className="font-sans text-[16px] leading-[1.6] text-[#7a7570] mb-4 text-left">
          {product.description}
        </p>

        {/* Price — 11px JetBrains Mono, tracking-[0.2em], uppercase, red */}
        <p
          className="mb-6 text-left"
          style={{
            fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "#9e1a1a",
            textTransform: "uppercase",
          }}
        >
          £159.00
        </p>

        {/* Spec table — red divider rows, sharp data-dense layout */}
        <div className="w-full" style={{ borderTop: "1px solid #9e1a1a" }}>
          {SPECS.map((spec) => (
            <div key={spec.label} className="spec-row">
              <span className="spec-label">{spec.label}</span>
              <span className="spec-value">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
