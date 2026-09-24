# 🎯 Nytrix AI - Complete Project Structure & Deployment Guide

## 📁 Project Directory Structure

```
JustMenIndia/
├── frontend/                          # React Vite Application
│   ├── src/
│   │   ├── components/               # Reusable React Components
│   │   │   ├── LawConceptCard.tsx   # Law concept display with formatting
│   │   │   ├── RiskBadge.tsx        # Risk level indicator
│   │   │   ├── AnalysisReport.tsx   # Scenario analysis results
│   │   │   ├── LawyerCard.tsx       # Individual lawyer profile
│   │   │   └── Header.tsx           # Navigation header
│   │   ├── pages/                    # Page components
│   │   │   ├── LandingPage.tsx      # Hero, features, CTA
│   │   │   ├── AnalyzerPage.tsx     # Scenario analyzer interface
│   │   │   ├── RightsPage.tsx       # Law concepts library
│   │   │   ├── LawyerPage.tsx       # Lawyer directory
│   │   │   ├── SDGPage.tsx          # UN SDG alignment
│   │   │   ├── ChecklistPage.tsx    # Evidence checklist
│   │   │   └── GuidePages/          # Step-by-step guides
│   │   ├── services/                # Business logic
│   │   │   ├── geminiService.ts     # AI service integration
│   │   │   └── lawConceptsService.ts# Law concepts database (60+)
│   │   ├── App.tsx                  # Main app routing
│   │   ├── index.tsx                # React entry point
│   │   └── types.ts                 # TypeScript interfaces
│   ├── index.html                   # HTML entry
│   ├── vite.config.ts               # Vite build config
│   ├── tsconfig.json                # TypeScript config
│   ├── package.json                 # Dependencies
│   └── tailwind.config.js           # Tailwind CSS config
│
├── backend/                          # Node.js Express API
│   ├── server.js                    # Main Express server
│   ├── lawyers.json                 # Mock lawyer database (8 lawyers)
│   ├── package.json                 # Node dependencies
│   └── routes/                      # API route handlers
│       ├── lawyers.js               # /api/lawyers endpoints
│       ├── analysis.js              # /api/analyze-scenario endpoint
│       └── health.js                # /api/health endpoint
│
├── ai-service/                       # Python FastAPI Service (Optional)
│   ├── main.py                      # FastAPI server
│   ├── models.py                    # Pydantic schemas
│   ├── services.py                  # AI analysis logic
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # API keys (OpenAI/Gemini)
│
├── docs/                             # Documentation
│   ├── README.md                    # Complete project overview (400+ lines)
│   ├── QUICK_START.md               # Installation guide (this file)
│   ├── DEMO_SCENARIOS.md            # Demo walkthroughs
│   ├── API_DOCUMENTATION.md         # API endpoint specs
│   ├── ARCHITECTURE.md              # System design
│   └── DEPLOYMENT.md                # Production setup
│
└── .gitignore                        # Git ignore rules
```

## 🚀 One-Command Installation

### For MacOS/Linux Users:
```bash
# Clone and setup everything
cd ~/Desktop
mkdir JustMenIndia
cd JustMenIndia

# Backend
git clone <repo> backend && cd backend && npm install && npm start &

# Frontend (in new terminal)
git clone <repo> frontend && cd frontend && npm install && npm run dev
```

### For Windows Users:
```bash
# Open Command Prompt or PowerShell

# Backend
cd C:\Users\<YourUsername>\Desktop
mkdir JustMenIndia
cd JustMenIndia
git clone <repo> backend
cd backend
npm install
npm start

# Frontend (in new Command Prompt/PowerShell window)
cd C:\Users\<YourUsername>\Desktop\JustMenIndia
git clone <repo> frontend
cd frontend
npm install
npm run dev
```

## 🔧 Technology Stack

### Frontend
```json
{
  "name": "frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.9",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.2"
  }
}
```

### Backend
```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

### AI Service (Optional)
```
fastapi==0.100.0
pydantic==2.0.0
python-dotenv==1.0.0
openai==0.27.0
uvicorn==0.23.0
```

## 📊 API Specification

### Endpoint 1: Get All Lawyers
```
Method: GET
URL: http://localhost:5000/api/lawyers
Response: 
[
  {
    id: 1,
    name: "Rajesh Kumar",
    city: "Delhi",
    specialization: "Criminal Defense",
    experience: 15,
    phone: "+91-98765-43210",
    email: "rajesh@legalfirm.com",
    fees: "₹3000-5000",
    rating: 4.9,
    about: "Expert in false accusation cases..."
  }
]
```

### Endpoint 2: Filter Lawyers by Specialization
```
Method: GET
URL: http://localhost:5000/api/lawyers/specialization/Criminal%20Defense
Response: [Lawyers with Criminal Defense specialization]
```

### Endpoint 3: Analyze Scenario
```
Method: POST
URL: http://localhost:5000/api/analyze-scenario
Content-Type: application/json

