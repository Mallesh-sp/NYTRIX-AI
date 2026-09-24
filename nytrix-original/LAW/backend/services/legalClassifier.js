/**
 * ============================================================
 * INDIAN LEGAL INTELLIGENCE - AI CLASSIFIER SERVICE
 * Uses OpenAI/Gemini API for legal query classification
 * ============================================================
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI (using existing Gemini setup from the project)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Legal Domain Configuration
 * Maps domain codes to AI-recognizable patterns
 */
const LEGAL_DOMAINS = {
  CRIMINAL: {
    name: 'Criminal Law',
    acts: ['Bharatiya Nyaya Sanhita', 'Bharatiya Nagarik Suraksha Sanhita', 'Bharatiya Sakshya Adhiniyam'],
    keywords: ['murder', 'theft', 'robbery', 'assault', 'rape', 'cheating', 'fraud', 'kidnapping', 'dacoity', 
               'criminal', 'FIR', 'police', 'arrest', 'bail', 'cognizable', 'non-cognizable', 'bailable',
               'imprisonment', 'fine', 'hurt', 'grievous', 'death', 'homicide', 'culpable', 'defamation',
               'forgery', 'evidence', 'witness', 'prosecution', 'accused', 'victim', 'complaint']
  },
  CYBER: {
    name: 'Cyber Law',
    acts: ['Information Technology Act'],
    keywords: ['hacking', 'cyber', 'online', 'internet', 'computer', 'data breach', 'identity theft',
               'phishing', 'virus', 'malware', 'digital', 'electronic', 'password', 'website', 'email',
               'social media', 'cyberbullying', 'cyber stalking', 'online fraud', 'data privacy', 'IT Act',
               'cyber crime', 'obscene', 'pornography', 'child abuse material', 'CSAM']
  },
  CONSTITUTIONAL: {
    name: 'Constitutional Law',
    acts: ['Constitution of India'],
    keywords: ['fundamental rights', 'constitution', 'article', 'writ', 'habeas corpus', 'mandamus',
               'freedom of speech', 'equality', 'discrimination', 'right to life', 'personal liberty',
               'PIL', 'public interest', 'Supreme Court', 'High Court', 'amendment', 'citizenship',
               'directive principles', 'reservation', 'SC/ST', 'OBC', 'minority rights']
  },
  CORPORATE: {
    name: 'Corporate & Commercial Law',
    acts: ['Companies Act', 'Insolvency and Bankruptcy Code', 'Competition Act', 'Limited Liability Partnership Act'],
    keywords: ['company', 'director', 'shareholder', 'board', 'incorporation', 'ROC', 'MCA', 'AGM',
               'insolvency', 'bankruptcy', 'IBC', 'NCLT', 'CIRP', 'resolution', 'liquidation', 'NPA',
               'merger', 'acquisition', 'demerger', 'LLP', 'partnership', 'competition', 'monopoly',
               'anti-competitive', 'cartel', 'corporate fraud', 'oppression', 'mismanagement']
  },
  FAMILY: {
    name: 'Family Law',
    acts: ['Hindu Marriage Act', 'Special Marriage Act', 'Hindu Succession Act', 'Guardians and Wards Act'],
    keywords: ['marriage', 'divorce', 'maintenance', 'alimony', 'custody', 'child support', 'husband',
               'wife', 'spouse', 'matrimonial', 'dowry', 'domestic violence', 'cruelty', 'adultery',
               'desertion', 'separation', 'mutual consent', 'Hindu', 'Muslim', 'Christian', 'succession',
               'inheritance', 'will', 'property', 'guardian', 'minor', 'adoption', 'restitution']
  },
  PROPERTY: {
    name: 'Property Law',
    acts: ['Transfer of Property Act', 'Registration Act', 'Real Estate (Regulation and Development) Act'],
    keywords: ['property', 'land', 'sale deed', 'registration', 'stamp duty', 'mutation', 'encumbrance',
               'mortgage', 'lease', 'rent', 'tenant', 'landlord', 'eviction', 'possession', 'title',
               'conveyance', 'gift deed', 'will', 'partition', 'co-owner', 'flat', 'apartment', 'builder',
               'RERA', 'real estate', 'developer', 'promoter', 'homebuyer', 'possession delay']
  },
  LABOUR: {
    name: 'Labour & Employment Law',
    acts: ['Industrial Disputes Act', 'Minimum Wages Act', 'Code on Wages', 'Employees Provident Funds and Miscellaneous Provisions Act'],
    keywords: ['employee', 'employer', 'wages', 'salary', 'termination', 'retrenchment', 'layoff',
               'strike', 'lockout', 'trade union', 'workman', 'labour', 'PF', 'EPF', 'ESI', 'gratuity',
               'bonus', 'minimum wage', 'overtime', 'working hours', 'factory', 'industrial dispute',
               'unfair labour practice', 'sexual harassment', 'POSH', 'contractor', 'apprentice']
  },
  TAXATION: {
    name: 'Taxation Law',
    acts: ['Income-tax Act', 'Central Goods and Services Tax Act'],
    keywords: ['tax', 'income tax', 'GST', 'ITR', 'TDS', 'TCS', 'assessment', 'return', 'refund',
               'deduction', '80C', '80D', 'HRA', 'capital gains', 'business income', 'salary',
               'tax evasion', 'penalty', 'notice', 'scrutiny', 'audit', 'PAN', 'GSTIN', 'e-filing',
               'advance tax', 'self-assessment', 'exemption', 'taxable income']
  },
  ENVIRONMENTAL: {
    name: 'Environmental Law',
    acts: ['Environment (Protection) Act', 'Water (Prevention and Control of Pollution) Act'],
    keywords: ['environment', 'pollution', 'air quality', 'water pollution', 'noise', 'waste',
               'hazardous', 'EIA', 'environmental clearance', 'green tribunal', 'NGT', 'forest',
               'wildlife', 'conservation', 'emission', 'effluent', 'disposal', 'PCB', 'CPCB', 'SPCB']
  },
  CONSUMER: {
    name: 'Consumer Protection',
    acts: ['Consumer Protection Act'],
    keywords: ['consumer', 'complaint', 'defective', 'deficiency', 'service', 'product', 'refund',
               'replacement', 'compensation', 'unfair trade practice', 'misleading advertisement',
               'e-commerce', 'online shopping', 'warranty', 'guarantee', 'consumer forum', 'NCDRC',
               'district forum', 'state commission', 'national commission', 'consumer rights']
  },
  BANKING: {
    name: 'Banking & Finance Law',
    acts: ['Reserve Bank of India Act', 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act'],
    keywords: ['bank', 'loan', 'NPA', 'recovery', 'SARFAESI', 'DRT', 'mortgage', 'security',
               'default', 'EMI', 'interest rate', 'cheque bounce', 'dishonour', 'credit card',
               'debit card', 'UPI', 'NEFT', 'RTGS', 'banking fraud', 'RBI', 'NBFC', 'wilful defaulter',
               'one time settlement', 'OTS', 'auction', 'possession notice']
  }
};

/**
 * Keyword-based classification for fast preliminary analysis
 * @param {string} query - User's legal query
 * @returns {Object} - Preliminary classification result
 */
function keywordBasedClassification(query) {
  const normalizedQuery = query.toLowerCase();
  const scores = {};
  
  for (const [domainCode, domainConfig] of Object.entries(LEGAL_DOMAINS)) {
    let score = 0;
    const matchedKeywords = [];
    
    for (const keyword of domainConfig.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += keyword.split(' ').length; // Multi-word keywords get higher weight
        matchedKeywords.push(keyword);
      }
    }
    
    // Check for act name mentions
    for (const act of domainConfig.acts) {
      if (normalizedQuery.includes(act.toLowerCase())) {
        score += 10; // High weight for direct act mentions
        matchedKeywords.push(act);
      }
    }
    
    if (score > 0) {
      scores[domainCode] = { score, matchedKeywords, domainName: domainConfig.name };
    }
  }
  
  // Sort by score and return top match
  const sorted = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);
  
  if (sorted.length === 0) {
    return { domain: null, confidence: 0, keywords: [], act: null };
  }
  
  const topMatch = sorted[0];
  const totalScore = sorted.reduce((sum, [, data]) => sum + data.score, 0);
  const confidence = Math.min(95, Math.round((topMatch[1].score / totalScore) * 100));
  
  return {
    domain: topMatch[0],
    domainName: topMatch[1].domainName,
    confidence,
    keywords: topMatch[1].matchedKeywords,
    acts: LEGAL_DOMAINS[topMatch[0]].acts,
    alternativeDomains: sorted.slice(1, 3).map(([code, data]) => ({
      domain: code,
      domainName: data.domainName,
      confidence: Math.round((data.score / totalScore) * 100)
    }))
  };
}

