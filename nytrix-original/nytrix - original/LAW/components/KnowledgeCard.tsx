import React, { useState } from 'react';
import { BookOpen, AlertCircle, CheckCircle, Heart, Eye } from 'lucide-react';

export interface KnowledgeCardData {
  id: string;
  title: string;
  category: 'rights' | 'awareness' | 'protection' | 'documentation';
  icon?: any;
  summary: string;
  content: string;
  keyPoints: string[];
  relatedLaws?: string[];
  practicalSteps?: string[];
  redFlags?: string[];
}

interface KnowledgeCardProps {
  card: KnowledgeCardData;
  compact?: boolean;
}

const categoryConfig = {
  rights: { bg: 'bg-gradient-to-br from-purple-800/40 to-purple-900/40', border: 'border-emerald-400/30', text: 'text-emerald-100', icon: '⚖️', badge: 'bg-emerald-500/30 text-emerald-300' },
  awareness: { bg: 'bg-gradient-to-br from-purple-800/40 to-purple-900/40', border: 'border-emerald-400/30', text: 'text-emerald-100', icon: '💡', badge: 'bg-teal-500/30 text-teal-300' },
  protection: { bg: 'bg-gradient-to-br from-purple-800/40 to-purple-900/40', border: 'border-emerald-400/30', text: 'text-emerald-100', icon: '🛡️', badge: 'bg-red-500/30 text-red-300' },
  documentation: { bg: 'bg-gradient-to-br from-purple-800/40 to-purple-900/40', border: 'border-emerald-400/30', text: 'text-emerald-100', icon: '📋', badge: 'bg-cyan-500/30 text-cyan-300' }
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ card, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const config = categoryConfig[card.category];

  if (compact) {
    return (
      <div className={`${config.bg} border-l-4 ${config.border} p-4 rounded-r-lg cursor-pointer hover:shadow-md hover:shadow-emerald-500/30 transition-all backdrop-blur`}
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div className="flex-1">
            <h3 className={`font-bold ${config.text}`}>{card.title}</h3>
            <p className={`text-sm text-emerald-300 opacity-75`}>{card.summary}</p>
          </div>
          <Eye className={`w-4 h-4 text-emerald-400 opacity-50 flex-shrink-0 mt-1`} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-xl p-6 space-y-4 backdrop-blur`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-3xl">{config.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className={`text-xl font-bold ${config.text}`}>{card.title}</h2>
            <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${config.badge}`}>
              {card.category}
            </span>
          </div>
          <p className={`text-sm text-emerald-300 opacity-75 mt-1`}>{card.summary}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${config.text} leading-relaxed p-4 bg-purple-900/30 rounded-lg border ${config.border}`}>
        {card.content}
      </div>

      {/* Key Points */}
      {card.keyPoints && card.keyPoints.length > 0 && (
        <div>
          <h3 className={`font-bold ${config.text} mb-3 flex items-center gap-2`}>
            <CheckCircle className="w-5 h-5" /> Key Points
          </h3>
          <ul className="space-y-2">
            {card.keyPoints.map((point, idx) => (
              <li key={idx} className={`flex gap-2 ${config.text}`}>
                <span className="font-bold opacity-75">✓</span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Red Flags */}
      {card.redFlags && card.redFlags.length > 0 && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 backdrop-blur">
          <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Red Flags to Watch For
          </h3>
          <ul className="space-y-2">
            {card.redFlags.map((flag, idx) => (
              <li key={idx} className="flex gap-2 text-red-200 text-sm">
                <span className="font-bold">⚠️</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Laws */}
      {card.relatedLaws && card.relatedLaws.length > 0 && (
        <div>
          <h3 className={`font-bold ${config.text} mb-3`}>Related Laws & Sections</h3>
          <div className="flex flex-wrap gap-2">
            {card.relatedLaws.map((law, idx) => (
              <span key={idx} className="bg-purple-900/30 border border-emerald-400/30 px-3 py-1 rounded-full text-sm font-semibold text-emerald-300">
                {law}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Practical Steps */}
      {card.practicalSteps && card.practicalSteps.length > 0 && (
        <div className="bg-purple-900/30 border border-emerald-400/30 rounded-lg p-4 backdrop-blur">
          <h3 className={`font-bold ${config.text} mb-3`}>Practical Steps</h3>
          <ol className="space-y-2">
            {card.practicalSteps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-emerald-200 text-sm">
                <span className="font-bold text-emerald-400 min-w-6">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default KnowledgeCard;
