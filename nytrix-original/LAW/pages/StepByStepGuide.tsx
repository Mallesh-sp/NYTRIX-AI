import React, { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle, Phone, Heart, Sun, Moon } from 'lucide-react';

interface ActionStep {
  step: number;
  title: string;
  description: string;
  actions: string[];
  timeline: string;
  cautions?: string[];
  relatedLaws?: string[];
}

interface StepByStepGuideProps {
  onNavigate?: (page: 'lawyers') => void;
}

// Theme hook with localStorage persistence
const useTheme = (storageKey: string = 'nytrix-guide-theme') => {
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

const actionGuides: Record<string, ActionStep[]> = {
  'false-accusation': [
    {
      step: 1,
      title: 'Immediate Response (First 24 Hours)',
      description: 'Stay calm and document everything',
      actions: [
        'Do NOT admit to anything or make a written statement without a lawyer present',
        'Do NOT engage with the accuser or witnesses directly',
        'Write down the exact date, time, and details of what happened',
        'Identify and contact potential witnesses immediately',
        'Secure all physical evidence (messages, letters, documents)',
        'Inform a trusted family member or friend about the situation'
      ],
      timeline: 'Within 24 hours',
      cautions: [
        'Anything you say can be used against you in court',
        'Social media posts can be used as evidence - be careful',
        'Avoid discussing the case with anyone except your lawyer'
      ]
    },
    {
      step: 2,
      title: 'Consult a Lawyer (Within 48 Hours)',
      description: 'Get professional legal guidance immediately',
      actions: [
        'Find and consult with a criminal defense lawyer in your area',
        'Bring all documentation and evidence with you',
        'Explain the situation truthfully and completely',
        'Ask about bail options and possible legal strategies',
        'Discuss police interrogation procedures and your rights',
        'Get written advice regarding next steps'
      ],
      timeline: 'Within 48 hours',
      relatedLaws: ['Section 41, CrPC (Arrest)', 'Section 161, CrPC (Police Statement)']
    },
    {
      step: 3,
      title: 'Gather Evidence (Ongoing)',
      description: 'Collect all relevant proof of innocence',
      actions: [
        'Screenshot all messages, emails, and social media communications',
        'Collect medical records if physical examination was done',
        'Get written statements from credible witnesses with their contact details',
        'Obtain CCTV footage or surveillance evidence if available',
        'Preserve phone records, location history, and call logs',
        'Document character witnesses who can testify to your behavior'
      ],
      timeline: 'Immediately and ongoing',
      cautions: [
        'Do not destroy any evidence, even if it seems unfavorable',
        'Preserve chain of custody for digital evidence'
      ]
    },
    {
      step: 4,
      title: 'Handle Police Interrogation',
      description: 'Know your rights during questioning',
      actions: [
        'Exercise your right to remain silent (Section 161, CrPC)',
        'Insist on having your lawyer present during any questioning',
        'Do not sign any statement you haven\'t read and understood',
        'Answer only what your lawyer advises you to answer',
        'Remain calm and respectful throughout the process',
        'Ask for a copy of your statement after recording'
      ],
      timeline: 'When summoned by police',
      relatedLaws: ['Article 20(3), Constitution', 'Section 161, CrPC', 'Section 166A, IPC (False Complaint)']
    },
    {
      step: 5,
      title: 'File Counter-Case (If Appropriate)',
      description: 'Legal recourse for false allegations',
      actions: [
        'Consult your lawyer about filing a counter case under Section 166A, IPC',
        'File an FIR against the accuser for filing a false complaint',
        'Provide all evidence supporting the false nature of allegations',
        'Get police to register the case and begin investigation',
        'Work with your lawyer to build a strong counter-case',
        'Attend all court hearings and hearings for the counter-case'
      ],
      timeline: 'After initial investigation or as advised by lawyer',
      relatedLaws: ['Section 166A, IPC (False Complaint)', 'Section 182, IPC (Giving False Information)']
    },
    {
      step: 6,
      title: 'Court Proceedings & Defense',
      description: 'Prepare for trial and legal defense',
      actions: [
        'Work closely with your lawyer to prepare a defense strategy',
        'Organize all evidence in chronological order',
        'Prepare character witnesses to testify on your behalf',
        'Submit detailed written statements and affidavits',
        'Cross-examine prosecution witnesses effectively',
        'Present your evidence and testimony confidently in court'
      ],
      timeline: 'During trial (can take months to years)',
      relatedLaws: ['Section 232, IPC (False Evidence)', 'Indian Evidence Act, 1872']
    },
    {
      step: 7,
      title: 'Mental Health & Emotional Support',
      description: 'Take care of your wellbeing',
      actions: [
        'Speak with a therapist or counselor about the trauma',
        'Document mental health treatment as evidence of impact',
        'Maintain physical health through exercise and sleep',
        'Keep in touch with supportive family and friends',
        'Avoid substance abuse or harmful coping mechanisms',
        'Call mental health helplines if experiencing suicidal thoughts'
      ],
      timeline: 'Throughout the entire process'
    }
  ],
  'harassment': [
    {
      step: 1,
      title: 'Document Harassment Immediately',
      description: 'Create a detailed record',
      actions: [
        'Keep a harassment diary with dates, times, and details',
        'Take screenshots of threatening messages and posts',
        'Save emails and communication records',
        'Record dates and times of phone calls or in-person incidents',
        'Note any witnesses present during incidents',
        'Store all evidence in a safe place'
      ],
      timeline: 'Immediately after each incident',
      relatedLaws: ['Section 354, IPC (Outraging Modesty)', 'Section 506, IPC (Criminal Intimidation)']
    },
    {
      step: 2,
      title: 'File a Police Complaint (FIR)',
      description: 'Register the harassment with authorities',
      actions: [
        'Visit your local police station with documented evidence',
        'File an FIR under appropriate IPC sections',
        'Provide all evidence (screenshots, recordings, witness info)',
        'Request the police to take immediate action',
        'Get a copy of the FIR registration for your records',
        'Follow up regularly with the investigating officer'
      ],
      timeline: 'As soon as possible',
      relatedLaws: ['Section 154, CrPC (FIR)', 'Section 505, IPC (Public Mischief)']
    },
    {
      step: 3,
      title: 'Seek Legal Protection Orders',
      description: 'Get court-ordered protection',
      actions: [
        'Consult a lawyer about obtaining a restraining order',
        'File a petition in court seeking protective orders',
        'Request the court to direct police to take action',
        'Seek compensation for harassment and emotional distress',
        'Apply for anticipatory bail if threatened with false arrest',
        'Get police protection if in physical danger'
      ],
      timeline: 'Within a few days of filing FIR',
      relatedLaws: ['Section 482, CrPC (Protective Order)', 'Section 505, IPC']
    }
  ],
  'defamation': [
    {
      step: 1,
      title: 'Identify the Defamatory Content',
      description: 'Locate and document false statements',
      actions: [
        'Find all instances of defamatory content (online and offline)',
        'Take screenshots with dates, URLs, and full context',
        'Document where the content is published',
        'Note the date when content was published',
        'Identify who published or shared the content',
        'Save archives of webpages before they\'re deleted'
      ],
      timeline: 'Immediately upon discovery',
      relatedLaws: ['Section 499, IPC (Defamation)', 'Section 500, IPC (Punishment for Defamation)']
    },
    {
      step: 2,
      title: 'Send Legal Notice',
      description: 'Demand immediate removal and apology',
      actions: [
        'Hire a lawyer to draft a legal notice',
        'Send notice to the person who published defamatory content',
        'Demand immediate removal of the content',
        'Demand a public apology and retraction',
        'Set a deadline for compliance (usually 7-15 days)',
        'Keep proof of sending the notice'
      ],
      timeline: 'Within 1-2 weeks of discovery',
      cautions: [
        'Do not respond emotionally or publicly to defamation',
        'Avoid direct confrontation with the defamer'
      ]
    },
    {
      step: 3,
      title: 'File Legal Action (If Not Complied)',
      description: 'Pursue civil and/or criminal remedies',
      actions: [
        'File a civil suit for damages under tort law',
        'File a criminal complaint under Section 499-500, IPC',
        'Provide all evidence of defamatory statements',
        'Prove that statements are false and damaged your reputation',
        'Seek monetary compensation for damage to reputation',
        'Request court to order removal of defamatory content'
      ],
      timeline: 'After notice period expires',
      relatedLaws: ['Section 499-500, IPC', 'Information Technology Act, 2000 (for online defamation)']
    }
  ],
  'police-harassment': [
    {
      step: 1,
      title: 'During Police Interaction (If Scolded/Harassed)',
      description: 'Know what to do when police abuse or threaten you',
      actions: [
        'Stay calm and polite - do not argue or show anger',
        'Memorize police officer\'s name, badge number, and station details',
        'Politely ask: "What is the reason for this treatment?"',
        'Do not accept threats, abuse, or demands for money',
        'If threatened with false arrest, say: "I want to speak to a lawyer"',
        'If physically harmed, note injuries and remember witnesses'
      ],
      timeline: 'During the incident',
      cautions: [
        'Avoid physical confrontation - it will make things worse',
        'Do not record police secretly (may be illegal in some contexts)',
        'Stay respectful even if police are disrespectful',
        'Any money demand from police is illegal - refuse firmly but calmly'
      ],
      relatedLaws: ['Article 21, Constitution (Right to Life)', 'Section 330, IPC (Hurt)']
    },
    {
      step: 2,
      title: 'Document Everything (Immediate After)',
      description: 'Preserve evidence of police harassment',
      actions: [
        'Write down exact date, time, location, and what happened',
        'Get names and phone numbers of any witnesses',
        'Take photos of injuries (if physically harmed)',
        'Get medical certificate from doctor if injured',
        'Note the police station name and officer details',
        'Save copies of all communications and complaints'
      ],
      timeline: 'Within 24 hours',
      cautions: [
        'Do not destroy any evidence',
        'Keep originals, not just copies'
      ]
    },
    {
      step: 3,
      title: 'File Complaint Against Police',
      description: 'Report the misconduct through proper channels',
      actions: [
        'File FIR at a different police station against the harassing police officer',
        'Or file complaint with Police Commissioner or Police Headquarters',
        'Or file complaint with State Police Accountability Authority',
        'Provide detailed account of harassment with date and time',
        'Submit all evidence: injuries, witnesses, medical certificates',
        'Mention specific sections violated (abuse, threats, illegal demands)',
        'Request investigation and action against guilty officer'
      ],
      timeline: 'Within 1 week of incident',
      relatedLaws: ['Section 154, CrPC (FIR)', 'Section 330, IPC (Hurt)', 'Article 21, Constitution']
    },
    {
      step: 4,
      title: 'Seek Legal Remedies',
      description: 'Legal action for compensation',
      actions: [
        'Consult lawyer about civil suit for damages',
        'File case under tort law for harassment and emotional distress',
        'Claim compensation for medical expenses and mental trauma',
        'Request court order for apology from police',
        'Pursue criminal action if applicable',
        'Get protection order if harassment continues'
      ],
      timeline: 'After complaint filed',
      relatedLaws: ['Tort Law', 'Section 12, Police Act, 1861']
    }
  ],
  'police-arrest': [
    {
      step: 1,
      title: 'Moment of Arrest (Know Your Rights)',
      description: 'What you MUST do when arrested',
      actions: [
        'Ask the police officer: "Why am I being arrested? Tell me the reason clearly."',
        'Politely but firmly say: "I want to speak to a lawyer. I will not answer questions without a lawyer."',
        'Do NOT answer any questions or make any statement',
        'Do NOT sign any document without lawyer present',
        'Remember the police officer\'s name, badge number, station',
        'Inform family or trusted person (you have this right)',
        'Ask for water, food, and bathroom access - you have these rights'
      ],
      timeline: 'At the moment of arrest',
      cautions: [
        'Anything you say WILL be used against you in court',
        'Staying silent is NOT an admission of guilt - it\'s your right',
        'Do not panic or show aggression - it worsens your situation',
        'Police may make threats - this does not change your rights'
      ],
      relatedLaws: ['Article 22, Constitution', 'Section 41, CrPC', 'Section 50, CrPC']
    },
    {
      step: 2,
      title: 'Police Custody (First 24 Hours)',
      description: 'What happens during police custody',
      actions: [
        'Police can hold you for maximum 24 hours',
        'You MUST be taken to magistrate after 24 hours',
        'Refuse to answer police questions - your lawyer will advise you',
        'Refuse to sign any statement you don\'t fully understand',
        'Insist on medical examination before police custody',
        'Demand to speak to your lawyer - it\'s your constitutional right',
        'Ask for copies of all documents related to your arrest'
      ],
      timeline: 'During the 24-hour period',
      cautions: [
        'Police may use psychological pressure - stay calm and silent',
        'False confessions extracted under pressure are inadmissible',
        'Do not believe false promises like "confesss and go home"'
      ],
      relatedLaws: ['Article 20(3), Constitution', 'Section 161, CrPC', 'Section 166A, IPC']
    },
    {
      step: 3,
      title: 'Appearance Before Magistrate',
      description: 'Your court hearing within 24 hours',
      actions: [
        'Magistrate must be told you want a lawyer',
        'Magistrate will decide: release, bail, or jail custody',
        'Speak only through your lawyer in court',
        'Tell the magistrate if you were harmed or threatened',
        'Request bail immediately',
        'If bail denied, request judicial custody instead of police custody'
      ],
      timeline: 'Within 24 hours of arrest',
      relatedLaws: ['Section 157, CrPC', 'Section 60, CrPC (Bail)']
    },
    {
      step: 4,
      title: 'Bail and Judicial Custody',
      description: 'Getting released from police detention',
      actions: [
        'Your lawyer will argue for bail before magistrate',
        'Provide proof: fixed address, family ties, job, local residence',
        'Agree to conditions: reporting to police station, surrender passport, etc.',
        'If bail granted, pay bail amount and get released',
        'If bail denied, go to judicial custody in jail (safer than police custody)',
        'From jail, your lawyer can file bail appeal in higher court'
      ],
      timeline: 'During magistrate hearing',
      cautions: [
        'Police custody is more dangerous - judicial custody is better',
        'Some crimes have no bail (serious crimes) - but lawyer can fight for bail'
      ],
      relatedLaws: ['Section 60, CrPC (Bail)', 'Section 161-167, CrPC']
    }
  ]
};

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ onNavigate }) => {
  const [selectedGuide, setSelectedGuide] = useState<string>('false-accusation');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const { isDark, toggleTheme } = useTheme('nytrix-guide-theme');

  const guides = [
    { id: 'false-accusation', label: '⚖️ Defending Against False Accusations', icon: '🚨' },
    { id: 'harassment', label: '🛡️ Dealing with Harassment', icon: '⚠️' },
    { id: 'defamation', label: '📢 Handling Defamation', icon: '📰' },
    { id: 'police-harassment', label: '👮 When Police Scold/Harass You', icon: '⚡' },
    { id: 'police-arrest', label: '🔒 Your Rights During Arrest', icon: '⚖️' }
  ];

  const steps = actionGuides[selectedGuide] || [];

  // Theme classes
  const theme = {
    bg: isDark ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
    card: isDark ? 'bg-gradient-to-br from-purple-800/40 to-purple-900/40 border-emerald-400/30' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50',
    textPrimary: isDark ? 'text-emerald-100' : 'text-slate-800',
    textSecondary: isDark ? 'text-emerald-200' : 'text-slate-600',
    textMuted: isDark ? 'text-emerald-300' : 'text-slate-500',
    textAccent: isDark ? 'text-emerald-400' : 'text-emerald-600',
    badge: isDark ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/30' : 'bg-emerald-100 text-emerald-700 border-emerald-300',
    warningBg: isDark ? 'bg-red-500/20 border-red-400' : 'bg-red-50 border-red-400',
    warningText: isDark ? 'text-red-300' : 'text-red-700',
    warningTextLight: isDark ? 'text-red-200' : 'text-red-600',
    cautionBg: isDark ? 'bg-amber-500/20 border-amber-400/30' : 'bg-amber-50 border-amber-300',
    cautionText: isDark ? 'text-amber-200' : 'text-amber-700',
    selectedBtn: isDark ? 'border-emerald-400 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 shadow-lg shadow-emerald-500/30' : 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-200/50',
    unselectedBtn: isDark ? 'border-emerald-400/30 bg-purple-800/40 hover:border-emerald-400' : 'border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md',
    buttonExpandedBg: isDark ? 'hover:bg-purple-800/50' : 'hover:bg-slate-50',
    lawBadge: isDark ? 'bg-purple-900/40 text-emerald-300 border-emerald-400/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200',
    supportCard: isDark ? 'bg-purple-900/30 border-emerald-400/20' : 'bg-slate-50 border-slate-200',
    ctaBg: isDark ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 border-emerald-400/30' : 'bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800 border-indigo-400/30',
    glowBtn: isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-400/40',
    helpCard: isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300',
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
            📋 Step-by-Step Action Guide
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent' : 'text-slate-800'}`}>
            Step-by-Step Action Guide
          </h1>
          <p className={`text-lg ${theme.textSecondary}`}>Detailed guidance for navigating legal situations</p>
        </div>

        {/* Guide Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => {
                setSelectedGuide(guide.id);
                setExpandedStep(null);
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedGuide === guide.id
                  ? theme.selectedBtn
                  : theme.unselectedBtn
              }`}
            >
              <div className="text-2xl mb-2">{guide.icon}</div>
              <p className={`font-bold text-sm ${theme.textPrimary}`}>{guide.label}</p>
            </button>
          ))}
        </div>

        {/* Warning Banner */}
        <div className={`${theme.warningBg} border-l-4 p-6 rounded-r-xl mb-8 backdrop-blur`}>
          <h3 className={`font-bold mb-2 flex items-center gap-2 ${theme.warningText}`}>
            <AlertCircle className="w-5 h-5" /> Important
          </h3>
          <p className={`text-sm leading-relaxed ${theme.warningTextLight}`}>
            These guides provide general information. Every situation is unique and requires personalized legal advice. 
            <strong> Always consult with a qualified lawyer before taking action. </strong>
            This is especially important if you're facing criminal charges or legal proceedings.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => {
            const isExpanded = expandedStep === step.step;

            return (
              <div key={step.step} className={`border rounded-xl overflow-hidden backdrop-blur ${theme.card}`}>
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : step.step)}
                  className={`w-full flex items-center justify-between p-5 ${theme.buttonExpandedBg} transition-colors`}
                >
                  <div className="flex items-start gap-4 text-left flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex-shrink-0 shadow-lg shadow-emerald-500/30">
                      {step.step}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${theme.textPrimary}`}>{step.title}</h3>
                      <p className={`text-sm mt-1 ${theme.textMuted}`}>{step.description}</p>
                      <p className={`text-xs mt-2 font-semibold ${theme.textAccent}`}>⏱️ Timeline: {step.timeline}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${theme.textAccent} transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {isExpanded && (
                  <div className={`px-5 pb-5 pt-0 border-t space-y-4 ${isDark ? 'border-emerald-400/30' : 'border-slate-200'}`}>
                    {/* Actions */}
                    <div>
                      <h4 className={`font-bold mb-3 ${theme.textPrimary}`}>Action Items:</h4>
                      <ul className="space-y-2">
                        {step.actions.map((action, idx) => (
                          <li key={idx} className={`flex gap-3 text-sm ${theme.textSecondary}`}>
                            <span className={`font-bold mt-0.5 ${theme.textAccent}`}>→</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cautions */}
                    {step.cautions && step.cautions.length > 0 && (
                      <div className={`${theme.cautionBg} border p-4 rounded-xl backdrop-blur`}>
                        <h4 className={`font-bold mb-2 flex items-center gap-2 ${theme.cautionText}`}>
                          ⚠️ Important Cautions
                        </h4>
                        <ul className="space-y-1">
                          {step.cautions.map((caution, idx) => (
                            <li key={idx} className={`text-sm flex gap-2 ${theme.cautionText}`}>
                              <span>•</span>
                              <span>{caution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related Laws */}
                    {step.relatedLaws && step.relatedLaws.length > 0 && (
                      <div>
                        <h4 className={`font-bold mb-2 ${theme.textPrimary}`}>Related Laws:</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.relatedLaws.map((law, idx) => (
                            <span
                              key={idx}
                              className={`${theme.lawBadge} px-3 py-1 rounded-full text-xs font-semibold border`}
                            >
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mental Health Support */}
        <div className={`mt-8 ${theme.helpCard} border p-6 rounded-xl backdrop-blur`}>
          <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme.textSecondary}`}>
            <Heart className="w-5 h-5" /> Remember: Your Mental Health Matters
          </h3>
          <p className={`mb-4 ${theme.textSecondary}`}>
            Legal disputes can be emotionally draining. It's important to prioritize your mental health throughout the process.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className={`${theme.supportCard} p-4 rounded-xl border`}>
              <p className={`font-bold mb-2 ${theme.textSecondary}`}>Crisis Helplines:</p>
              <p className={`text-sm ${theme.textMuted}`}>
                <strong>AASRA:</strong> 1-9820-466-726<br />
                <strong>iCall:</strong> 1-9152-987-821<br />
                <strong>Vandrevala:</strong> 1-9999-666-555
              </p>
            </div>
            <div className={`${theme.supportCard} p-4 rounded-xl border`}>
              <p className={`font-bold mb-2 ${theme.textSecondary}`}>Self-Care Tips:</p>
              <p className={`text-sm ${theme.textMuted}`}>
                • Get adequate sleep<br />
                • Exercise regularly<br />
                • Stay connected with loved ones<br />
                • Consider professional counseling
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-8 text-center text-white p-8 rounded-xl ${theme.ctaBg}`}>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-emerald-100' : 'text-white'}`}>Need Professional Help?</h3>
          <p className={`mb-4 opacity-90 ${isDark ? 'text-emerald-200' : 'text-slate-200'}`}>
            Consult with a qualified lawyer immediately for personalized guidance based on your specific situation.
          </p>
          <button 
            onClick={() => onNavigate?.('lawyers')}
            className={`${theme.glowBtn} text-white px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center gap-2`}
          >
            <Phone className="w-5 h-5" /> Find a Lawyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepByStepGuide;
