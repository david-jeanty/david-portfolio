import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
