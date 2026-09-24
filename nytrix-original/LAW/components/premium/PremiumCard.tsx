import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'cyan' | 'gold' | 'purple';
  hover?: boolean;
  delay?: number;
}

const glowColorMap = {
  blue: {
    shadow: 'rgba(37,99,235,0.4)',
    border: 'rgba(59,130,246,0.5)',
    gradient: 'from-blue-600/5 to-cyan-600/5'
  },
  cyan: {
    shadow: 'rgba(0,245,255,0.4)',
    border: 'rgba(0,245,255,0.5)',
    gradient: 'from-cyan-600/5 to-teal-600/5'
  },
  gold: {
    shadow: 'rgba(212,175,55,0.4)',
    border: 'rgba(251,191,36,0.5)',
    gradient: 'from-amber-600/5 to-yellow-600/5'
  },
  purple: {
    shadow: 'rgba(147,51,234,0.4)',
    border: 'rgba(168,85,247,0.5)',
    gradient: 'from-purple-600/5 to-pink-600/5'
  }
};

const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  hover = true,
  delay = 0
}) => {
  const colors = glowColorMap[glowColor];

  return (
    <motion.div 
      className={`
        relative
        bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80
        backdrop-blur-xl
        rounded-2xl
        border border-white/10
        overflow-hidden
        ${className}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: `0 25px 50px -12px ${colors.shadow}`,
        borderColor: colors.border
      } : undefined}
      style={{ 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
    >
      {/* Gradient overlay on hover */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated border glow */}
      <motion.div 
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="absolute inset-[-1px] rounded-2xl blur-sm"
          style={{ 
            background: `linear-gradient(135deg, ${colors.border}, transparent, ${colors.border})` 
          }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default PremiumCard;
