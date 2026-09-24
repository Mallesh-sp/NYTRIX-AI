/**
 * ============================================================
 * ANIMATED GRADIENT MESH OVERLAY
 * Subtle flowing gradient that adds depth and luxury feel
 * ============================================================
 */

import React from 'react';
import { motion } from 'framer-motion';

interface GradientMeshProps {
  className?: string;
  opacity?: number;
}

const GradientMesh: React.FC<GradientMeshProps> = ({ 
  className = '',
  opacity = 0.4
}) => {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-[5] ${className}`}>
      {/* Primary flowing gradient */}
      <motion.div
        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ opacity }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 30%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 40% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 70% 70%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Secondary counter-rotating gradient */}
      <motion.div
        className="absolute w-[150%] h-[150%] -left-1/4 -top-1/4"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ opacity: opacity * 0.6 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 80% at 30% 60%, rgba(0, 245, 255, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 70% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Pulsing center glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div 
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Noise texture overlay for cinematic grain */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GradientMesh;
