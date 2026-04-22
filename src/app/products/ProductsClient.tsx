"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FlowingMenu from "@/components/FlowingMenu";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

/* ─── Product Data ───────────────────────────────────────────────── */

interface Product {
    name: string;
    category: string;
    image: string | null;
}

const PRODUCTS: Product[] = [
    { name: "Betagen 16", category: "Neuro", image: "/Product images/Betagen 16.webp" },
    { name: "Betagen 8", category: "Neuro", image: "/Product images/Betagen 8.webp" },
    { name: "Clinagen 150", category: "Antibiotic", image: null },
    { name: "Clinagen 300", category: "Antibiotic", image: null },
    { name: "Clinagen 600", category: "Antibiotic", image: null },
    { name: "Dalagen 150", category: "Antibiotic", image: "/Product images/Dalagen 150.webp" },
    { name: "Dalagen 300", category: "Antibiotic", image: "/Product images/Dalagen 300.webp" },
    { name: "Deslogen 5", category: "Antihistamine", image: "/Product images/Deslogen 5.webp" },
    { name: "Itragen 100", category: "Antifungal", image: "/Product images/Itragen 100.webp" },
    { name: "Labetol 100", category: "Cardio", image: null },
    { name: "Rispigen 2", category: "Neuro", image: "/Product images/Respigen 2.webp" },
    { name: "Azigen 500", category: "Antibiotic", image: "/Product images/Azigen 500.webp" },
    { name: "Azigen Dry Syrup", category: "Antibiotic", image: "/Product images/Azigen Syrup.webp" },
    { name: "Azigen 250", category: "Antibiotic", image: "/Product images/Azigen 250.webp" },
    { name: "Flugen 150", category: "Antifungal", image: "/Product images/Flugen 150.webp" },
    { name: "Flugen 50", category: "Antifungal", image: "/Product images/Flugen 50.webp" },
    { name: "Gasogen", category: "Gastro", image: "/Product images/Gasogen.webp" },
    { name: "Laxogen", category: "Gastro", image: "/Product images/Laxogen.webp" },
    { name: "Phylogen 250", category: "Antibiotic", image: "/Product images/Phylogen 250.webp" },
    { name: "Phylogen 500", category: "Antibiotic", image: "/Product images/Phylogen 500.webp" },
    { name: "Bisogen 2.5", category: "Cardio", image: "/Product images/Bisogen 2.5.webp" },
    { name: "Bisogen 5", category: "Cardio", image: "/Product images/Bisogen 5.webp" },
    { name: "Empaglo 10", category: "Antidiabetic", image: "/Product images/Empaglo 10.webp" },
    { name: "Empaglo 25", category: "Antidiabetic", image: "/Product images/Empaglo 25.webp" },
    { name: "Gensita 100", category: "Antidiabetic", image: "/Product images/Gensita 100.webp" },
    { name: "Gensita 50", category: "Antidiabetic", image: "/Product images/Gensita 50.webp" },
    { name: "Gligen MR 60", category: "Antidiabetic", image: "/Product images/Gligen MR 60.webp" },
    { name: "Rosa 10", category: "Cardio", image: "/Product images/Rosa 10.webp" },
    { name: "Amogen 250", category: "Antidiabetic", image: "/Product images/Amogen 250 - Done.webp" },
    { name: "Amogen 500", category: "Antidiabetic", image: "/Product images/Amogen 500 - Done.webp" },
    { name: "Aspigen 75", category: "Cardio", image: "/Product images/Azpigen 75 - Done.webp" },
    { name: "C-Gen 100", category: "Vitamin", image: "/Product images/C - Gen 100.webp" },
    { name: "Carbimole 5", category: "Antithyroid", image: null },
    { name: "Clopigra 75", category: "Cardio", image: "/Product images/Clopigra.webp" },
    { name: "Famogen 20", category: "Gastro", image: "/Product images/Famogen 20.webp" },
    { name: "Foligen", category: "Vitamin", image: "/Product images/Foligen 1.webp" },
    { name: "Gligen 40", category: "Antidiabetic", image: null },
    { name: "Gligen 80", category: "Antidiabetic", image: null },
    { name: "Metfogen 500", category: "Antidiabetic", image: "/Product images/Metfogen 500.webp" },
    { name: "Metfogen XR 500", category: "Antidiabetic", image: "/Product images/Metfogen XR 500.webp" },
    { name: "Orinol 100", category: "Antigout", image: null },
    { name: "Donepagen 5", category: "Neuro", image: "/Product images/Donapagen 5.webp" },
    { name: "Dulogen DR 30", category: "Neuro", image: "/Product images/Dulogen DR 30.webp" },
    { name: "Dulogen DR 20", category: "Neuro", image: "/Product images/Dulogen DR 20.webp" },
    { name: "Levetam 250", category: "Neuro", image: "/Product images/Levatem 250.webp" },
    { name: "Levetam 500", category: "Neuro", image: "/Product images/Levatem 500.webp" },
    { name: "Levetam 750", category: "Neuro", image: "/Product images/Levetam 750.webp" },
    { name: "Lithigen 250", category: "Neuro", image: "/Product images/Lithigen 250.webp" },
    { name: "Lithigen ER 400", category: "Neuro", image: "/Product images/Lithigen ER 400.webp" },
    { name: "Melo 3", category: "Sleep", image: "/Product images/Melo.webp" },
    { name: "Respigen 2mg", category: "Neuro", image: "/Product images/Respigen 2.webp" },
    { name: "Valogen 200", category: "Neuro", image: "/Product images/Valogen 200.webp" },
    { name: "Panto DR 20", category: "Gastro", image: "/Product images/Panto DR 20.webp" },
    { name: "Ranoline ER 500", category: "Cardio", image: "/Product images/Ranoline ER 500.webp" },
    { name: "Gligen MR 30", category: "Antidiabetic", image: "/Product images/Gligen MR 30.webp" },
];

