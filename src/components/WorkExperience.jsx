import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Building2, Calendar, MapPin, Cpu, Lightbulb, Users, Wrench, Trophy, Award } from 'lucide-react';

const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Robotics & Innovation Intern",
    company: "Edutainal Ventures",
    association: "Associated with Edutainal Maverick World",
    location: "India",
    duration: "May 2026 - Present",
    type: "Internship",
    description: "Leading the development of advanced robotic systems and embedded logic. Working at the intersection of AI and hardware to deliver high-performance automation solutions.",
    responsibilities: [
      "Architecting robotics and innovation-based projects from ground up",
      "Embedded systems engineering and firmware development",
      "AI-Integrated robotics and computer vision implementation",
      "Leading technical documentation and project prototyping",
      "Collaborating on high-stakes industrial automation solutions"
    ],
    techStack: ["Arduino", "Raspberry Pi", "Python", "C++", "IoT", "Embedded Systems", "AI/ML", "Robotics"],
    highlights: [
      { icon: Cpu, text: "Embedded Systems" },
      { icon: Lightbulb, text: "AI Innovation" },
      { icon: Users, text: "Team Lead" },
      { icon: Wrench, text: "Prototyping" }
    ]
  },
  {
    id: 2,
    role: "Industrial Automation Intern (Siemens S7-1200 PLC)",
    company: "Siemens Centre of Excellence (SCoE-MIT)",
    association: "Anna University, MIT Campus - Dept. of Instrumentation Engineering",
    location: "Chennai, India",
    duration: "29 June 2026 - 10 July 2026",
    type: "Internship",
    description: "Completed an intensive 100% physical offline summer internship program focused on Siemens S7-1200 PLC architecture, TIA Portal programming, and industrial mechatronics control.",
    responsibilities: [
      "Programmed Siemens S7-1200 PLCs using TIA Portal & Ladder Logic (LAD)",
      "Configured digital/analog I/O hardware, industrial sensors, relays, and actuators",
      "Engineered hardware-in-the-loop automation sequences and safety interlocks",
      "Executed hands-on lab practicals, theory assessments, and industrial project evaluation",
      "Achieved A+ Grade with an 89% overall score (Certificate No: 2026-IA-S3-07)"
    ],
    techStack: ["Siemens S7-1200 PLC", "TIA Portal", "Industrial Automation", "Ladder Logic", "Mechatronics", "Instrumentation"],
    highlights: [
      { icon: Cpu, text: "S7-1200 PLC" },
      { icon: Wrench, text: "TIA Portal" },
      { icon: Trophy, text: "A+ Grade (89%)" },
      { icon: Award, text: "SCoE MIT Campus" }
    ]
  }
];

const WorkTimelineItem = ({ exp, index }) => {
  return (
    <motion.div 
      className="relative flex w-full mb-32"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline Connector Dot */}
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-rose-700 z-20 border-4 border-[#050505] shadow-[0_0_15px_rgba(136,19,55,0.8)]" />

      <div className="pl-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="px-4 py-1.5 rounded-full bg-rose-800/10 border border-rose-800/20 text-rose-700 text-[10px] font-bold uppercase tracking-widest">
            {exp.duration}
          </div>
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-widest">
            <MapPin className="w-3 h-3" /> {exp.location}
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-rose-800/30 transition-all duration-700">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <Building2 className="w-5 h-5 text-rose-700" />
                <span className="text-white/60 font-medium uppercase tracking-widest text-xs">{exp.company}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">{exp.role}</h3>
              <p className="text-white/30 text-xs mb-8 italic tracking-wide">{exp.association}</p>
              
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-3xl">
                {exp.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {exp.responsibilities.map((task, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/50 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-800 mt-2 shrink-0" />
                    {task}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Side Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-64">
              {exp.highlights.map((h, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center gap-3 hover:bg-rose-800/5 transition-colors">
                  <h.icon className="w-6 h-6 text-rose-700" strokeWidth={1.5} />
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Briefcase className="w-5 h-5 text-rose-700" strokeWidth={1.5} />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase">Internship & Professional Experience</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </motion.div>

      {/* Timeline Vertical Line */}
      <div className="absolute left-[7.5px] top-4 bottom-0 w-px bg-white/10" />
      <motion.div 
        className="absolute left-[7.5px] top-4 bottom-0 w-px bg-rose-800 shadow-[0_0_10px_rgba(136,19,55,0.5)] origin-top"
        style={{ scaleY }}
      />

      <div className="flex flex-col">
        {WORK_EXPERIENCE.map((exp, i) => (
          <WorkTimelineItem key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
