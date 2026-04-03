"use client";

import { useState } from "react";
import { useWindowManager } from "@/components/desktop/WindowManager";
import styles from "./WindowApps.module.css";

export default function InternalOnlyWindowContent() {
  const { closeWindow, openWindow } = useWindowManager();
  const [confirmStage, setConfirmStage] = useState<"warning" | "final">("warning");

  return (
    <div>
      <div className={styles.menuBar}>
        {["File", "Edit", "View", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      {confirmStage === "warning" ? (
        <section className={`${styles.warningPanel} ${styles.internalWarningPanel}`}>
          <div className={styles.warningHeaderRow}>
            <span className={styles.warningIcon} aria-hidden="true">
              !
            </span>
            <h3 className={styles.warningPanelTitle}>Internal System Warning</h3>
          </div>

          <p>Please proceed if you would like to delete website database.</p>

          <div className={styles.warningActions}>
            <button
              type="button"
              className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
              onClick={() => setConfirmStage("final")}
            >
              Proceed Anyway
            </button>
          </div>
        </section>
      ) : (
        <section className={`${styles.warningPanel} ${styles.internalWarningPanel}`}>
          <div className={styles.warningHeaderRow}>
            <span className={styles.warningIcon} aria-hidden="true">
              !
            </span>
            <h3 className={styles.warningPanelTitle}>Final Confirmation Required</h3>
          </div>

          <p>This action cannot be undone.</p>

          <div className={styles.warningActions}>
            <button
              type="button"
              className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
              onClick={() => {
                openWindow("internal-media", { centered: true });
                closeWindow("internal-only");
              }}
            >
              Open Internal Media
            </button>
          </div>
        </section>
      )}

      <div className={styles.statusBar}>
        <span>Optional easter egg</span>
        <span>Not part of core recruiter flow</span>
      </div>
    </div>
  );
}
