import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const NavBar = ({ isProjectOpen }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = ['About', 'Services', 'Projects'];

  return (
    <>
      {/* SVG Filter for Liquid Metal (Gooey) Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="liquid-metal-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={(hidden || isProjectOpen) ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 flex items-center justify-between px-6 md:px-12 py-6 ${
          isScrolled 
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-4' 
            : 'bg-transparent border-b border-transparent py-8'
        }`}
      >
        {/* Brand / Logo */}
        <div className="flex-1 flex items-center">
          <a href="#" className="inline-flex items-center text-white text-xs md:text-sm font-bold tracking-[0.2em] outline-none cursor-none group">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white/70 tracking-[0.3em]">MOHAMMED AADIL.</span>
            <div className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </a>
        </div>

        {/* Absolute Center Links (Liquid Metal Nav System) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className="relative flex items-center gap-1 p-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-xl shadow-2xl">
            
            {/* Liquid Background Layer */}
            <div 
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
              style={{ filter: 'url(#liquid-metal-goo)' }}
            >
              <AnimatePresence mode="popLayout">
                {hoveredIndex !== null && (
                  <motion.div
                    key="pill"
                    layoutId="liquid-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8
                    }}
                    className="absolute h-full rounded-full"
                    style={{
                      // Calculate width and center manually since layoutId handles position
                      width: `${100 / navLinks.length}%`,
                      left: `${(hoveredIndex * 100) / navLinks.length}%`,
                      background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 40%, #9ca3af 50%, #d1d5db 60%, #ffffff 100%)',
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {/* Metallic Shine Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shine_3s_infinite]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interaction Layer (Text) */}
            {navLinks.map((item, i) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative z-10 px-6 py-2.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 outline-none cursor-none rounded-full
                  ${hoveredIndex === i ? 'text-black' : 'text-white/50 hover:text-white'}
                `}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex-1 flex justify-end">
          <a 
            href="https://nexora-devstudio.vercel.app/" 
            target="_blank" 
            rel="noreferrer" 
            className="relative group overflow-hidden px-8 py-3.5 border border-white/20 rounded-full cursor-none outline-none transition-colors duration-500 hover:border-white/40"
          >
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
            <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-white mix-blend-difference">
              Nexora Studio
            </span>
          </a>
        </div>
      </motion.header>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          20%, 100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};

export default NavBar;

