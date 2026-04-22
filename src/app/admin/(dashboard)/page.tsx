import React from "react";
import DashboardClient from "./DashboardClient";

export const metadata = {
    title: "Dashboard | Inspira Worldwide Admin",
    description: "Overview of your Inspira admin panel.",
    robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
    return <DashboardClient />;
}
