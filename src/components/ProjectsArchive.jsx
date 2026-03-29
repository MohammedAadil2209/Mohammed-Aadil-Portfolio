import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollFloat from './ScrollFloat';

const ProjectCard = ({ title, category, link, index, image }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

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
        <a href={link} target="_blank" rel="noreferrer" className="block outline-none">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative w-full h-[500px] rounded-[2rem] cursor-none group hover-magnetic"
            >
                <div className="absolute inset-0 rounded-[2rem] bg-[#1a1a1a] border border-white/10 transition-all duration-500 overflow-hidden transform-gpu" style={{ transform: "translateZ(50px)" }}>
                    <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <img 
                            src={image} 
                            alt={title} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 p-10 w-full z-20 pointer-events-none" style={{ transform: "translateZ(80px)" }}>
                    <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-xs tracking-[0.2em] font-semibold uppercase text-emerald-400 opacity-80">{category}</p>
                        <h3 className="text-4xl md:text-5xl font-medium text-white drop-shadow-md">{title}</h3>
                    </div>
                </div>
                
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 -z-10 bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
        </a>
    );
};

const ProjectsArchive = () => {
    const projects = [
        { title: "The Long Story", category: "Luxury Restobar", link: "https://longstoryrestaurant.vercel.app/", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" },
        { title: "The Space", category: "Family-friendly Cafe", link: "https://space-restaurant.vercel.app/", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop" },
        { title: "AR Associate", category: "Enterprise Platform", link: "https://arassociate.vercel.app/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" },
        { title: "Nexora Studio", category: "Developer Agency", link: "https://nexora-devstudio.vercel.app/", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" }
    ];

    return (
        <section id="projects" className="relative w-full bg-[#050505] py-32 px-4 md:px-12 lg:px-24 z-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white flex flex-col">
                        <ScrollFloat text="Selected" className="mr-3 md:mr-5" />
                        <ScrollFloat text="Works." className="italic text-white/40 mr-3 md:mr-5" delay={0.2} />
                    </h2>
                    <p className="max-w-sm text-white/50 text-right md:-mb-2">A showcase of premium digital experiences designed to convert and captivate.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 perspective-[1200px]">
                    {projects.map((project, i) => (
                        <div key={i} className={i % 2 !== 0 ? "md:mt-32" : ""}>
                            <ProjectCard {...project} index={i} />
                        </div>
                    ))}
                </div>
                
                {/* Bottom spacer for padding before ContactSection */}
                <div className="mt-24 pb-12" />
            </div>
        </section>
    );
};

export default ProjectsArchive;
