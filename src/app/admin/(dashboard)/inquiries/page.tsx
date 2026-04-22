import React from "react";
import InquiriesClient from "./InquiriesClient";

export const metadata = {
    title: "Website Inquiries | Inspira Worldwide",
    description: "Manage incoming contact forms and inquiries from the website.",
    robots: { index: false, follow: false },
};

export default function InquiriesPage() {
    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-8">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-[#121212] mb-2">
                        Website Inquiries
                    </h2>
                    <p className="text-zinc-500 font-light flex items-center gap-2">
                        Review, manage, and move incoming messages to the CRM Pipeline.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
                <InquiriesClient />
            </div>
        </div>
    );
}
