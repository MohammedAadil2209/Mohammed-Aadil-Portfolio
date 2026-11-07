import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../lib/smoothScroll'; // ensures ScrollTrigger is registered
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const frameUrl = (i) => `/sequence/frame_${String(i).padStart(3, '0')}_delay-0.041s.webp`;

/**
 * Coarse-to-fine load order: every 16th frame first, then every 8th, 4th, 2nd,
 * then the rest. Scrubbing at any point early on always finds a nearby frame
 * instead of freezing on the last loaded one.
 */
const buildLoadOrder = () => {
  const seen = new Set([0]);
  const order = [];
  [16, 8, 4, 2, 1].forEach((step) => {
    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  });
  return order;
};

const HeroSequence = ({ onProgress, onLoaded }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    const images = new Array(TOTAL_FRAMES);
    let lastDrawn = -1;
    let pendingFrame = 0;
    let rafId = null;
    let cancelled = false;
    let lastW = 0;
    let lastH = 0;

    const findNearestLoaded = (index) => {
      if (images[index]) return images[index];
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        if (images[index - d]) return images[index - d];
        if (images[index + d]) return images[index + d];
      }
      return null;
    };

    const draw = (index, force = false) => {
      if (!force && index === lastDrawn) return;
      const img = findNearestLoaded(index);
      if (!img) return;
      // Only mark exact frames as drawn so the real frame paints once it arrives.
      lastDrawn = images[index] ? index : -1;

      const w = lastW;
      const h = lastH;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let dw, dh, ox, oy;
      if (w / h > imgRatio) {
        dw = w;
        dh = w / imgRatio;
        ox = 0;
        oy = (h - dh) / 2;
      } else {
        dw = h * imgRatio;
        dh = h;
        ox = (w - dw) / 2;
        oy = 0;
      }
      context.fillStyle = '#060606';
      context.fillRect(0, 0, w, h);
      context.drawImage(img, ox, oy, dw, dh);
    };

    // At most one canvas paint per animation frame.
    const scheduleDraw = (index) => {
      pendingFrame = index;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        draw(pendingFrame);
      });
    };

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      // Mobile browsers change the viewport height while the address bar
      // slides in/out. Reallocating the canvas for that causes a visible
      // stutter, so ignore small height-only changes.
      if (w === lastW && Math.abs(h - lastH) < 160) return;
      lastW = w;
      lastH = h;
      // Frames are 1280x720 — a buffer larger than ~1.5x DPR adds cost, not detail.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      draw(lastDrawn < 0 ? pendingFrame : lastDrawn, true);
    };

    // Decode off the main thread before the frame is ever drawn, so scrolling
    // never pays for a synchronous image decode.
    const loadFrame = (i) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        let settled = false;
        const done = () => {
          if (settled) return;
          settled = true;
          if (!cancelled && img.naturalWidth) {
            images[i] = img;
            // If we were showing a stand-in for this frame, swap in the real one.
            if (pendingFrame === i || lastDrawn === -1) scheduleDraw(pendingFrame);
          }
          resolve();
        };
        const fail = () => {
          if (settled) return;
          settled = true;
          resolve();
        };
        img.onload = () => {
          // Pre-decode where supported; fall back to the loaded image either way.
          if (img.decode) img.decode().then(done, done);
          else done();
        };
        img.onerror = fail;
        img.src = frameUrl(i);
      });

    const loadRemaining = () => {
      const queue = buildLoadOrder();
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      const concurrency = isSmallScreen ? 4 : 6;
      const worker = async () => {
        while (!cancelled && queue.length) {
          await loadFrame(queue.shift());
        }
      };
      for (let k = 0; k < concurrency; k++) worker();
    };

    resize();
    window.addEventListener('resize', resize);

    // Never leave visitors stuck on the loader: reveal after 4s even on a slow
    // network; the canvas paints as soon as any frame arrives.
    const safety = setTimeout(() => !cancelled && onLoaded(), 4000);

    loadFrame(0).then(() => {
      if (cancelled) return;
      clearTimeout(safety);
      draw(0, true);
      onProgress(100);
      onLoaded();
      const start = () => !cancelled && loadRemaining();
      if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 600 });
      else setTimeout(start, 200);
    });

    const ctx = gsap.context(() => {
      const state = { frame: 0 };
      gsap.to(state, {
        frame: TOTAL_FRAMES - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          onUpdate: () => scheduleDraw(state.frame),
        },
      });

      gsap.to(textRef.current, {
        y: -80,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '12% top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      window.removeEventListener('resize', resize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      // Only revert THIS component's tweens/triggers (previously this killed
      // every ScrollTrigger on the page).
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#060606]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#060606]">
        {/* Cinematic image sequence */}
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Vignette + bottom scrim keep every overlaid line of text legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 40%, rgba(5,5,5,0) 45%, rgba(5,5,5,0.55) 100%), linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 22%, rgba(5,5,5,0) 50%)',
          }}
        />

        {/* Title block */}
        <div
          ref={textRef}
          className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-12 lg:px-16 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] md:pb-20 xl:pb-16 [@media(max-height:520px)]:pb-6 select-none pointer-events-none"
        >
          <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 md:gap-8 xl:gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4 md:mb-6 inline-flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-white/60"
              >
                <span className="h-px w-8 bg-rose-600" />
                Robotics · AI · Full-Stack
              </motion.p>

              <h1 className="hero-name font-black tracking-tighter text-white leading-[0.85] whitespace-nowrap">
                <span className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  >
                    MOHAMMED
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block text-white/90"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  >
                    AADIL<span className="text-rose-600">.</span>
                  </motion.span>
                </span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-5 md:gap-6 md:flex-row md:items-end md:justify-between xl:flex-col xl:items-end xl:text-right xl:max-w-sm"
            >
              <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-md [@media(max-height:520px)]:hidden">
                System architect and full-stack engineer building where software meets hardware — from
                cloud platforms to embedded firmware.
              </p>

              <div className="flex flex-wrap gap-3 shrink-0 pointer-events-auto">
                <a
                  href="/Mohammed%20Aadil.pdf"
                  download="Mohammed_Aadil_Resume.pdf"
                  className="group relative px-7 py-3.5 bg-white text-black rounded-full overflow-hidden transition-transform duration-300 active:scale-[0.97]"
                >
                  <span className="absolute inset-0 bg-rose-700 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    Download Resume
                  </span>
                </a>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-colors duration-500"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white">Contact</span>
                  <svg className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/80 animate-scroll-hint" />
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSequence;
