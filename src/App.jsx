import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './components/NavBar';
import HeroSequence from './components/HeroSequence';
import AboutSection from './components/AboutSection';
import LogoLoop from './components/LogoLoop';
import ServicesSection from './components/ServicesSection';
import ThreeViewer from './components/ThreeViewer';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsArchive from './components/ProjectsArchive';
import ContactSection from './components/ContactSection';
import FloatingContactBtn from './components/FloatingContactBtn';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Use native requestAnimationFrame for Lenis, which prevents lag spikes
    // compared to forcing it inside the GSAP ticker for heavy canvas frames.
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP's lag smoothing to keep ScrollTrigger accurate
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Preloader progress={loadingProgress} isLoaded={isLoaded} />
      <CustomCursor />
      
      <main className="relative w-full bg-[#050505]">
        <NavBar />

        {/* The Hero Scroll Sequence Container */}
        <HeroSequence 
          onProgress={(p) => setLoadingProgress(p)} 
          onLoaded={() => setIsLoaded(true)} 
        />
        
        {/* Parallax Interstitial Text Sections */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Infinite Skills Marquee (Logo Loop) */}
        <LogoLoop />

        {/* Services / Ecosystem */}
        <ServicesSection />
        
        {/* WebGL 3D Interactive Scene Section */}
        <div id="threeviewer">
          <ThreeViewer />
        </div>

        {/* Experience & Achievements Timeline */}
        <ExperienceTimeline />

        {/* Post-Scroll Premium Projects Grid using actual fetched devstudio projects */}
        <ProjectsArchive />

        {/* Global Footer and Interactive Contact Cards */}
        <ContactSection />
        
        {/* Persistent Floating Action Button */}
        <FloatingContactBtn />
      </main>
    </>
  );
}

export default App;
