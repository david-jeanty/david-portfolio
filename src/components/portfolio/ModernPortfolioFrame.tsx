"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { modernPortfolio } from "@/data/modern-portfolio";
import OttawaClock from "./OttawaClock";
import styles from "./Portfolio.module.css";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/involvement", label: "Involvement" },
  { href: "/resume", label: "Résumé" },
  { href: "/tinder", label: "Tinder TPM" },
];

export default function ModernPortfolioFrame({
  children,
  reportFooter,
}: {
  children: React.ReactNode;
  reportFooter?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDetailPage = ["/work", "/interndex", "/experience", "/involvement"].includes(pathname);
  const frameClass = isHome ? styles.homeFrame : reportFooter ? styles.reportFrame : isDetailPage ? styles.detailFrame : "";
  return (
    <MotionConfig reducedMotion="user">
      <div className={`${styles.siteFrame} ${frameClass}`}>
        <header className={styles.siteHeader}>
          <Link href="/" className={styles.nameLink} aria-label={`${modernPortfolio.identity.name}, home`}>
            {modernPortfolio.identity.name}
          </Link>

          <nav className={styles.navigation} aria-label="Primary navigation">
            {navigation.map((item) => {
              const isCurrentPage = pathname === item.href;
              const active = isCurrentPage || (item.href === "/work" && pathname === "/interndex");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                  aria-current={isCurrentPage ? "page" : active ? "location" : undefined}
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

        {isHome ? (
          <footer className={styles.homeFooter}>
            <Link href={modernPortfolio.archive.href} className={styles.archiveLink}>
              Windows XP archive
            </Link>
            <div className={styles.homeContact}>
              <a href={`mailto:${modernPortfolio.identity.email}`}>Email</a>
              <a href={modernPortfolio.identity.linkedin}>LinkedIn</a>
            </div>
          </footer>
        ) : reportFooter ?? (
          <footer className={styles.footer}>
            <Link href={modernPortfolio.archive.href} className={styles.archiveLink}>
              {modernPortfolio.archive.label} <span aria-hidden="true">↗</span>
            </Link>
            <OttawaClock />
          </footer>
        )}
      </div>
    </MotionConfig>
  );
}
