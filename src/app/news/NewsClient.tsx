"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import { supabase } from "@/lib/supabase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

interface NewsItem {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
}

export default function NewsClient() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const menuItems = [
        { link: "/", text: "Home", image: "/menu_home_compressed.jpg" },
        { link: "/about", text: "About", image: "/menu_about_compressed.jpg" },
        { link: "/products", text: "Products", image: "/menu_products_compressed.jpg" },
        { link: "/news", text: "Newsroom", image: "/menu_newsroom_compressed.jpg" },
        { link: "/collaboration", text: "Collaboration", image: "/menu_collaboration_compressed.jpg" },
        { link: "/careers", text: "Careers", image: "/menu_careers_compressed.jpg" },
        { link: "/contact", text: "Contact", image: "/menu_contact_compressed.jpg" },
    ];

    useEffect(() => {
        async function fetchNews() {
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                if (data) setNews(data);
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(".news-fade-in", { y: 30, opacity: 0 });

        tl.to(".news-fade-in", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            delay: 0.2
        });
    }, { scope: container, dependencies: [loading] });

    return (
        <div ref={container} className="relative w-full flex flex-col pt-24 lg:pt-32 bg-white text-[#121212]">
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

            {/* Content Layout */}
            <div className={`relative z-20 w-full flex flex-col transition-opacity duration-500 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                <div className="w-full flex flex-col border-t border-b border-zinc-200 overflow-hidden bg-white shadow-sm mt-4">

                    {/* Shorter Hero for Newsroom */}
                    <div className="w-full border-b border-zinc-200 p-8 py-10 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between bg-[#FAFAFA] overflow-hidden gap-8">
                        <div className="flex-1">
                            <h1 className="news-fade-in text-[10vw] sm:text-[8vw] md:text-[60px] lg:text-[80px] font-medium leading-[0.9] tracking-tighter text-[#121212] mb-4">
                                Newsroom.
                            </h1>
                            <p className="news-fade-in text-zinc-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                                Stay up-to-date with our latest announcements, updates, and milestones from Inspira Worldwide.
                            </p>
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="w-full p-8 md:p-16 min-h-[50vh] bg-white">
                        {loading ? (
                            <div className="flex justify-center items-center h-48 w-full">
                                <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-zinc-900 animate-spin"></div>
                            </div>
                        ) : news.length === 0 ? (
                            <div className="flex justify-center items-center h-48 w-full">
                                <p className="text-zinc-500 text-lg">No news articles found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {news.map((item) => (
                                    <div key={item.id} className="news-fade-in flex flex-col group cursor-pointer">
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 mb-6">
                                            {item.image_url ? (
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <span className="text-sm font-semibold text-[#00A3FF] uppercase tracking-wider mb-3">
                                                {new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                            <h3 className="text-2xl font-medium text-[#121212] leading-tight mb-4 group-hover:text-[#00A3FF] transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-zinc-600 font-light leading-relaxed line-clamp-3">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
