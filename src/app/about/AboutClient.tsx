"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

export default function AboutClient() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { link: "/", text: "Home", image: "/menu_home_compressed.jpg" },
        { link: "/about", text: "About", image: "/menu_about_compressed.jpg" },
        { link: "/products", text: "Products", image: "/menu_products_compressed.jpg" },
        { link: "/news", text: "Newsroom", image: "/menu_newsroom_compressed.jpg" },
        { link: "/collaboration", text: "Collaboration", image: "/menu_collaboration_compressed.jpg" },
        { link: "/careers", text: "Careers", image: "/menu_careers_compressed.jpg" },
        { link: "/contact", text: "Contact", image: "/menu_contact_compressed.jpg" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(".about-fade-in", { y: 30, opacity: 0 });

        tl.to(".about-fade-in", {
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

            {/* About Page Grid Layout */}
            <div className={`relative z-20 w-full flex flex-col transition-opacity duration-500 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                <div className="w-full flex flex-col border-t border-b border-zinc-200 overflow-hidden bg-white shadow-sm mt-4">

                    {/* High Impact Full-Width Header */}
                    <div className="w-full border-b border-zinc-200 p-8 py-10 md:py-16 md:px-16 flex flex-col md:flex-row items-start md:items-end justify-between bg-[#FAFAFA] overflow-hidden gap-8">
                        <h1 className="about-fade-in text-[10vw] sm:text-[8vw] md:text-[80px] lg:text-[100px] font-medium leading-[0.9] tracking-tighter text-[#121212]">
                            About Us.
                        </h1>
                        <div className="about-fade-in max-w-lg">
                            <p className="text-zinc-600 text-lg md:text-xl font-light leading-relaxed">
                                A fully integrated pharmaceutical distribution partner built for growth, reliability, and long-term value.
                            </p>
                        </div>
                    </div>

                    {/* Main Content Sections */}
                    <div className="w-full flex flex-col xl:flex-row">

                        {/* Section 1: Who We Are (Left or Top) */}
                        <div className="xl:w-1/2 p-8 md:p-16 border-b xl:border-b-0 xl:border-r border-zinc-200 bg-white flex flex-col justify-center">
                            <h2 className="about-fade-in text-[18px] font-semibold text-[#00A3FF] uppercase tracking-widest mb-4">Who We Are</h2>
                            <h3 className="about-fade-in text-[32px] md:text-[40px] font-medium text-[#121212] leading-tight mb-8">
                                Inspira Worldwide Private Limited
                            </h3>
                            <p className="about-fade-in text-zinc-600 text-lg leading-relaxed font-light mb-6">
                                A dynamic distribution specialist serving domestic pharmaceutical manufacturers in Sri Lanka. As the exclusive marketing and distribution arm of Newgen Lanka Healthcare Pvt Ltd, while also supporting other local manufacturers, Inspira delivers integrated solutions across promotions, marketing, brand building, and distribution.
                            </p>
                            <p className="about-fade-in text-zinc-600 text-lg leading-relaxed font-light">
                                With strong industry knowledge, valuable market connections, and a commitment to service excellence, Inspira helps partners navigate the demands of the modern pharmaceutical market with confidence. The company's focus remains on quality, innovation, and creating meaningful impact for patients through every product in its portfolio.
                            </p>
                        </div>

                        {/* Section 2: Vision, Mission & Values (Right or Bottom) */}
                        <div className="xl:w-1/2 bg-[#FAFAFA] flex flex-col">

                            <div className="p-8 md:p-16 border-b border-zinc-200 flex-1 flex flex-col justify-center">
                                <h2 className="about-fade-in text-[18px] font-semibold text-[#00A3FF] uppercase tracking-widest mb-4">Driven by Purpose</h2>
                                <h3 className="about-fade-in text-[28px] md:text-[32px] font-medium text-[#121212] leading-tight mb-6">
                                    Our direction is shaped by a clear vision, a meaningful mission, and values that guide every decision.
                                </h3>
                                <p className="about-fade-in text-zinc-600 text-lg leading-relaxed font-light mb-6">
                                    Inspira's vision is to strengthen its position as one of Sri Lanka's leading pharmaceutical distribution companies through long-term business relationships, technology, innovation, and customized solutions.
                                </p>
                                <p className="about-fade-in text-zinc-600 text-lg leading-relaxed font-light mb-8">
                                    Its mission is simple yet powerful: to support a healthier life by improving the quality and health of every Sri Lankan through high-quality products and services, customer-focused initiatives, and dependable results.
                                </p>

                                <div className="about-fade-in mt-auto flex flex-col sm:flex-row gap-6">
                                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex-1">
                                        <h4 className="text-[16px] font-medium text-[#121212] mb-2 uppercase tracking-wide">Core Values</h4>
                                        <p className="text-zinc-600 font-light leading-relaxed">Speed and flexibility, supported by deep industry knowledge and energetic teams.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex-1">
                                        <h4 className="text-[16px] font-medium text-[#121212] mb-2 uppercase tracking-wide">Ambition</h4>
                                        <p className="text-zinc-600 font-light leading-relaxed">To deliver state-of-the-art logistics while remaining the first choice for partners.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Section 3: Team & Distribution Excellence - Full Width Premium Block */}
                    <div className="w-full bg-[#121212] text-white p-8 md:p-16 lg:p-24 relative overflow-hidden">
                        {/* Optimized blur highlights */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3FF]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#38bdf8]/10 rounded-full blur-[60px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

                        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                            <h2 className="about-fade-in text-[18px] font-semibold text-[#00A3FF] uppercase tracking-widest mb-4">The Strength Behind Our Service</h2>
                            <h3 className="about-fade-in text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.1] tracking-tight mb-8">
                                A capable team and a dependable distribution network working together to deliver results across the island.
                            </h3>

                            <div className="about-fade-in grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <h4 className="text-[20px] font-medium mb-4">People-First Expertise</h4>
                                    <p className="text-white/70 font-light leading-relaxed text-lg">
                                        Inspira's promotions and marketing teams provide straightforward and effective support using trusted methods and practical market expertise. The company works closely with partners to establish and grow their presence in the local market through strategies aligned with their broader business goals.
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <h4 className="text-[20px] font-medium mb-4">Island-Wide Reach</h4>
                                    <p className="text-white/70 font-light leading-relaxed text-lg">
                                        This strength is reinforced by direct distribution channels designed for timely delivery regardless of location. With effective storage, reduced risk during handling, and a strong focus on minimizing wastage and warehouse costs, Inspira offers a dependable platform for sustainable business growth.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
