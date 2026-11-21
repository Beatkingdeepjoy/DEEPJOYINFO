# Production Deployment Guide: Vercel & Render

**Target Repository**: `https://github.com/Beatkingdeepjoy/DEEPJOYINFO.git`  
**Live Production URL (Vercel)**: [https://deepjoyinfo.vercel.app](https://deepjoyinfo.vercel.app)  
**Alternative Vercel Domains**:
- `https://deepjoyinfo-beatkingdeepjoys-projects.vercel.app`
- `https://deepjoyinfo-git-main-beatkingdeepjoys-projects.vercel.app`

---

## 🚀 Part 1: Vercel Deployment (Completed & Live)

Your Next.js 15 3D Platform is **fully deployed and operational** on Vercel:
- **Deployment ID**: `dpl_FhYF4UgWVus7zCZ5LXmr6595Js1N` (State: `READY`)
- **Next.js Version**: `15.5.29` (Secured against CVE-2025-66478)
- **Routes Pre-rendered**: 19/19 (100% SSG & dynamic endpoints)
- **Continuous Deployment**: Connected to `Beatkingdeepjoy/DEEPJOYINFO` (`main` branch) — any new push to GitHub will automatically build and deploy!

### Optional Environment Variables on Vercel:
If you want live real-time sync with YouTube API instead of the graceful offline fallback:
| Variable Name | Description |
|---|---|
| `YOUTUBE_API_KEY` | Your Google Cloud YouTube Data API v3 key |
| `YOUTUBE_CHANNEL_ID` | `UCztCtzW52UO_iOONZZzQnQw` |
| `NEXT_PUBLIC_AI_URL` | `https://deepjoy-ai-service.onrender.com` (when Render AI is deployed) |

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
