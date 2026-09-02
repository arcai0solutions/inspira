"use client";

import React from "react";
import Link from "next/link";
import { BadgeCheck, Warehouse, Snowflake, Truck, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/banners";

/**
 * Credibility block: the licensing and physical infrastructure behind the service.
 *
 * NOTE FOR CONTENT OWNERS — the copy below is deliberately qualitative. Once Inspira
 * confirms its verified figures (NMRA licence number, pallet positions, cold-room
 * volume, fleet size), drop them into the `metric` field of each capability.
 */
const capabilities = [
    {
        icon: BadgeCheck,
        label: "Regulatory",
        title: "NMRA Approved",
        metric: "Licensed & audited",
        description:
            "Licensed under Sri Lanka's National Medicines Regulatory Authority. Every product we store, handle and move travels under NMRA-compliant conditions with full batch traceability.",
    },
    {
        icon: Warehouse,
        label: "Storage",
        title: "Warehouse Capacity",
        metric: "Racked bulk storage",
        description:
            "Purpose-built ambient warehousing with racked pallet positions, segregated quarantine and rejected-stock zones, and batch-level inventory control on every line we carry.",
    },
    {
        icon: Snowflake,
        label: "Cold Chain",
        title: "Cold-Storage Facilities",
        metric: "Continuously monitored",
        description:
            "Temperature-controlled cold rooms with continuous monitoring, alarmed excursion handling and documented chain-of-custody for products that have to stay in range.",
    },
    {
        icon: Truck,
        label: "3PL",
        title: "Third-Party Delivery",
        metric: "Island-wide coverage",
        description:
            "Full third-party pharmaceutical delivery for manufacturers and principals who need island-wide reach without building and running a fleet of their own.",
    },
];

export default function Infrastructure() {
    return (
        <section
            id="infrastructure"
            className="bg-[#fafafa] py-24 md:py-32 px-6 md:px-12 w-full flex justify-center"
        >
            <div className="w-full max-w-[1400px] flex flex-col">

                {/* ---------- HEADER ---------- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00A3FF]/25 bg-[#00A3FF]/[0.07] mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#00A3FF]" aria-hidden="true" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0077BB]">
                                Licensed Infrastructure
                            </span>
                        </div>

                        <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.05] tracking-tight text-zinc-900">
                            Trusted Partner. <span className="text-zinc-500">Reliable Solutions.</span>
                        </h2>
                    </div>

                    <p className="text-[17px] md:text-[19px] text-[#616161] max-w-md leading-[1.6] font-medium lg:pb-3">
                        Regulatory approval, real storage capacity and a delivery network you can
                        put your products on — the foundations behind every shipment we handle.
                    </p>
                </div>

                {/* ---------- CAPABILITY CARDS ---------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {capabilities.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="bg-white rounded-[24px] p-7 md:p-8 border border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,163,255,0.08)] hover:border-[#00A3FF]/25 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#00A3FF]/10 to-[#005495]/5 border border-[#00A3FF]/15 flex items-center justify-center mb-6">
                                    <Icon className="w-[22px] h-[22px] text-[#0077BB]" strokeWidth={1.8} />
                                </div>

                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 mb-2.5">
                                    {item.label}
                                </span>

                                <h3 className="text-[20px] md:text-[21px] font-semibold text-[#121212] tracking-tight leading-tight mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-[13px] font-semibold text-[#0077BB] mb-4">
                                    {item.metric}
                                </p>

                                <p className="text-[#616161] text-[14px] md:text-[15px] leading-[1.6]">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* ---------- CALL TO ACTION ---------- */}
                <div className="mt-6 md:mt-5 bg-[#0A1128] rounded-[24px] p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
                    {/* Ambient glow */}
                    <div
                        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/15 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-xl">
                        <h3 className="text-[26px] md:text-[34px] font-medium text-white leading-[1.15] tracking-tight mb-3">
                            Want to see the facilities for yourself?
                        </h3>
                        <p className="text-white/65 text-[15px] md:text-[17px] leading-relaxed">
                            Walk our warehouse, review our licensing, and tell us what you need moved.
                            We will show you exactly how your products would be handled.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                        <Link
                            href="/contact"
                            className="group bg-white hover:bg-zinc-100 text-[#121212] px-7 py-4 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Book a Meeting
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <a
                            href={PHONE_HREF}
                            aria-label={`Call Inspira Worldwide on ${PHONE_NUMBER}`}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-4 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            Call
                        </a>

                        <Link
                            href="/contact"
                            className="bg-transparent hover:bg-white/10 border border-white/20 text-white px-7 py-4 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <MessageSquare className="w-4 h-4" aria-hidden="true" />
                            Let&apos;s Have a Chat?
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
