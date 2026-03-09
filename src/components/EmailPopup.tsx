"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";

export default function EmailPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const pathname = usePathname();

    // Show popup after 20 seconds
    useEffect(() => {
        const hasBeenShown = sessionStorage.getItem("emailPopupShown");

        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem("emailPopupShown", "true");
            }, 20000); // 20 seconds delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const { error } = await supabase
                .from("email_subscribers")
                .insert([{ name, email, source: "popup" }]);

            if (error) {
                if (error.code === '23505') {
                    setErrorMessage("This email is already subscribed.");
                } else {
                    setErrorMessage("Failed to subscribe. Please try again.");
                }
                setStatus("error");
                throw error;
            }

            setStatus("success");
            setName("");
            setEmail("");

            // Close the modal 3 seconds after success
            setTimeout(() => {
                setIsOpen(false);
                setStatus("idle");
            }, 3000);
        } catch (error) {
            console.error("Error subscribing from popup:", error);
        }
    };

    if (!isOpen || pathname.startsWith("/admin")) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#161719] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-white/5">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>

                {/* Decorative Effect */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00A3FF] blur-[100px] rounded-full opacity-20 pointer-events-none" />

                <div className="p-8 flex flex-col items-center text-center relative z-0">
                    {/* Icon/Logo container */}
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00A3FF] to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-[#00A3FF]/20 mb-6">
                        {/* We use a simple envelope icon conceptually or logo */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    <h3 className="text-[24px] font-semibold text-white tracking-tight leading-tight mb-3">
                        Want to stay up to date?
                    </h3>
                    <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
                        Get the latest news, updates, and pharmaceutical insights directly to your inbox.
                    </p>

                    <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#242426] text-white placeholder-zinc-500 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#00A3FF]/50 border border-white/5 transition-all text-[15px]"
                            required
                            disabled={status === "loading" || status === "success"}
                        />
                        <div className="relative flex w-full">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full bg-[#242426] text-white placeholder-zinc-500 rounded-xl pl-5 pr-16 py-4 outline-none focus:ring-2 transition-all text-[15px] ${status === "error" ? "border-red-500/50 focus:ring-red-500/50" : "border-white/5 focus:ring-[#00A3FF]/50"}`}
                                required
                                disabled={status === "loading" || status === "success"}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-[#00A3FF] hover:bg-[#38bdf8] transition-colors rounded-lg flex items-center justify-center text-[#161719] disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Subscribe"
                            >
                                {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : status === "success" ? <CheckCircle2 className="w-5 h-5 text-green-900" /> : <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>
                        {status === "error" && <p className="text-red-400 text-xs text-left px-1 mt-1">{errorMessage}</p>}
                        {status === "success" && <p className="text-[#00A3FF] text-xs text-left px-1 mt-1">Successfully subscribed!</p>}
                    </form>

                    <p className="text-xs text-zinc-500 mt-6 font-medium">
                        No spam. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
