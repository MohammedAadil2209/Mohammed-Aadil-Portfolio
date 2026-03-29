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
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-medium leading-[1.2] md:leading-tight text-white/90 tracking-tighter drop-shadow-xl">
            Architecting scalable <br/>
            <span className="italic font-light text-white/40 block mt-1 md:mt-0">digital & physical ecosystems</span>
          </h2>
        </div>

        {/* Step 3 */}
        <div ref={text3Ref} className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 text-right w-[90%] md:max-w-[800px]">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-medium leading-[1.2] md:leading-[1.1] text-white/90 tracking-tighter drop-shadow-xl">
            Harmonizing UI design, <br/>
            <span className="italic font-light text-white/40 w-full md:max-w-[600px] ml-auto block mt-1 md:mt-0">systems logic, and IoT hardware</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
