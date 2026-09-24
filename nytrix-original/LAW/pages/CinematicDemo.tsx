/**
 * ============================================================
 * CINEMATIC HERO DEMO PAGE
 * Full showcase of the billion-dollar startup hero
 * ============================================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroBackground from '../components/cinematic/HeroBackground';
import { PageLoader, ScrollProgress, GradientMesh } from '../components/cinematic';
import { 
  Scale, 
  Shield, 
  Brain, 
  Users, 
  FileText, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CinematicDemoProps {
  onNavigate?: (page: string) => void;
}

const CinematicDemo: React.FC<CinematicDemoProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  const features = [
    {
      icon: Brain,
      title: 'AI Legal Analysis',
      description: 'Gemini-powered analysis of your legal situation with 95% accuracy',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: '11 Law Domains',
      description: 'Comprehensive coverage from Criminal to Corporate law',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Users,
      title: 'Elite Lawyers',
      description: 'Connect with verified legal professionals instantly',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: FileText,
      title: 'Know Your Rights',
      description: 'Instant awareness of your legal rights and protections',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <>
      {/* Page Loader */}
      <PageLoader 
        duration={2000} 
        onLoadComplete={() => setIsLoading(false)} 
      />

      {/* Scroll Progress */}
      <ScrollProgress position="top" height={3} showPercentage={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#05070D]"
      >
        {/* Cinematic Hero Section */}
        <HeroBackground
          onAnalyzeClick={() => onNavigate?.('analyzer')}
          onLearnMoreClick={() => {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Features Section */}
        <section id="features" className="relative py-24 px-4">
          <GradientMesh opacity={0.2} />
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">Powered by Advanced AI</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Nytrix AI
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                The most comprehensive AI-powered legal intelligence platform 
                designed for the modern Indian citizen.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative"
                >
                  {/* Hover glow */}
                  <div className={`absolute -inset-[1px] bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />
                  
                  <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <motion.button
                onClick={() => onNavigate?.('analyzer')}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #0ea5e9 100%)',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: '0 0 40px rgba(37, 99, 235, 0.6), 0 0 80px rgba(0, 245, 255, 0.3)',
                  }}
                />
                <Scale className="w-5 h-5" />
                <span>Start Free Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="relative py-16 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { value: '50,000+', label: 'Queries Analyzed' },
                { value: '95%', label: 'Accuracy Rate' },
                { value: '11', label: 'Law Domains' },
                { value: '24/7', label: 'AI Availability' },
                { value: '100%', label: 'Confidential' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">NYTRIX AI</span>
            </div>
            <p className="text-sm text-slate-500">
              Supporting Legal Justice & Fairness
            </p>
            <p className="text-xs text-slate-600 mt-4">
              © 2026 Nytrix AI. Not a substitute for professional legal advice.
            </p>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default CinematicDemo;
