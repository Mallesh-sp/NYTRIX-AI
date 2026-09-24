/**
 * ============================================================
 * CINEMATIC PAGE LOADER
 * Netflix-style loading transition with legal theme
 * ============================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale } from 'lucide-react';

interface PageLoaderProps {
  duration?: number;
  onLoadComplete?: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  duration = 2500,
  onLoadComplete 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete?.();
        }, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-4"
          style={{
            background: 'linear-gradient(180deg, #0B0F1A 0%, #05070D 100%)',
          }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {/* Logo container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative mb-6 sm:mb-8"
          >
            {/* Rotating rings - hidden on very small screens */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="hidden sm:block absolute -inset-4 rounded-full border border-blue-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="hidden md:block absolute -inset-8 rounded-full border border-cyan-500/20"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              className="hidden lg:block absolute -inset-12 rounded-full border border-purple-500/10"
            />

            {/* Main icon */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(37, 99, 235, 0.5)',
                  '0 0 40px rgba(37, 99, 235, 0.8)',
                  '0 0 20px rgba(37, 99, 235, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center"
            >
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                NYTRIX
              </span>
              <span className="text-white ml-1.5 sm:ml-2">AI</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 sm:mt-2 tracking-widest uppercase">
              Legal Intelligence
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-48 sm:w-56 md:w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563EB, #00F5FF)',
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
              }}
            />
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 w-1/3"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />
          </div>

          {/* Progress text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 text-[10px] sm:text-xs mt-3 sm:mt-4 font-mono"
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 text-slate-600 text-[10px] sm:text-xs tracking-wider text-center px-4"
          >
            SUPPORTING LEGAL JUSTICE & FAIRNESS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
