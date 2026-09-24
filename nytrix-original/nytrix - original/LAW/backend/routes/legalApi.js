/**
 * ============================================================
 * INDIAN LEGAL INTELLIGENCE - API ROUTES
 * RESTful API endpoints for legal intelligence system
 * ============================================================
 */

const express = require('express');
const router = express.Router();

const { classifyLegalQuery, extractLegalEntities, getAllDomains: getClassifierDomains } = require('../services/legalClassifier');

// Use mock database when MySQL is not configured
const USE_MOCK_DB = !process.env.DB_HOST || process.env.USE_MOCK_DB === 'true';
const dbService = USE_MOCK_DB 
  ? require('../services/mockDatabase')
  : require('../services/legalDatabase');

const { 
  searchLegalDatabase, 
  searchBySection, 
  getActSections, 
  getDomainActs, 
  getAllDomains: getDbDomains,
  getDatabaseStats,
  logQuery 
} = dbService;

console.log(`📦 Legal API using ${USE_MOCK_DB ? 'MOCK' : 'MySQL'} database`);
const { validateQuery, requireRole } = require('../middleware/security');

// ============================================================
// MAIN ANALYSIS ENDPOINT
// POST /api/v1/analyze
// ============================================================

/**
 * @route POST /api/v1/analyze
 * @desc Analyze a legal query using AI classification and database search
 * @access Public (rate limited)
 * @body {string} query - Legal query to analyze
 * @body {number} [limit=5] - Maximum sections to return
 * @body {boolean} [includeExplanations=true] - Include full section content
 */
router.post('/analyze', async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Validate input
    const validation = validateQuery(req.body, {
      query: { required: true, type: 'string', minLength: 10, maxLength: 2000 },
      limit: { type: 'number' },
      includeExplanations: { type: 'boolean' }
    });
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: validation.errors
      });
    }
    
    const { query, limit = 5, includeExplanations = true } = req.body;
    
    // Step 1: Classify the query using AI
    const classification = await classifyLegalQuery(query);
    
    if (!classification.success) {
      return res.status(200).json({
        success: false,
        error: classification.error,
        suggestion: classification.suggestion || 'Please provide more specific legal details.',
        requires_professional_consultation: true,
        disclaimer: 'This is for informational purposes only. Please consult a qualified lawyer for legal advice.'
      });
    }
    
    // Step 2: Extract legal entities from query
    const entities = extractLegalEntities(query);
    
    // Step 3: Search database based on classification
    const searchResult = await searchLegalDatabase({
      query,
      domainCode: classification.predicted_domain,
      confidence: classification.confidence_score,
      limit: parseInt(limit) || 5,
      includeExplanations
    });
    
    // Step 4: Format final response
    const response = {
      success: true,
      query: query,
      classification: {
        domain: classification.predicted_domain,
        domain_name: classification.predicted_domain_name,
        predicted_act: classification.predicted_act,
        all_relevant_acts: classification.all_relevant_acts,
        confidence_score: classification.confidence_score,
        keywords_extracted: classification.keywords_extracted,
        legal_issue_summary: classification.legal_issue_summary,
        urgency_level: classification.urgency_level,
        classification_method: classification.classification_method
      },
      entities_found: entities,
      sections: searchResult.sections || [],
      total_matches: searchResult.total_results || 0,
      search_scope: searchResult.search_scope,
      requires_professional_consultation: classification.requires_professional_consultation ?? true,
      alternative_domains: classification.alternative_domains,
      processing_time_ms: Date.now() - startTime,
      disclaimer: 'This analysis is for educational and informational purposes only. It does NOT constitute legal advice. Please consult a qualified, registered advocate for specific legal matters.'
    };
    
    // Add professional consultation recommendation if needed
    if (response.sections.length === 0 || classification.confidence_score < 50) {
      response.recommendation = {
        type: 'professional_consultation',
        message: 'Based on your query, we recommend consulting a legal professional for accurate advice.',
        suggested_specialists: getSuggestedSpecialists(classification.predicted_domain)
      };
    }
    
    // Log query for analytics (non-blocking)
    logQuery({
      query,
      domain: classification.predicted_domain,
      act: classification.predicted_act,
      confidence: classification.confidence_score,
      sectionsReturned: response.sections.length,
      responseTimeMs: response.processing_time_ms,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      apiKey: req.headers['x-api-key'],
      success: true
    }).catch(console.error);
    
    res.json(response);
    
  } catch (error) {
    console.error('Analysis Error:', error);
    
    // Log failed query
    logQuery({
      query: req.body?.query,
      responseTimeMs: Date.now() - startTime,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      success: false,
      error: error.message
    }).catch(console.error);
    
    res.status(500).json({
      success: false,
      error: 'Analysis failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred during analysis',
      requires_professional_consultation: true
    });
  }
});

