"use client";

import { useMemo, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";
import { SmallFolderIcon, SmallWrenchIcon } from "@/components/desktop/XPIcons";

type SectionId = (typeof portfolioData.workbench.sections)[number]["id"];

export default function WorkbenchWindowContent() {
  const [selectedSectionId, setSelectedSectionId] = useState<SectionId>(
    portfolioData.workbench.sections[0].id
  );
  const selectedSection = useMemo(
    () =>
      portfolioData.workbench.sections.find((section) => section.id === selectedSectionId) ??
      portfolioData.workbench.sections[0],
    [selectedSectionId]
  );

  return (
    <div>
      <div className={styles.menuBar}>
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <div className={styles.toolbar}>
        <span className={styles.addressLabel}>Address</span>
        <div className={styles.addressBox}>
          My Computer \ Portfolio \ {portfolioData.workbench.title} \ {selectedSection.label}
        </div>
      </div>

      <section className={styles.explorerLayout}>
        <aside className={styles.folderPane} aria-label="Workbench sections">
          {portfolioData.workbench.sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`${styles.folderButton} ${
                section.id === selectedSection.id ? styles.folderButtonActive : ""
              }`}
              onClick={() => setSelectedSectionId(section.id)}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <SmallFolderIcon />
                {section.label}
              </span>
            </button>
          ))}
        </aside>

        <article className={styles.detailPane} aria-label="Selected workbench details">
          <div className={`${styles.workbenchHeader} ${styles.detailSectionIntro}`}>
            <div>
              <h3 className={styles.detailHeader}>{selectedSection.label}</h3>
              <p className={styles.metaLine}>
                A focused view of what I can already use, what I am learning,
                and what I am building next.
              </p>
            </div>

            {selectedSection.id === "projects-in-progress" ? (
              <div className={styles.featuredFlag}>
                <SmallWrenchIcon />
                Featured initiative
              </div>
            ) : null}
          </div>

          <div className={styles.workbenchList}>
            {selectedSection.items.map((item) => (
              <section
                key={item.name}
                className={`${styles.workbenchCard} ${item.featured ? styles.workbenchCardFeatured : ""}`}
              >
                <div className={styles.workbenchCardTop}>
                  <h4 className={styles.workbenchItemTitle}>{item.name}</h4>
                  <span className={styles.workbenchBadge}>{item.status.replace("-", " ")}</span>
                </div>

                <div className={styles.infoPanel}>
                  <p className={styles.sectionLabel}>What it is</p>
                  <p>{item.summary}</p>
                </div>

                <div className={styles.infoPanel}>
                  <p className={styles.sectionLabel}>Why this matters to me</p>
                  <p>{item.rationale}</p>
                </div>

                <div className={styles.infoPanel}>
                  <p className={styles.sectionLabel}>Role connection</p>
                  <p>{item.roleConnection}</p>
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>

      <div className={styles.statusBar}>
        <span>{selectedSection.items.length} items</span>
        <span>Honest status: using / learning / in progress / planned</span>
      </div>
    </div>
  );
}
