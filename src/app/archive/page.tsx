import Link from "next/link";
import DesktopShell from "@/components/desktop/DesktopShell";
import styles from "./archive.module.css";

export const metadata = {
  title: "David Jeanty — Windows XP Portfolio Archive",
};

export default function ArchivePage() {
  return (
    <div className={styles.archive}>
      <Link href="/" className={styles.returnLink}>Return to current portfolio ↙</Link>
      <DesktopShell />
    </div>
  );
}
