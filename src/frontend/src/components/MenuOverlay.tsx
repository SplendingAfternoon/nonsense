import { useEffect, useState } from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const navLinks = [
  { label: "HOME", sectionId: "hero" },
  { label: "PRODUCTS", sectionId: "products" },
  { label: "TECHNOLOGY", sectionId: "technology" },
  { label: "VISION", sectionId: "vision" },
];

export default function MenuOverlay({
  isOpen,
  setIsMenuOpen,
}: MenuOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
    setIsVisible(false);
  }, [isOpen]);

  const handleLinkClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(12px)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {/* Close Button — pixel-perfect match with MENU button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(false)}
        className="hud-menu-button absolute top-5 text-white text-[10px] tracking-[2px] uppercase pointer-events-auto"
        style={{
          right: "calc(1.25rem + var(--scrollbar-width, 0px))",
          fontFamily: 'Orbitron, "Roboto Mono", monospace',
        }}
      >
        <span className="hud-menu-text">[ CLOSE ]</span>
      </button>

      {/* Centred navigation links */}
      <nav aria-label="Site navigation">
        <ul className="flex flex-col items-center justify-center gap-8 list-none m-0 p-0">
          {navLinks.map((link, index) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleLinkClick(link.sectionId)}
                className="menu-link text-white font-bold uppercase tracking-wider"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontFamily: "'Cormorant Garamond', serif",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1 + 0.2}s, transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1 + 0.2}s`,
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .menu-link:hover {
          color: #9e1a1a;
          text-shadow: 0 0 20px rgba(158, 26, 26, 0.5);
          transition: color 0ms, text-shadow 0ms;
        }
      `}</style>
    </div>
  );
}
