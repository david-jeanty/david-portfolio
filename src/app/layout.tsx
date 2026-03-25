import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Jeanty | Portfolio",
  description:
    "Business Technology Management student at uOttawa pursuing Fall 2026 internship opportunities in business analysis, product operations, and tech consulting.",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
