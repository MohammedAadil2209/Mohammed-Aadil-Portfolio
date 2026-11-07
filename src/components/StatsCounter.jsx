import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Trophy, Briefcase, Code2, Cpu, Zap } from "lucide-react";

const STATS = [
  {
    label: "Projects Built",
    value: 8,
    suffix: "+",
    icon: Code2,
    color: "from-rose-800/20 to-rose-900/5",
  },
  {
    label: "Events & Hackathons",
    value: 5,
    suffix: "+",
    icon: Trophy,
    color: "from-amber-600/20 to-amber-900/5",
  },
  {
    label: "Months Experience",
    value: 6,
    suffix: "+",
    icon: Briefcase,
    color: "from-cyan-600/20 to-cyan-900/5",
  },
  {
    label: "Tech Stack",
    value: 14,
    suffix: "+",
    icon: Cpu,
    color: "from-violet-600/20 to-violet-900/5",
  },
];

const AnimatedCounter = ({ value, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#050505] py-20 md:py-32 px-5 md:px-12 lg:px-24 z-20 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(225,29,72,0.06), transparent)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-500/90 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
            Impact & Metrics
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            By the Numbers
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="stat-card glass-card rounded-3xl p-5 md:p-8 flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <stat.icon
                  className="w-6 h-6 md:w-7 md:h-7 text-white/80"
                  strokeWidth={1.5}
                />
              </div>

              {/* Counter */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-3">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>

              {/* Label */}
              <p className="text-white/55 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
