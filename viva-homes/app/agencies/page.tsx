import type { Metadata } from "next";
import AgenciesPage from "./agencies-client";

export const metadata: Metadata = {
  title: "For Real-Estate Agencies",
  description:
    "Advertise listings, manage your portfolio, get verified and talk to clients directly. Viva Homes gives Ethiopian agencies a digital home.",
  openGraph: {
    title: "For Real-Estate Agencies | Viva Homes",
    description: "Listing ads, networking, property management, verification and communication tools for agencies.",
  },
};

export default function Page() {
  return <AgenciesPage />;
}
