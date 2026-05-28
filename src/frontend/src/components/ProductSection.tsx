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
    <section
      id="products"
      data-ocid="products.section"
      style={{ padding: "6rem 0" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 3vw, 32px)",
            textTransform: "uppercase",
            color: "#e8e4de",
            textAlign: "center",
            marginBottom: "4rem",
            letterSpacing: "0.1em",
            fontWeight: 500,
          }}
        >
          <GlitchText text="PRODUCTS" durationMs={180} />
        </h2>

        {PRODUCTS.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} index={index} />
            {index < PRODUCTS.length - 1 && (
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #9e1a1a",
                  margin: "3rem 0",
                  width: "100%",
                }}
              />
            )}
          </div>
        ))}
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
            el.style.transform = "translateY(0)";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      data-ocid={`products.item.${index + 1}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        opacity: 0,
        transform: "translateY(16px)",
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .product-row-${index} {
            flex-direction: ${isEven ? "row" : "row-reverse"} !important;
          }
        }
      `}</style>
      <div
        className={`product-row-${index}`}
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        {/* Image side */}
        <div style={{ flex: "0 0 55%", minWidth: 0 }}>
          <img
            className="product-img"
            src={product.image}
            alt={product.alt}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/placeholder.svg";
            }}
          />
        </div>

        {/* Text side */}
        <div
          style={{
            flex: "0 0 45%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#e8e4de",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              color: "#7a7570",
              marginBottom: "1rem",
            }}
          >
            {product.description}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              color: "#9e1a1a",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
            }}
          >
            £159.00
          </p>

          {/* Spec table */}
          <div
            style={{
              borderTop: "1px solid #9e1a1a",
              paddingTop: "1rem",
              width: "100%",
            }}
          >
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "#7a7570",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#e8e4de",
                  }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
