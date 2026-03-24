"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function AiChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Auto-open on desktop devices after a short delay
        if (typeof window !== "undefined" && window.innerWidth >= 1024) {
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm the Inspira Worldwide AI assistant. How can I help you with pharmaceutical distribution today?",
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [sessionId] = useState(() => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (messages.length === 0) return;
        const lastMsg = messages[messages.length - 1];

        if (isLoading) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } else if (lastMsg.role === "assistant" && messages.length > 1) {
            const element = document.getElementById(`message-${lastMsg.id}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;

        setError(null);

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: trimmedInput,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const apiMessages = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages, sessionId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }

            setMessages(prev => [...prev, {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.content,
            }]);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute bottom-20 right-0 w-[320px] sm:w-[360px] h-[480px] max-h-[75vh] flex flex-col overflow-hidden rounded-[20px]
                       bg-gradient-to-b from-white/[0.12] to-white/[0.04] backdrop-blur-[40px]
                       border border-white/[0.18]
                       shadow-[0_8px_32px_rgba(0,0,0,0.4),0_24px_48px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.03]">
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#00A3FF] to-cyan-400 flex items-center justify-center border border-white/20 shadow-[0_2px_8px_rgba(0,163,255,0.3)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <path d="M12 8V4H8" />
                                        <rect width="16" height="12" x="4" y="8" rx="2" />
                                        <path d="M2 14h2" />
                                        <path d="M20 14h2" />
                                        <path d="M15 13v2" />
                                        <path d="M9 13v2" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm tracking-wide">Inspira AI</h3>
                                    <p className="text-white/60 text-xs">Distribution Partner</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    id={`message-${msg.id}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.role === "user"
                                            ? "bg-gradient-to-br from-[#00A3FF] to-[#0088DD] text-white shadow-[0_4px_12px_rgba(0,163,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                            : "bg-white/90 text-black backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.06)]"
                                            }`}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                a: ({ node, ...props }) => (
                                                    <a {...props} target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline break-all ${msg.role === "user" ? "text-[#FFD700]" : "text-[#00A3FF]"}`} />
                                                ),
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 last:mb-0" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 last:mb-0" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/[0.06] border border-white/[0.08] backdrop-blur-md rounded-2xl px-4 py-3 flex gap-2 items-center">
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-white/60" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-white/60" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-white/60" />
                                    </div>
                                </motion.div>
                            )}

                            {error && (
                                <div className="text-[#FF6B6B] text-xs text-center p-2 bg-red-900/20 rounded-lg border border-red-500/30">
                                    {error}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/[0.08] bg-black/20">
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-2.5 pr-11 text-white text-[13px] focus:outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all placeholder:text-white/35"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00A3FF] to-[#0088DD] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-[0_2px_6px_rgba(0,163,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </form>

                            {/* ARC AI Branding */}
                            <div className="mt-2 text-center">
                                <span className="text-white/40 text-[10px] uppercase font-medium tracking-wider">
                                    Powered by <a href="https://www.arcai.agency" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/60">ARC AI</a>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button Container for Pulse Effect */}
            <div className="relative">
                {/* Pulsing ring behind the button (only pulsing when closed) */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-[-10px] rounded-full bg-[#00A3FF] blur-md pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* Main Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
                       transition-all duration-300 z-10 overflow-hidden
                       ${isOpen
                            ? 'bg-[#111] rotate-90 scale-90 border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                            : 'bg-gradient-to-b from-[#4da2ff] via-[#007cdb] to-[#005199] shadow-[0_10px_20px_rgba(0,163,255,0.4),inset_0_-8px_16px_rgba(0,50,110,0.8),inset_0_4px_10px_rgba(255,255,255,0.6)] border border-[#005bb5] hover:shadow-[0_15px_30px_rgba(0,163,255,0.6)]'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.svg
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path d="M18 6L6 18M6 6l12 12" />
                            </motion.svg>
                        ) : (
                            <motion.div
                                key="icon"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                className="w-full h-full flex items-center justify-center relative"
                            >
                                {/* 3D Glass Arc Highlight (Reflection) */}
                                <div className="absolute top-[3%] left-[10%] right-[10%] h-[40%] bg-gradient-to-b from-white/60 to-transparent rounded-full pointer-events-none" />

                                {/* Agent Symbol in the Center */}
                                <Bot className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-md z-10" strokeWidth={1.5} />

                                {/* Red Notification Dot */}
                                <div className="absolute top-2 right-2 md:top-3 md:right-3 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#FF3B30] border-2 border-[#005bb5] rounded-full shadow-[0_0_8px_rgba(255,59,48,0.8),inset_0_1px_2px_rgba(255,255,255,0.8)] z-20" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
