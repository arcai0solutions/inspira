import type { Metadata } from "next";
import CollaborationClient from "./CollaborationClient";

export const metadata: Metadata = {
    title: "Collaboration | Inspira Worldwide",
    description: "Partner with Sri Lanka's trusted pharmaceutical distribution network.",
};

export default function CollaborationPage() {
    return <CollaborationClient />;
}
