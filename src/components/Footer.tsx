"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowUp, Linkedin, Twitter, Instagram, Youtube, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const linksCol1 = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Newsroom", href: "/news" },
    { label: "Articles", href: "/articles" }
];

const linksCol2: { label: string; href: string; muted?: boolean }[] = [
    { label: "Collaboration", href: "/collaboration" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Service", href: "/terms", muted: true },
    { label: "Privacy Policy", href: "/privacy", muted: true }
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const { error } = await supabase
                .from("email_subscribers")
                .insert([{ name, email, source: "footer" }]);

            if (error) {
                if (error.code === '23505') { // Unique violation
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

            // Revert back to idle after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    return (
        <footer className="w-full font-sans">
            <div className="w-full flex flex-col gap-[1px] bg-white/10 overflow-hidden shadow-2xl">

                {/* ---------- TOP ROW ---------- */}
                <div className="flex flex-col lg:flex-row w-full gap-[1px]">

                    {/* Top Left: Slogan */}
                    <div className="bg-[#161719] p-8 md:p-14 lg:p-20 flex flex-col justify-center items-center w-full lg:w-[35%] min-h-[350px] lg:min-h-[480px]">


                        {/* Slogan */}
                        <h5 className="text-[24px] md:text-[32px] text-[#A1A1AA] font-medium leading-[1.2] tracking-tight w-full text-center max-w-[340px]">
                            The trusted partner for pharmaceutical distribution in Sri Lanka.
                        </h5>
                    </div>

                    {/* Top Right: Video Background & Big Logo */}
                    <div className="bg-[#161719] relative w-full lg:w-[65%] min-h-[400px] lg:min-h-[480px] flex flex-col p-8 md:p-12 overflow-hidden group">
                        {/* Video Background */}
                        <video
                            suppressHydrationWarning
                            src="https://framerusercontent.com/assets/0BlOZC7zBspEbVthghs8ilWWvc.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-40"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#00A3FF]/20 to-[#0A1128]/40 mix-blend-multiply pointer-events-none" />

                        {/* Huge Center Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 md:px-12">
                            <img
                                src="/inspira-logo.png"
                                alt="Inspira Logo"
                                className="w-full max-w-[500px] md:max-w-[600px] object-contain opacity-100"
                            />
                        </div>

                        {/* Address Context */}
                        <div className="relative z-20 mt-auto pt-24 text-[#C0C0C0] text-[15px] leading-[1.6]">
                            <p>No. 45, Baseline Road</p>
                            <p>Colombo 08</p>
                            <p className="font-semibold text-white">Sri Lanka</p>
                        </div>
                    </div>

                </div>

                {/* ---------- BOTTOM ROW ---------- */}
                <div className="flex flex-col lg:flex-row w-full gap-[1px]">

                    {/* Bottom Left: Navigation Links */}
                    <div className="bg-[#161719] p-8 md:p-14 lg:p-20 flex flex-col justify-center w-full lg:w-[55%] xl:w-[60%]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

                            {/* Col 1 */}
                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-bold text-[#9E9EA6] uppercase tracking-[0.2em] mb-1">
                                    Navigation
                                </h4>
                                {linksCol1.map((link, i) => (
                                    <Link key={i} href={link.href} className="group flex items-center text-white hover:text-[#00A3FF] transition-all duration-300 font-medium text-[15px] w-fit">
                                        <span className="relative transform transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                                        <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2" />
                                    </Link>
                                ))}
                            </div>

                            {/* Col 2 */}
                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-bold text-[#9E9EA6] uppercase tracking-[0.2em] mb-1">
                                    Company
                                </h4>
                                {linksCol2.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className={`group flex items-center font-medium text-[15px] w-fit transition-all duration-300 ${link.muted ? 'text-[#9E9EA6] hover:text-white' : 'text-white hover:text-[#00A3FF]'}`}
                                    >
                                        <span className="relative transform transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                                        <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2" />
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Bottom Right: Newsletter */}
                    <div className="bg-[#161719] p-8 md:p-14 lg:p-20 flex flex-col justify-center w-full lg:w-[45%] xl:w-[40%]">
                        <div className="flex flex-col gap-6 md:gap-8 max-w-[500px]">
                            {/* Title & Desc */}
                            <div className="flex flex-col gap-2">
                                <h5 className="text-[#E3DBD8] text-[22px] md:text-[26px] font-semibold tracking-tight">Keep up with our journey and updates</h5>
                                <p className="text-[#9E9EA6] text-[14px]">Get the latest news, insights directly to your inbox. <span className="text-[#00A3FF]">*</span></p>
                            </div>

                            {/* Input Form */}
                            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-[#242426] text-white placeholder-[#888891] rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#00A3FF]/50 border border-white/5 transition-all text-[15px]"
                                    required
                                    disabled={status === "loading" || status === "success"}
                                />
                                <div className="relative flex w-full flex-col gap-2">
                                    <div className="relative flex w-full">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`w-full bg-[#242426] text-white placeholder-[#888891] rounded-xl pl-5 pr-16 py-4 outline-none focus:ring-2 transition-all text-[15px] ${status === "error" ? "border-red-500/50 focus:ring-red-500/50" : "border-white/5 focus:ring-[#00A3FF]/50"}`}
                                            required
                                            disabled={status === "loading" || status === "success"}
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === "loading" || status === "success"}
                                            className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-[#00A3FF] hover:bg-[#38bdf8] transition-colors rounded-lg flex items-center justify-center text-[#161719] disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Submit"
                                        >
                                            {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : status === "success" ? <CheckCircle2 className="w-5 h-5 text-green-900" /> : <ArrowRight className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {status === "error" && <p className="text-red-400 text-xs px-1">{errorMessage}</p>}
                                    {status === "success" && <p className="text-[#00A3FF] text-xs px-1">Successfully subscribed!</p>}
                                </div>
                            </form>

                            {/* Disclaimers */}
                            <div className="flex flex-col gap-4 mt-2">
                                <p className="text-[#9E9EA6] text-[13px] md:text-[14px]">
                                    By submitting, you agree to our <a href="#terms" className="text-[#00A3FF] underline underline-offset-2 hover:text-[#38bdf8]">Terms & Service.</a>
                                </p>
                                <p className="text-[#9E9EA6] text-[13px] md:text-[14px]">
                                    <span className="text-[#00A3FF] font-bold">*</span> No spam, just awesome updates.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ---------- FOOTER BAR ---------- */}
                <div className="bg-[#161719] px-6 py-6 md:px-12 md:py-8 flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 relative">

                    {/* Copyright & Logo */}
                    <div className="w-full md:flex-1 flex justify-center md:justify-start order-2 md:order-1 mt-4 md:mt-0">
                        <p className="text-[#9E9EA6] text-[13px] md:text-[14px]">© {currentYear} Inspira Worldwide. All rights reserved.</p>
                    </div>

                    {/* Designed By */}
                    <div className="w-full md:flex-1 flex justify-center order-3 md:order-2 mt-2 md:mt-0">
                        <a
                            href="https://www.arcai.agency"
                            target="_blank"
                            title="ARC AI - AI Automation & Software Solutions Agency"
                            className="flex items-center gap-3 text-[#9E9EA6] text-[13px] md:text-[14px] hover:text-white transition-colors"
                        >
                            Designed & Developed by <img src="/arc-logo.png" alt="ARC AI - AI Automation & Software Solutions Agency" className="h-10 md:h-12 object-contain translate-y-[2px]" />
                        </a>
                    </div>

                    {/* Socials & Top Button */}
                    <div className="w-full md:flex-1 flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-6 order-1 md:order-3">
                        {/* Social Links */}
                        <div className="flex items-center gap-4 text-[#9E9EA6]">
                            <a href="#" aria-label="LinkedIn" className="hover:text-[#00A3FF] transition-colors"><Linkedin className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="Twitter/X" className="hover:text-[#00A3FF] transition-colors"><Twitter className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-[#00A3FF] transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="YouTube" className="hover:text-[#00A3FF] transition-colors"><Youtube className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="WhatsApp" className="hover:text-[#00A3FF] transition-colors"><MessageCircle className="w-[18px] h-[18px]" /></a>
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Back to top"
                            className="bg-[#212225] hover:bg-[#2a2b2e] transition-colors rounded-lg flex items-center gap-2 px-4 py-2 text-[#E3DBD8] text-[12px] font-semibold tracking-wider"
                        >
                            TOP
                            <ArrowUp className="w-4 h-4 text-[#00A3FF]" />
                        </button>
                    </div>

                </div>

            </div>
        </footer>
    );
}
