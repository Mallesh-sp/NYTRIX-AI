import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/premium/ParticleBackground';
import GlassNavbar from '../components/premium/GlassNavbar';
import CinematicHero from '../components/premium/CinematicHero';
import AIShowcaseSection from '../components/premium/AIShowcaseSection';
import EliteLawyerSection from '../components/premium/EliteLawyerSection';
import StatsCounterSection from '../components/premium/StatsCounterSection';
import HowItWorksSection from '../components/premium/HowItWorksSection';
import TestimonialsSection from '../components/premium/TestimonialsSection';
import FinalCTASection from '../components/premium/FinalCTASection';
import LiveNewsTicker from '../components/premium/LiveNewsTicker';
import PremiumFooter from '../components/premium/PremiumFooter';

// New Cinematic Components
import { PageLoader, ScrollProgress, GradientMesh, ParticleCanvas } from '../components/cinematic';

interface PremiumLandingPageProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

const PremiumLandingPage: React.FC<PremiumLandingPageProps> = ({ onNavigate, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Custom cursor glow effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle load complete callback
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Page transition loader
  return (
    <>
      {/* Cinematic Page Loader */}
      <PageLoader duration={2500} onLoadComplete={handleLoadComplete} />

      {/* Scroll Progress Bar */}
      <ScrollProgress position="top" height={3} showPercentage={false} />

      <motion.div 
        className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Cursor glow effect */}
        <motion.div 
          className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
            left: cursorPosition.x - 250,
            top: cursorPosition.y - 250,
          }}
          animate={{
            left: cursorPosition.x - 250,
            top: cursorPosition.y - 250,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />

        {/* Particle Background */}
        <ParticleBackground />

        {/* Cinematic Gradient Mesh */}
        <GradientMesh opacity={0.3} />

        {/* Enhanced Particle Canvas */}
        <ParticleCanvas particleCount={50} />

        {/* Glass Navbar */}
        <GlassNavbar onNavigate={onNavigate} currentPage="home" onLogout={onLogout} />

        {/* Main Content */}
        <main className="relative z-10">
        {/* Cinematic Hero */}
        <CinematicHero onNavigate={onNavigate} />

        {/* Live News Ticker */}
        <LiveNewsTicker />

        {/* AI Showcase Section */}
        <AIShowcaseSection onNavigate={onNavigate} />

        {/* Stats Counter */}
        <StatsCounterSection />

        {/* How It Works */}
        <HowItWorksSection onNavigate={onNavigate} />

        {/* Elite Lawyer Network */}
        <EliteLawyerSection onNavigate={onNavigate} />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA */}
        <FinalCTASection onNavigate={onNavigate} />

        {/* Bottom News Ticker */}
        <LiveNewsTicker />
      </main>

      {/* Premium Footer */}
      <PremiumFooter onNavigate={onNavigate} />

      {/* Global Premium Styles */}
      <style>{`
        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background: rgba(37, 99, 235, 0.3);
          color: white;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0B0F1A;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #2563eb 0%, #00f5ff 100%);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #3b82f6 0%, #22d3ee 100%);
        }

        /* Glow animations */
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.4); }
          50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.6), 0 0 60px rgba(0, 245, 255, 0.3); }
        }

        .glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        /* Page fade in */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        main {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      </motion.div>
    </>
  );
};

export default PremiumLandingPage;
