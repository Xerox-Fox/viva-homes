import type { Metadata } from "next";
import SignUpPage from "./signup-client";

export const metadata: Metadata = {
  title: "Create your Viva Homes account",
  description:
    "Sign up to Viva Homes as a client, agent, or home owner and start renting, buying, or listing verified homes in Ethiopia.",
  openGraph: {
    title: "Create your Viva Homes account",
    description: "Join Viva Homes as a client, agent, or home owner — verified listings, direct contact.",
  },
};

export default function Page() {
  return <SignUpPage />;
}
