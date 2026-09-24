import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  Brain,
  Shield, 
  AlertTriangle,
  Scale,
  Users,
  FileText,
  Heart,
  MessageSquare,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, LegalAnalysis } from '../../types';
import AnalysisReport from '../AnalysisReport';
import LawConceptCard from '../LawConceptCard';

interface PremiumAnalyzerProps {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  isAnalyzing: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onClearError: () => void;
}

// Legal categories data
const legalCategories = [
  {
    id: 'threats',
    title: 'False Accusations',
    description: 'Threats, blackmail, and wrongful allegations',
    icon: AlertTriangle,
    gradient: 'from-rose-500/20 to-orange-500/10',
    borderColor: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    hoverGlow: 'hover:shadow-rose-500/20'
  },
  {
    id: 'cyber',
    title: 'Cyber Harassment',
    description: 'Online threats, defamation, and privacy violations',
    icon: Shield,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    hoverGlow: 'hover:shadow-blue-500/20'
  },
  {
    id: 'family',
    title: 'Family Matters',
    description: 'Divorce, custody, and domestic disputes',
    icon: Users,
    gradient: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    hoverGlow: 'hover:shadow-purple-500/20'
  },
  {
    id: 'legal',
    title: 'Legal Rights',
    description: 'Constitutional rights and fair trial protections',
    icon: Scale,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    hoverGlow: 'hover:shadow-emerald-500/20'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const PremiumAnalyzer: React.FC<PremiumAnalyzerProps> = ({
  messages,
  input,
  setInput,
  isAnalyzing,
  error,
  onSubmit,
  onClearError
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleCategoryClick = (category: typeof legalCategories[0]) => {
    const prompts: Record<string, string> = {
      threats: 'I am facing false accusations and threats. Can you help me understand my legal rights and options?',
      cyber: 'I am being harassed online and facing cyber threats. What legal actions can I take?',
      family: 'I need guidance on family legal matters including divorce and custody rights.',
      legal: 'I want to understand my fundamental legal rights and constitutional protections.'
    };
    setInput(prompts[category.id] || '');
    textareaRef.current?.focus();
  };

  const showEmptyState = messages.length === 0 && !isAnalyzing;

  return (
    <div className="relative min-h-screen">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[#0a0d14]" />
        
        {/* Radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(6,182,212,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(99,102,241,0.08),transparent)]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[100px]"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-40">
        <AnimatePresence mode="wait">
          {showEmptyState ? (
            <motion.div
              key="empty"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto px-4 sm:px-6"
            >
              {/* Hero Section */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                {/* AI Badge */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                    AI-Powered Legal Analysis
                  </span>
                </motion.div>

                {/* AI Icon with Glow */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="relative w-20 h-20 mx-auto mb-8"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-xl animate-pulse" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-10 h-10 text-blue-400" />
                  </div>
                  {/* Orbiting particles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-8px]"
                  >
                    <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-blue-400/60" />
                    <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 -translate-x-1/2 rounded-full bg-cyan-400/60" />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight"
                >
                  Legal Risk Analyzer
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed"
                >
                  AI-powered legal intelligence for Indian law. Describe your situation 
                  and receive instant analysis with relevant laws and recommendations.
                </motion.p>
              </motion.div>

              {/* Category Cards */}
              <motion.div
                variants={containerVariants}
                className="grid sm:grid-cols-2 gap-4 mb-10 max-w-3xl mx-auto"
              >
                {legalCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(category)}
                      className={`group relative p-5 rounded-2xl bg-gradient-to-br ${category.gradient} border ${category.borderColor} text-left transition-all duration-300 hover:shadow-xl ${category.hoverGlow} backdrop-blur-sm overflow-hidden`}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} blur-xl`} />
                      </div>
                      
                      <div className="relative z-10">
                        <div className={`w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-white/20 transition-colors`}>
                          <Icon className={`w-5 h-5 ${category.iconColor}`} />
                        </div>
                        <h3 className="text-base font-semibold text-white mb-1.5">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-slate-500 group-hover:text-blue-400 transition-colors">
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Disclaimer Card */}
              <motion.div
                variants={itemVariants}
                className="max-w-2xl mx-auto p-5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 backdrop-blur-sm"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 mb-1">
                      Important Disclaimer
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      This AI provides general legal awareness based on Indian law, not legal advice. 
                      Always consult a qualified lawyer for specific cases and professional guidance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Messages View */
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? '' : ''}`}>
                    {message.role === 'user' ? (
                      <div className="px-5 py-4 rounded-2xl rounded-br-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="px-5 py-4 rounded-2xl rounded-bl-md bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                          <p className="text-sm text-slate-200 leading-relaxed">{message.content}</p>
                        </div>
                        
                        {/* Law Concepts */}
                        {message.lawConcepts && message.lawConcepts.length > 0 && (
                          <div className="space-y-3">
                            {message.lawConcepts.map((lc, idx) => (
                              <LawConceptCard key={idx} concept={lc.concept} detail={lc.detail} />
                            ))}
                          </div>
                        )}
                        
                        {/* Analysis Report */}
                        {message.analysis && <AnalysisReport analysis={message.analysis} />}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="px-5 py-4 rounded-2xl rounded-bl-md bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex items-center gap-4">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-400 italic">
                        Analyzing your legal situation...
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3"
                  >
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    <p className="text-sm text-rose-300 flex-1">{error}</p>
                    <button
                      onClick={onClearError}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Input */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/95 to-transparent">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={onSubmit}>
            <div 
              className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border transition-all duration-300 ${
                isFocused 
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
                  : 'border-white/[0.08] hover:border-white/[0.12]'
              }`}
            >
              {/* Glow effect on focus */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-50' : 'opacity-0'}`} />
              
              <div className="relative flex items-end p-3 gap-3">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSubmit(e);
                    }
                  }}
                  placeholder="Describe your legal situation in detail..."
                  rows={1}
                  className="flex-1 min-h-[44px] max-h-[150px] px-4 py-3 text-sm text-white placeholder-slate-500 bg-transparent border-none outline-none resize-none"
                  style={{ lineHeight: '1.6' }}
                />
                
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isAnalyzing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    input.trim() && !isAnalyzing
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                      : 'bg-white/[0.05] text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Send className={`w-5 h-5 ${input.trim() && !isAnalyzing ? '' : ''}`} />
                </motion.button>
              </div>
            </div>
          </form>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500"
          >
            <Heart className="w-3 h-3 text-blue-400" />
            <span>Supporting Legal Justice & Fairness for All</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumAnalyzer;
