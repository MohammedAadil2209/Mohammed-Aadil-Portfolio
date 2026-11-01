import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

const HeroSequence = ({ onProgress, onLoaded }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const totalFrames = 192; // 0 to 191
  const imagesRef = useRef([]);
  const lastDrawnRef = useRef(-1);
  const pendingFrameRef = useRef(0);
  const renderRafRef = useRef(null);

  const textRef = useRef(null);

  useEffect(() => {
    const imageUrls = Array.from({ length: totalFrames }, (_, i) => {
      const index = String(i).padStart(3, '0');
      return `/sequence/frame_${index}_delay-0.041s.webp`;
    });

    // Load first frame immediately for FCP
    const firstImg = new Image();
    firstImg.src = imageUrls[0];
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      renderFrame(0);
      onProgress(100);
      onLoaded();
      
      // Start idle loading for the rest
      loadRemainingImages();
    };

    const loadRemainingImages = () => {
      let currentIndex = 1;
      
      const loadNextChunk = (deadline) => {
        // Load frames as long as the browser is idle
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && currentIndex < totalFrames) {
          const i = currentIndex;
          const img = new Image();
          img.src = imageUrls[i];
          img.onload = () => {
            imagesRef.current[i] = img;
          };
          currentIndex++;
        }
        
        if (currentIndex < totalFrames) {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadNextChunk);
          } else {
            setTimeout(() => loadNextChunk({ timeRemaining: () => 5 }), 50);
          }
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadNextChunk);
      } else {
        setTimeout(() => loadNextChunk({ timeRemaining: () => 5 }), 50);
      }
    };

    // Prepare renderer once
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    initSequence();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (renderRafRef.current !== null) cancelAnimationFrame(renderRafRef.current);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    // Cap the device pixel ratio so high-DPI / Retina screens don't allocate
    // and repaint an unnecessarily huge canvas buffer while scrolling.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Buffer Allocation (Expensive - Only do on resize)
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    // Redraw the current frame at the new resolution so resizing never leaves
    // the canvas blank until the next scroll event.
    renderFrame(lastDrawnRef.current < 0 ? 0 : lastDrawnRef.current, true);
  };

  const renderFrame = (index, force = false) => {
    // Skip redundant work when the snapped frame hasn't actually changed.
    if (!force && index === lastDrawnRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    let img = imagesRef.current[index];
    if (!img) {
      // Find the closest loaded frame looking backwards
      for (let i = index - 1; i >= 0; i--) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
    }
    
    if (!img || !context) return;

    lastDrawnRef.current = index;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const canvasRatio = w / h;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = w;
      drawHeight = w / imgRatio;
      offsetX = 0;
      offsetY = (h - drawHeight) / 2;
    } else {
      drawWidth = h * imgRatio;
      drawHeight = h;
      offsetX = (w - drawWidth) / 2;
      offsetY = 0;
    }

    context.clearRect(0, 0, w, h);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Coalesce frame draws to at most one per animation frame so bursts of
  // ScrollTrigger updates can't trigger multiple expensive canvas paints.
  const scheduleRender = (index) => {
    pendingFrameRef.current = index;
    if (renderRafRef.current !== null) return;
    renderRafRef.current = requestAnimationFrame(() => {
      renderRafRef.current = null;
      renderFrame(pendingFrameRef.current);
    });
  };

  const initSequence = () => {
    let currentFrame = { frame: 0 };
    
    gsap.to(currentFrame, {
      frame: totalFrames - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: () => scheduleRender(currentFrame.frame)
      }
    });

    gsap.to(textRef.current, {
      scale: 1.15,
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '20% top',
        scrub: true
      }
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-background">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#060606]" style={{ willChange: "transform" }}>
        
        {/* Massive 3D Typography BEHIND the Canvas */}
        <div 
            ref={textRef} 
            className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none px-4"
            style={{ willChange: "transform, opacity" }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16vw] md:text-[12vw] font-black tracking-tighter text-white/90 leading-[0.8] whitespace-nowrap drop-shadow-2xl text-center"
          >
            MOHAMMED <br className="md:hidden" /> AADIL
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-[8px] sm:text-[10px] md:text-[1.2vw] font-mono tracking-[0.3em] md:tracking-[0.5em] text-rose-800/80 uppercase mt-4 md:mt-8 text-center max-w-5xl leading-relaxed flex flex-wrap justify-center gap-1 md:gap-2">
              <span>System Architect</span> <span className="hidden md:inline">&nbsp;&bull;&nbsp;</span><span className="md:hidden">|</span>
              <span>Full-Stack Engineer</span> <span className="hidden md:inline">&nbsp;&bull;&nbsp;</span><span className="md:hidden">|</span>
              <span>Hardware & Embedded Systems</span>
            </p>

            {/* Quick Access CTAs */}
            <div className="mt-12 flex gap-4 pointer-events-auto">
              <a 
                href="/Mohammed%20Aadil.pdf" 
                download="Mohammed_Aadil_Resume.pdf"
                className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-white/30"
              >
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white mix-blend-difference">
                  Download Résumé
                </span>
              </a>
              
              <a 
                href="#contact"
                className="group p-4 bg-rose-800/20 backdrop-blur-xl border border-rose-800/30 rounded-full hover:bg-rose-800/40 transition-all duration-500"
              >
                <span className="text-white group-hover:scale-110 transition-transform inline-block">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3D Sequence Canvas OVER the Text */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" style={{ willChange: "transform" }} />
        
        {/* Subtle Static Overlay (Optimized) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.02] bg-black/10"></div>
      </div>
    </div>
  );
};

export default HeroSequence;
