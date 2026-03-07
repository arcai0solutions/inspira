"use client";

import React, { useState } from "react";

// Pre-defined service items based on the provided HTML and new copy
const services = [
    {
        id: "01",
        title: "Island-Wide Distribution",
        description: "We ensure your products move quickly and reliably through direct distribution channels that reach pharmacies, hospitals, and healthcare institutions across the island."
    },
    {
        id: "02",
        title: "Strategic Brand Building",
        description: "Our marketing and promotions teams help strengthen your market presence with practical, goal-aligned brand strategies that support sustainable growth."
    },
    {
        id: "03",
        title: "Risk-Minimized Warehousing",
        description: "We protect product integrity through careful storage, sorting, and handling processes designed to reduce risk, minimize wastage, and optimize cost."
    },
    {
        id: "04",
        title: "Market Access Support",
        description: "We help manufacturers enter and expand within the local market through strong business connections, practical support, and responsive execution."
    },
    {
        id: "05",
        title: "Supply Chain Coordination",
        description: "From dispatch planning to delivery flow management, we create a streamlined distribution system that keeps your products moving efficiently."
    },
    {
        id: "06",
        title: "Partnership-Led Growth",
        description: "We work as an extension of your business, building long-term partnerships focused on reliability, market expansion, and measurable value."
    }
];

// Plus icon component (rotates into an 'X' when open)
const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
    </svg>
);

// Arrow icon component
const ArrowDiagonalIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
);

export default function Services() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-0 md:py-24 w-full flex justify-center">
            <div className="w-full bg-[#0A1128] rounded-[2rem] relative overflow-hidden flex flex-col p-6 md:p-16 lg:p-24 pb-24 md:pb-16 gap-0">

                {/* Background Noise Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')", backgroundSize: "400px", mixBlendMode: 'overlay', transform: "translateX(15%)" }} />

                {/* Left Column: Heading */}
                <div className="relative z-10 flex-shrink-0 pt-8 md:pt-0 mb-12 md:mb-20">
                    <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl">
                        Our Services.
                    </h2>
                </div>

                {/* Right Column: Accordion */}
                <div className="relative z-10 w-full flex flex-col pt-0">
                    {services.map((service, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={service.id}
                                className={`border-b border-[#333333] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'pb-8 md:pb-12' : ''} ${index === 0 ? 'border-t border-[#333333]' : ''}`}
                            >
                                {/* Accordion Header (Clickable) */}
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full py-6 md:py-8 flex justify-between items-center group text-left focus:outline-none cursor-pointer"
                                >
                                    <h3 className={`text-[18px] sm:text-[22px] md:text-[28px] lg:text-[36px] font-semibold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white group-hover:text-white/80'}`}>
                                        {service.title}
                                    </h3>
                                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
                                        {/* Number (Fades out and scales down on hover/open) */}
                                        <span className={`absolute text-[18px] sm:text-[22px] md:text-[28px] font-medium text-white/80 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50'}`}>
                                            {index + 1}
                                        </span>

                                        {/* Arrow/Plus Icon (Fades in and scales up on hover/open) */}
                                        <div className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'opacity-100 scale-100 rotate-45 text-white' : 'opacity-0 scale-50 rotate-0 text-white group-hover:opacity-100 group-hover:scale-100'}`}>
                                            <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                                        </div>
                                    </div>
                                </button>

                                {/* Accordion Content Drawer */}
                                <div
                                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2 md:mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="flex flex-col gap-8 lg:gap-16 pt-2 pb-4">
                                            {/* Details (No Image) */}
                                            <div className="flex-1 flex flex-col gap-6 md:gap-10">
                                                <p className="text-white/80 text-[18px] md:text-[22px] leading-[1.6] max-w-4xl font-medium">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Bottom See Pricing Button */}
                    <div className="mt-12 md:mt-24 w-full flex justify-start">
                        <a href="#partner" className="bg-[#EBEBEB] hover:bg-white text-[#121212] flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full text-[15px] md:text-[16px] font-medium transition-colors w-fit group">
                            Partner With Us
                            <span className="transform group-hover:rotate-45 transition-transform duration-300">
                                <ArrowDiagonalIcon className="w-4 h-4" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
