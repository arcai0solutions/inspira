"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowingMenu from "@/components/FlowingMenu";
import Footer from "@/components/Footer";
import { HeartPulse, TrendingUp, Zap, ArrowUpRight, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function CareersClient() {
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
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        gsap.set(".careers-hero-line", { y: 120, opacity: 0, rotateX: 20 });
        gsap.set(".careers-hero-sub", { y: 40, opacity: 0 });
        gsap.set(".careers-btn", { y: 20, opacity: 0 });

        tl.to(".careers-hero-line", {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.15,
            delay: 0.2
        })
            .to(".careers-hero-sub", {
                y: 0,
                opacity: 1,
                duration: 1.2,
            }, "-=1")
            .to(".careers-btn", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1
            }, "-=0.8");

        const sections = gsap.utils.toArray('.reveal-section');
        sections.forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    }
                }
            );
        });

        ScrollTrigger.create({
            trigger: ".culture-container",
            start: "top top",
            end: "bottom bottom",
            pin: ".culture-title",
            pinSpacing: false,
        });

    }, { scope: container });

    return (
        <div ref={container} className="relative w-full flex flex-col bg-white text-[#121212] pt-24 lg:pt-32">
            {/* Global Structural Grid Lines */}
            <div className="fixed inset-0 pointer-events-none z-0 flex justify-center max-w-[1920px] mx-auto w-full opacity-40">
                <div className="w-full h-full border-l border-r border-zinc-200/60 max-w-7xl relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200/60 -translate-x-1/2" />
                    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-zinc-200/60 -translate-x-1/2 hidden lg:block" />
                    <div className="absolute left-3/4 top-0 bottom-0 w-px bg-zinc-200/60 -translate-x-1/2 hidden lg:block" />
                </div>
            </div>

            {/* Background Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')", backgroundSize: "300px" }} />

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

            {/* Top Navigation */}
            <div className="absolute top-0 left-0 w-full z-[60] px-6 md:px-16 pt-4 md:pt-6 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
                <a href="/" className="pointer-events-auto">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className={`object-contain w-auto h-16 md:h-20 transition-all duration-300 ${isMenuOpen ? "brightness-0 invert" : "filter invert-0"} will-change-transform`}
                    />
                </a>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`cursor-pointer pointer-events-auto px-8 py-3 rounded-full font-bold transition-all duration-300 uppercase tracking-widest text-xs mt-2 md:mt-3 flex items-center gap-2 group ${isMenuOpen
                        ? "bg-white text-zinc-900 border border-zinc-200"
                        : "bg-white text-black hover:bg-zinc-100 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                        }`}
                >
                    <div className="w-2 h-2 rounded-full bg-current group-hover:scale-150 transition-transform duration-300" />
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Main Content Wrapper */}
            <div className={`relative z-20 w-full flex flex-col transition-opacity duration-500 overflow-hidden ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                {/* HERO SECTION */}
                <div className="w-full min-h-[85vh] flex flex-col justify-center items-center relative overflow-hidden px-6">
                    {/* Optimized Gradients */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] pointer-events-none opacity-30">
                        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00A3FF]/20 rounded-full blur-[80px]" />
                        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#38bdf8]/20 rounded-full blur-[80px]" />
                    </div>

                    <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-10 pt-10">
                        <h1 className="text-[8vw] sm:text-[6vw] md:text-[50px] lg:text-[60px] xl:text-[75px] font-medium leading-[0.9] tracking-tighter text-[#121212] uppercase flex flex-col perspective-1000">
                            <span className="overflow-hidden pb-4"><span className="inline-block careers-hero-line font-medium origin-bottom">Build a Career</span></span>
                            <span className="overflow-hidden pb-4"><span className="inline-block careers-hero-line font-medium origin-bottom text-zinc-400">That Moves</span></span>
                            <span className="overflow-hidden pb-4"><span className="inline-block careers-hero-line font-medium origin-bottom">Healthcare Forward.</span></span>
                        </h1>

                        <p className="careers-hero-sub text-zinc-600 text-lg md:text-2xl font-light leading-relaxed max-w-3xl mt-12 mb-16 mx-auto">
                            Join Inspira Worldwide and become part of a dynamic team shaping <strong className="font-medium text-[#121212]">pharmaceutical distribution</strong>, marketing, and healthcare logistics across Sri Lanka.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full sm:w-auto px-4 items-center justify-center">
                            <a href="#opportunities" className="careers-btn group relative overflow-hidden bg-[#121212] text-white px-10 py-5 rounded-full font-medium transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-3">
                                <span className="relative z-10">View Opportunities</span>
                                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF] to-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                            </a>
                            <a href="mailto:careers@inspiraworldwide.com" className="careers-btn group flex items-center justify-center gap-3 px-10 py-5 rounded-full font-medium text-[#121212] transition-colors duration-300 w-full sm:w-auto text-center hover:bg-zinc-100">
                                Submit Your CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* SECTION 1: CULTURE - STICKY SPLIT LAYOUT */}
                <div className="w-full bg-[#FAFAFA] border-t border-zinc-200 relative z-10 culture-container">
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2">
                        {/* Sticky Left Side */}
                        <div className="lg:border-r border-zinc-200 p-8 md:p-16 lg:p-24 relative">
                            <div className="culture-title lg:sticky lg:top-32">
                                <h2 className="reveal-section text-sm font-bold text-[#00A3FF] uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                                    <span className="w-8 h-px bg-[#00A3FF]" />
                                    Our Culture
                                </h2>
                                <h3 className="reveal-section text-[40px] md:text-[56px] lg:text-[64px] font-medium text-[#121212] leading-[1.05] tracking-tight">
                                    A Culture Built on Energy, Skill, and Purpose.
                                </h3>
                            </div>
                        </div>

                        {/* Scrolling Right Side */}
                        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center gap-12 text-zinc-600 font-light text-[20px] md:text-[24px] leading-[1.6]">
                            <p className="reveal-section">
                                At Inspira Worldwide, our people are the driving force behind everything we do. Our success is built on the knowledge, energy, and dedication of our teams across <strong className="font-medium text-[#121212]">field operations, marketing, logistics, and management.</strong>
                            </p>
                            <p className="reveal-section">
                                We foster a culture that values inventiveness, practical thinking, and a shared commitment to excellence at every level.
                            </p>
                            <div className="reveal-section w-full h-[1px] bg-gradient-to-r from-zinc-200 via-zinc-300 to-transparent my-4" />
                            <p className="reveal-section">
                                Guided by our core values of speed and flexibility, we create an environment where people are encouraged to contribute ideas, solve challenges, and grow with confidence while supporting a stronger healthcare system in Sri Lanka.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: WHY JOIN INSPIRA */}
                <div className="w-full bg-[#060010] text-white pt-24 pb-32 px-6 relative overflow-hidden border-b border-zinc-800">
                    {/* Optimized light/blur effects */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

                    <div className="max-w-7xl mx-auto flex flex-col relative z-10 mt-10">
                        <div className="mb-20 md:mb-32 max-w-3xl">
                            <h2 className="reveal-section text-sm font-bold text-[#38bdf8] uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                                <span className="w-8 h-px bg-[#38bdf8]" />
                                Why Inspira?
                            </h2>
                            <h3 className="reveal-section text-[48px] md:text-[72px] font-medium leading-[1] tracking-tight text-white mb-8">
                                More than a job.<br />A mission.
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                            {[
                                {
                                    icon: HeartPulse,
                                    title: "Meaningful Impact",
                                    text: "Your work directly supports the delivery of essential medicines across Sri Lanka, helping improve access to healthcare and contributing to better outcomes for patients."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Professional Growth",
                                    text: "We provide practical support, ongoing learning, and exposure to the contemporary pharmaceutical market to strengthen your expertise alongside industry professionals."
                                },
                                {
                                    icon: Zap,
                                    title: "Dynamic Environment",
                                    text: "Inspira offers a growth-oriented environment where energy, inventiveness, and commitment translate into real business impact and long-term career development."
                                }
                            ].map((card, i) => (
                                <div key={i} className="reveal-section group relative bg-white/[0.02] border border-white/[0.05] rounded-[32px] p-10 md:p-12 overflow-hidden hover:bg-white/[0.04] backdrop-blur-xl transition-colors duration-500 h-[400px] flex flex-col justify-between">
                                    <div className="absolute -inset-px bg-gradient-to-b from-[#00A3FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[32px]" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-[#38bdf8] mb-8 group-hover:scale-110 group-hover:bg-[#00A3FF]/20 transition-all duration-500">
                                            <card.icon strokeWidth={1.5} size={28} />
                                        </div>
                                        <div className="mt-auto">
                                            <h4 className="text-[28px] font-medium mb-4 text-white tracking-tight">{card.title}</h4>
                                            <p className="text-white/60 font-light leading-relaxed text-[17px] group-hover:text-white/80 transition-colors duration-300">
                                                {card.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECTION 3: OPPORTUNITIES */}
                <div id="opportunities" className="w-full bg-[#FAFAFA] flex flex-col items-center justify-center py-24 md:py-40 px-6 relative z-10">
                    <div className="absolute inset-0 bg-grid-zinc-200/[0.4] bg-[size:24px_24px]" />

                    <div className="max-w-5xl mx-auto flex flex-col text-center items-center relative z-10">
                        <h2 className="reveal-section text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-medium text-[#121212] leading-[0.9] tracking-tighter mb-10">
                            Ready to make <br /><span className="text-zinc-400">your mark?</span>
                        </h2>
                        <p className="reveal-section text-zinc-600 text-[18px] md:text-[22px] leading-[1.8] font-light mb-16 max-w-3xl mx-auto">
                            We are always looking for driven individuals who want to make a real contribution in pharmaceutical distribution. Whether your strengths lie in field operations, marketing, logistics, or business support, Inspira offers the opportunity to build a rewarding career.
                        </p>

                        <div className="reveal-section p-[1px] rounded-full bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 overflow-hidden shadow-2xl">
                            <a href="mailto:careers@inspiraworldwide.com" className="relative group bg-white hover:bg-zinc-50 flex items-center justify-center px-12 py-6 rounded-full overflow-hidden transition-all duration-300">
                                <span className="relative z-10 text-[18px] md:text-[20px] font-medium text-[#121212] mr-4">Contact HR</span>
                                <div className="relative z-10 w-12 h-12 rounded-full bg-[#121212] flex items-center justify-center text-white group-hover:bg-[#00A3FF] transition-colors duration-300">
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
