import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
    const services = [
        { title: "Design Engineering", desc: "Crafting visually striking, conversion-optimized interfaces that feel seamless and modern. Bridging the gap between UI perfection and code.", num: "01" },
        { title: "Creative WebGL", desc: "Pushing the boundaries of the browser with immersive Three.js and Canvas experiences that provide an unforgettable wow factor.", num: "02" },
        { title: "Motion & Interaction", desc: "Bringing static pages to life. Fluid scroll interactions, GSAP timelines, and physics-based Framer Motion orchestration.", num: "03" },
        { title: "Founder @ Nexora", desc: "Leading a Neo Developer Studio focused on shipping premium web products for high-growth brands and luxury businesses.", num: "04" },
    ];

    return (
        <section id="services" className="relative w-full bg-[#080808] py-32 px-4 md:px-12 lg:px-24 z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                <div className="md:w-1/3">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="sticky top-32"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">Capabilities</p>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white">
                            Developer <br/><span className="text-white/40 italic font-light">Ecosystem</span>
                        </h2>
                    </motion.div>
                </div>
                
                <div className="md:w-2/3 flex flex-col gap-12 mt-12 md:mt-0">
                    {services.map((srv, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group border-b border-white/10 pb-12 cursor-pointer"
                        >
                            <div className="flex gap-4 items-start">
                                <span className="text-white/30 font-mono text-xs mt-3">{srv.num}</span>
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 group-hover:translate-x-4 transition-transform duration-500 ease-out">{srv.title}</h3>
                                    <p className="text-white/50 text-base md:text-lg max-w-lg leading-relaxed">{srv.desc}</p>
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
