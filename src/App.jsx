import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import NavBar from './components/NavBar';
import HeroSequence from './components/HeroSequence';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';

const DeferredContent = lazy(() => import('./components/DeferredContent'));

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    initSmoothScroll();
    return destroySmoothScroll;
  }, []);

  const handleProgress = useCallback((p) => setLoadingProgress(p), []);
  const handleLoaded = useCallback(() => setIsLoaded(true), []);
  const handleProjectState = useCallback((isOpen) => setIsProjectOpen(isOpen), []);

  return (
    // reducedMotion="user" makes every framer-motion animation respect the
    // OS-level "reduce motion" accessibility setting automatically.
    <MotionConfig reducedMotion="user">
      <Preloader progress={loadingProgress} isLoaded={isLoaded} />
      <CustomCursor />
      <ScrollProgress />

      <main id="top" className="relative w-full bg-[#050505]">
        <NavBar isProjectOpen={isProjectOpen} />

        <HeroSequence onProgress={handleProgress} onLoaded={handleLoaded} />

        <Suspense fallback={null}>
          <DeferredContent onProjectStateChange={handleProjectState} />
        </Suspense>
      </main>
    </MotionConfig>
  );
}

export default App;
