# 🇮🇳 Indian Legal Intelligence API Documentation

## Overview

The **Nytrix AI Legal Intelligence Engine** is a production-grade, AI-powered Indian Legal Database System that:

- Classifies legal queries using AI (Gemini)
- Predicts relevant legal domains and acts
- Retrieves best-matching sections using SQL full-text search
- Returns structured JSON responses

## Base URL

```
http://localhost:5000/api/v1
```

---

## 🔐 Authentication

API requests can include an optional API key in the header:

```
X-API-Key: your_api_key_here
```

In development mode, API key is optional. In production, it's required for protected endpoints.

---

## 📊 Rate Limiting

- **Limit**: 30 requests per minute
- **Headers returned**:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests in window
  - `X-RateLimit-Reset`: Window reset time (ISO 8601)

---

## 🔥 Endpoints

### 1. Analyze Legal Query (Main Endpoint)

**`POST /api/v1/analyze`**

AI-powered analysis of legal queries with classification and section retrieval.

#### Request

```json
{
  "query": "My employer has not paid my salary for 3 months. What legal action can I take?",
  "limit": 5,
  "includeExplanations": true
}
```

#### Response

```json
{
  "success": true,
  "query": "My employer has not paid my salary for 3 months...",
  "classification": {
    "domain": "LABOUR",
    "domain_name": "Labour & Employment Law",
    "predicted_act": "Code on Wages",
    "all_relevant_acts": ["Industrial Disputes Act", "Minimum Wages Act", "Code on Wages", "EPF Act"],
    "confidence_score": 87,
    "keywords_extracted": ["salary", "employer", "wages", "unpaid"],
    "legal_issue_summary": "Unpaid wages dispute with employer",
    "urgency_level": "high",
    "classification_method": "ai_enhanced"
  },
  "entities_found": {
    "sections": [],
    "acts": [],
    "articles": [],
    "amounts": [],
    "dates": []
  },
  "sections": [
    {
      "section_id": 45,
      "section_number": "25F",
      "section_title": "Conditions precedent to retrenchment of workmen",
      "summary": "No workman employed for not less than one year shall be retrenched...",
      "punishment": null,
      "punishment_type": "civil_remedy",
      "offence_type": "civil",
      "act": {
        "id": 18,
        "name": "Industrial Disputes Act",
        "short_name": "ID Act",
        "year": 1947
      },
      "domain": {
        "id": 7,
        "name": "Labour & Employment Law",
        "code": "LABOUR"
      },
      "relevance_score": 12.4567
    }
  ],
  "total_matches": 8,
  "search_scope": "domain",
  "requires_professional_consultation": true,
  "processing_time_ms": 1250,
  "disclaimer": "This analysis is for educational purposes only..."
}
```

---

### 2. Quick Classification

**`POST /api/v1/classify`**

Fast classification without database search.

#### Request

```json
{
  "query": "Someone hacked my Instagram account and is posting offensive content"
}
```

#### Response

```json
{
  "success": true,
  "predicted_domain": "CYBER",
  "predicted_domain_name": "Cyber Law",
  "predicted_act": "Information Technology Act",
  "all_relevant_acts": ["Information Technology Act"],
  "keywords_extracted": ["hacked", "account", "offensive", "cyber crime"],
  "confidence_score": 92,
  "classification_method": "ai_enhanced",
  "processing_time_ms": 450
}
```

---

### 3. Search Legal Database

**`GET /api/v1/search`**

Search with custom parameters.

#### Parameters

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| q         | string | Yes      | Search query (min 3 chars)     |
| domain    | string | No       | Filter by domain code          |
| act       | string | No       | Filter by act code             |
| limit     | number | No       | Results limit (default: 10)    |
| offset    | number | No       | Pagination offset (default: 0) |

#### Example

```
GET /api/v1/search?q=murder%20punishment&domain=CRIMINAL&limit=5
```

---

### 4. Get Section by Number

**`GET /api/v1/section/:sectionNumber`**

#### Parameters

| Parameter     | Type   | Required | Description         |
|---------------|--------|----------|---------------------|
| sectionNumber | string | Yes      | Section number      |
| act           | string | No       | Act code to filter  |

#### Example

```
GET /api/v1/section/302?act=BNS2023
```

---

### 5. Get All Domains

**`GET /api/v1/domains`**

Returns all law domains with act counts.

#### Response

