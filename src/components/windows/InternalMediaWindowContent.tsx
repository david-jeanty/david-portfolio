"use client";

import styles from "./WindowApps.module.css";

export default function InternalMediaWindowContent() {
  return (
    <div>
      <div className={styles.menuBar}>
        {["File", "Edit", "View", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <div className={styles.toolbar}>
        <span className={styles.addressLabel}>Media</span>
        <div className={styles.addressBox}>/internal-media.mp4</div>
      </div>

      <section className={styles.surface}>
        <div className={styles.documentMetaRow}>
          <span className={styles.documentMetaChip}>File: internal-media.mp4</span>
          <span className={styles.documentMetaChip}>Status: local playback ready</span>
        </div>

        <div className={styles.documentCanvas}>
          <video
            className={styles.mediaPlayer}
            controls
            autoPlay
            preload="metadata"
          >
            <source src="/internal-media.mp4" type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>
      </section>

      <div className={styles.statusBar}>
        <span>Internal media player</span>
        <span>Optional easter egg</span>
      </div>
    </div>
  );
}
