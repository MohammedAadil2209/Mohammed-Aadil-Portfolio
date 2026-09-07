import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Wrench } from 'lucide-react';

const SKILLS = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invertDark: true },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Embedded Systems", IconElement: Cpu },
  { name: "Industrial Automation", IconElement: Wrench },
  { name: "IoT", IconElement: Wifi },
  { name: "C Programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" }
];

const LogoLoop = () => {
  // Triplicate the array to ensure the screen is filled and loops perfectly
  const loopItems = [...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 select-none z-20 border-t border-b border-white/5">
      {/* Gradient overlays to create fade effect on the edges */}
      <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      
      {/* 
        By moving the container x by exactly 33.33% 
        we shift exactly one set of SKILLS out of view.
        Since we have 3 sets, it loops seamlessly. 
      */}
      <div className="flex w-max">
        <motion.div
          className="flex items-center gap-16 md:gap-32 w-max pr-16 md:pr-32"
          style={{ willChange: "transform" }}
          animate={{ x: "-33.33%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40, 
            ease: "linear",
          }}
        >
          {loopItems.map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center gap-6 hover-magnetic group cursor-default p-4 rounded-2xl transition-all duration-500 hover:bg-white/[0.02]"
            >
              {skill.icon ? (
                 <img 
                   src={skill.icon} 
                   alt={skill.name} 
                   className={`w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-700 ease-out 
                     ${skill.invertDark ? 'invert opacity-20 group-hover:opacity-100' : 'grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 scale-90 group-hover:scale-110 drop-shadow-none group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`} 
                 />
              ) : skill.IconElement ? (
                 <skill.IconElement className="w-12 h-12 md:w-16 md:h-16 text-white/30 group-hover:text-rose-700 group-hover:scale-110 transition-all duration-700 ease-out" strokeWidth={1.5} />
              ) : null}
              <span className="text-3xl md:text-5xl font-black tracking-tighter text-white/10 group-hover:text-white transition-all duration-700 whitespace-nowrap uppercase">
                {skill.name}
              </span>
              
              {/* Subtle line indicator */}
              <div className="w-0 group-hover:w-12 h-px bg-rose-800 transition-all duration-700 opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoLoop;
