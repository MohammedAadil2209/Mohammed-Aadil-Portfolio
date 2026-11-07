import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], .hover-magnetic, [data-cursor-point]';
// Only devices with a real mouse/trackpad get the custom cursor. Touch phones,
// tablets and hybrid devices in touch mode keep their native behaviour.
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 1200, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 1200, mass: 0.3 });
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 450, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 450, mass: 0.5 });

  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove('has-custom-cursor');
      return undefined;
    }
    root.classList.add('has-custom-cursor');

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const over = (e) => {
      const hit = !!(e.target && e.target.closest && e.target.closest(INTERACTIVE));
      setIsHovering(hit);
    };
    const leave = () => setIsVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerleave', leave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
          borderColor: isHovering ? 'rgba(244,63,94,0.6)' : 'rgba(255,255,255,0.35)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
      />
    </>
  );
};

export default CustomCursor;
