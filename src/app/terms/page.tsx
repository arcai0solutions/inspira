import React from "react";
import Footer from "@/components/Footer";
import TermsClient from "./TermsClient";

export const metadata = {
    title: "Terms of Service | Inspira Worldwide",
    description: "Terms and conditions for using the Inspira Worldwide website and services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <TermsClient />
            <Footer />
        </main>
    );
}
