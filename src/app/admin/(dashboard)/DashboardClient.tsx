"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
    Newspaper, MessageSquare, Briefcase, ContactRound,
    Clock, CalendarDays, Plus, Trash2, Pin, PinOff,
    Loader2, Save, StickyNote, ChevronLeft, ChevronRight,
    TrendingUp
} from "lucide-react";

// ── Types ──────────────────────────────────────────────
interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
}

interface Stats {
    totalNews: number;
    totalInquiries: number;
    totalLeads: number;
    totalContacts: number;
}

// ── Calendar Helper ────────────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

// ── Main Component ─────────────────────────────────────
export default function DashboardClient() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [stats, setStats] = useState<Stats>({
        totalNews: 0,
        totalInquiries: 0,
        totalLeads: 0,
        totalContacts: 0,
    });
    const [statsLoading, setStatsLoading] = useState(true);

    // Editing note
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [savingNote, setSavingNote] = useState(false);

    // ── Clock ─────────────────────────────────────
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // ── Fetch Stats ───────────────────────────────
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [newsRes, inqRes, leadsRes, contactsRes] = await Promise.all([
                    supabase.from("news").select("id", { count: "exact", head: true }),
                    supabase.from("inquiries").select("id", { count: "exact", head: true }),
                    supabase.from("crm_leads").select("id", { count: "exact", head: true }),
                    supabase.from("contacts").select("id", { count: "exact", head: true }),
                ]);

                setStats({
                    totalNews: newsRes.count ?? 0,
                    totalInquiries: inqRes.count ?? 0,
                    totalLeads: leadsRes.count ?? 0,
                    totalContacts: contactsRes.count ?? 0,
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, []);

    // ── Fetch Notes ───────────────────────────────
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data, error } = await supabase
                .from("admin_notes")
                .select("*")
                .order("is_pinned", { ascending: false })
                .order("updated_at", { ascending: false });

            if (error) throw error;
            if (data) setNotes(data);
        } catch (err) {
            console.error("Error fetching notes:", err);
        } finally {
            setNotesLoading(false);
        }
    };

    const handleAddNote = async () => {
        try {
            const { data, error } = await supabase
                .from("admin_notes")
                .insert([{ title: "Untitled Note", content: "", color: "default" }])
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setNotes([data, ...notes]);
                setEditingNote(data);
            }
        } catch (err) {
            console.error("Error adding note:", err);
            alert("Failed to add note.");
        }
    };

    const handleSaveNote = async () => {
        if (!editingNote) return;
        setSavingNote(true);
        try {
            const { error } = await supabase
                .from("admin_notes")
                .update({
                    title: editingNote.title,
                    content: editingNote.content,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", editingNote.id);

            if (error) throw error;

            setNotes(notes.map(n => n.id === editingNote.id ? { ...n, title: editingNote.title, content: editingNote.content, updated_at: new Date().toISOString() } : n));
            setEditingNote(null);
        } catch (err) {
            console.error("Error saving note:", err);
            alert("Failed to save note.");
        } finally {
            setSavingNote(false);
        }
    };

    const handleDeleteNote = async (id: string) => {
        if (!window.confirm("Delete this note?")) return;
        try {
            const { error } = await supabase.from("admin_notes").delete().eq("id", id);
            if (error) throw error;
            setNotes(notes.filter(n => n.id !== id));
            if (editingNote?.id === id) setEditingNote(null);
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    const handleTogglePin = async (note: Note) => {
        try {
            const { error } = await supabase
                .from("admin_notes")
                .update({ is_pinned: !note.is_pinned })
                .eq("id", note.id);
            if (error) throw error;
            const updated = notes.map(n => n.id === note.id ? { ...n, is_pinned: !n.is_pinned } : n);
            // Re-sort: pinned first
            updated.sort((a, b) => {
                if (a.is_pinned && !b.is_pinned) return -1;
                if (!a.is_pinned && b.is_pinned) return 1;
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            });
            setNotes(updated);
        } catch (err) {
            console.error("Error toggling pin:", err);
        }
    };

    // ── Calendar Navigation ───────────────────────
    const prevMonth = () => {
        setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
    };
    const nextMonth = () => {
        setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
    };

    // ── Calendar Rendering ────────────────────────
    const calYear = calendarDate.getFullYear();
    const calMonth = calendarDate.getMonth();
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === calYear && today.getMonth() === calMonth;

    const calendarCells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

    // ── Greeting ──────────────────────────────────
    const hour = currentTime.getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    // ── Stats Cards Data ──────────────────────────
    const statCards = [
        { label: "Published Articles", value: stats.totalNews, icon: Newspaper, color: "from-blue-500 to-cyan-400", href: "/admin/news" },
        { label: "Active Inquiries", value: stats.totalInquiries, icon: MessageSquare, color: "from-amber-500 to-orange-400", href: "/admin/inquiries" },
        { label: "CRM Leads", value: stats.totalLeads, icon: Briefcase, color: "from-violet-500 to-purple-400", href: "/admin/crm" },
        { label: "Total Contacts", value: stats.totalContacts, icon: ContactRound, color: "from-emerald-500 to-green-400", href: "/admin/contacts" },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out space-y-8 pb-12">

            {/* ── Hero Greeting ──────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#121212] tracking-tight mb-2">
                        {greeting} 👋
                    </h1>
                    <p className="text-zinc-500 font-light">
                        Here&apos;s what&apos;s happening across your admin panel today.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-6 py-4 shadow-sm">
                    <Clock className="w-5 h-5 text-[#00A3FF]" />
                    <div className="text-right">
                        <p className="text-2xl font-semibold text-[#121212] tracking-tight tabular-nums">
                            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </p>
                        <p className="text-xs text-zinc-500">
                            {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Stats Cards ────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <a
                            key={card.label}
                            href={card.href}
                            className="group bg-white rounded-2xl border border-zinc-200 p-6 hover:shadow-lg hover:border-zinc-300 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-[0.07] rounded-bl-[60px] group-hover:opacity-[0.12] transition-opacity`} />
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <TrendingUp className="w-4 h-4 text-zinc-300 group-hover:text-zinc-400 transition-colors" />
                            </div>
                            <p className="text-3xl font-bold text-[#121212] tracking-tight mb-1">
                                {statsLoading ? (
                                    <span className="inline-block w-8 h-8 bg-zinc-100 rounded animate-pulse" />
                                ) : card.value}
                            </p>
                            <p className="text-sm text-zinc-500 font-light">{card.label}</p>
                        </a>
                    );
                })}
            </div>

            {/* ── Main Grid: Calendar + Notes ───── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* ── Mini Calendar ─────────────── */}
                <div className="xl:col-span-4 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-[#00A3FF]" />
                            <h3 className="font-semibold text-[#121212]">Calendar</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-700">
                                <ChevronLeft size={18} />
                            </button>
                            <span className="text-sm font-medium text-zinc-700 min-w-[140px] text-center">
                                {MONTHS[calMonth]} {calYear}
                            </span>
                            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-700">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map(d => (
                            <div key={d} className="text-center text-xs font-semibold text-zinc-400 py-1">{d}</div>
                        ))}
                    </div>

                    {/* Date Cells */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarCells.map((day, i) => {
                            const isToday = isCurrentMonth && day === today.getDate();
                            return (
                                <div
                                    key={i}
                                    className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${day === null
                                            ? ""
                                            : isToday
                                                ? "bg-[#00A3FF] text-white font-bold shadow-sm shadow-[#00A3FF]/30"
                                                : "text-zinc-700 hover:bg-zinc-100 cursor-default"
                                        }`}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Notes Section ─────────────── */}
                <div className="xl:col-span-8 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">

                    {/* Notes Header */}
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <StickyNote className="w-5 h-5 text-[#00A3FF]" />
                            <h3 className="font-semibold text-[#121212]">Notes</h3>
                            <span className="text-xs text-zinc-400 ml-1">({notes.length})</span>
                        </div>
                        <button
                            onClick={handleAddNote}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-sm"
                        >
                            <Plus size={14} /> New Note
                        </button>
                    </div>

                    {/* Notes Body */}
                    <div className="flex-1 flex flex-col md:flex-row min-h-[320px]">

                        {/* Notes List */}
                        <div className="w-full md:w-[280px] lg:w-[320px] border-r border-zinc-100 overflow-y-auto shrink-0">
                            {notesLoading ? (
                                <div className="flex items-center justify-center p-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#00A3FF]" />
                                </div>
                            ) : notes.length === 0 ? (
                                <div className="p-8 text-center">
                                    <StickyNote className="w-8 h-8 text-zinc-200 mx-auto mb-3" />
                                    <p className="text-sm text-zinc-400">No notes yet</p>
                                    <p className="text-xs text-zinc-300 mt-1">Click "New Note" to get started</p>
                                </div>
                            ) : (
                                notes.map((note) => (
                                    <div
                                        key={note.id}
                                        onClick={() => setEditingNote(note)}
                                        className={`p-4 border-b border-zinc-50 cursor-pointer hover:bg-zinc-50 transition-colors group ${editingNote?.id === note.id ? "bg-[#00A3FF]/5 border-l-2 border-l-[#00A3FF]" : ""
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    {note.is_pinned && <Pin size={12} className="text-[#00A3FF] shrink-0" />}
                                                    <h4 className="font-medium text-sm text-zinc-900 truncate">{note.title}</h4>
                                                </div>
                                                <p className="text-xs text-zinc-400 line-clamp-1">
                                                    {note.content || "Empty note..."}
                                                </p>
                                                <p className="text-[10px] text-zinc-300 mt-1.5">
                                                    {new Date(note.updated_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleTogglePin(note); }}
                                                    className="p-1 rounded hover:bg-zinc-200 text-zinc-400 hover:text-[#00A3FF] transition-colors"
                                                    title={note.is_pinned ? "Unpin" : "Pin"}
                                                >
                                                    {note.is_pinned ? <PinOff size={12} /> : <Pin size={12} />}
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                                                    className="p-1 rounded hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Note Editor */}
                        <div className="flex-1 flex flex-col">
                            {editingNote ? (
                                <>
                                    <div className="p-4 border-b border-zinc-100 flex items-center gap-2 shrink-0">
                                        <input
                                            type="text"
                                            value={editingNote.title}
                                            onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                                            className="flex-1 text-lg font-semibold text-[#121212] bg-transparent outline-none placeholder-zinc-300"
                                            placeholder="Note title..."
                                        />
                                        <button
                                            onClick={handleSaveNote}
                                            disabled={savingNote}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#00A3FF] text-white rounded-xl text-sm font-medium hover:bg-[#008ce6] transition-colors disabled:opacity-50 shadow-sm"
                                        >
                                            {savingNote ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                            Save
                                        </button>
                                    </div>
                                    <textarea
                                        value={editingNote.content}
                                        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                                        placeholder="Start writing..."
                                        className="flex-1 p-4 text-sm text-zinc-700 bg-transparent outline-none resize-none font-light leading-relaxed placeholder-zinc-300"
                                    />
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                                    <StickyNote className="w-10 h-10 text-zinc-200 mb-3" />
                                    <p className="text-sm text-zinc-400 font-medium">Select a note to edit</p>
                                    <p className="text-xs text-zinc-300 mt-1">Or create a new one to get started</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
