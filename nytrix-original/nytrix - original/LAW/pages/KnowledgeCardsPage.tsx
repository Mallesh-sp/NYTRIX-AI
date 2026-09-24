import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import KnowledgeCard, { KnowledgeCardData } from '../components/KnowledgeCard';

const mensRightsKnowledge: KnowledgeCardData[] = [
  {
    id: 'false-accusation',
    title: 'False Accusations - Know Your Rights',
    category: 'protection',
    summary: 'Understanding how to respond to and defend against false criminal accusations',
    content: `False accusations are serious matters that can harm your reputation and freedom. Under Indian law, filing false accusations is itself a criminal offense. You have the right to defend yourself and seek legal remedies.`,
    keyPoints: [
      'Presumption of innocence - you are innocent until proven guilty',
      'Right to remain silent - do not admit to anything without a lawyer',
      'Burden of proof - prosecution must prove guilt beyond reasonable doubt',
      'Right to legal representation - get a lawyer immediately',
      'Can file counter-case under Section 166A, IPC for false accusations'
    ],
    relatedLaws: ['Section 166A, IPC', 'Section 182, IPC', 'Section 229, IPC'],
    practicalSteps: [
      'Do not speak to police without a lawyer present',
      'Document all evidence supporting your innocence',
      'Gather witness statements and supporting documents',
      'File a counter-FIR if the accusation is proven false',
      'Work with your lawyer to build a strong defense'
    ],
    redFlags: [
      'Being pressured to admit guilt',
      'Police refusing access to a lawyer',
      'Fabricated evidence being presented',
      'Biased investigation by police'
    ]
  },
  {
    id: 'cyber-harassment',
    title: 'Cyber Harassment & Online Abuse',
    category: 'protection',
    summary: 'How to identify, report, and take legal action against cyber harassment',
    content: `Cyber harassment includes threatening messages, defamatory posts, harassment through social media, and creation of fake profiles. These are criminal offenses under Indian law with severe penalties.`,
    keyPoints: [
      'Cyber harassment is a criminal offense (Section 354D, IPC)',
      'Online defamation can be addressed under Section 499-500, IPC',
      'IT Act, 2000 provides protections against online abuse',
      'Screenshots and digital evidence are admissible in court',
      'You can file FIR with Cyber Cell of police'
    ],
    relatedLaws: ['Section 354D, IPC', 'Section 505, IPC', 'IT Act Section 66A-66D'],
    practicalSteps: [
      'Take screenshots of harassment with date/time stamps',
      'Report to platform (Twitter, Facebook, Instagram, etc.)',
      'File a complaint with local Cyber Cell',
      'Preserve all digital evidence (don\'t delete anything)',
      'Consult a lawyer about legal action'
    ],
    redFlags: [
      'Repeated threatening messages',
      'Impersonation through fake profiles',
      'Sharing intimate content without consent',
      'Coordinated harassment campaigns'
    ]
  },
  {
    id: 'domestic-violence',
    title: 'Male Domestic Violence Victims',
    category: 'awareness',
    summary: 'Understanding domestic violence against men and available legal protections',
    content: `While commonly associated with women, men can also be victims of domestic violence. Indian law provides protection for all domestic violence victims, regardless of gender. Men often don't report due to stigma, but legal protections exist.`,
    keyPoints: [
      'Men can be victims of domestic violence',
      'Physical, emotional, and financial abuse are all forms of domestic violence',
      'Protection Orders are available for all victims',
      'Police must register complaints of domestic violence',
      'Compensation can be sought from the abuser'
    ],
    relatedLaws: ['Protection of Women from Domestic Violence Act', 'Section 498A, IPC (amended)', 'Section 125, CrPC'],
    practicalSteps: [
      'Document all incidents of violence with dates and photos',
      'Seek medical attention and get doctor\'s report',
      'File complaint with local police',
      'Apply for Protection Order from family court',
      'Seek legal aid if needed'
    ],
    redFlags: [
      'Repeated threats of false accusations',
      'Isolation from family and friends',
      'Control over finances and personal freedom',
      'Physical injuries or emotional trauma'
    ]
  },
  {
    id: 'inheritance-rights',
    title: 'Male Inheritance and Succession Rights',
    category: 'rights',
    summary: 'Understanding equal succession rights for men under Indian law',
    content: `Under the Hindu Succession Act, 1956, men have equal rights to inherit and own property. However, recent amendments have granted daughters equal rights to ancestral property, which men must be aware of.`,
    keyPoints: [
      'Men have equal right to inherit from parents',
      'Daughters now have equal rights to ancestral property (from 2005)',
      'Valid will supersedes succession laws',
      'Property ownership is gender-neutral',
      'Legal remedies available for disputed inheritance'
    ],
    relatedLaws: ['Hindu Succession Act, 1956', 'Section 15-16, HSA (amended)'],
    practicalSteps: [
      'Get property documents and title deeds',
      'Understand the succession chain',
      'File partition suit if needed',
      'Register property in your name',
      'Get legal advice on inheritance matters'
    ]
  },
  {
    id: 'joint-custody',
    title: 'Fathers Rights in Child Custody',
    category: 'rights',
    summary: 'Understanding equal custody rights for fathers under Indian law',
    content: `Indian courts increasingly recognize that both parents have equal rights to custody of children. The focus is on the best interests of the child, not the gender of the parent. Fathers can and do obtain full or joint custody.`,
    keyPoints: [
      'Fathers have equal legal rights to custody',
      'Courts decide based on best interests of child, not parent\'s gender',
      'Joint custody is increasingly awarded',
      'Visitation rights are protected by law',
      'Child support can be enforced fairly'
    ],
    relatedLaws: ['Guardianship and Wards Act, 1890', 'Section 125, CrPC', 'Section 24, Hindu Marriage Act'],
    practicalSteps: [
      'Prepare evidence of your ability to care for child',
      'Gather character references and stability proof',
      'Document your relationship with the child',
      'Work with lawyer on custody petition',
      'Attend all court hearings'
    ],
    redFlags: [
      'Being denied access to children without court order',
      'Bias against father in custody decisions',
      'False accusations to prevent custody',
      'Non-payment of maintenance by custodial parent'
    ]
  },
  {
    id: 'maintenance-rights',
    title: 'Spousal and Child Maintenance Rights',
    category: 'rights',
    summary: 'Understanding maintenance obligations and rights for men',
    content: `Under Section 125 of CrPC, men can be ordered to pay maintenance to spouse and children. However, recent cases recognize that men can also claim maintenance from wives in certain circumstances.`,
    keyPoints: [
      'Men have obligation to maintain wife and children',
      'Amount is based on income and needs',
      'Can be modified if circumstances change',
      'Men can claim maintenance from wife in certain cases',
      'Non-payment can lead to jail'
    ],
    relatedLaws: ['Section 125, CrPC', 'Section 24, Hindu Marriage Act', 'Section 27, Special Marriage Act'],
    practicalSteps: [
      'Provide clear financial statements',
      'Determine fair maintenance amount',
      'File maintenance petition if applicable',
      'Attend hearings regularly',
      'Comply with maintenance orders'
    ]
  },
  {
    id: 'workplace-protection',
    title: 'Workplace Anti-Harassment and Discrimination',
    category: 'protection',
    summary: 'Protections against workplace harassment, discrimination, and false allegations',
    content: `Men also have rights against workplace harassment, discrimination, and false allegations. The law protects all employees from sexual harassment and unfair treatment, regardless of gender.`,
    keyPoints: [
      'Right to safe and non-discriminatory workplace',
      'Men can be sexual harassment victims',
      'Wrongful termination is illegal',
      'False allegations must be investigated fairly',
      'Grievance committees must be impartial'
    ],
    relatedLaws: ['Sexual Harassment of Women at Workplace Act, 2013', 'Industrial Disputes Act, 1947'],
    practicalSteps: [
      'Report harassment through official channels',
      'Document all incidents and communications',
      'File formal complaint with HR',
      'Request fair investigation',
      'Escalate if not resolved satisfactorily'
    ],
    redFlags: [
      'Rapid wrongful termination after false allegations',
      'Biased investigation process',
      'Retaliation after filing complaint',
      'Denial of due process'
    ]
  },
  {
    id: 'police-harassment',
    title: 'Police Harassment and Misconduct',
    category: 'protection',
    summary: 'Your rights when police harass, threaten, or abuse you',
    content: `Police harassment is illegal. If police scold you, threaten you, demand money, or use excessive force, you have legal recourse. You can file complaints against police misconduct and claim compensation.`,
    keyPoints: [
      'Police have authority but NOT power to abuse or harass citizens',
      'No police officer can demand money (bribery is a crime)',
      'Excessive force or threats are illegal',
      'You can file complaint against police misconduct',
      'Compensation is available for harassment',
      'You have right to respectful treatment'
    ],
    relatedLaws: ['Section 154, CrPC (FIR)', 'Section 41, CrPC (Arrest)', 'Section 330, IPC (Hurt)', 'Article 21, Constitution (Right to Life)'],
    practicalSteps: [
      'Remain calm and polite during police interaction',
      'Do not engage in arguments or show aggression',
      'Ask for police officer\'s name, badge number, and station name',
      'Document the date, time, location, and what happened',
      'Take photos of any injuries (if harassed physically)',
      'File FIR against police misconduct at higher station or police headquarters',
      'Get medical certificate if physically harmed',
      'Write complaint to police commissioner or superintendent',
      'Consult lawyer about civil compensation suit'
    ],
    redFlags: [
      'Police demanding money or favors',
      'Physical violence or threats',
      'Refusing to identify themselves',
      'Using abusive language',
      'Illegal detention without proper procedure',
      'Pressuring you to sign statements'
    ]
  },
  {
    id: 'police-arrest',
    title: 'Your Rights During Police Arrest',
    category: 'protection',
    summary: 'Know your constitutional and legal rights when arrested by police',
    content: `When arrested, you have specific legal rights that police MUST follow. These rights are protected by the Constitution and Indian criminal law. Police cannot violate these rights.`,
    keyPoints: [
      'Police must tell you the reason for arrest immediately',
      'You have right to remain silent - use it wisely',
      'You have right to lawyer - demand a lawyer immediately',
      'You cannot be detained for more than 24 hours without court approval',
      'You cannot be tortured or abused',
      'Your family must be informed within 12 hours',
      'You can ask for police custody or judicial custody'
    ],
    relatedLaws: ['Article 20(3), Constitution', 'Article 22, Constitution', 'Section 41, CrPC (Arrest)', 'Section 50, CrPC', 'Section 157, CrPC'],
    practicalSteps: [
      'Ask why you are being arrested - demand reason',
      'Say: "I want a lawyer" - repeat this clearly',
      'Do not answer questions without lawyer present',
      'Note time, place, and police officer names',
      'Refuse to sign anything without lawyer reading it',
      'Demand medical examination before police custody',
      'Ask for water, food, and bathroom access',
      'Contact family or trusted person through lawyer',
      'Do not accept false confessions - your silence is protection'
    ],
    redFlags: [
      'Police refusing to tell you why you\'re arrested',
      'Police refusing you a lawyer',
      'Threats to harm you or family',
      'Pressure to confess or sign statements',
      'Detention beyond 24 hours without court order',
      'Denial of basic needs (food, water, bathroom)'
    ]
  },
  {
    id: 'fir-false',
    title: 'False FIR (First Information Report)',
    category: 'protection',
    summary: 'What to do when someone files a false FIR against you',
    content: `A False FIR is when someone deliberately files a false police report to harass you. This is a serious crime. You have strong legal remedies and can file counter-cases.`,
    keyPoints: [
      'False FIR is a serious criminal offense (Section 182, IPC)',
      'Anyone can file FIR, but making false allegations is itself a crime',
      'You can file counter-FIR against person who filed false report',
      'You can claim compensation for harassment and damage',
      'Police must investigate fairly - bias is illegal',
      'Court can dismiss false cases when evidence is weak'
    ],
    relatedLaws: ['Section 182, IPC (False Info)', 'Section 166A, IPC (Misleading Police)', 'Section 212, IPC (Harboring Offender)', 'Section 468, IPC (Forgery)'],
    practicalSteps: [
      'Get a copy of the FIR from police (your right under RTI)',
      'Carefully read the allegations in the FIR',
      'Gather evidence proving the allegations are false',
      'Get witness statements supporting your innocence',
      'File counter-case under Section 182 & 166A, IPC',
      'Apply for anticipatory bail to avoid arrest',
      'Keep all communications and proof safe',
      'Work with lawyer on strong defense strategy'
    ],
    redFlags: [
      'Allegations that sound exaggerated or fabricated',
      'Timing of FIR (right after a dispute)',
      'No credible evidence supporting allegations',
      'Multiple contradictions in the FIR',
      'Known pattern of person filing false cases'
    ]
  },
  {
    id: 'marital-property',
    title: 'Marital Property Rights',
    category: 'rights',
    summary: 'Understanding property rights in marriage and divorce',
    content: `Both husbands and wives have equal rights in marital property. In divorce, property is divided based on contribution and fairness, not gender. Men have equal rights to claim their share of marital assets.`,
    keyPoints: [
      'Both spouses have equal rights in marital property',
      'Property earned during marriage is marital property',
      'Division is based on contribution, not gender',
      'Men can seek alimony in certain circumstances',
      'Self-acquired property remains personal'
    ],
    relatedLaws: ['Section 27, Special Marriage Act', 'Section 24, Hindu Marriage Act'],
    practicalSteps: [
      'Maintain clear records of personal property',
      'Document contributions to marital property',
      'Get property valuations for division',
      'Work with lawyer on divorce settlement',
      'Negotiate fair division'
    ]
  },
  {
    id: 'defamation-protection',
    title: 'Protection Against Defamation',
    category: 'protection',
    summary: 'How to address and legally challenge false statements that damage reputation',
    content: `Defamation is making false statements that damage someone's reputation. Both men and women can file civil and criminal cases against defamation. The law provides strong protections.`,
    keyPoints: [
      'Defamation requires false statement that damages reputation',
      'Can be addressed through civil suits (for damages)',
      'Criminal prosecution for defamatory statements (Section 499-500)',
      'Online defamation has same legal status as offline',
      'Apology and retraction can be demanded'
    ],
    relatedLaws: ['Section 499-500, IPC', 'IT Act Section 66D'],
    practicalSteps: [
      'Document all defamatory statements',
      'Send legal notice demanding retraction and apology',
      'File civil suit for damages if not complied',
      'File criminal case if severe',
      'Seek court order for removal of content'
    ],
    redFlags: [
      'Repeated false accusations',
      'Public defamation campaigns',
      'Refusal to retract after notice',
      'Spread of defamatory content through media'
    ]
  }
];

const KnowledgeCardsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(mensRightsKnowledge.map(k => k.category))];

  const filteredCards = mensRightsKnowledge.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">Men's Rights Knowledge Base</h1>
          <p className="text-emerald-200 text-lg">Comprehensive information about legal rights for men in India</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur rounded-xl border border-emerald-400/30 p-6 mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/60" />
            <input
              type="text"
              placeholder="Search knowledge cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/50 text-emerald-100 placeholder-emerald-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-emerald-300 mb-2">
              <Filter className="w-4 h-4 inline mr-2" /> Category
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  !selectedCategory
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-purple-800/40 text-emerald-200 border border-emerald-400/30 hover:bg-purple-800/60'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-purple-800/40 text-emerald-200 border border-emerald-400/30 hover:bg-purple-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-emerald-300 font-semibold">
            Found {filteredCards.length} knowledge card{filteredCards.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="space-y-6">
            {filteredCards.map((card) => (
              <KnowledgeCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur rounded-lg border border-emerald-400/30">
            <p className="text-emerald-100 font-semibold">No knowledge cards found.</p>
            <p className="text-emerald-300 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCardsPage;
