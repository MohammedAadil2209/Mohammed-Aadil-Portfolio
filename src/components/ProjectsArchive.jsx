import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import ProjectDetails from './ProjectDetails';
import { scrollToTarget } from '../lib/smoothScroll';

const ProjectCard = ({ title, category, index, image, isStared, onOpen }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current || e.pointerType === 'touch') return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            onClick={onOpen}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpen();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={'Open project: ' + title}
            className="block group rounded-[2rem] md:rounded-[2.5rem]"
        >
            <motion.div
                ref={cardRef}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] rounded-[2rem] md:rounded-[2.5rem] bg-[#0c0c0c] border border-white/[0.07] group-hover:border-white/15 transition-colors duration-700 overflow-hidden isolate"
            >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 opacity-50 group-hover:opacity-90 transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                </div>

                {isStared && (
                    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-amber-400/25 text-amber-300">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Featured</span>
                    </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end z-20 pointer-events-none" style={{ transform: "translateZ(60px)" }}>
                    <div className="flex flex-col gap-3 md:group-hover:-translate-y-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-400 bg-rose-800/15 px-3 py-1 rounded-full border border-rose-700/25">Case Study</span>
                            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/55">{category}</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">{title}</h3>
                    </div>

                    <div className="mt-6 md:mt-8 overflow-hidden">
                        <p className="text-white/60 text-xs tracking-widest uppercase flex items-center gap-3 md:translate-y-10 md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            View Case Study <span className="w-8 h-px bg-rose-600 group-hover:w-16 transition-[width] duration-700" />
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
        </div>
    );
};

const DomainTile = ({ onClick, image, eyebrow, eyebrowClass, title, hoverClass }) => (
    <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 0.985 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative w-full h-[340px] sm:h-[400px] md:h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/[0.07] group text-left bg-[#0c0c0c] transition-[border-color,box-shadow] duration-700 ${hoverClass}`}
    >
        <div className="absolute inset-0 z-0">
            <img
                src={image}
                alt=""
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-60 transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
                decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10 pointer-events-none">
            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-4 ${eyebrowClass}`}>{eyebrow}</span>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">{title}</h3>
            <p className="mt-6 inline-flex items-center gap-3 text-white/60 text-[10px] uppercase tracking-widest md:translate-y-6 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-[transform,opacity] duration-700">
                Explore <span aria-hidden="true">→</span>
            </p>
        </div>
    </motion.button>
);

const PROJECTS = [
    {
        title: "Le Bros Cafe",
        category: "Client Project · Web",
        type: "web",
        link: "https://www.lebroscafe.com/",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=70&w=1400&auto=format&fit=crop",
        isLive: true,
        isStared: true
    },
    {
        title: "RESQER",
        category: "AI Emergency Response · Techathon Winner",
        type: "web",
        link: "#",
        image: "/gallery/techathon/resqer-command-center.jpg",
        isStared: true
    },
    {
        title: "The Long Story",
        category: "Client Project · Web",
        type: "web",
        link: "https://longstoryrestaurant.vercel.app/",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=70&w=1400&auto=format&fit=crop"
    },
    {
        title: "The Space",
        category: "Client Project · Web",
        type: "web",
        link: "https://space-restaurant.vercel.app/",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=70&w=1400&auto=format&fit=crop"
    },
    {
        title: "AR Associate",
        category: "Corporate Solution",
        type: "web",
        link: "https://arassociate.vercel.app/",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=70&w=1400&auto=format&fit=crop"
    },
    {
        title: "Gesture Control Robot [Nexora]",
        category: "Gesture Control · Award Winner",
        type: "iot",
        link: "https://nexora-devstudio.vercel.app/",
        image: "/gallery/techfusion/prototype.jpg",
        isStared: true
    },
    {
        title: "ResQer InfraSight",
        category: "AI Inspection Rover · CresIgnite 2nd Prize",
        type: "iot",
        link: "#",
        image: "/gallery/cresignite/infrasight-rover.jpg",
        isStared: true
    },
    {
        title: "Water Level Monitor",
        category: "IoT · Cloud Integration",
        type: "iot",
        link: "#",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=70&w=1400&auto=format&fit=crop",
        isStared: false
    },
    {
        title: "Obstacle Detection Robot",
        category: "Robotics · ESP32 Embedded",
        type: "iot",
        link: "#",
        image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=70&w=1400&auto=format&fit=crop"
    }
];

const ProjectsArchive = ({ onProjectStateChange }) => {
    const [view, setView] = useState("portal"); // "portal" | "web" | "iot"
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const sectionRef = useRef(null);

    const filteredProjects = PROJECTS.filter(p => p.type === view);
    const currentProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

    const changeView = (next) => {
        setView(next);
        // Bring the section top into view so the new grid isn't entered mid-page.
        if (sectionRef.current) scrollToTarget(sectionRef.current, { offset: -40, duration: 1 });
    };

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
        <section ref={sectionRef} id="projects" className="relative w-full bg-[#050505] py-24 md:py-48 px-5 md:px-12 lg:px-24 z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait" initial={false}>
                    {view === "portal" ? (
                        <motion.div
                            key="portal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            <div className="mb-16 md:mb-24">
                                <p className="mb-6 font-mono text-[10px] md:text-xs text-rose-500/90 tracking-[0.4em] uppercase">Selected Work</p>
                                <h2 className="text-6xl md:text-[12vw] font-black tracking-tighter text-white leading-[0.85] uppercase flex flex-col">
                                    <ScrollFloat text="Featured" />
                                    <span className="text-white/25 italic font-normal font-serif lowercase mt-2">works.</span>
                                </h2>
                                <p className="mt-8 text-white/50 text-[10px] md:text-xs uppercase tracking-[0.35em] font-mono max-w-lg leading-relaxed">
                                    Digital and hardware solutions delivered for real clients and competitions.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 h-auto md:h-[70vh]">
                                <DomainTile
                                    onClick={() => changeView("web")}
                                    image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=70&w=1400&auto=format&fit=crop"
                                    eyebrow="Web · Solutions Engineering"
                                    eyebrowClass="text-rose-400"
                                    title={<>Web <br /> Development</>}
                                    hoverClass="hover:border-rose-700/40 hover:shadow-[0_0_50px_rgba(136,19,55,0.2)]"
                                />
                                <DomainTile
                                    onClick={() => changeView("iot")}
                                    image="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=70&w=1400&auto=format&fit=crop"
                                    eyebrow="IoT · Embedded Ecosystems"
                                    eyebrowClass="text-cyan-400"
                                    title={<>Integrated <br /> Systems</>}
                                    hoverClass="hover:border-cyan-700/40 hover:shadow-[0_0_50px_rgba(6,182,212,0.12)]"
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="project-grid"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <button
                                type="button"
                                onClick={() => changeView("portal")}
                                className="mb-10 inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/10 transition-colors group"
                            >
                                <span className="w-6 h-px bg-rose-600 group-hover:w-10 transition-[width]" /> All Categories
                            </button>

                            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                                <h2 className="flex-1 text-5xl md:text-[10vw] font-black tracking-tighter text-white uppercase flex flex-col leading-tight">
                                    Selected
                                    <span className="text-white/25 italic font-normal font-serif lowercase leading-none">
                                        {view === "web" ? "web works." : "iot systems."}
                                    </span>
                                </h2>
                                <p className="max-w-sm text-white/50 text-[10px] uppercase tracking-[0.35em] leading-relaxed font-mono">
                                    {view === "web"
                                        ? "Production websites shipped for paying clients."
                                        : "Embedded, robotics and IoT builds — from prototype to podium."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 [perspective:1200px]">
                                {filteredProjects.map((project, i) => (
                                    <div key={project.title} className={i % 2 !== 0 ? "md:mt-48" : ""}>
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
