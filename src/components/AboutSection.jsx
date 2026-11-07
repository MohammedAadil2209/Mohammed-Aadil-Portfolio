import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../lib/smoothScroll';

/**
 * Two statements that slide in over the hero sequence as it plays.
 * Only transform + opacity are animated (both GPU-composited) — the old
 * filter: blur() animation forced a full repaint of huge text every frame.
 */
const AboutSection = () => {
  const containerRef = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(text2Ref.current, { xPercent: -8, autoAlpha: 0 });
      gsap.set(text3Ref.current, { xPercent: 8, autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
        .to(text2Ref.current, { xPercent: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.out' })
        .to(text2Ref.current, { xPercent: 10, autoAlpha: 0, duration: 1.5, ease: 'power2.in' })
        .to(text3Ref.current, { xPercent: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.out' }, '-=1')
        .to(text3Ref.current, { autoAlpha: 0, duration: 1.5, ease: 'power2.in' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent -mt-[400vh] z-20 pointer-events-none">
      {/* Nav target: the scroll position where the first statement is fully revealed */}
      <div id="about" aria-hidden="true" className="absolute left-0 top-[50vh] h-px w-px" />
      <div className="sticky top-0 w-full h-screen overflow-hidden px-6 md:px-24">
        {/* Statement 1 */}
        <div
          ref={text2Ref}
          className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 text-left w-[calc(100%-3rem)] md:max-w-[800px] invisible"
        >
          <p className="mb-6 font-mono text-[10px] md:text-xs text-rose-500/90 tracking-[0.4em] uppercase">01 — Approach</p>
          <h2 className="text-[11vw] md:text-8xl font-black leading-[0.85] text-white tracking-tight uppercase drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            Built at the <br />
            <span className="italic font-serif font-normal text-rose-400 lowercase block mt-3 md:mt-4 ml-4 md:ml-12">
              edge of the possible
            </span>
          </h2>
          <p className="mt-8 font-mono text-[10px] md:text-xs text-white/60 tracking-[0.35em] uppercase max-w-sm">
            System Architecture · Full-Stack Engineering
          </p>
        </div>

        {/* Statement 2 */}
        <div
          ref={text3Ref}
          className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 text-right w-[calc(100%-3rem)] md:max-w-[800px] invisible"
        >
          <p className="mb-6 font-mono text-[10px] md:text-xs text-rose-500/90 tracking-[0.4em] uppercase">02 — Craft</p>
          <h2 className="text-[11vw] md:text-8xl font-black leading-[0.85] text-white tracking-tight uppercase drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            Code as a <br />
            <span className="italic font-serif font-normal text-white/70 lowercase block mt-3 md:mt-4 mr-4 md:mr-12">
              competitive edge
            </span>
          </h2>
          <div className="mt-10 h-px w-24 bg-white/30 ml-auto" />
          <p className="mt-6 text-white/75 text-sm md:text-lg leading-relaxed max-w-md ml-auto">
            From scalable cloud architectures to mission-critical IoT firmware — I bridge the gap between
            high-level logic and low-level hardware.
          </p>
          <div className="mt-8 flex justify-end pointer-events-auto">
            <a
              href="/Mohammed%20Aadil.pdf"
              download="Mohammed_Aadil_Resume.pdf"
              className="inline-flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-md hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full text-white/85 hover:text-white transition-colors duration-300 group"
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Download Resume</span>
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-rose-700 transition-colors duration-300">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
