import React from 'react';
import { motion } from 'framer-motion';
import { LawConceptDetail } from '../services/lawConceptsService';
import { AlertCircle, Scale, Lightbulb, Phone, Shield, Briefcase } from 'lucide-react';

interface LawConceptCardProps {
  concept: string;
  detail: LawConceptDetail;
}

const LawConceptCard: React.FC<LawConceptCardProps> = ({ concept, detail }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
      
      <div className="p-6 space-y-5">
        {/* Title */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{concept.toUpperCase()}</h3>
        </div>

        {/* Definition */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-400 text-xs uppercase tracking-wider mb-1">Definition</p>
              <p className="text-slate-300 text-sm leading-relaxed">{detail.definition}</p>
            </div>
          </div>
        </div>

        {/* Related Laws */}
        {detail.relatedLaws && detail.relatedLaws.length > 0 && (
          <div className="space-y-3 bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <p className="font-semibold text-blue-300 text-xs uppercase tracking-wider">Related Laws</p>
            </div>
            <ul className="space-y-2 ml-6">
              {detail.relatedLaws.map((law, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{law}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Points */}
        {detail.keyPoints && detail.keyPoints.length > 0 && (
          <div className="space-y-3 bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <p className="font-semibold text-emerald-300 text-xs uppercase tracking-wider">Key Points</p>
            </div>
            <ul className="space-y-2 ml-6">
              {detail.keyPoints.map((point, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Implications */}
        {detail.implications && detail.implications.length > 0 && (
          <div className="space-y-3 bg-rose-500/5 rounded-xl p-4 border border-rose-500/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <p className="font-semibold text-rose-300 text-xs uppercase tracking-wider">Legal Implications</p>
            </div>
            <ul className="space-y-2 ml-6">
              {detail.implications.map((imp, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-rose-400">⚠</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* When to Consult */}
        {detail.whenToConsult && (
          <div className="space-y-3 bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <p className="font-semibold text-blue-300 text-xs uppercase tracking-wider">When to Consult a Lawyer</p>
            </div>
            <p className="text-slate-300 text-sm ml-6 leading-relaxed">{detail.whenToConsult}</p>
          </div>
        )}

        {/* Lawyer's Guidance */}
        {detail.lawyerGuidance && (
          <div className="space-y-3 bg-purple-500/5 rounded-xl p-4 border border-purple-500/10">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <p className="font-semibold text-purple-300 text-xs uppercase tracking-wider">Lawyer's Guidance</p>
            </div>
            <p className="text-slate-300 text-sm ml-6 leading-relaxed">{detail.lawyerGuidance}</p>
          </div>
        )}

        {/* Practical Tips */}
        {detail.practicalTips && detail.practicalTips.length > 0 && (
          <div className="space-y-3 bg-amber-500/5 rounded-xl p-4 border border-amber-500/10">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <p className="font-semibold text-amber-300 text-xs uppercase tracking-wider">Practical Tips</p>
            </div>
            <ul className="space-y-2 ml-6">
              {detail.practicalTips.map((tip, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LawConceptCard;
