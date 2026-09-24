/**
 * ============================================================
 * INDIAN LEGAL INTELLIGENCE - DATABASE SEARCH SERVICE
 * SQL-driven legal section retrieval with full-text search
 * ============================================================
 */

const mysql = require('mysql2/promise');

// Database connection pool configuration
let pool = null;

/**
 * Initialize database connection pool
 * @returns {Promise<mysql.Pool>}
 */
async function initializePool() {
  if (pool) return pool;
  
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indian_legal_db',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: 'utf8mb4'
  });
  
  console.log('✅ Legal Database connection pool initialized');
  return pool;
}

/**
 * Get database connection from pool
 * @returns {Promise<mysql.PoolConnection>}
 */
async function getConnection() {
  if (!pool) await initializePool();
  return pool.getConnection();
}

/**
 * Search legal database using full-text search
 * @param {Object} options - Search options
 * @returns {Promise<Object>} - Search results
 */
async function searchLegalDatabase({
  query,
  domainId = null,
  domainCode = null,
  actId = null,
  actCode = null,
  confidence = 0,
  limit = 5,
  offset = 0,
  includeExplanations = true
}) {
  const startTime = Date.now();
  let connection;
  
  try {
    connection = await getConnection();
    
    // Prepare search terms - sanitize and prepare for full-text search
    const searchTerms = prepareSearchTerms(query);
    
    // Build dynamic query based on confidence level
    let sql = '';
    let params = [];
    
    if (confidence >= 70 && (actId || actCode)) {
      // High confidence: Search within specific act
      sql = `
        SELECT 
          s.id AS section_id,
          s.section_number,
          s.section_sub,
          s.title AS section_title,
          s.content,
          s.explanation,
          s.punishment,
          s.punishment_type,
          s.offence_type,
          s.keywords,
          s.chapter_number,
          s.chapter_title,
          a.id AS act_id,
          a.act_name,
          a.short_name,
          a.year AS act_year,
          a.status AS act_status,
          d.id AS domain_id,
          d.domain_name,
          d.domain_code,
          MATCH(s.content, s.keywords, s.title) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance_score
        FROM sections s
        JOIN acts a ON s.act_id = a.id
        JOIN law_domains d ON a.domain_id = d.id
        WHERE s.is_active = TRUE 
          AND a.is_active = TRUE
          AND (a.id = ? OR a.act_code = ?)
          AND MATCH(s.content, s.keywords, s.title) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance_score DESC
        LIMIT ? OFFSET ?
      `;
      params = [searchTerms, actId || 0, actCode || '', searchTerms, limit, offset];
      
    } else if (confidence >= 50 && (domainId || domainCode)) {
      // Medium confidence: Search within domain
      sql = `
        SELECT 
          s.id AS section_id,
          s.section_number,
          s.section_sub,
          s.title AS section_title,
          s.content,
          s.explanation,
          s.punishment,
          s.punishment_type,
          s.offence_type,
          s.keywords,
          s.chapter_number,
          s.chapter_title,
          a.id AS act_id,
          a.act_name,
          a.short_name,
          a.year AS act_year,
          a.status AS act_status,
          d.id AS domain_id,
          d.domain_name,
          d.domain_code,
          MATCH(s.content, s.keywords, s.title) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance_score
        FROM sections s
        JOIN acts a ON s.act_id = a.id
        JOIN law_domains d ON a.domain_id = d.id
        WHERE s.is_active = TRUE 
          AND a.is_active = TRUE
          AND d.is_active = TRUE
          AND (d.id = ? OR d.domain_code = ?)
          AND MATCH(s.content, s.keywords, s.title) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance_score DESC
        LIMIT ? OFFSET ?
      `;
      params = [searchTerms, domainId || 0, domainCode || '', searchTerms, limit, offset];
      
    } else {
      // Low confidence: Search across entire database
      sql = `
        SELECT 
          s.id AS section_id,
          s.section_number,
          s.section_sub,
          s.title AS section_title,
          s.content,
          s.explanation,
          s.punishment,
          s.punishment_type,
          s.offence_type,
          s.keywords,
          s.chapter_number,
          s.chapter_title,
          a.id AS act_id,
          a.act_name,
          a.short_name,
          a.year AS act_year,
          a.status AS act_status,
          d.id AS domain_id,
          d.domain_name,
          d.domain_code,
          MATCH(s.content, s.keywords, s.title) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance_score
        FROM sections s
        JOIN acts a ON s.act_id = a.id
        JOIN law_domains d ON a.domain_id = d.id
        WHERE s.is_active = TRUE 
          AND a.is_active = TRUE
          AND d.is_active = TRUE
          AND MATCH(s.content, s.keywords, s.title) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance_score DESC
        LIMIT ? OFFSET ?
      `;
      params = [searchTerms, searchTerms, limit, offset];
    }
    
    const [rows] = await connection.execute(sql, params);
    
    // Get total count for pagination
    const countSql = sql.replace(
      /SELECT[\s\S]*?FROM/i, 
      'SELECT COUNT(*) as total FROM'
    ).replace(/ORDER BY[\s\S]*$/i, '');
    const [countResult] = await connection.execute(countSql, params.slice(0, -2));
    
    // Format results
    const sections = rows.map(row => formatSectionResult(row, includeExplanations));
    
    return {
      success: true,
      query: query,
      search_terms: searchTerms,
      total_results: countResult[0]?.total || rows.length,
      returned_results: sections.length,
      sections,
      search_scope: confidence >= 70 ? 'act' : confidence >= 50 ? 'domain' : 'global',
      processing_time_ms: Date.now() - startTime
    };
    
  } catch (error) {
    console.error('Database Search Error:', error);
    return {
      success: false,
      error: error.message,
      query: query,
      sections: [],
      processing_time_ms: Date.now() - startTime
    };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Search by specific section number
 * @param {string} sectionNumber - Section number to find
 * @param {string} actCode - Optional act code to narrow search
 * @returns {Promise<Object>} - Search result
 */
async function searchBySection(sectionNumber, actCode = null) {
  let connection;
  
  try {
    connection = await getConnection();
    
    let sql = `
      SELECT 
        s.*,
        a.act_name,
        a.short_name,
        a.year AS act_year,
        d.domain_name,
        d.domain_code
      FROM sections s
      JOIN acts a ON s.act_id = a.id
      JOIN law_domains d ON a.domain_id = d.id
      WHERE s.section_number = ?
        AND s.is_active = TRUE
    `;
    let params = [sectionNumber];
    
    if (actCode) {
      sql += ' AND a.act_code = ?';
      params.push(actCode);
    }
    
    sql += ' ORDER BY a.year DESC LIMIT 10';
    
    const [rows] = await connection.execute(sql, params);
    
    return {
      success: true,
      total_results: rows.length,
      sections: rows.map(row => formatSectionResult(row, true))
    };
    
  } catch (error) {
    console.error('Section Search Error:', error);
    return { success: false, error: error.message, sections: [] };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Get all sections of an act
 * @param {number|string} actIdOrCode - Act ID or code
 * @returns {Promise<Object>} - Act with all sections
 */
async function getActSections(actIdOrCode) {
  let connection;
  
  try {
    connection = await getConnection();
    
    // First get act details
    const [acts] = await connection.execute(`
      SELECT a.*, d.domain_name, d.domain_code
      FROM acts a
      JOIN law_domains d ON a.domain_id = d.id
      WHERE (a.id = ? OR a.act_code = ?) AND a.is_active = TRUE
    `, [actIdOrCode, actIdOrCode]);
    
    if (acts.length === 0) {
      return { success: false, error: 'Act not found' };
    }
    
    const act = acts[0];
    
    // Get all sections
    const [sections] = await connection.execute(`
      SELECT *
      FROM sections
      WHERE act_id = ? AND is_active = TRUE
      ORDER BY 
        CAST(REGEXP_REPLACE(section_number, '[^0-9]', '') AS UNSIGNED),
        section_sub
    `, [act.id]);
    
    return {
      success: true,
      act: {
        id: act.id,
        name: act.act_name,
        short_name: act.short_name,
        code: act.act_code,
        year: act.year,
        status: act.status,
        description: act.description,
        domain: act.domain_name,
        domain_code: act.domain_code,
        total_sections: sections.length
      },
      sections: sections.map(s => formatSectionResult(s, true))
    };
    
  } catch (error) {
    console.error('Get Act Sections Error:', error);
    return { success: false, error: error.message };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Get all acts in a domain
 * @param {number|string} domainIdOrCode - Domain ID or code
 * @returns {Promise<Object>} - Domain with all acts
 */
async function getDomainActs(domainIdOrCode) {
  let connection;
  
  try {
    connection = await getConnection();
    
    const [domains] = await connection.execute(`
      SELECT * FROM law_domains 
      WHERE (id = ? OR domain_code = ?) AND is_active = TRUE
    `, [domainIdOrCode, domainIdOrCode]);
    
    if (domains.length === 0) {
      return { success: false, error: 'Domain not found' };
    }
    
    const domain = domains[0];
    
    const [acts] = await connection.execute(`
      SELECT a.*, COUNT(s.id) as section_count
      FROM acts a
      LEFT JOIN sections s ON a.id = s.act_id AND s.is_active = TRUE
      WHERE a.domain_id = ? AND a.is_active = TRUE
      GROUP BY a.id
      ORDER BY a.year DESC
    `, [domain.id]);
    
    return {
      success: true,
      domain: {
        id: domain.id,
        name: domain.domain_name,
        code: domain.domain_code,
        description: domain.description,
        total_acts: acts.length
      },
      acts: acts.map(a => ({
        id: a.id,
        name: a.act_name,
        short_name: a.short_name,
        code: a.act_code,
        year: a.year,
        status: a.status,
        section_count: a.section_count
      }))
    };
    
  } catch (error) {
    console.error('Get Domain Acts Error:', error);
    return { success: false, error: error.message };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Get all domains
 * @returns {Promise<Object>} - All law domains
 */
async function getAllDomains() {
  let connection;
  
  try {
    connection = await getConnection();
    
    const [domains] = await connection.execute(`
      SELECT 
        d.*,
        COUNT(DISTINCT a.id) as act_count,
        COUNT(s.id) as section_count
      FROM law_domains d
      LEFT JOIN acts a ON d.id = a.domain_id AND a.is_active = TRUE
      LEFT JOIN sections s ON a.id = s.act_id AND s.is_active = TRUE
      WHERE d.is_active = TRUE
      GROUP BY d.id
      ORDER BY d.priority_order, d.domain_name
    `);
    
    return {
      success: true,
      total_domains: domains.length,
      domains: domains.map(d => ({
        id: d.id,
        name: d.domain_name,
        code: d.domain_code,
        description: d.description,
        icon: d.icon,
        act_count: d.act_count,
        section_count: d.section_count
      }))
    };
    
  } catch (error) {
    console.error('Get Domains Error:', error);
    return { success: false, error: error.message, domains: [] };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Get database statistics
 * @returns {Promise<Object>} - Database statistics
 */
async function getDatabaseStats() {
  let connection;
  
  try {
    connection = await getConnection();
    
    const [[stats]] = await connection.execute(`
      SELECT 
        (SELECT COUNT(*) FROM law_domains WHERE is_active = TRUE) as total_domains,
        (SELECT COUNT(*) FROM acts WHERE is_active = TRUE) as total_acts,
        (SELECT COUNT(*) FROM sections WHERE is_active = TRUE) as total_sections,
        (SELECT COUNT(*) FROM sections WHERE punishment_type != 'none' AND is_active = TRUE) as penal_sections,
        (SELECT COUNT(*) FROM query_logs WHERE DATE(created_at) = CURDATE()) as queries_today
    `);
    
    // Get domain-wise breakdown
    const [domainStats] = await connection.execute(`
      SELECT 
        d.domain_name,
        d.domain_code,
        COUNT(DISTINCT a.id) as acts,
        COUNT(s.id) as sections
      FROM law_domains d
      LEFT JOIN acts a ON d.id = a.domain_id AND a.is_active = TRUE
      LEFT JOIN sections s ON a.id = s.act_id AND s.is_active = TRUE
      WHERE d.is_active = TRUE
      GROUP BY d.id
      ORDER BY sections DESC
    `);
    
    return {
      success: true,
      statistics: {
        total_domains: stats.total_domains,
        total_acts: stats.total_acts,
        total_sections: stats.total_sections,
        penal_sections: stats.penal_sections,
        queries_today: stats.queries_today
      },
      domain_breakdown: domainStats
    };
    
  } catch (error) {
    console.error('Get Stats Error:', error);
    return { success: false, error: error.message };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Log a query for analytics
 * @param {Object} logData - Query log data
 * @returns {Promise<boolean>}
 */
async function logQuery(logData) {
  let connection;
  
  try {
    connection = await getConnection();
    
    await connection.execute(`
      INSERT INTO query_logs (
        user_id, api_key, query_text, predicted_domain, predicted_act,
        confidence_score, sections_returned, response_time_ms,
        ip_address, user_agent, is_successful, error_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      logData.userId || null,
      logData.apiKey || null,
      logData.query || '',
      logData.domain || null,
      logData.act || null,
      logData.confidence || 0,
      logData.sectionsReturned || 0,
      logData.responseTimeMs || 0,
      logData.ipAddress || null,
      logData.userAgent || null,
      logData.success ?? true,
      logData.error || null
    ]);
    
    return true;
  } catch (error) {
    console.error('Log Query Error:', error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Prepare search terms for full-text search
 * @param {string} query - Raw query
 * @returns {string} - Prepared search terms
 */
function prepareSearchTerms(query) {
  // Remove special characters that might break SQL
  let terms = query.replace(/['"]/g, '');
  
  // Remove common stop words that don't add search value
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
                     'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
                     'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
                     'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her',
                     'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their',
                     'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
                     'if', 'then', 'else', 'when', 'where', 'why', 'how', 'all', 'any',
                     'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
                     'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just'];
  
  const words = terms.toLowerCase().split(/\s+/);
  const filtered = words.filter(word => !stopWords.includes(word) && word.length > 2);
  
  return filtered.join(' ');
}

/**
 * Format section result for API response
 * @param {Object} row - Database row
 * @param {boolean} includeExplanations - Whether to include full explanations
 * @returns {Object} - Formatted section
 */
function formatSectionResult(row, includeExplanations = false) {
  const result = {
    section_id: row.section_id || row.id,
    section_number: row.section_number,
    section_sub: row.section_sub || null,
    section_title: row.section_title || row.title,
    summary: truncateContent(row.content, 300),
    punishment: row.punishment || null,
    punishment_type: row.punishment_type || 'none',
    offence_type: row.offence_type || 'none',
    act: {
      id: row.act_id,
      name: row.act_name,
      short_name: row.short_name || row.act_short_name,
      year: row.act_year || row.year
    },
    domain: {
      id: row.domain_id,
      name: row.domain_name,
      code: row.domain_code
    }
  };
  
  if (includeExplanations) {
    result.full_content = row.content;
    result.explanation = row.explanation || null;
    result.chapter = row.chapter_title ? {
      number: row.chapter_number,
      title: row.chapter_title
    } : null;
  }
  
  if (row.relevance_score !== undefined) {
    result.relevance_score = parseFloat(row.relevance_score.toFixed(4));
  }
  
  return result;
}

/**
 * Truncate content for summary
 * @param {string} content - Full content
 * @param {number} maxLength - Max length
 * @returns {string} - Truncated content
 */
function truncateContent(content, maxLength = 200) {
  if (!content) return '';
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

/**
 * Close database pool
 */
async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('✅ Database connection pool closed');
  }
}

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
