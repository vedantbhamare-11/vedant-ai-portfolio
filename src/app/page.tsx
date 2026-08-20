// src/app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Layers, Sparkles, Mail, ArrowRight, Bot, Loader2, Plus } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { id: "me", label: "Me", icon: User, prompt: "Tell me about Vedant." },
  { id: "projects", label: "Projects", icon: Briefcase, prompt: "What projects has Vedant built?" },
  { id: "skills", label: "Skills", icon: Layers, prompt: "What are Vedant's technical skills?" },
  { id: "fun", label: "Fun", icon: Sparkles, prompt: "Tell me something interesting about Vedant." },
  { id: "contact", label: "Contact", icon: Mail, prompt: "How can I contact Vedant?" },
];

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, setMessages } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleActionClick = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage({ text: input });
    setInput(""); 
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center selection:bg-neutral-200">
      
      {/* Background Watermark */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden opacity-[0.03] select-none">
        <span className="text-[18vw] font-black tracking-tighter">VEDANT</span>
      </div>

      {/* --- STICKY HEADER --- */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white shadow-sm">
                <span className="text-xs font-bold tracking-wider">VB</span>
              </div>
              <span className="text-sm font-semibold text-neutral-800 hidden sm:block">Vedant AI</span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <div className={cn(
        "flex w-full max-w-3xl flex-col px-4 relative z-10",
        messages.length === 0 ? "flex-1 justify-center items-center" : "pt-24 pb-48" 
      )}>
        
        {/* Error Banner */}
        {error && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-md rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 shadow-sm z-50 text-center">
            <strong>API Error:</strong> {error.message || "Failed to connect to the AI model."}
          </div>
        )}

        {/* Landing Hero */}
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

        {/* Chat Messages */}
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
                    {msg.parts && msg.parts.length > 0 ? (
                      msg.parts.map((part, index) => (
                        part.type === "text" ? (
                          <ReactMarkdown 
                            key={index}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
                              ul: ({node, ...props}) => <ul className="mb-4 list-disc pl-6 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="mb-4 list-decimal pl-6 space-y-1" {...props} />,
                              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-semibold text-neutral-950" {...props} />,
                              a: ({node, ...props}) => <a className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                            }}
                          >
                            {part.text}
                          </ReactMarkdown>
                        ) : null
                      ))
                    ) : (
                      <p className="leading-relaxed">{(msg as any).text || (msg as any).content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex w-full gap-4 rounded-2xl p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex flex-1 items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* --- FIXED BOTTOM INPUT AREA --- */}
        <div className={cn(
          "w-full max-w-2xl z-50 flex flex-col transition-all duration-500 ease-in-out",
          messages.length === 0 
            ? "mt-8" 
            : "fixed bottom-6 left-1/2 -translate-x-1/2 px-4" 
        )}>
          
          {/* Quick Actions (Chat State) - Horizontal scrolling pills ABOVE the input */}
          {messages.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex w-full overflow-x-auto gap-2 mb-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.prompt)}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {action.label}
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="relative flex w-full items-center shadow-lg rounded-full"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask me anything..."
              className="w-full rounded-full border border-neutral-200/80 bg-white/90 py-4 pl-6 pr-14 text-sm text-neutral-900 backdrop-blur-md transition-all placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-100 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600"
              aria-label="Send query"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Actions (Landing State) - Big square buttons BELOW the input */}
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
      </div>
    </main>
  );
}