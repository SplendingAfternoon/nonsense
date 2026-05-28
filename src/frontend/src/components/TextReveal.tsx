import { type ReactNode, useEffect, useRef } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function TextReveal({
  children,
  delay = 0,
  className = "",
}: TextRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Trigger animation
            setTimeout(() => {
              element.classList.add("reveal-text-active");
            }, delay);
            // Unobserve after animation triggers (single execution)
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.2, // Trigger at 20% visibility
        rootMargin: "0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={`reveal-text ${className}`}>
      {children}
    </div>
  );
}
