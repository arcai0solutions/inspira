"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FlowingMenu from '@/components/FlowingMenu';
import { useScrollLock } from '@/hooks/useScrollLock';
import HeroBanner from '@/components/HeroBanner';
import WhyUs from '@/components/WhyUs';
import Infrastructure from '@/components/Infrastructure';
import Services from '@/components/Services';
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP);

export default function HomeClient() {
    const container = useRef<HTMLDivElement>(null);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useScrollLock(isMenuOpen);
    const [showPreloader, setShowPreloader] = useState(true);
    const hasExited = useRef(false);
    const typingDone = useRef(false);
    const bannerReady = useRef(false);
    const [typedText, setTypedText] = useState("");
    const fullText = "Your Pharmaceutical Distribution Partner.";

    const menuItems = [
        { link: '/', text: 'Home', image: '/menu_home_compressed.jpg' },
        { link: '/about', text: 'About', image: '/menu_about_compressed.jpg' },
        { link: '/products', text: 'Products', image: '/menu_products_compressed.jpg' },
        { link: '/news', text: 'Newsroom', image: '/menu_newsroom_compressed.jpg' },
        { link: '/articles', text: 'Articles', image: '/menu_newsroom_compressed.jpg' },
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

    // Only exit when BOTH typing is done AND the first banner has painted (or safety timeout)
    const tryExit = useCallback(() => {
        if (typingDone.current && bannerReady.current) {
            exitPreloader();
        }
    }, [exitPreloader]);

    // Character-by-character typing effect
    useEffect(() => {
        let charIndex = 0;
        const speed = 50; // ms per character
        const interval = setInterval(() => {
            charIndex++;
            setTypedText(fullText.slice(0, charIndex));
            if (charIndex >= fullText.length) {
                clearInterval(interval);
                // Brief pause after typing completes, then mark done
                setTimeout(() => {
                    typingDone.current = true;
                    tryExit();
                }, 400);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [tryExit]);

    // Safety timeout: if the banner STILL hasn't loaded after 4s, force-mark it ready
    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            bannerReady.current = true;
            tryExit();
        }, 4000);
        return () => clearTimeout(safetyTimeout);
    }, [tryExit]);

    // When the first banner image has painted, mark it and try to exit
    const handleBannerReady = useCallback(() => {
        bannerReady.current = true;
        tryExit();
    }, [tryExit]);


    return (
        <main className="min-h-screen bg-white p-[5px]">

            {/* ── Preloader ──────────────────────── */}
            {showPreloader && (
                <div
                    ref={preloaderRef}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center px-6"
                    aria-live="polite"
                >
                    <div className="flex flex-col items-center gap-6 w-full max-w-[90vw] md:max-w-[700px]">
                        <p className="text-white/90 text-xl sm:text-2xl md:text-5xl font-light tracking-wide text-center leading-relaxed">
                            {typedText}
                            <span className="preloader-cursor" />
                        </p>
                    </div>

                    <style>{`
                        .preloader-cursor {
                            display: inline-block;
                            width: 2px;
                            height: 1em;
                            background: rgba(0, 163, 255, 0.8);
                            margin-left: 2px;
                            vertical-align: text-bottom;
                            animation: cursorBlink 0.6s step-end infinite;
                        }
                        @keyframes cursorBlink {
                            50% { opacity: 0; }
                        }
                    `}</style>
                </div>
            )}

            {/* Full-bleed 16:9 banner, always inside the fold.
                Width is always 100% so it runs edge to edge with the same 5px gutter as
                the bottom. aspect-video sets the height; max-h clamps it to the viewport
                on wide/short screens, where object-cover then takes a slight centre crop.
                On phones and normal desktops the 16:9 height is well under the viewport,
                so nothing clamps and the artwork is shown whole — no mobile zoom. */}
            <div
                ref={container}
                className="relative w-full aspect-video max-h-[calc(100vh_-_10px)] rounded-[1rem] md:rounded-[2rem] overflow-hidden"
            >

                {/* Rotating hero banners — managed from /admin/banners */}
                <HeroBanner hidden={isMenuOpen} onReady={handleBannerReady} />

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
                <div className="absolute top-0 left-0 w-full z-40 px-4 md:px-16 pt-4 md:pt-10 flex justify-between items-start pointer-events-none">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className="pointer-events-auto object-contain w-auto h-10 sm:h-14 md:h-20 opacity-90 transition-opacity duration-300"
                        style={{ opacity: isMenuOpen ? 0 : 0.9 }}
                    />

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="main-navigation"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        className="cursor-pointer pointer-events-auto bg-white text-zinc-900 border-b-[4px] md:border-b-[6px] border-zinc-300 active:border-b-0 active:translate-y-[4px] md:active:translate-y-[6px] px-5 py-2 md:px-8 md:py-3 rounded-full font-extrabold transition-all duration-150 shadow-[0_4px_10px_rgba(0,0,0,0.15)] uppercase tracking-wider text-xs md:text-sm mt-1 md:mt-3"
                    >
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </div>

            </div>
            <WhyUs />
            <Infrastructure />
            <Services />
            <Process />
            <FAQ />
            <Footer />
        </main>
    );
}
