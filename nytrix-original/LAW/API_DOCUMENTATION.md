# 📚 Nytrix AI - Complete API Documentation

## Base URL
```
http://localhost:5000
```

---

## 🏥 Health Check Endpoint

### Get API Status
```
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": "12:45:30"
}
```

---

## 👨‍⚖️ Lawyer Endpoints

### 1. Get All Lawyers

```
GET /api/lawyers
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Rajesh Kumar",
    "city": "Delhi",
    "specialization": "Criminal Defense",
    "experience": 15,
    "phone": "+91-98765-43210",
    "email": "rajesh.kumar@legalfirm.com",
    "fees": "₹3000-5000",
    "rating": 4.9,
    "about": "Expert in false accusation defense cases and IPC 211 claims. 15+ years experience in criminal law."
  },
  {
    "id": 2,
    "name": "Priya Nair",
    "city": "Bangalore",
    "specialization": "Family Court",
    "experience": 10,
    "phone": "+91-98765-43211",
    "email": "priya.nair@legalfirm.com",
    "fees": "₹2500-4000",
    "rating": 4.8,
    "about": "Specialist in custody disputes and marriage acts."
  }
]
```

**Example Request:**
```bash
curl -X GET "http://localhost:5000/api/lawyers?limit=10"
```

---

### 2. Get Lawyer by ID

```
GET /api/lawyers/:id
```

**Parameters:**
- `id` (required): Lawyer ID

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Rajesh Kumar",
  "city": "Delhi",
  "specialization": "Criminal Defense",
  "experience": 15,
  "phone": "+91-98765-43210",
  "email": "rajesh.kumar@legalfirm.com",
  "fees": "₹3000-5000",
  "rating": 4.9,
  "about": "Expert in false accusation defense cases..."
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Lawyer not found",
  "id": 999
}
```

**Example Request:**
```bash
curl -X GET "http://localhost:5000/api/lawyers/1"
```

---

### 3. Filter Lawyers by City

```
GET /api/lawyers/city/:city
```

**Parameters:**
- `city` (required): City name (case-insensitive)

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Rajesh Kumar",
    "city": "Delhi",
    "specialization": "Criminal Defense",
    "experience": 15,
    "phone": "+91-98765-43210",
    "email": "rajesh.kumar@legalfirm.com",
    "fees": "₹3000-5000",
    "rating": 4.9,
    "about": "Expert in false accusation defense cases..."
  }
]
```

**Example Request:**
```bash
curl -X GET "http://localhost:5000/api/lawyers/city/Delhi"
```

---

### 4. Filter Lawyers by Specialization

```
GET /api/lawyers/specialization/:specialization
```

**Parameters:**
- `specialization` (required): Legal specialization (URL encoded)

**Available Specializations:**
- Criminal Defense
- Cyber Crime
- Family Court
- Defamation
- False Case Defense
- Labor Law
- Property Law
- Consumer Protection

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Rajesh Kumar",
    "city": "Delhi",
    "specialization": "Criminal Defense",
    "experience": 15,
    "phone": "+91-98765-43210",
    "email": "rajesh.kumar@legalfirm.com",
    "fees": "₹3000-5000",
    "rating": 4.9,
    "about": "Expert in false accusation defense cases..."
  },
  {
    "id": 6,
    "name": "Vikram Patel",
    "city": "Delhi",
    "specialization": "Criminal Defense",
    "experience": 12,
    "phone": "+91-98765-43214",
    "email": "vikram.patel@legalfirm.com",
    "fees": "₹2500-4000",
    "rating": 4.8,
    "about": "Specialized in defamation counter-cases..."
  }
]
```

**Example Request (URL Encoded):**
```bash
# Criminal Defense
curl -X GET "http://localhost:5000/api/lawyers/specialization/Criminal%20Defense"

# Cyber Crime
curl -X GET "http://localhost:5000/api/lawyers/specialization/Cyber%20Crime"
```

---

## 🤖 AI Scenario Analysis Endpoint

### Analyze Legal Scenario

```
POST /api/analyze-scenario
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "scenario": "My girlfriend is threatening to file a false rape case against me"
}
```

**Response (200 OK):**
```json
{
  "scenario": "My girlfriend is threatening to file a false rape case against me",
  "riskLevel": "High",
  "relevantSections": [
    "IPC Section 211 - Fabricating false evidence",
    "IPC Section 499 - Defamation",
    "IPC Section 500 - Defamation compensation",
    "IPC Section 506 - Criminal intimidation"
  ],
  "mensRights": [
    "Right to presumption of innocence",
    "Right to legal representation",
    "Right to cross-examine witnesses",
    "Right to fair trial",
    "Right to appeal unfair verdict",
    "Right to bail"
  ],
  "donts": [
    "Do NOT make statements without lawyer",
    "Do NOT meet the accuser alone",
    "Do NOT delete communications",
    "Do NOT threaten or abuse",
    "Do NOT admit to false charges"
  ],
  "actionSteps": [
    "1. Consult criminal defense lawyer immediately",
    "2. Gather all evidence supporting innocence",
    "3. Do NOT respond to accusations alone",
    "4. File counter-case under IPC 211, 499, 500",
    "5. Preserve all communications",
    "6. Prepare for court proceedings"
  ],
  "lawyerRecommendation": "Criminal Defense Lawyer"
}
```

**Risk Levels:**
- `High`: Serious criminal charges (false accusations, domestic violence)
- `Medium`: Significant legal issues (cyber harassment, defamation)
- `Low`: Minor legal concerns (general queries)

---

### Scenario Analysis - Blackmail Case

**Request:**
```bash
curl -X POST "http://localhost:5000/api/analyze-scenario" \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "My ex-girlfriend is blackmailing me for money using private videos"
  }'
