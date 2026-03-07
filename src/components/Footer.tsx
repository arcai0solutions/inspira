"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ArrowUp, Linkedin, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";

const linksCol1 = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Products", href: "#" },
    { label: "Newsroom", href: "#" }
];

const linksCol2 = [
    { label: "Collaboration", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Terms & Service", href: "#", muted: true },
    { label: "Privacy Policy", href: "#", muted: true }
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#0A0A0A] px-2 md:px-4 py-2 md:py-4 pb-4 font-sans border-t border-white/5 pt-12">
            <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-[1px] bg-white/10 rounded-[2rem] overflow-hidden shadow-2xl">

                {/* ---------- TOP ROW ---------- */}
                <div className="flex flex-col lg:flex-row w-full gap-[1px]">

                    {/* Top Left: Slogan & Rotating Badge */}
                    <div className="bg-[#161719] p-8 md:p-14 lg:p-20 flex flex-col justify-between w-full lg:w-[35%] min-h-[350px] lg:min-h-[480px]">
                        {/* Rotating Badge */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-12">
                            <div className="absolute inset-0 animate-spin-slow duration-[10000ms]">
                                <svg viewBox="0 0 100 100" overflow="visible" className="w-full h-full">
                                    <path id="curve-wnxkz4" d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50" strokeWidth="none" fill="transparent"></path>
                                    <text>
                                        <textPath href="#curve-wnxkz4" startOffset="0" dominantBaseline="central" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.04em', fill: '#C0C0C0' }}>
                                            empowering healthcare, delivering excellence -
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                            {/* Blue Center Dot */}
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-[#00A3FF] rounded-full relative z-10 shadow-[0_0_15px_rgba(0,163,255,0.5)]"></div>
                        </div>

                        {/* Slogan */}
                        <h5 className="text-[24px] md:text-[32px] text-[#A1A1AA] font-medium leading-[1.2] tracking-tight max-w-[300px]">
                            The trusted partner for pharmaceutical distribution in Sri Lanka.
                        </h5>
                    </div>

                    {/* Top Right: Video Background & Big Logo */}
                    <div className="bg-[#161719] relative w-full lg:w-[65%] min-h-[400px] lg:min-h-[480px] flex flex-col p-8 md:p-12 overflow-hidden group">
                        {/* Video Background */}
                        <video
                            src="https://framerusercontent.com/assets/0BlOZC7zBspEbVthghs8ilWWvc.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-40"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161719] via-transparent to-[#161719]/40 mix-blend-multiply pointer-events-none" />

                        {/* Huge Center Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 md:px-12">
                            <img
                                src="/inspira-logo.png"
                                alt="Inspira Logo"
                                className="w-full max-w-[800px] object-contain opacity-100"
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
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="w-[18px] h-[6px] rounded-[2px] bg-[#00A3FF]"></div>
                                    <div className="w-[6px] h-[6px] rounded-[2px] bg-white/20"></div>
                                </div>
                                {linksCol1.map((link, i) => (
                                    <a key={i} href={link.href} className="text-white hover:text-[#00A3FF] transition-colors font-medium text-[15px] w-fit">
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            {/* Col 2 */}
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="w-[6px] h-[6px] rounded-[2px] bg-[#00A3FF]"></div>
                                    <div className="w-[18px] h-[6px] rounded-[2px] bg-white/20"></div>
                                </div>
                                {linksCol2.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.href}
                                        className={`font-medium text-[15px] w-fit transition-colors ${link.muted ? 'text-[#888891] hover:text-white' : 'text-white hover:text-[#00A3FF]'}`}
                                    >
                                        {link.label}
                                    </a>
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
                                <p className="text-[#888891] text-[14px]">Get the latest news, insights directly to your inbox. <span className="text-[#00A3FF]">*</span></p>
                            </div>

                            {/* Input Form */}
                            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-[#242426] text-white placeholder-[#888891] rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#00A3FF]/50 border border-white/5 transition-all text-[15px]"
                                    required
                                />
                                <div className="relative flex w-full">
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full bg-[#242426] text-white placeholder-[#888891] rounded-xl pl-5 pr-16 py-4 outline-none focus:ring-2 focus:ring-[#00A3FF]/50 border border-white/5 transition-all text-[15px]"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-[#00A3FF] hover:bg-[#38bdf8] transition-colors rounded-lg flex items-center justify-center text-[#161719]"
                                        aria-label="Submit"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>

                            {/* Disclaimers */}
                            <div className="flex flex-col gap-4 mt-2">
                                <p className="text-[#888891] text-[13px] md:text-[14px]">
                                    By submitting, you agree to our <a href="#terms" className="text-[#00A3FF] hover:underline underline-offset-2">Terms & Service.</a>
                                </p>
                                <p className="text-[#888891] text-[13px] md:text-[14px]">
                                    <span className="text-[#00A3FF] font-bold">*</span> No spam, just awesome updates.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ---------- FOOTER BAR ---------- */}
                <div className="bg-[#161719] px-6 py-6 md:px-12 md:py-8 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6">

                    {/* Copyright & Logo */}
                    <div className="flex flex-col gap-2">
                        <p className="text-[#888891] text-[13px] md:text-[14px]">© {currentYear} [ Inspira Worldwide ] All rights reserved.</p>
                        <p className="text-[#888891] text-[13px] md:text-[14px]">Designed by ARC AI</p>
                    </div>

                    {/* Socials & Top Button */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between ml-auto">
                        {/* Social Links */}
                        <div className="flex items-center gap-4 text-[#888891]">
                            <a href="#" aria-label="LinkedIn" className="hover:text-[#00A3FF] transition-colors"><Linkedin className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="Twitter/X" className="hover:text-[#00A3FF] transition-colors"><Twitter className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-[#00A3FF] transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="YouTube" className="hover:text-[#00A3FF] transition-colors"><Youtube className="w-[18px] h-[18px]" /></a>
                            <a href="#" aria-label="WhatsApp" className="hover:text-[#00A3FF] transition-colors"><MessageCircle className="w-[18px] h-[18px]" /></a>
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
