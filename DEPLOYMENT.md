# Production Deployment Guide: Vercel & Render

**Target Repository**: `https://github.com/Beatkingdeepjoy/DEEPJOYINFO.git`  
**Platforms**: **Vercel** (Frontend Next.js 15) & **Render** (FastAPI AI Service / Full-Stack)

---

## 🚀 Part 1: Deploying to Vercel (Recommended for Next.js 15)

Vercel provides edge caching, automatic image optimization, and global CDN delivery for your 3D platform.

### Step 1: Import Project on Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new) and log in with your GitHub account (`Beatkingdeepjoy`).
2. Find and select the repository **`DEEPJOYINFO`**, then click **Import**.

### Step 2: Configure Project Settings
- **Framework Preset**: `Next.js`
- **Root Directory**: Leave as `./` (or select `apps/web` if you prefer single-app scope).
- The included `vercel.json` automatically configures:
  - **Build Command**: `npm run --workspace=apps/web build`
  - **Output Directory**: `apps/web/.next`
  - **Install Command**: `npm install --legacy-peer-deps`

### Step 3: Add Environment Variables on Vercel
Add the following keys under **Settings > Environment Variables**:
| Variable Name | Example Value | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `https://your-vercel-domain.vercel.app` | Production URL |
| `NEXT_PUBLIC_AI_URL` | `https://deepjoy-ai-service.onrender.com` | URL of your Render AI service |
| `YOUTUBE_CHANNEL_ID` | `UCztCtzW52UO_iOONZZzQnQw` | Your verified YouTube Channel ID |
| `YOUTUBE_API_KEY` | `[Optional Google API Key]` | Live YouTube sync (fallback active if blank) |
| `NEXTAUTH_SECRET` | `[Generate 32-char random string]` | Admin authentication secret |

### Step 4: Deploy
Click **Deploy**. Vercel will build the 19 static and dynamic routes in ~60 seconds.

---

## 🐍 Part 2: Deploying to Render (For FastAPI AI Service & Web)

The repository includes a ready-to-use **`render.yaml`** (Infrastructure as Code Blueprint).

### Option A: 1-Click Render Blueprint (Recommended)
1. Go to [https://dashboard.render.com/blueprints](https://dashboard.render.com/blueprints) and sign in.
2. Click **New Blueprint Instance**.
3. Connect your GitHub repository: `Beatkingdeepjoy/DEEPJOYINFO`.
4. Render will read `render.yaml` and automatically configure:
   - **`deepjoy-ai-service`**: Python FastAPI Web Service on `apps/ai-service`
   - **`deepjoy-platform-web`**: Next.js 15 Full-Stack Service on Node.js 22
5. Click **Apply**. Both services will build and launch with free SSL certificates!

### Option B: Manual Web Service on Render (For FastAPI only)
1. Go to [https://dashboard.render.com/](https://dashboard.render.com/) and click **New + > Web Service**.
2. Connect `https://github.com/Beatkingdeepjoy/DEEPJOYINFO`.
3. Configure:
   - **Name**: `deepjoy-ai-service`
   - **Root Directory**: `apps/ai-service`
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Health Check Path**: `/health`
4. Click **Create Web Service**.

---

## 🔗 Part 3: Connecting Vercel & Render
Once your Render AI service is deployed (e.g., `https://deepjoy-ai-service.onrender.com`), simply go back to your **Vercel Project Settings > Environment Variables** and update:
```env
NEXT_PUBLIC_AI_URL=https://deepjoy-ai-service.onrender.com
```
Then trigger a redeploy on Vercel. Now your floating "Ask Deepjoy AI" chatbot will query your live FastAPI service!
