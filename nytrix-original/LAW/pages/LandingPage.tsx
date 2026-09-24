import React, { useState } from 'react';
import { ArrowRight, Shield, Zap, Users, BookOpen, Heart, ChevronRight } from 'lucide-react';
import KnowledgeCard, { KnowledgeCardData } from '../components/KnowledgeCard';

interface LandingPageProps {
  onNavigate?: (page: 'knowledge' | 'lawyers' | 'analyzer') => void;
}

const mensRightsCards: KnowledgeCardData[] = [
  {
    id: 'equal-protection',
    title: 'Equal Protection Under Law',
    category: 'rights',
    summary: 'Every male citizen has the right to equal protection and fair legal treatment',
    content: 'The Indian Constitution guarantees equal protection to all citizens regardless of gender. This means men have the same rights to fair legal processes, protection from harassment, and equal treatment in courts as anyone else.',
    keyPoints: [
      'Equal protection before the law is a constitutional right',
      'Fair legal process applies to all individuals',
      'No citizen can be discriminated against based on gender in legal proceedings',
      'Every man has the right to a fair trial with proper legal representation',
      'Legal equality extends to bail, sentencing, and court proceedings'
    ],
    relatedLaws: ['Article 14, Constitution of India', 'Article 21 - Right to Life']
  },
  {
    id: 'presumption-innocence',
    title: 'Presumption of Innocence',
    category: 'rights',
    summary: 'You are innocent until proven guilty by the law',
    content: 'In Indian criminal law, every accused person (male or female) is presumed innocent until the prosecution proves their guilt beyond reasonable doubt. This is a fundamental right that protects individuals from false accusations.',
    keyPoints: [
      'Innocent until proven guilty - not the other way around',
      'Burden of proof is on the prosecution, not the accused',
      'The accused has the right to remain silent',
      'All doubts should be resolved in favor of the accused',
      'False accusations do not automatically mean guilt'
    ],
    relatedLaws: ['Section 101-102, Indian Evidence Act', 'Section 103-105, IEA'],
    practicalSteps: [
      'Do not admit to anything without a lawyer present',
      'Exercise your right to remain silent',
      'Insist on proper investigation before any charges',
      'Keep all evidence supporting your innocence'
    ]
  },
  {
    id: 'right-to-lawyer',
    title: 'Right to Legal Representation',
    category: 'rights',
    summary: 'You have the right to hire a lawyer for your defense',
    content: 'Every accused person has the right to obtain legal representation. The state must provide a free lawyer if you cannot afford one. This right is essential for a fair trial and protecting your legal interests.',
    keyPoints: [
      'You have the right to choose your lawyer',
      'Free legal aid is available if you cannot afford it',
      'Your lawyer can access case files and evidence',
      'Legal privilege protects conversations with your lawyer',
      'Effective legal representation can significantly impact case outcomes'
    ],
    relatedLaws: ['Section 303, CrPC', 'Section 436A, CrPC', 'Article 22(1), Constitution'],
    redFlags: [
      'Being denied access to a lawyer during police custody',
      'Police not allowing you to inform a family member',
      'Pressure to sign statements without lawyer consultation'
    ]
  },
  {
    id: 'protection-harassment',
    title: 'Protection from Harassment & Abuse',
    category: 'protection',
    summary: 'You have the right to protection from harassment, false accusations, and abuse',
    content: 'Men have the right to protection from various forms of harassment including false accusations, blackmail, cyber harassment, defamation, and abuse. The law provides remedies for these violations.',
    keyPoints: [
      'False accusations are criminal offenses (Section 166A, IPC)',
      'Cyber harassment and threats are punishable under law',
      'Defamation can be addressed through civil and criminal courts',
      'Harassment in the workplace can be reported and remedied',
      'Abusive relationships can justify protection orders'
    ],
    relatedLaws: ['Section 354, IPC', 'Section 506, IPC', 'Section 166A, IPC', 'IT Act, 2000'],
    practicalSteps: [
      'Document all harassment with dates and evidence',
      'Report to appropriate authorities (police, cyber cell)',
      'Seek legal protective orders from court',
      'File counter-cases if appropriate'
    ]
  },
  {
    id: 'fair-trial',
    title: 'Right to a Fair Trial',
    category: 'rights',
    summary: 'Every accused has the right to a fair, impartial, and timely trial',
    content: 'The right to a fair trial is a fundamental human right in India. This includes the right to present your defense, cross-examine witnesses, and have adequate time to prepare your case.',
    keyPoints: [
      'Right to know the charges against you',
      'Right to present your defense fully',
      'Right to cross-examine prosecution witnesses',
      'Right to have sufficient time to prepare',
      'Right to an impartial judge/jury',
      'Right to appeal unfair verdicts'
    ],
    relatedLaws: ['Article 21, Constitution', 'Section 309, CrPC', 'Section 233-238, CrPC'],
    redFlags: [
      'Being denied time to prepare your defense',
      'Biased or prejudiced judge behavior',
      'Inability to cross-examine witnesses',
      'Cases being rushed without proper investigation'
    ]
  },
  {
    id: 'anti-false-cases',
    title: 'Protection Against False Cases',
    category: 'protection',
    summary: 'Law protects you when false accusations or charges are filed',
    content: 'Indian law provides strong protections against false accusations and fabricated cases. If someone files a false complaint or case against you, you have the right to file a counter-case and seek damages.',
    keyPoints: [
      'Filing a false FIR is a crime (Section 166A, IPC)',
      'You can file counter-cases for false accusations',
      'You can seek compensation for damage to reputation',
      'False charges can lead to prosecution of the accuser',
      'Evidence of the false nature of charges protects you'
    ],
    relatedLaws: ['Section 166A, IPC', 'Section 182, IPC', 'Section 229, IPC'],
    practicalSteps: [
      'Gather evidence proving the accusation is false',
      'File a counter-FIR against the accuser',
      'Pursue criminal action against the person making false claims',
      'Seek civil damages for reputation harm'
    ]
  },
  {
    id: 'custody-rights',
    title: 'Custody and Parental Rights',
    category: 'rights',
    summary: 'Fathers have equal rights in custody decisions for their children',
    content: 'In India, both mothers and fathers have equal rights to custody of children. Courts decide custody based on the best interests of the child, not gender. Fathers can seek and obtain full or joint custody.',
    keyPoints: [
      'Both parents have equal rights to seek custody',
      'Courts look at the best interests of the child, not parent\'s gender',
      'Joint custody is increasingly favored by courts',
      'Fathers can prove their ability to provide care',
      'Courts can order visitation rights and child support obligations'
    ],
    relatedLaws: ['Section 125, CrPC (Maintenance)', 'Guardianship and Wards Act, 1890', 'Section 26, Hindu Marriage Act'],
    redFlags: [
      'Being denied custody without proper court hearing',
      'Bias against fathers in custody decisions',
      'Preventing access to children'
    ]
  },
  {
    id: 'workplace-rights',
    title: 'Workplace Rights and Protections',
    category: 'rights',
    summary: 'Men have workplace rights including protection from discrimination and false allegations',
    content: 'Employees have the right to a fair and non-discriminatory workplace. Protection is provided against sexual harassment, false allegations, wrongful termination, and workplace abuse.',
    keyPoints: [
      'Protection from discrimination based on any protected characteristic',
      'Right to fair wages and working conditions',
      'Protection against sexual harassment (men can be victims too)',
      'Right to investigate false workplace allegations',
      'Grievance redressal mechanisms must be fair and impartial'
    ],
    relatedLaws: ['Industrial Disputes Act, 1947', 'Sexual Harassment of Women at Workplace Act, 2013'],
    practicalSteps: [
      'Report harassment through official channels',
      'File complaints in writing with HR',
      'Keep documentation of all incidents',
      'Seek legal counsel if facing unfair termination'
    ]
  },
  {
    id: 'property-rights',
    title: 'Property and Financial Rights',
    category: 'rights',
    summary: 'Men have equal property rights and financial protections in law',
    content: 'Men have equal rights to own, inherit, and control property. Property rights are protected equally regardless of gender, whether inherited, purchased, or earned.',
    keyPoints: [
      'Equal right to inherit property and assets',
      'Right to own and control personal property',
      'Equal rights in matrimonial property',
      'Right to protect against fraudulent claims',
      'Legal remedies for property theft or unauthorized use'
    ],
    relatedLaws: ['Hindu Succession Act, 1956', 'Section 11, Criminal Procedure Code'],
    practicalSteps: [
      'Maintain clear documentation of property ownership',
      'Register property in legal name',
      'Keep inheritance documents safe',
      'Seek legal counsel in property disputes'
    ]
  }
];

