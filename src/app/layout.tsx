import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "David Jeanty | Portfolio",
  description:
    "Business Technology Management student at uOttawa with interests in business analysis, product operations, and tech consulting.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
  keywords: [
    "David Jeanty",
    "Business Analyst",
    "Product Operations",
    "Technology Consulting",
    "uOttawa",
    "Ottawa",
    "Kanata North",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
