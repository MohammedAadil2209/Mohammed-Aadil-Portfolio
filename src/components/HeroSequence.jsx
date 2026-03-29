import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSequence = ({ onProgress, onLoaded }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const totalFrames = 192; // 0 to 191
  const imagesRef = useRef([]);

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

    // 2. Silently fetch all 153MB of images in the background entirely unlinked from the UI
    imageUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imagesRef.current[i] = img;
      };
    });

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

    // Setup ScrollTrigger
    gsap.to(currentFrame, {
      frame: totalFrames - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smooth scrubbing
        onUpdate: () => renderFrame(currentFrame.frame),
      },
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-background">
      <div className="sticky top-0 w-full h-screen overflow-hidden" style={{ willChange: "transform" }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ willChange: "transform" }} />
        
        {/* Subtle Grain Overlay (Optimized) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
      </div>
    </div>
  );
};

export default HeroSequence;
