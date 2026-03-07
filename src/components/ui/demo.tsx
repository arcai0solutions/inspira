"use client";

import { ShieldCheck, MapPin, Briefcase } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
    {
        id: 1,
        title: "Marketing & Distribution",
        date: "Active",
        content: "Exclusive Marketing & Distribution Arm for Newgen Lanka Healthcare Pvt Ltd.",
        category: "Operations",
        icon: Briefcase,
        relatedIds: [2, 3],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 2,
        title: "Trusted Partner",
        date: "Established",
        content: "Trusted Domestic Pharma Manufacturing Distribution Partner.",
        category: "Partnerships",
        icon: ShieldCheck,
        relatedIds: [1],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 3,
        title: "Island-Wide Reach",
        date: "Ongoing",
        content: "100% Island-Wide Healthcare Reach & Compliance.",
        category: "Coverage",
        icon: MapPin,
        relatedIds: [1, 2],
        status: "in-progress" as const,
        energy: 85,
    },
];

export function TrustBarTimelineDemo() {
    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    A Network of Trust
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                    At the core of our operations lies a dynamic, interconnected network of reliability and excellence.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                    As the exclusive distribution arm for Newgen Lanka Healthcare, our island-wide reach and strategic partnerships form a continuous orbit of seamless pharmaceutical distribution.
                </p>
            </div>
            <div className="w-full lg:w-7/12 flex justify-center lg:justify-end">
                <RadialOrbitalTimeline timelineData={timelineData} />
            </div>
        </div>
    );
}

export default TrustBarTimelineDemo;
