import React, { useState } from 'react';
import { Globe, Zap, Users, Target, TrendingUp, Award, ChevronDown } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-500/30 text-emerald-300 rounded-full font-bold text-sm border border-emerald-400/30">
            🌍 UN Sustainable Development Goals
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">Our Alignment with the SDGs</h1>
          <p className="text-emerald-200 text-lg">
            How Nytrix AI contributes to global sustainable development
          </p>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-8 rounded-lg mb-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-emerald-100 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400" /> Our Mission
          </h2>
          <p className="text-emerald-200 leading-relaxed mb-4">
            Nytrix AI is committed to the United Nations Sustainable Development Goals (SDGs), a universal call to action to end poverty, protect the planet, and ensure peace and prosperity. We specifically contribute to 5 key SDGs by promoting legal awareness, equality, and access to justice.
          </p>
          <div className="grid sm:grid-cols-5 gap-4 mt-6">
            {sdgAreas.map((area) => (
              <div key={area.goal} className="text-center p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/30 backdrop-blur">
                <div className="text-3xl mb-2">{area.icon}</div>
                <p className="font-bold text-emerald-200">Goal {area.goal}</p>
                <p className="text-xs text-emerald-300 mt-1 line-clamp-2">{area.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Goals */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-emerald-100 mb-4">Detailed Alignment</h2>
          {sdgAreas.map((area) => {
            const isExpanded = expandedGoal === area.goal;

            return (
              <div key={area.goal} className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 rounded-lg overflow-hidden backdrop-blur">
                <button
                  onClick={() => setExpandedGoal(isExpanded ? null : area.goal)}
                  className="w-full flex items-center justify-between p-6 hover:bg-purple-800/50 transition-colors"
                >
                  <div className="flex items-start gap-4 text-left flex-1">
                    <div className="text-4xl flex-shrink-0">{area.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-100">
                        SDG {area.goal}: {area.title}
                      </h3>
                      <p className="text-sm text-emerald-300 mt-2">{area.description}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-0 border-t border-emerald-400/30 space-y-4">
                    {/* Targets */}
                    <div>
                      <h4 className="font-bold text-emerald-100 mb-3">Targets:</h4>
                      <ul className="space-y-2">
                        {area.targets.map((target, idx) => (
                          <li key={idx} className="flex gap-3 text-emerald-200 text-sm">
                            <span className="text-teal-400 font-bold">✓</span>
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How We Align */}
                    <div className="bg-teal-500/20 border border-teal-400/30 p-4 rounded-lg backdrop-blur">
                      <h4 className="font-bold text-teal-200 mb-2">How We Align:</h4>
                      <p className="text-teal-200 text-sm leading-relaxed">{area.howWeAlign}</p>
                    </div>

                    {/* Impact */}
                    <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-lg backdrop-blur">
                      <h4 className="font-bold text-emerald-200 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Our Impact
                      </h4>
                      <p className="text-emerald-200 text-sm leading-relaxed">{area.impact}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key Statistics */}
        <div className="bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-cyan-500/40 text-white p-8 rounded-lg mb-8 border border-emerald-400/30 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6 text-emerald-100">Our Impact by the Numbers</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-emerald-300">60+</p>
              <p className="text-emerald-200 text-sm">Law Concepts Documented</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-teal-300">8</p>
              <p className="text-emerald-200 text-sm">Specialized Lawyers Listed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-cyan-300">5</p>
              <p className="text-emerald-200 text-sm">SDGs Supported</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-emerald-300">100%</p>
              <p className="text-emerald-200 text-sm">Commitment to Fairness</p>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-8 rounded-lg backdrop-blur">
          <h2 className="text-2xl font-bold text-emerald-100 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" /> Implementation Strategy
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-emerald-500/40 rounded-full font-bold text-emerald-300 border border-emerald-400/30">1</div>
              <div>
                <h3 className="font-bold text-emerald-100">Education & Awareness</h3>
                <p className="text-emerald-300 text-sm mt-1">Providing accessible legal knowledge to empower citizens.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-500/40 rounded-full font-bold text-teal-300 border border-teal-400/30">2</div>
              <div>
                <h3 className="font-bold text-emerald-100">Access to Justice</h3>
                <p className="text-emerald-300 text-sm mt-1">Connecting individuals with qualified legal professionals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500/40 rounded-full font-bold text-cyan-300 border border-cyan-400/30">3</div>
              <div>
                <h3 className="font-bold text-emerald-100">Mental Health Support</h3>
                <p className="text-emerald-300 text-sm mt-1">Promoting psychological well-being alongside legal guidance.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-emerald-500/40 rounded-full font-bold text-emerald-300 border border-emerald-400/30">4</div>
              <div>
                <h3 className="font-bold text-emerald-100">Institutional Partnerships</h3>
                <p className="text-emerald-300 text-sm mt-1">Collaborating with legal bodies and civil society organizations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-500/40 rounded-full font-bold text-teal-300 border border-teal-400/30">5</div>
              <div>
                <h3 className="font-bold text-emerald-100">Equity & Fairness</h3>
                <p className="text-emerald-300 text-sm mt-1">Ensuring equal treatment and fair processes for all genders.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 p-8 rounded-lg backdrop-blur">
          <h3 className="text-2xl font-bold text-emerald-100 mb-3 flex items-center justify-center gap-2">
            <Globe className="w-6 h-6" /> Join Us in Creating Positive Change
          </h3>
          <p className="text-emerald-200 mb-4">
            Together, we can build a more just and equitable society where legal rights are protected and access to justice is universal.
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
            Learn More About Our Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default SDGPage;