```json
{
  "success": true,
  "total_domains": 11,
  "domains": [
    {
      "id": 1,
      "name": "Criminal Law",
      "code": "CRIMINAL",
      "description": "Laws governing crimes and punishments...",
      "act_count": 3,
      "section_count": 150
    }
  ]
}
```

---

### 6. Get Domain with Acts

**`GET /api/v1/domains/:domainCode`**

#### Example

```
GET /api/v1/domains/CRIMINAL
```

---

### 7. Get Act with Sections

**`GET /api/v1/acts/:actCode`**

#### Example

```
GET /api/v1/acts/BNS2023
```

---

### 8. Database Statistics

**`GET /api/v1/stats`**

#### Response

```json
{
  "success": true,
  "statistics": {
    "total_domains": 11,
    "total_acts": 26,
    "total_sections": 500,
    "penal_sections": 180,
    "queries_today": 45
  },
  "domain_breakdown": [
    { "domain_name": "Criminal Law", "domain_code": "CRIMINAL", "acts": 3, "sections": 150 }
  ]
}
```

---

### 9. Health Check

**`GET /api/v1/health`**

#### Response

```json
{
  "success": true,
  "status": "healthy",
  "service": "Indian Legal Intelligence API",
  "version": "1.0.0",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

## 🗄️ Supported Law Domains

| Code           | Domain Name                  | Sample Acts                                    |
|----------------|------------------------------|------------------------------------------------|
| CRIMINAL       | Criminal Law                 | BNS, BNSS, BSA                                 |
| CYBER          | Cyber Law                    | Information Technology Act                     |
| CONSTITUTIONAL | Constitutional Law           | Constitution of India                          |
| CORPORATE      | Corporate & Commercial Law   | Companies Act, IBC, Competition Act, LLP Act   |
| FAMILY         | Family Law                   | Hindu Marriage Act, Hindu Succession Act       |
| PROPERTY       | Property Law                 | Transfer of Property Act, RERA                 |
| LABOUR         | Labour & Employment Law      | Industrial Disputes Act, EPF Act, Code on Wages|
| TAXATION       | Taxation Law                 | Income-tax Act, CGST Act                       |
| ENVIRONMENTAL  | Environmental Law            | Environment Protection Act, Water Act          |
| CONSUMER       | Consumer Protection          | Consumer Protection Act 2019                   |
| BANKING        | Banking & Finance Law        | RBI Act, SARFAESI Act                          |

---

## 📝 Example Queries

### Criminal Query
```json
{
  "query": "What is the punishment for murder under new criminal laws in India?"
}
```

### Cyber Crime Query
```json
{
  "query": "Someone is sending me threatening messages on WhatsApp and has hacked my email"
}
```

### Property Query
```json
{
  "query": "My builder has delayed flat possession by 2 years. What are my rights under RERA?"
}
```

### Consumer Query
```json
{
  "query": "I bought a defective mobile phone and the seller is refusing to refund"
}
```

### Labour Query
```json
{
  "query": "My company terminated me without notice period and did not pay my dues"
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    { "field": "query", "message": "query must be at least 10 characters" }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "API key required"
}
```

### 429 Rate Limited
```json
{
  "success": false,
  "error": "Too many requests",
  "retry_after_seconds": 45
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "request_id": "req_1708000000_abc123"
}
```

---

## 🔧 Database Setup

### 1. Create Database
```sql
CREATE DATABASE indian_legal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Run Schema
```bash
mysql -u root -p indian_legal_db < database/schema.sql
```

### 3. Seed Data
```bash
mysql -u root -p indian_legal_db < database/seed-data.sql
```

---

## 🛡️ Security Features

- **Input Validation**: All inputs sanitized
- **Rate Limiting**: 30 requests/minute per IP/API key
- **Prepared Statements**: SQL injection protection
- **Role-Based Access**: Admin, Editor, User roles
- **Request Logging**: All queries logged for audit
- **Security Headers**: XSS, CSRF, and other protections

---

## 📄 Legal Disclaimer

This API provides **legal information for educational purposes only**. It is **NOT a substitute for professional legal advice**. Always consult a qualified, registered advocate for specific legal matters.

---

## 🚀 Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure MySQL with proper credentials
- [ ] Set up Redis for rate limiting (recommended)
- [ ] Enable HTTPS
- [ ] Set `ALLOWED_ORIGINS` to production domains
- [ ] Configure API key validation in database
- [ ] Set up monitoring and alerting
- [ ] Enable database backups
