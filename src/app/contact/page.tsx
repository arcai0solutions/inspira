import React from "react";
import Footer from "@/components/Footer";
import ContactClient from "./ContactClient";

export const metadata = {
    title: "Contact | Inspira Worldwide",
    description: "Got a question, challenge, or idea? Reach out to Inspira Worldwide.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <ContactClient />
            <Footer />
        </main>
    );
}
