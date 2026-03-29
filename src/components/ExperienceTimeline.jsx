import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { X, ArrowRight, Award } from 'lucide-react';
import devArenaCert from '../../certificates/DEV ARENA HACKATHON.jpeg';
import iitMadrasCert from '../../certificates/IIT MADRAS WORKSHOP.png';
import nationalsummitcert from '../../certificates/NATIONAL SUMMIT ON BENFITS AND CHALLENEGES OF AI IN HUMAN WELLBEING.png';


const EVENTS = [
  {
  id: 1,
  title: "NATIONAL SUMMIT ON BENEFITS AND CHALLENGES OF AI IN HUMAN WELLBEING",
  organization: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
  type: "National Summit",
  tag: "AI & IoT Enabled Smart Waste Management System | 23rd - 24th September, 2025",

  overview: "Participated in the National Summit on Benefits and Challenges of AI in Human Wellbeing at B.S. Abdur Rahman Crescent Institute of Science and Technology, where the focus was on exploring how artificial intelligence can be leveraged to improve human life while addressing its ethical and societal challenges. As part of the summit, I was involved in presenting and understanding an AI & IoT Enabled Smart Waste Management System, which emphasized the integration of intelligent technologies to optimize waste collection, monitoring, and sustainability practices in urban environments. The event provided a platform to engage with innovative ideas, real-world applications, and discussions around the balance between technological advancement and human wellbeing.",

  role: "Engineered the communication logic linking physical hardware sensors (embedded systems) to a centralized architecture, and developed a real-time responsive web dashboard for safety managers to track live diagnostics and AI-triggered alerts.",

  learnings: [
    "Hardware-to-Cloud synchronization and latency optimization",
    "Real-time data visualization and dashboard telemetry",
    "Interfacing AI anomaly detection logic with physical sensors",
    "Rapid prototyping of physical-digital dual architectures"
  ],

  skills: [
    "Embedded Systems",
    "IoT",
    "React.js",
    "Data Visualization",
    "AI Integration",
    "Fast Prototyping"
  ],

  impact: "Gained significant exposure to building end-to-end industrial tech where software directly impacts human safety, successfully bridging my deep hardware knowledge with accessible frontend dashboards.",

  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",

  certificate: nationalsummitcert, // replace with your actual certificate import   

  gallery: [

    // AI / Data Visualization Dashboard
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",

    // Smart City / IoT Network
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",

    // Team / Collaboration (Summit vibe)
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
  ]
},
    {
    id: 2,
    title: "IoT & Robotics Workshop",
    organization: "IIT Madras",
    type: "Workshop",
    tag: "Hands-on Learning | 4th - 5th October, 2025",
    overview: "An intensive, hands-on workshop hosted at IIT Madras focusing on the critical intersection of applied robotics and Internet of Things (IoT) systems. The program bridged the gap between theoretical electronics and practical hardware engineering.",
    role: "Actively programmed microcontrollers, engineered sensor data pipelines, and collaborated within a technical team to assemble, wire, and deploy a fully functional robotic prototype.",
    learnings: [
        "Embedded C programming principles",
        "Real-time sensor data acquisition",
        "Actuator control mechanisms",
        "Serial communication protocols"
    ],
    skills: ["IoT", "Robotics", "Embedded C", "Hardware Integration", "Problem Solving"],
    impact: "Fundamentally altered my approach to software architecture by exposing me to the physical constraints of hardware, enabling me to design more robust, full-stack systems.",
    heroImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2000&auto=format&fit=crop",
    certificate: iitMadrasCert,   
    gallery: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "DEV Arena Hackathon",
    organization: "SRM Easwari Engineering College",
    type: "24 - Hour Hackathon",
    tag: "AI & Embedded Systems | 16th - 17th October, 2025",
    overview: "Formulated and deployed an 'AI-Powered Worker Safety Management System' designed for high-risk industrial environments. The solution actively monitored workplace hazards using hardware integration to prevent on-site accidents.",
    role: "Engineered the communication logic linking physical hardware sensors (embedded systems) to a centralized architecture, and developed a real-time responsive web dashboard for safety managers to track live diagnostics and AI-triggered alerts.",
    learnings: [
        "Hardware-to-Cloud synchronization and latency optimization",
        "Real-time data visualization and dashboard telemetry",
        "Interfacing AI anomaly detection logic with physical sensors",
        "Rapid prototyping of physical-digital dual architectures"
    ],
    skills: ["Embedded Systems", "IoT", "React.js", "Data Visualization", "AI Integration", "Fast Prototyping"],
    impact: "Gained significant exposure to building end-to-end industrial tech where software directly impacts human safety, successfully bridging my deep hardware knowledge with accessible frontend dashboards.",
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
    certificate: devArenaCert,
    gallery: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  
];

const TimelineCard = ({ event, index, setSelectedEvent }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0); y.set(0);
    };

    return (
        <motion.div 
            className={`relative flex w-full mb-24 md:mb-32 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 top-1/2 -translate-x-[4px] md:-translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-5 md:h-5 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] z-20 border-2 border-[#121212]" />

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedEvent(event)}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={`w-full md:w-[45%] pl-8 md:pl-0 cursor-none hover-magnetic group ${index % 2 === 1 ? 'md:pl-16' : 'md:pr-16'}`}
            >
               <motion.div layoutId={`card-${event.id}`} className="relative w-full rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden transform-gpu backdrop-blur-md p-6 md:p-8 group-hover:bg-white-[0.08] transition-colors duration-500 cursor-none">
                   <div style={{ transform: "translateZ(40px)" }}>
                      <p className="text-emerald-400 text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-4 opacity-80">{event.tag}</p>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-white/50 mb-6 font-medium text-sm md:text-base border-l border-white/20 pl-4">{event.organization}</p>
                      
                      {/* Image Preview Window inside card */}
                      <motion.div layoutId={`image-${event.id}`} className="w-full h-32 md:h-56 rounded-2xl overflow-hidden relative border border-white/5">
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent transition-opacity duration-500 z-10" />
                         <img src={event.heroImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />
                         
                         {/* Card Bottom Read More action */}
                         <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <span className="text-[10px] uppercase tracking-widest font-bold">Read Case Study</span>
                            <ArrowRight className="w-3 h-3" />
                         </div>
                      </motion.div>
                   </div>
               </motion.div>
               {/* Glow behind card */}
               <div className="absolute inset-0 -z-10 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

const ExperienceTimeline = () => {
    const containerRef = useRef(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef, offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Handle ESC key for modal closing cleanly
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedEvent(null);
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedEvent]);

    return (
        <section id="experience" ref={containerRef} className="relative w-full bg-[#050505] py-32 px-4 md:px-12 lg:px-24 z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-32 flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white flex flex-col items-center justify-center">
                        <ScrollFloat text="Journey &" className="mr-3 md:mr-5" />
                        <ScrollFloat text="Achievements." className="italic text-white/40 mr-3 md:mr-5" delay={0.2} />
                    </h2>
                    <p className="max-w-md text-white/50 mt-8 leading-relaxed">A documented trail of real-world problem-solving, competitive technical expansion, and relentless hands-on learning.</p>
                </div>

                <div className="relative w-full">
                    <div className="absolute left-[1px] md:left-1/2 top-0 bottom-0 w-[1px] md:w-[1px] bg-white/10 md:-translate-x-1/2" />
                    <motion.div 
                        className="absolute left-[0.5px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-400 to-transparent md:-translate-x-1/2 origin-top shadow-[0_0_20px_rgba(16,185,129,0.8)]" 
                        style={{ scaleY }} 
                    />

                    <div className="flex flex-col relative z-10 w-full pl-0">
                        {EVENTS.map((event, i) => (
                            <TimelineCard key={event.id} event={event} index={i} setSelectedEvent={setSelectedEvent} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Immersive Case Study Modal View */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-12 cursor-none backdrop-blur-2xl bg-[#050505]/90"
                    >
                        <motion.button 
                            className="absolute top-6 right-6 md:top-12 md:right-12 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 z-[210] hover-magnetic outline-none cursor-none"
                            onClick={() => setSelectedEvent(null)}
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                        
                        <motion.div 
                            layoutId={`card-${selectedEvent.id}`}
                            className="relative w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-[2rem] bg-[#0a0a0a] md:border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col cursor-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide" data-lenis-prevent>
                                 {/* Hero Header Region */}
                                 <div className="relative w-full h-[50vh] md:h-[60vh] shrink-0">
                                     <motion.img layoutId={`image-${selectedEvent.id}`} src={selectedEvent.heroImage} className="w-full h-full object-cover" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
                                     <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                                         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}>
                                            <p className="text-emerald-400 font-semibold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-4 flex items-center gap-3">
                                                {selectedEvent.type} <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" /> {selectedEvent.organization}
                                            </p>
                                            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-tight">{selectedEvent.title}</h2>
                                         </motion.div>
                                     </div>
                                 </div>

                                 {/* Rich Content Grid */}
                                 <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                                     {/* Left Column Data (Storytelling) */}
                                     <div className="md:col-span-7 flex flex-col gap-16">
                                         <motion.div initial={{opacity:0, y: 20}} whileInView={{opacity:1, y:0}} viewport={{once: true}} transition={{delay: 0.1}}>
                                             <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2"><span className="w-2 h-[1px] bg-emerald-500" /> Overview</h4>
                                             <p className="text-white/90 text-xl leading-relaxed font-light">{selectedEvent.overview}</p>
                                         </motion.div>

                                         <motion.div initial={{opacity:0, y: 20}} whileInView={{opacity:1, y:0}} viewport={{once: true}} transition={{delay: 0.2}}>
                                             <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2"><span className="w-2 h-[1px] bg-emerald-500" /> My Role & Participation</h4>
                                             <p className="text-white/80 text-lg leading-relaxed">{selectedEvent.role}</p>
                                         </motion.div>
                                         
                                         <motion.div initial={{opacity:0, y: 20}} whileInView={{opacity:1, y:0}} viewport={{once: true}} transition={{delay: 0.3}}>
                                             <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2"><span className="w-2 h-[1px] bg-emerald-500" /> Outcome / Impact</h4>
                                             <p className="text-white/80 text-lg leading-relaxed italic border-l-2 border-emerald-500/50 pl-6 py-2 bg-gradient-to-r from-emerald-500/5 to-transparent">{selectedEvent.impact}</p>
                                         </motion.div>
                                     </div>

                                     {/* Right Column Data (Metrics & Skills) */}
                                     <div className="md:col-span-5 flex flex-col gap-12">
                                         <motion.div initial={{opacity:0, x: 20}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{delay: 0.4}}>
                                             <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">Skills Acquired</h4>
                                             <div className="flex flex-wrap gap-2">
                                                 {selectedEvent.skills.map(skill => (
                                                     <span key={skill} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-emerald-100 text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-colors duration-300">
                                                         {skill}
                                                     </span>
                                                 ))}
                                             </div>
                                         </motion.div>

                                         <motion.div initial={{opacity:0, x: 20}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{delay: 0.5}} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                                             <h4 className="text-emerald-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">Key Technical Learnings</h4>
                                             <ul className="flex flex-col gap-5">
                                                 {selectedEvent.learnings.map(learning => (
                                                     <li key={learning} className="flex gap-4 items-start text-white/70 text-sm leading-relaxed">
                                                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-1.5" />
                                                         {learning}
                                                     </li>
                                                 ))}
                                             </ul>
                                         </motion.div>

                                         {/* Certificate Action Button */}
                                         <motion.a 
                                             href={selectedEvent.certificate} 
                                             target="_blank" 
                                             rel="noreferrer"
                                             initial={{opacity:0, scale: 0.95}} whileInView={{opacity:1, scale: 1}} viewport={{once: true}} transition={{delay: 0.6}}
                                             className="flex items-center gap-6 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 group cursor-none hover-magnetic outline-none"
                                         >
                                             <div className="w-14 h-14 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#050505] transition-colors duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                                 <Award className="w-6 h-6" />
                                             </div>
                                             <div className="flex flex-col">
                                                 <span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Official Document</span>
                                                 <span className="text-white text-sm md:text-base font-semibold group-hover:text-white/80 transition-colors">View Certificate Image ↗</span>
                                             </div>
                                         </motion.a>
                                     </div>
                                 </div>

                                 {/* Visual Proof / Certificate Gallery */}
                                 <div className="p-8 md:p-16 border-t border-white/5 mt-8 mb-24 bg-[#121212]/50">
                                    <motion.div initial={{opacity:0, y: 30}} whileInView={{opacity:1, y:0}} viewport={{once: true}}>
                                        <h4 className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8 text-center md:text-left">Visual Proof & Event Gallery</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {selectedEvent.gallery.map((img, i) => (
                                                <div key={i} className="rounded-3xl overflow-hidden aspect-[4/3] md:aspect-video border border-white/10 group cursor-none relative">
                                                    <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1s] ease-[0.16,1,0.3,1]" alt="Event visual evidence" />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                 </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ExperienceTimeline;
