/**
 * ============================================================
 * INDIAN LEGAL INTELLIGENCE - MOCK DATABASE SERVICE
 * In-memory legal database for testing without MySQL
 * ============================================================
 */

// In-memory storage
const mockData = {
  domains: [
    { id: 1, domain_name: 'Criminal Law', domain_code: 'CRIMINAL', description: 'Laws governing crimes, punishments, and criminal procedures in India', icon: 'gavel', is_active: true },
    { id: 2, domain_name: 'Cyber Law', domain_code: 'CYBER', description: 'Laws governing electronic commerce, cybercrime, and IT', icon: 'shield', is_active: true },
    { id: 3, domain_name: 'Constitutional Law', domain_code: 'CONSTITUTIONAL', description: 'Supreme law of India - fundamental rights and governance', icon: 'landmark', is_active: true },
    { id: 4, domain_name: 'Corporate & Commercial Law', domain_code: 'CORPORATE', description: 'Laws governing companies, business, and commerce', icon: 'building', is_active: true },
    { id: 5, domain_name: 'Family Law', domain_code: 'FAMILY', description: 'Laws governing marriage, divorce, succession', icon: 'users', is_active: true },
    { id: 6, domain_name: 'Property Law', domain_code: 'PROPERTY', description: 'Laws governing property transfer and registration', icon: 'home', is_active: true },
    { id: 7, domain_name: 'Labour & Employment Law', domain_code: 'LABOUR', description: 'Laws governing employment and worker welfare', icon: 'hard-hat', is_active: true },
    { id: 8, domain_name: 'Taxation Law', domain_code: 'TAXATION', description: 'Laws governing income tax and GST', icon: 'receipt', is_active: true },
    { id: 9, domain_name: 'Environmental Law', domain_code: 'ENVIRONMENTAL', description: 'Laws protecting environment and natural resources', icon: 'leaf', is_active: true },
    { id: 10, domain_name: 'Consumer Protection', domain_code: 'CONSUMER', description: 'Laws protecting consumer rights', icon: 'shield-check', is_active: true },
    { id: 11, domain_name: 'Banking & Finance Law', domain_code: 'BANKING', description: 'Laws governing banking and financial institutions', icon: 'bank', is_active: true }
  ],
  
  acts: [
    // Criminal Law
    { id: 1, domain_id: 1, act_name: 'Bharatiya Nyaya Sanhita', short_name: 'BNS', act_code: 'BNS2023', year: 2023, status: 'active' },
    { id: 2, domain_id: 1, act_name: 'Bharatiya Nagarik Suraksha Sanhita', short_name: 'BNSS', act_code: 'BNSS2023', year: 2023, status: 'active' },
    { id: 3, domain_id: 1, act_name: 'Bharatiya Sakshya Adhiniyam', short_name: 'BSA', act_code: 'BSA2023', year: 2023, status: 'active' },
    // Cyber Law
    { id: 4, domain_id: 2, act_name: 'Information Technology Act', short_name: 'IT Act', act_code: 'ITA2000', year: 2000, status: 'active' },
    // Constitutional
    { id: 5, domain_id: 3, act_name: 'Constitution of India', short_name: 'Constitution', act_code: 'COI1950', year: 1950, status: 'active' },
    // Corporate
    { id: 6, domain_id: 4, act_name: 'Companies Act', short_name: 'Companies Act', act_code: 'CA2013', year: 2013, status: 'active' },
    { id: 7, domain_id: 4, act_name: 'Insolvency and Bankruptcy Code', short_name: 'IBC', act_code: 'IBC2016', year: 2016, status: 'active' },
    // Family
    { id: 8, domain_id: 5, act_name: 'Hindu Marriage Act', short_name: 'HMA', act_code: 'HMA1955', year: 1955, status: 'active' },
    { id: 9, domain_id: 5, act_name: 'Hindu Succession Act', short_name: 'HSA', act_code: 'HSA1956', year: 1956, status: 'active' },
    // Property
    { id: 10, domain_id: 6, act_name: 'Transfer of Property Act', short_name: 'TPA', act_code: 'TPA1882', year: 1882, status: 'active' },
    { id: 11, domain_id: 6, act_name: 'Real Estate (Regulation and Development) Act', short_name: 'RERA', act_code: 'RERA2016', year: 2016, status: 'active' },
    // Labour
    { id: 12, domain_id: 7, act_name: 'Industrial Disputes Act', short_name: 'ID Act', act_code: 'IDA1947', year: 1947, status: 'active' },
    { id: 13, domain_id: 7, act_name: 'Code on Wages', short_name: 'Wage Code', act_code: 'COW2019', year: 2019, status: 'active' },
    // Taxation
    { id: 14, domain_id: 8, act_name: 'Income-tax Act', short_name: 'IT Act', act_code: 'ITA1961', year: 1961, status: 'active' },
    { id: 15, domain_id: 8, act_name: 'Central Goods and Services Tax Act', short_name: 'CGST Act', act_code: 'CGST2017', year: 2017, status: 'active' },
    // Consumer
    { id: 16, domain_id: 10, act_name: 'Consumer Protection Act', short_name: 'CPA', act_code: 'CPA2019', year: 2019, status: 'active' },
    // Banking
    { id: 17, domain_id: 11, act_name: 'SARFAESI Act', short_name: 'SARFAESI', act_code: 'SARFAESI2002', year: 2002, status: 'active' }
  ],
  
  sections: [
    // BNS Sections
    { id: 1, act_id: 1, section_number: '101', title: 'Murder', content: 'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person, commits murder.', punishment: 'Death or imprisonment for life, and fine', punishment_type: 'both', offence_type: 'cognizable', keywords: 'murder, culpable homicide, death, killing, intention' },
    { id: 2, act_id: 1, section_number: '103', title: 'Punishment for murder', content: 'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.', punishment: 'Death or life imprisonment and fine', punishment_type: 'both', offence_type: 'non_bailable', keywords: 'murder punishment, death penalty, capital punishment' },
    { id: 3, act_id: 1, section_number: '303', title: 'Theft', content: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without consent, moves that property, commits theft.', punishment: 'Imprisonment up to 3 years, or fine, or both', punishment_type: 'both', offence_type: 'non_cognizable', keywords: 'theft, stealing, dishonest, movable property' },
    { id: 4, act_id: 1, section_number: '318', title: 'Cheating', content: 'Whoever, by deceiving any person, fraudulently or dishonestly induces the person to deliver property or to consent that any person shall retain property, is said to cheat.', punishment: 'Imprisonment up to 3 years, or fine, or both', punishment_type: 'both', offence_type: 'non_cognizable', keywords: 'cheating, fraud, deception, dishonest, inducement' },
    { id: 5, act_id: 1, section_number: '309', title: 'Robbery', content: 'In all robbery there is either theft or extortion. Theft is robbery if the offender causes or attempts to cause death, hurt, or wrongful restraint, or fear thereof.', punishment: 'RI up to 10 years and fine', punishment_type: 'both', offence_type: 'cognizable', keywords: 'robbery, theft, extortion, violence' },
    { id: 6, act_id: 1, section_number: '63', title: 'Rape', content: 'A man is said to commit rape if he penetrates without consent, under circumstances specified in law. Consent obtained by threat, fraud, or when woman is unable to give consent is not valid consent.', punishment: 'RI not less than 10 years, may extend to life imprisonment, and fine', punishment_type: 'both', offence_type: 'non_bailable', keywords: 'rape, sexual assault, consent, penetration' },
    
    // IT Act Sections
    { id: 7, act_id: 4, section_number: '66', title: 'Computer related offences', content: 'If any person, dishonestly or fraudulently, accesses a computer without permission, downloads data, introduces viruses, damages or disrupts computer systems, he shall be punished.', punishment: 'Imprisonment up to 3 years, or fine up to Rs. 5 lakh, or both', punishment_type: 'both', offence_type: 'cognizable', keywords: 'hacking, computer offence, unauthorized access, cyber crime' },
    { id: 8, act_id: 4, section_number: '66C', title: 'Identity theft', content: 'Whoever fraudulently or dishonestly makes use of the electronic signature, password or any other unique identification feature of any other person, shall be punished.', punishment: 'Imprisonment up to 3 years and fine up to Rs. 1 lakh', punishment_type: 'both', offence_type: 'cognizable', keywords: 'identity theft, password theft, fraud, impersonation' },
    { id: 9, act_id: 4, section_number: '66D', title: 'Cheating by personation using computer', content: 'Whoever, by means of any communication device or computer resource cheats by personation, shall be punished.', punishment: 'Imprisonment up to 3 years and fine up to Rs. 1 lakh', punishment_type: 'both', offence_type: 'cognizable', keywords: 'online cheating, personation, phishing, cyber fraud' },
    { id: 10, act_id: 4, section_number: '67', title: 'Publishing obscene material', content: 'Whoever publishes or transmits any material which is lascivious or appeals to the prurient interest shall be punished.', punishment: 'First: 3 years + Rs. 5 lakh; Second: 5 years + Rs. 10 lakh', punishment_type: 'both', offence_type: 'cognizable', keywords: 'obscene material, pornography, electronic publishing' },
    
    // Consumer Protection Sections
    { id: 11, act_id: 16, section_number: '2', title: 'Definitions', content: 'Consumer means any person who buys goods for consideration or hires services. Defect means any fault in quality. Deficiency means any shortcoming in service quality.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'consumer definition, goods, services, defect, deficiency' },
    { id: 12, act_id: 16, section_number: '34', title: 'District Commission jurisdiction', content: 'District Commission has jurisdiction to entertain complaints where value of goods or services does not exceed Rs. 1 crore.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'district commission, jurisdiction, consumer forum, one crore' },
    
    // RERA Sections
    { id: 13, act_id: 11, section_number: '3', title: 'Registration of real estate project', content: 'No promoter shall advertise, market, book, sell or offer for sale any plot, apartment or building without registering the real estate project with RERA.', punishment: 'Imprisonment up to 3 years, or fine up to 10% of project cost', punishment_type: 'both', offence_type: 'regulatory', keywords: 'RERA registration, project registration, promoter, builder' },
    { id: 14, act_id: 11, section_number: '18', title: 'Return of amount and compensation', content: 'If promoter fails to complete or give possession as per agreement, he shall return amount with interest and pay compensation to allottee.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'refund, possession delay, compensation, builder default' },
    
    // Labour Law Sections
    { id: 15, act_id: 12, section_number: '25F', title: 'Conditions for retrenchment', content: 'No workman employed for not less than one year shall be retrenched until one month notice or wages in lieu and retrenchment compensation equal to 15 days average pay for every completed year.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'retrenchment, notice, compensation, termination, workman' },
    { id: 16, act_id: 12, section_number: '9A', title: 'Notice of change', content: 'No employer shall effect any change in conditions of service without giving workmen a notice in prescribed manner and within 21 days of giving such notice.', punishment: null, punishment_type: 'regulatory', offence_type: 'civil', keywords: 'change in conditions, notice period, service conditions' },
    
    // Hindu Marriage Act
    { id: 17, act_id: 8, section_number: '13', title: 'Divorce', content: 'Marriage may be dissolved by decree of divorce on grounds including adultery, cruelty, desertion for 2 years, conversion, unsoundness of mind, virulent leprosy, etc.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'divorce, grounds for divorce, adultery, cruelty, desertion' },
    { id: 18, act_id: 8, section_number: '13B', title: 'Divorce by mutual consent', content: 'Petition for dissolution may be presented by both parties together if living separately for 1 year or more and mutually agreed that marriage should be dissolved.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'mutual consent divorce, separation, joint petition' },
    
    // Constitution
    { id: 19, act_id: 5, section_number: '21', title: 'Right to life and personal liberty', content: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'right to life, personal liberty, fundamental right, Article 21' },
    { id: 20, act_id: 5, section_number: '19', title: 'Freedom of speech and expression', content: 'All citizens have right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely, to reside anywhere, to practice any profession.', punishment: null, punishment_type: 'civil_remedy', offence_type: 'civil', keywords: 'freedom of speech, expression, assembly, fundamental rights' }
  ]
};

/**
 * Search sections with relevance scoring
 */
function searchLegalDatabase({ query, domainCode, actCode, confidence, limit = 5 }) {
  const searchTerms = query.toLowerCase().split(/\s+/);
  
  let filteredSections = [...mockData.sections];
  
  // Filter by domain if specified
  if (domainCode && confidence >= 50) {
    const domain = mockData.domains.find(d => d.domain_code === domainCode);
    if (domain) {
      const domainActs = mockData.acts.filter(a => a.domain_id === domain.id);
      const actIds = domainActs.map(a => a.id);
      filteredSections = filteredSections.filter(s => actIds.includes(s.act_id));
    }
  }
  
  // Filter by act if specified
  if (actCode && confidence >= 70) {
    const act = mockData.acts.find(a => a.act_code === actCode);
    if (act) {
      filteredSections = filteredSections.filter(s => s.act_id === act.id);
    }
  }
  
  // Score sections by relevance
  const scoredSections = filteredSections.map(section => {
    let score = 0;
    const content = (section.content + ' ' + section.keywords + ' ' + section.title).toLowerCase();
    
    searchTerms.forEach(term => {
      if (content.includes(term)) {
        score += term.length;
        // Bonus for exact match in title or keywords
        if (section.title.toLowerCase().includes(term)) score += 5;
        if (section.keywords.includes(term)) score += 3;
      }
    });
    
    return { ...section, relevance_score: score };
  });
  
  // Sort by relevance and limit
  const results = scoredSections
    .filter(s => s.relevance_score > 0)
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, limit);
  
  return {
    success: true,
    query,
    total_results: results.length,
    sections: results.map(s => formatSection(s)),
    search_scope: confidence >= 70 ? 'act' : confidence >= 50 ? 'domain' : 'global'
  };
}

/**
 * Format section for response
 */
function formatSection(section) {
  const act = mockData.acts.find(a => a.id === section.act_id);
  const domain = mockData.domains.find(d => d.id === act?.domain_id);
  
  return {
    section_id: section.id,
    section_number: section.section_number,
    section_title: section.title,
    summary: section.content.substring(0, 200) + '...',
    full_content: section.content,
    punishment: section.punishment,
    punishment_type: section.punishment_type,
    offence_type: section.offence_type,
    act: {
      id: act?.id,
      name: act?.act_name,
      short_name: act?.short_name,
      year: act?.year
    },
    domain: {
      id: domain?.id,
      name: domain?.domain_name,
      code: domain?.domain_code
    },
    relevance_score: section.relevance_score
  };
}

/**
 * Get all domains
 */
function getAllDomains() {
  return {
    success: true,
    total_domains: mockData.domains.length,
    domains: mockData.domains.map(d => {
      const acts = mockData.acts.filter(a => a.domain_id === d.id);
      const actIds = acts.map(a => a.id);
      const sections = mockData.sections.filter(s => actIds.includes(s.act_id));
      
      return {
        id: d.id,
        name: d.domain_name,
        code: d.domain_code,
        description: d.description,
        icon: d.icon,
        act_count: acts.length,
        section_count: sections.length
      };
    })
  };
}

/**
 * Get domain with acts
 */
function getDomainActs(domainCode) {
  const domain = mockData.domains.find(d => d.domain_code === domainCode || d.id === parseInt(domainCode));
  if (!domain) return { success: false, error: 'Domain not found' };
  
  const acts = mockData.acts.filter(a => a.domain_id === domain.id);
  
  return {
    success: true,
    domain: {
      id: domain.id,
      name: domain.domain_name,
      code: domain.domain_code,
      description: domain.description
    },
    acts: acts.map(a => ({
      id: a.id,
      name: a.act_name,
      short_name: a.short_name,
      code: a.act_code,
      year: a.year,
      status: a.status,
      section_count: mockData.sections.filter(s => s.act_id === a.id).length
    }))
  };
}

/**
 * Get act with sections
 */
function getActSections(actCode) {
  const act = mockData.acts.find(a => a.act_code === actCode || a.id === parseInt(actCode));
  if (!act) return { success: false, error: 'Act not found' };
  
  const domain = mockData.domains.find(d => d.id === act.domain_id);
  const sections = mockData.sections.filter(s => s.act_id === act.id);
  
  return {
    success: true,
    act: {
      id: act.id,
      name: act.act_name,
      short_name: act.short_name,
      code: act.act_code,
      year: act.year,
      status: act.status,
      domain: domain?.domain_name,
      domain_code: domain?.domain_code,
      total_sections: sections.length
    },
    sections: sections.map(s => formatSection(s))
  };
}

/**
 * Search by section number
 */
function searchBySection(sectionNumber, actCode = null) {
  let sections = mockData.sections.filter(s => s.section_number === sectionNumber);
  
  if (actCode) {
    const act = mockData.acts.find(a => a.act_code === actCode);
    if (act) {
      sections = sections.filter(s => s.act_id === act.id);
    }
  }
  
  return {
    success: true,
    total_results: sections.length,
    sections: sections.map(s => formatSection(s))
  };
}

/**
 * Get database stats
 */
function getDatabaseStats() {
  return {
    success: true,
    statistics: {
      total_domains: mockData.domains.length,
      total_acts: mockData.acts.length,
      total_sections: mockData.sections.length,
      penal_sections: mockData.sections.filter(s => s.punishment_type !== 'civil_remedy').length,
      queries_today: Math.floor(Math.random() * 100)
    },
    domain_breakdown: mockData.domains.map(d => ({
      domain_name: d.domain_name,
      domain_code: d.domain_code,
      acts: mockData.acts.filter(a => a.domain_id === d.id).length,
      sections: mockData.sections.filter(s => {
        const act = mockData.acts.find(a => a.id === s.act_id);
        return act?.domain_id === d.id;
      }).length
    }))
  };
}

/**
 * Log query (mock)
 */
function logQuery(data) {
  console.log('[Query Log]', data.query?.substring(0, 50), '- Domain:', data.domain);
  return Promise.resolve(true);
}

// Dummy functions for pool management
const initializePool = async () => console.log('✅ Mock database initialized');
const closePool = async () => console.log('✅ Mock database closed');
const getConnection = async () => ({});

module.exports = {
  initializePool,
  getConnection,
  searchLegalDatabase,
  searchBySection,
  getActSections,
  getDomainActs,
  getAllDomains,
  getDatabaseStats,
  logQuery,
  closePool
};
