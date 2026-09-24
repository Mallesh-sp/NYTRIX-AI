const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import new legal intelligence modules
const legalApiRoutes = require('./routes/legalApi');
const chatApiRoutes = require('./routes/chatApi');
const { 
  validateInput, 
  rateLimiter, 
  requestLogger, 
  errorHandler,
  securityHeaders 
} = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(securityHeaders);
app.use(requestLogger);

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Input validation
app.use(validateInput);

// Rate limiting for API routes
app.use('/api', rateLimiter);

// Load lawyers data
const lawyersPath = path.join(__dirname, 'lawyers.json');
let lawyers = [];

try {
  const data = fs.readFileSync(lawyersPath, 'utf8');
  lawyers = JSON.parse(data);
} catch (err) {
  console.error('Error loading lawyers.json:', err);
  lawyers = [];
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get all lawyers
app.get('/api/lawyers', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;
  
  res.json(lawyers.slice(offset, offset + limit));
});

// Get lawyer by ID
app.get('/api/lawyers/:id', (req, res) => {
  const lawyer = lawyers.find(l => l.id === parseInt(req.params.id));
  
  if (!lawyer) {
    return res.status(404).json({ 
      error: 'Lawyer not found',
      id: req.params.id
    });
  }
  
  res.json(lawyer);
});

// Filter by city
app.get('/api/lawyers/city/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const filtered = lawyers.filter(l => l.city.toLowerCase() === city);
  
  res.json(filtered);
});

// Filter by specialization
app.get('/api/lawyers/specialization/:specialization', (req, res) => {
  const spec = req.params.specialization.toLowerCase();
  const filtered = lawyers.filter(l => l.specialization.toLowerCase() === spec);
  
  res.json(filtered);
});

