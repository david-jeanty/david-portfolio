import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "David Jeanty — Portfolio",
  description:
    "David Jeanty's portfolio: experience, Interndex, résumé, and a weather-responsive archive of the work behind them.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
  keywords: [
    "David Jeanty",
    "Interndex",
    "Business Technology Management",
    "uOttawa",
    "Ottawa",
    "Portfolio",
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
