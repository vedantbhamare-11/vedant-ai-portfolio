"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Loader2, Plus, X } from "lucide-react"; 
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { cn } from "@/lib/utils";
import { QUICK_ACTIONS, PRELOADED_RESPONSES } from "@/lib/chat-config";
import ChatMessage from "@/components/chat/ChatMessage";
import Image from "next/image"; // <-- Added Image import

export default function Home() {
  const [input, setInput] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  // =========================================================
  // BOTTOM SCROLL ANCHOR
  // =========================================================
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // =========================================================
  // AUTO SCROLL (New Message Trigger)
  // =========================================================
  useEffect(() => {
    if (messages.length === 0) return;

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  }, [messages.length]);

  // =========================================================
  // QUICK ACTION
  // =========================================================
  const handleActionClick = (actionId: string, prompt: string) => {
    if (isLoading) return;

    const preloadedText = PRELOADED_RESPONSES[actionId];

    if (preloadedText) {
      const timestamp = Date.now();

      const userMessage = {
        id: `user-${actionId}-${timestamp}`,
        role: "user" as const,
        parts: [
          {
            type: "text" as const,
            text: prompt,
          },
        ],
      };

      const assistantMessage = {
        id: `preloaded-${actionId}-${timestamp}`,
        role: "assistant" as const,
        parts: [
          {
            type: "text" as const,
            text: preloadedText,
          },
        ],
      };

      setMessages((prev: any) => [...prev, userMessage, assistantMessage]);
      return;
    }

    sendMessage({
      text: prompt,
    });
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({
      text: input,
    });
    setInput("");
  };

  // =========================================================
  // RESET CHAT
  // =========================================================
  const handleReset = () => {
    setMessages([]);
    setInput("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center selection:bg-neutral-200">
      
      {/* =====================================================
          TOP BANNER (Classic Portfolio Link)
      ====================================================== */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 right-0 top-0 z-[100] flex h-10 w-full items-center justify-center bg-[#7692FF] px-4 text-xs font-medium text-white shadow-md sm:text-sm"
          >
            <p className="flex items-center gap-1.5">
              ✨ Looking for my classic visual portfolio?{" "}
              <a
                href="https://vedant-bhamare-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-blue-200"
              >
                View it here
              </a>
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-700/50 transition-colors hover:bg-blue-800 sm:right-6"
              aria-label="Dismiss banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND TEXT */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden select-none opacity-[0.03]">
        <span className="text-[18vw] font-black tracking-tighter">VEDANT</span>
      </div>

      {/* FLOATING HEADER */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed left-0 right-0 z-50 flex items-center justify-between border-b border-neutral-100 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-md transition-all duration-300 sm:px-6",
              showBanner ? "top-10" : "top-0"
            )}
          >
            <div className="flex items-center gap-3">
              {/* HEADER AVATAR - Updated with Image */}
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-neutral-900 text-white">
                <Image 
                  src="/images/vedant-profile-pic.png" 
                  alt="Vedant Bhamare" 
                  width={100} 
                  height={100} 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden text-sm font-semibold text-neutral-800 sm:block">
                Vedant AI
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT CONTAINER */}
      <div
        className={cn(
          "relative z-10 flex w-full max-w-3xl flex-col px-4 transition-all duration-300",
          messages.length === 0
            ? "flex-1 items-center justify-center"
            : showBanner
            ? "pb-48 pt-32"
            : "pb-48 pt-24"
        )}
      >
        {/* ERROR */}
        {error && (
          <div className="absolute left-1/2 top-24 z-50 w-full max-w-md -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600 shadow-sm">
            <strong>API Error:</strong>{" "}
            {error.message || "Failed to connect to the AI model."}
          </div>
        )}

        {/* HERO */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col items-center text-center"
          >
            {/* HERO AVATAR - Updated with Image */}
            <div className="mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-neutral-900 text-white ">
               <Image 
                  src="/images/vedant-profile-pic.png" 
                  alt="Vedant Bhamare" 
                  width={56} 
                  height={56} 
                  className="h-full w-full object-cover"
                />
            </div>
            <p className="text-sm font-medium text-neutral-500">
              Hey, I'm Vedant 👋
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              AI & Frontend Engineer
            </h1>
          </motion.div>
        )}

        {/* MESSAGES */}
        <div className="flex w-full flex-col space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}

            {/* LOADING INDICATOR */}
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

          {/* BOTTOM SCROLL ANCHOR */}
          <div ref={bottomRef} className="h-px w-full" aria-hidden="true" />
        </div>

        {/* INPUT AREA */}
        <div
          className={cn(
            "z-50 flex w-full max-w-2xl flex-col transition-all duration-500 ease-in-out",
            messages.length === 0
              ? "mt-8"
              : "fixed bottom-6 left-1/2 -translate-x-1/2 px-4",
          )}
        >
          {/* QUICK ACTIONS DURING CHAT */}
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 flex w-full flex-wrap gap-2"
            >
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.id, action.prompt)}
                    disabled={isLoading}
                    className="group flex shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white/80 p-2.5 text-xs font-medium text-neutral-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2"
                  >
                    <Icon className="h-4 w-4 shrink-0 sm:h-3.5 sm:w-3.5" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:max-w-30 group-hover:pl-2 group-hover:opacity-100 sm:max-w-30 sm:pl-2 sm:opacity-100">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* INPUT */}
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full items-center rounded-full shadow-lg"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask me anything about my projects or experience..."
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

          {/* LANDING QUICK ACTIONS */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8 flex w-full flex-wrap justify-center gap-2"
            >
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.id, action.prompt)}
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