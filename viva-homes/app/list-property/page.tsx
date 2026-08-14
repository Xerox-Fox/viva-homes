import type { Metadata } from "next";
import ListPropertyPage from "./list-property-client";

export const metadata: Metadata = {
  title: "List Your Property",
  description:
    "Post your house or apartment on Viva Homes and reach renters and buyers directly — no middlemen, no inflated commissions.",
  openGraph: {
    title: "List Your Property | Viva Homes",
    description: "Publish a verified listing in minutes and speak with serious renters and buyers directly.",
  },
};

export default function Page() {
  return <ListPropertyPage />;
}
