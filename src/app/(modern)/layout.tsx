import type { Metadata } from "next";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";

export const metadata: Metadata = {
  icons: {
    icon: "/portfolio-icon.png",
    shortcut: "/portfolio-icon.png",
  },
};

export default function ModernLayout({ children }: { children: React.ReactNode }) {
  return <ModernPortfolioFrame>{children}</ModernPortfolioFrame>;
}
