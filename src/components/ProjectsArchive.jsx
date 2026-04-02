import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import ProjectDetails from './ProjectDetails';

const ProjectCard = ({ title, category, link, index, image, isStared, onOpen }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div 
            onClick={onOpen}
            className="block outline-none cursor-none group"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: "preserve-3d", 
                    willChange: "transform" 
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative w-full h-[500px] rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 transition-all duration-700 overflow-hidden isolate"
            >
                {/* Background Image Container */}
                <div className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 opacity-40 group-hover:opacity-100 grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none opacity-80" />
                </div>

                {/* Stared Indicator */}
                {isStared && (
                    <div className="absolute top-8 right-8 z-30 p-2.5 bg-yellow-500/10 backdrop-blur-md rounded-full border border-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)] animate-pulse">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20 pointer-events-none" style={{ transform: "translateZ(60px)" }}>
                    <div className="flex flex-col gap-3 group-hover:-translate-y-4 transition-transform duration-700">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Case Study</span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40">{category}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">{title}</h3>
                    </div>
                    
                    <div className="mt-8 overflow-hidden">
                       <p className="text-white/40 text-xs tracking-widest uppercase flex items-center gap-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                           View Deep Dive <span className="w-8 h-px bg-emerald-500 group-hover:w-16 transition-all duration-700" />
                       </p>
                    </div>
                </div>
                
                {/* Visual Polish: Glass Shine on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
        </div>
    );
};

const ProjectsArchive = ({ onProjectStateChange }) => {
    const [view, setView] = useState("portal"); // "portal" | "web" | "iot"
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

    const projects = [
        { 
            title: "Le Bros Cafe", 
            category: "Freelance Architecture // Client Project", 
            type: "web",
            link: "https://www.lebroscafe.com/", 
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2400&auto=format&fit=crop",
            isLive: true,
            isStared: true
        },
        { 
            title: "The Long Story", 
            category: "Bespoke Web Solution // Paid Client", 
            type: "web",
            link: "https://longstoryrestaurant.vercel.app/", 
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" 
        },
        { 
            title: "The Space", 
            category: "Client Digital Asset", 
            type: "web",
            link: "https://space-restaurant.vercel.app/", 
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop" 
        },
        { 
            title: "AR Associate", 
            category: "Corporate Solution", 
            type: "web",
            link: "https://arassociate.vercel.app/", 
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
        },
        { 
            title: "Water Level Monitor", 
            category: "IoT // Cloud Integration", 
            type: "iot",
            link: "#", 
            image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000&auto=format&fit=crop",
            isStared: true
        },
        { 
            title: "Obstacle Detection Robot", 
            category: "Robotics // ESP32 Embedded", 
            type: "iot",
            link: "#", 
            image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2000&auto=format&fit=crop" 
        }
    ];

    const filteredProjects = projects.filter(p => p.type === view);
    const currentProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

    const handleOpen = (index) => {
        setSelectedProjectIndex(index);
        onProjectStateChange(true);
    };

    const handleClose = () => {
        setSelectedProjectIndex(null);
        onProjectStateChange(false);
    };

    const handleNext = () => {
        setSelectedProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    const handlePrev = () => {
        setSelectedProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    return (
        <section id="projects" className="relative w-full bg-[#050505] py-24 md:py-48 px-4 md:px-12 lg:px-24 z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {view === "portal" ? (
                        <motion.div 
                            key="portal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            className="w-full"
                        >
                            <div className="mb-24">
                                <h2 className="text-6xl md:text-[12vw] font-black tracking-tighter text-white leading-[0.85] uppercase flex flex-col">
                                    <ScrollFloat text="Selected" />
                                    <span className="text-white/20 italic font-light font-serif lowercase mt-2">works.</span>
                                </h2>
                                <p className="mt-8 text-white/30 text-[10px] md:text-xs uppercase tracking-[0.5em] font-mono max-w-lg">Freelance Architecture // Selected digital and hardware solutions delivered for commercial usage.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[70vh]">
                                <motion.div 
                                    onClick={() => setView("web")}
                                    whileHover={{ scale: 0.98 }}
                                    className="relative h-[400px] md:h-full rounded-[3rem] overflow-hidden border border-white/5 cursor-pointer group bg-[#0c0c0c]"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2400&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    </div>
                                    <div className="absolute inset-0 p-12 flex flex-col justify-end z-10 pointer-events-none text-left">
                                        <span className="text-emerald-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Web // Solutions Engineer</span>
                                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Web <br /> Development</h3>
                                        <p className="mt-6 text-white/40 text-[10px] uppercase tracking-widest translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">Enter Domain →</p>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    onClick={() => setView("iot")}
                                    whileHover={{ scale: 0.98 }}
                                    className="relative h-[400px] md:h-full rounded-[3rem] overflow-hidden border border-white/5 cursor-pointer group bg-[#0c0c0c]"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    </div>
                                    <div className="absolute inset-0 p-12 flex flex-col justify-end z-10 pointer-events-none">
                                        <span className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">IoT // Embedded Ecosystems</span>
                                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Integrated <br /> Systems</h3>
                                        <p className="mt-6 text-white/40 text-[10px] uppercase tracking-widest translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">Enter Domain →</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="project-grid"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 pt-16 relative">
                                {/* FIXED VISIBILITY: High-Contrast Back Button */}
                                <button 
                                    onClick={() => setView("portal")}
                                    className="absolute -top-10 left-0 flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] uppercase font-black tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/10 transition-all group z-50"
                                >
                                    <span className="w-6 h-px bg-emerald-500 group-hover:w-10 transition-all" /> Back to Base
                                </button>
                                
                                <div className="flex-1">
                                    <h2 className="text-5xl md:text-[10vw] font-black tracking-tighter text-white uppercase flex flex-col leading-tight">
                                        Selected
                                        <span className="text-white/20 italic font-light font-serif lowercase leading-none">
                                            {view === "web" ? "web works." : "iot systems."}
                                        </span>
                                    </h2>
                                </div>
                                <p className="max-w-sm text-white/30 text-[10px] uppercase tracking-[0.4em] leading-relaxed font-mono">
                                    Portfolio // Real-time systems architected as a freelance solution engineer.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 perspective-[1200px]">
                                {filteredProjects.map((project, i) => (
                                    <div key={i} className={i % 2 !== 0 ? "md:mt-48" : ""}>
                                        <ProjectCard 
                                            {...project} 
                                            index={i} 
                                            onOpen={() => handleOpen(i)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {selectedProjectIndex !== null && (
                <ProjectDetails 
                    project={currentProject} 
                    isOpen={selectedProjectIndex !== null} 
                    onClose={handleClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </section>
    );
};

export default ProjectsArchive;
