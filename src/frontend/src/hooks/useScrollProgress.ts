import { useEffect } from "react";

/**
 * Custom hook that calculates scroll progress (0-1) for a section
 * and updates its CSS custom property --parallax-progress in real time.
 *
 * @param sectionId - The ID of the section element to track
 */
export function useScrollProgress(sectionId: string) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const _sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how far the section has scrolled through the viewport
      // Progress is 0 when section top is at viewport bottom
      // Progress is 1 when section bottom is at viewport top
      const scrollStart = rect.bottom - viewportHeight;
      const scrollEnd = rect.top;
      const scrollRange = scrollStart - scrollEnd;

      // Calculate progress (0 to 1)
      let progress = 0;
      if (scrollRange > 0) {
        progress = Math.max(0, Math.min(1, -scrollEnd / scrollRange));
      }

      // Update CSS custom property
      section.style.setProperty("--parallax-progress", progress.toString());
    };

    // Initial calculation
    updateProgress();

    // Attach listeners
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [sectionId]);
}
