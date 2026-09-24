-- ============================================================
-- INDIAN LEGAL INTELLIGENCE DATABASE SYSTEM
-- Production-Grade SQL Schema (MySQL/MariaDB Compatible)
-- Version: 1.0.0
-- ============================================================

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS query_logs;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS section_amendments;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS acts;
DROP TABLE IF EXISTS law_domains;

-- ============================================================
-- TABLE: law_domains
-- Stores all major categories of Indian law
-- ============================================================
CREATE TABLE law_domains (
    id INT PRIMARY KEY AUTO_INCREMENT,
    domain_name VARCHAR(100) NOT NULL UNIQUE,
    domain_code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    priority_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_domain_code (domain_code),
    INDEX idx_domain_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: acts
-- Stores all Acts under each law domain
-- ============================================================
CREATE TABLE acts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    domain_id INT NOT NULL,
    act_name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    act_code VARCHAR(50) UNIQUE,
    year INT,
    enactment_date DATE,
    commencement_date DATE,
    status ENUM('active', 'amended', 'repealed', 'partially_repealed') DEFAULT 'active',
    replaces_act_id INT NULL,
    description TEXT,
    preamble TEXT,
    total_sections INT DEFAULT 0,
    total_chapters INT DEFAULT 0,
    ministry VARCHAR(150),
    gazette_reference VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (domain_id) REFERENCES law_domains(id) ON DELETE RESTRICT,
    FOREIGN KEY (replaces_act_id) REFERENCES acts(id) ON DELETE SET NULL,
    
    INDEX idx_act_domain (domain_id),
    INDEX idx_act_name (act_name),
    INDEX idx_act_code (act_code),
    INDEX idx_act_year (year),
    INDEX idx_act_status (status),
    FULLTEXT INDEX ft_act_name (act_name, short_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: sections
-- Stores individual sections of each Act
-- ============================================================
CREATE TABLE sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    act_id INT NOT NULL,
    chapter_number VARCHAR(20),
    chapter_title VARCHAR(255),
    section_number VARCHAR(20) NOT NULL,
    section_sub VARCHAR(20),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    explanation TEXT,
    illustration TEXT,
    punishment TEXT,
    punishment_type ENUM('fine', 'imprisonment', 'both', 'compoundable', 'non_compoundable', 'civil_remedy', 'none') DEFAULT 'none',
    min_punishment VARCHAR(100),
    max_punishment VARCHAR(100),
    fine_amount VARCHAR(100),
    offence_type ENUM('cognizable', 'non_cognizable', 'bailable', 'non_bailable', 'compoundable', 'civil', 'regulatory', 'none') DEFAULT 'none',
    keywords TEXT,
    tags JSON,
    related_sections JSON,
    case_citations JSON,
    is_amended BOOLEAN DEFAULT FALSE,
    amendment_date DATE,
    previous_content TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (act_id) REFERENCES acts(id) ON DELETE CASCADE,
    
    INDEX idx_section_act (act_id),
    INDEX idx_section_number (section_number),
    INDEX idx_section_offence (offence_type),
    INDEX idx_section_punishment (punishment_type),
    FULLTEXT INDEX ft_section_content (content, keywords, title),
    FULLTEXT INDEX ft_section_keywords (keywords),
    FULLTEXT INDEX ft_section_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: section_amendments
-- Tracks amendment history for sections
-- ============================================================
CREATE TABLE section_amendments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    amendment_act VARCHAR(255),
    amendment_date DATE,
    amendment_type ENUM('substituted', 'inserted', 'omitted', 'renumbered') NOT NULL,
    previous_content TEXT,
    new_content TEXT,
    gazette_reference VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
    INDEX idx_amendment_section (section_id),
    INDEX idx_amendment_date (amendment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: users (for role-based access)
-- ============================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role ENUM('admin', 'editor', 'moderator', 'user', 'api_user') DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    api_key VARCHAR(64) UNIQUE,
    api_key_expires_at TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_api_key (api_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: query_logs (for analytics and rate limiting)
-- ============================================================
CREATE TABLE query_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    api_key VARCHAR(64),
    query_text TEXT NOT NULL,
    predicted_domain VARCHAR(100),
    predicted_act VARCHAR(255),
    confidence_score DECIMAL(5,2),
    sections_returned INT DEFAULT 0,
    response_time_ms INT,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    is_successful BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_log_user (user_id),
    INDEX idx_log_api_key (api_key),
    INDEX idx_log_created (created_at),
    INDEX idx_log_domain (predicted_domain)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================

-- View: Full section details with act and domain info
CREATE OR REPLACE VIEW v_section_details AS
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
    a.id AS act_id,
    a.act_name,
    a.short_name AS act_short_name,
    a.year AS act_year,
    a.status AS act_status,
    d.id AS domain_id,
    d.domain_name,
    d.domain_code
FROM sections s
JOIN acts a ON s.act_id = a.id
JOIN law_domains d ON a.domain_id = d.id
WHERE s.is_active = TRUE AND a.is_active = TRUE AND d.is_active = TRUE;

-- View: Act summary with section counts
CREATE OR REPLACE VIEW v_act_summary AS
SELECT 
    a.id,
    a.act_name,
    a.short_name,
    a.year,
    a.status,
    d.domain_name,
    d.domain_code,
    COUNT(s.id) AS total_sections,
    SUM(CASE WHEN s.punishment_type != 'none' THEN 1 ELSE 0 END) AS penal_sections
FROM acts a
JOIN law_domains d ON a.domain_id = d.id
LEFT JOIN sections s ON a.id = s.act_id AND s.is_active = TRUE
WHERE a.is_active = TRUE
GROUP BY a.id, a.act_name, a.short_name, a.year, a.status, d.domain_name, d.domain_code;

-- ============================================================
-- STORED PROCEDURES
-- ============================================================

DELIMITER //

-- Procedure: Search sections with full-text matching
CREATE PROCEDURE sp_search_sections(
    IN p_search_query VARCHAR(500),
    IN p_domain_id INT,
    IN p_act_id INT,
    IN p_limit INT
)
BEGIN
    SET p_limit = IFNULL(p_limit, 10);
    
    SELECT 
        s.id,
        s.section_number,
        s.title,
        s.content,
        s.punishment,
        s.punishment_type,
        s.offence_type,
        a.act_name,
        a.short_name,
        a.year,
        d.domain_name,
        d.domain_code,
        MATCH(s.content, s.keywords, s.title) AGAINST(p_search_query IN NATURAL LANGUAGE MODE) AS relevance_score
    FROM sections s
    JOIN acts a ON s.act_id = a.id
    JOIN law_domains d ON a.domain_id = d.id
    WHERE s.is_active = TRUE 
        AND a.is_active = TRUE
        AND (p_domain_id IS NULL OR d.id = p_domain_id)
        AND (p_act_id IS NULL OR a.id = p_act_id)
        AND MATCH(s.content, s.keywords, s.title) AGAINST(p_search_query IN NATURAL LANGUAGE MODE)
    ORDER BY relevance_score DESC
    LIMIT p_limit;
END //

-- Procedure: Get act with all sections
CREATE PROCEDURE sp_get_act_sections(IN p_act_id INT)
BEGIN
    SELECT 
        s.id,
        s.chapter_number,
        s.chapter_title,
        s.section_number,
        s.section_sub,
        s.title,
        s.content,
        s.explanation,
        s.illustration,
        s.punishment,
        s.offence_type,
        s.keywords
    FROM sections s
    WHERE s.act_id = p_act_id AND s.is_active = TRUE
    ORDER BY 
        CAST(REGEXP_REPLACE(s.section_number, '[^0-9]', '') AS UNSIGNED),
        s.section_sub;
END //

-- Procedure: Log query for analytics
CREATE PROCEDURE sp_log_query(
    IN p_user_id INT,
    IN p_api_key VARCHAR(64),
    IN p_query_text TEXT,
    IN p_predicted_domain VARCHAR(100),
    IN p_predicted_act VARCHAR(255),
    IN p_confidence_score DECIMAL(5,2),
    IN p_sections_returned INT,
    IN p_response_time_ms INT,
    IN p_ip_address VARCHAR(45),
    IN p_user_agent VARCHAR(500),
    IN p_is_successful BOOLEAN,
    IN p_error_message TEXT
)
BEGIN
    INSERT INTO query_logs (
        user_id, api_key, query_text, predicted_domain, predicted_act,
        confidence_score, sections_returned, response_time_ms,
        ip_address, user_agent, is_successful, error_message
    ) VALUES (
        p_user_id, p_api_key, p_query_text, p_predicted_domain, p_predicted_act,
        p_confidence_score, p_sections_returned, p_response_time_ms,
        p_ip_address, p_user_agent, p_is_successful, p_error_message
    );
END //

DELIMITER ;

-- ============================================================
-- TRIGGERS
-- ============================================================

DELIMITER //

-- Trigger: Update act section count on insert
CREATE TRIGGER tr_section_insert_count
AFTER INSERT ON sections
FOR EACH ROW
BEGIN
    UPDATE acts SET total_sections = (
        SELECT COUNT(*) FROM sections WHERE act_id = NEW.act_id AND is_active = TRUE
    ) WHERE id = NEW.act_id;
END //

-- Trigger: Update act section count on delete/update
CREATE TRIGGER tr_section_update_count
AFTER UPDATE ON sections
FOR EACH ROW
BEGIN
    IF OLD.is_active != NEW.is_active THEN
        UPDATE acts SET total_sections = (
            SELECT COUNT(*) FROM sections WHERE act_id = NEW.act_id AND is_active = TRUE
        ) WHERE id = NEW.act_id;
    END IF;
END //

DELIMITER ;

-- ============================================================
-- INDEXES FOR PERFORMANCE (Additional)
-- ============================================================

-- Composite indexes for common query patterns
CREATE INDEX idx_section_act_active ON sections(act_id, is_active);
CREATE INDEX idx_act_domain_active ON acts(domain_id, is_active);
CREATE INDEX idx_log_date_domain ON query_logs(created_at, predicted_domain);
