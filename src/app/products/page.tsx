import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Our Products | Inspira Worldwide",
  description:
    "Explore the complete pharmaceutical product portfolio of Inspira Worldwide — from antibiotics and cardiology treatments to neurology and diabetes medications. Trusted distribution across Sri Lanka.",
  openGraph: {
    title: "Our Products | Inspira Worldwide",
    description:
      "Browse our comprehensive range of pharmaceutical products distributed island-wide across Sri Lanka.",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