// Comprehensive scenario database with keyword matching
const scenarioDatabase = [
  // 1. Consumer Fraud
  { keywords: ['consumer', 'fraud', 'refund', 'seller', 'product'], law: 'Consumer Protection Act, 2019', riskLevel: 'Medium', lawyerType: 'Consumer Rights Lawyer', actionSteps: ['Contact seller for refund', 'If no response, send legal notice', 'File consumer complaint online/offline'], where: 'District Consumer Commission', dos: ['Act within 2 years'], donts: ['Lose invoice'], documents: ['Bill', 'warranty', 'emails', 'screenshots'] },
  // 2. Online Shopping Scam
  { keywords: ['shopping', 'scam', 'online', 'fraud', 'cart', 'payment'], law: 'IT Act, 2000', riskLevel: 'High', lawyerType: 'Cyber Crime Specialist', actionSteps: ['Inform bank immediately', 'Block card/account', 'File cyber complaint'], where: 'cybercrime.gov.in', dos: ['Save transaction proof'], donts: ['Share OTP'], documents: ['Bank statement', 'order ID'] },
  // 3. Salary Not Paid
  { keywords: ['salary', 'wages', 'payment', 'unpaid', 'employer'], law: 'Payment of Wages Act', riskLevel: 'High', lawyerType: 'Labour Lawyer', actionSteps: ['Written complaint to employer', 'Approach Labour Officer', 'File claim in Labour Court'], where: 'Labour Commissioner', dos: ['Keep appointment letter'], donts: ['Accept oral promises'], documents: ['Payslip', 'attendance'] },
  // 4. Wrongful Termination
  { keywords: ['termination', 'fired', 'dismissed', 'wrongful', 'layoff', 'job'], law: 'Industrial Disputes Act', riskLevel: 'High', lawyerType: 'Labour Lawyer', actionSteps: ['Demand explanation in writing', 'Raise dispute via labour office', 'Seek reinstatement/compensation'], where: 'Labour Court', dos: ['Preserve termination mail'], donts: ['Sign blank papers'], documents: ['Offer letter', 'termination letter'] },
  // 5. Domestic Violence
  { keywords: ['violence', 'abuse', 'domestic', 'assault', 'beating', 'hit'], law: 'Protection of Women from DV Act', riskLevel: 'High', lawyerType: 'Family Lawyer', actionSteps: ['Approach Protection Officer', 'File complaint/FIR', 'Get protection & residence order'], where: 'Women Police Station / Court', dos: ['Seek medical help'], donts: ['Stay silent'], documents: ['Medical report', 'photos'] },
  // 6. Dowry Harassment
  { keywords: ['dowry', 'harassment', '498a', 'money', 'demand'], law: 'IPC 498A', riskLevel: 'High', lawyerType: 'Family Lawyer', actionSteps: ['File FIR', 'Apply for legal protection', 'Seek maintenance'], where: 'All Women Police Station', dos: ['Collect call records'], donts: ['Withdraw under pressure'], documents: ['Messages', 'witnesses'] },
  // 7. Cheating by Friend
  { keywords: ['cheating', 'friend', 'loan', 'money', 'fraud', '420'], law: 'IPC 420', riskLevel: 'Medium', lawyerType: 'Criminal Lawyer', actionSteps: ['Demand repayment in writing', 'File police complaint', 'Civil recovery suit if needed'], where: 'Police Station', dos: ['Show money proof'], donts: ['Threaten'], documents: ['Bank transfer proof'] },
  // 8. Land Encroachment
  { keywords: ['land', 'encroachment', 'property', 'occupy', 'illegal'], law: 'Land Revenue Act', riskLevel: 'Medium', lawyerType: 'Property Lawyer', actionSteps: ['Survey request', 'File eviction petition', 'Revenue inspection'], where: 'Tahsildar Office', dos: ['Keep patta'], donts: ['Remove encroachment yourself'], documents: ['Patta', 'survey map'] },
  // 9. Property Document Fraud
  { keywords: ['property', 'fraud', 'document', 'registration', 'deed'], law: 'Registration Act', riskLevel: 'High', lawyerType: 'Property Lawyer', actionSteps: ['Police complaint', 'Cancel fake registration', 'File civil suit'], where: 'Sub-Registrar + Police', dos: ['Verify EC'], donts: ['Delay action'], documents: ['Sale deed', 'EC'] },
  // 10. Bank Loan Harassment
  { keywords: ['bank', 'loan', 'harassment', 'recovery', 'debt'], law: 'RBI Guidelines', riskLevel: 'Medium', lawyerType: 'Banking Lawyer', actionSteps: ['Written complaint to bank', 'Escalate to Ombudsman'], where: 'Banking Ombudsman', dos: ['Record calls'], donts: ['Pay cash'], documents: ['Loan agreement'] },
  // 11. Credit Card Fraud
  { keywords: ['credit', 'card', 'fraud', 'transaction', 'cyber'], law: 'IT Act', riskLevel: 'High', lawyerType: 'Cyber Crime Specialist', actionSteps: ['Block card immediately', 'Dispute transaction', 'File cyber complaint'], where: 'Bank + Cyber Cell', dos: ['Report within 24 hrs'], donts: ['Ignore SMS'], documents: ['Statement', 'complaint copy'] },
  // 12. Medical Negligence
  { keywords: ['medical', 'negligence', 'doctor', 'hospital', 'treatment'], law: 'Consumer Protection Act', riskLevel: 'High', lawyerType: 'Medical Negligence Lawyer', actionSteps: ['Collect medical records', 'Legal notice', 'Consumer case'], where: 'Consumer Court', dos: ['Consult expert doctor'], donts: ['Alter records'], documents: ['Reports', 'bills'] },
  // 13. School Fees Issue
  { keywords: ['school', 'fees', 'education', 'charge', 'tuition', 'extra fees', 'school charging', 'fee complaint'], law: 'Education Department Rules', riskLevel: 'Low', lawyerType: 'Education Lawyer', actionSteps: ['Written grievance', 'DEO complaint'], where: 'DEO Office', dos: ['Check fee rules'], donts: ['Argue verbally'], documents: ['Fee receipt', 'school letter', 'receipt'] },
  // 14. College Certificate Delay
  { keywords: ['college', 'certificate', 'degree', 'university', 'delay', 'not giving certificate', 'degree certificate delay'], law: 'University Regulations', riskLevel: 'Low', lawyerType: 'Education Lawyer', actionSteps: ['Written request', 'RTI if delay continues'], where: 'University Registrar', dos: ['Take acknowledgment'], donts: ['Pay bribe'], documents: ['Application copy', 'degree proof'] },
  // 15. Tenant Eviction Threat
  { keywords: ['tenant', 'eviction', 'rent', 'house', 'evict', 'landlord forcing', 'tenant rights', 'forcing eviction'], law: 'Rent Control Act', riskLevel: 'Medium', lawyerType: 'Property Lawyer', actionSteps: ['Legal notice', 'Stay order from court'], where: 'Rent Controller', dos: ['Pay rent on time'], donts: ['Vacate suddenly'], documents: ['Rental agreement', 'rent receipts'] },
  // 16. Deposit Not Returned
  { keywords: ['deposit', 'return', 'rental', 'landlord', 'security', 'not returning advance', 'advance refund', 'deposit refund issue'], law: 'Rent Act', riskLevel: 'Medium', lawyerType: 'Property Lawyer', actionSteps: ['Legal notice', 'Civil suit'], where: 'Civil Court', dos: ['Keep payment proof'], donts: ['Damage property'], documents: ['Payment proof', 'receipt', 'agreement'] },
  // 17. Traffic Fine Dispute
  { keywords: ['traffic', 'fine', 'challan', 'ticket', 'vehicle', 'wrong challan', 'e-challan dispute'], law: 'Motor Vehicles Act', riskLevel: 'Low', lawyerType: 'Traffic Lawyer', actionSteps: ['Check e-challan', 'File appeal'], where: 'Traffic Court', dos: ['Verify online'], donts: ['Bribe'], documents: ['Challan copy', 'vehicle RC'] },
  // 18. Road Accident
  { keywords: ['accident', 'road', 'car', 'vehicle', 'collision', 'injury', 'compensation', 'insurance claim'], law: 'MV Act', riskLevel: 'High', lawyerType: 'Accident Lawyer', actionSteps: ['FIR', 'Insurance claim', 'MACT case'], where: 'MACT', dos: ['Take photos'], donts: ['Escape scene'], documents: ['FIR', 'medical bills', 'police report'] },
  // 19. Fake Job Offer
  { keywords: ['job', 'offer', 'fake', 'scam', 'interview', 'recruitment', 'job consultancy', 'job scam', 'registration fees'], law: 'IPC 420', riskLevel: 'High', lawyerType: 'Cyber Crime Specialist', actionSteps: ['Cyber complaint', 'Police FIR'], where: 'Cyber Cell', dos: ['Verify company'], donts: ['Pay registration fees'], documents: ['Emails', 'receipts', 'payment proof'] },
  // 20. Cyber Bullying
  { keywords: ['cyberbullying', 'bullying', 'abuse', 'online', 'harassment', 'social', 'online harassment', 'social media abuse'], law: 'IT Act', riskLevel: 'Medium', lawyerType: 'Cyber Crime Specialist', actionSteps: ['Report platform', 'Cyber complaint'], where: 'Cyber Crime Cell', dos: ['Screenshot abuse'], donts: ['Retaliate'], documents: ['Chat logs', 'screenshots'] },
  // 21. Identity Theft
  { keywords: ['identity', 'theft', 'stolen', 'fake', 'impersonation', 'aadhaar misuse', 'identity theft complaint'], law: 'IT Act', riskLevel: 'High', lawyerType: 'Cyber Crime Specialist', actionSteps: ['Block accounts', 'FIR', 'Credit alert'], where: 'Cyber Portal', dos: ['Change passwords'], donts: ['Ignore alerts'], documents: ['Bank alerts', 'Aadhaar proof'] },
  // 22. Phone Harassment
  { keywords: ['phone', 'harassment', 'call', 'threat', '354d', 'abuse', 'unknown number', 'continuous calls'], law: 'IPC 354D', riskLevel: 'Medium', lawyerType: 'Criminal Lawyer', actionSteps: ['Police complaint', 'Number blocking'], where: 'Police Station', dos: ['Record calls'], donts: ['Respond'], documents: ['Call logs', 'phone records'] },
  // 23. Public Nuisance
  { keywords: ['nuisance', 'public', 'disturbance', 'noise', 'complaint', 'neighbor nuisance', 'public disturbance'], law: 'IPC 268', riskLevel: 'Low', lawyerType: 'General Lawyer', actionSteps: ['Written police complaint', 'Municipality action'], where: 'Local Police', dos: ['Collect proof'], donts: ['Fight'], documents: ['Photos/videos', 'witness names'] },
  // 24. Noise Pollution
  { keywords: ['noise', 'pollution', 'sound', 'loud', 'disturbance', 'loudspeaker', 'noise complaint'], law: 'Noise Pollution Rules', riskLevel: 'Low', lawyerType: 'Environmental Lawyer', actionSteps: ['Police complaint', 'PCB action'], where: 'Pollution Control Board', dos: ['Note timing'], donts: ['Argue violently'], documents: ['Video proof', 'noise recording'] },
  // 25. Water Supply Issue
  { keywords: ['water', 'supply', 'pipeline', 'connection', 'municipal'], law: 'Municipal Act', riskLevel: 'Low', lawyerType: 'Municipal Lawyer', actionSteps: ['Written complaint', 'Escalation'], where: 'Municipality', dos: ['Take complaint number'], donts: ['Break pipeline'], documents: ['Bill copy'] },
  // 26. Electricity Overbilling
  { keywords: ['electricity', 'bill', 'overbilling', 'meter', 'power'], law: 'Electricity Act', riskLevel: 'Low', lawyerType: 'Consumer Rights Lawyer', actionSteps: ['Meter test request', 'Ombudsman'], where: 'EB Ombudsman', dos: ['Photo meter'], donts: ['Delay payment'], documents: ['Bill copy'] },
  // 27. Power Cut Issue
  { keywords: ['power', 'cut', 'outage', 'electricity', 'disconnect'], law: 'Electricity Supply Code', riskLevel: 'Low', lawyerType: 'Consumer Rights Lawyer', actionSteps: ['Register outage', 'Compensation claim'], where: 'EB Office', dos: ['Note duration'], donts: ['Illegal wiring'], documents: ['Complaint ID'] },
  // 28. Ration Card Issue
  { keywords: ['ration', 'card', 'pds', 'food', 'subsidy'], law: 'PDS Rules', riskLevel: 'Low', lawyerType: 'Administrative Lawyer', actionSteps: ['Correction request', 'Appeal'], where: 'Taluk Office', dos: ['Link Aadhaar'], donts: ['Use agents'], documents: ['Aadhaar', 'address proof'] },
  // 29. Pension Delay
  { keywords: ['pension', 'delay', 'retirement', 'social', 'welfare'], law: 'Social Welfare Laws', riskLevel: 'Medium', lawyerType: 'Administrative Lawyer', actionSteps: ['Grievance', 'Collector escalation'], where: 'Collector Office', dos: ['Update bank KYC'], donts: ['Pay bribe'], documents: ['Pension ID'] },
  // 30. Officer Corruption
  { keywords: ['corruption', 'officer', 'bribe', 'misconduct', 'illegal', 'government officer corruption', 'complaint against officer'], law: 'PC Act', riskLevel: 'High', lawyerType: 'Anti-Corruption Lawyer', actionSteps: ['Vigilance complaint', 'Enquiry'], where: 'Vigilance Commission', dos: ['Gather proof'], donts: ['Offer bribe'], documents: ['Audio/video', 'proof'] },
  // 31. Bribery Demand
  { keywords: ['bribery', 'bribe', 'demand', 'extortion', 'money', 'officer asking bribe', 'complain bribery'], law: 'PC Act', riskLevel: 'High', lawyerType: 'Anti-Corruption Lawyer', actionSteps: ['ACB complaint', 'Trap proceedings'], where: 'Anti-Corruption Bureau', dos: ['Inform immediately'], donts: ['Go alone'], documents: ['Proof messages', 'recording'] },
  // 32. Passport Delay
  { keywords: ['passport application delay', 'passport status not updated', 'passport status', 'passport application', 'passport act', 'passport seva', 'visa', 'arn'], law: 'Passport Act', riskLevel: 'Low', lawyerType: 'Immigration Lawyer', actionSteps: ['Grievance', 'RTI'], where: 'Passport Seva', dos: ['Track online'], donts: ['Use agents'], documents: ['ARN', 'application receipt'] },
  // 33. Aadhaar Correction
  { keywords: ['aadhaar', 'correction', 'update', 'identity', 'enrollment', 'aadhaar name correction', 'aadhaar update problem'], law: 'UIDAI Rules', riskLevel: 'Low', lawyerType: 'Administrative Lawyer', actionSteps: ['Update request', 'Follow-up'], where: 'Aadhaar Center', dos: ['Carry originals'], donts: ['Share OTP'], documents: ['Proofs', 'ID documents'] },
  // 34. Voter ID Issue
  { keywords: ['voter', 'id', 'voting', 'election', 'voter id', 'voter id correction', 'name missing in voter list'], law: 'Election Law', riskLevel: 'Low', lawyerType: 'Administrative Lawyer', actionSteps: ['Form submission', 'BLO verification'], where: 'Election Office', dos: ['Apply early'], donts: ['Give false info'], documents: ['Address proof', 'identity proof'] },
  // 35. Defamation
  { keywords: ['defamation case how to file', 'false allegations complaint', 'defamation case', 'false allegations', 'defamation', 'defame', 'reputation', 'slander', 'libel'], law: 'IPC 499', riskLevel: 'Medium', lawyerType: 'Criminal Lawyer', actionSteps: ['Legal notice', 'Court case'], where: 'Court', dos: ['Preserve evidence'], donts: ['Respond publicly'], documents: ['Screenshots', 'evidence'] },
  // 36. Divorce
  { keywords: ['how to file divorce', 'mutual divorce process', 'hindu marriage act', 'divorce'], law: 'Hindu Marriage Act', riskLevel: 'High', lawyerType: 'Family Lawyer', actionSteps: ['Divorce petition', 'Settlement'], where: 'Family Court', dos: ['Seek lawyer'], donts: ['Hide assets'], documents: ['Marriage proof', 'ID proof'] },
  // 37. Child Custody
  { keywords: ['child custody after divorce', 'custody rights law', 'guardianship act', 'custody'], law: 'Guardianship Act', riskLevel: 'High', lawyerType: 'Family Lawyer', actionSteps: ['Custody petition', 'Court counselling'], where: 'Family Court', dos: ['Focus child welfare'], donts: ['Brainwash child'], documents: ['Child records', 'birth certificate'] },
  // 38. Maintenance
  { keywords: ['maintenance for wife', 'husband not paying maintenance', 'crpc 125', 'alimony'], law: 'CrPC 125', riskLevel: 'Medium', lawyerType: 'Family Lawyer', actionSteps: ['Maintenance petition', 'Enforcement'], where: 'Family Court', dos: ['Show expenses'], donts: ['Delay filing'], documents: ['Income proof', 'expense details'] },
  // 39. Will Dispute
  { keywords: ['will property dispute', 'legal heirs rights', 'inheritance dispute', 'will dispute', 'succession act', 'inheritance', 'succession', 'testament'], law: 'Succession Act', riskLevel: 'Medium', lawyerType: 'Succession Lawyer', actionSteps: ['Probate case', 'Court decision'], where: 'Civil Court', dos: ['Verify will'], donts: ['Destroy will'], documents: ['Original will', 'proof of heirship'] },
  // 40. Illegal Arrest
  { keywords: ['illegal arrest what to do', 'police arrest without warrant', 'illegal arrest', 'arrest without warrant', 'habeas corpus', 'crpc', 'imprisonment'], law: 'CrPC', riskLevel: 'High', lawyerType: 'Criminal Lawyer', actionSteps: ['Contact lawyer', 'Habeas Corpus'], where: 'High Court', dos: ['Contact lawyer'], donts: ['Sign confession'], documents: ['Arrest memo', 'FIR copy'] }
];

