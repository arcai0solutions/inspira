"use client";

import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminNewsClient() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "idle" | "success" | "error", message: string }>({ type: "idle", message: "" });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "idle", message: "" });

        if (!title || !description) {
            setStatus({ type: "error", message: "Please provide a title and description." });
            setLoading(false);
            return;
        }

        try {
            let imageUrl = null;

            if (image) {
                const fileExt = image.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('news-images')
                    .upload(filePath, image);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('news-images')
                    .getPublicUrl(filePath);

                imageUrl = data.publicUrl;
            }

            const { error: insertError } = await supabase
                .from('news')
                .insert([
                    { title, description, image_url: imageUrl }
                ]);

            if (insertError) throw insertError;

            setStatus({ type: "success", message: "News article published successfully." });

            // Reset form
            setTitle("");
            setDescription("");
            setImage(null);
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

            // Clear success message after 5 seconds
            setTimeout(() => {
                setStatus({ type: "idle", message: "" });
            }, 5000);

        } catch (error: any) {
            console.error("Error adding news:", error);
            setStatus({ type: "error", message: error.message || "Failed to publish article." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl max-w-2xl">

            {status.type !== "idle" && (
                <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 border ${status.type === 'error'
                        ? 'bg-red-50 border-red-100 text-red-800'
                        : 'bg-green-50 border-green-100 text-green-800'
                    } animate-in fade-in slide-in-from-top-2`}>
                    {status.type === 'error' ? (
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{status.message}</span>
                </div>
            )}

            <div className="space-y-8">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-zinc-900 mb-2">
                        Headline
                    </label>
                    <input
                        id="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] transition-all text-lg font-medium"
                        placeholder="e.g. Inspira Announces New Distribution Center"
                    />
                </div>

                {/* Description Textarea */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-zinc-900 mb-2 flex justify-between">
                        <span>Article Content</span>
                        <span className="text-zinc-400 font-normal">Markdown not supported</span>
                    </label>
                    <textarea
                        id="description"
                        required
                        rows={8}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] transition-all resize-none font-light leading-relaxed"
                        placeholder="Write the full public announcement here..."
                    />
                </div>

                {/* Cover Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-2">
                        Cover Image (Optional)
                    </label>
                    <div
                        onClick={triggerFileInput}
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-2xl cursor-pointer transition-colors group ${imagePreview ? 'border-[#00A3FF] bg-[#00A3FF]/5' : 'border-zinc-300 hover:border-[#00A3FF] bg-[#FAFAFA] hover:bg-white'
                            }`}
                    >
                        <div className="space-y-2 text-center flex flex-col items-center">
                            {imagePreview ? (
                                <div className="relative w-full max-w-[300px] aspect-[16/9] rounded-lg overflow-hidden border border-zinc-200 shadow-sm mx-auto mb-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imagePreview} alt="Cover preview" className="object-cover w-full h-full" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-zinc-100 group-hover:bg-[#00A3FF]/10 flex items-center justify-center transition-colors mb-2">
                                    <ImageIcon className="w-8 h-8 text-zinc-400 group-hover:text-[#00A3FF] transition-colors" />
                                </div>
                            )}

                            <div className="flex flex-col items-center text-sm text-zinc-600">
                                <span className="font-semibold text-[#00A3FF] group-hover:text-[#008ce6]">
                                    {imagePreview ? 'Change Image' : 'Upload a file'}
                                </span>
                                <p className="text-zinc-500 font-light mt-1 text-xs">PNG, JPG, WEBP up to 5MB</p>
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-zinc-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-8 border border-transparent rounded-xl shadow-[0_4px_14px_rgba(0,163,255,0.3)] text-sm font-semibold text-white bg-[#00A3FF] hover:bg-[#008ce6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A3FF] transition-all transform hover:-translate-y-0.5 min-w-[200px] ${loading ? 'opacity-70 cursor-not-allowed scale-100 translate-y-0' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <UploadCloud className="w-4 h-4" />
                                Publish Article
                            </>
                        )}
                    </button>
                    <p className="mt-4 text-xs text-zinc-500 font-light max-w-md">
                        Upon publishing, the article will immediately be live on the public Newsroom page.
                    </p>
                </div>
            </div>
        </form>
    );
}
