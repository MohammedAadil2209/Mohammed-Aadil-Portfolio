import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin reading-progress bar pinned to the top of the viewport. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[150] origin-left bg-gradient-to-r from-rose-900 via-rose-600 to-rose-400 pointer-events-none"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
