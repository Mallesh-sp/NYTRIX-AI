/**
 * ============================================================
 * INDIAN LEGAL INTELLIGENCE - SECURITY MIDDLEWARE
 * Production-grade security for legal API
 * ============================================================
 */

const crypto = require('crypto');

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute

/**
 * Input validation middleware
 * Sanitizes and validates incoming requests
 */
function validateInput(req, res, next) {
  // Sanitize query parameters
  if (req.query) {
    for (const key of Object.keys(req.query)) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeString(req.query[key]);
      }
    }
  }
  
  // Sanitize body parameters
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  next();
}

/**
 * Rate limiting middleware
 * Prevents abuse by limiting requests per IP/API key
 */
function rateLimiter(req, res, next) {
  const identifier = req.headers['x-api-key'] || req.ip || 'anonymous';
  const now = Date.now();
  
  // Clean up old entries
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
  
  // Check rate limit
  let limitData = rateLimitStore.get(identifier);
  
  if (!limitData) {
    limitData = { windowStart: now, count: 0 };
    rateLimitStore.set(identifier, limitData);
  }
  
  // Reset window if expired
  if (now - limitData.windowStart > RATE_LIMIT_WINDOW_MS) {
    limitData.windowStart = now;
    limitData.count = 0;
  }
  
  limitData.count++;
  
  // Set rate limit headers
  res.set({
    'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS,
    'X-RateLimit-Remaining': Math.max(0, RATE_LIMIT_MAX_REQUESTS - limitData.count),
    'X-RateLimit-Reset': new Date(limitData.windowStart + RATE_LIMIT_WINDOW_MS).toISOString()
  });
  
  if (limitData.count > RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retry_after_seconds: Math.ceil((limitData.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000)
    });
  }
  
  next();
}

/**
 * API Key validation middleware
 * Validates API key for protected endpoints
 */
function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  // For development, allow requests without API key
  if (process.env.NODE_ENV === 'development' && !apiKey) {
    req.user = { role: 'user', id: null };
    return next();
  }
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'API key required. Include X-API-Key header.'
    });
  }
  
  // Validate API key format
  if (!/^[a-zA-Z0-9_-]{20,64}$/.test(apiKey)) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key format'
    });
  }
  
  // In production, validate against database
  // For now, set user context and proceed
  req.user = { role: 'api_user', apiKey };
  next();
}

/**
 * Role-based access control middleware
 * @param {string[]} allowedRoles - Roles allowed to access endpoint
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `This action requires one of these roles: ${allowedRoles.join(', ')}`
      });
    }
    
    next();
  };
}

/**
 * Request logging middleware
 * Logs all API requests for audit purposes
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  
  // Log request
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    apiKey: req.headers['x-api-key'] ? '***' + req.headers['x-api-key'].slice(-4) : null
  };
  
  // Log response when finished
  res.on('finish', () => {
    logEntry.statusCode = res.statusCode;
    logEntry.responseTimeMs = Date.now() - startTime;
    
    // Only log in production or if DEBUG is enabled
    if (process.env.LOG_REQUESTS === 'true' || process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(logEntry));
    }
  });
  
  next();
}

/**
 * Error handling middleware
 * Catches and formats all errors consistently
 */
function errorHandler(err, req, res, next) {
  console.error('API Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });
  
  // Handle known error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
      details: err.details || null
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: err.message
    });
  }
  
  // Generic error response
  res.status(err.status || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
    request_id: generateRequestId()
  });
}

/**
 * CORS configuration for production
 */
function corsConfig() {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5000'];
  
  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID'],
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
    credentials: true,
    maxAge: 86400 // 24 hours
  };
}

/**
 * Security headers middleware
 * Sets various security headers
 */
function securityHeaders(req, res, next) {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'",
    'X-Request-ID': req.headers['x-request-id'] || generateRequestId()
  });
  next();
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Sanitize string input
 * @param {string} str - Input string
 * @returns {string} - Sanitized string
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 5000); // Limit length
}

/**
 * Recursively sanitize object
 * @param {Object} obj - Input object
 * @returns {Object} - Sanitized object
 */
function sanitizeObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? sanitizeString(obj) : obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = sanitizeString(key);
    sanitized[sanitizedKey] = sanitizeObject(value);
  }
  return sanitized;
}

/**
 * Generate unique request ID
 * @returns {string} - Request ID
 */
function generateRequestId() {
  return `req_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

/**
 * Validate query object
 * @param {Object} query - Query to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} - Validation result
 */
function validateQuery(query, schema) {
  const errors = [];
  const validated = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = query[field];
    
    // Check required
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push({ field, message: `${field} is required` });
      continue;
    }
    
    if (value === undefined || value === null) continue;
    
    // Check type
    if (rules.type === 'string' && typeof value !== 'string') {
      errors.push({ field, message: `${field} must be a string` });
      continue;
    }
    
    if (rules.type === 'number') {
      const num = parseInt(value, 10);
      if (isNaN(num)) {
        errors.push({ field, message: `${field} must be a number` });
        continue;
      }
      validated[field] = num;
      continue;
    }
    
    // Check minLength
    if (rules.minLength && value.length < rules.minLength) {
      errors.push({ field, message: `${field} must be at least ${rules.minLength} characters` });
      continue;
    }
    
    // Check maxLength
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push({ field, message: `${field} must not exceed ${rules.maxLength} characters` });
      continue;
    }
    
    validated[field] = value;
  }
  
  return {
    valid: errors.length === 0,
    errors,
    data: validated
  };
}

module.exports = {
  validateInput,
  rateLimiter,
  validateApiKey,
  requireRole,
  requestLogger,
  errorHandler,
  corsConfig,
  securityHeaders,
  sanitizeString,
  sanitizeObject,
  validateQuery,
  generateRequestId
};
