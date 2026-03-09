import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import EmailPopup from "@/components/EmailPopup";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspira Worldwide",
    description:
      "Sri Lanka's definitive pharmaceutical distribution outsourcing partner.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <EmailPopup />
      </body>
    </html>
  );
}
