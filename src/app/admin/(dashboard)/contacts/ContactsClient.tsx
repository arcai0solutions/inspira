"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Loader2 } from "lucide-react";

interface Contact {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    created_at: string;
}

export default function ContactsClient() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (contact.company && contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex flex-col w-full">
            {/* Search Bar */}
            <div className="p-6 border-b border-zinc-100 bg-[#FAFAFA]">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-zinc-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search contacts by name, email, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-xl leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] focus:border-[#00A3FF] sm:text-sm transition-colors"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200">
                    <thead className="bg-[#FAFAFA]">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Contact Info
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Date Added
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-zinc-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#00A3FF] mx-auto" />
                                </td>
                            </tr>
                        ) : filteredContacts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-light">
                                    {searchQuery ? "No contacts match your search." : "No contacts found in the registry."}
                                </td>
                            </tr>
                        ) : (
                            filteredContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-zinc-900">{contact.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-zinc-600">{contact.email || '-'}</div>
                                        <div className="text-xs text-zinc-400 mt-0.5">{contact.phone || ''}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.company ? 'bg-blue-100 text-blue-800' : 'bg-zinc-100 text-zinc-500'}`}>
                                            {contact.company || 'Not Specified'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                                        {new Date(contact.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