const CATEGORIES = [
    "All",
    "Antibiotic",
    "Antidiabetic",
    "Antifungal",
    "Antihistamine",
    "Antigout",
    "Antithyroid",
    "Cardio",
    "Gastro",
    "Neuro",
    "Sleep",
    "Vitamin",
];

const CATEGORY_LABELS: Record<string, string> = {
    All: "All Products",
    Antibiotic: "Antibiotics",
    Antidiabetic: "Antidiabetics",
    Antifungal: "Antifungals",
    Antihistamine: "Antihistamines",
    Antigout: "Antigout",
    Antithyroid: "Antithyroid",
    Cardio: "Cardiovascular",
    Gastro: "Gastroenterology",
    Neuro: "Neurology",
    Sleep: "Sleep Aid",
    Vitamin: "Vitamins",
};

const CATEGORY_COLORS: Record<string, string> = {
    Antibiotic: "#EF4444",
    Antidiabetic: "#F59E0B",
    Antifungal: "#8B5CF6",
    Antihistamine: "#EC4899",
    Antigout: "#14B8A6",
    Antithyroid: "#6366F1",
    Cardio: "#EF4444",
    Gastro: "#10B981",
    Neuro: "#3B82F6",
    Sleep: "#6366F1",
    Vitamin: "#F97316",
};

/* ─── Component ──────────────────────────────────────────────────── */

