const smoothScrollTo = (id: string) => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
};

const navLinks = [
  { label: "Products", id: "products" },
  { label: "Technology", id: "technology" },
  { label: "Vision", id: "vision" },
  { label: "FAQ", id: "faq" },
];

interface NavBarProps {
  scrolled: boolean;
}

export default function NavBar({ scrolled }: NavBarProps) {
  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-14"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 300ms ease, backdrop-filter 300ms ease",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        {/* Left: logo + wordmark */}
        <button
          type="button"
          onClick={() => smoothScrollTo("hero")}
          className="flex items-center gap-3 focus-visible:outline-[2px] focus-visible:outline-solid focus-visible:outline-[#9e1a1a]"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            className="logo-sigil nav-sigil"
            src="/assets/eye-star.png"
            alt="Hollow Optical"
            style={{ height: "28px", width: "28px", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#e8e4de",
            }}
          >
            HOLLOW OPTICAL
          </span>
        </button>

        {/* Right: nav links — hidden below 600px */}
        <ul
          className="flex items-center gap-8 list-none m-0 p-0"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {navLinks.map((link) => (
            <li key={link.id} className="hidden sm:block">
              <button
                type="button"
                onClick={() => smoothScrollTo(link.id)}
                className="nav-link-btn"
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  color: "#e8e4de",
                  cursor: "pointer",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#9e1a1a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#e8e4de";
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <style>{`
        .nav-link-btn:focus-visible {
          outline: 2px solid #9e1a1a;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
