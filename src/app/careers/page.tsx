import React from "react";
import Footer from "@/components/Footer";
import CareersClient from "./CareersClient";

export const metadata = {
    title: "Careers | Inspira Worldwide",
    description: "Join Inspira Worldwide and become part of a dynamic team shaping pharmaceutical distribution, marketing, and healthcare logistics across Sri Lanka.",
};

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#00A3FF] selection:text-white">
            <CareersClient />
            <Footer />
        </main>
    );
}
