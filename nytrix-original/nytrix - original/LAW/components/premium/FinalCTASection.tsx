import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import PremiumButton from './PremiumButton';

interface FinalCTASectionProps {
  onNavigate?: (page: string) => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0d1830] to-[#0B0F1A]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-20 blur-[150px] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Join the Legal Revolution</span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Ready to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            Your Legal Strategy?
          </motion.h2>

          {/* Subline */}
          <motion.p 
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join thousands of individuals who've already revolutionized their approach to legal challenges. 
            <span className="text-white font-medium"> Start for free today.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <PremiumButton 
              variant="primary" 
              size="xl"
              onClick={() => onNavigate?.('analyzer')}
              className="min-w-[250px]"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </PremiumButton>
            
            <PremiumButton 
              variant="secondary" 
              size="xl"
              onClick={() => onNavigate?.('lawyers')}
            >
              Talk to Expert
            </PremiumButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { icon: Shield, text: 'Bank-grade Security' },
              { icon: Zap, text: 'Instant Analysis' },
              { icon: Globe, text: 'Pan-India Coverage' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2 text-slate-500"
                whileHover={{ scale: 1.05, color: '#94a3b8' }}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