// Analyze Legal Scenario
app.post('/api/analyze-scenario', (req, res) => {
  const { scenario } = req.body;
  
  if (!scenario || typeof scenario !== 'string') {
    return res.status(400).json({ 
      error: 'Scenario text is required' 
    });
  }
  
  const lowerScenario = scenario.toLowerCase();
  
  // Find matching scenario by keyword (prioritize longer/more specific keywords)
  let matchedScenario = null;
  let bestMatchLength = 0;
  let bestMatchScore = 0;
  
  for (const scene of scenarioDatabase) {
    for (const keyword of scene.keywords) {
      if (lowerScenario.includes(keyword)) {
        // Score: longer keywords get higher priority, and multi-word phrases get bonus
        const score = keyword.length + (keyword.includes(' ') ? 10 : 0);
        if (score > bestMatchScore || (score === bestMatchScore && keyword.length > bestMatchLength)) {
          matchedScenario = scene;
          bestMatchScore = score;
          bestMatchLength = keyword.length;
        }
      }
    }
  }
  
  // If match found, return structured response
  if (matchedScenario) {
    return res.json({
      scenario: scenario,
      riskLevel: matchedScenario.riskLevel,
      law: matchedScenario.law,
      lawyerRecommendation: matchedScenario.lawyerType,
      actionSteps: matchedScenario.actionSteps,
      where: matchedScenario.where,
      dos: matchedScenario.dos,
      donts: matchedScenario.donts,
      documents: matchedScenario.documents,
      relevantSections: [matchedScenario.law],
      mensRights: ['Right to legal representation', 'Right to fair treatment under law', 'Right to legal information']
    });
  }
  
  // Default response if no match found
  res.json({
    scenario: scenario,
    riskLevel: 'Low',
    law: 'General Legal Matter',
    lawyerRecommendation: 'General Practice Lawyer',
    actionSteps: [
      '1. Understand the legal issue clearly',
      '2. Gather relevant documents',
      '3. Consult appropriate lawyer',
      '4. Follow legal advice',
      '5. Maintain documentation'
    ],
    where: 'Consult a lawyer or legal aid center',
    dos: ['Seek professional legal advice'],
    donts: ['Do NOT make decisions without legal advice', 'Do NOT delay in seeking help'],
    documents: ['All relevant documents and communications'],
    relevantSections: ['General legal inquiry - Consult lawyer for details'],
    mensRights: ['Right to legal information', 'Right to legal representation', 'Right to fair treatment under law']
  });
});

