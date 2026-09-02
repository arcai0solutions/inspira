import React from "react";
import BannersClient from "./BannersClient";

export const metadata = {
    title: "Hero Banners - Dashboard | Inspira Worldwide",
    description: "Manage the rotating banners shown on the Inspira Worldwide homepage.",
    robots: { index: false, follow: false },
};

export default function AdminBannersPage() {
    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-8">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-[#121212] mb-2">
                        Hero Banners
                    </h2>
                    <p className="text-zinc-500 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                        Upload, reorder, and edit the rotating banners on the homepage.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <BannersClient />
        </div>
    );
}
