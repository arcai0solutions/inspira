"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { HeroBanner } from "@/lib/banners";
import {
    Image as ImageIcon,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Plus,
    Trash2,
    Pencil,
    ArrowUp,
    ArrowDown,
    Eye,
    EyeOff,
    X,
    Save,
} from "lucide-react";

type Status = { type: "idle" | "success" | "error"; message: string };

/**
 * Banners are image-only on the public site — no headline, body copy or buttons are
 * drawn over the artwork. `title` is just an internal label for this dashboard, and
 * `image_alt` is what screen readers announce.
 */
type FormState = {
    id: string | null;
    title: string;
    image_url: string;
    image_alt: string;
    is_active: boolean;
};

const EMPTY_FORM: FormState = {
    id: null,
    title: "",
    image_url: "",
    image_alt: "",
    is_active: true,
};

const MAX_IMAGE_BYTES = 6 * 1024 * 1024; // 6MB

export default function BannersClient() {
    const [banners, setBanners] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [showForm, setShowForm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const flash = useCallback((type: "success" | "error", message: string) => {
        setStatus({ type, message });
        if (type === "success") {
            setTimeout(() => setStatus({ type: "idle", message: "" }), 5000);
        }
    }, []);

    const loadBanners = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("hero_banners")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) {
            flash("error", `Could not load banners: ${error.message}`);
        } else {
            setBanners((data ?? []) as HeroBanner[]);
        }
        setLoading(false);
    }, [flash]);

    useEffect(() => {
        loadBanners();
    }, [loadBanners]);

    // ---------- Image upload ----------
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_BYTES) {
            flash("error", "That image is over 6MB. Please compress it and try again.");
            return;
        }

        setUploading(true);
        setStatus({ type: "idle", message: "" });

        try {
            const ext = file.name.split(".").pop() || "jpg";
            const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from("banner-images")
                .upload(fileName, file, { cacheControl: "3600" });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("banner-images").getPublicUrl(fileName);
            setForm((f) => ({ ...f, image_url: data.publicUrl }));
            flash("success", "Image uploaded. Remember to save the banner.");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Upload failed.";
            flash("error", message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // ---------- Create / update ----------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title.trim()) return flash("error", "A headline is required.");
        if (!form.image_url.trim()) return flash("error", "A banner image is required.");

        setSaving(true);
        try {
            // Overlay columns stay in the schema but are always null — the public
            // banner renders the image alone.
            const payload = {
                eyebrow: null,
                title: form.title.trim(),
                subtitle: null,
                image_url: form.image_url.trim(),
                image_alt: form.image_alt.trim() || null,
                cta_label: null,
                cta_href: null,
                cta_secondary_label: null,
                cta_secondary_href: null,
                is_active: form.is_active,
            };

            if (form.id) {
                const { error } = await supabase
                    .from("hero_banners")
                    .update(payload)
                    .eq("id", form.id);
                if (error) throw error;
                flash("success", "Banner updated and live on the homepage.");
            } else {
                const nextOrder =
                    banners.reduce((max, b) => Math.max(max, b.sort_order), 0) + 1;
                const { error } = await supabase
                    .from("hero_banners")
                    .insert([{ ...payload, sort_order: nextOrder }]);
                if (error) throw error;
                flash("success", "Banner published and live on the homepage.");
            }

            setForm(EMPTY_FORM);
            setShowForm(false);
            await loadBanners();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Save failed.";
            flash("error", message);
        } finally {
            setSaving(false);
        }
    };

    // ---------- Row actions ----------
    const startEdit = (banner: HeroBanner) => {
        setForm({
            id: banner.id,
            title: banner.title,
            image_url: banner.image_url,
            image_alt: banner.image_alt ?? "",
            is_active: banner.is_active,
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleActive = async (banner: HeroBanner) => {
        const { error } = await supabase
            .from("hero_banners")
            .update({ is_active: !banner.is_active })
            .eq("id", banner.id);

        if (error) return flash("error", error.message);
        setBanners((prev) =>
            prev.map((b) => (b.id === banner.id ? { ...b, is_active: !b.is_active } : b))
        );
    };

    const move = async (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= banners.length) return;

        const reordered = [...banners];
        [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

        // Renumber from 1 so ordering stays stable no matter what was deleted before.
        const renumbered = reordered.map((b, i) => ({ ...b, sort_order: i + 1 }));
        setBanners(renumbered);

        const results = await Promise.all(
            renumbered.map((b) =>
                supabase.from("hero_banners").update({ sort_order: b.sort_order }).eq("id", b.id)
            )
        );

        const failed = results.find((r) => r.error);
        if (failed?.error) {
            flash("error", `Reorder failed: ${failed.error.message}`);
            await loadBanners();
        }
    };

    const remove = async (banner: HeroBanner) => {
        const confirmed = window.confirm(
            `Delete the banner "${banner.title}"? This removes it from the homepage immediately.`
        );
        if (!confirmed) return;

        const { error } = await supabase.from("hero_banners").delete().eq("id", banner.id);
        if (error) return flash("error", error.message);

        // Best-effort cleanup of the stored image; a failure here is not worth blocking on.
        const storedName = banner.image_url.split("/banner-images/")[1];
        if (storedName) {
            await supabase.storage.from("banner-images").remove([storedName]);
        }

        flash("success", "Banner deleted.");
        await loadBanners();
    };

    const activeCount = banners.filter((b) => b.is_active).length;

    return (
        <div className="flex flex-col gap-8">

            {/* ---------- Status ---------- */}
            {status.type !== "idle" && (
                <div
                    className={`p-4 rounded-xl flex items-start gap-3 border ${status.type === "error"
                        ? "bg-red-50 border-red-100 text-red-800"
                        : "bg-green-50 border-green-100 text-green-800"
                        } animate-in fade-in slide-in-from-top-2`}
                    role="status"
                >
                    {status.type === "error" ? (
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{status.message}</span>
                </div>
            )}

            {/* ---------- Empty-state notice ---------- */}
            {!loading && banners.length === 0 && (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">
                        No banners published yet, so the homepage is showing the three built-in
                        demo banners. Publishing your first banner here replaces all of them.
                    </p>
                </div>
            )}

            {/* ---------- Toolbar ---------- */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-zinc-500">
                    {loading
                        ? "Loading banners…"
                        : `${banners.length} banner${banners.length === 1 ? "" : "s"} · ${activeCount} live on the homepage`}
                </p>

                <button
                    onClick={() => {
                        setForm(EMPTY_FORM);
                        setShowForm((s) => !s);
                    }}
                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold text-white bg-[#00A3FF] hover:bg-[#008ce6] shadow-[0_4px_14px_rgba(0,163,255,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                    {showForm && !form.id ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm && !form.id ? "Cancel" : "New Banner"}
                </button>
            </div>

            {/* ---------- Create / edit form ---------- */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col gap-6 animate-in fade-in slide-in-from-top-2"
                >
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                        <h3 className="text-lg font-semibold text-[#121212]">
                            {form.id ? "Edit Banner" : "New Banner"}
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                setForm(EMPTY_FORM);
                                setShowForm(false);
                            }}
                            className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                            aria-label="Close form"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Image */}
                    <Field label="Banner Image" hint="Landscape 16:9 works best — 1920×1080 or larger. Max 6MB.">
                        <div
                            onClick={() => !uploading && fileInputRef.current?.click()}
                            className={`flex justify-center px-6 py-6 border-2 border-dashed rounded-2xl cursor-pointer transition-colors group ${form.image_url
                                ? "border-[#00A3FF] bg-[#00A3FF]/5"
                                : "border-zinc-300 hover:border-[#00A3FF] bg-[#FAFAFA] hover:bg-white"
                                }`}
                        >
                            <div className="space-y-2 text-center flex flex-col items-center w-full">
                                {form.image_url ? (
                                    <div className="relative w-full max-w-[420px] aspect-[16/9] rounded-lg overflow-hidden border border-zinc-200 shadow-sm mb-3">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={form.image_url}
                                            alt="Banner preview"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-zinc-100 group-hover:bg-[#00A3FF]/10 flex items-center justify-center transition-colors mb-2">
                                        <ImageIcon className="w-8 h-8 text-zinc-400 group-hover:text-[#00A3FF] transition-colors" />
                                    </div>
                                )}

                                <span className="font-semibold text-sm text-[#00A3FF] group-hover:text-[#008ce6] flex items-center gap-2">
                                    {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {uploading
                                        ? "Uploading…"
                                        : form.image_url
                                            ? "Replace Image"
                                            : "Upload an image"}
                                </span>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field
                            label="Banner Name"
                            required
                            hint="Internal label only — used to identify this banner in the dashboard. It is never shown on the website."
                        >
                            <Input
                                value={form.title}
                                onChange={(v) => setForm({ ...form, title: v })}
                                placeholder="Cold chain — warehouse"
                            />
                        </Field>

                        <Field
                            label="Image Description"
                            hint="Describes the picture for screen readers and search engines."
                        >
                            <Input
                                value={form.image_alt}
                                onChange={(v) => setForm({ ...form, image_alt: v })}
                                placeholder="Warehouse team preparing a dispatch"
                            />
                        </Field>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer w-fit">
                        <input
                            type="checkbox"
                            checked={form.is_active}
                            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                            className="w-4 h-4 accent-[#00A3FF] cursor-pointer"
                        />
                        <span className="text-sm font-medium text-zinc-700">
                            Show this banner on the homepage
                        </span>
                    </label>

                    <div className="pt-4 border-t border-zinc-100 flex gap-3">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className={`inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl shadow-[0_4px_14px_rgba(0,163,255,0.3)] text-sm font-semibold text-white bg-[#00A3FF] hover:bg-[#008ce6] transition-all hover:-translate-y-0.5 min-w-[180px] cursor-pointer ${saving || uploading ? "opacity-70 cursor-not-allowed translate-y-0" : ""
                                }`}
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving…
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    {form.id ? "Save Changes" : "Publish Banner"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}

            {/* ---------- Banner list ---------- */}
            {loading ? (
                <div className="flex items-center justify-center py-20 text-zinc-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {banners.map((banner, i) => (
                        <div
                            key={banner.id}
                            className={`bg-white rounded-2xl border p-4 md:p-5 flex flex-col sm:flex-row gap-5 transition-all ${banner.is_active
                                ? "border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                                : "border-zinc-200 bg-zinc-50/60 opacity-70"
                                }`}
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full sm:w-[200px] aspect-[16/9] rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={banner.image_url}
                                    alt={banner.image_alt || banner.title}
                                    className="object-cover w-full h-full"
                                />
                                <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider">
                                    #{i + 1}
                                </span>
                            </div>

                            {/* Detail */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                                <h3 className="font-semibold text-[#121212] text-lg leading-tight truncate">
                                    {banner.title}
                                </h3>
                                {banner.image_alt && (
                                    <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                                        {banner.image_alt}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span
                                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${banner.is_active
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                                            }`}
                                    >
                                        {banner.is_active ? "Live" : "Hidden"}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                                <div className="flex gap-1">
                                    <IconButton
                                        onClick={() => move(i, -1)}
                                        disabled={i === 0}
                                        label="Move up"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => move(i, 1)}
                                        disabled={i === banners.length - 1}
                                        label="Move down"
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                    </IconButton>
                                </div>
                                <div className="flex gap-1">
                                    <IconButton
                                        onClick={() => toggleActive(banner)}
                                        label={banner.is_active ? "Hide banner" : "Show banner"}
                                    >
                                        {banner.is_active ? (
                                            <Eye className="w-4 h-4" />
                                        ) : (
                                            <EyeOff className="w-4 h-4" />
                                        )}
                                    </IconButton>
                                    <IconButton onClick={() => startEdit(banner)} label="Edit banner">
                                        <Pencil className="w-4 h-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => remove(banner)}
                                        label="Delete banner"
                                        danger
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------------- Small presentational helpers ---------------- */

function Field({
    label,
    hint,
    required,
    children,
}: {
    label: string;
    hint?: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <label className="block text-sm font-medium text-zinc-900 mb-2">
                {label}
                {required && <span className="text-[#00A3FF] ml-1">*</span>}
            </label>
            {children}
            {hint && <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{hint}</p>}
        </div>
    );
}

function Input({
    value,
    onChange,
    placeholder,
    large,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    large?: boolean;
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-[#FAFAFA] border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] transition-all ${large ? "text-lg font-medium" : ""
                }`}
        />
    );
}

function IconButton({
    onClick,
    disabled,
    label,
    danger,
    children,
}: {
    onClick: () => void;
    disabled?: boolean;
    label: string;
    danger?: boolean;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${danger
                ? "border-zinc-200 text-zinc-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                : "border-zinc-200 text-zinc-500 hover:text-[#00A3FF] hover:border-[#00A3FF]/30 hover:bg-[#00A3FF]/5"
                }`}
        >
            {children}
        </button>
    );
}
