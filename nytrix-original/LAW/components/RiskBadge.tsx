
import React from 'react';
import { motion } from 'framer-motion';
import { RiskLevel } from '../types';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const config = {
    [RiskLevel.LOW]: {
      gradient: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/30",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      icon: ShieldCheck,
      pulse: "bg-emerald-400"
    },
    [RiskLevel.MEDIUM]: {
      gradient: "from-amber-500 to-orange-500",
      glow: "shadow-amber-500/30",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-300",
      icon: Shield,
      pulse: "bg-amber-400"
    },
    [RiskLevel.HIGH]: {
      gradient: "from-rose-500 to-red-500",
      glow: "shadow-rose-500/30",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      text: "text-rose-300",
      icon: ShieldAlert,
      pulse: "bg-rose-400"
    },
  };

  const style = config[level];
  const Icon = style.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.bg} border ${style.border} backdrop-blur-sm`}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${style.gradient} opacity-10 blur-md`} />
      
      <div className="relative flex items-center gap-2">
        {/* Animated pulse indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <motion.span 
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute inline-flex h-full w-full rounded-full ${style.pulse} opacity-75`}
          />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${style.pulse}`} />
        </span>
        
        <Icon className={`w-4 h-4 ${style.text}`} />
        
        <span className={`text-sm font-semibold ${style.text}`}>
          Legal Risk: {level}
        </span>
      </div>
    </motion.div>
  );
};

export default RiskBadge;
