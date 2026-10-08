"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/admin/login");
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.push("/admin/login");
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    // The drawer closes itself: every nav Link in AdminSidebar calls onClose,
    // so no pathname effect is needed (and a setState in an effect would cost
    // an extra render on every navigation).

    // Lock body scroll behind the mobile drawer.
    useEffect(() => {
        if (!sidebarOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [sidebarOpen]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-[#00A3FF] animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans flex text-[#121212]">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Backdrop for the mobile drawer */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    aria-hidden="true"
                />
            )}

            {/* Mobile top bar — the only way to reach the nav below lg */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 z-30">
                <Image
                    src="/inspira-logo.png"
                    alt="Inspira Worldwide Logo"
                    width={160}
                    height={48}
                    priority
                    className="object-contain w-auto h-8 brightness-0 invert"
                />
                <button
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open menu"
                    aria-expanded={sidebarOpen}
                    className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <Menu size={22} />
                </button>
            </header>

            {/* min-w-0 stops wide children (tables, long strings) forcing the flex item open */}
            <main className="flex-1 min-w-0 w-full lg:ml-64 p-4 sm:p-6 md:p-8 lg:p-12 pt-20 lg:pt-12 overflow-y-auto h-screen">
                <div className="max-w-[1800px] mx-auto w-full h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
