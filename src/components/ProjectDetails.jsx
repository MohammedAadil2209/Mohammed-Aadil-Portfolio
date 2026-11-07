import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Star, Users } from 'lucide-react';
import useScrollLock from '../lib/useScrollLock';

const ProjectDetails = ({ project, isOpen, onClose, onNext, onPrev }) => {
    const [galleryIndex, setGalleryIndex] = useState(0);

    useScrollLock(isOpen);

    // Reset the gallery when switching projects
    useEffect(() => {
        setGalleryIndex(0);
    }, [project?.title]);

    // Keyboard: Esc closes, arrows switch projects
    useEffect(() => {
        if (!isOpen) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') onNext();
            else if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose, onNext, onPrev]);

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
                { url: "/progress.webp", label: "Initial Wireframe & UI" },
                { url: "/delivery.webp", label: "Final Production Build" },
                { url: "/handshake.webp", label: "Client Handover Success" }
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
        "Nexora GS-1": {
            team: "Team Nexora · with Rahil Syed & Abdul Mateen Danish",
            description: "An advanced human-robot interaction system using 21-point hand landmarker tracking for zero-latency gesture control in sterile or hazardous environments.",
            challenge: "Stabilizing robotic motion from jittery hand data while maintaining high inference speed and industrial-grade accuracy.",
            solution: "Engineered a three-phase architecture: Perception (MediaPipe), Logic (Flask-SocketIO), and Actuation (Arduino), stabilized by a custom HCFV filter.",
            stats: [
                { label: "Inference", value: "32ms" },
                { label: "Accuracy", value: "98.4%" },
                { label: "Command", value: "4ms" }
            ],
            stack: ["MediaPipe", "Socket.IO", "Flask", "React", "Arduino", "HCFV Filter"],
            gallery: [
                { url: "/gallery/techfusion/interface.jpg", label: "Tactical HUD" },
                { url: "/gallery/techfusion/login.jpg", label: "Secure Access" },
                { url: "/gallery/techfusion/prototype.jpg", label: "Hardware Architecture" }
            ]
        },
        "The Space": {
            description: "An immersive, high-conversion digital experience for a luxury concept restaurant, prioritizing atmospheric storytelling and instant booking.",
            challenge: "Creating a cinematic web experience that loads instantly on mobile without compromising on visual fidelity or smooth parallax effects.",
            solution: "Optimized the entire asset pipeline using AVIF/WebP formats and implemented a custom lazy-loading strategy that prioritizes above-the-fold storytelling elements.",
            stats: [
                { label: "LCP Score", value: "0.6s" },
                { label: "SEO Score", value: "100%" },
                { label: "Bookings", value: "+25%" }
            ],
            stack: ["Framer Motion", "Vite", "Image Proxying", "React"]
        },
        "RESQER": {
            team: "Team Nexora · with Rahil Syed",
            description: "AI-powered emergency response and disaster coordination platform that turns scattered emergency reports into actionable intelligence. Built from scratch in 3 hours and awarded 1st Place at TECHATHON '26.",
            challenge: "During floods, fires and urban crises, distress reports arrive scattered and unstructured, and responders can't tell what is most urgent or where to send help first.",
            solution: "A dual-interface system: a panic-proof Citizen Portal (report, speak, or send a silent one-tap alert) feeds an AI triage engine that scores severity and population impact, while a Command Center shows live incidents on a zone map and recommends the next response actions.",
            stats: [
                { label: "Build Time", value: "3 hrs" },
                { label: "Result", value: "1st" },
                { label: "Interfaces", value: "2" }
            ],
            stack: ["AI Triage Engine", "Citizen Portal", "Command Center", "Geospatial Map", "Scenario Simulation"],
            gallery: [
                { url: "/gallery/techathon/resqer-command-center.jpg", label: "Command Center" },
                { url: "/gallery/techathon/resqer-citizen-app.jpg", label: "Citizen Portal" },
                { url: "/gallery/techathon/pitch-architecture.jpg", label: "Dual-Interface Architecture" },
                { url: "/gallery/techathon/award-ceremony.jpg", label: "1st Place - TECHATHON '26" }
            ]
        },
        "ResQer InfraSight": {
            team: "Team Nexora · with Rahil Syed",
            description: "Intelligent infrastructure inspection system that goes beyond detecting defects: it understands their severity and risk and predicts what needs attention first. Won 2nd Prize at CresIgnite (Project Expo 2K26).",
            challenge: "Road inspection is slow and manual, and simply spotting a pothole or crack doesn't tell a municipality how dangerous it is, how fast it will get worse, or what to fix first.",
            solution: "A camera rover runs YOLO defect detection with OpenCV, fused with GPS, MPU6050 and ultrasonic readings. Each defect gets an Infrastructure DNA profile, AI-driven risk prioritisation and a predictive-maintenance forecast in a live municipal dashboard: Detect → Understand → Predict → Act.",
            stats: [
                { label: "Result", value: "2nd" },
                { label: "Sensors", value: "3 + Cam" },
                { label: "Pipeline", value: "4 Stage" }
            ],
            stack: ["YOLO", "OpenCV", "Sensor Fusion", "GPS", "MPU6050", "Ultrasonic", "Predictive Maintenance"],
            gallery: [
                { url: "/gallery/cresignite/infrasight-rover.jpg", label: "Inspection Rover" },
                { url: "/gallery/cresignite/infrasight-vision-pipeline.jpg", label: "Live Vision Pipeline" },
                { url: "/gallery/cresignite/infrasight-gis-radar.jpg", label: "GIS Radar & Infrastructure DNA" },
                { url: "/gallery/cresignite/infrasight-predictive-decay.jpg", label: "Predictive Deterioration" },
                { url: "/gallery/cresignite/award-ceremony.jpg", label: "2nd Prize - CresIgnite" }
            ]
        },
        "AR Associate": {
            description: "A specialized SaaS platform for AR (Accounts Receivable) automation, designed to streamline corporate debt recovery and field agent tracking.",
            challenge: "Synchronizing high-frequency field agent data with a centralized ERP while maintaining data integrity across spotty network connections.",
            solution: "Implemented a robust Offline-First architecture using IndexedDB for local persistence and a background sync worker that reconciles transactions once connectivity is restored.",
            stats: [
                { label: "Sync Latency", value: "<2s" },
                { label: "Uptime", value: "99.9%" },
                { label: "Efficiency", value: "+40%" }
            ],
            stack: ["React", "Node.js", "IndexedDB", "PostgreSQL", "Worker Threads"]
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

    const DETAIL_ALIASES = { "Gesture Control Robot [Nexora]": "Nexora GS-1" };
    const projectData = details[DETAIL_ALIASES[project.title] || project.title] || details["default"];
    const isIoT = project.type === 'iot';

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    key={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-sm"
                >
                    <motion.div 
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        initial={{ y: 30, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0, scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-5xl h-full md:h-[90vh] bg-[#0c0c0c] md:bg-[#0c0c0c]/80 border-none md:border md:border-white/10 rounded-none md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden isolate"
                    >
                        {/* Elegant Close Button Only */}
                        <button 
                            onClick={onClose}
                            aria-label="Close project"
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-[320] p-3.5 md:p-4 rounded-full bg-black/50 md:bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/15 text-white transition-[background-color,transform] duration-500 hover:rotate-90"
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
                                alt=""
                                className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent hidden md:block" />
                           
                           {/* Subtle Navigation at bottom of image on desktop */}
                           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 bg-[#0c0c0c]/40 border border-white/10 p-1 rounded-full backdrop-blur-xl">
                                <button onClick={onPrev} aria-label="Previous project" className="p-3 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
                                    <ArrowLeft size={16} />
                                </button>
                                <button onClick={onNext} aria-label="Next project" className="p-3 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
                                    <ArrowRight size={16} />
                                </button>
                           </div>
                        </div>

                        {/* Content Half */}
                        <div className="w-full md:w-[60%] p-6 md:p-12 lg:p-16 overflow-y-auto overscroll-contain flex flex-col bg-[#0c0c0c]" data-lenis-prevent>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-rose-700 bg-rose-800/10 px-2.5 py-1 rounded">Project Detail</span>
                                    {project.isStared && (
                                        <span className="flex items-center gap-2 text-[9px] uppercase font-black text-yellow-500 px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                                            <Star size={10} fill="currentColor" /> Featured
                                        </span>
                                    )}
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 uppercase">
                                    {project.title}
                                </h2>
                                
                                {projectData.team && (
                                    <p className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80 text-xs font-medium">
                                        <Users size={14} className="text-rose-400" aria-hidden="true" />
                                        {projectData.team}
                                    </p>
                                )}

                                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light italic">
                                    "{projectData.description}"
                                </p>

                                {/* Journey Gallery: Animated Flip Stack */}
                                {projectData.gallery && (
                                    <div className="mb-10">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-6 font-bold">Gallery · tap to browse</p>
                                        <div className="relative w-full h-[200px] md:h-[220px] [perspective:1000px] flex items-center justify-center group cursor-pointer" onClick={nextImage} role="button" tabIndex={0} aria-label="Next gallery image" onKeyDown={(e) => e.key === 'Enter' && nextImage()}>
                                            <AnimatePresence mode="popLayout">
                                                <motion.div
                                                    key={galleryIndex}
                                                    initial={{ rotateY: 90, opacity: 0, x: 50 }}
                                                    animate={{ rotateY: 0, opacity: 1, x: 0 }}
                                                    exit={{ rotateY: -90, opacity: 0, x: -50 }}
                                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                                    className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer"
                                                >
                                                    <img src={projectData.gallery[galleryIndex].url} alt={projectData.gallery[galleryIndex].label} decoding="async" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" />
                                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                                                        <span className="text-[9px] text-white font-black uppercase tracking-[0.2em]">{projectData.gallery[galleryIndex].label}</span>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                            
                                            {/* Indicators */}
                                            <div className="absolute -bottom-6 flex gap-1">
                                                {projectData.gallery.map((_, i) => (
                                                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === galleryIndex ? 'w-8 bg-rose-800' : 'w-2 bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-6 mb-12 border-y border-white/5 py-8">
                                    {projectData.stats.map((stat, i) => (
                                        <div key={i}>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold leading-none">{stat.label}</p>
                                            <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-12 mb-12">
                                    {/* Problem Statement */}
                                    <div className="group/item">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-px bg-rose-800/50" />
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">The Challenge //</h4>
                                        </div>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                                            {projectData.challenge}
                                        </p>
                                    </div>

                                    {/* Solution Proposed */}
                                    <div className="group/item">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-px bg-blue-500/50" />
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Proposed Solution //</h4>
                                        </div>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-light font-serif italic">
                                            {projectData.solution}
                                        </p>
                                    </div>

                                    {/* Tools & Stack */}
                                    <div className="group/item">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-8 h-px bg-purple-500/50" />
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Technical Stack //</h4>
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
                                {!isIoT && project.link !== "#" && (
                                    <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest text-center rounded-full hover:bg-rose-800 hover:text-white transition-all shadow-xl">
                                        Launch Project
                                    </a>
                                )}
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
