import React from "react";
import AdminNewsClient from "./AdminNewsClient";

export const metadata = {
    title: "Newsroom Management - Dashboard | Inspira Worldwide",
    description: "Manage Inspira Worldwide news articles and PR announcements.",
    robots: { index: false, follow: false },
};

export default function AdminNewsPage() {
    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-8">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-[#121212] mb-2">
                        Newsroom Management
                    </h2>
                    <p className="text-zinc-500 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 line-block animate-pulse"></span>
                        Create, edit, and manage public announcements.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)]">
                <AdminNewsClient />
            </div>
        </div>
    );
}
