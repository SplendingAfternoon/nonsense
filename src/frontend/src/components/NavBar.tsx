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
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-14${
          scrolled ? " nav-scrolled" : ""
        }`}
        style={{
          background: scrolled ? undefined : "transparent",
          transition: "none",
        }}
      >
        {/* Left: logo + wordmark */}
        <button
          type="button"
          onClick={() => smoothScrollTo("hero")}
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#9e1a1a] bg-transparent border-none p-0 cursor-pointer"
        >
          <img
            className="logo-sigil nav-sigil"
            src="/assets/eye-star.png"
            alt="Hollow Optical"
            style={{ height: "28px", width: "28px", objectFit: "contain" }}
          />
          <span
            className="uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px",
              letterSpacing: "0.3em",
              color: "#e8e4de",
            }}
          >
            HOLLOW OPTICAL
          </span>
        </button>

        {/* Right: nav links — hidden below 600px */}
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.id} className="hidden sm:block">
              <button
                type="button"
                onClick={() => smoothScrollTo(link.id)}
                className="nav-link-btn menu-link bg-transparent border-none p-1 cursor-pointer text-[#e8e4de]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  transition: "none",
                  minHeight: "44px",
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
