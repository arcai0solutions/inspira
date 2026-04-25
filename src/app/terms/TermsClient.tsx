"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import { useScrollLock } from "@/hooks/useScrollLock";

gsap.registerPlugin(useGSAP);

export default function TermsClient() {
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

        gsap.set(".legal-fade-in", { y: 30, opacity: 0 });

        tl.to(".legal-fade-in", {
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
                <div className="max-w-[1000px] mx-auto px-6 md:px-16">
                    <div className="mb-16">
                        <h1 className="legal-fade-in text-[10vw] sm:text-[8vw] md:text-[60px] lg:text-[80px] font-medium leading-[0.9] tracking-tighter text-[#121212] mb-4">
                            Terms of Service
                        </h1>
                        <p className="legal-fade-in text-zinc-500 font-medium tracking-widest uppercase text-sm">
                            Last Updated: April 25, 2026
                        </p>
                    </div>

                    <article className="legal-fade-in prose prose-lg md:prose-xl max-w-none text-zinc-700 prose-headings:text-[#121212] prose-headings:font-medium prose-a:text-[#00A3FF]">
                        <p>
                            Welcome to Inspira Worldwide. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully. If you do not agree to these terms, you may not access or use our services.
                        </p>

                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Inspira Worldwide concerning your access to and use of our website as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto.
                        </p>

                        <h2>2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>

                        <h2>3. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration or contact information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                        </p>

                        <h2>4. Prohibited Activities</h2>
                        <p>
                            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. Prohibited activity includes systematically retrieving data, engaging in unauthorized framing or linking, or attempting to bypass security measures.
                        </p>

                        <h2>5. Limitation of Liability</h2>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.
                        </p>

                        <h2>6. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and defined following the laws of Sri Lanka. Inspira Worldwide and yourself irrevocably consent that the courts of Sri Lanka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>

                        <h2>7. Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:<br />
                            <strong>Inspira Worldwide</strong><br />
                            Email: legal@inspiraworldwide.com
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