// ============================================================
// LEGAL INTELLIGENCE API v1
// Production-grade Indian Legal Database System
// ============================================================
app.use('/api/v1', legalApiRoutes);

// ============================================================
// GROQ AI CHAT API
// Human-like conversational AI powered by Groq
// ============================================================
app.use('/api/chat', chatApiRoutes);

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'Indian Legal Intelligence API',
    version: '1.0.0',
    description: 'AI-powered Indian Legal Database System',
    endpoints: {
      analysis: {
        'POST /api/v1/analyze': 'Analyze legal query with AI classification and section retrieval',
        'POST /api/v1/classify': 'Quick legal query classification without search'
      },
      search: {
        'GET /api/v1/search': 'Search legal database with custom parameters',
        'GET /api/v1/section/:number': 'Get specific section by number'
      },
      data: {
        'GET /api/v1/domains': 'Get all law domains',
        'GET /api/v1/domains/:code': 'Get domain with all acts',
        'GET /api/v1/acts/:code': 'Get act with all sections'
      },
      meta: {
        'GET /api/v1/stats': 'Get database statistics',
        'GET /api/v1/health': 'API health check'
      }
    },
    authentication: 'API Key via X-API-Key header (optional in development)',
    rateLimit: '30 requests per minute',
    disclaimer: 'This API provides legal information for educational purposes only. Not a substitute for professional legal advice.'
  });
});