export default function ProductsClient() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const menuItems = [
        { link: "/", text: "Home", image: "/menu_home_compressed.jpg" },
        { link: "/about", text: "About", image: "/menu_about_compressed.jpg" },
        { link: "/products", text: "Products", image: "/menu_products_compressed.jpg" },
        { link: "/news", text: "Newsroom", image: "/menu_newsroom_compressed.jpg" },
        { link: "/collaboration", text: "Collaboration", image: "/menu_collaboration_compressed.jpg" },
        { link: "/careers", text: "Careers", image: "/menu_careers_compressed.jpg" },
        { link: "/contact", text: "Contact", image: "/menu_contact_compressed.jpg" },
    ];

    /* Filter products */
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((p) => {
            const matchesCategory = activeCategory === "All" || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    /* Category counts */
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: PRODUCTS.length };
        PRODUCTS.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    /* GSAP entrance animation */
    useGSAP(() => {
        gsap.set(".products-fade-in", { y: 30, opacity: 0 });
        gsap.to(".products-fade-in", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            delay: 0.2,
            ease: "power3.out",
        });
    }, { scope: container });

    return (
        <div ref={container} className="relative w-full flex flex-col pt-24 lg:pt-32 bg-white text-[#121212]">
            {/* Background Noise Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
                    backgroundSize: "400px",
                    mixBlendMode: "overlay",
                }}
            />

            {/* Flowing Menu Overlay */}
            <div
                id="main-navigation"
                className={`fixed inset-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10%] pointer-events-none"
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
            <div className="absolute top-0 left-0 w-full z-[60] px-6 md:px-16 pt-4 md:pt-6 flex justify-between items-start pointer-events-none">
                <a href="/" className="pointer-events-auto">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={300}
                        height={80}
                        priority
                        className={`object-contain w-auto h-16 md:h-20 transition-all duration-300 ${isMenuOpen ? "invert-0" : "invert"
                            }`}
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

            {/* Main Content */}
            <div className={`relative z-20 w-full flex flex-col transition-opacity duration-500 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                <div className="w-full flex flex-col border-t border-b border-zinc-200 overflow-hidden bg-white shadow-sm mt-4">

                    {/* ─── Header ─────────────────────────────────────────── */}
                    <div className="w-full border-b border-zinc-200 p-8 py-10 md:py-16 md:px-16 flex flex-col md:flex-row items-start md:items-end justify-between bg-[#FAFAFA] overflow-hidden gap-8">
                        <div>
                            <h1 className="products-fade-in text-[10vw] sm:text-[8vw] md:text-[80px] lg:text-[100px] font-medium leading-[0.9] tracking-tighter text-[#121212]">
                                Products.
                            </h1>
                        </div>
                        <div className="products-fade-in max-w-lg">
                            <p className="text-zinc-600 text-lg md:text-xl font-light leading-relaxed">
                                A comprehensive portfolio of high-quality pharmaceutical products, distributed island-wide across Sri Lanka.
                            </p>
                        </div>
                    </div>

                    {/* ─── Filter Bar ──────────────────────────────────────── */}
                    <div className="products-fade-in w-full border-b border-zinc-200 bg-white px-6 md:px-16 py-6 md:py-8">
                        {/* Search */}
                        <div className="mb-6">
                            <div className="relative max-w-md">
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-zinc-200 bg-[#FAFAFA] text-[#121212] placeholder-zinc-400 outline-none focus:ring-2 focus:ring-[#00A3FF]/40 focus:border-[#00A3FF] transition-all text-[15px]"
                                />
                            </div>
                        </div>

                        {/* Category Chips */}
                        <div className="flex flex-wrap gap-2.5">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`cursor-pointer px-5 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-wide transition-all duration-300 border ${activeCategory === cat
                                        ? "bg-[#121212] text-white border-[#121212] shadow-lg shadow-black/10"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-[#121212]"
                                        }`}
                                >
                                    {CATEGORY_LABELS[cat]}
                                    <span className={`ml-2 text-[11px] ${activeCategory === cat ? "text-[#00A3FF]" : "text-zinc-400"}`}>
                                        {categoryCounts[cat] || 0}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ─── Results Count ───────────────────────────────────── */}
                    <div className="w-full px-6 md:px-16 py-4 border-b border-zinc-200 bg-white flex items-center justify-between">
                        <p className="text-zinc-500 text-sm font-light">
                            Showing <span className="text-[#121212] font-medium">{filteredProducts.length}</span> of{" "}
                            <span className="text-[#121212] font-medium">{PRODUCTS.length}</span> products
                        </p>
                        {activeCategory !== "All" && (
                            <button
                                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                className="text-[#00A3FF] text-sm font-medium hover:underline underline-offset-2 cursor-pointer"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* ─── Product Grid ─────────────────────────────────────── */}
                    <div className="w-full bg-[#FAFAFA] px-6 md:px-16 py-10 md:py-16">

                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-zinc-500 text-lg font-light">No products found matching your criteria.</p>
                                <button
                                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                    className="text-[#00A3FF] font-medium hover:underline underline-offset-2 cursor-pointer"
                                >
                                    Reset filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                                {filteredProducts.map((product, i) => (
                                    <ProductCard key={`${product.name}-${i}`} product={product} index={i} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ─── Bottom CTA Band ──────────────────────────────────── */}
                    <div className="w-full bg-[#121212] text-white p-8 md:p-16 lg:p-20 relative overflow-hidden">
                        {/* Blur highlights */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3FF]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#38bdf8]/10 rounded-full blur-[60px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

                        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                            <h2 className="text-[18px] font-semibold text-[#00A3FF] uppercase tracking-widest">Partner With Us</h2>
                            <h3 className="text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.1] tracking-tight">
                                Looking for a reliable distribution partner for your pharmaceutical products?
                            </h3>
                            <p className="text-white/60 text-lg max-w-xl font-light leading-relaxed">
                                We offer integrated marketing, promotion, and island-wide distribution solutions for domestic pharmaceutical manufacturers in Sri Lanka.
                            </p>
                            <a
                                href="/collaboration"
                                className="mt-4 inline-flex items-center gap-2 bg-[#00A3FF] hover:bg-[#38bdf8] text-[#121212] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#00A3FF]/20 hover:shadow-[#00A3FF]/40 text-[15px] uppercase tracking-wider"
                            >
                                Start a Collaboration
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}

/* ─── Product Card ───────────────────────────────────────────────── */

function ProductCard({ product, index }: { product: Product; index: number }) {
    const categoryColor = CATEGORY_COLORS[product.category] || "#00A3FF";

    return (
        <div
            className="group bg-white rounded-3xl border border-zinc-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 hover:border-zinc-300"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {/* Image Area */}
            <div className="relative w-full aspect-square bg-gradient-to-b from-zinc-50 to-zinc-100 overflow-hidden flex items-center justify-center p-6">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-zinc-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span className="text-xs font-medium uppercase tracking-widest">Coming Soon</span>
                    </div>
                )}

                {/* Category Badge - top right */}
                <div
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border"
                    style={{
                        backgroundColor: `${categoryColor}15`,
                        color: categoryColor,
                        borderColor: `${categoryColor}30`,
                    }}
                >
                    {CATEGORY_LABELS[product.category] || product.category}
                </div>
            </div>

            {/* Info */}
            <div className="px-6 py-5 border-t border-zinc-100">
                <h3 className="text-[17px] font-semibold text-[#121212] tracking-tight leading-tight group-hover:text-[#00A3FF] transition-colors duration-300">
                    {product.name}
                </h3>
                <p className="text-zinc-400 text-[13px] font-medium mt-1.5 uppercase tracking-wider">
                    {CATEGORY_LABELS[product.category] || product.category}
                </p>
            </div>
        </div>
    );
}