Request Body:
{
  "scenario": "My girlfriend is threatening a false rape case"
}

Response:
{
  "riskLevel": "High",
  "relevantSections": [
    "IPC Section 211",
    "IPC Section 499-500"
  ],
  "mensRights": [...],
  "donts": [...],
  "actionSteps": [...],
  "lawyerRecommendation": "Criminal Defense"
}
```

## 🎯 Key Features Implemented

### ✅ AI Legal Scenario Analyzer
- Real-time scenario analysis
- Keyword-based intelligent matching
- Risk assessment (High/Medium/Low)
- Relevant IPC sections identification
- Immediate action steps

### ✅ Men's Rights Knowledge Cards
- 60+ law concepts explained
- Searchable database
- Filterby category
- Detailed explanations
- Real-world examples

### ✅ Lawyer Directory
- 8 verified lawyers
- Multiple specializations
- City-based filtering
- Contact integration
- Ratings and reviews

### ✅ Evidence Checklist Module
- Step-by-step collection guide
- Documentation templates
- Digital evidence tips
- Verification checklist
- Printable format

### ✅ Step-by-Step Action Guide
- Timeline expectations
- Cost estimates
- Escalation criteria
- Court process explanation
- What to expect

### ✅ SDG Mapping Page
- UN Sustainable Development Goals alignment
- Social impact metrics
- Gender equality message
- Legal justice framework
- Inclusive society focus

## 🌐 Deployment Options

### Option 1: Free Deployment (Recommended for Hackathon)

**Backend - Deploy to Render:**
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to render.com
# 3. New > Web Service
# 4. Connect GitHub repo
# 5. Build command: npm install
# 6. Start command: node server.js
# 7. Environment: NODE_ENV=production
# 8. Auto-deploy enabled
```

**Frontend - Deploy to Vercel:**
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import > GitHub project
# 4. Framework: Vite
# 5. Build command: npm run build
# 6. Output directory: dist
# 7. Set VITE_API_URL to Render backend URL
# 8. Deploy
```

### Option 2: Budget Deployment (₹100-500/month)

- **Backend**: AWS EC2 Micro (Free tier) or Linode (₹200/month)
- **Frontend**: Netlify Free or AWS S3 + CloudFront (₹50/month)
- **Database**: MongoDB Atlas (Free tier) or AWS RDS (₹100/month)
- **Domain**: Hostinger (₹99/year)

### Option 3: Production Deployment (₹2000+/month)

- **Backend**: AWS EC2 Standard (₹1000/month)
- **Frontend**: AWS CloudFront (₹500/month)
- **Database**: AWS RDS PostgreSQL (₹500/month)
- **Domain**: Premium domain (₹1000+/year)
- **SSL/CDN**: Included

## 🔐 Security Checklist

- [ ] Enable HTTPS on all endpoints
- [ ] Add rate limiting to API
- [ ] Implement authentication (if needed)
- [ ] Validate all user inputs
- [ ] Sanitize data before display
- [ ] Add CORS policies
- [ ] Implement logging and monitoring
- [ ] Regular security audits
- [ ] Add legal disclaimers
- [ ] Privacy policy implementation

## 📈 Performance Optimization

### Frontend
```bash
# Build optimization
npm run build  # Creates optimized dist/

# Lighthouse score targets:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

### Backend
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

## 🧪 Testing Guide

### Frontend Testing
```bash
npm install --save-dev vitest @testing-library/react
npm test
```

### Backend Testing
```bash
npm install --save-dev jest supertest
npm test
```

### API Testing
```bash
# Using curl
curl -X GET http://localhost:5000/api/lawyers

# Using Postman
# Import: http://localhost:5000
```

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Tailwind CSS breakpoints
- Touch-friendly buttons
- Optimized images
- Mobile navigation menu

Test with:
```bash
# Chrome DevTools
F12 > Toggle Device Toolbar

# or visit from phone on same network
http://<your-computer-ip>:3000
```

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Check port
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows

# Restart
npm start
```

### CORS Errors
```bash
# Ensure backend CORS is enabled
# In server.js:
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- **Backend Issues**: Check console for errors
- **Frontend Issues**: Open DevTools (F12)
- **API Issues**: Test with curl or Postman
- **Deployment Issues**: Check service provider docs

---

**Ready to deploy? Follow QUICK_START.md first, then choose your deployment option above.**

