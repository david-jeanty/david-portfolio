"use client";

import { useMemo, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";
import { SmallFolderIcon } from "@/components/desktop/XPIcons";

const EXPERIENCE_ITEMS = portfolioData.experience;

function formatMetric(value: number, prefix = "", suffix = "") {
  return `${prefix}${value.toLocaleString()}${suffix}`;
}

export default function ExperienceWindowContent() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCE_ITEMS[0].id);
  const selected = useMemo(
    () => EXPERIENCE_ITEMS.find((item) => item.id === selectedId) ?? EXPERIENCE_ITEMS[0],
    [selectedId]
  );

  return (
    <div className={styles.experienceApp}>
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
          My Computer \ Portfolio \ Experience \ {selected.company}
        </div>
      </div>

      <section className={styles.sectionIntroCard}>
        <div>
          <p className={styles.sectionIntroEyebrow}>Experience overview</p>
          <h3 className={styles.sectionIntroTitle}>Campaign, CRM, and operations work with visible outcomes</h3>
          <p className={styles.sectionIntroCopy}>
            My experience clusters around digital campaign setup, reporting, follow-up,
            stakeholder communication, and keeping execution organized when there are a lot of
            moving parts.
          </p>
        </div>

        <div className={styles.metricCardCompact}>
          <span className={styles.metricCardValue}>{EXPERIENCE_ITEMS.length}</span>
          <span className={styles.metricCardLabel}>roles highlighted</span>
        </div>
      </section>

      <section className={styles.explorerLayout}>
        <aside className={styles.folderPane} aria-label="Organizations">
          {EXPERIENCE_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.folderButton} ${
                item.id === selected.id ? styles.folderButtonActive : ""
              }`}
              onClick={() => setSelectedId(item.id)}
            >
              <span className={styles.folderButtonInner}>
                <SmallFolderIcon />
                {item.company}
              </span>
            </button>
          ))}
        </aside>

        <article className={styles.detailPane} aria-label="Selected experience details">
          <div className={styles.detailHeroRow}>
            <div>
              <h3 className={styles.detailHeader}>{selected.company}</h3>
              <p className={styles.metaLine}>
                {selected.role}
                {selected.period ? ` · ${selected.period}` : ""}
              </p>
              {selected.secondaryRoleLine ? (
                <p className={styles.metaLine}>{selected.secondaryRoleLine}</p>
              ) : null}
            </div>

            {selected.metric ? (
              <div className={styles.metricShowcase}>
                <span className={styles.metricShowcaseValue}>
                  {formatMetric(
                    selected.metric.value,
                    selected.metric.prefix,
                    selected.metric.suffix
                  )}
                </span>
                <span className={styles.metricShowcaseLabel}>{selected.metric.label}</span>
              </div>
            ) : null}
          </div>

          <section className={styles.infoPanel}>
            <p className={styles.sectionLabel}>Snapshot</p>
            <p className={styles.calloutText}>{selected.summary}</p>
          </section>

          <div className={styles.splitPanelGrid}>
            <section className={styles.infoPanel}>
              <p className={styles.sectionLabel}>Selected examples</p>
              <ul className={styles.rowList}>
                {selected.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className={styles.calloutCard}>
              <p className={styles.sectionLabel}>What this involved</p>
              <p className={styles.calloutText}>{selected.translation}</p>
            </section>
          </div>

          <div className={styles.tagRow}>
            <span className={styles.tagChip}>Campaigns</span>
            <span className={styles.tagChip}>CRM</span>
            <span className={styles.tagChip}>Reporting</span>
            <span className={styles.tagChip}>Follow-up</span>
            <span className={styles.tagChip}>Operations</span>
          </div>
        </article>
      </section>

      <div className={styles.statusBar}>
        <span>{EXPERIENCE_ITEMS.length} organizations</span>
        <span>Selected: {selected.company}</span>
      </div>
    </div>
  );
}
