import React from 'react';
import { motion } from 'framer-motion';
import { Brain, FileSearch, Shield, Scale, Zap } from 'lucide-react';
import PremiumCard from './PremiumCard';

interface AIShowcaseSectionProps {
  onNavigate?: (page: string) => void;
}

const AIShowcaseSection: React.FC<AIShowcaseSectionProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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

  const features = [
    {
      icon: Brain,
      title: 'Neural Legal Analysis',
      description: 'Advanced AI analyzes your legal situation with 99.2% accuracy, identifying key factors and optimal strategies.',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileSearch,
      title: 'Precedent Discovery',
      description: 'Instantly search millions of case precedents to find relevant rulings that strengthen your position.',
      color: 'cyan',
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis predicts outcomes and identifies potential vulnerabilities in your case.',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Scale,
      title: 'Strategic Planning',
      description: 'AI-generated legal strategies tailored to your specific circumstances and desired outcomes.',
      color: 'gold',
      gradient: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0d1525] to-[#0B0F1A]" />
      
      {/* Glow effects */}
      <motion.div 
        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] bg-blue-600"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] bg-cyan-600"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Powered by Advanced AI</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            AI Legal{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to navigate complex legal landscapes with unprecedented precision.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <PremiumCard 
                glowColor={feature.color as 'blue' | 'cyan' | 'gold' | 'purple'} 
                className="p-8 h-full"
                delay={index}
              >
                <div className="flex items-start gap-5">
                  <motion.div 
                    className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            onClick={() => onNavigate?.('analyzer')}
            className="
              group inline-flex items-center gap-3
              px-8 py-4 rounded-2xl
              bg-gradient-to-r from-blue-600 to-cyan-500
              text-white font-bold text-lg
              shadow-[0_0_30px_rgba(37,99,235,0.4)]
            "
            whileHover={{ 
              scale: 1.05, 
              y: -4,
              boxShadow: '0 0 50px rgba(37,99,235,0.6)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Brain className="w-6 h-6" />
            Experience AI Analysis
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AIShowcaseSection;
