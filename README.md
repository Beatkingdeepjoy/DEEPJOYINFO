# Deepjoy Bhowmik 3D Portfolio & YouTube Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> *"Coding is my hobby, vlogging is my passion."*  
> *"I build the web by night and film the journey by day."*

The complete, production-ready personal brand platform and 3D universe for **Deepjoy Bhowmik** — Full-Stack Developer, B.Tech student vlogger at ICFAI University Tripura, and Google Student Ambassador (Gemini AI).

---

## 🌟 Key Features

### 🌌 1. "Northeast Night Coder" 3D Universe
- **Three.js & React Three Fiber Cosmos**: Floating code glyph planets, an orbiting ring of tech logos, and drifting Tripura night fireflies.
- **Adaptive Fallback**: Low-tier Android devices and `prefers-reduced-motion` users automatically receive a smooth, lightweight 2D canvas fallback ensuring 60 FPS.
- **3D "DB" Particle Preloader**: Assembles monogram coordinates with an interactive 0-100 ease counter (<2.5s, skippable).

### 💻 2. Interactive 3D Laptop & Evolution Slider
- **3D Laptop Showcase**: Interactive screen previewing **SHUDH DESI** (with 80% Launching Soon progress ring), **AroWeather**, and **Code Charcha**.
- **Before/After Evolution Slider**: Drag to compare the initial static Portfolio v1 against this 3D Next.js platform.

### 🎥 3. YouTube Brand & Analytics Hub
- **Channel Sync**: Integrated with YouTube Data API v3 (`@deepjoybhowmikofficial`, ID: `UCztCtzW52UO_iOONZZzQnQw`).
- **Lite Embed Cinema**: Click-to-play architecture that activates video iframes only when played, preserving network speed.
- **Tripura Rhythm**: "Day in My Life" timeline from morning tea to 2 AM coding.

### 🤖 4. Grounded "Ask Deepjoy AI"
- Floating AI assistant with strict RAG guardrails.
- Trained exclusively on Deepjoy's verified academic, project, and YouTube records. Refuses to hallucinate external facts or sensitive personal information.

### 🕹️ 5. Easter Eggs & Micro-Interactions
- **Cmd/Ctrl+K Command Palette**: Jump to sections, toggle dark/light theme, toggle audio, open social links.
- **Web Audio Sound Effects**: Custom synthesized audio clicks, pops, and chimes with instant mute toggle.
- **Terminal Mode**: Press backtick (\`) or type `whoami`, `projects`, `youtube`, `hire` into the retro CLI.
- **Konami Code**: Enter `↑ ↑ ↓ ↓ ← → ← → B A` for a confetti celebration.

### 🔒 6. Protected Admin Console & Privacy Guardrails
- Secret passcode protected portal (`/admin`).
- **Phone Number Privacy Toggle**: Deepjoy's phone number is withheld from public display by default and only shown on CV when enabled in settings.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.x (Tested on Node.js 22.20)
- npm >= 10.x
- Python 3.11+ (Optional, for standalone AI FastAPI service)

### 1. Clone & Install
```bash
git clone https://github.com/Beatkingdeepjoy/portfolio.2.0.git
cd "MY PORTFOLIO"

# Install all workspace dependencies
npm install --legacy-peer-deps
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🐳 Docker Deployment

Run the complete multi-service stack with a single command:
```bash
docker-compose -f infra/docker-compose.yml up --build -d
```

---

## 📊 Verified Truth & Fallbacks (Zero-Hallucination Policy)

| Data Point | Value / Channel | Source |
|---|---|---|
| **Name & Identity** | Deepjoy Bhowmik, Agartala, Tripura | Real Truth |
| **Education** | B.Tech CSE, ICFAI University Tripura | Real Truth |
| **Roles** | Full-Stack Dev, Tech YouTuber, Google Student Ambassador | Real Truth |
| **YouTube Channel** | `@deepjoybhowmikofficial` (UCztCtzW52UO_iOONZZzQnQw) | Live API / Verified Fallback |
| **GitHub** | `Beatkingdeepjoy` (43 public repos) | Live API / Verified Fallback |
| **LeetCode** | `beatking_deepjoy` | Real Profile |
| **Phone Number** | Withheld by default | Admin Setting Restricted |

---

## 📜 License
MIT License © 2026 Deepjoy Bhowmik. Built with pride in Agartala, Tripura, India.
