// src/app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Layers, Sparkles, Mail, ArrowRight, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Configurable quick prompts
const QUICK_ACTIONS = [
  { id: "me", label: "Me", icon: User, prompt: "Tell me about Vedant." },
  { id: "projects", label: "Projects", icon: Briefcase, prompt: "What projects has Vedant built?" },
  { id: "skills", label: "Skills", icon: Layers, prompt: "What are Vedant's technical skills?" },
  { id: "fun", label: "Fun", icon: Sparkles, prompt: "Tell me something interesting about Vedant." },
  { id: "contact", label: "Contact", icon: Mail, prompt: "How can I contact Vedant?" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Simulate an AI response for Phase 1
  const simulateAIResponse = (userText: string) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `This is a mocked AI response to: "${userText}". In Phase 4, the RAG engine will replace this with real data from your portfolio.`,
        },
      ]);
    }, 600);
  };

  const handleActionClick = (prompt: string) => {
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: prompt };
    setMessages((prev) => [...prev, newUserMsg]);
    simulateAIResponse(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: query };
    setMessages((prev) => [...prev, newUserMsg]);
    setQuery("");
    simulateAIResponse(query);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center selection:bg-neutral-200">
      
      {/* Background Watermark Branding */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden opacity-[0.03] select-none">
        <span className="text-[18vw] font-black tracking-tighter">VEDANT</span>
      </div>

      {/* Dynamic Main Content Area */}
      <div className={cn(
        "flex w-full max-w-3xl flex-col px-4 relative z-10",
        messages.length === 0 ? "flex-1 justify-center items-center" : "pt-8 pb-32"
      )}>
        
        {/* --- LANDING HERO --- */}
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm">
              <span className="text-sm font-bold tracking-wider">VB</span>
            </div>
            <p className="text-sm font-medium text-neutral-500">Hey, I'm Vedant 👋</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              AI & Frontend Engineer
            </h1>
          </motion.div>
        )}

        {/* --- CHAT MESSAGES --- */}
        {messages.length > 0 && (
          <div className="flex flex-col space-y-6 w-full">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex w-full gap-4 rounded-2xl p-4",
                    msg.role === "user" ? "bg-neutral-50" : "bg-transparent"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    msg.role === "user" ? "bg-neutral-200 text-neutral-600" : "bg-blue-600 text-white"
                  )}>
                    {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 space-y-2 overflow-hidden text-neutral-800">
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- INPUT BOX --- */}
        <div className={cn(
          "w-full max-w-2xl z-50 transition-all duration-500 ease-in-out",
          messages.length === 0 
            ? "mt-8" // Normal flow spacing in landing state
            : "fixed bottom-8 left-1/2 -translate-x-1/2 px-4" // Fixed at bottom during chat
        )}>
          <form 
            onSubmit={handleSubmit}
            className="relative flex w-full items-center shadow-lg rounded-full"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full rounded-full border border-neutral-200/80 bg-white/90 py-4 pl-6 pr-14 text-sm text-neutral-900 backdrop-blur-md transition-all placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-100"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600"
              aria-label="Send query"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* --- QUICK ACTIONS --- */}
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-2 w-full"
          >
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.prompt)}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-200 hover:shadow-md"
                >
                  <Icon className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-blue-600" />
                  <span className="mt-1.5 text-xs font-medium text-neutral-600 group-hover:text-neutral-900">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}

      </div>
    </main>
  );
}