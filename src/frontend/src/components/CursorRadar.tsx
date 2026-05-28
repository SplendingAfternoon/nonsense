import { useEffect, useState } from "react";

export default function CursorRadar() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pulses, setPulses] = useState<{ id: number; timestamp: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Pulse generation every 4 seconds
    const pulseInterval = setInterval(() => {
      const newPulse = { id: Date.now(), timestamp: Date.now() };
      setPulses((prev) => [...prev, newPulse]);

      // Remove pulse after animation completes (2 seconds)
      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== newPulse.id));
      }, 2000);
    }, 4000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Pulse Rings - Double concentric rings */}
      {pulses.map((pulse) => (
        <div key={pulse.id}>
          {/* First Ring */}
          <div
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              animation: "pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          >
            <div className="w-full h-full rounded-full border rounded-full" />
          </div>
          {/* Second Ring (slightly delayed) */}
          <div
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              animation:
                "pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards",
            }}
          >
            <div className="w-full h-full rounded-full border rounded-full" />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            border-color: #9e1a1a;
          }
          100% {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0;
            border-color: #9e1a1a;
          }
        }
      `}</style>
    </div>
  );
}
