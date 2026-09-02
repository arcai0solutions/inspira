"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DEMO_BANNERS, type HeroBanner as Banner } from "@/lib/banners";

const ROTATE_MS = 6500;

type Props = {
    /** Hidden while the navigation overlay is open. */
    hidden?: boolean;
    /** Fires once the first banner image has painted. */
    onReady?: () => void;
};

/**
 * Image-only rotating hero banner.
 *
 * The artwork carries the whole message — there is deliberately no headline,
 * body copy or CTA rendered over it. Banners are managed from /admin/banners.
 *
 * The parent container is a fixed 16:9 box and the artwork is 16:9, so the
 * framing is identical at every screen size — no mobile zoom-crop.
 */
export default function HeroBanner({ hidden = false, onReady }: Props) {
    const [banners, setBanners] = useState<Banner[]>(DEMO_BANNERS);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const readyFired = useRef(false);

    // Keep refs of the live values so the rotation timer never closes over stale state.
    const bannersRef = useRef(banners);
    const indexRef = useRef(index);

    useEffect(() => {
        bannersRef.current = banners;
    }, [banners]);

    useEffect(() => {
        indexRef.current = index;
    }, [index]);

    // Pull published banners; keep the demo set if the table is empty or unreachable.
    useEffect(() => {
        let cancelled = false;

        (async () => {
            const { data, error } = await supabase
                .from("hero_banners")
                .select("*")
                .eq("is_active", true)
                .order("sort_order", { ascending: true });

            if (cancelled) return;

            if (error) {
                console.warn("Hero banners unavailable, using defaults:", error.message);
                return;
            }
            if (data && data.length > 0) {
                setBanners(data as Banner[]);
                setIndex(0);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const total = banners.length;

    const goTo = useCallback((target: number) => {
        const count = bannersRef.current.length;
        if (count === 0) return;
        setIndex(((target % count) + count) % count);
    }, []);

    const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
    const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

    // Auto-rotate — stops on a single banner, while paused, while the menu is open,
    // for reduced-motion users, and in a background tab.
    useEffect(() => {
        if (total <= 1 || paused || hidden) return;

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const timer = setInterval(() => {
            if (document.visibilityState === "visible") next();
        }, ROTATE_MS);

        return () => clearInterval(timer);
    }, [total, paused, hidden, next, index]);

    const handleFirstImageLoad = useCallback(() => {
        if (readyFired.current) return;
        readyFired.current = true;
        onReady?.();
    }, [onReady]);

    const active = banners[index];
    if (!active) return null;

    return (
        <section
            className="absolute inset-0 z-0"
            aria-roledescription="carousel"
            aria-label="Inspira Worldwide highlights"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            {/* Image layers, crossfaded. Container and artwork are both 16:9, so
                object-cover fits exactly — identical framing on mobile and desktop. */}
            {banners.map((banner, i) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${i === index ? "opacity-100" : "opacity-0"}`}
                    aria-hidden={i !== index}
                >
                    <Image
                        src={banner.image_url}
                        alt={banner.image_alt || banner.title}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        onLoad={i === 0 ? handleFirstImageLoad : undefined}
                        className="object-cover object-center"
                    />
                </div>
            ))}

            {/* Light scrim at the top only — keeps the logo and Menu button legible
                against bright artwork without dimming the banner itself. */}
            <div
                className="absolute inset-x-0 top-0 h-32 md:h-40 z-10 pointer-events-none bg-gradient-to-b from-black/45 to-transparent"
                aria-hidden="true"
            />

            {/* Controls */}
            {total > 1 && (
                <div
                    className={`absolute bottom-4 md:bottom-8 left-0 right-0 z-30 px-4 md:px-12 flex items-center justify-between gap-4 transition-opacity duration-500 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                    {/* Slide indicators */}
                    <div className="flex items-center gap-2 md:gap-2.5">
                        {banners.map((banner, i) => (
                            <button
                                key={banner.id}
                                onClick={() => goTo(i)}
                                aria-label={`Show banner ${i + 1} of ${total}`}
                                aria-current={i === index}
                                className="group py-2 cursor-pointer"
                            >
                                <span
                                    className={`block h-[3px] rounded-full transition-all duration-500 ${i === index
                                        ? "w-8 md:w-10 bg-white"
                                        : "w-4 md:w-5 bg-white/50 group-hover:bg-white/80"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Prev / next */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prev}
                            aria-label="Previous banner"
                            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/25 hover:bg-black/45 border border-white/25 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next banner"
                            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/25 hover:bg-black/45 border border-white/25 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Announce slide changes to screen readers without moving focus */}
            <p className="sr-only" aria-live="polite">
                {`Banner ${index + 1} of ${total}`}
            </p>
        </section>
    );
}
