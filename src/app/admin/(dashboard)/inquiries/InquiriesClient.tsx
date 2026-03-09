"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Trash2, ArrowRightCircle, Mail, Phone, Calendar, User } from "lucide-react";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    contact_id: string | null;
    created_at: string;
}

export default function InquiriesClient() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setInquiries(data);
        } catch (error) {
            console.error("Error fetching inquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this inquiry? It will still remain in your Contacts Registry.")) return;

        setActionLoading(id);
        try {
            const { error } = await supabase
                .from('inquiries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setInquiries(inquiries.filter(i => i.id !== id));
        } catch (error) {
            console.error("Error deleting inquiry:", error);
            alert("Failed to delete inquiry.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleMoveToCRM = async (inquiry: Inquiry) => {
        setActionLoading(`move-${inquiry.id}`);
        try {
            // 1. Get the "New Leads" stage ID
            const { data: stages, error: stageError } = await supabase
                .from('crm_stages')
                .select('id')
                .eq('name', 'New Leads')
                .limit(1)
                .single();

            if (stageError) throw new Error("Could not find 'New Leads' stage. Please ensure your CRM is initialized.");

            // 2. Get the current highest position in that stage to append to the bottom
            const { data: existingLeads, error: countError } = await supabase
                .from('crm_leads')
                .select('position')
                .eq('stage_id', stages.id)
                .order('position', { ascending: false })
                .limit(1);

            if (countError) throw countError;

            const nextPosition = existingLeads && existingLeads.length > 0 ? existingLeads[0].position + 1024 : 1024;

            // 3. Insert into CRM Leads
            // First try to resolve the contact_id if it's missing (happens for anonymous public inquiries)
            let resolvedContactId = inquiry.contact_id;
            if (!resolvedContactId && inquiry.email) {
                const { data } = await supabase.from('contacts').select('id').eq('email', inquiry.email).limit(1).single();
                if (data) resolvedContactId = data.id;
            }

            const leadTitle = inquiry.subject ? `${inquiry.subject} (${inquiry.name})` : `Inquiry from ${inquiry.name}`;
            const { error: insertError } = await supabase
                .from('crm_leads')
                .insert([{
                    title: leadTitle,
                    contact_id: resolvedContactId,
                    stage_id: stages.id,
                    notes: `Message: ${inquiry.message}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || 'N/A'}`,
                    position: nextPosition
                }]);

            if (insertError) throw insertError;

            // 4. Delete the inquiry now that it's in the CRM
            const { error: deleteError } = await supabase
                .from('inquiries')
                .delete()
                .eq('id', inquiry.id);

            if (deleteError) throw deleteError;

            // Update UI
            setInquiries(inquiries.filter(i => i.id !== inquiry.id));
            alert("Successfully moved to CRM Pipeline!");

        } catch (error: any) {
            console.error("Error moving to CRM:", error);
            alert(error.message || "Failed to move to CRM.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 w-full bg-white">
                <Loader2 className="w-8 h-8 rounded-full animate-spin text-[#00A3FF]" />
            </div>
        );
    }

    if (inquiries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-zinc-300" />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-2">No active inquiries</h3>
                <p className="text-zinc-500 max-w-sm">
                    New messages submitted through your website's contact form will appear here for review.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col divide-y divide-zinc-100">
            {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-6 md:p-8 hover:bg-zinc-50 transition-colors group">
                    <div className="flex flex-col xl:flex-row gap-6 justify-between items-start">

                        {/* Data Column */}
                        <div className="flex-1 min-w-0 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <h3 className="text-xl font-semibold text-zinc-900">
                                    {inquiry.subject || "New Website Inquiry"}
                                </h3>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#00A3FF]/10 text-[#008ce6]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(inquiry.created_at).toLocaleDateString()} at {new Date(inquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-zinc-400" />
                                    <span className="font-medium text-zinc-900">{inquiry.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-zinc-400" />
                                    <a href={`mailto:${inquiry.email}`} className="hover:text-[#00A3FF] transition-colors">{inquiry.email}</a>
                                </div>
                                {inquiry.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-zinc-400" />
                                        <a href={`tel:${inquiry.phone}`} className="hover:text-[#00A3FF] transition-colors">{inquiry.phone}</a>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
                                <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed">
                                    {inquiry.message}
                                </p>
                            </div>
                        </div>

                        {/* Actions Column */}
                        <div className="flex flex-row xl:flex-col gap-3 w-full xl:w-48 shrink-0">
                            <button
                                onClick={() => handleMoveToCRM(inquiry)}
                                disabled={actionLoading !== null}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00A3FF] hover:bg-[#008ce6] text-white rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                            >
                                {actionLoading === `move-${inquiry.id}` ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRightCircle className="w-4 h-4" />
                                )}
                                Move to CRM
                            </button>
                            <button
                                onClick={() => handleDelete(inquiry.id)}
                                disabled={actionLoading !== null}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                {actionLoading === inquiry.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                Delete Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