// ============================================================
// QUICK CLASSIFICATION ENDPOINT
// POST /api/v1/classify
// ============================================================

/**
 * @route POST /api/v1/classify
 * @desc Quick classification without database search
 * @access Public
 * @body {string} query - Query to classify
 */
router.post('/classify', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Query must be at least 10 characters'
      });
    }
    
    const classification = await classifyLegalQuery(query);
    res.json(classification);
    
  } catch (error) {
    console.error('Classification Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================
// SEARCH ENDPOINTS
// ============================================================

/**
 * @route GET /api/v1/search
 * @desc Search legal database with custom parameters
 * @access Public
 * @query {string} q - Search query
 * @query {string} [domain] - Filter by domain code
 * @query {string} [act] - Filter by act code
 * @query {number} [limit=10] - Results limit
 * @query {number} [offset=0] - Pagination offset
 */
router.get('/search', async (req, res) => {
  try {
    const { q, domain, act, limit = 10, offset = 0 } = req.query;
    
    if (!q || q.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 3 characters'
      });
    }
    
    const result = await searchLegalDatabase({
      query: q,
      domainCode: domain,
      actCode: act,
      confidence: domain ? 70 : 0,
      limit: Math.min(parseInt(limit) || 10, 50),
      offset: parseInt(offset) || 0
    });
    
    res.json(result);
    
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route GET /api/v1/section/:sectionNumber
 * @desc Get specific section by number
 * @access Public
 * @param {string} sectionNumber - Section number
 * @query {string} [act] - Act code to narrow search
 */
router.get('/section/:sectionNumber', async (req, res) => {
  try {
    const { sectionNumber } = req.params;
    const { act } = req.query;
    
    const result = await searchBySection(sectionNumber, act);
    res.json(result);
    
  } catch (error) {
    console.error('Section Lookup Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================
// DOMAIN & ACT ENDPOINTS
// ============================================================

/**
 * @route GET /api/v1/domains
 * @desc Get all law domains
 * @access Public
 */
router.get('/domains', async (req, res) => {
  try {
    // Try database first, fallback to classifier config
    const dbDomains = await getDbDomains();
    
    if (dbDomains.success && dbDomains.domains.length > 0) {
      return res.json(dbDomains);
    }
    
    // Fallback to classifier config
    const classifierDomains = getClassifierDomains();
    res.json({
      success: true,
      source: 'classifier_config',
      domains: classifierDomains
    });
    
  } catch (error) {
    console.error('Get Domains Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route GET /api/v1/domains/:domainCode
 * @desc Get domain with all acts
 * @access Public
 * @param {string} domainCode - Domain code
 */
router.get('/domains/:domainCode', async (req, res) => {
  try {
    const result = await getDomainActs(req.params.domainCode);
    res.json(result);
  } catch (error) {
    console.error('Get Domain Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route GET /api/v1/acts/:actCode
 * @desc Get act with all sections
 * @access Public
 * @param {string} actCode - Act code
 */
router.get('/acts/:actCode', async (req, res) => {
  try {
    const result = await getActSections(req.params.actCode);
    res.json(result);
  } catch (error) {
    console.error('Get Act Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================
// STATISTICS & HEALTH ENDPOINTS
// ============================================================

/**
 * @route GET /api/v1/stats
 * @desc Get database statistics
 * @access Public
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await getDatabaseStats();
    res.json(stats);
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route GET /api/v1/health
 * @desc API health check
 * @access Public
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    service: 'Indian Legal Intelligence API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get suggested legal specialists based on domain
 * @param {string} domain - Domain code
 * @returns {string[]} - List of suggested specialists
 */
function getSuggestedSpecialists(domain) {
  const specialists = {
    CRIMINAL: ['Criminal Defense Lawyer', 'Public Prosecutor'],
    CYBER: ['Cyber Law Expert', 'IT Law Specialist'],
    CONSTITUTIONAL: ['Constitutional Lawyer', 'Human Rights Advocate'],
    CORPORATE: ['Corporate Lawyer', 'Company Secretary', 'Insolvency Professional'],
    FAMILY: ['Family Court Lawyer', 'Matrimonial Law Expert'],
    PROPERTY: ['Property Lawyer', 'Real Estate Lawyer', 'RERA Consultant'],
    LABOUR: ['Labour Law Advocate', 'Employment Lawyer'],
    TAXATION: ['Tax Consultant', 'Chartered Accountant', 'Tax Lawyer'],
    ENVIRONMENTAL: ['Environmental Lawyer', 'NGT Practitioner'],
    CONSUMER: ['Consumer Rights Advocate', 'Consumer Forum Lawyer'],
    BANKING: ['Banking Lawyer', 'Debt Recovery Specialist', 'NPA Advisor']
  };
  
  return specialists[domain] || ['General Legal Practitioner', 'Advocate'];
}

module.exports = router;
