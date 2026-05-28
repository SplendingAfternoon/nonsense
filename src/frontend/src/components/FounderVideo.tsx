import HackerText from "./HackerText";
import TextReveal from "./TextReveal";

export default function FounderVideo() {
  return (
    <section id="about" className="relative py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[2.5rem] md:text-[4rem] font-extralight mb-20 text-center">
          <HackerText text="VISION" />
        </h2>

        <div className="relative aspect-video max-h-[85vh] mx-auto group cursor-pointer">
          <div
            className="absolute inset-0 bg-rich-black border border-white/10 group-hover:border-blood-red transition-all duration-800 flex items-center justify-center group-hover:glow-red-border"
            style={{
              transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          >
            <div className="text-center space-y-8">
              {/* Refined Play Button - Pulsing Circle with Triangle */}
              <div className="relative w-24 h-24 mx-auto">
                <div
                  className="absolute inset-0 rounded-full border border-blood-red"
                  style={{
                    animation:
                      "pulse-breathe 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite",
                  }}
                />
                {/* Triangle centered inside circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="ml-1"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <polygon points="8,6 18,12 8,18" fill="#a4161a" />
                  </svg>
                </div>
              </div>

              <TextReveal>
                <p className="text-lg md:text-xl font-extralight tracking-[0.2em] text-white/60 uppercase">
                  Coming Soon
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <p className="text-xs text-white/40 tracking-[0.16em] max-w-md mx-auto">
                  A transmission from the architects of perception. The truth
                  behind the void.
                </p>
              </TextReveal>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}
