import type { Metadata } from "next";
import PropertiesPage from "./properties-client";

export const metadata: Metadata = {
  title: "Browse Homes for Rent & Sale",
  description:
    "Search verified apartments, villas, condominiums and studios for rent or sale across Ethiopia, and contact owners directly.",
  openGraph: {
    title: "Browse Homes for Rent & Sale | Viva Homes",
    description: "Filter by city, price, bedrooms and property type to find your next home in Ethiopia.",
  },
};

export default function Page() {
  return <PropertiesPage />;
}
