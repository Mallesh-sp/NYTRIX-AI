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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-indigo-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-amber-400/20 border border-amber-400/50 rounded-full">
              <span className="text-sm font-bold text-amber-300">⚖️ Legal Awareness for Men in India</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Know Your Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Rights</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Navigate India's legal system with confidence. AI-powered legal awareness, expert guidance, and fair solutions for men facing legal challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-lg hover:shadow-orange-500/50 px-8 py-4 rounded-lg font-bold text-lg transition-all text-slate-900 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" /> Get Started Now
              </button>
              <button className="border-2 border-amber-400/50 hover:bg-amber-400/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-amber-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <div className="text-center bg-indigo-800/40 border border-indigo-700/50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-amber-400 mb-2">60+</p>
              <p className="text-indigo-200">Law Concepts</p>
            </div>
            <div className="text-center bg-indigo-800/40 border border-indigo-700/50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-amber-400 mb-2">8</p>
              <p className="text-indigo-200">Expert Lawyers</p>
            </div>
            <div className="text-center bg-indigo-800/40 border border-indigo-700/50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-amber-400 mb-2">5</p>
              <p className="text-indigo-200">SDGs Supported</p>
            </div>
            <div className="text-center bg-indigo-800/40 border border-indigo-700/50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-amber-400 mb-2">24/7</p>
              <p className="text-indigo-200">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-indigo-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: 'Legal Knowledge Base',
                desc: '60+ documented law concepts relevant to men in India'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Expert Lawyer Directory',
                desc: 'Find and connect with specialized legal professionals'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Evidence Checklist',
                desc: 'Step-by-step guide to gather and organize evidence'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Action Guides',
                desc: 'Detailed steps for handling legal situations'
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: 'Mental Health Support',
                desc: 'Resources and helplines for emotional well-being'
              },
              {
                icon: <ArrowRight className="w-6 h-6" />,
                title: 'AI Legal Assistant',
                desc: 'Get instant legal analysis for your scenarios'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-800/50 to-indigo-900/50 border border-indigo-700/50 p-6 rounded-lg hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10 transition-all">
                <div className="text-amber-400 mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-indigo-200 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Men's Rights Cards Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Men's Legal Rights</h2>
          <p className="text-center text-indigo-200 mb-12 max-w-2xl mx-auto">
            Understand your fundamental rights under Indian law. Every man deserves fair treatment and equal protection.
          </p>

          {selectedCardData ? (
            <div className="mb-8">
              <button
                onClick={() => setSelectedCard(null)}
                className="mb-6 px-4 py-2 bg-indigo-700/50 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition-colors"
              >
                ← Back to Cards
              </button>
              <div className="bg-gradient-to-br from-indigo-800/50 to-indigo-900/50 border border-indigo-700/50 p-8 rounded-lg">
                <KnowledgeCard card={selectedCardData} compact={false} />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {mensRightsCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className="text-left bg-gradient-to-br from-indigo-800/40 to-indigo-900/40 border border-indigo-700/50 p-6 rounded-lg hover:border-amber-400/50 hover:bg-indigo-800/60 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">{card.title}</h3>
                    <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-indigo-200 text-sm">{card.summary}</p>
                  <span className="inline-block mt-3 text-xs font-bold uppercase px-2 py-1 bg-amber-400/20 text-amber-300 rounded">
                    {card.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-indigo-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Common Situations We Help With</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '⚖️',
                title: 'False Accusations',
                desc: 'Navigate and defend against false criminal charges and allegations'
              },
              {
                emoji: '🛡️',
                title: 'Harassment & Cybercrime',
                desc: 'Protection from harassment, threats, and online abuse'
              },
              {
                emoji: '👨‍👧',
                title: 'Family Law',
                desc: 'Custody rights, divorce settlements, and child support matters'
              },
              {
                emoji: '📢',
                title: 'Defamation',
                desc: 'Protect your reputation against false statements and lies'
              },
              {
                emoji: '💼',
                title: 'Workplace Issues',
                desc: 'Discrimination, wrongful termination, and false allegations at work'
              },
              {
                emoji: '⚡',
                title: 'Legal Awareness',
                desc: 'Understand your rights and obligations under Indian law'
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 p-6 rounded-lg text-center hover:border-blue-500 transition-colors">
                <p className="text-4xl mb-3">{useCase.emoji}</p>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-slate-400 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Understand Your Rights?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Start exploring legal concepts, find expert help, or get answers to your legal questions right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate?.('knowledge')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Explore Law Concepts
            </button>
            <button 
              onClick={() => onNavigate?.('lawyers')}
              className="border-2 border-blue-400 hover:bg-blue-400/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Find a Lawyer
            </button>
            <button 
              onClick={() => onNavigate?.('analyzer')}
              className="border-2 border-green-400 hover:bg-green-400/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Get Mental Health Help
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p className="mb-4">Nytrix AI - Promoting Equality, Justice, and Fair Treatment Under Law</p>
          <p className="text-sm">
            This platform provides general legal awareness, not legal advice. Always consult a qualified lawyer for specific cases.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
