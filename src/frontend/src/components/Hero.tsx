const smoothScrollTo = (id: string) => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
};

export default function Hero() {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background sigil */}
      <img
        className="hero-sigil absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto pointer-events-none"
        src="/assets/eye-star.png"
        alt=""
        aria-hidden="true"
        style={{ width: "clamp(300px, 40vw, 500px)", opacity: 0.06, zIndex: 0 }}
      />

      {/* Content stack */}
      <div className="relative z-10 text-center flex flex-col items-center px-11 py-11">
        {/* Wordmark */}
        <p className="hero-wordmark font-serif text-[12px] tracking-[0.3em] uppercase text-[#7a7570] mb-8">
          HOLLOW OPTICAL
        </p>

        {/* Headline */}
        <h1
          className="font-serif uppercase text-[#e8e4de] leading-[1.2] tracking-[0.02em] max-w-[680px] mb-6 font-medium hero-headline"
          style={{ fontSize: "clamp(32px, 5vw, 44px)" }}
        >
          MADE FOR THE LIGHT YOU CANNOT CHANGE.
        </h1>

        {/* Supporting text */}
        <p className="font-sans text-[14px] text-[#7a7570] max-w-[480px] mb-10 leading-[1.7] text-left">
          Grade-5 titanium frames with FL-41 deep-red lenses, built for people
          who spend their days under hostile artificial light.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => smoothScrollTo("products")}
            className="hero-cta-primary cta-snap border border-[#9e1a1a] text-[#9e1a1a] bg-transparent py-3 px-8 font-sans text-[14px] tracking-[0.1em] uppercase cursor-pointer"
          >
            View frames
          </button>

          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => smoothScrollTo("technology")}
            className="hero-cta-secondary bg-transparent border-none font-sans text-[13px] text-[#7a7570] underline cursor-pointer hover:text-[#e8e4de] focus-visible:outline-none focus-visible:text-[#e8e4de] py-3"
            style={{ transition: "none" }}
          >
            Read the technology
          </button>
        </div>
      </div>
    </section>
  );
}
