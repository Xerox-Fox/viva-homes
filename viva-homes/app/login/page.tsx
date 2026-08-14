import type { Metadata } from "next";
import LoginPage from "./login-client";

export const metadata: Metadata = {
  title: "Sign in to Viva Homes",
  description:
    "Sign in to your Viva Homes account to manage listings, saved homes, and client enquiries across Ethiopia.",
};

export default function Page() {
  return <LoginPage />;
}
