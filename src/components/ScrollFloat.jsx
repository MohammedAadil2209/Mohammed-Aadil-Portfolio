import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ScrollFloat = ({ text, className, containerClassName, delay = 0 }) => {
  // Split on words instead of characters to match typical elegant text reveals
  const words = useMemo(() => text.split(' '), [text]);

  const containerVars = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: delay 
      } 
    }
  };

  const wordVars = {
    hidden: { y: 60, opacity: 0, rotateX: 20 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      transition: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 1.2 } 
    }
  };

  return (
    <motion.div 
      className={`inline-flex flex-wrap gap-x-4 gap-y-2 ${containerClassName || ''}`}
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-flex">
          <motion.span 
            className={className} 
            variants={wordVars}
            style={{ display: "inline-block", transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default ScrollFloat;
