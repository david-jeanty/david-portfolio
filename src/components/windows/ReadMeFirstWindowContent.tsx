"use client";

import Image from "next/image";
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
          <div className={styles.notepadIntro}>
            <div className={styles.notepadPhotoFrame}>
              <Image
                src="/david-headshot.JPG"
                alt="David Jeanty"
                width={110}
                height={110}
                className={styles.notepadPhoto}
              />
            </div>

            <div className={styles.notepadCopy}>
              Hi - I&apos;m David.

              {"\n\n"}I built this portfolio like a small desktop because I
              like systems that are organized, interactive, and easy to
              explore.

              {"\n\n"}I&apos;m currently looking for Fall 2026 internship
              opportunities in business analysis, product operations, and tech
              consulting.

              {"\n\n"}Start with Experience or Resume.pdf.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statusBar}>
        <span>Ln 8, Col 35</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
