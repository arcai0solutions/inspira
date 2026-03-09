"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-[#00A3FF] animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans flex text-[#121212]">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto h-screen">
                <div className="max-w-[1800px] mx-auto w-full h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
