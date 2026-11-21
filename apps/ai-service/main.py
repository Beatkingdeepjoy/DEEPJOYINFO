import json
import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Deepjoy Bhowmik Grounded AI Service",
    description="Strict RAG chat service powered by Google Gemini paradigms and verified developer data",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load verified knowledge base
KB_PATH = Path(__file__).parent / "rag" / "knowledge_base.json"
with open(KB_PATH, "r", encoding="utf-8") as f:
    KNOWLEDGE_BASE = json.load(f)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    grounded: bool
    source: str

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "deepjoy-ai-rag-service",
        "knowledge_entries": len(KNOWLEDGE_BASE["projects"]) + len(KNOWLEDGE_BASE["experiences"])
    }

@app.post("/chat", response_model=ChatResponse)
def handle_chat(req: ChatRequest):
    query = req.message.lower().strip()
    
    # Strict anti-hallucination guardrail
    if any(k in query for k in ["phone", "phone number", "mobile", "whatsapp"]):
        return ChatResponse(
            reply="For privacy and security, Deepjoy Bhowmik's phone number is withheld from public disclosure. You can connect directly via email at deepjoydeveloper@gmail.com or LinkedIn.",
            grounded=True,
            source="privacy_policy"
        )
    
    if any(k in query for k in ["who", "identity", "about", "degree", "college"]):
        dev = KNOWLEDGE_BASE["developer"]
        return ChatResponse(
            reply=f"{dev['name']} is a Full-Stack Developer, YouTuber, and Google Student Ambassador (Gemini AI) based in {dev['location']}. He is pursuing his {dev['education']}. His motto: '{dev['brand_line']}'.",
            grounded=True,
            source="developer_bio"
        )
        
    if "shudh desi" in query or "snack" in query or "ecommerce" in query:
        proj = KNOWLEDGE_BASE["projects"][0]
        return ChatResponse(
            reply=f"SHUDH DESI ({proj['url']}) is an e-commerce platform founded and led by Deepjoy for traditional Northeast Indian snacks. It is currently at {proj['progress']}.",
            grounded=True,
            source="projects/shudh-desi"
        )
        
    if "gemini" in query or "ambassador" in query or "google" in query:
        exp = KNOWLEDGE_BASE["experiences"][0]
        return ChatResponse(
            reply=f"Deepjoy is the {exp['role']} for {exp['organization']}. He ran the 'Career Glow-up Night' workshop onboarding 30+ students into generative AI and prompt engineering.",
            grounded=True,
            source="experiences/google_ambassador"
        )
        
    if "nielit" in query or "intern" in query:
        exp = KNOWLEDGE_BASE["experiences"][1]
        return ChatResponse(
            reply=f"At NIELIT Agartala ({exp['period']}), Deepjoy served as a {exp['role']}, building a Tripura government portal with HTML, CSS, JS, and a secure PHP authentication backend.",
            grounded=True,
            source="experiences/nielit"
        )
        
    if "youtube" in query or "vlog" in query or "subscribers" in query:
        return ChatResponse(
            reply="Deepjoy runs his YouTube channel @deepjoybhowmikofficial documenting B.Tech life in Tripura, late-night code builds, and engineering student experiences.",
            grounded=True,
            source="youtube_brand"
        )
        
    if "collab" in query or "sponsor" in query or "hire" in query:
        dev = KNOWLEDGE_BASE["developer"]
        return ChatResponse(
            reply=f"For business and sponsorship proposals, email {dev['emails']['sponsorship_and_collab']}. For technical engineering roles, email {dev['emails']['developer']}.",
            grounded=True,
            source="contacts"
        )
        
    return ChatResponse(
        reply="I am strictly grounded only in Deepjoy Bhowmik's verified academic, engineering, and content creation credentials. I cannot answer queries outside his verified portfolio.",
        grounded=False,
        source="guardrail_fallback"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
