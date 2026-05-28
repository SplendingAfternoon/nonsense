import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CTASection from "./components/CTASection";
import CursorRadar from "./components/CursorRadar";
import EnvironmentSection from "./components/EnvironmentSection";
import FAQSection from "./components/FAQSection";
import FilmGrain from "./components/FilmGrain";
import FooterSection from "./components/FooterSection";
import HUDFrame from "./components/HUDFrame";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import MenuOverlay from "./components/MenuOverlay";
import NavBar from "./components/NavBar";
import ProductSection from "./components/ProductSection";
import Starfield from "./components/Starfield";
import TechnologySection from "./components/TechnologySection";
import VisionSection from "./components/VisionSection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Scroll lock with scrollbar compensation (mobile-safe)
  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.setProperty(
          "--scrollbar-width",
          `${scrollbarWidth}px`,
        );
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.setProperty("--scrollbar-width", "0px");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.setProperty("--scrollbar-width", "0px");
    };
  }, [isMenuOpen]);

  // Nav transparency scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: "#0a0a0a", color: "#e8e4de" }}
      >
        {/* Persistent background layers */}
        <Starfield />
        <FilmGrain />
        {/* HUD + cursor */}
        <CursorRadar />
        <HUDFrame isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MenuOverlay isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
    </QueryClientProvider>
  );
}

export default App;
