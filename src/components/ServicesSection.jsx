import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ScrollFloat from './ScrollFloat';

const CapabilityCard = ({ item, i }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border-b border-white/[0.06] pb-16 mb-16 cursor-none overflow-hidden"
        >
            {/* Magnetic Spotlight Effect */}
            <motion.div 
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(136, 19, 55, 0.1), rgba(136, 19, 55, 0) 80%)`
                    )
                }}
            />
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start relative z-10">
                {/* Large Background Numeral */}
                <span className="absolute -right-4 -top-8 text-[12rem] font-black text-white/[0.02] pointer-events-none select-none group-hover:text-rose-800/[0.03] transition-colors duration-1000 uppercase">
                    {item.num}
                </span>

                <span className="text-rose-800/60 font-mono text-[10px] tracking-[0.4em] mt-2 shrink-0 md:w-16 uppercase">
                    {item.num} //
                </span>
                
                <div className="flex flex-col gap-6 transform group-hover:translate-x-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        {item.title}
                    </h3>
                    <p className="text-white/40 text-base md:text-xl leading-relaxed max-w-2xl font-light font-serif italic border-l border-white/5 pl-8">
                        {item.desc}
                    </p>
                </div>
            </div>
            
            {/* Sub-reveal indicator */}
            <div className="mt-12 h-px w-0 group-hover:w-full bg-gradient-to-r from-rose-800/50 to-transparent transition-all duration-1000 ease-out" />
        </motion.div>
    );
};

const ServicesSection = () => {
    const capabilities = [
        {
            title: "Full-Stack Product Engineering",
            desc: "Architecting end-to-end digital ecosystems. From high-performance React frontends to scalable Node/Python backends, I build systems that are commercially robust and technically elite.",
            num: "01"
        },
        {
            title: "Hardware & Embedded Systems",
            desc: "Bridging the physical-digital divide. Expert-led IoT firmware (C++/Arduino), PCB orchestration, and sensor data stabilization using advanced filtering algorithms.",
            num: "02"
        },
        {
            title: "Cloud Infrastructure & IoT",
            desc: "Designing resilient cloud backbones for real-time telemetry. Expert in MQTT, WebSocket protocols, and low-latency command centers that link thousands of hardware nodes to global dashboards.",
            num: "03"
        },
        {
            title: "Interactive Systems & WebGL",
            desc: "Pushing the boundaries of browser-based physics. Engineering custom raf-driven motion engines and GLSL shaders to create high-retention, cinematic digital experiences.",
            num: "04"
        },
        {
            title: "System Design & Consulting",
            desc: "High-level strategic intervention for complex technical debt. I specialize in system scalability, database optimization, and future-proofing commercial architectures.",
            num: "05"
        },
        {
            title: "Full-Stack Automation",
            desc: "Streamlining workflows through custom internal tools and DevOps pipelines. Reducing operational overhead by automating the bridge between business logic and technical execution.",
            num: "06"
        }
    ];

    return (
        <section id="services" className="relative w-full bg-[#0a0a0a] py-48 px-6 md:px-12 lg:px-24 z-20 border-t border-white/[0.03]">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                
                <div className="w-full mb-32 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-24">
                    <div className="flex-1">
                        <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter text-white uppercase leading-[0.8]">
                            <ScrollFloat text="Core" />
                            <span className="italic font-serif font-light text-white/20 lowercase block mt-4">capabilities.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-white/30 text-[10px] uppercase tracking-[0.4em] leading-relaxed font-mono text-right">
                        Capabilities // Solving complex commercial challenges through elite independent engineering.
                    </p>
                </div>
                
                <div className="w-full grid grid-cols-1 gap-12 pt-4">
                    {capabilities.map((item, i) => (
                        <CapabilityCard key={i} item={item} i={i} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;
