import HomeClient from "./HomeClient";

export const metadata = {
  title: "Inspira Worldwide | Pharmaceutical Distribution in Sri Lanka",
  description:
    "Sri Lanka's definitive pharmaceutical distribution outsourcing partner. From strategic brand building to risk-minimized logistics, we connect domestic manufacturers to patients with speed, flexibility, and reliability.",
  openGraph: {
    title: "Inspira Worldwide | Pharmaceutical Distribution in Sri Lanka",
    description:
      "Precision distribution. Expanding your market reach across Sri Lanka.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
