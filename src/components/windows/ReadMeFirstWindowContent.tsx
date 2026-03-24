"use client";

import styles from "./WindowApps.module.css";

export default function ReadMeFirstWindowContent() {
  return (
    <div>
      <div className={styles.menuBar}>
        {["File", "Edit", "Format", "View", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <div className={styles.surface}>
        <div className={styles.notepadArea}>
          Hi - I&apos;m David.

          I built this portfolio like a small desktop because I like systems
          that are organized, interactive, and easy to explore.

          I&apos;m currently looking for Fall 2026 internship opportunities in
          business analysis, product operations, and tech consulting.

          Start with Experience or Resume.pdf.
        </div>
      </div>

      <div className={styles.statusBar}>
        <span>Ln 8, Col 35</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
