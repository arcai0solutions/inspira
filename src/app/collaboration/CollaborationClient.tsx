"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowingMenu from "@/components/FlowingMenu";
import { useScrollLock } from "@/hooks/useScrollLock";
import Footer from "@/components/Footer";
import { ShieldCheck, TrendingUp, Globe, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function CollaborationClient() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useScrollLock(isMenuOpen);

    const menuItems = [
        { link: "/", text: "Home", image: "/menu_home_compressed.jpg" },
        { link: "/about", text: "About", image: "/menu_about_compressed.jpg" },
        { link: "/products", text: "Products", image: "/menu_products_compressed.jpg" },
        { link: "/news", text: "Newsroom", image: "/menu_newsroom_compressed.jpg" },
        { link: "/articles", text: "Articles", image: "/menu_newsroom_compressed.jpg" },
        { link: "/collaboration", text: "Collaboration", image: "/menu_collaboration_compressed.jpg" },
        { link: "/careers", text: "Careers", image: "/menu_careers_compressed.jpg" },
        { link: "/contact", text: "Contact", image: "/menu_contact_compressed.jpg" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        gsap.set(".collab-hero-line", { y: 120, opacity: 0, rotateX: 20 });
        gsap.set(".collab-hero-sub", { y: 40, opacity: 0 });
        gsap.set(".collab-graphic", { scale: 0.8, opacity: 0, rotation: -15 });

        tl.to(".collab-hero-line", {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.15,
            delay: 0.2
        })
            .to(".collab-hero-sub", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1
            }, "-=1")
            .to(".collab-graphic", {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.6,
                ease: "back.out(1.2)"
            }, "-=1.2");

        // Meaningful Network Animations
        gsap.set(".collab-path-base", { strokeDasharray: "4,6" });
        gsap.set(".collab-path-solid", { strokeDasharray: 300, strokeDashoffset: 300 });
        gsap.set(".collab-node, .collab-node-inner", { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.set(".collab-hub", { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.set(".collab-packet", { opacity: 0 });

        // Enter Animation for Network
        const networkTl = gsap.timeline({ delay: 1.5 });

        networkTl.to(".collab-hub", { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" })
            .to(".collab-path-solid", { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.1 }, "-=0.5")
            .to(".collab-node", { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)", stagger: 0.1 }, "-=1")
            .to(".collab-node-inner", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.1 }, "-=0.8")
            .to(".collab-network-badge", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1");

        // Continuous Hub Pulse
        gsap.to(".collab-hub-pulse", {
            scale: 2,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power2.out",
            transformOrigin: "center center"
        });

        // Packets Flowing (Data/Distribution routing to nodes)
        gsap.utils.toArray('.collab-packet').forEach((packet: any, i) => {
            const endX = parseFloat(packet.getAttribute('data-endx') || '200');
            const endY = parseFloat(packet.getAttribute('data-endy') || '200');

            const packetTl = gsap.timeline({ repeat: -1, delay: i * 0.4 + 2.5 });
            packetTl.fromTo(packet,
                { cx: 200, cy: 200, opacity: 0 },
                { opacity: 1, duration: 0.2 }
            ).to(packet, {
                cx: endX,
                cy: endY,
                duration: 1.5,
                ease: "power1.inOut"
            }, "<").to(packet, {
                opacity: 0,
                duration: 0.2
            }, "-=0.2");
        });

        // Floating effect for the entire SVG
        gsap.to(".collab-svg-container", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

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

    }, { scope: container });

    return (
        <div ref={container} className="relative w-full flex flex-col bg-[#060010] text-white pt-24 lg:pt-32 min-h-screen">

            {/* Dark Theme Grid Lines */}
            <div className="fixed inset-0 pointer-events-none z-0 flex justify-center max-w-[1920px] mx-auto w-full opacity-20">
                <div className="w-full h-full border-l border-r border-white/10 max-w-7xl relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
                    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden lg:block" />
                    <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden lg:block" />
                </div>
            </div>

            {/* Background Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay" style={{ backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')", backgroundSize: "300px" }} />

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

            {/* Top Navigation - Adjusted for Dark Background */}
            <div className="absolute top-0 left-0 w-full z-[60] px-6 md:px-16 pt-4 md:pt-6 flex justify-between items-start pointer-events-none">
                <Link href="/" className="pointer-events-auto">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className={`object-contain w-auto h-16 md:h-20 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                    />
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    className="cursor-pointer pointer-events-auto bg-white text-zinc-900 border-b-[6px] border-zinc-300 active:border-b-0 active:translate-y-[6px] px-8 py-3 rounded-full font-extrabold transition-all duration-150 shadow-[0_4px_10px_rgba(0,0,0,0.15)] uppercase tracking-wider text-sm mt-2 md:mt-3"
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Main Content Wrapper */}
            <div className={`relative z-20 w-full flex flex-col transition-opacity duration-500 overflow-hidden ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                {/* DISTINCTIVE HERO SECTION (Split Layout) */}
                <div className="w-full min-h-[90vh] flex items-center relative overflow-hidden px-6 lg:px-16 pt-20">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/15 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#38bdf8]/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10 items-center">

                        {/* Left Side: Copy */}
                        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center text-left pt-0 lg:-mt-24 xl:-mt-32">
                            <div className="collab-hero-sub inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00A3FF]/30 bg-[#00A3FF]/10 backdrop-blur-md w-fit mb-8 md:mb-12">
                                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-[pulse_2s_ease-in-out_infinite]" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Corporate Alliance</span>
                            </div>

                            <h1 className="text-[11vw] sm:text-[9vw] md:text-[80px] lg:text-[75px] xl:text-[90px] font-medium leading-[0.9] tracking-tighter text-white flex flex-col perspective-1000">
                                <span className="overflow-hidden pb-2"><span className="inline-block collab-hero-line font-medium origin-bottom">Synergy in</span></span>
                                <span className="overflow-hidden pb-2 whitespace-nowrap"><span className="inline-block collab-hero-line font-medium origin-bottom text-[#00A3FF]">Distribution.</span></span>
                            </h1>

                            <p className="collab-hero-sub text-white/70 text-lg md:text-2xl leading-[1.6] md:leading-[1.8] font-light max-w-2xl mt-8 mb-12">
                                Transcend traditional logistics. Align with Inspira to seamlessly integrate your pharmaceutical innovations into Sri Lanka's healthcare ecosystem with absolute precision.
                            </p>

                            <div className="collab-hero-sub flex flex-col sm:flex-row gap-5 items-start">
                                <a href="#alliance" className="group relative overflow-hidden bg-white text-[#121212] px-10 py-5 rounded-full font-bold transition-all duration-500 shadow-[0_0_40px_rgba(0,163,255,0.2)] hover:shadow-[0_0_60px_rgba(0,163,255,0.4)] hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-4">
                                    <span className="relative z-10 text-[17px]">Explore Alliance</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Meaningful Network Graphic */}
                        <div className="collab-graphic lg:col-span-5 xl:col-span-4 hidden lg:flex flex-col items-center justify-center relative w-full aspect-square pt-0 lg:-mt-24 xl:-mt-32">

                            {/* Meaningful Context Badge */}
                            <div className="collab-network-badge absolute top-10 right-0 z-20 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 text-sm font-light text-white/70 max-w-[240px] shadow-2xl opacity-0 translate-y-4">
                                <strong className="text-white font-medium block mb-2 text-[#38bdf8] flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                                    Distribution Matrix
                                </strong>
                                Visualizing seamless pharmaceutical distribution from our central hub out to island-wide partners.
                            </div>

                            <div className="collab-svg-container relative w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center">
                                {/* Deep Background Glow */}
                                <div className="absolute inset-20 rounded-full border border-white/5 bg-[#00A3FF]/5 backdrop-blur-2xl" />
                                <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-[#00A3FF] via-[#38bdf8] to-transparent blur-3xl opacity-20 absolute mix-blend-screen" />

                                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(0,163,255,0.3)] filter">
                                    <defs>
                                        <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#38bdf8" />
                                            <stop offset="100%" stopColor="#00A3FF" />
                                        </linearGradient>
                                        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
                                        </linearGradient>
                                    </defs>

                                    {/* Base Paths */}
                                    <g stroke="rgba(255,255,255,0.15)" strokeWidth="2" className="collab-path-base">
                                        <path d="M200,200 L80,80" />
                                        <path d="M200,200 L320,100" />
                                        <path d="M200,200 L100,320" />
                                        <path d="M200,200 L300,280" />
                                        <path d="M200,200 L50,200" />
                                        <path d="M200,200 L350,200" />
                                    </g>

                                    {/* Connecting Lines (Solid, animated drawing) */}
                                    <g stroke="#38bdf8" strokeWidth="2" className="opacity-80">
                                        <path className="collab-path-solid" d="M200,200 L80,80" />
                                        <path className="collab-path-solid" d="M200,200 L320,100" />
                                        <path className="collab-path-solid" d="M200,200 L100,320" />
                                        <path className="collab-path-solid" d="M200,200 L300,280" />
                                        <path className="collab-path-solid" d="M200,200 L50,200" />
                                        <path className="collab-path-solid" d="M200,200 L350,200" />
                                    </g>

                                    {/* Moving Packets */}
                                    <circle className="collab-packet" cx="200" cy="200" r="5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px #ffffff)" }} data-endx="80" data-endy="80" />
                                    <circle className="collab-packet" cx="200" cy="200" r="5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px #ffffff)" }} data-endx="320" data-endy="100" />
                                    <circle className="collab-packet" cx="200" cy="200" r="5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px #ffffff)" }} data-endx="100" data-endy="320" />
                                    <circle className="collab-packet" cx="200" cy="200" r="5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px #ffffff)" }} data-endx="300" data-endy="280" />
                                    <circle className="collab-packet" cx="200" cy="200" r="5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px #ffffff)" }} data-endx="50" data-endy="200" />
                                    <circle className="collab-packet" cx="200" cy="200" r="5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px #ffffff)" }} data-endx="350" data-endy="200" />

                                    {/* Destination Nodes */}
                                    <g className="nodes">
                                        {/* Node 1 */}
                                        <circle className="collab-node" cx="80" cy="80" r="24" fill="url(#nodeGradient)" stroke="rgba(255,255,255,0.3)" />
                                        <circle className="collab-node-inner" cx="80" cy="80" r="8" fill="#00A3FF" />

                                        {/* Node 2 */}
                                        <circle className="collab-node" cx="320" cy="100" r="28" fill="url(#nodeGradient)" stroke="rgba(255,255,255,0.3)" />
                                        <circle className="collab-node-inner" cx="320" cy="100" r="10" fill="#00A3FF" />

                                        {/* Node 3 */}
                                        <circle className="collab-node" cx="100" cy="320" r="20" fill="url(#nodeGradient)" stroke="rgba(255,255,255,0.3)" />
                                        <circle className="collab-node-inner" cx="100" cy="320" r="6" fill="#00A3FF" />

                                        {/* Node 4 */}
                                        <circle className="collab-node" cx="300" cy="280" r="26" fill="url(#nodeGradient)" stroke="rgba(255,255,255,0.3)" />
                                        <circle className="collab-node-inner" cx="300" cy="280" r="8" fill="#00A3FF" />

                                        {/* Node 5 */}
                                        <circle className="collab-node" cx="50" cy="200" r="18" fill="url(#nodeGradient)" stroke="rgba(255,255,255,0.3)" />
                                        <circle className="collab-node-inner" cx="50" cy="200" r="6" fill="#00A3FF" />

                                        {/* Node 6 */}
                                        <circle className="collab-node" cx="350" cy="200" r="22" fill="url(#nodeGradient)" stroke="rgba(255,255,255,0.3)" />
                                        <circle className="collab-node-inner" cx="350" cy="200" r="7" fill="#00A3FF" />
                                    </g>

                                    {/* Central Hub (Inspira) */}
                                    <circle className="collab-hub-pulse" cx="200" cy="200" r="40" fill="none" stroke="#38bdf8" strokeWidth="2" />
                                    <circle className="collab-hub" cx="200" cy="200" r="40" fill="url(#hubGradient)" />
                                    <circle cx="200" cy="200" r="18" fill="#060010" />
                                    <circle cx="200" cy="200" r="6" fill="#ffffff" className="animate-pulse" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SECTION 2: ALLIANCE BENEFITS (Refined Copy) */}
                <div id="alliance" className="w-full bg-[#030008] text-white pt-24 pb-32 px-6 relative overflow-hidden border-t border-b border-white/5">
                    <div className="max-w-7xl mx-auto flex flex-col relative z-10 mt-10">
                        <div className="mb-20 md:mb-32 max-w-4xl">
                            <h2 className="reveal-section text-sm font-bold text-[#38bdf8] uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                                <span className="w-8 h-px bg-[#38bdf8]" />
                                The Inspira Advantage
                            </h2>
                            <h3 className="reveal-section text-[45px] md:text-[65px] font-medium leading-[1.05] tracking-tight text-white mb-8">
                                Why leading healthcare brands choose us.
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {[
                                {
                                    icon: Globe,
                                    title: "Island-Wide Precision",
                                    text: "Gain unrestricted access to Sri Lanka's pharmaceutical market with our robust delivery infrastructure designed for scale and unparalleled reliability."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Market Intelligence",
                                    text: "Leverage our deep operational insights to strategically position your healthcare products, accelerating brand adoption and competitive advantage."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Absolute Compliance",
                                    text: "Experience risk-free distribution with our uncompromising adherence to global pharmaceutical quality standards and stringent regulatory protocols."
                                }
                            ].map((card, i) => (
                                <div key={i} className="reveal-section group relative bg-white/[0.02] border border-white/[0.08] hover:border-white/20 rounded-[32px] p-10 md:p-12 overflow-hidden hover:bg-white/[0.04] backdrop-blur-xl transition-all duration-500 h-[400px] flex flex-col justify-between">
                                    <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform" />
                                    <div className="absolute -inset-px bg-gradient-to-b from-[#00A3FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[32px]" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-[#38bdf8] mb-8 group-hover:scale-110 group-hover:bg-[#00A3FF]/20 shadow-[0_8px_32px_rgba(0,163,255,0.1)] transition-all duration-500">
                                            <card.icon strokeWidth={1.5} size={28} />
                                        </div>
                                        <div className="mt-auto">
                                            <h4 className="text-[26px] font-medium mb-4 text-white tracking-tight">{card.title}</h4>
                                            <p className="text-white/60 font-light leading-relaxed text-[17px] group-hover:text-white/90 transition-colors duration-300">
                                                {card.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECTION 3: CTA */}
                <div id="contact" className="w-full bg-[#060010] flex flex-col items-center justify-center py-32 md:py-48 px-6 relative z-10">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />

                    <div className="max-w-5xl mx-auto flex flex-col text-center items-center relative z-10">
                        <h2 className="reveal-section text-[45px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-medium text-white leading-[1] tracking-tighter mb-10">
                            Let's forge a <br /><span className="text-[#00A3FF]">Partnership.</span>
                        </h2>
                        <p className="reveal-section text-white/60 text-[18px] md:text-[24px] leading-[1.6] md:leading-[1.8] font-light mb-16 max-w-3xl mx-auto">
                            Connect with our business development team to architect a distribution strategy that propels your pharmaceutical brand forward in Sri Lanka.
                        </p>

                        <div className="reveal-section p-[1px] rounded-full bg-gradient-to-r from-[#00A3FF]/40 via-[#38bdf8] to-[#00A3FF]/40 overflow-hidden shadow-[0_0_60px_rgba(0,163,255,0.2)]">
                            <Link href="/contact" className="relative group bg-[#060010] hover:bg-[#0a001a] flex items-center justify-center px-10 py-5 rounded-full overflow-hidden transition-all duration-300">
                                <span className="relative z-10 text-[18px] md:text-[20px] font-medium text-white mr-4 group-hover:text-[#38bdf8] transition-colors">Initiate Dialogue</span>
                                <div className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#121212] group-hover:bg-[#38bdf8] group-hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-300">
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
