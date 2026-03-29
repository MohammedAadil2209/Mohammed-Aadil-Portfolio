import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ progress, isLoaded }) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <motion.div className="text-white text-6xl md:text-8xl font-medium tracking-tighter">
              {Math.round(progress)}%
            </motion.div>
            <div className="mt-8 w-48 h-[2px] bg-white/20 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-xs tracking-widest uppercase text-white/50">
              Loading Sequence
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
