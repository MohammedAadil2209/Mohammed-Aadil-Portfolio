import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutSection = () => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
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
    gsap.set(text1Ref.current, { y: 100, opacity: 0, filter: 'blur(10px)' });
    gsap.set(text2Ref.current, { x: -100, opacity: 0, filter: 'blur(10px)' });
    gsap.set(text3Ref.current, { x: 100, opacity: 0, filter: 'blur(10px)' });

    tl.to(text1Ref.current, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 })
      .to(text1Ref.current, { y: -100, opacity: 0, filter: 'blur(10px)', duration: 1 })
      .to(text2Ref.current, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, "-=0.5")
      .to(text2Ref.current, { x: 100, opacity: 0, filter: 'blur(10px)', duration: 1 })
      .to(text3Ref.current, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, "-=0.5")
      .to(text3Ref.current, { opacity: 0, duration: 1 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-transparent -mt-[400vh] z-10 pointer-events-none">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden px-8 md:px-24 font-sans text-center">
        
        <div ref={text1Ref} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Mohammed Aadil <br/>
            <span className="text-2xl md:text-4xl font-normal opacity-70 tracking-widest uppercase">Creative Developer</span>
          </h1>
        </div>

        <div ref={text2Ref} className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 text-left max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight text-white/90">
            I build immersive <br/>
            <span className="italic font-light text-white/50">digital experiences</span>
          </h2>
        </div>

        <div ref={text3Ref} className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 text-right max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight text-white/90">
            Bridging design, <br/>
            <span className="italic font-light text-white/50">code, and motion</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
