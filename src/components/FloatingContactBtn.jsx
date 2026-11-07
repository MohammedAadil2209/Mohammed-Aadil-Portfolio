import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingContactBtn = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, 'change', (y) => {
    const vh = window.innerHeight;
    const contact = document.getElementById('contact');
    // Hidden on the hero (its own CTAs) and inside Contact (which has a WhatsApp card).
    const inContact = contact ? contact.getBoundingClientRect().top < vh * 0.75 : false;
    setVisible(y > vh * 0.6 && !inContact);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="fab"
          href="https://wa.me/919976939641?text=Hi%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you."
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="fab fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 bg-rose-700 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(136,19,55,0.45)] hover-magnetic group"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-rose-600 opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
          <MessageCircle strokeWidth={2} className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactBtn;
