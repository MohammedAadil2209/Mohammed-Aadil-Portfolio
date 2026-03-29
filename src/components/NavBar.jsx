import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Check if scrolled past hero to apply glass effect
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide nav on scroll down, show on scroll up for a cinematic, immersive feel
    if (latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = ['About', 'Services', 'Projects'];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 flex items-center justify-between px-6 md:px-12 py-6 ${
        isScrolled 
          ? 'bg-[#050505]/70 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-4' 
          : 'bg-transparent border-b border-transparent py-8'
      }`}
    >
      {/* Brand / Logo */}
      <div className="flex-1 flex items-center">
        <a href="#" className="inline-flex items-center text-white text-xs md:text-sm font-bold tracking-[0.2em] outline-none cursor-none group">
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white/70">MOHAMMED AADIL.</span>
          {/* Subtle glow behind logo on hover */}
          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </a>
      </div>

      {/* Absolute Center Links (Pill Nav System) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 p-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-xl shadow-2xl pointer-events-auto">
        {navLinks.map((item, i) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative px-6 py-2.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-500 outline-none cursor-none rounded-full"
          >
            <span className="relative z-10">{item}</span>
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.span
                  layoutId="nav-pill"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  className="absolute inset-0 bg-white/10 rounded-full z-0 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </a>
        ))}
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
  );
};

export default NavBar;
