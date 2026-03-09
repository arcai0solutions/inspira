import React from "react";
import ContactsClient from "./ContactsClient";

export const metadata = {
    title: "Contacts Registry | Inspira Worldwide",
    description: "Master list of all contacts, leads, and inquiries.",
};

export default function ContactsPage() {
    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-8">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-[#121212] mb-2">
                        Contacts Registry
                    </h2>
                    <p className="text-zinc-500 font-light flex items-center gap-2">
                        Master database of all people who have interacted with Inspira.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                <ContactsClient />
            </div>
        </div>
    );
}
