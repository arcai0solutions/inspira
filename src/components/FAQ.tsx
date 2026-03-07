"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

// The 8 questions listed in the provided HTML. Placeholder answers are provided.
const faqs = [
    {
        id: "faq-1",
        question: "What does Inspira Worldwide do?",
        answer: "Inspira Worldwide is a pharmaceutical distribution partner in Sri Lanka that helps domestic manufacturers outsource their distribution and marketing functions. The company supports market access through integrated logistics, strategic brand building, and island-wide delivery solutions."
    },
    {
        id: "faq-2",
        question: "Who do you work with?",
        answer: "We primarily work with domestic pharmaceutical manufacturing organizations looking for a reliable partner to manage distribution, marketing support, and commercial expansion in the local market."
    },
    {
        id: "faq-3",
        question: "Do you offer island-wide distribution?",
        answer: "Yes. Our direct distribution channels are built to ensure on-time, island-wide delivery across Sri Lanka, helping products reach pharmacies, hospitals, and healthcare institutions efficiently."
    },
    {
        id: "faq-4",
        question: "Beyond logistics, do you support brand growth?",
        answer: "Yes. We do more than move products. Our team also supports pharmaceutical brand building through practical, goal-aligned marketing strategies designed to strengthen visibility and grow market share."
    },
    {
        id: "faq-5",
        question: "How do you handle warehousing and product safety?",
        answer: "Our warehousing approach is designed to minimize risk, reduce wastage, and optimize storage based on the unique characteristics of each product. We focus on careful storage, sorting, and transportation to help protect product integrity from dispatch to delivery."
    },
    {
        id: "faq-6",
        question: "Why should manufacturers outsource distribution to Inspira?",
        answer: "Outsourcing to Inspira gives manufacturers access to an established distribution network, practical market support, and a dedicated team that handles logistics, warehousing, transportation, and field marketing. This allows manufacturers to stay focused on production and product development."
    },
    {
        id: "faq-7",
        question: "What makes Inspira different from other distribution partners?",
        answer: "Inspira is built around speed, flexibility, strong industry knowledge, and long-term business partnerships. The company positions itself as a reliable extension of its partners, offering robust infrastructure, easy market access, and a strong focus on continuous improvement."
    },
    {
        id: "faq-8",
        question: "How can I start a partnership with Inspira?",
        answer: "You can connect with the corporate team to discuss tailored outsourcing solutions, marketing partnerships, and island-wide logistics support. Inspira’s partnership approach is built around long-term value, shared growth, and practical execution."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white pt-0 pb-24 px-4 md:px-12 w-full flex justify-center overflow-hidden">
            <div className="w-full max-w-[1400px] flex flex-col gap-12 md:gap-20">

                {/* Header Lockup */}
                <div className="flex flex-col w-full">
                    <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium text-[#121212] leading-[1.05] tracking-tight mb-12 md:mb-16">
                        FAQ
                    </h1>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-8 lg:gap-16">
                        {/* Left Subtitle (previously center) */}
                        <div className="flex-1 max-w-[500px]">
                            <h4 className="text-[#121212] text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-[1.3] md:leading-[1.2] tracking-tight">
                                Clear answers about our distribution and marketing partnerships.
                            </h4>
                        </div>

                        {/* Right Info Text */}
                        <div className="lg:w-[250px] text-left lg:text-right shrink-0">
                            <p className="text-[#666666] text-[13px] md:text-[14px] leading-relaxed">
                                Spend less time on logistics and<br className="hidden lg:block" /> more time on production.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full items-start">

                    {/* Left Column: Accordion List (8 items) */}
                    <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-2 relative z-20">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={faq.id}
                                    className="bg-white border border-gray-100 shadow-sm rounded-[8px] overflow-hidden transition-all duration-300 w-full"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full min-h-[84px] p-6 lg:px-8 flex justify-between items-center text-left focus:outline-none cursor-pointer group"
                                    >
                                        <h3 className="text-[16px] md:text-[18px] font-medium text-[#121212] pr-6 group-hover:text-[#00A3FF] transition-colors">
                                            {faq.question}
                                        </h3>

                                        {/* Animated Burger/X Icon */}
                                        <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                            <div className="relative w-[18px] h-[18px]">
                                                {/* Top line */}
                                                <div
                                                    className={`absolute left-0 right-0 h-[1.5px] bg-[#00A3FF] transition-all duration-300 rounded-[1px]
                                                    ${isOpen ? 'top-[8.5px] rotate-45' : 'top-[5px] rotate-0 group-hover:bg-[#38bdf8]'}`}
                                                />
                                                {/* Bottom line */}
                                                <div
                                                    className={`absolute left-0 right-0 h-[1.5px] bg-[#00A3FF] transition-all duration-300 rounded-[1px]
                                                    ${isOpen ? 'top-[8.5px] -rotate-45' : 'top-[11.5px] rotate-0 group-hover:bg-[#38bdf8]'}`}
                                                />
                                            </div>
                                        </div>
                                    </button>

                                    {/* Accordion Content */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 lg:px-8 lg:pb-8 text-[14px] md:text-[15px] leading-relaxed text-[#666666]">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Static Contact Card & Visual */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 sticky top-24">

                        {/* Top: Image Container */}
                        <div className="relative w-full aspect-[16/10] md:aspect-[2/1] bg-[#1a1a1c] rounded-[8px] overflow-hidden">
                            <Image
                                src="https://framerusercontent.com/images/KpEfVsf7ELYFYWiiLz5v4q0aks0.jpeg"
                                alt="Team sitting at the table"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Spinning Text Badge Decorator */}
                            <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 w-[90px] h-[90px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                                {/* Orange center dot (styled as blue to match theme) */}
                                <div className="absolute w-[24px] h-[24px] rounded-full bg-[#00A3FF] z-10" />

                                {/* SVG Spinning text ring */}
                                <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-80">
                                    <svg viewBox="0 0 100 100" overflow="visible" className="w-full h-full text-white fill-current">
                                        <path id="badge-curve" d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50" strokeWidth="none" fill="transparent"></path>
                                        <text>
                                            <textPath href="#badge-curve" startOffset="0" dominantBaseline="central" style={{ fontSize: '15.5px', fontWeight: 500, letterSpacing: '0.04em' }}>
                                                we handle distribution, you drive growth -
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Contact Call to action */}
                        <div className="bg-white border border-gray-100 shadow-sm rounded-[8px] p-8 md:p-10 flex flex-col gap-6 w-full">
                            <h4 className="text-[24px] md:text-[32px] font-semibold text-[#121212] tracking-tight">
                                Ready to partner with us?
                            </h4>
                            <p className="text-[#666666] text-[15px] md:text-[16px] leading-relaxed max-w-[90%]">
                                Every manufacturer's needs are different. Let our experts show you how Inspira can streamline your distribution and amplify your market reach — let's have a chat and find the right solution for you.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mt-4">
                                <span className="text-[#121212] font-medium text-[15px]">
                                    Let's have a chat
                                </span>
                                <a
                                    href="#contact"
                                    aria-label="Contact us"
                                    className="w-[44px] h-[44px] flex-shrink-0 rounded-xl bg-[#00A3FF] hover:bg-[#38bdf8] flex items-center justify-center transition-colors shadow-sm group"
                                >
                                    <MoveRight className="text-white w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
