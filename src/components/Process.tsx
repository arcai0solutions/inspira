"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

const processSteps = [
    {
        id: "01",
        title: "Understand Your Product and Goals",
        description: "We begin by understanding your product portfolio, market objectives, and distribution priorities so we can build the right strategy around your needs.",
        metric: "Week 1",
        metricLabel: "Initial Analysis",
        image: "/process_step_1_real.png"
    },
    {
        id: "02",
        title: "Design the Right Distribution Model",
        description: "Our team develops a practical plan covering warehousing, movement, market access, and promotional support to ensure smooth execution.",
        metric: "Week 2",
        metricLabel: "Strategy & Planning",
        image: "/process_step_2_real.png"
    },
    {
        id: "03",
        title: "Execute with Speed and Precision",
        description: "We activate our distribution channels, logistics coordination, and field support systems to move your products efficiently and reliably across Sri Lanka.",
        metric: "Ongoing",
        metricLabel: "Active Distribution",
        image: "/process_step_3_real.png"
    },
    {
        id: "04",
        title: "Monitor, Improve, and Grow",
        description: "We continuously review performance, refine delivery flows, and support long-term brand growth to help you strengthen your market position.",
        metric: "Quarterly",
        metricLabel: "Performance Review",
        image: "/process_step_4_real.png"
    }
];

export default function Process() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep((prev) => (prev + 1) % processSteps.length);
    };

    const handlePrev = () => {
        setCurrentStep((prev) => (prev === 0 ? processSteps.length - 1 : prev - 1));
    };

    const activeData = processSteps[currentStep];

    return (
        <section id="process" className="bg-[#121212] py-16 md:py-24 px-4 md:px-12 w-full flex justify-center">
            <div className="w-full max-w-[1400px] flex flex-col gap-16 md:gap-24">

                {/* ---------- TOP HEADER SECTIONS ---------- */}
                <div className="flex flex-col gap-8 md:gap-16 w-full">
                    {/* Main Section Title */}
                    <h2 className="text-[#A1A1AA] text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight">
                        Our Process
                    </h2>

                    {/* Sub Line Content */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 pl-0 md:pl-2 pt-4 border-t border-white/5 relative">
                        {/* Number / Label */}
                        <div className="flex flex-col gap-1 w-full md:w-[15%]">
                            <span className="text-white font-medium text-lg">003</span>
                            <span className="text-[#888891] text-[13px] tracking-wide">process</span>
                        </div>

                        {/* Mid Title */}
                        <div className="w-full md:w-[55%]">
                            <h3 className="text-[#E3DBD8] text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight">
                                Optimized processes <br className="hidden md:block" />
                                through simplified workflows.
                            </h3>
                        </div>

                        {/* Right Text */}
                        <div className="w-full md:w-[25%] lg:w-[20%]">
                            <p className="text-[#888891] text-[14px] leading-relaxed">
                                Seamless operations and processes from start to finish.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ---------- CAROUSEL / INTERACTIVE COMPONENT ---------- */}
                <div className="w-full flex flex-col lg:flex-row gap-[2px] bg-white/[0.05] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">

                    {/* LEFT HUGE IMAGE AREA */}
                    <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#161719] relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
                        {/* Soft Gradient Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none" />

                        {/* Product Image Layer (dynamically changing) */}
                        <div className="absolute inset-0 transition-opacity duration-700 w-full h-full flex items-center justify-center p-8 z-0">
                            {/* We use Next Image or standard img. We'll animate it smoothly by rendering all and fading them. */}
                            {processSteps.map((step, index) => (
                                <Image
                                    key={step.id}
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className={`object-cover transition-opacity duration-700 ${currentStep === index ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT INTERACTIVE CONTENT AREA */}
                    <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col gap-[2px]">

                        {/* Top Nav Block */}
                        <div className="flex flex-col md:flex-row w-full h-auto md:h-[120px] gap-[2px]">

                            {/* Nav Indicator Box */}
                            <div className="w-full md:w-[70%] bg-[#1c1d1f] p-8 flex items-center justify-between">
                                <span className="text-[#A1A1AA] text-[16px]">Inspira Process</span>
                                {/* Progress Dots */}
                                <div className="flex items-center gap-2">
                                    {processSteps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-full transition-all duration-300 ${currentStep === index
                                                ? 'w-[20px] h-[6px] bg-[#00A3FF]'
                                                : 'w-[6px] h-[6px] bg-white/20'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Nav Arrows Box */}
                            <div className="w-full md:w-[30%] bg-[#1c1d1f] p-6 lg:p-0 flex items-center justify-center gap-6">
                                <button
                                    onClick={handlePrev}
                                    className="p-3 text-[#00A3FF] hover:bg-white/5 rounded-full transition-colors flex items-center justify-center"
                                    aria-label="Previous step"
                                >
                                    <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="p-3 text-[#00A3FF] hover:bg-white/5 rounded-full transition-colors flex items-center justify-center"
                                    aria-label="Next step"
                                >
                                    <ArrowRight className="w-6 h-6 stroke-[1.5]" />
                                </button>
                            </div>
                        </div>

                        {/* Bottom Content Block */}
                        <div className="flex flex-col md:flex-row w-full flex-grow gap-[2px]">

                            {/* Step Description Box */}
                            <div className="w-full md:w-[70%] bg-[#1c1d1f] p-8 lg:p-12 xl:p-16 flex flex-col justify-between min-h-[400px]">
                                <div className="flex flex-col gap-4 max-w-[500px]">
                                    <h4 className="text-white text-2xl md:text-3xl font-medium tracking-tight">
                                        Step {activeData.id.replace('0', '')} — {activeData.title}
                                    </h4>
                                    <p className="text-[#A1A1AA] text-[15px] md:text-[16px] leading-[1.6]">
                                        {activeData.description}
                                    </p>
                                </div>
                            </div>

                            {/* Call to Action Box */}
                            <div className="w-full md:w-[30%] bg-[#1c1d1f] p-8 flex flex-col items-center justify-center gap-4 text-center">
                                <button className="w-full px-4 py-3.5 bg-[#00A3FF] hover:bg-[#38bdf8] text-[#161719] font-semibold rounded-lg shadow-[0_0_20px_rgba(0,163,255,0.2)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-[14px]">
                                    <Calendar className="w-4 h-4" /> Book a meeting
                                </button>
                                <p className="text-[#888891] text-[12px] md:text-[13px] leading-relaxed max-w-[150px]">
                                    Book a meeting to see this process in action.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Final little helper link at the bottom right */}
                <div className="w-full flex justify-between md:justify-end items-center gap-4 text-sm mt-4">
                    <p className="text-[#888891]">Questions about our process? We're here to help.</p>
                    <button className="bg-[#00A3FF] text-black w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-[#38bdf8] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
