import React from 'react';
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
  // Three copies; the CSS marquee shifts exactly one copy (33.333%) per loop.
  const loopItems = [...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <section
      aria-label="Technologies"
      className="group/marquee relative w-full overflow-hidden bg-[#050505] py-16 md:py-24 select-none z-20 border-y border-white/5"
    >
      <div className="absolute top-0 left-0 w-16 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Pure CSS transform animation: runs on the compositor, no JS per frame */}
      <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
        {loopItems.map((skill, index) => (
          <div
            key={index}
            aria-hidden={index >= SKILLS.length ? 'true' : undefined}
            className="flex items-center gap-4 md:gap-6 mr-12 md:mr-24 group"
          >
            {skill.icon ? (
              <img
                src={skill.icon}
                alt=""
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                className={`w-10 h-10 md:w-14 md:h-14 object-contain transition-[opacity,filter] duration-500 ${
                  skill.invertDark
                    ? 'invert opacity-30 group-hover:opacity-100'
                    : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100'
                }`}
              />
            ) : skill.IconElement ? (
              <skill.IconElement className="w-10 h-10 md:w-14 md:h-14 text-white/35 group-hover:text-rose-500 transition-colors duration-500" strokeWidth={1.5} />
            ) : null}
            <span className="text-2xl md:text-5xl font-black tracking-tighter text-white/15 group-hover:text-white transition-colors duration-500 whitespace-nowrap uppercase">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoLoop;
