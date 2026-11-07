import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import useScrollLock from '../lib/useScrollLock';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const RESUME = { href: '/Mohammed%20Aadil.pdf', download: 'Mohammed_Aadil_Resume.pdf' };
const EASE = [0.16, 1, 0.3, 1];

/** Monogram + wordmark */
const Brand = ({ compact }) => (
  <a href="#top" className="group inline-flex items-center gap-3 shrink-0" aria-label="Mohammed Aadil, back to top">
    <span className="relative grid place-items-center w-9 h-9 rounded-full bg-white text-black text-[11px] font-black tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-8deg]">
      MA
      <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-[#0a0a0a]" />
    </span>
    <span
      className={`hidden sm:block text-white text-[11px] font-bold tracking-[0.28em] whitespace-nowrap transition-[opacity,max-width] duration-500 overflow-hidden ${
        compact ? 'xl:max-w-[200px] lg:max-w-0 lg:opacity-0 xl:opacity-100' : 'max-w-[200px] opacity-100'
      }`}
    >
      MOHAMMED AADIL
    </span>
  </a>
);

const NavBar = ({ isProjectOpen }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastY = useRef(0);
  const spyRaf = useRef(null);

  useScrollLock(isMobileMenuOpen);

  // Scroll-spy: the active section is the last one whose top has passed 40% of the viewport.
  const updateActive = () => {
    spyRaf.current = null;
    const line = window.innerHeight * 0.4;
    let current = null;
    for (const { id } of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    }
    setActive(current);
  };

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current;
    lastY.current = latest;
    setIsScrolled(latest > 40);
    if (Math.abs(delta) > 4) setHidden(delta > 0 && latest > 320);
    if (spyRaf.current === null) spyRaf.current = requestAnimationFrame(updateActive);
  });

  useEffect(() => () => spyRaf.current && cancelAnimationFrame(spyRaf.current), []);

  // Close the mobile menu on Escape or when resizing to desktop.
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener?.('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener?.('change', onMq);
    };
  }, [isMobileMenuOpen]);

  const headerHidden = (hidden || isProjectOpen) && !isMobileMenuOpen;
  const floating = isScrolled && !isMobileMenuOpen;
  const highlight = hovered ?? active;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: headerHidden ? '-130%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed top-0 inset-x-0 z-[120] pt-[env(safe-area-inset-top)] pointer-events-none"
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 border transition-[max-width,margin,padding,background-color,border-color,box-shadow,border-radius] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            floating
              ? 'max-w-[1100px] mt-3 mx-3 sm:mx-6 lg:mx-auto pl-2.5 pr-2.5 py-2 rounded-full bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]'
              : 'max-w-[1600px] mt-0 px-5 md:px-12 py-5 md:py-6 rounded-none bg-transparent border-transparent'
          }`}
        >
          <Brand compact={floating} />

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
              {NAV_LINKS.map(({ label, id }) => {
                const isOn = highlight === id;
                return (
                  <li key={id} className="relative">
                    {isOn && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                    <a
                      href={`#${id}`}
                      onMouseEnter={() => setHovered(id)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      aria-current={active === id ? 'true' : undefined}
                      className={`relative z-10 flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-300 ${
                        isOn || active === id ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {active === id && <span className="w-1 h-1 rounded-full bg-rose-500" aria-hidden="true" />}
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={RESUME.href}
              download={RESUME.download}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />
              </svg>
              Resume
            </a>

            <a
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-white text-black text-[13px] font-semibold transition-colors duration-300 hover:bg-rose-600 hover:text-white"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Let&apos;s talk
            </a>

            {/* Menu toggle (phones + tablets) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-white/[0.06] border border-white/15 hover:bg-white/10 transition-colors"
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 3.25 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="w-[18px] h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3.25 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="w-[18px] h-[1.5px] bg-white rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile / tablet drawer, below the header so the close button stays usable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] bg-[#050505] lg:hidden flex flex-col px-6 sm:px-12 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="group flex items-baseline justify-between py-4 border-b border-white/[0.07]"
                >
                  <span
                    className={`text-[clamp(2.25rem,11vw,4rem)] font-black tracking-tighter uppercase leading-none transition-colors ${
                      active === id ? 'text-rose-500' : 'text-white group-active:text-rose-500'
                    }`}
                  >
                    {label}
                  </span>
                  <span className="font-mono text-[10px] text-white/30 tracking-widest">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href={RESUME.href}
                download={RESUME.download}
                className="flex-1 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest text-center rounded-full"
              >
                Download Resume
              </a>
              <a
                href="https://nexora-devstudio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-4 border border-white/15 text-white text-sm font-bold uppercase tracking-widest text-center rounded-full"
              >
                Nexora Studio ↗
              </a>
            </motion.div>
            <p className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Available for work
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
