import React, { useState, useEffect } from 'react';
import { Globe, Zap, Users, Target, TrendingUp, Award, ChevronDown, Sun, Moon } from 'lucide-react';

// Theme hook with localStorage persistence
const useTheme = (storageKey: string = 'nytrix-sdg-theme') => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
  }, [isDark, storageKey]);

  return { isDark, toggleTheme: () => setIsDark(!isDark) };
};

interface SDGArea {
  goal: number;
  title: string;
  description: string;
  targets: string[];
  howWeAlign: string;
  impact: string;
  icon: any;
}

const sdgAreas: SDGArea[] = [
  {
    goal: 3,
    title: 'Good Health and Well-being',
    description: 'Ensuring healthy lives and promoting well-being for all at all ages',
    targets: [
      'Mental health support and awareness',
      'Reduced stress and trauma from legal disputes',
      'Access to counseling and mental health services',
      'Promotion of fair and just legal processes'
    ],
    howWeAlign: 'Nytrix AI provides mental health resources, helpline information, and guidance to prevent harm from false accusations and harassment.',
    impact: 'Protecting individuals from psychological harm and promoting mental wellness through legal awareness.',
    icon: '❤️'
  },
  {
    goal: 5,
    title: 'Gender Equality',
    description: 'Achieve gender equality and empower all women and men',
    targets: [
      'End discrimination and violence against all people',
      'Equal access to justice for all genders',
      'Fair legal processes regardless of gender',
      'Protection from harassment and abuse for everyone'
    ],
    howWeAlign: 'We promote equality before the law and fair treatment, recognizing that legal fairness benefits everyone.',
    impact: 'Advancing gender equality by promoting fair legal treatment and equal protection for all individuals.',
    icon: '⚖️'
  },
  {
    goal: 10,
    title: 'Reduced Inequalities',
    description: 'Reduce inequality within and among countries',
    targets: [
      'Equal access to legal information and resources',
      'Reduced discrimination in legal processes',
      'Empowerment of vulnerable populations',
      'Fair representation in legal systems'
    ],
    howWeAlign: 'By providing accessible legal awareness and lawyer directory, we reduce inequalities in legal access.',
    impact: 'Bridging the gap between the privileged and underprivileged in accessing legal knowledge and professional help.',
    icon: '🤝'
  },
  {
    goal: 16,
    title: 'Peace, Justice and Strong Institutions',
    description: 'Promote peaceful and inclusive societies and effective institutions',
    targets: [
      'Reduce all forms of violence and harassment',
      'Promote rule of law and equal access to justice',
      'Build effective, accountable institutions',
      'Support fair legal and judicial processes'
    ],
    howWeAlign: 'Nytrix AI promotes understanding of Indian legal systems, encourages lawful responses to conflict, and supports institutional fairness.',
    impact: 'Strengthening justice systems by educating citizens, reducing abuse of legal processes, and promoting institutional accountability.',
    icon: '⚔️'
  },
  {
    goal: 17,
    title: 'Partnerships for the Goals',
    description: 'Strengthen implementation and global partnerships',
    targets: [
      'Collaboration with legal professionals and institutions',
      'Partnership with mental health organizations',
      'Engagement with NGOs and civil society',
      'Knowledge sharing and capacity building'
    ],
    howWeAlign: 'We partner with lawyers, mental health professionals, and legal institutions to provide comprehensive support.',
    impact: 'Building strong partnerships to create a supportive ecosystem for individuals facing legal challenges.',
    icon: '🌍'
  }
];

