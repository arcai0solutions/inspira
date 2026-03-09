import React from "react";
import Footer from "@/components/Footer";
import NewsClient from "./NewsClient";

export const metadata = {
    title: "Newsroom | Inspira Worldwide",
    description: "Stay up-to-date with the latest news, updates, and announcements from Inspira Worldwide.",
};

export default function NewsPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <NewsClient />
            <Footer />
        </main>
    );
}
