/**
 * ============================================================
 * SCROLL PROGRESS GLOW BAR
 * Premium scroll indicator with glow effects
 * ============================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  showPercentage?: boolean;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  height = 3,
  showPercentage = false,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
      springProgress.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [springProgress]);

  return (
    <>
      {/* Main progress bar */}
      <div
        className={`fixed left-0 right-0 z-[100] ${
          position === 'top' ? 'top-0' : 'bottom-0'
        }`}
        style={{ height: `${height}px` }}
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #2563EB 0%, #00F5FF 50%, #8B5CF6 100%)',
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #2563EB 0%, #00F5FF 50%, #8B5CF6 100%)',
            filter: 'blur(8px)',
            opacity: 0.6,
          }}
        />

        {/* Leading edge glow */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${scrollProgress}%`,
            transform: `translateX(-50%) translateY(-50%)`,
          }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        </motion.div>

        {/* Shimmer animation */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-y-0 w-32 pointer-events-none"
          style={{
            left: `${Math.min(scrollProgress, 90)}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            opacity: scrollProgress > 0 ? 1 : 0,
          }}
        />
      </div>

      {/* Optional percentage indicator */}
      {showPercentage && scrollProgress > 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`fixed right-4 z-[100] ${
            position === 'top' ? 'top-4' : 'bottom-4'
          }`}
        >
          <div className="relative">
            {/* Glow background */}
            <div
              className="absolute inset-0 rounded-full blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(0, 245, 255, 0.3))',
              }}
            />
            
            {/* Main badge */}
            <div
              className="relative px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10"
              style={{
                background: 'rgba(11, 15, 26, 0.8)',
              }}
            >
              <span className="text-xs font-mono font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgress;