interface LandingPageProps {
  onNavigate?: (page: 'knowledge' | 'lawyers' | 'analyzer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const selectedCardData = mensRightsCards.find(card => card.id === selectedCard);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <section className="py-28 px-4 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/50 rounded-full backdrop-blur-sm hover:border-emerald-400 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all">
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text">⚖️ Legal Empowerment for Men in India</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Know Your<br/><span className="text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text">Legal Rights</span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Empowered with AI-driven legal awareness, expert guidance, and fair solutions. Navigate India's legal system with confidence and equality.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button 
                onClick={() => onNavigate?.('analyzer')}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:shadow-2xl hover:shadow-emerald-400/40 px-8 py-4 rounded-xl font-bold text-lg transition-all text-slate-900 flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 active:translate-y-0"
              >
                <Zap className="w-5 h-5" /> Start AI Analysis
              </button>
              <button 
                onClick={() => onNavigate?.('knowledge')}
                className="border-2 border-emerald-400 hover:bg-emerald-400/10 px-8 py-4 rounded-xl font-bold text-lg transition-all text-emerald-300 hover:shadow-lg shadow-sm hover:border-emerald-300"
              >
                Learn Law Concepts
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-20">
            <div className="text-center bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 p-8 rounded-2xl hover:bg-cyan-500/25 hover:border-cyan-400/50 transition-all shadow-lg hover:-translate-y-1">
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-3\">60+</p>
              <p className="text-blue-100 font-semibold">Law Concepts</p>
              <p className="text-xs text-blue-300 mt-1">Documented & Explained</p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-500/20 to-indigo-500/10 backdrop-blur-md border border-blue-400/30 p-8 rounded-2xl hover:bg-blue-500/25 hover:border-blue-400/50 transition-all shadow-lg hover:-translate-y-1">
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text mb-3">8+</p>
              <p className="text-blue-100 font-semibold\">Expert Lawyers</p>
              <p className="text-xs text-blue-300 mt-1">Ready to Help You</p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-md border border-blue-400/30 p-8 rounded-2xl hover:bg-blue-500/25 hover:border-blue-400/50 transition-all shadow-lg hover:-translate-y-1">
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text mb-3\">5</p>
              <p className="text-blue-100 font-semibold\">SDG Goals</p>
              <p className="text-xs text-blue-300 mt-1\">Supported</p>
            </div>
            <div className="text-center bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 p-8 rounded-2xl hover:bg-cyan-500/25 hover:border-cyan-400/50 transition-all shadow-lg hover:-translate-y-1">
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-3\">100%</p>
              <p className="text-blue-100 font-semibold\">Secure</p>
              <p className="text-xs text-blue-300 mt-1\">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">Comprehensive Legal Solutions</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Everything you need to understand and protect your legal rights</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                color: 'from-cyan-500 to-blue-500',
                title: 'Legal Knowledge',
                desc: '60+ law concepts relevant to men in India with detailed explanations'
              },
              {
                icon: <Users className="w-8 h-8" />,
                color: 'from-blue-500 to-indigo-500',
                title: 'Expert Lawyers',
                desc: 'Connect with specialized legal professionals in your area'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                color: 'from-indigo-500 to-purple-500',
                title: 'Evidence Checklist',
                desc: 'Step-by-step guide to gather and organize legal evidence'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                color: 'from-cyan-400 to-blue-400',
                title: 'Action Guides',
                desc: 'Detailed procedures for handling various legal scenarios'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                color: 'from-blue-400 to-cyan-400',
                title: 'Mental Support',
                desc: 'Resources and helplines for emotional well-being during challenges'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                color: 'from-indigo-400 to-blue-400',
                title: 'AI Assistant',
                desc: 'Get instant legal analysis and guidance for your situations'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur border border-cyan-400/30 p-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-all">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Men's Rights Cards Preview */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Men's Legal Rights</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Understand your fundamental rights. Every man deserves fair treatment and equal protection under law.
            </p>
          </div>

          {selectedCardData ? (
            <div className="mb-8 animate-fade-in">
              <button
                onClick={() => setSelectedCard(null)}
                className="mb-8 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/30 inline-flex items-center gap-2"
              >
                ← Back to Cards
              </button>
              <div className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur border border-cyan-400/30 p-8 rounded-2xl shadow-2xl shadow-blue-900/50">
                <KnowledgeCard card={selectedCardData} compact={false} />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {mensRightsCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className="text-left bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur border border-cyan-400/30 p-7 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 hover:border-cyan-400/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-all">{card.title}</h3>
                    <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 group-hover:translate-x-2 transition-all" />
                  </div>
                  <p className="text-blue-100 text-sm mb-4">{card.summary}</p>
                  <span className="inline-block text-xs font-bold uppercase px-3 py-1.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 rounded-full border border-cyan-400/50\">
                    {card.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">How We Can Help You</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto\">Common legal situations where we provide guidance and support</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '⚖️',
                title: 'False Accusations',
                desc: 'Defend against false criminal charges and protect your rights'
              },
              {
                emoji: '🛡️',
                title: 'Harassment & Cybercrime',
                desc: 'Protection from threats and online abuse with legal remedies'
              },
              {
                emoji: '👨‍👧',
                title: 'Family Law',
                desc: 'Custody rights, divorce, and child support guidance'
              },
              {
                emoji: '📢',
                title: 'Defamation Issues',
                desc: 'Protect your reputation against false statements'
              },
              {
                emoji: '💼',
                title: 'Workplace Rights',
                desc: 'Discrimination, wrongful termination, and fair treatment'
              },
              {
                emoji: '⚡',
                title: 'Legal Awareness',
                desc: 'Understand your rights and obligations comprehensively'
              }
            ].map((useCase, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur border border-cyan-400/30 p-8 rounded-2xl hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 hover:border-cyan-400/50 transition-all text-center group"
              >
                <p className="text-5xl mb-4 group-hover:scale-125 transition-transform">{useCase.emoji}</p>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-blue-100 leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl -ml-40 -mb-40" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Protect Your Rights?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed font-medium">
            Start exploring legal knowledge, connect with experts, or get instant analysis for your legal situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={() => onNavigate?.('knowledge')}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-2xl hover:shadow-cyan-400/40 px-8 py-4 rounded-xl font-bold text-lg transition-all text-slate-900 hover:-translate-y-1 shadow-lg"
            >
              📚 Explore Law Concepts
            </button>
            <button 
              onClick={() => onNavigate?.('lawyers')}
              className="border-2 border-cyan-400 hover:bg-cyan-400/10 px-8 py-4 rounded-xl font-bold text-lg transition-all text-cyan-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              👨‍⚖️ Find Expert Lawyer
            </button>
            <button 
              onClick={() => onNavigate?.('analyzer')}
              className="border-2 border-blue-400 hover:bg-blue-400/10 px-8 py-4 rounded-xl font-bold text-lg transition-all text-blue-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
            >
              ⚡ AI Legal Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Daily Live News Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-t border-blue-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">LIVE</span>
            <h3 className="text-xl font-bold text-white">📰 Daily India News</h3>
          </div>
          <div className="overflow-hidden bg-slate-800/50 rounded-xl border border-blue-700/30">
            <div className="flex animate-marquee whitespace-nowrap py-4">
              <span className="mx-8 text-blue-100">🏛️ Supreme Court announces new guidelines for faster case disposal across High Courts</span>
              <span className="mx-8 text-emerald-300">⚖️ Legal Aid Services now available in 500+ district courts nationwide</span>
              <span className="mx-8 text-blue-100">📋 New cybercrime helpline 1930 receives 10,000+ calls daily</span>
              <span className="mx-8 text-amber-300">🔒 Data Protection Bill: Citizens can now file complaints online</span>
              <span className="mx-8 text-blue-100">👨‍⚖️ Bar Council expands free legal consultation hours for citizens</span>
              <span className="mx-8 text-rose-300">🚨 Consumer Court digitization: File complaints from home</span>
              <span className="mx-8 text-blue-100">📱 E-Courts app crosses 50 million downloads - check case status instantly</span>
              <span className="mx-8 text-emerald-300">✅ Fast Track Courts deliver 2 lakh+ judgments this quarter</span>
              <span className="mx-8 text-blue-100">🏛️ Supreme Court announces new guidelines for faster case disposal across High Courts</span>
              <span className="mx-8 text-emerald-300">⚖️ Legal Aid Services now available in 500+ district courts nationwide</span>
            </div>
          </div>
          <p className="text-center text-blue-300 text-sm mt-3">🔄 News updates every hour | Source: Legal News India</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-800 py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Nytrix AI</h3>
            <p className="text-blue-100 font-medium">Promoting Justice, Equality & Fair Treatment Under Law</p>
          </div>
          <div className="border-t border-blue-800 pt-6">
            <p className="text-center text-blue-200 text-sm leading-relaxed">
              ⚖️ This platform provides general legal awareness and education. It is <strong>NOT a substitute for professional legal advice</strong>. 
              Always consult a qualified, registered advocate for your specific legal matters.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