// Error handling middleware (use custom handler)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║     ⚖️  NYTRIX AI - INDIAN LEGAL INTELLIGENCE ENGINE              ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ✅ Server running on http://localhost:${PORT}                      ║
║  ✅ Legal Intelligence API v1 active                              ║
║  ✅ Groq AI Chat API active                                       ║
║  ✅ ${lawyers.length} verified lawyers loaded                            ║
║  ✅ Security middleware enabled                                   ║
║  ✅ Rate limiting: 30 req/min                                     ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║  API ENDPOINTS:                                                   ║
║                                                                   ║
║  💬 POST /api/chat/chat     - Groq AI conversation                ║
║  📜 GET  /api/chat/history  - Get chat history                    ║
║  📤 GET  /api/chat/export   - Export conversation                 ║
║  📊 POST /api/v1/analyze    - AI-powered legal analysis           ║
║  🔍 GET  /api/v1/search     - Search legal database               ║
║  📚 GET  /api/v1/domains    - Browse law domains                  ║
║  📖 GET  /api/v1/acts/:code - Get act with sections               ║
║  📄 GET  /api/docs          - Full API documentation              ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║  ⚠️  DISCLAIMER: Not a substitute for professional legal advice   ║
╚═══════════════════════════════════════════════════════════════════╝
  `);
});
