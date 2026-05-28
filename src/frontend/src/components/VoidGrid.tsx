import { useEffect, useState } from "react";

export default function VoidGrid() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define 5 vertical lines at 10%, 30%, 50%, 70%, and 90%
  const lines = [
    { left: "10%", speed: 0.3 },
    { left: "30%", speed: 0.5 },
    { left: "50%", speed: 0.7 }, // Center line moves faster
    { left: "70%", speed: 0.5 },
    { left: "90%", speed: 0.3 },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {lines.map((line, _index) => {
        const translateY = -scrollY * line.speed * 0.2;

        return (
          <div
            key={line.left}
            className="absolute top-0"
            style={{
              left: line.left,
              width: "1px",
              height: "200%",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)",
              opacity: 0.04,
              transform: `translateY(${translateY}px)`,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
