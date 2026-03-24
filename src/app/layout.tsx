import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Jeanty — Business Analyst & Tech Consultant",
  description:
    "Bilingual BCom student at uOttawa specializing in Business Technology Management. Bridging operational problems and technical solutions.",
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
