import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const StatsCounterSection: React.FC = () => {
  const [counts, setCounts] = useState({ cases: 0, lawyers: 0, success: 0, hours: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const targets = { cases: 10847, lawyers: 523, success: 99, hours: 24 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        cases: Math.floor(targets.cases * easeOut),
        lawyers: Math.floor(targets.lawyers * easeOut),
        success: Math.floor(targets.success * easeOut),
        hours: Math.floor(targets.hours * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  const stats = [
    {
      icon: TrendingUp,
      value: counts.cases.toLocaleString() + '+',
      label: 'Cases Analyzed',
      color: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/30'
    },
    {
      icon: Users,
      value: counts.lawyers + '+',
      label: 'Elite Lawyers',
      color: 'from-amber-500 to-yellow-500',
      glow: 'shadow-amber-500/30'
    },
    {
      icon: Award,
      value: counts.success + '.2%',
      label: 'Success Rate',
      color: 'from-emerald-500 to-teal-500',
      glow: 'shadow-emerald-500/30'
    },
    {
      icon: Clock,
      value: counts.hours + '/7',
      label: 'AI Available',
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/30'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-[#0d1628] to-[#0B0F1A]" />
      
      {/* Animated gradient line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 0.5, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 0.5, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Icon */}
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className={`
                  p-4 rounded-2xl
                  bg-gradient-to-br ${stat.color}
                  shadow-lg ${stat.glow}
                `}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              {/* Value */}
              <motion.div 
                className={`
                  text-4xl md:text-5xl font-black
                  bg-gradient-to-r ${stat.color} bg-clip-text text-transparent
                  mb-2
                `}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.div>
              
              {/* Label */}
              <div className="text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounterSection;
