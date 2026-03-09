"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FlowingMenu from '@/components/FlowingMenu';
import WhyUs from '@/components/WhyUs';
import Services from '@/components/Services';
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP);

export default function HomeClient() {
    const container = useRef<HTMLDivElement>(null);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);
    const hasExited = useRef(false);

    const menuItems = [
        { link: '/', text: 'Home', image: '/menu_home_compressed.jpg' },
        { link: '/about', text: 'About', image: '/menu_about_compressed.jpg' },
        { link: '#', text: 'Products', image: '/menu_products_compressed.jpg' },
        { link: '/news', text: 'Newsroom', image: '/menu_newsroom_compressed.jpg' },
        { link: '/collaboration', text: 'Collaboration', image: '/menu_collaboration_compressed.jpg' },
        { link: '/careers', text: 'Careers', image: '/menu_careers_compressed.jpg' },
        { link: '/contact', text: 'Contact', image: '/menu_contact_compressed.jpg' }
    ];

    // Exit preloader with smooth animation
    const exitPreloader = useCallback(() => {
        if (hasExited.current || !preloaderRef.current) return;
        hasExited.current = true;

        gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => setShowPreloader(false),
        });
    }, []);

    // Safety timeout: hide preloader after 2s max even if video hasn't loaded
    useEffect(() => {
        const timeout = setTimeout(exitPreloader, 2000);
        return () => clearTimeout(timeout);
    }, [exitPreloader]);

    // When video is ready to play through, exit preloader
    const handleVideoReady = useCallback(() => {
        exitPreloader();
    }, [exitPreloader]);


    return (
        <main className="min-h-screen bg-white p-[5px]">

            {/* ── Preloader ──────────────────────── */}
            {showPreloader && (
                <div
                    ref={preloaderRef}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                    aria-live="polite"
                >
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative overflow-hidden">
                            <span className="preloader-typing-text text-white/90 text-3xl md:text-5xl font-light tracking-wide">
                                Your Pharmaceutical Distribution Partner.
                            </span>
                        </div>
                    </div>

                    {/* CSS typing animation */}
                    <style>{`
                        .preloader-typing-text {
                            display: inline-block;
                            overflow: hidden;
                            white-space: nowrap;
                            border-right: 2px solid rgba(0, 163, 255, 0.8);
                            width: 0;
                            animation:
                                typing 2s steps(42, end) forwards,
                                blink 0.6s step-end infinite;
                        }
                        @keyframes typing {
                            from { width: 0; }
                            to { width: 100%; }
                        }
                        @keyframes blink {
                            50% { border-color: transparent; }
                        }
                    `}</style>
                </div>
            )}

            <div ref={container} className="relative w-full h-[calc(100vh-10px)] rounded-[2rem] overflow-hidden flex flex-col justify-end">
                {/* Background Video — loads while preloader is showing */}
                <video
                    ref={videoRef}
                    src="/hero-vid-compressed.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    suppressHydrationWarning
                    aria-hidden="true"
                    onCanPlayThrough={handleVideoReady}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-black/40" aria-hidden="true" />

                {/* Flowing Menu Overlay */}
                <div
                    id="main-navigation"
                    className={`fixed inset-0 z-30 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10%] pointer-events-none'
                        }`}
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
                <div className="absolute top-0 left-0 w-full z-40 px-6 md:px-16 pt-6 md:pt-10 flex justify-between items-start pointer-events-none">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className="pointer-events-auto object-contain w-auto h-16 md:h-20 opacity-90 transition-opacity duration-300"
                        style={{ opacity: isMenuOpen ? 0 : 0.9 }}
                    />

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="main-navigation"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        className="cursor-pointer pointer-events-auto bg-white text-zinc-900 border-b-[6px] border-zinc-300 active:border-b-0 active:translate-y-[6px] px-8 py-3 rounded-full font-extrabold transition-all duration-150 shadow-[0_4px_10px_rgba(0,0,0,0.15)] uppercase tracking-wider text-sm mt-2 md:mt-3"
                    >
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </div>

                {/* Hero Content - Bottom Left */}
                <div
                    className={`relative z-20 w-full px-6 md:px-12 pb-16 md:pb-28 flex justify-start transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="w-fit max-w-[950px] bg-black/40 backdrop-blur-[16px] border border-white/10 p-4 md:py-8 md:pl-8 md:pr-10 rounded-[2rem] shadow-2xl">

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-5">
                            Precision Distribution.<br />
                            <span className="text-zinc-300">Expanding Your Market Reach.</span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                            We are Sri Lanka's definitive pharmaceutical distribution outsourcing partner.
                            From strategic brand building to risk-minimized logistics, we connect domestic manufacturers
                            to patients with unmatched speed, flexibility, and absolute reliability.
                        </p>

                    </div>
                </div>

            </div>
            <WhyUs />
            <Services />
            <Process />
            <FAQ />
            <Footer />
        </main>
    );
}
