import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, ArrowUpRight, Instagram, Github, Linkedin, Clock, MapPin } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

const CONTACT_LINKS = [
  {
    id: "whatsapp",
    title: "Chat on WhatsApp",
    subtitle: "+91 9976939641",
    icon: MessageCircle,
    color: "from-green-500/20 to-emerald-900/20 text-emerald-400 group-hover:bg-emerald-500",
    href: "https://wa.me/919976939641?text=Hi%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you."
  },
  {
    id: "email",
    title: "Send Email",
    subtitle: "mm.aadil786@gmail.com",
    icon: Mail,
    color: "from-blue-500/20 to-indigo-900/20 text-blue-400 group-hover:bg-blue-500",
    href: "mailto:mm.aadil786@gmail.com?subject=Portfolio%20Inquiry&body=Hi,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
  },
  {
    id: "phone",
    title: "Call Now",
    subtitle: "+91 9976939641",
    icon: Phone,
    color: "from-purple-500/20 to-fuchsia-900/20 text-purple-400 group-hover:bg-purple-500",
    href: "tel:+919976939641"
  }
];

const ContactSection = () => {
    const [time, setTime] = useState("");

    // Live India Clock
    useEffect(() => {
        const updateTime = () => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setTime(formatter.format(new Date()));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

  return (
    <section id="contact" className="relative w-full bg-[#050505] pt-32 px-4 md:px-12 lg:px-24 z-20 border-t border-white/5 overflow-hidden">
      {/* Background ambient glow matching #121212 / glassmorphism */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between h-full">
        <div>
            <div className="mb-24 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-6 flex flex-col items-center justify-center uppercase leading-[0.85]">
                    <ScrollFloat text="Solving technical" className="mr-2 md:mr-4" />
                    <span className="italic font-serif font-light text-white/30 lowercase mt-4 tracking-normal">debt & system scale.</span>
                </h2>
                <div className="h-px w-24 bg-white/20 my-10" />
                <p className="text-white/40 max-w-lg mt-6 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase leading-relaxed text-center">
                    Direct access for high-load web architecture, <br/> 
                    advanced IoT firmware, and bespoke freelance strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-[1000px]">
            {CONTACT_LINKS.map((contact, i) => (
                <motion.a 
                    key={contact.id}
                    href={contact.href}
                    target={contact.id === "whatsapp" ? "_blank" : "_self"}
                    rel="noreferrer"
                    initial={{ hover: 0 }}
                    whileHover={{ hover: 1 }}
                    className={`relative group overflow-hidden rounded-[32px] p-[1px] cursor-none outline-none block mb-12 `}
                >
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${contact.color.split(' ')[0]} ${contact.color.split(' ')[1]}`} />
                
                <div className="relative h-[250px] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-[40px] rounded-[31px] border border-white/[0.05] p-8 flex flex-col justify-between overflow-hidden transition-colors duration-500 group-hover:border-white/10 group-hover:bg-white/[0.06]">
                    
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ${contact.color.split(' ')[2]} transition-colors duration-500 group-hover:text-white group-hover:bg-${contact.id === 'whatsapp' ? 'emerald' : contact.id === 'email' ? 'blue' : 'purple'}-500/20`}>
                            <contact.icon strokeWidth={1.5} className="w-6 h-6" />
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-xl">
                            <ArrowUpRight strokeWidth={1.5} className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{contact.title}</h3>
                        <p className="text-xs text-emerald-400/90 tracking-[0.2em] font-mono uppercase">{contact.subtitle}</p>
                    </div>
                </div>
                </motion.a>
            ))}
            </div>
        </div>

        {/* Elite Footer Engine */}
        <div className="mt-20 flex flex-col">
            
            {/* Split Grid for Details */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 pb-12 border-b border-white/[0.05]">
                
                {/* Location & Time block */}
                <div className="flex flex-col gap-6 text-left w-full md:w-auto">
                    <div className="flex items-center gap-4">
                        <img 
                            src="/profile.jpeg" 
                            alt="Aadil" 
                            className="w-14 h-16 rounded-lg object-cover border border-white/20 shadow-lg shrink-0"
                        />
                        <div>
                            <p className="text-white font-medium text-xl leading-none tracking-tight">Mohammed Aadil</p>
                            <p className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mt-2 w-full max-w-[200px] md:max-w-none">Full-Stack Developer | AI & IoT Systems</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] inline-flex flex-col md:flex-row gap-6 md:items-center backdrop-blur-md self-start">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
                                <MapPin size={14} className="text-white/60" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-0.5">Location</span>
                                <span className="text-sm text-white/80 font-medium tracking-tight">Chennai, India</span>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/10" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
                                <Clock size={14} className="text-white/60" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-0.5">Local Time</span>
                                <span className="text-sm text-white/80 font-medium tracking-tight whitespace-nowrap">
                                    {time || "Loading..."} IST
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Socials Block */}
                <div className="flex flex-col gap-4 self-start md:self-end">
                    <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase text-left md:text-right">Social Profiles</p>
                    <div className="flex gap-4 items-center flex-wrap">
                        <a 
                            href="https://github.com/MohammedAadil2209" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-none shrink-0"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                        
                        <a 
                            href="https://www.linkedin.com/in/mohammed-aadil-049b29322" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-3.5 rounded-2xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-none shrink-0"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                        </a>

                        <a 
                            href="https://ig.me/m/mm.aadil007" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-500 hover:bg-pink-500/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-none shrink-0"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Massive Typographic Signature */}
            <div className="w-full text-center overflow-hidden py-8 select-none pointer-events-none flex justify-center items-center">
                <h1 className="text-[14vw] md:text-[11vw] font-black text-white/[0.03] leading-[0.8] tracking-tighter">
                    MOHAMMED AADIL
                </h1>
            </div>

            {/* Absolute Bottom Strip */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center pb-8 pt-4 gap-4">
                <p className="text-white/20 text-[10px] md:text-xs tracking-widest uppercase text-center md:text-left">
                    © {new Date().getFullYear()} Mohammed Aadil. All Rights Reserved.
                </p>
                <div className="flex items-center gap-6">
                    <p className="text-white/30 text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-2 font-semibold">
                         <span className="relative flex h-2 w-2">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                         </span>
                         Available For Work
                    </p>
                </div>
            </div>
            
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
