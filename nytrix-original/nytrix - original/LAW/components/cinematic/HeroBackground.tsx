/**
 * ============================================================
 * CINEMATIC HERO BACKGROUND
 * Netflix-level legal drama hero section
 * Billion-dollar startup aesthetic
 * ============================================================
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Scale, ArrowRight, Play, Sparkles, Shield, ChevronDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import GradientMesh from './GradientMesh';

interface HeroBackgroundProps {
  videoSrc?: string;
  onAnalyzeClick?: () => void;
  onLearnMoreClick?: () => void;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  videoSrc,
  onAnalyzeClick,
  onLearnMoreClick,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0B0F1A 0%, #05070D 100%)',
      }}
    >
      {/* Video Background Layer */}
      <motion.div 
        style={{ y: backgroundY, scale }}
        className="absolute inset-0 z-0"
      >
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.4) saturate(1.2)' }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          /* Placeholder cinematic background */
          <div className="absolute inset-0">
            {/* Simulated courtroom lighting */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black" />
            
            {/* Golden light rays from top */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/4 w-1/2 h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Dramatic side lighting */}
            <motion.div
              animate={{
                x: ['-5%', '5%', '-5%'],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-1/3 h-full"
              style={{
                background: 'linear-gradient(270deg, rgba(37, 99, 235, 0.08) 0%, transparent 100%)',
              }}
            />

            {/* Window silhouette effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
        )}

        {/* Dark overlay with gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(11, 15, 26, 0.6) 0%, 
              rgba(11, 15, 26, 0.75) 50%, 
              rgba(5, 7, 13, 0.9) 100%
            )`,
          }}
        />

        {/* Vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </motion.div>

      {/* Gradient Mesh Overlay */}
      <GradientMesh opacity={0.35} />

      {/* Particle Animation */}
      <ParticleCanvas particleCount={60} />

      {/* Main Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 md:mb-8 backdrop-blur-md border border-white/10"
            style={{
              background: 'rgba(37, 99, 235, 0.1)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            </motion.div>
            <span className="text-xs sm:text-sm font-medium text-cyan-300">
              AI-Powered Legal Intelligence
            </span>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 px-2"
          >
            <span className="text-white">Justice Meets</span>
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #2563EB 0%, #00F5FF 50%, #8B5CF6 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-400 max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed px-4 sm:px-2"
          >
            Navigate India's complex legal landscape with AI-powered analysis, 
            instant rights awareness, and expert lawyer connections.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm text-slate-500 px-4"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Secure</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Scale className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span>11 Domains</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
              <span>AI Powered</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary Button */}
            <motion.button
              onClick={onAnalyzeClick}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0ea5e9 100%)',
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: '0 0 40px rgba(37, 99, 235, 0.6), 0 0 80px rgba(0, 245, 255, 0.3)',
                }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              />

              {/* Ripple container */}
              <span className="absolute inset-0 overflow-hidden rounded-2xl">
                <span className="absolute inset-0 rounded-2xl group-active:bg-white/20 transition-colors" />
              </span>

              <span className="relative flex items-center justify-center gap-2">
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Analyze Situation</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              onClick={onLearnMoreClick}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover gradient fill */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(0, 245, 255, 0.1) 100%)',
                }}
              />

              {/* Glowing border on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.3)',
                }}
              />

              <span className="relative flex items-center justify-center gap-2 text-slate-300 group-hover:text-white transition-colors">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Watch Demo</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 max-w-2xl mx-auto px-4"
          >
            {[
              { value: '50K+', label: 'Queries', fullLabel: 'Legal Queries Analyzed' },
              { value: '95%', label: 'Accuracy', fullLabel: 'Accuracy Rate' },
              { value: '24/7', label: 'Available', fullLabel: 'AI Availability' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + idx * 0.1, type: 'spring', stiffness: 200 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  <span className="sm:hidden">{stat.label}</span>
                  <span className="hidden sm:inline">{stat.fullLabel}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - hidden on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;
