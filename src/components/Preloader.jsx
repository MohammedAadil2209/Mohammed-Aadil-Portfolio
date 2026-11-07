import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Minimal branded loader. Only the first hero frame gates it (the rest stream
 * in the background), so an indeterminate bar is more honest than a % counter.
 */
const Preloader = ({ isLoaded }) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.7, 0, 0.3, 1] } }}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#050505] pointer-events-none"
          role="status"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-6">
            <span className="text-white text-sm md:text-base font-bold tracking-[0.35em]">
              MOHAMMED AADIL<span className="text-rose-600">.</span>
            </span>
            <div className="relative w-40 h-px bg-white/10 overflow-hidden">
              <motion.span
                className="absolute inset-y-0 left-0 w-1/3 bg-white"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
