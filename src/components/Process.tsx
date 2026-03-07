"use client";

import React from "react";
import Image from "next/image";
import { Check, Calendar } from "lucide-react";

const processSteps = [
    {
        id: "01",
        title: "Understand Your Product and Goals",
        description: "We begin by understanding your product portfolio, market objectives, and distribution priorities so we can build the right strategy around your needs.",
        video: "/step_1_compressed.mp4",
        tags: ["Portfolio Analysis", "Market Objectives", "Distribution Priorities", "Strategy Docs"]
    },
    {
        id: "02",
        title: "Design the Right Distribution Model",
        description: "Our team develops a practical plan covering warehousing, movement, market access, and promotional support to ensure smooth execution.",
        video: "/step_2_compressed.mp4",
        tags: ["Warehousing Setup", "Logistics Plan", "Market Access", "Promotional Support"]
    },
    {
        id: "03",
        title: "Execute with Speed and Precision",
        description: "We activate our distribution channels, logistics coordination, and field support systems to move your products efficiently and reliably across Sri Lanka.",
        video: "/step_3_compressed.mp4",
        tags: ["Channel Activation", "Logistics Coord", "Field Support", "Fast Delivery"]
    },
    {
        id: "04",
        title: "Monitor, Improve, and Grow",
        description: "We continuously review performance, refine delivery flows, and support long-term brand growth to help you strengthen your market position.",
        video: "/step_4_compressed.mp4",
        tags: ["Performance Review", "Refining Flows", "Brand Growth", "Market Position"]
    }
];

export default function Process() {
    return (
        <section id="process" className="bg-[#fafafa] pt-15  pb-40 w-full flex flex-col items-center font-sans tracking-tight relative">

            {/* ---------- HEADER ---------- */}
            <div className="w-full max-w-[1400px] px-6 md:px-12 flex flex-col items-start gap-4 mb-16 md:mb-24">
                <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-medium leading-[1.05] tracking-tight text-[#121212] max-w-4xl">
                    Our Process
                </h2>
                <p className="text-[17px] md:text-[20px] text-[#616161] max-w-2xl leading-[1.6] mt-2 font-medium">
                    Seamless operations from start to finish. We design and execute practical plans covering warehousing, movement, market access, and promotional support.
                </p>
            </div>

            <div className="w-full max-w-[1240px] px-5 md:px-10 flex flex-col items-center">

                {/* ---------- STACKING CARDS ---------- */}
                <div className="w-full flex flex-col relative pb-10">
                    {processSteps.map((step, index) => {
                        return (
                            <div
                                key={step.id}
                                className="sticky w-full bg-white border border-[#EBEBEB] rounded-[32px] p-6 md:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row gap-8 lg:gap-14 mb-[6vh] lg:mb-[8vh] transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgb(0,163,255,0.06)] hover:border-[#0088CC]/20 group/card"
                                style={{
                                    top: `calc(120px + ${index * 40}px)`,
                                    zIndex: index + 10,
                                }}
                            >
                                {/* Left Video Column */}
                                <div className="w-full lg:w-[45%] h-[300px] sm:h-[400px] lg:h-[480px] rounded-[16px] overflow-hidden relative shrink-0 shadow-sm border border-black/5">
                                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 transition-opacity duration-500 opacity-0 group-hover/card:opacity-100 pointer-events-none" />
                                    <video
                                        src={step.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        suppressHydrationWarning
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                                    />
                                </div>

                                {/* Right Content Column */}
                                <div className="w-full lg:w-[55%] flex flex-col justify-start py-4 lg:py-6 h-full min-h-[300px] lg:min-h-[480px]">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6 md:mb-8">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 shadow-sm shrink-0">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00A3FF] to-[#005495] font-bold text-xl">
                                                {step.id}
                                            </span>
                                        </div>
                                        <h3 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-[#121212] leading-[1.15] tracking-tight group-hover/card:text-[#005495] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[17px] md:text-[19px] text-[#616161] leading-[1.6] mb-10 max-w-xl">
                                        {step.description}
                                    </p>

                                    {/* Skills / Items grid */}
                                    <div className="flex flex-wrap gap-3 md:gap-4 mt-auto pt-4">
                                        {step.tags.map((tag, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 bg-[#F8F9FA] border border-[#EBEBEB] shadow-sm rounded-[100px] px-2 py-2 pr-5 transition-all duration-300 hover:shadow-md hover:border-[#0088CC]/30 group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00A3FF] via-[#0088CC] to-[#005495] flex items-center justify-center shrink-0 shadow-inner">
                                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                </div>
                                                <span className="text-[#121212] text-[14px] md:text-[15px] font-medium whitespace-nowrap group-hover:text-[#0088CC] transition-colors">
                                                    {tag}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ---------- BOTTOM CALL TO ACTION ---------- */}
                <div className="mt-10 md:mt-16 w-full flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#00A3FF]/10 to-[#005495]/5 border border-blue-100 rounded-[32px] p-8 md:p-12 lg:p-16 relative overflow-hidden backdrop-blur-md shadow-[0_8px_30px_rgb(0,163,255,0.06)]">
                    {/* Dark depth gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#005495]/10 via-transparent to-white/20 z-0 pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-4 max-w-xl">
                        <h3 className="text-[32px] md:text-[40px] font-medium leading-[1.1] text-[#121212] tracking-tight">
                            Ready to see this process in action?
                        </h3>
                        <p className="text-[#616161] text-[16px] md:text-[18px] leading-relaxed">
                            Book a meeting with our team to discuss how our streamlined process can benefit your brand.
                        </p>
                    </div>

                    <div className="relative z-10 shrink-0 w-full lg:w-auto">
                        <a href="#contact" className="w-full flex">
                            <button
                                className="w-full lg:w-auto relative flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#121212] hover:bg-[#222222] text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 15px 30px -10px" }}
                            >
                                <Calendar className="w-5 h-5 drop-shadow-md" />
                                <span className="font-semibold tracking-wide text-[16px] drop-shadow-md">Book a meeting</span>
                            </button>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
