import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingContactBtn = () => {
  return (
    <motion.a
      href="https://wa.me/919976939641?text=Hi%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you."
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] w-14 h-14 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] cursor-none hover-magnetic group outline-none"
    >
        {/* Continuous Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-50 animate-ping group-hover:scale-150 transition-transform duration-700" style={{ animationDuration: '3s' }} />
        <MessageCircle strokeWidth={2} className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
    </motion.a>
  );
};

export default FloatingContactBtn;
