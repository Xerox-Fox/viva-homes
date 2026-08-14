import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Viva Homes | Rent & Buy Homes in Ethiopia",
    template: "%s | Viva Homes",
  },
  description:
    "Viva Homes is Ethiopia's digital housing platform. Browse verified rentals and homes for sale, and deal directly with owners and trusted agencies.",
  openGraph: {
    title: "Viva Homes | Rent & Buy Homes in Ethiopia",
    description:
      "Find, rent, and buy homes in Ethiopia without coercive middlemen. Verified listings and direct contact with owners and agencies.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
