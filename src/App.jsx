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
      
      <main className="relative w-full bg-[#050505]">
        <NavBar isProjectOpen={isProjectOpen} />

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

        {/* Post-Scroll Premium Projects Grid */}
        <ProjectsArchive onProjectStateChange={(isOpen) => setIsProjectOpen(isOpen)} />

        {/* Global Footer and Interactive Contact Cards */}
        <ContactSection />
        
        {/* Persistent Floating Action Button */}
        <FloatingContactBtn />
      </main>
    </>
  );
}

export default App;
