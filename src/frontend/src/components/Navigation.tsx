interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Navigation({ isOpen, setIsOpen }: NavigationProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[898] transition-opacity duration-600"
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" }}
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Side Panel */}
      <nav
        className={`fixed top-0 left-0 h-full w-[350px] bg-rich-black border-r border-white/10 z-[899] transition-transform duration-600 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" }}
      >
        <div className="flex flex-col h-full pt-32 px-8">
          <div className="space-y-1">
            {[
              { label: "Home", id: "hero" },
              { label: "Products", id: "products" },
              { label: "Technology", id: "technology" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-6 py-4 text-white text-sm tracking-[0.18em] uppercase hover:text-blood-red hover:bg-dark-surface/50 transition-all duration-600 border-l-2 border-transparent hover:border-blood-red hover:glow-red-text"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pb-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blood-red to-transparent glow-red-line mb-6" />
            <p className="text-xs text-white/40 tracking-[0.16em] text-center">
              HOLLOW OPTICAL
            </p>
            <p className="text-[0.65rem] text-white/30 tracking-[0.14em] text-center mt-2">
              Perception Redefined
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
