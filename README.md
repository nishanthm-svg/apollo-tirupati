# Apollo Diagnostics Tirupati

A full-stack diagnostic centre website for Apollo Diagnostics Tirupati — serving Tirupati, Tiruchanoor, Renigunta & Chandragiri.

🌐 **Live:** https://YOUR_GITHUB_USERNAME.github.io/apollo-tirupati/  
📞 **Helpline:** +91 72070 74078  
💬 **WhatsApp:** https://wa.me/917207074078

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Express + Node.js |
| Database | In-Memory Store |
| Deploy | GitHub Pages (frontend) |

## Features

- 70+ tests with real Apollo pricing
- Book via WhatsApp (active on every test card)
- 4 Tirupati-region centres
- Health packages (Aarogyam, Diabetes, Cardiac, Women's, Senior)
- Admin portal (`/admin`) — login: `admin` / `apollo@123`
- Full SEO with JSON-LD schema for local search
- NABL / ISO 9001:2015 certified messaging

## Local Development

```bash
# Backend (port 4000)
cd backend
npm install
node server.js

# Frontend (port 5200)
cd frontend
npm install
npm run dev
```

Open http://localhost:5200

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Update `VITE_BASE_URL` in `.github/workflows/deploy.yml` to `/your-repo-name/`
4. Push to `main` — GitHub Actions will auto-build and deploy

## Admin Portal

URL: `https://YOUR_GITHUB_USERNAME.github.io/apollo-tirupati/admin`  
Login: `admin` / `apollo@123`

Manage: Tests · Packages · Offers · Centres · Bookings · Analytics
