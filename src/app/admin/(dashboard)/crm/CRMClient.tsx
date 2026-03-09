"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Plus, Trash2, Loader2, GripVertical, MoreVertical, DollarSign } from "lucide-react";

interface Stage {
    id: string;
    name: string;
    position: number;
    is_protected: boolean;
}

interface Lead {
    id: string;
    title: string;
    stage_id: string;
    position: number;
    value: number | null;
    notes: string | null;
    created_at: string;
}

type BoardData = {
    [key: string]: {
        stage: Stage;
        leads: Lead[];
    };
};

export default function CRMClient() {
    const [board, setBoard] = useState<BoardData>({});
    const [stagesLineup, setStagesLineup] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // New Stage Form
    const [isAddingStage, setIsAddingStage] = useState(false);
    const [newStageName, setNewStageName] = useState("");

    // New Lead Form
    const [addingLeadToStage, setAddingLeadToStage] = useState<string | null>(null);
    const [newLeadTitle, setNewLeadTitle] = useState("");

    // Auto-scroll during drag
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);

    // Custom edge-scroll: when dragging near the left/right edge of the scroll container, auto-scroll
    useEffect(() => {
        const EDGE_SIZE = 150; // px from edge to start scrolling
        const MAX_SCROLL_SPEED = 25; // px per frame

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current || !scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX;

            // Cancel any existing animation frame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }

            // Check if mouse is near right edge
            if (mouseX > rect.right - EDGE_SIZE) {
                const intensity = (mouseX - (rect.right - EDGE_SIZE)) / EDGE_SIZE;
                const speed = Math.min(intensity * MAX_SCROLL_SPEED, MAX_SCROLL_SPEED);
                const scroll = () => {
                    if (!isDraggingRef.current || !scrollContainerRef.current) return;
                    scrollContainerRef.current.scrollLeft += speed;
                    animationFrameRef.current = requestAnimationFrame(scroll);
                };
                animationFrameRef.current = requestAnimationFrame(scroll);
            }
            // Check if mouse is near left edge
            else if (mouseX < rect.left + EDGE_SIZE) {
                const intensity = ((rect.left + EDGE_SIZE) - mouseX) / EDGE_SIZE;
                const speed = Math.min(intensity * MAX_SCROLL_SPEED, MAX_SCROLL_SPEED);
                const scroll = () => {
                    if (!isDraggingRef.current || !scrollContainerRef.current) return;
                    scrollContainerRef.current.scrollLeft -= speed;
                    animationFrameRef.current = requestAnimationFrame(scroll);
                };
                animationFrameRef.current = requestAnimationFrame(scroll);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    useEffect(() => {
        fetchBoardData();
    }, []);

    const fetchBoardData = async () => {
        try {
            // Fetch stages
            const { data: stagesData, error: stagesError } = await supabase
                .from('crm_stages')
                .select('*')
                .order('position', { ascending: true });

            if (stagesError) throw stagesError;

            // Fetch leads
            const { data: leadsData, error: leadsError } = await supabase
                .from('crm_leads')
                .select('*')
                .order('position', { ascending: true });

            if (leadsError) throw leadsError;

            // Construct board
            const newBoard: BoardData = {};
            const stageIds: string[] = [];

            stagesData?.forEach(stage => {
                newBoard[stage.id] = {
                    stage,
                    leads: leadsData?.filter(lead => lead.stage_id === stage.id) || []
                };
                stageIds.push(stage.id);
            });

            setBoard(newBoard);
            setStagesLineup(stageIds);
        } catch (error) {
            console.error("Error fetching CRM data:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDragStart = () => {
        isDraggingRef.current = true;
    };

    const onDragEnd = async (result: DropResult) => {
        isDraggingRef.current = false;
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceStageId = source.droppableId;
        const destStageId = destination.droppableId;

        const newBoard = { ...board };
        const sourceLeads = Array.from(newBoard[sourceStageId].leads);
        const [movedLead] = sourceLeads.splice(source.index, 1);

        if (sourceStageId === destStageId) {
            // Moving within same column
            sourceLeads.splice(destination.index, 0, movedLead);

            // Re-calculate positions for the column eagerly
            const updatedLeads = sourceLeads.map((lead, index) => ({
                ...lead,
                position: index * 1024 // Spread items out integer-wise
            }));

            newBoard[sourceStageId].leads = updatedLeads;
            setBoard(newBoard);

            // Persist to DB
            try {
                for (const lead of updatedLeads) {
                    await supabase.from('crm_leads').update({ position: lead.position }).eq('id', lead.id);
                }
            } catch (err) {
                console.error("Error updating positions:", err);
            }

        } else {
            // Moving to different column
            const destLeads = Array.from(newBoard[destStageId].leads);
            movedLead.stage_id = destStageId;
            destLeads.splice(destination.index, 0, movedLead);

            // Re-calculate positions for destination column
            const updatedDestLeads = destLeads.map((lead, index) => ({
                ...lead,
                position: index * 1024
            }));

            newBoard[sourceStageId].leads = sourceLeads;
            newBoard[destStageId].leads = updatedDestLeads;
            setBoard(newBoard);

            // Persist to DB
            try {
                // Update the moved lead's stage and position first
                await supabase.from('crm_leads')
                    .update({ stage_id: destStageId, position: updatedDestLeads.find(l => l.id === movedLead.id)?.position })
                    .eq('id', movedLead.id);

                // Update other positions in the dest column if needed
                for (const lead of updatedDestLeads) {
                    if (lead.id !== movedLead.id) {
                        await supabase.from('crm_leads').update({ position: lead.position }).eq('id', lead.id);
                    }
                }

            } catch (err) {
                console.error("Error moving across stages:", err);
            }
        }
    };

    const handleAddStage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStageName.trim()) return;

        try {
            const nextPosition = stagesLineup.length * 1024;
            const { data, error } = await supabase
                .from('crm_stages')
                .insert([{ name: newStageName, position: nextPosition, is_protected: false }])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setBoard(prev => ({
                    ...prev,
                    [data.id]: { stage: data, leads: [] }
                }));
                setStagesLineup(prev => [...prev, data.id]);
                setNewStageName("");
                setIsAddingStage(false);
            }
        } catch (error) {
            console.error("Error adding stage:", error);
            alert("Failed to add stage");
        }
    };

    const handleDeleteStage = async (stageId: string) => {
        if (!window.confirm("Are you sure? This will delete the stage and ALL leads inside it!")) return;

        try {
            const { error } = await supabase.from('crm_stages').delete().eq('id', stageId);
            if (error) throw error;

            const newBoard = { ...board };
            delete newBoard[stageId];
            setBoard(newBoard);
            setStagesLineup(prev => prev.filter(id => id !== stageId));
        } catch (error) {
            console.error("Error deleting stage:", error);
            alert("Failed to delete stage. Ensure it is not protected.");
        }
    };

    const handleAddLead = async (stageId: string, e: React.FormEvent) => {
        e.preventDefault();
        if (!newLeadTitle.trim()) return;

        try {
            const stageLeads = board[stageId].leads;
            const nextPosition = stageLeads.length > 0 ? stageLeads[stageLeads.length - 1].position + 1024 : 1024;

            const { data, error } = await supabase
                .from('crm_leads')
                .insert([{ title: newLeadTitle, stage_id: stageId, position: nextPosition }])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setBoard(prev => ({
                    ...prev,
                    [stageId]: {
                        ...prev[stageId],
                        leads: [...prev[stageId].leads, data]
                    }
                }));
                setNewLeadTitle("");
                setAddingLeadToStage(null);

                // Also silently create a Master Contact for this manual lead if we wanted to
                // For simplicity, we skip forced contact creation for pure CRM leads here unless they provide email/phone.
            }
        } catch (error) {
            console.error("Error adding lead:", error);
            alert("Failed to add lead.");
        }
    };

    const handleDeleteLead = async (stageId: string, leadId: string) => {
        if (!window.confirm("Delete this lead?")) return;

        try {
            const { error } = await supabase.from('crm_leads').delete().eq('id', leadId);
            if (error) throw error;

            setBoard(prev => ({
                ...prev,
                [stageId]: {
                    ...prev[stageId],
                    leads: prev[stageId].leads.filter(l => l.id !== leadId)
                }
            }));
        } catch (error) {
            console.error("Error deleting lead:", error);
        }
    };

    if (loading) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 rounded-full animate-spin text-[#00A3FF]" />
            </div>
        );
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="min-h-[calc(100vh-12rem)] flex flex-col p-6 overflow-hidden">

                {/* Action Bar - Top left */}
                <div className="flex justify-start mb-6 shrink-0">
                    {isAddingStage ? (
                        <form onSubmit={handleAddStage} className="w-full sm:w-auto bg-zinc-100 p-2 rounded-xl border border-zinc-200 flex items-center gap-2 shadow-sm">
                            <input
                                type="text"
                                autoFocus
                                value={newStageName}
                                onChange={(e) => setNewStageName(e.target.value)}
                                placeholder="Stage name..."
                                className="flex-1 px-3 py-1.5 text-sm border border-[#00A3FF] outline-none rounded-lg shadow-sm"
                            />
                            <button type="submit" className="bg-[#00A3FF] hover:bg-[#008ce6] text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsAddingStage(false); setNewStageName(""); }}
                                className="bg-white border border-zinc-200 text-zinc-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-50"
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsAddingStage(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white hover:bg-black rounded-xl transition-all font-medium text-sm shadow-sm"
                        >
                            <Plus size={16} /> Add Pipeline Stage
                        </button>
                    )}
                </div>

                {/* Scrollable Kanban Board */}
                <div ref={scrollContainerRef} className="flex-1 overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
                    <div className="flex gap-6 h-full items-start">

                        {stagesLineup.map((stageId) => {
                            const column = board[stageId];
                            if (!column) return null;

                            return (
                                <div key={stageId} className="w-[320px] shrink-0 flex flex-col max-h-full bg-zinc-100 rounded-xl border border-zinc-200">

                                    {/* Column Header */}
                                    <div className="p-4 flex items-center justify-between border-b border-zinc-200/50">
                                        <h3 className="font-semibold text-zinc-800 flex items-center gap-2">
                                            {column.stage.name}
                                            <span className="bg-zinc-200 text-zinc-500 text-xs py-0.5 px-2 rounded-full border border-zinc-300">
                                                {column.leads.length}
                                            </span>
                                        </h3>

                                        {!column.stage.is_protected && (
                                            <button
                                                onClick={() => handleDeleteStage(stageId)}
                                                className="text-zinc-400 hover:text-red-500 transition-colors"
                                                title="Delete Stage"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Droppable Area for Cards */}
                                    <Droppable droppableId={stageId}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`flex-1 overflow-y-auto p-3 flex flex-col gap-3 min-h-[150px] ${snapshot.isDraggingOver ? 'bg-[#00A3FF]/5' : ''
                                                    }`}
                                            >
                                                {column.leads.map((lead, index) => (
                                                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`bg-white p-4 rounded-xl shadow-sm border ${snapshot.isDragging ? 'border-[#00A3FF] shadow-md shadow-[#00A3FF]/20 rotate-2' : 'border-zinc-200 hover:border-zinc-300'
                                                                    } transition-all duration-200 group`}
                                                            >
                                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                                    <div className="flex items-start gap-2">
                                                                        <GripVertical className="w-4 h-4 text-zinc-300 mt-1 cursor-grab" />
                                                                        <h4 className="font-medium text-zinc-900 leading-tight">{lead.title}</h4>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleDeleteLead(stageId, lead.id)}
                                                                        className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>

                                                                {lead.notes && (
                                                                    <p className="text-xs text-zinc-500 line-clamp-2 mt-2 ml-6">
                                                                        {lead.notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                    {/* Add Lead Footer */}
                                    <div className="p-3 border-t border-zinc-200/50">
                                        {addingLeadToStage === stageId ? (
                                            <form onSubmit={(e) => handleAddLead(stageId, e)} className="flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    value={newLeadTitle}
                                                    onChange={(e) => setNewLeadTitle(e.target.value)}
                                                    placeholder="Lead name..."
                                                    className="w-full px-3 py-2 text-sm border border-[#00A3FF] outline-none rounded-lg shadow-sm"
                                                />
                                                <div className="flex gap-2">
                                                    <button type="submit" className="flex-1 bg-[#00A3FF] text-white text-xs font-medium py-2 rounded-lg hover:bg-[#008ce6]">
                                                        Add Lead
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setAddingLeadToStage(null); setNewLeadTitle(""); }}
                                                        className="flex-1 bg-white border border-zinc-200 text-zinc-600 text-xs font-medium py-2 rounded-lg hover:bg-zinc-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <button
                                                onClick={() => setAddingLeadToStage(stageId)}
                                                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50 rounded-lg transition-colors font-medium"
                                            >
                                                <Plus size={16} /> Add Lead
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}
