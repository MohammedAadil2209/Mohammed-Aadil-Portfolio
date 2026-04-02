import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, ExternalLink, Globe, Layout, Cpu, Palette, Star } from 'lucide-react';

const ProjectDetails = ({ project, isOpen, onClose, onNext, onPrev }) => {
    const [galleryIndex, setGalleryIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setGalleryIndex(0);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const nextImage = () => {
        if (!projectData.gallery) return;
        setGalleryIndex((prev) => (prev + 1) % projectData.gallery.length);
    };

    if (!project) return null;

    const details = {
        "Le Bros Cafe": {
            description: "High-end digital infrastructure for a premium commercial client. Built to handle massive concurrent traffic while maintaining a strict 60fps 'Awwwards' aesthetic.",
            challenge: "Achieving complex motion storytelling without the heavy weight of standard frameworks or laggy CSS transitions.",
            solution: "Bypassed standard CSS engines for a custom raf-based render loop, ensuring visual updates remain locked to the display's vertical sync for peak fluidity.",
            stats: [
                { label: "LCP Score", value: "0.2s" },
                { label: "Stability", value: "99.9%" },
                { label: "Paint", value: "0.1s" }
            ],
            stack: ["Custom GLSL", "Vanilla JS", "GSAP Ticker Engine"],
            gallery: [
                { url: "/progress.png", label: "Initial Wireframe & UI" },
                { url: "/delivery.png", label: "Final Production Build" },
                { url: "/handshake.png", label: "Client Handover Success" }
            ]
        },
        "The Long Story": {
            description: "Luxury restobar platform where I was tasked with orchestrating heavy visual assets with zero framework overhead. Performance as the primary design driver.",
            challenge: "Loading 80MB+ of high-def visual content without impacting Time to Interactive (TTI).",
            solution: "Designed a custom asset recycler and lazy-loading pool. Memory is dynamically reclaimed for off-viewport elements, keeping the heap footprint minimal.",
            stats: [
                { label: "LCP", value: "0.8s" },
                { label: "Memory", value: "-60%" },
                { label: "Speed", value: "Instant" }
            ],
            stack: ["Intersection Observer", "Asset Recycler", "WebP Optimization"]
        },
        "Water Level Monitor": {
            description: "Industrial IoT node built for real-time fluid logistics. This is a field-ready monitoring architecture synced to the cloud.",
            challenge: "Environmental interference causing jitter in ultrasonic distance data. Standard smoothing filters were insufficient.",
            solution: "Implemented an ESP32-based node with a moving-average Kalman filter to stabilize the 40kHz ultrasonic signal. Tuned duty cycles for deep-sleep to reach 3-month autonomy.",
            stats: [
                { label: "Precision", value: "±2mm" },
                { label: "Sync Latency", value: "<1s" },
                { label: "Autonomy", value: "3 Mo" }
            ],
            stack: ["ESP32", "Blynk IoT", "Embedded C++", "Sleep Logic"]
        },
        "Obstacle Detection Robot": {
            description: "Autonomous robotics project focused on high-speed environment mapping and hazard avoidance through low-latency hardware logic.",
            challenge: "Standard servo sweeping is too slow for real-time avoidance at speed—processing lag creates collision risks.",
            solution: "Developed an asynchronous 'Interrupt-driven' scan. The ESP32 processes vectors while the servo is in motion, adjusting PWM levels to the L298N master in real-time.",
            stats: [
                { label: "Reaction", value: "15ms" },
                { label: "Scan Arc", value: "180°" },
                { label: "Mode", value: "Async Scan" }
            ],
            stack: ["PWM Engine", "Vector Logic", "H-Bridge Control", "ESP32"]
        },
        "default": {
            description: "Bespoke digital solution architected as a freelance consultant, focusing on scalability and performance.",
            challenge: "Translating complex client requirements into an intuitive and fast digital product.",
            solution: "Hardware-accelerated rendering and modern state management architectures.",
            stats: [
                { label: "Performance", value: "High" },
                { label: "Uptime", value: "99%" },
                { label: "Security", value: "SSL" }
            ],
            stack: ["Vite", "Modern Architecture", "Freelance"]
        }
    };

    const projectData = details[project.title] || details["default"];

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    key={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-3xl cursor-none"
                >
                    <motion.div 
                        initial={{ y: 30, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0, scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-5xl h-[90vh] bg-[#0c0c0c]/80 border border-white/10 rounded-[2rem] shadow-3xl flex flex-col md:flex-row overflow-hidden isolate cursor-default"
                    >
                        {/* Elegant Close Button Only */}
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[320] p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-500 hover:rotate-90"
                        >
                            <X size={18} />
                        </button>

                        {/* Image Half */}
                        <div className="w-full md:w-[40%] h-[30vh] md:h-auto relative overflow-hidden flex-shrink-0">
                           <motion.img 
                               initial={{ scale: 1.1, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               transition={{ duration: 1 }}
                               src={project.image} 
                               className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent hidden md:block" />
                           
                           {/* Subtle Navigation at bottom of image on desktop */}
                           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 bg-[#0c0c0c]/40 border border-white/10 p-1 rounded-full backdrop-blur-xl">
                                <button onClick={onPrev} className="p-3 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
                                    <ArrowLeft size={16} />
                                </button>
                                <button onClick={onNext} className="p-3 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
                                    <ArrowRight size={16} />
                                </button>
                           </div>
                        </div>

                        {/* Content Half */}
                        <div className="w-full md:w-[60%] p-8 md:p-12 lg:p-16 overflow-y-auto flex flex-col scrollbar-hide">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Project Detail</span>
                                    {project.isStared && (
                                        <span className="flex items-center gap-2 text-[9px] uppercase font-black text-yellow-500 px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                                            <Star size={10} fill="currentColor" /> Stared Flagship
                                        </span>
                                    )}
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 uppercase">
                                    {project.title}
                                </h2>
                                
                                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light italic">
                                    "{projectData.description}"
                                </p>

                                {/* Journey Gallery: Animated Flip Stack */}
                                {projectData.gallery && (
                                    <div className="mb-10">
                                        <p className="text-[10px] uppercase tracking-widest text-white/20 mb-6 font-black">Interactive Journey //</p>
                                        <div className="relative w-full h-[180px] perspective-[1000px] flex items-center justify-center group" onClick={nextImage}>
                                            <AnimatePresence mode="popLayout">
                                                <motion.div
                                                    key={galleryIndex}
                                                    initial={{ rotateY: 90, opacity: 0, x: 50 }}
                                                    animate={{ rotateY: 0, opacity: 1, x: 0 }}
                                                    exit={{ rotateY: -90, opacity: 0, x: -50 }}
                                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                                    className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer"
                                                >
                                                    <img src={projectData.gallery[galleryIndex].url} alt="Gallery" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" />
                                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                                                        <span className="text-[9px] text-white font-black uppercase tracking-[0.2em]">{projectData.gallery[galleryIndex].label}</span>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                            
                                            {/* Indicators */}
                                            <div className="absolute -bottom-6 flex gap-1">
                                                {projectData.gallery.map((_, i) => (
                                                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === galleryIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-6 mb-12 border-y border-white/5 py-8">
                                    {projectData.stats.map((stat, i) => (
                                        <div key={i}>
                                            <p className="text-[10px] uppercase tracking-widest text-white/20 mb-1 font-black leading-none uppercase">{stat.label}</p>
                                            <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-12 mb-12">
                                    {/* Problem Statement */}
                                    <div className="group/item">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-px bg-emerald-500/50" />
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">The Challenge //</h4>
                                        </div>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                                            {projectData.challenge}
                                        </p>
                                    </div>

                                    {/* Solution Proposed */}
                                    <div className="group/item">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-px bg-blue-500/50" />
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Proposed Solution //</h4>
                                        </div>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-light font-serif italic">
                                            {projectData.solution}
                                        </p>
                                    </div>

                                    {/* Tools & Stack */}
                                    <div className="group/item">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-8 h-px bg-purple-500/50" />
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Technical Stack //</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {projectData.stack.map((item, i) => (
                                                <span key={i} className="px-4 py-2 bg-white/[0.03] border border-white/5 text-[9px] uppercase font-black tracking-widest text-white/60 rounded-full group-hover/item:border-white/20 transition-all">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-auto border-t border-white/5">
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest text-center rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
                                    Launch Project
                                </a>
                                <button onClick={onNext} className="flex-1 px-8 py-4 border border-white/10 text-white/50 text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-all">
                                    Next Works
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetails;
