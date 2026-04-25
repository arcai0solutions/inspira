"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import { useScrollLock } from "@/hooks/useScrollLock";

gsap.registerPlugin(useGSAP);

export default function ArticlesClient() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useScrollLock(isMenuOpen);

    const menuItems = [
        { link: "/", text: "Home", image: "/menu_home_compressed.jpg" },
        { link: "/about", text: "About", image: "/menu_about_compressed.jpg" },
        { link: "/products", text: "Products", image: "/menu_products_compressed.jpg" },
        { link: "/news", text: "Newsroom", image: "/menu_newsroom_compressed.jpg" },
        { link: "/articles", text: "Articles", image: "/menu_home_compressed.jpg" },
        { link: "/collaboration", text: "Collaboration", image: "/menu_collaboration_compressed.jpg" },
        { link: "/careers", text: "Careers", image: "/menu_careers_compressed.jpg" },
        { link: "/contact", text: "Contact", image: "/menu_contact_compressed.jpg" },
    ];

    const articles = [
        {
            id: "pharmaceutical-market-entry-sri-lanka",
            title: "Navigating Pharmaceutical Market Entry in Sri Lanka (2026 Guide)",
            description: "A comprehensive guide on regulatory compliance, local partnerships, and initial steps for foreign pharmaceutical manufacturers expanding into Sri Lanka.",
            image_url: "/article_market_entry.png",
            date: "April 2026",
        },
        {
            id: "cold-chain-logistics-sri-lanka",
            title: "Overcoming Cold Chain Logistics Challenges in Tropical Climates",
            description: "How modern warehousing and distribution systems are solving temperature excursions and product wastage in Sri Lanka's pharmaceutical supply chain.",
            image_url: "/article_cold_chain.png",
            date: "April 2026",
        },
        {
            id: "pharmacy-retail-distribution-colombo",
            title: "The Evolution of Pharmacy Retail Distribution in Colombo",
            description: "Examining the shift in last-mile delivery, urban logistics, and strategies for ensuring steady pharmaceutical stock levels in retail pharmacies.",
            image_url: "/article_pharmacy_retail.png",
            date: "March 2026",
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(".news-fade-in", { y: 30, opacity: 0 });

        tl.to(".news-fade-in", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
        });
    }, { scope: container });

    return (
        <div ref={container} className="relative min-h-screen bg-white overflow-hidden">
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
                <Link href="/" className="pointer-events-auto">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className={`object-contain w-auto h-16 md:h-20 transition-all duration-300 ${isMenuOpen ? "invert-0" : "invert"}`}
                    />
                </Link>

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
                    {isMenuOpen ? "CLOSE" : "MENU"}
                </button>
            </div>

            <div className="relative pt-[180px] md:pt-[240px] pb-32">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="flex flex-col max-w-5xl mx-auto">
                        <div className="mb-24 text-center md:text-left">
                            <h1 className="news-fade-in text-[10vw] sm:text-[8vw] md:text-[60px] lg:text-[80px] font-medium leading-[0.9] tracking-tighter text-[#121212] mb-4">
                                Industry Articles
                            </h1>
                            <p className="news-fade-in text-zinc-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
                                Educational insights and strategic analysis for the pharmaceutical distribution sector in Sri Lanka.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {articles.map((item) => (
                                <Link href={`/articles/${item.id}`} key={item.id} className="news-fade-in flex flex-col group cursor-pointer">
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 mb-6">
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="text-sm font-semibold text-[#00A3FF] uppercase tracking-wider mb-3">
                                            {item.date}
                                        </span>
                                        <h3 className="text-2xl font-medium text-[#121212] leading-tight mb-4 group-hover:text-[#00A3FF] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-zinc-600 font-light leading-relaxed line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
