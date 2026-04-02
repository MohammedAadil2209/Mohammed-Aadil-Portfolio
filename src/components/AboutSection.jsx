import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

const AboutSection = () => {
  const containerRef = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Initial states
    gsap.set(text2Ref.current, { x: -100, opacity: 0, filter: 'blur(10px)' });
    gsap.set(text3Ref.current, { x: 100, opacity: 0, filter: 'blur(10px)' });

    // Step 2 & 3 stagger sequence
    tl.to(text2Ref.current, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5 })
      .to(text2Ref.current, { x: 150, opacity: 0, filter: 'blur(15px)', duration: 1.5 })
      .to(text3Ref.current, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5 }, "-=1")
      .to(text3Ref.current, { opacity: 0, filter: 'blur(10px)', duration: 1.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent -mt-[400vh] z-10 pointer-events-none">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden px-4 md:px-24 font-sans text-center">
        
        {/* Step 2 */}
        <div ref={text2Ref} className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 text-left w-[90%] md:max-w-[800px]">
          <h2 className="text-4xl md:text-8xl font-black leading-[0.8] text-white tracking-tight uppercase">
            Built at the <br/>
            <span className="italic font-serif font-light text-emerald-500 lowercase opacity-80 block mt-4 ml-6 md:ml-12">edge of the possible</span>
          </h2>
          <p className="mt-8 font-mono text-[10px] md:text-xs text-white/40 tracking-[0.4em] uppercase max-w-sm">
            Technical Architect // Independent Freelance Strategy
          </p>
        </div>

        {/* Step 3 */}
        <div ref={text3Ref} className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 text-right w-[90%] md:max-w-[800px]">
          <h2 className="text-4xl md:text-8xl font-black leading-[0.85] text-white tracking-tight uppercase">
            Code as a <br/>
            <span className="italic font-serif font-light text-white/40 lowercase block mt-4 mr-6 md:mr-12">commercial weapon</span>
          </h2>
          <div className="mt-12 h-px w-24 bg-white/20 ml-auto" />
          <p className="mt-6 text-white/30 font-serif italic text-sm md:text-base leading-relaxed max-w-sm ml-auto">
            From zero-lag WebGL to industrial IoT firmware. I solve the heavy technical debt so you don't have to.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