```

**Response:**
```json
{
  "scenario": "My ex-girlfriend is blackmailing me for money using private videos",
  "riskLevel": "High",
  "relevantSections": [
    "IPC Section 384 - Extortion",
    "IPC Section 386 - Extortion of amount of money",
    "IT Act Section 66C - Identity theft",
    "IT Act Section 66E - Privacy violations",
    "IPC Section 506 - Criminal intimidation"
  ],
  "mensRights": [
    "Right to privacy",
    "Right to report extortion",
    "Right to file cyber crime case",
    "Right to legal representation"
  ],
  "donts": [
    "Do NOT pay any money",
    "Do NOT engage with blackmailer",
    "Do NOT share more content"
  ],
  "actionSteps": [
    "1. File FIR at nearest police station",
    "2. File cyber crime complaint",
    "3. Collect all evidence",
    "4. Consult cyber crime lawyer"
  ],
  "lawyerRecommendation": "Cyber Crime Specialist"
}
```

---

### Scenario Analysis - Custody Case

**Request:**
```bash
curl -X POST "http://localhost:5000/api/analyze-scenario" \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "My wife left with our child and is claiming I am not fit to be a father"
  }'
```

**Response:**
```json
{
  "scenario": "My wife left with our child and is claiming I am not fit to be a father",
  "riskLevel": "High",
  "relevantSections": [
    "Guardians & Wards Act Section 17 - Custody",
    "Hindu Marriage Act Section 26 - Guardianship",
    "Supreme Court Judgment: Equal custody rights for both parents"
  ],
  "mensRights": [
    "Right to child custody (equal to mother)",
    "Right to visitation",
    "Right to child maintenance",
    "Right to adopt"
  ],
  "actionSteps": [
    "1. File guardianship petition",
    "2. Submit evidence of parenting capability",
    "3. Request court-ordered visitation"
  ],
  "lawyerRecommendation": "Family Court Lawyer"
}
```

---

### Scenario Analysis - Cyber Harassment

**Request:**
```bash
curl -X POST "http://localhost:5000/api/analyze-scenario" \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "Someone is posting defaming content about me on Facebook and harassing me online"
  }'
```

**Response:**
```json
{
  "scenario": "Someone is posting defaming content about me on Facebook and harassing me online",
  "riskLevel": "Medium",
  "relevantSections": [
    "IT Act Section 66A - Sending offensive information",
    "IT Act Section 66E - Privacy violation",
    "IPC Section 499 - Defamation",
    "IPC Section 503 - Criminal intimidation"
  ],
  "mensRights": [
    "Right to privacy",
    "Right to remove defaming content",
    "Right to file cyber crime complaint",
    "Right to defamation suit"
  ],
  "actionSteps": [
    "1. Screenshot all posts",
    "2. Report on social media platform",
    "3. File cyber crime complaint",
    "4. Consult cyber law attorney"
  ],
  "lawyerRecommendation": "Cyber Crime Specialist"
}
```

---

## 🎯 Keyword Matching System

The AI analyzer uses intelligent keyword matching:

### High Risk Keywords:
- `false` + `accusation`/`case`/`charge`
- `rape`
- `blackmail`
- `extortion`
- `custody`
- `defamation`
- `harassment`
- `threats`
- `cyber`

### Medium Risk Keywords:
- `defamation`
- `harassment` (alone)
- `threats` (alone)
- `divorce`
- `separation`

### Low Risk Keywords:
- `question`
- `information`
- `advice`
- `guidance`

---

## 📊 Error Handling

### Invalid Request (400 Bad Request)
```json
{
  "error": "Scenario text is required",
  "statusCode": 400
}
```

### Server Error (500 Internal Server Error)
```json
{
  "error": "Internal server error",
  "statusCode": 500
}
```

### Not Found (404)
```json
{
  "error": "Resource not found",
  "statusCode": 404
}
```

---

## 🔄 CORS Configuration

The API accepts requests from:
- `http://localhost:3000` (Development)
- `http://localhost:5000` (Backend)
- Production domain (after deployment)

---

## ⚡ Rate Limiting (Recommended)

For production deployment, implement rate limiting:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

---

## 📝 Response Time

**Expected Response Times:**
- Lawyer list: < 50ms
- Filter by city: < 50ms
- Filter by specialization: < 50ms
- Scenario analysis: 100-500ms
- Health check: < 20ms

---

## 🧪 Testing API with Postman

### Import Postman Collection:

1. Open Postman
2. Click: Import
3. Paste this JSON:

```json
{
  "info": {
    "name": "Nytrix AI API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Lawyers",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/lawyers"
      }
    },
    {
      "name": "Analyze Scenario",
      "request": {
        "method": "POST",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"scenario\": \"My girlfriend is threatening false rape case\"}"
        },
        "url": "http://localhost:5000/api/analyze-scenario"
      }
    }
  ]
}
```

---

## 🔐 Authentication (Future Implementation)

For production, add JWT authentication:

```javascript
// Middleware
app.use("/api", authenticateToken);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

---

## 📱 Mobile API Usage

### React Hook for API Calls:

```typescript
import { useState, useEffect } from 'react';

export function useLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/lawyers')
      .then(res => res.json())
      .then(data => {
        setLawyers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { lawyers, loading, error };
}

// Usage
const { lawyers, loading } = useLawyers();
```

---

## 🎯 Integration Examples

### Frontend Integration (Axios):

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export async function analyzeLegalScenario(scenario: string) {
  try {
    const response = await axios.post(
      `${API_URL}/analyze-scenario`,
      { scenario },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getAllLawyers() {
  try {
    const response = await axios.get(`${API_URL}/lawyers`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

---

**API Documentation Complete**

For support or questions about specific endpoints, refer to QUICK_START.md or DEMO_SCENARIOS.md.