/**
 * AI-powered classification using Gemini
 * @param {string} query - User's legal query
 * @returns {Promise<Object>} - AI classification result
 */
async function aiPoweredClassification(query) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `You are an expert Indian Legal AI classifier. Analyze the following legal query and classify it.

LEGAL QUERY: "${query}"

AVAILABLE LEGAL DOMAINS:
1. CRIMINAL - Criminal Law (BNS, BNSS, BSA)
2. CYBER - Cyber Law (IT Act)
3. CONSTITUTIONAL - Constitutional Law (Constitution of India)
4. CORPORATE - Corporate/Commercial Law (Companies Act, IBC, Competition Act, LLP Act)
5. FAMILY - Family Law (Hindu Marriage Act, Special Marriage Act, Hindu Succession Act, Guardians and Wards Act)
6. PROPERTY - Property Law (Transfer of Property Act, Registration Act, RERA)
7. LABOUR - Labour & Employment Law (Industrial Disputes Act, Minimum Wages Act, EPF Act, Code on Wages)
8. TAXATION - Taxation Law (Income-tax Act, GST)
9. ENVIRONMENTAL - Environmental Law (Environment Protection Act, Water Pollution Act)
10. CONSUMER - Consumer Protection (Consumer Protection Act 2019)
11. BANKING - Banking & Finance Law (RBI Act, SARFAESI Act)

Respond ONLY in this JSON format (no markdown, no explanation):
{
  "predicted_domain": "DOMAIN_CODE",
  "predicted_domain_name": "Full Domain Name",
  "predicted_act": "Most Relevant Act Name",
  "keywords_extracted": ["keyword1", "keyword2", "keyword3"],
  "confidence_score": 85,
  "legal_issue_summary": "Brief one-line summary of legal issue",
  "secondary_domains": ["DOMAIN_CODE2"],
  "urgency_level": "high/medium/low",
  "requires_professional": true/false
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse JSON response
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7);
    }
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.slice(0, -3);
    }
    
    const parsed = JSON.parse(cleanedText.trim());
    
    return {
      success: true,
      domain: parsed.predicted_domain,
      domainName: parsed.predicted_domain_name,
      act: parsed.predicted_act,
      keywords: parsed.keywords_extracted || [],
      confidence: parsed.confidence_score || 75,
      summary: parsed.legal_issue_summary,
      secondaryDomains: parsed.secondary_domains || [],
      urgency: parsed.urgency_level || 'medium',
      requiresProfessional: parsed.requires_professional ?? true,
      source: 'ai'
    };
  } catch (error) {
    console.error('AI Classification Error:', error.message);
    return {
      success: false,
      error: error.message,
      source: 'ai'
    };
  }
}

/**
 * Main classification function - combines keyword and AI classification
 * @param {string} query - User's legal query
 * @returns {Promise<Object>} - Final classification result
 */
async function classifyLegalQuery(query) {
  if (!query || typeof query !== 'string' || query.trim().length < 10) {
    return {
      success: false,
      error: 'Query must be at least 10 characters long',
      predicted_domain: null,
      predicted_act: null,
      keywords_extracted: [],
      confidence_score: 0
    };
  }

  const startTime = Date.now();
  
  // Step 1: Fast keyword-based classification
  const keywordResult = keywordBasedClassification(query);
  
  // Step 2: If keyword confidence is very high (>85%), use it directly
  if (keywordResult.confidence >= 85) {
    return {
      success: true,
      predicted_domain: keywordResult.domain,
      predicted_domain_name: keywordResult.domainName,
      predicted_act: keywordResult.acts[0],
      all_relevant_acts: keywordResult.acts,
      keywords_extracted: keywordResult.keywords,
      confidence_score: keywordResult.confidence,
      alternative_domains: keywordResult.alternativeDomains,
      classification_method: 'keyword',
      processing_time_ms: Date.now() - startTime
    };
  }
  
  // Step 3: Use AI for better classification
  const aiResult = await aiPoweredClassification(query);
  
  if (aiResult.success) {
    // Combine AI result with keyword insights
    const combinedKeywords = [...new Set([...aiResult.keywords, ...keywordResult.keywords])];
    
    return {
      success: true,
      predicted_domain: aiResult.domain,
      predicted_domain_name: aiResult.domainName,
      predicted_act: aiResult.act,
      all_relevant_acts: LEGAL_DOMAINS[aiResult.domain]?.acts || [aiResult.act],
      keywords_extracted: combinedKeywords.slice(0, 10),
      confidence_score: aiResult.confidence,
      legal_issue_summary: aiResult.summary,
      urgency_level: aiResult.urgency,
      requires_professional_consultation: aiResult.requiresProfessional,
      secondary_domains: aiResult.secondaryDomains,
      alternative_domains: keywordResult.alternativeDomains,
      classification_method: 'ai_enhanced',
      processing_time_ms: Date.now() - startTime
    };
  }
  
  // Step 4: Fallback to keyword result if AI fails
  if (keywordResult.domain) {
    return {
      success: true,
      predicted_domain: keywordResult.domain,
      predicted_domain_name: keywordResult.domainName,
      predicted_act: keywordResult.acts[0],
      all_relevant_acts: keywordResult.acts,
      keywords_extracted: keywordResult.keywords,
      confidence_score: keywordResult.confidence,
      alternative_domains: keywordResult.alternativeDomains,
      classification_method: 'keyword_fallback',
      ai_error: aiResult.error,
      processing_time_ms: Date.now() - startTime
    };
  }
  
  // Step 5: Unable to classify
  return {
    success: false,
    predicted_domain: null,
    predicted_act: null,
    keywords_extracted: [],
    confidence_score: 0,
    error: 'Unable to classify query. Please provide more specific legal details.',
    suggestion: 'Try including specific legal terms, act names, or describe your situation in more detail.',
    processing_time_ms: Date.now() - startTime
  };
}

/**
 * Extract entities from legal query for enhanced search
 * @param {string} query - User's legal query
 * @returns {Object} - Extracted entities
 */
function extractLegalEntities(query) {
  const entities = {
    sections: [],
    acts: [],
    articles: [],
    amounts: [],
    dates: [],
    parties: []
  };
  
  // Extract section numbers (Section 420, Sec. 302, etc.)
  const sectionPattern = /(?:section|sec\.?|s\.?)\s*(\d+[A-Za-z]?)/gi;
  let match;
  while ((match = sectionPattern.exec(query)) !== null) {
    entities.sections.push(match[1]);
  }
  
  // Extract article numbers (Article 21, Art. 14, etc.)
  const articlePattern = /(?:article|art\.?)\s*(\d+[A-Za-z]?)/gi;
  while ((match = articlePattern.exec(query)) !== null) {
    entities.articles.push(match[1]);
  }
  
  // Extract monetary amounts
  const amountPattern = /(?:rs\.?|rupees?|₹|inr)\s*([\d,]+(?:\.\d{2})?)\s*(?:lakh|crore|lakhs|crores)?/gi;
  while ((match = amountPattern.exec(query)) !== null) {
    entities.amounts.push(match[0]);
  }
  
  // Extract act names from known list
  for (const [, domainConfig] of Object.entries(LEGAL_DOMAINS)) {
    for (const act of domainConfig.acts) {
      if (query.toLowerCase().includes(act.toLowerCase())) {
        entities.acts.push(act);
      }
    }
  }
  
  return entities;
}

/**
 * Get domain configuration
 * @param {string} domainCode - Domain code
 * @returns {Object|null} - Domain configuration
 */
function getDomainConfig(domainCode) {
  return LEGAL_DOMAINS[domainCode] || null;
}

/**
 * Get all available domains
 * @returns {Array} - List of all domains
 */
function getAllDomains() {
  return Object.entries(LEGAL_DOMAINS).map(([code, config]) => ({
    code,
    name: config.name,
    acts: config.acts,
    keywordCount: config.keywords.length
  }));
}

module.exports = {
  classifyLegalQuery,
  keywordBasedClassification,
  aiPoweredClassification,
  extractLegalEntities,
  getDomainConfig,
  getAllDomains,
  LEGAL_DOMAINS
};
