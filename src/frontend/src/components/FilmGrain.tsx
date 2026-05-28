import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full viewport size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Generate noise texture
    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise; // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 13; // A (opacity ~0.05 = 13/255)
      }

      return imageData;
    };

    // Animate with subtle motion
    const animate = () => {
      // Update offset for subtle vibration/shift effect
      offsetRef.current.x = Math.sin(Date.now() * 0.0005) * 2;
      offsetRef.current.y = Math.cos(Date.now() * 0.0007) * 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate and draw new noise pattern
      const noise = generateNoise();
      ctx.putImageData(noise, offsetRef.current.x, offsetRef.current.y);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[800]"
      style={{
        mixBlendMode: "overlay",
      }}
    />
  );
}
