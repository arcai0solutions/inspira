/**
 * Hero banner types + fallback content.
 *
 * Banners are managed from the admin dashboard (/admin/banners) and stored in the
 * Supabase `hero_banners` table. The DEMO_BANNERS below are what the site shows
 * before any banner has been published — so the homepage is never empty.
 */

export type HeroBanner = {
    id: string;
    eyebrow: string | null;
    title: string;
    subtitle: string | null;
    image_url: string;
    image_alt: string | null;
    cta_label: string | null;
    cta_href: string | null;
    cta_secondary_label: string | null;
    cta_secondary_href: string | null;
    sort_order: number;
    is_active: boolean;
};

export const PHONE_NUMBER = "+94 71 387 6936";
export const PHONE_HREF = "tel:+94713876936";

/**
 * Shown until the client publishes their own banners from the dashboard.
 *
 * Banners are image-only on the site — nothing is drawn over the artwork. `title`
 * is an internal label for the admin list; `image_alt` is the accessible description.
 * The overlay fields stay on the type for schema compatibility and are always null.
 */
export const DEMO_BANNERS: HeroBanner[] = [
    {
        id: "demo-1",
        eyebrow: null,
        title: "Distribution — warehouse dispatch",
        subtitle: null,
        image_url: "/banner-distribution.jpg",
        image_alt:
            "Inspira Worldwide distribution team preparing pharmaceutical cartons for island-wide dispatch",
        cta_label: null,
        cta_href: null,
        cta_secondary_label: null,
        cta_secondary_href: null,
        sort_order: 1,
        is_active: true,
    },
    {
        id: "demo-2",
        eyebrow: null,
        title: "Cold chain — temperature-controlled storage",
        subtitle: null,
        image_url: "/banner-cold-chain.jpg",
        image_alt:
            "Temperature-monitored cold storage room at the Inspira Worldwide warehouse",
        cta_label: null,
        cta_href: null,
        cta_secondary_label: null,
        cta_secondary_href: null,
        sort_order: 2,
        is_active: true,
    },
    {
        id: "demo-3",
        eyebrow: null,
        title: "Partnership — third-party delivery",
        subtitle: null,
        image_url: "/banner-partnership.jpg",
        image_alt:
            "Inspira Worldwide team meeting with a Sri Lankan pharmaceutical manufacturing partner",
        cta_label: null,
        cta_href: null,
        cta_secondary_label: null,
        cta_secondary_href: null,
        sort_order: 3,
        is_active: true,
    },
];
