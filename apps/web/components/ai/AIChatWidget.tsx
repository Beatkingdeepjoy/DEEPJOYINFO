"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES } from "@/lib/data/portfolio-data";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Hello! I am Deepjoy's AI companion, strictly grounded in his verified projects, experience as Google Gemini Ambassador, and student vlogger journey. What would you like to know?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = [
    "Tell me about Deepjoy's background",
    "What is the SHUDH DESI project?",
    "What is his role as Google Gemini Ambassador?",
    "How can I sponsor or collaborate?",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    soundFx.playClick();
    const newMsgs = [...messages, { role: "user" as const, content: text }];
    setMessages(newMsgs);
    setInputVal("");
    setLoading(true);

    try {
      // Direct grounded heuristic answer or API call
      setTimeout(() => {
        const lower = text.toLowerCase();
        let reply = "";

        if (lower.includes("background") || lower.includes("who is") || lower.includes("about")) {
          reply = `Deepjoy Bhowmik is a Computer Science undergraduate at ICFAI University Tripura, based in Agartala. He is a Full-Stack Developer, YouTuber, and Google Student Ambassador (Gemini AI). His brand motto is: "${PERSONAL_INFO.brandLine}".`;
        } else if (lower.includes("shudh desi") || lower.includes("ecommerce") || lower.includes("e-commerce")) {
          reply = `SHUDH DESI is an e-commerce platform founded and led by Deepjoy, dedicated to authentic traditional Northeast Indian snacks and spices. It is currently ~80% complete and launching soon.`;
        } else if (lower.includes("gemini") || lower.includes("ambassador") || lower.includes("google")) {
          reply = `Deepjoy is the Google Student Ambassador (Gemini AI) for Ping Digital Broadcast (On-Campus Initiative). He led the 'Career Glow-up Night' workshop onboarding 30+ students into generative AI and prompt engineering.`;
        } else if (lower.includes("collab") || lower.includes("sponsor") || lower.includes("hire") || lower.includes("email")) {
          reply = `For business collaborations and sponsorships, you can reach out directly to deepjoyallcollab@gmail.com. For developer and technical inquiries, his email is deepjoydeveloper@gmail.com.`;
        } else if (lower.includes("nielit") || lower.includes("intern")) {
          reply = `Deepjoy served as a Full Stack Developer Intern at NIELIT Agartala (Dec 2024 - Mar 2025), where he engineered a Tripura government website with secure authentication and PHP/MySQL database architecture.`;
        } else if (lower.includes("phone") || lower.includes("number") || lower.includes("contact number")) {
          reply = `For privacy and security reasons, Deepjoy's phone number is withheld from public display. Please connect via email at deepjoydeveloper@gmail.com or LinkedIn.`;
        } else {
          reply = `I am strictly trained only on Deepjoy Bhowmik's verified academic, developer, and YouTube credentials. I don't have information outside this scope. Would you like to know about his projects, experience, or YouTube channel?`;
        }

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        setLoading(false);
        soundFx.playHover();
      }, 600);
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Pill */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            soundFx.playClick();
          }}
          aria-label="Open Ask Deepjoy's AI"
          data-cursor="CHAT"
          className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan text-white shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 border border-white/10"
        >
          <Sparkles className="w-4 h-4 animate-pulse text-cyan-300" />
          <span className="font-mono text-xs font-bold tracking-wide">Ask Deepjoy AI</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-sm sm:max-w-md h-[520px] bg-night-950/95 border border-accent-cyan/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-night-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent-violet/20 border border-accent-violet/40 flex items-center justify-center text-accent-cyan">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Deepjoy AI Assistant</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-cyan-400">Strictly Grounded</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                soundFx.playClick();
              }}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Starter Pills */}
          <div className="p-3 bg-night-900/40 border-b border-white/5 flex gap-2 overflow-x-auto text-[11px] font-mono no-scrollbar">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent-violet text-white rounded-br-none"
                      : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Deepjoy AI is synthesizing verified data...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-night-900 border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about Deepjoy, Gemini, projects..."
              className="flex-1 px-3 py-2 bg-night-950 rounded-xl border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="p-2 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white disabled:opacity-40 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
