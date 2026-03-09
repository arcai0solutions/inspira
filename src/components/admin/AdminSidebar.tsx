"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, LogOut, MessageSquare, Briefcase, ContactRound, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Newsroom", href: "/admin/news", icon: Newspaper },
        { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
        { name: "CRM Pipeline", href: "/admin/crm", icon: Briefcase },
        { name: "Contacts", href: "/admin/contacts", icon: ContactRound },
        { name: "Email List", href: "/admin/email-list", icon: Mail },
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0a0a0a] text-white border-r border-[#ffffff10] flex flex-col pt-6 z-50">
            {/* Logo Area */}
            <div className="px-8 pb-8 pt-6 border-b border-[#ffffff10] flex justify-center">
                <Image
                    src="/inspira-logo.png"
                    alt="Inspira Worldwide Logo"
                    width={200}
                    height={60}
                    priority
                    className="object-contain w-auto h-12 brightness-0 invert"
                />
            </div>

            {/* Navigation */}
            <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-4">Menu</span>

                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href) && (item.href === "/admin" ? pathname === "/admin" : true);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? "bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20"
                                : "text-zinc-400 hover:text-white hover:bg-[#ffffff08] border border-transparent"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-[#00A3FF]" : "text-zinc-500 group-hover:text-zinc-300 transition-colors"} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* User Profile / Sign Out */}
            <div className="p-4 border-t border-[#ffffff10]">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group"
                >
                    <LogOut size={20} className="text-zinc-500 group-hover:text-red-400" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
