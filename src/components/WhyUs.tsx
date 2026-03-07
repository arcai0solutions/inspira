"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Handshake, Building2, ShieldPlus, Zap, Shield, TrendingUp } from "lucide-react";

// Custom SVG Icons based on the Framer design
const PlusCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
    </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
    </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
    </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z"></path>
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
    </svg>
);

export default function WhyUs() {
    return (
        <section className="py-24 px-6 md:px-12 bg-white flex flex-col items-center">
            <div className="w-full max-w-[1400px]">
                {/* Header Section */}
                <div className="mb-20 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.05] tracking-tight text-zinc-900 max-w-4xl">
                        Delivering healthcare logistics with <span className="text-zinc-500">precision and speed.</span>
                    </h2>
                </div>

                {/* CSS Grid for Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

                    {/* Column 1: Image & List */}
                    <div className="flex flex-col gap-4 md:gap-5">
                        {/* Top Image Card */}
                        <div className="relative rounded-[24px] overflow-hidden bg-[#1A1A1A] h-[140px] lg:h-[160px] p-5 flex flex-col justify-between group">
                            <Image
                                src="/b2b-logistics.png"
                                alt="Precision Healthcare Logistics"
                                fill
                                className="object-cover object-top opacity-80"
                            />
                            <h3 className="relative z-10 text-white text-[28px] font-medium max-w-[240px] leading-[1.15] tracking-tight">
                                Precision Healthcare Logistics.
                            </h3>
                        </div>

                        {/* Bottom Points Card */}
                        <div className="bg-white rounded-[24px] p-8 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-center gap-10 flex-1">
                            {[
                                "Island-Wide Reach",
                                "Direct Distribution Channels",
                                "Strategic Brand Building",
                                "Risk-Minimized Storage",
                                "Multi-Therapeutic Portfolios"
                            ].map((point, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-[18px] h-[18px] text-[#121212] flex-shrink-0" />
                                    <span className="text-[#121212] font-medium text-[15px] leading-tight">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Testimonial */}
                    <div className="bg-[#F8F9FA] rounded-[24px] p-5 relative overflow-hidden flex flex-col justify-between min-h-[220px] lg:min-h-full border border-zinc-200/50">
                        {/* Background Video & Overlay */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                suppressHydrationWarning
                                className="object-cover object-center w-full h-full"
                            >
                                <source src="/abstract-vid.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-white/60 sm:bg-white/70" />
                        </div>

                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <div className="flex -space-x-2">
                                <div className="w-11 h-11 rounded-full border-[1.5px] border-white bg-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm relative z-30">
                                    <Handshake className="w-5 h-5" />
                                </div>
                                <div className="w-11 h-11 rounded-full border-[1.5px] border-white bg-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm relative z-20">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div className="w-11 h-11 rounded-full border-[1.5px] border-white bg-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm relative z-10">
                                    <ShieldPlus className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 font-medium text-[15px]">
                                5.0/5
                                <StarIcon className="w-4 h-4 text-zinc-400" />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="font-medium text-zinc-900 text-lg">Trusted Domestic Distribution Partner</p>
                        </div>

                        <div className="relative z-10 mt-auto pt-4">
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-[18px] h-[18px] text-[#121212]" />
                                ))}
                            </div>
                            <p className="text-[#4D4D4D] font-medium text-[16px] leading-[1.4] tracking-tight mb-4">
                                "Inspira provides the exact speed, flexibility, and robust infrastructure our manufacturing operations need to seamlessly reach patients across Sri Lanka."
                            </p>
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="font-semibold text-zinc-900 text-[15px] leading-tight mb-0.5">Exclusive Distribution Partner</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Stacked Features */}
                    <div className="flex flex-col gap-4 md:gap-5">
                        <div className="bg-white rounded-[24px] p-5 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 flex flex-col justify-center">
                            <Zap className="w-5 h-5 text-[#121212] mb-2" />
                            <h4 className="font-bold text-[#121212] text-[15px] tracking-tight mb-1.5">Speed & Flexibility</h4>
                            <p className="text-[#777777] font-medium text-[14px] leading-[1.4]">Our agile operations and energetic management adapt instantly to market needs, ensuring your supply chain moves without bottlenecks.</p>
                        </div>
                        <div className="bg-white rounded-[24px] p-5 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 flex flex-col justify-center">
                            <Shield className="w-5 h-5 text-[#121212] mb-2" />
                            <h4 className="font-bold text-[#121212] text-[15px] tracking-tight mb-1.5">Seamless Outsourcing</h4>
                            <p className="text-[#777777] font-medium text-[14px] leading-[1.4]">We take over the complexities of warehousing, sorting, and logistics so you can focus solely on engineering life-saving therapeutics.</p>
                        </div>
                        <div className="bg-white rounded-[24px] p-5 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 flex flex-col justify-center">
                            <TrendingUp className="w-5 h-5 text-[#121212] mb-2" />
                            <h4 className="font-bold text-[#121212] text-[15px] tracking-tight mb-1.5">Dedicated Field Teams</h4>
                            <p className="text-[#777777] font-medium text-[14px] leading-[1.4]">Our talented marketing teams provide practical support and execute time-tested promotional strategies to grow your market share locally.</p>
                        </div>
                    </div>

                    {/* Column 4: Dark Concept Card */}
                    <div className="relative rounded-[24px] overflow-hidden bg-[#1A1A1A] min-h-[220px] lg:min-h-full p-6 flex flex-col justify-between text-center group">
                        <Image
                            src="/warehouse-vertical.png"
                            alt="Inspira Worldwide Delivery"
                            fill
                            className="object-cover object-top opacity-80"
                        />
                        <div className="relative z-10 text-white font-medium text-[15px]">
                            Inspira Worldwide®
                        </div>
                        <div className="relative z-10 mt-auto pb-4">
                            <h3 className="text-white text-[28px] font-bold tracking-tight mb-1.5">A Healthy Life.</h3>
                            <p className="text-[#A8A8A8] font-medium text-[15px]">Delivering excellence across Sri Lanka.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
