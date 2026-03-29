import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, ArrowUpRight } from 'lucide-react';
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
  return (
    <section id="contact" className="relative w-full bg-[#050505] pt-32 pb-12 px-4 md:px-12 lg:px-24 z-20 border-t border-white/5 overflow-hidden">
      {/* Background ambient glow matching #121212 / glassmorphism */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 flex flex-col items-center justify-center">
                <ScrollFloat text="Let's build the" className="mr-2 md:mr-4" />
                <ScrollFloat text="future together." delay={0.2} className="mr-2 md:mr-4" />
            </h2>
            <p className="text-white/40 max-w-md mt-6 font-medium tracking-wide">
                Reach out to discuss your next cinematic project, enterprise platform, or creative technical challenge.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-[1000px]">
          {CONTACT_LINKS.map((contact, i) => (
            <motion.a 
                key={contact.id}
                href={contact.href}
                target={contact.id === "whatsapp" ? "_blank" : "_self"}
                rel="noreferrer"
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 100 }}
                className={`relative group overflow-hidden rounded-3xl p-[1px] cursor-none outline-none hover-magnetic block`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${contact.color.split(' ')[0]} ${contact.color.split(' ')[1]}`} />
              
              <div className="relative h-[250px] bg-[#121212]/80 backdrop-blur-xl rounded-[23px] border border-white/5 p-8 flex flex-col justify-between overflow-hidden group-hover:bg-[#121212]/40 transition-colors duration-500">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ${contact.color.split(' ')[2]} transition-colors duration-500 group-hover:text-white group-hover:bg-${contact.id === 'whatsapp' ? 'emerald' : contact.id === 'email' ? 'blue' : 'purple'}-500/20`}>
                        <contact.icon strokeWidth={1.5} className="w-6 h-6" />
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowUpRight strokeWidth={1.5} className="w-5 h-5 text-white" />
                    </div>
                </div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-semibold">{contact.subtitle}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-sm">© 2026 Mohammed Aadil @ Nexora. All rights reserved.</p>
            <div className="flex gap-8">
                <a href="#" className="text-white/30 hover:text-white transition-colors text-[10px] md:text-sm uppercase tracking-widest cursor-none">Twitter</a>
                <a href="#" className="text-white/30 hover:text-white transition-colors text-[10px] md:text-sm uppercase tracking-widest cursor-none">LinkedIn</a>
                <a href="#" className="text-white/30 hover:text-white transition-colors text-[10px] md:text-sm uppercase tracking-widest cursor-none">GitHub</a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
