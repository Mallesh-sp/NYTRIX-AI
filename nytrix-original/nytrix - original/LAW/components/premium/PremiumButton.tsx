import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  icon
}) => {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500
      hover:from-blue-500 hover:via-cyan-500 hover:to-blue-600
      text-white font-bold
      shadow-[0_0_20px_rgba(37,99,235,0.5)]
      hover:shadow-[0_0_40px_rgba(37,99,235,0.7),0_0_60px_rgba(0,245,255,0.3)]
      border border-blue-400/30
    `,
    secondary: `
      bg-transparent
      border-2 border-cyan-500/50
      hover:border-cyan-400
      text-cyan-300 hover:text-white
      backdrop-blur-sm
      hover:bg-cyan-500/10
      shadow-[0_0_15px_rgba(0,245,255,0.2)]
      hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]
    `,
    gold: `
      bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500
      hover:from-amber-500 hover:via-yellow-400 hover:to-amber-400
      text-slate-900 font-bold
      shadow-[0_0_20px_rgba(212,175,55,0.5)]
      hover:shadow-[0_0_40px_rgba(212,175,55,0.7)]
      border border-amber-400/50
    `
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        ${sizes[size]}
        ${variants[variant]}
        rounded-xl
        font-semibold
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Ripple effect */}
      {ripple && (
        <motion.span
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Shine effect */}
      <motion.span 
        className="absolute inset-0 overflow-hidden rounded-xl"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.span>
      
      {/* Glow pulse animation for primary variant */}
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/50 to-cyan-500/50 blur-xl -z-10"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};

export default PremiumButton;
