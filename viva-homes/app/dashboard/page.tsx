import type { Metadata } from "next";
import DashboardPage from "./dashboard-client";

export const metadata: Metadata = {
  title: "Your dashboard",
  description: "Your Viva Homes account overview — role, profile details, and next steps.",
};

export default function Page() {
  return <DashboardPage />;
}
