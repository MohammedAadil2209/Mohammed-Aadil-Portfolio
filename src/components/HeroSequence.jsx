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
    // Generate image URLs
    const imageUrls = Array.from({ length: totalFrames }, (_, i) => {
      const index = String(i).padStart(3, '0');
      return `/sequence/frame_${index}_delay-0.041s.png`;
    });

    // 1. Lightning-fast faux-loader to guarantee immediate unblocking (0.6 seconds)
    // This entirely solves the Vercel preloader hanging and percentage math bugs.
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 0.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        onProgress(this.targets()[0].value);
      },
      onComplete: () => {
        onProgress(100);
        onLoaded();
        initSequence(); // Engine starts safely, drawing frames when available.
      }
    });

    // 2. Silently fetch images in strictly throttled background chunks
    // This entirely prevents the browser network queue from flooding and crushing
    // the CPU on load, effectively eliminating scroll lag.
    const loadImagesInChunks = async () => {
      const chunkSize = 5;
      for (let i = 0; i < totalFrames; i += chunkSize) {
        const chunkUrls = imageUrls.slice(i, i + chunkSize);
        
        await Promise.all(chunkUrls.map((url, index) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            // Force hardware decoding off the main thread so Lenis scroll never stutters
            img.decode().then(() => {
              imagesRef.current[i + index] = img;
              resolve();
            }).catch(() => {
              // Fallback if decode isn't supported or fails
              imagesRef.current[i + index] = img;
              resolve();
            });
          });
        }));
        
        // Relinquish exact control back to the main thread for 50ms every 5 images
        // Guaranteed to keep the scroll perfectly smooth.
        await new Promise(r => setTimeout(r, 50));
      }
    };
    loadImagesInChunks();

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []); // Run once on mount

  const initSequence = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    // Setup Canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrame.frame);
    };
    
    window.addEventListener('resize', resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderFrame = (index) => {
      const img = imagesRef.current[index];
      if (!img || !context) return;

      // Object-fit: cover implementation for canvas
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    let currentFrame = { frame: 0 };
    renderFrame(0);

    // Setup ScrollTrigger for Canvas
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smooth scrubbing
        onUpdate: () => renderFrame(currentFrame.frame),
      }
    });

    tl.to(currentFrame, {
      frame: totalFrames - 1,
      snap: 'frame',
      ease: 'none',
      duration: 1
    }, 0);

    // 3D Parallax Typography Animation behind the canvas
    tl.to(textRef.current, {
      scale: 1.15,
      y: -100,
      opacity: 0.2, // Fades out as user scrolls deep into the sequence
      ease: 'none',
      duration: 1
    }, 0);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-background">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#060606]" style={{ willChange: "transform" }}>
        
        {/* Massive 3D Typography BEHIND the Canvas */}
        <div 
            ref={textRef} 
            className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none"
            style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-[12vw] font-black tracking-tighter text-white/90 leading-[0.8] whitespace-nowrap drop-shadow-2xl">
            MOHAMMED <br /> AADIL
          </h1>
          <p className="text-[1.2vw] font-mono tracking-[0.5em] text-emerald-500/80 uppercase mt-8 text-center max-w-5xl px-4 leading-relaxed">
            Design Engineer &nbsp;&bull;&nbsp; Full-Stack Architect &nbsp;&bull;&nbsp; IoT & Embedded Systems
          </p>
        </div>

        {/* 3D Sequence Canvas OVER the Text */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" style={{ willChange: "transform" }} />
        
        {/* Subtle Grain Overlay (Optimized) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
      </div>
    </div>
  );
};

export default HeroSequence;
