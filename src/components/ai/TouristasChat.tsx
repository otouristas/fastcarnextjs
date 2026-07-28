"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, RotateCcw, Minus, Trash2, Globe2 } from "lucide-react";
import { getResponse, type ChatResponse } from "@/lib/chat-engine";
import { WELCOME_MESSAGE } from "@/lib/touristas-knowledge";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatVehicleList } from "./ChatVehicleCard";
import type { Dict } from "@/i18n/types";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  vehicles?: ChatResponse["vehicles"];
  quickReplies?: string[];
}

export function TouristasChat({ dict }: { dict: Dict }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimised) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, isMinimised]);

  const openChat = () => {
    setIsOpen(true);
    setIsMinimised(false);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([{
        id: "welcome",
        text: WELCOME_MESSAGE.response,
        isBot: true,
        quickReplies: WELCOME_MESSAGE.quickReplies,
      }]);
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, text: text.trim(), isBot: false }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getResponse(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: `b-${Date.now()}`,
        text: response.text,
        isBot: true,
        vehicles: response.vehicles,
        quickReplies: response.quickReplies,
      }]);
    }, 600);
  };

  const resetChat = () => {
    setMessages([{
      id: "welcome-reset",
      text: WELCOME_MESSAGE.response,
      isBot: true,
      quickReplies: WELCOME_MESSAGE.quickReplies,
    }]);
  };

  const deleteChat = () => {
    setMessages([]);
    setHasOpened(false);
    setIsOpen(false);
  };

  const ai = dict.ai;

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {(!isOpen || isMinimised) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={openChat}
            aria-label={ai.trigger}
            className="fixed bottom-[5.5rem] right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sea)] text-[var(--primary-foreground)] shadow-xl hover:shadow-2xl sm:bottom-6 sm:right-[5.5rem]"
          >
            <Bot className="h-7 w-7" />
            {!hasOpened && (
              <span className="absolute inset-0 rounded-full bg-[var(--sea)]/30 animate-ping" />
            )}
            <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none">
              {ai.trigger}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && !isMinimised && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed bottom-0 right-0 z-50 flex h-dvh w-full flex-col overflow-hidden bg-background shadow-2xl sm:h-[640px] sm:max-h-[82vh] sm:w-[420px] sm:bottom-24 sm:right-6 sm:rounded-2xl sm:border sm:border-border/60"
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between bg-[var(--sea)] px-5 py-4 text-[var(--primary-foreground)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Touristas AI</p>
                    <p className="text-[11px] text-[var(--primary-foreground)]/75">{ai.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={resetChat}
                    aria-label={ai.reset}
                    className="rounded-full p-2 hover:bg-white/20 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={deleteChat}
                    aria-label="Delete conversation"
                    className="rounded-full p-2 hover:bg-red-500/30 transition-colors"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimised(true)}
                    aria-label={ai.minimize}
                    className="rounded-full p-2 hover:bg-white/20 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label={ai.close}
                    className="rounded-full p-2 hover:bg-white/20 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col">
                    <ChatMessage text={msg.text} isBot={msg.isBot} />
                    {msg.isBot && msg.vehicles && msg.vehicles.length > 0 && (
                      <div className="ml-9 mt-1">
                        <ChatVehicleList vehicles={msg.vehicles} />
                      </div>
                    )}
                    {msg.isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="ml-9 mt-2 flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => sendMessage(reply)}
                            className="rounded-full border border-[var(--sea)]/30 bg-[var(--sea-soft)] px-3 py-1.5 text-xs font-medium text-[var(--sea)] transition-colors hover:bg-[var(--sea)] hover:text-[var(--primary-foreground)] dark:bg-white/10 dark:text-[var(--sea-2)]"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions (shown when empty) */}
              {messages.length === 0 && (
                <div className="px-4 pb-3">
                  <p className="mb-2 text-xs text-muted-foreground">{ai.trigger}:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ai.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-[var(--sea)] hover:text-[var(--sea)]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex shrink-0 items-center gap-2 border-t border-border bg-background px-4 py-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={ai.placeholder}
                  className="flex-1 rounded-full border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--sea)] focus:outline-none focus:ring-2 focus:ring-[var(--sea)]/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label={ai.send}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sea)] text-[var(--primary-foreground)] shadow transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              {/* Disclaimer + footer */}
              <div className="shrink-0 border-t border-border/40 bg-muted/30 px-4 py-2 space-y-1">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  ⚠️ Touristas AI is for guidance only  -  responses may not reflect real-time availability or exact pricing. Contact us directly to confirm.
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] text-muted-foreground">
                    Powered by{" "}
                    <a href="https://touristas.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--sea)]">
                      Touristas AI
                    </a>
                  </p>
                  <a
                    href="https://discovercyclades.gr/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-[var(--sea)]"
                  >
                    <Globe2 className="h-3 w-3" aria-hidden="true" />
                    <span className="font-medium">Discover Cyclades</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
