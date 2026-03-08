"use client";

import React, { useRef, useState } from 'react';
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

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { link: '/', text: 'Home', image: '/menu_home_compressed.jpg' },
    { link: '/about', text: 'About', image: '/menu_about_compressed.jpg' },
    { link: '#', text: 'Products', image: '/menu_products_compressed.jpg' },
    { link: '#', text: 'Newsroom', image: '/menu_newsroom_compressed.jpg' },
    { link: '#', text: 'Collaboration', image: '/menu_collaboration_compressed.jpg' },
    { link: '/careers', text: 'Careers', image: '/menu_careers_compressed.jpg' },
    { link: '/contact', text: 'Contact', image: '/menu_contact_compressed.jpg' }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state setup to prevent flash of content
    gsap.set(".glass-container-hero", { y: 40, opacity: 0, backdropFilter: "blur(0px)" });
    gsap.set(".hero-element", { y: 20, opacity: 0 });
    gsap.set(".video-overlay", { backgroundColor: "rgba(0,0,0,1)" });

    tl.to(".video-overlay", {
      backgroundColor: "rgba(0,0,0,0.6)",
      duration: 1.5,
      ease: "power2.inOut"
    })
      .to(".glass-container-hero", {
        y: 0,
        opacity: 1,
        backdropFilter: "blur(16px)",
        duration: 1.2,
      }, "-=0.8")
      .to(".hero-element", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
      }, "-=0.6");

  }, { scope: container });

  return (
    <main className="min-h-screen bg-white p-[5px]">
      <div ref={container} className="relative w-full h-[calc(100vh-10px)] rounded-[2rem] overflow-hidden flex flex-col justify-end">
        {/* Background Video */}
        <video
          src="/hero-vid-compressed-v2.mp4"
          autoPlay
          loop
          muted
          playsInline
          suppressHydrationWarning
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Black Overlay animated by GSAP */}
        <div className="video-overlay absolute inset-0 z-10 pointer-events-none" aria-hidden="true" />

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
          <div className="glass-container-hero w-fit max-w-[950px] bg-black/40 border border-white/10 p-4 md:py-8 md:pl-8 md:pr-10 rounded-[2rem] shadow-2xl">

            {/* Headline */}
            <h1 className="hero-element text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-5">
              Precision Distribution.<br />
              <span className="text-zinc-300">Expanding Your Market Reach.</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-element text-base md:text-lg text-zinc-300 leading-relaxed font-light">
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
