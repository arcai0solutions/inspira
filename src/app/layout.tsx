import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import EmailPopup from "@/components/EmailPopup";
import { AiChatWidget } from "@/components/AiChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inspiraworldwide.com"),
  title: {
    default: "Inspira Worldwide | Pharmaceutical Distribution in Sri Lanka",
    template: "%s | Inspira Worldwide",
  },
  description:
    "Sri Lanka's definitive pharmaceutical distribution outsourcing partner. From strategic brand building to risk-minimized logistics, we connect domestic manufacturers to patients with speed, flexibility, and reliability.",
  keywords: [
    "pharmaceutical distribution",
    "Sri Lanka",
    "drug distribution",
    "healthcare logistics",
    "brand building",
    "Inspira Worldwide",
    "Colombo",
  ],
  authors: [{ name: "Inspira Worldwide" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Inspira Worldwide",
    title: "Inspira Worldwide | Pharmaceutical Distribution in Sri Lanka",
    description:
      "Sri Lanka's definitive pharmaceutical distribution outsourcing partner.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inspira Worldwide — Pharmaceutical Distribution in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspira Worldwide",
    description:
      "Sri Lanka's definitive pharmaceutical distribution outsourcing partner.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Inspira Worldwide",
              url: "https://inspiraworldwide.com",
              logo: "https://inspiraworldwide.com/inspira-logo.png",
              description:
                "Sri Lanka's definitive pharmaceutical distribution outsourcing partner. From strategic brand building to risk-minimized logistics.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Colombo",
                addressCountry: "LK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Sinhala", "Tamil"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <EmailPopup />
        <AiChatWidget />
      </body>
    </html>
  );
}
