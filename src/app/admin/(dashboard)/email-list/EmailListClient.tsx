"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Download, Search, Trash2, Loader2 } from "lucide-react";

interface Subscriber {
    id: string;
    email: string;
    name: string | null;
    source: string;
    created_at: string;
}

export default function EmailListClient() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const { data, error } = await supabase
                .from("email_subscribers")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            if (data) setSubscribers(data);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

        setDeletingId(id);
        try {
            const { error } = await supabase
                .from("email_subscribers")
                .delete()
                .eq("id", id);

            if (error) throw error;
            setSubscribers(subscribers.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error deleting subscriber:", error);
            alert("Failed to delete subscriber.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleExportCSV = () => {
        if (subscribers.length === 0) return;

        const headers = ["Email,Name,Source,Subscribed Date"];
        const csvRows = subscribers.map(s => {
            const date = new Date(s.created_at).toLocaleDateString();
            // Escape commas and quotes
            const name = s.name ? `"${s.name.replace(/"/g, '""')}"` : "";
            const email = `"${s.email.replace(/"/g, '""')}"`;
            const source = `"${s.source}"`;
            return `${email},${name},${source},"${date}"`;
        });

        const csvContent = headers.concat(csvRows).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `email_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A3FF] to-cyan-400 flex items-center justify-center shadow-sm">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-3xl font-bold text-[#121212] tracking-tight">Email List</h1>
                    </div>
                    <p className="text-zinc-500 font-light">
                        Manage your newsletter and popup subscribers.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportCSV}
                        disabled={subscribers.length === 0}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF]/50 transition-all placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="text-sm text-zinc-500 font-medium">
                        Total Subscribers: {subscribers.length}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-600">
                        <thead className="text-xs uppercase bg-zinc-50 text-zinc-500 border-b border-zinc-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">Email Address</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Source</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Date Subscribed</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-[#00A3FF] mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-zinc-400">
                                            <Mail className="w-8 h-8 mb-2 opacity-50" />
                                            <p>{searchTerm ? "No subscribers found matching your search." : "No subscribers yet."}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((subscriber) => (
                                    <tr key={subscriber.id} className="hover:bg-zinc-50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-zinc-900">
                                            {subscriber.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {subscriber.name || <span className="text-zinc-400 italic">Not provided</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${subscriber.source === "popup"
                                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                                }`}>
                                                {subscriber.source}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(subscriber.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(subscriber.id)}
                                                disabled={deletingId === subscriber.id}
                                                className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                                                title="Delete Subscriber"
                                            >
                                                {deletingId === subscriber.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
