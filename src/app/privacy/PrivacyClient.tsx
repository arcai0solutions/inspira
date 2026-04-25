"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import { useScrollLock } from "@/hooks/useScrollLock";

gsap.registerPlugin(useGSAP);

export default function PrivacyClient() {
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
                            Privacy Policy
                        </h1>
                        <p className="legal-fade-in text-zinc-500 font-medium tracking-widest uppercase text-sm">
                            Last Updated: April 25, 2026
                        </p>
                    </div>

                    <article className="legal-fade-in prose prose-lg md:prose-xl max-w-none text-zinc-700 prose-headings:text-[#121212] prose-headings:font-medium prose-a:text-[#00A3FF]">
                        <p>
                            At Inspira Worldwide, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
                        </p>

                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website.
                        </p>
                        <p>
                            This may include: names, phone numbers, email addresses, job titles, and contact preferences.
                        </p>

                        <h2>2. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        <ul>
                            <li>To send administrative information to you.</li>
                            <li>To fulfill and manage your requests.</li>
                            <li>To send you marketing and promotional communications (if opted-in).</li>
                            <li>To respond to user inquiries and offer support.</li>
                        </ul>

                        <h2>3. Will Your Information be Shared with Anyone?</h2>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, or Legal Obligations.
                        </p>

                        <h2>4. Do We Use Cookies and Other Tracking Technologies?</h2>
                        <p>
                            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                        </p>

                        <h2>5. How Long Do We Keep Your Information?</h2>
                        <p>
                            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
                        </p>

                        <h2>6. How Do We Keep Your Information Safe?</h2>
                        <p>
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                        </p>

                        <h2>7. Contact Us</h2>
                        <p>
                            If you have questions or comments about this notice, you may email us at:<br />
                            <strong>Inspira Worldwide Data Protection Officer</strong><br />
                            Email: privacy@inspiraworldwide.com
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
