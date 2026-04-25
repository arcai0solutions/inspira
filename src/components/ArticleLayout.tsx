"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import { useScrollLock } from "@/hooks/useScrollLock";

gsap.registerPlugin(useGSAP);

interface ArticleLayoutProps {
    title: string;
    date: string;
    imageUrl: string;
    children: React.ReactNode;
}

export default function ArticleLayout({ title, date, imageUrl, children }: ArticleLayoutProps) {
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

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(".article-fade", { y: 30, opacity: 0 });

        tl.to(".article-fade", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
        });
    }, { scope: container });

    return (
        <div ref={container} className="relative min-h-screen bg-white overflow-hidden font-sans">
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
                <div className="max-w-[1200px] mx-auto px-6 md:px-16">
                    <div className="mb-12">
                        <Link href="/articles" className="article-fade text-[#00A3FF] hover:text-[#0082cc] transition-colors font-medium text-sm tracking-wider uppercase mb-8 inline-block">
                            &larr; Back to Articles
                        </Link>
                        <span className="article-fade block text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                            {date}
                        </span>
                        <h1 className="article-fade text-[8vw] sm:text-[6vw] md:text-[50px] lg:text-[64px] font-medium leading-[1.1] tracking-tighter text-[#121212] mb-12 max-w-4xl">
                            {title}
                        </h1>
                        <div className="article-fade relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden bg-zinc-100 mb-16">
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                priority
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    <article className="article-fade prose prose-lg md:prose-xl max-w-3xl mx-auto text-zinc-700 prose-headings:text-[#121212] prose-headings:font-medium prose-a:text-[#00A3FF]">
                        {children}
                    </article>
                </div>
            </div>
        </div>
    );
}
