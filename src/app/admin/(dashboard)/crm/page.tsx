import React from "react";
import CRMClient from "./CRMClient";

export const metadata = {
    title: "CRM Pipeline | Inspira Worldwide",
    description: "Manage leads and opportunities through the Inspira sales pipeline.",
};

export default function CRMPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-[#121212] mb-2">
                        CRM Pipeline
                    </h2>
                    <p className="text-zinc-500 font-light flex items-center gap-2">
                        Track and manage your leads from initial inquiry to close.
                    </p>
                </div>
            </div>

            {/* Content Section - Full Height for Kanban */}
            <div className="flex-1 bg-[#FAFAFA] rounded-2xl border border-zinc-200 overflow-hidden relative shadow-inner">
                <CRMClient />
            </div>
        </div>
    );
}
