import React from "react";
import Footer from "@/components/Footer";
import ArticlesClient from "./ArticlesClient";

export const metadata = {
    title: "Industry Articles | Inspira Worldwide",
    description: "In-depth insights on pharmaceutical market entry, cold chain logistics, and retail distribution in Sri Lanka.",
};

export default function ArticlesPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <ArticlesClient />
            <Footer />
        </main>
    );
}
