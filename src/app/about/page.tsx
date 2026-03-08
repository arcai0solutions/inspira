import React from "react";
import Footer from "@/components/Footer";
import AboutClient from "./AboutClient";

export const metadata = {
    title: "About Us | Inspira Worldwide",
    description: "Learn about Inspira Worldwide, a dynamic distribution specialist serving domestic pharmaceutical manufacturers in Sri Lanka.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <AboutClient />
            <Footer />
        </main>
    );
}
