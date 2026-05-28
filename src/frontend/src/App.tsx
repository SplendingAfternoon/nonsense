import { useEffect, useState } from "react";
import CTASection from "./components/CTASection";
import EnvironmentSection from "./components/EnvironmentSection";
import FAQSection from "./components/FAQSection";
import FilmGrain from "./components/FilmGrain";
import FooterSection from "./components/FooterSection";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import ProductSection from "./components/ProductSection";
import Starfield from "./components/Starfield";
import TechnologySection from "./components/TechnologySection";
import VisionSection from "./components/VisionSection";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Promise.all: window load + 1.5s minimum
  useEffect(() => {
    let cancelled = false;
    const minimumTime = new Promise<void>((resolve) =>
      setTimeout(resolve, 1500),
    );
    const assetsReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });
    Promise.all([assetsReady, minimumTime]).then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Nav transparency: IntersectionObserver on hero section for instant snap
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      // fallback: scroll event if hero not yet mounted
      const handleScroll = () => setScrolled(window.scrollY > 60);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // When hero leaves viewport, snap nav solid
          setScrolled(!entry.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "-56px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#0a0a0a", color: "#e8e4de", borderRadius: 0 }}
    >
      {/* Persistent background layers */}
      <Starfield />
      <FilmGrain />
      {/* NavBar */}
      <NavBar scrolled={scrolled} />
      {/* Page sections */}
      <main id="top">
        <Hero />
        <EnvironmentSection />
        <ProductSection />
        <TechnologySection />
        <VisionSection />
        <FAQSection />
        <CTASection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
