import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSequence = ({ onProgress, onLoaded }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const totalFrames = 192; // 0 to 191
  const imagesRef = useRef([]);

  const textRef = useRef(null);

  useEffect(() => {
    const imageUrls = Array.from({ length: totalFrames }, (_, i) => {
      const index = String(i).padStart(3, '0');
      return `/sequence/frame_${index}_delay-0.041s.png`;
    });

    // Immediate unblocking for smoother initial feel
    onProgress(100);
    onLoaded();

    const loadImages = async () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = imageUrls[i];
        img.onload = () => {
          imagesRef.current[i] = img;
          if (i === 0) renderFrame(0);
        };
      }
    };
    loadImages();

    // Prepare renderer once
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    initSequence();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
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
  };

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (!img || !context) return;

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
        onUpdate: () => renderFrame(currentFrame.frame)
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
          <h1 className="text-[16vw] md:text-[12vw] font-black tracking-tighter text-white/90 leading-[0.8] whitespace-nowrap drop-shadow-2xl text-center">
            MOHAMMED <br className="md:hidden" /> AADIL
          </h1>
          <p className="text-[8px] sm:text-[10px] md:text-[1.2vw] font-mono tracking-[0.3em] md:tracking-[0.5em] text-emerald-500/80 uppercase mt-4 md:mt-8 text-center max-w-5xl leading-relaxed flex flex-wrap justify-center gap-1 md:gap-2">
            <span>Design Engineer</span> <span className="hidden md:inline">&nbsp;&bull;&nbsp;</span><span className="md:hidden">|</span>
            <span>Full-Stack Architect</span> <span className="hidden md:inline">&nbsp;&bull;&nbsp;</span><span className="md:hidden">|</span>
            <span>IoT & Embedded Systems</span>
          </p>
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
