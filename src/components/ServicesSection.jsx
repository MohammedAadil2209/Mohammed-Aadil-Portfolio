import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
    const capabilities = [
        {
            title: "Design Engineering",
            desc: "Crafting high-performance, visually immersive interfaces that balance aesthetics with real-world usability. Focused on building scalable UI systems that feel fluid, responsive, and production-ready.",
            num: "01"
        },
        {
            title: "Creative WebGL",
            desc: "Building immersive browser experiences using Three.js and Canvas. Creating cinematic scroll interactions, 3D environments, and GPU-accelerated visuals that elevate user engagement beyond traditional web design.",
            num: "02"
        },
        {
            title: "Motion & Interaction",
            desc: "Engineering smooth, physics-driven animations using GSAP and modern motion systems. Designing scroll-based storytelling experiences with precision timing, depth, and seamless transitions.",
            num: "03"
        },
        {
            title: "IoT & Embedded Systems",
            desc: "Developing intelligent systems that bridge hardware and software. Experienced in sensor integration, real-time data flow, and connecting embedded systems to scalable web applications.",
            num: "04"
        },
        {
            title: "AI Integration",
            desc: "Applying artificial intelligence concepts to real-world systems, including anomaly detection, smart automation, and data-driven decision-making within IoT and web platforms.",
            num: "05"
        },
        {
            title: "Founder @ Nexora",
            desc: "Leading a modern development studio focused on building premium digital products. Delivering high-quality web solutions with a strong emphasis on performance, design, and user experience.",
            num: "06"
        }
    ];

    return (
        <section id="services" className="relative w-full bg-[#121212] py-40 px-6 md:px-12 lg:px-24 z-20 border-t border-white/[0.03]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 md:gap-32">
                
                {/* Left Side: Sticky Header */}
                <div className="md:w-1/3">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="sticky top-40"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/90">
                            Capabilities
                        </h2>
                        <div className="w-12 h-[2px] bg-emerald-500 mt-8 opacity-50" />
                    </motion.div>
                </div>
                
                {/* Right Side: Stacked Vertical List */}
                <div className="md:w-2/3 flex flex-col pt-4">
                    {capabilities.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative border-b border-white/[0.06] pb-14 mb-14 cursor-none"
                        >
                            {/* Hover Ambient Glow */}
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -mx-6 px-6 rounded-2xl" />
                            
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start relative z-10">
                                <span className="text-emerald-500/60 font-mono text-sm tracking-widest mt-2 shrink-0 md:w-12">
                                    {item.num}
                                </span>
                                <div className="flex flex-col gap-4 transform group-hover:translate-x-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <h3 className="text-3xl md:text-4xl font-medium text-white/90 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;
