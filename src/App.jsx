import React, { useEffect, useState, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './components/NavBar';
import HeroSequence from './components/HeroSequence';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import FloatingParticles from './components/FloatingParticles';

const DeferredContent = lazy(() => import('./components/DeferredContent'));

gsap.registerPlugin(ScrollTrigger);

// Prevent ScrollTrigger from refreshing (and causing a jump) when mobile
// browser address bars show/hide during scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP Ticker for maximum performance
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <Preloader progress={loadingProgress} isLoaded={isLoaded} />
      <CustomCursor />
      <FloatingParticles />
      
      <main className="relative w-full bg-[#050505]">
        <NavBar isProjectOpen={isProjectOpen} />

        {/* The Hero Scroll Sequence Container */}
        <HeroSequence 
          onProgress={(p) => setLoadingProgress(p)} 
          onLoaded={() => setIsLoaded(true)} 
        />
        
        {/* Lazy Loaded Below-the-fold content */}
        <Suspense fallback={null}>
          <DeferredContent onProjectStateChange={(isOpen) => setIsProjectOpen(isOpen)} />
        </Suspense>
      </main>
    </>
  );
}

export default App;
