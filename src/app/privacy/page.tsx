import React from "react";
import Footer from "@/components/Footer";
import PrivacyClient from "./PrivacyClient";

export const metadata = {
    title: "Privacy Policy | Inspira Worldwide",
    description: "Learn how Inspira Worldwide collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <PrivacyClient />
            <Footer />
        </main>
    );
}
