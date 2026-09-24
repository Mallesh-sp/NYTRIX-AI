# 🚀 Nytrix AI - Getting Started Locally

## One-Minute Setup

```bash
# Clone project
git clone https://github.com/yourusername/justmenindia.git && cd justmenindia

# Terminal 1: Backend
cd backend && npm install && npm start

# Terminal 2: Frontend (new terminal)
cd frontend && npm install && npm run dev

# Open browser to http://localhost:3000
```

**Done! ✅ Platform running locally.**

---

## What Next?

1. **Try a Scenario**: "My girlfriend is threatening false rape case"
2. **Browse Lawyers**: View 8 verified lawyers across India
3. **Check Evidence**: See step-by-step evidence collection guide
4. **Learn Laws**: Explore 60+ law concepts
5. **View SDG**: Understand UN Sustainable Development Goals alignment

---

## 🎯 Demo Flow (5 Minutes)

1. **Landing** (30s) - Show hero, mission, features
2. **Analyzer** (90s) - Enter scenario, show analysis
3. **Lawyers** (60s) - Show directory, filter by specialization
4. **Evidence** (45s) - Show checklist module
5. **SDG** (45s) - Show UN alignment
6. **Q&A** (Remaining) - Answer questions

---

## 🔗 Important Links

| Link | URL |
|------|-----|
| Local Frontend | http://localhost:3000 |
| Local Backend | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |
| All Lawyers | http://localhost:5000/api/lawyers |

---

## 📞 Need Help?

### Quick Issues

**Port Already in Use?**
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Missing Dependencies?**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### More Help

- See [QUICK_START.md](docs/QUICK_START.md) for detailed setup
- See [DEMO_SCENARIOS.md](docs/DEMO_SCENARIOS.md) for demo scripts
- See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for API details

---

## ✅ Verification

After setup, verify:

- [x] Backend running on port 5000
- [x] Frontend running on port 3000
- [x] No console errors
- [x] API endpoints responding
- [x] Scenario analyzer working
- [x] Lawyer directory loading
- [x] Law concepts displaying

---

**Ready? Start with the command above! 🚀**

