"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { modernPortfolio } from "@/data/modern-portfolio";
import OttawaClock from "./OttawaClock";
import styles from "./Portfolio.module.css";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/interndex", label: "Interndex" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Résumé" },
];

export default function ModernPortfolioFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.siteFrame}>
        <header className={styles.siteHeader}>
          <Link href="/" className={styles.nameLink} aria-label="David Jeanty — home">
            {modernPortfolio.identity.name}
          </Link>

          <nav className={styles.navigation} aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active ? <motion.span className={styles.activeRule} layoutId="active-nav" /> : null}
                </Link>
              );
            })}
          </nav>
        </header>

        <main id="main-content" className={styles.main}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              className={styles.routeSheet}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className={styles.footer}>
          <Link href={modernPortfolio.archive.href} className={styles.archiveLink}>
            {modernPortfolio.archive.label} <span aria-hidden="true">↗</span>
          </Link>
          <OttawaClock />
        </footer>
      </div>
    </MotionConfig>
  );
}
