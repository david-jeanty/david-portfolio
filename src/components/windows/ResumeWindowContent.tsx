"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";

export default function ResumeWindowContent() {
  const resumeUrl = `/${portfolioData.desktop.resumeFileName}`;
  const expectedPublicPath = `/public/${portfolioData.desktop.resumeFileName}`;
  const [resumeState, setResumeState] = useState<"checking" | "ready" | "missing">("checking");

  useEffect(() => {
    let cancelled = false;

    const checkResume = async () => {
      try {
        const response = await fetch(resumeUrl, {
          method: "HEAD",
          cache: "no-store",
        });

        if (!cancelled) {
          setResumeState(response.ok ? "ready" : "missing");
        }
      } catch {
        if (!cancelled) {
          setResumeState("missing");
        }
      }
    };

    checkResume();
    return () => {
      cancelled = true;
    };
  }, [resumeUrl]);

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
        <span className={styles.addressLabel}>Document</span>
        <div className={styles.addressBox}>{resumeUrl}</div>
      </div>

      <section className={styles.surface}>
        <div className={styles.documentToolbar}>
          <div>
            <p className={styles.documentTitle}>Resume.pdf</p>
            <p className={styles.documentSubtitle}>
              Quick recruiter view with preview, download, and direct-open access.
            </p>
          </div>

          <div className={styles.documentActionRow}>
            {resumeState === "ready" ? (
              <>
                <a
                  href={resumeUrl}
                  download
                  className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                  aria-label="Download Resume.pdf"
                >
                  Download Resume
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                  aria-label="Open Resume.pdf in a new tab"
                >
                  Open in New Tab
                </a>
              </>
            ) : (
              <>
                <span
                  className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
                  aria-disabled="true"
                >
                  Download PDF
                </span>
                <span
                  className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
                  aria-disabled="true"
                >
                  Open in New Tab
                </span>
              </>
            )}
          </div>
        </div>

        <div className={styles.documentMetaRow}>
          <span className={styles.documentMetaChip}>File: {portfolioData.desktop.resumeFileName}</span>
          <span className={styles.documentMetaChip}>
            {resumeState === "ready" ? "Status: ready to view" : "Status: waiting for file"}
          </span>
        </div>

        <div className={styles.documentCanvas}>
          {resumeState === "ready" ? (
            <p className={styles.mobileDocumentHint}>
              On smaller screens, opening in a new tab or downloading is usually
              easier than scrolling the preview.
            </p>
          ) : null}
          {resumeState === "ready" ? (
            <iframe
              src={resumeUrl}
              title="Resume PDF"
              className={styles.resumeFrame}
            />
          ) : (
            <div className={styles.resumeFallbackCard}>
              <div className={styles.resumeSheet}>
                <div className={styles.resumeSheetHeader}>Resume Preview</div>
                {resumeState === "checking" ? (
                  <p className={styles.resumeFallbackText}>Checking for Resume.pdf...</p>
                ) : (
                  <>
                    <p className={styles.resumeFallbackText}>
                      No resume PDF is available yet, so this viewer is showing a clean document
                      placeholder instead of a broken 404 preview.
                    </p>
                    <div className={styles.noticeCard}>
                      <p style={{ marginTop: 0, marginBottom: 8, fontWeight: 700 }}>
                        To enable the full document window
                      </p>
                      <p style={{ marginTop: 0, marginBottom: 0 }}>
                        Place your file at <span className={styles.mono}>{expectedPublicPath}</span>.
                      </p>
                    </div>
                    <p className={styles.resumeFallbackText} style={{ marginBottom: 0 }}>
                      Once the PDF is present, this window will automatically support inline
                      preview, download, and new-tab viewing.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className={styles.statusBar}>
        <span>Resume viewer</span>
        <span>
          {resumeState === "ready" ? "PDF actions enabled" : `Waiting for ${expectedPublicPath}`}
        </span>
      </div>
    </div>
  );
}
