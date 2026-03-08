"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import { MapPin, Phone, Mail, ArrowRight, Linkedin, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

export default function ContactClient() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { link: "/", text: "Home", image: "/menu_home_compressed.jpg" },
        { link: "/about", text: "About", image: "/menu_about_compressed.jpg" },
        { link: "#", text: "Products", image: "/menu_products_compressed.jpg" },
        { link: "#", text: "Newsroom", image: "/menu_newsroom_compressed.jpg" },
        { link: "#", text: "Collaboration", image: "/menu_collaboration_compressed.jpg" },
        { link: "/careers", text: "Careers", image: "/menu_careers_compressed.jpg" },
        { link: "/contact", text: "Contact", image: "/menu_contact_compressed.jpg" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(".contact-fade-in", { y: 30, opacity: 0 });

        tl.to(".contact-fade-in", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            delay: 0.2
        });
    }, { scope: container });

    return (
        <div ref={container} className="relative w-full flex flex-col pt-24 lg:pt-32 bg-white text-[#121212]">
            {/* Background Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')", backgroundSize: "400px", mixBlendMode: 'overlay' }} />

            {/* Flowing Menu Overlay */}
            <div
                id="main-navigation"
                className={`fixed inset-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10%] pointer-events-none"}`}
                aria-hidden={!isMenuOpen}
            >
                <FlowingMenu
                    items={menuItems}
                    speed={15}
                    textColor="#ffffff"
                    bgColor="rgba(6, 0, 16, 0.95)"
                    marqueeBgColor="#ffffff"
                    marqueeTextColor="#060010"
                    borderColor="rgba(255, 255, 255, 0.1)"
                />
            </div>

            {/* Top Navigation / Logo Area */}
            <div className="absolute top-0 left-0 w-full z-[60] px-6 md:px-16 pt-4 md:pt-6 flex justify-between items-start pointer-events-none">
                <a href="/" className="pointer-events-auto">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className={`object-contain w-auto h-16 md:h-20 transition-all duration-300 ${isMenuOpen ? "invert-0" : "invert"}`}
                    />
                </a>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    className={`cursor-pointer pointer-events-auto border-b-[6px] active:border-b-0 active:translate-y-[6px] px-8 py-3 rounded-full font-extrabold transition-all duration-150 shadow-[0_4px_10px_rgba(0,0,0,0.15)] uppercase tracking-wider text-sm mt-2 md:mt-3 ${isMenuOpen
                        ? "bg-white text-zinc-900 border-zinc-300"
                        : "bg-black text-white border-zinc-700 hover:bg-zinc-900"
                        }`}
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Contact Page Grid Layout directly expanding to edges */}
            <div className={`relative z-20 w-full flex flex-col transition-opacity duration-500 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                <div className="w-full flex flex-col border-t border-b border-zinc-200 overflow-hidden bg-white shadow-sm mt-4">

                    {/* High Impact Full-Width Header */}
                    <div className="w-full border-b border-zinc-200 p-8 py-10 md:py-16 flex items-center justify-start md:justify-center bg-[#FAFAFA] overflow-hidden">
                        <h1 className="contact-fade-in text-[10vw] sm:text-[8vw] md:text-[80px] lg:text-[100px] font-medium leading-[0.9] tracking-tighter text-[#121212]">
                            Let's Talk.
                        </h1>
                    </div>

                    {/* Two Columns Grid Area spanning full width */}
                    <div className="w-full grid grid-cols-1 xl:grid-cols-12">

                        {/* Left Column (span 4 or 5) */}
                        <div className="col-span-1 xl:col-span-5 flex flex-col border-b xl:border-b-0 xl:border-r border-zinc-200 bg-white">

                            {/* Follow us block */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 md:p-12 xl:p-16 border-b border-zinc-200 contact-fade-in">
                                <h3 className="text-[20px] font-medium text-[#121212]">Follow us</h3>
                                <div className="flex items-center gap-5 text-zinc-500">
                                    <a href="#" className="hover:text-[#00A3FF] transition-colors"><Linkedin size={22} strokeWidth={1.5} /></a>
                                    <a href="#" className="hover:text-[#00A3FF] transition-colors"><Twitter size={22} strokeWidth={1.5} /></a>
                                    <a href="#" className="hover:text-[#00A3FF] transition-colors"><Instagram size={22} strokeWidth={1.5} /></a>
                                    <a href="#" className="hover:text-[#00A3FF] transition-colors"><Youtube size={22} strokeWidth={1.5} /></a>
                                    <a href="#" className="hover:text-[#00A3FF] transition-colors"><MessageCircle size={22} strokeWidth={1.5} /></a>
                                </div>
                            </div>

                            {/* What we offer block */}
                            <div className="flex-1 p-8 md:p-12 xl:p-16 border-b border-zinc-200 contact-fade-in bg-[#FAFAFA]">
                                <h3 className="text-[22px] font-medium text-[#121212] mb-8">What we offer</h3>
                                <ul className="flex flex-col gap-4 text-zinc-600 text-[16px] xl:text-[18px] pl-4 list-disc marker:text-[#00A3FF] font-light">
                                    <li>Island-Wide Distribution</li>
                                    <li>Strategic Brand Building</li>
                                    <li>Risk-Minimized Warehousing</li>
                                    <li>Market Access Support</li>
                                    <li>Supply Chain Coordination</li>
                                </ul>
                            </div>

                            {/* Contact info grid block (split into two) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 contact-fade-in">
                                {/* Digital */}
                                <div className="p-8 md:p-10 xl:p-12 border-b sm:border-b-0 sm:border-r border-zinc-200 flex flex-col justify-between min-h-[260px] bg-white">
                                    <div className="flex items-center gap-3 text-[#121212] mb-6">
                                        <Mail size={20} className="text-[#121212]" strokeWidth={1.5} />
                                        <span className="text-[18px] font-medium">Digital</span>
                                    </div>
                                    <a href="mailto:hello@inspiraworldwide.com" className="text-zinc-600 hover:text-[#00A3FF] transition-colors text-[16px] break-all leading-relaxed font-light mt-auto">
                                        hello@<br />inspiraworldwide.com
                                    </a>
                                </div>

                                {/* Office */}
                                <div className="p-8 md:p-10 xl:p-12 flex flex-col justify-between min-h-[260px] bg-white">
                                    <div className="flex items-center gap-3 text-[#121212] mb-6">
                                        <MapPin size={20} className="text-[#121212]" strokeWidth={1.5} />
                                        <span className="text-[18px] font-medium">Office</span>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-6">
                                        <p className="text-zinc-600 text-[15px] leading-relaxed font-light">
                                            No. 45, Baseline Road<br />
                                            Colombo 08<br />
                                            Sri Lanka
                                        </p>
                                        <a href="tel:+94713876936" className="text-[#121212] text-[24px] font-medium hover:text-[#00A3FF] transition-colors tracking-tight">
                                            +94 713 876 936
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (span 7) */}
                        <div className="col-span-1 xl:col-span-7 flex flex-col">

                            {/* Form Header */}
                            <div className="p-8 md:p-12 xl:p-16 border-b border-zinc-200 bg-white contact-fade-in">
                                <h2 className="text-[32px] md:text-[40px] xl:text-[48px] font-medium text-[#121212] mb-4 tracking-tight">Got a question, challenge, or idea?</h2>
                                <p className="text-zinc-500 text-[16px] md:text-[18px] font-light">Fill out the form — we'll get back to you shortly.</p>
                            </div>

                            {/* Form Fields */}
                            <form className="flex flex-col flex-1" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="contact-fade-in w-full bg-transparent border-b border-zinc-200 p-8 md:px-12 xl:px-16 md:py-10 text-[#121212] placeholder-zinc-400 focus:outline-none focus:bg-[#FAFAFA] transition-colors text-[18px] font-light"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="contact-fade-in w-full bg-transparent border-b border-zinc-200 p-8 md:px-12 xl:px-16 md:py-10 text-[#121212] placeholder-zinc-400 focus:outline-none focus:bg-[#FAFAFA] transition-colors text-[18px] font-light"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Your Company"
                                    className="contact-fade-in w-full bg-transparent border-b border-zinc-200 p-8 md:px-12 xl:px-16 md:py-10 text-[#121212] placeholder-zinc-400 focus:outline-none focus:bg-[#FAFAFA] transition-colors text-[18px] font-light"
                                />
                                <textarea
                                    placeholder="Your message"
                                    className="contact-fade-in w-full flex-1 min-h-[300px] bg-transparent border-b border-zinc-200 p-8 md:px-12 xl:px-16 md:py-10 text-[#121212] placeholder-zinc-400 focus:outline-none focus:bg-[#FAFAFA] transition-colors text-[18px] resize-none font-light"
                                    required
                                />

                                {/* Form Footer / Submit */}
                                <div className="contact-fade-in p-8 md:p-12 xl:p-16 flex flex-col sm:flex-row justify-between sm:items-center gap-8 bg-[#FAFAFA] mt-auto">
                                    <p className="text-zinc-500 text-[15px]">
                                        <span className="italic">By submitting, you agree to our </span>
                                        <a href="#" className="text-[#00A3FF] hover:underline not-italic">Privacy Policy.</a>
                                    </p>
                                    <button
                                        type="submit"
                                        className="bg-[#00A3FF] hover:bg-[#121212] text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl flex justify-center items-center transition-all duration-300 hover:scale-[1.05] shadow-[0_4px_14px_rgba(0,163,255,0.3)] shrink-0 self-end sm:self-auto group"
                                    >
                                        <ArrowRight className="w-7 h-7 md:w-8 md:h-8 group-hover:-rotate-45 transition-transform duration-300" />
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
