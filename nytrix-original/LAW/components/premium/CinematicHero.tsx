import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Brain, Zap, Play } from 'lucide-react';
import PremiumButton from './PremiumButton';

interface CinematicHeroProps {
  onNavigate?: (page: string) => void;
}

const CinematicHero: React.FC<CinematicHeroProps> = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#0a1628] to-[#05070D]">
        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F1A]/50 to-[#0B0F1A]" />

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-gradient-to-r from-blue-600/20 to-cyan-600/20
              border border-cyan-500/30
              backdrop-blur-sm
              mb-8"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">AI-Powered Legal Intelligence Platform</span>
            <motion.span 
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6
              leading-[0.9] tracking-tight"
          >
            <span className="block text-white">The Future of</span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Legal Intelligence.
            </motion.span>
          </motion.h1>

          {/* Subline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-12
              leading-relaxed"
          >
            <span className="text-white font-medium">AI-Powered Legal Strategy.</span>{' '}
            <span className="text-cyan-400">Verified Experts.</span>{' '}
            <span className="text-amber-400">Absolute Authority.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <PremiumButton 
              variant="primary" 
              size="lg"
              onClick={() => onNavigate?.('analyzer')}
              icon={<Brain className="w-5 h-5" />}
            >
              Start AI Analysis
              <ArrowRight className="w-5 h-5 ml-1" />
            </PremiumButton>
            
            <PremiumButton 
              variant="secondary" 
              size="lg"
              onClick={() => onNavigate?.('lawyers')}
              icon={<Shield className="w-5 h-5" />}
            >
              View Elite Lawyers
            </PremiumButton>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: '10K+', label: 'Cases Analyzed', color: 'text-blue-400' },
              { value: '500+', label: 'Elite Lawyers', color: 'text-cyan-400' },
              { value: '99.2%', label: 'Success Rate', color: 'text-amber-400' },
              { value: '24/7', label: 'AI Support', color: 'text-emerald-400' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center group"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className={`text-3xl md:text-4xl font-black ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border border-slate-600 flex justify-center pt-2">
          <motion.div 
            className="w-1.5 h-3 bg-cyan-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/3 left-10 w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 backdrop-blur-sm"
        animate={floatAnimation}
      />
      <motion.div 
        className="absolute bottom-1/3 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-600/10 to-yellow-600/10 border border-amber-500/20 backdrop-blur-sm"
        animate={{
          y: [-15, 15, -15],
          rotate: [0, -5, 0, 5, 0],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 backdrop-blur-sm"
        animate={{
          y: [-8, 8, -8],
          x: [-5, 5, -5],
          rotate: [0, 10, 0, -10, 0],
          transition: {
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }
        }}
      />
    </section>
  );
};

export default CinematicHero;
