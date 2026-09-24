
import React from 'react';
import { motion } from 'framer-motion';
import { LegalAnalysis } from '../types';
import RiskBadge from './RiskBadge';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  ListChecks, 
  Gavel, 
  HeartPulse, 
  FileText,
  XCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface AnalysisReportProps {
  analysis: LegalAnalysis;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-6 mb-8"
    >
      {/* Animated Gradient Border */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl opacity-80 blur-sm animate-pulse" />
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl" 
           style={{ 
             background: 'linear-gradient(90deg, #00f5ff, #2563eb, #8b5cf6, #00f5ff)',
             backgroundSize: '300% 100%',
             animation: 'gradient-shift 4s ease infinite'
           }} 
      />
      
      {/* Main Container */}
      <div className="relative bg-[#0a0f1c] rounded-2xl overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                 backgroundSize: '50px 50px'
               }} 
          />
        </div>

        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative px-6 py-5 border-b border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(6, 182, 212, 0.1) 100%)'
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Animated Icon */}
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-lg opacity-50" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Scale className="w-7 h-7 text-white" />
                </div>
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Situation Analysis
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </motion.span>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-cyan-400 text-sm font-medium">Powered by Nytrix AI</span>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            
            <RiskBadge level={analysis.riskLevel} />
          </div>
        </motion.div>

        <div className="relative p-6 space-y-6">
          
          {/* Empathy Note - Personal Touch from AI */}
          {analysis.empathyNote && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative"
            >
              <div className="relative backdrop-blur-sm bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <HeartPulse className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-amber-200/90 text-[15px] leading-relaxed italic">
                      "{analysis.empathyNote}"
                    </p>
                    <p className="text-amber-400/60 text-xs mt-1.5 font-medium">— Nytrix AI</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Summary Section - Glass Card */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Situation Summary</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-[15px]">
                {analysis.summary}
              </p>
            </div>
          </motion.section>

          {/* Laws & Rights - Two Column Premium Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Relevant Laws */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full backdrop-blur-sm bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                    <BookOpen className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-emerald-300">Relevant Indian Laws</h3>
                </div>
                <ul className="space-y-2.5">
                  {analysis.relevantLaws.map((law, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-2.5 text-sm text-slate-300 group/item"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="group-hover/item:text-emerald-200 transition-colors">{law}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Legal Rights */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-5 hover:border-blue-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Shield className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-blue-300">Your Legal Rights</h3>
                </div>
                <ul className="space-y-2.5">
                  {analysis.legalRights.map((right, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + idx * 0.1 }}
                      className="flex items-start gap-2.5 text-sm text-slate-300 group/item"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="group-hover/item:text-blue-200 transition-colors">{right}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.section>
          </div>

          {/* CRITICAL DON'Ts - Danger Zone */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 rounded-xl opacity-60" />
            <div className="relative bg-[#1a0a0f] rounded-xl p-5 overflow-hidden">
              {/* Danger pattern overlay */}
              <div className="absolute inset-0 opacity-5"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.3) 10px, rgba(255,0,0,0.3) 20px)'
                   }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30"
                  >
                    <XCircle className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-rose-300">CRITICAL: What NOT To Do</h3>
                    <p className="text-rose-400/60 text-xs">Avoid these actions to protect your legal position</p>
                  </div>
                </div>
                
                <ul className="grid sm:grid-cols-2 gap-3">
                  {analysis.donts.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-start gap-2.5 text-sm text-rose-200/90 bg-rose-500/10 px-3 py-2 rounded-lg border border-rose-500/20"
                    >
                      <span className="text-rose-400 font-bold mt-0.5">✕</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Steps To Follow - Timeline Style */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Lawful Steps To Follow</h3>
                  <p className="text-slate-400 text-xs">Recommended action plan</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {analysis.lawfulSteps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      {idx < analysis.lawfulSteps.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-amber-500/50 to-transparent" />
                      )}
                    </div>
                    <div className="pt-1.5 text-sm text-slate-300 group-hover:text-white transition-colors">
                      {step}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Lawyer & Wellbeing - Premium Split Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-xl p-4 hover:border-indigo-400/40 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Gavel className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-indigo-300">Legal Representation</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {analysis.lawyerGuidance}
                </p>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full backdrop-blur-sm bg-gradient-to-br from-pink-500/10 to-rose-500/5 border border-pink-500/20 rounded-xl p-4 hover:border-pink-400/40 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-pink-300">Mental Well-being</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  {analysis.mentalHealthReminder}
                </p>
              </div>
            </motion.section>
          </div>
        </div>
        
        {/* Premium Disclaimer Footer */}
        <div className="relative px-6 py-4 border-t border-white/10"
             style={{
               background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
             }}
        >
          <p className="text-[10px] text-slate-500 uppercase tracking-wider text-center font-medium leading-relaxed">
            ⚠️ Disclaimer: This information is for legal awareness and general guidance only. It is not legal advice. 
            Please consult a certified advocate for professional legal representation.
          </p>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default AnalysisReport;
