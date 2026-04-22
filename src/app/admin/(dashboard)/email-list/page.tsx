import React from "react";
import EmailListClient from "./EmailListClient";

export const metadata = {
    title: "Email List | Admin - Inspira Worldwide",
    robots: { index: false, follow: false },
};

export default function EmailListPage() {
    return <EmailListClient />;
}