const SDGPage: React.FC = () => {
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);
  const { isDark, toggleTheme } = useTheme('nytrix-sdg-theme');

  // Theme classes
  const theme = {
    bg: isDark ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50',
    card: isDark ? 'bg-gradient-to-br from-purple-800/40 to-purple-900/40 border-emerald-400/30' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50',
    textPrimary: isDark ? 'text-emerald-100' : 'text-slate-800',
    textSecondary: isDark ? 'text-emerald-200' : 'text-slate-600',
    textMuted: isDark ? 'text-emerald-300' : 'text-slate-500',
    textAccent: isDark ? 'text-emerald-400' : 'text-emerald-600',
    badge: isDark ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/30' : 'bg-emerald-100 text-emerald-700 border-emerald-300',
    goalCard: isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300',
    expandedBorder: isDark ? 'border-emerald-400/30' : 'border-slate-200',
    targetBg: isDark ? 'bg-teal-500/20 border-teal-400/30' : 'bg-teal-50 border-teal-300',
    targetText: isDark ? 'text-teal-200' : 'text-teal-700',
    impactBg: isDark ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-50 border-emerald-300',
    impactText: isDark ? 'text-emerald-200' : 'text-emerald-700',
    statsBg: isDark ? 'bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-cyan-500/40 border-emerald-400/30' : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500',
    stepBg1: isDark ? 'bg-emerald-500/40 border-emerald-400/30' : 'bg-emerald-500 border-emerald-600',
    stepBg2: isDark ? 'bg-teal-500/40 border-teal-400/30' : 'bg-teal-500 border-teal-600',
    stepBg3: isDark ? 'bg-cyan-500/40 border-cyan-400/30' : 'bg-cyan-500 border-cyan-600',
    ctaBg: isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30' : 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300',
    buttonHover: isDark ? 'hover:bg-purple-800/50' : 'hover:bg-slate-50',
  };

  return (
    <div className={`h-full overflow-y-auto ${theme.bg}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              isDark 
                ? 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-700/80' 
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className={`inline-block mb-4 px-4 py-2 rounded-full font-bold text-sm border ${theme.badge}`}>
            🌍 UN Sustainable Development Goals
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent' : 'text-slate-800'}`}>
            Our Alignment with the SDGs
          </h1>
          <p className={`text-lg ${theme.textSecondary}`}>
            How Nytrix AI contributes to global sustainable development
          </p>
        </div>

        {/* Overview */}
        <div className={`${theme.card} border p-8 rounded-xl mb-8 backdrop-blur`}>
          <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme.textPrimary}`}>
            <Target className={`w-6 h-6 ${theme.textAccent}`} /> Our Mission
          </h2>
          <p className={`leading-relaxed mb-4 ${theme.textSecondary}`}>
            Nytrix AI is committed to the United Nations Sustainable Development Goals (SDGs), a universal call to action to end poverty, protect the planet, and ensure peace and prosperity. We specifically contribute to 5 key SDGs by promoting legal awareness, equality, and access to justice.
          </p>
          <div className="grid sm:grid-cols-5 gap-4 mt-6">
            {sdgAreas.map((area) => (
              <div key={area.goal} className={`text-center p-4 ${theme.goalCard} rounded-xl border backdrop-blur`}>
                <div className="text-3xl mb-2">{area.icon}</div>
                <p className={`font-bold ${theme.textSecondary}`}>Goal {area.goal}</p>
                <p className={`text-xs mt-1 line-clamp-2 ${theme.textMuted}`}>{area.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Goals */}
        <div className="space-y-4 mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${theme.textPrimary}`}>Detailed Alignment</h2>
          {sdgAreas.map((area) => {
            const isExpanded = expandedGoal === area.goal;

            return (
              <div key={area.goal} className={`${theme.card} border rounded-xl overflow-hidden backdrop-blur`}>
                <button
                  onClick={() => setExpandedGoal(isExpanded ? null : area.goal)}
                  className={`w-full flex items-center justify-between p-6 ${theme.buttonHover} transition-colors`}
                >
                  <div className="flex items-start gap-4 text-left flex-1">
                    <div className="text-4xl flex-shrink-0">{area.icon}</div>
                    <div>
                      <h3 className={`text-lg font-bold ${theme.textPrimary}`}>
                        SDG {area.goal}: {area.title}
                      </h3>
                      <p className={`text-sm mt-2 ${theme.textMuted}`}>{area.description}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 ${theme.textAccent} transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className={`px-6 pb-6 pt-0 border-t ${theme.expandedBorder} space-y-4`}>
                    {/* Targets */}
                    <div>
                      <h4 className={`font-bold mb-3 ${theme.textPrimary}`}>Targets:</h4>
                      <ul className="space-y-2">
                        {area.targets.map((target, idx) => (
                          <li key={idx} className={`flex gap-3 text-sm ${theme.textSecondary}`}>
                            <span className={`font-bold ${theme.textAccent}`}>✓</span>
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How We Align */}
                    <div className={`${theme.targetBg} border p-4 rounded-xl backdrop-blur`}>
                      <h4 className={`font-bold mb-2 ${theme.targetText}`}>How We Align:</h4>
                      <p className={`text-sm leading-relaxed ${theme.targetText}`}>{area.howWeAlign}</p>
                    </div>

                    {/* Impact */}
                    <div className={`${theme.impactBg} border p-4 rounded-xl backdrop-blur`}>
                      <h4 className={`font-bold mb-2 flex items-center gap-2 ${theme.impactText}`}>
                        <TrendingUp className="w-4 h-4" /> Our Impact
                      </h4>
                      <p className={`text-sm leading-relaxed ${theme.impactText}`}>{area.impact}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key Statistics */}
        <div className={`${theme.statsBg} text-white p-8 rounded-xl mb-8 border backdrop-blur`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-emerald-100' : 'text-white'}`}>Our Impact by the Numbers</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className={`text-4xl font-bold mb-2 ${isDark ? 'text-emerald-300' : 'text-white'}`}>60+</p>
              <p className={`text-sm ${isDark ? 'text-emerald-200' : 'text-white/90'}`}>Law Concepts Documented</p>
            </div>
            <div className="text-center">
              <p className={`text-4xl font-bold mb-2 ${isDark ? 'text-teal-300' : 'text-white'}`}>8</p>
              <p className={`text-sm ${isDark ? 'text-emerald-200' : 'text-white/90'}`}>Specialized Lawyers Listed</p>
            </div>
            <div className="text-center">
              <p className={`text-4xl font-bold mb-2 ${isDark ? 'text-cyan-300' : 'text-white'}`}>5</p>
              <p className={`text-sm ${isDark ? 'text-emerald-200' : 'text-white/90'}`}>SDGs Supported</p>
            </div>
            <div className="text-center">
              <p className={`text-4xl font-bold mb-2 ${isDark ? 'text-emerald-300' : 'text-white'}`}>100%</p>
              <p className={`text-sm ${isDark ? 'text-emerald-200' : 'text-white/90'}`}>Commitment to Fairness</p>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div className={`${theme.card} border p-8 rounded-xl backdrop-blur`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${theme.textPrimary}`}>
            <Zap className="w-6 h-6 text-amber-400" /> Implementation Strategy
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${theme.stepBg1} rounded-full font-bold ${isDark ? 'text-emerald-300' : 'text-white'} border`}>1</div>
              <div>
                <h3 className={`font-bold ${theme.textPrimary}`}>Education & Awareness</h3>
                <p className={`text-sm mt-1 ${theme.textMuted}`}>Providing accessible legal knowledge to empower citizens.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${theme.stepBg2} rounded-full font-bold ${isDark ? 'text-teal-300' : 'text-white'} border`}>2</div>
              <div>
                <h3 className={`font-bold ${theme.textPrimary}`}>Access to Justice</h3>
                <p className={`text-sm mt-1 ${theme.textMuted}`}>Connecting individuals with qualified legal professionals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${theme.stepBg3} rounded-full font-bold ${isDark ? 'text-cyan-300' : 'text-white'} border`}>3</div>
              <div>
                <h3 className={`font-bold ${theme.textPrimary}`}>Mental Health Support</h3>
                <p className={`text-sm mt-1 ${theme.textMuted}`}>Promoting psychological well-being alongside legal guidance.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${theme.stepBg1} rounded-full font-bold ${isDark ? 'text-emerald-300' : 'text-white'} border`}>4</div>
              <div>
                <h3 className={`font-bold ${theme.textPrimary}`}>Institutional Partnerships</h3>
                <p className={`text-sm mt-1 ${theme.textMuted}`}>Collaborating with legal bodies and civil society organizations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${theme.stepBg2} rounded-full font-bold ${isDark ? 'text-teal-300' : 'text-white'} border`}>5</div>
              <div>
                <h3 className={`font-bold ${theme.textPrimary}`}>Equity & Fairness</h3>
                <p className={`text-sm mt-1 ${theme.textMuted}`}>Ensuring equal treatment and fair processes for all genders.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-8 text-center ${theme.ctaBg} border p-8 rounded-xl backdrop-blur`}>
          <h3 className={`text-2xl font-bold mb-3 flex items-center justify-center gap-2 ${theme.textPrimary}`}>
            <Globe className="w-6 h-6" /> Join Us in Creating Positive Change
          </h3>
          <p className={`mb-4 ${theme.textSecondary}`}>
            Together, we can build a more just and equitable society where legal rights are protected and access to justice is universal.
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
            Learn More About Our Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default SDGPage;
