import React from "react";
import Image from "next/image";
import AdminLoginClient from "./AdminLoginClient";

export const metadata = {
    title: "Admin Login | Inspira Worldwide",
    description: "Secure login for Inspira Worldwide administrators.",
    robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#38bdf8]/5 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')", backgroundSize: "400px", mixBlendMode: 'overlay' }} />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/inspira-logo.png"
                        alt="Inspira Worldwide Logo"
                        width={200}
                        height={60}
                        priority
                        className="object-contain w-auto h-12 md:h-14 brightness-0 invert"
                    />
                </div>
                <h2 className="mt-2 text-center text-3xl font-medium tracking-tight text-white mb-2">
                    Welcome Back.
                </h2>
                <p className="text-center text-zinc-400 font-light text-sm">
                    Enter your credentials to access the Inspira Dashboard.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/[0.03] backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-[#ffffff10]">
                    <AdminLoginClient />
                </div>

                <div className="mt-8 text-center text-xs text-zinc-600 font-light">
                    &copy; {new Date().getFullYear()} Inspira Worldwide. Secure Access Area.
                </div>
            </div>
        </main>
    );
}
