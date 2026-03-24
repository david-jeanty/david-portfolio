"use client";

import { useMemo, useState } from "react";
import styles from "./WindowApps.module.css";
import { SmallFolderIcon } from "@/components/desktop/XPIcons";

type ExperienceNode = {
  id: string;
  org: string;
  role?: string;
  period?: string;
  positioning?: string[];
  bullets: string[];
  translation: string;
};

const EXPERIENCE_ITEMS: ExperienceNode[] = [
  {
    id: "cibc",
    org: "CIBC Wood Gundy",
    role: "Incoming Student Wealth Associate",
    period: "Summer 2026",
    positioning: [
      "selected for a private wealth internship",
      "supporting client service and operational execution in a regulated financial environment",
    ],
    bullets: [],
    translation:
      "trust, precision, regulated operations, client-facing execution",
  },
  {
    id: "stranexus",
    org: "StraNexus",
    bullets: [
      "mapped 38 target programs across 31 universities in 3 regions, prioritizing 16 high-fit programs",
      "expanded sourcing beyond industrial engineering into 6 discipline categories",
      "built an Ontario-first campus recruiting plan covering 15 programs and 4 outreach channels",
      "designed a 13-field outreach tracker",
      "structured a 30-minute value-added presentation format",
      "aligned outreach to 4 practice areas and 17 client sectors",
    ],
    translation:
      "market mapping, process design, outreach systems, stakeholder operations, implementation-oriented thinking",
  },
  {
    id: "aritzia",
    org: "Aritzia",
    role: "Risk Associate",
    period: "Apr 2024 to Aug 2025",
    bullets: [
      "reduced shrink by $50K+",
      "tracked KPIs in a high-volume environment serving 1,000+ weekly clients",
      "flagged anomalies and recommended process adjustments",
      "partnered across a 50+ person team",
    ],
    translation:
      "operational analytics, anomaly detection, risk/compliance thinking, process improvement",
  },
  {
    id: "student-ambassador",
    org: "Student Ambassador",
    bullets: [
      "delivered 75+ campus tours",
      "engaged 2,500+ prospective students",
      "handled 2,000+ CRM inquiries",
      "created content for 20,000+ followers",
    ],
    translation:
      "CRM operations, communication at scale, workflow follow-through, stakeholder guidance",
  },
  {
    id: "tbta",
    org: "Telfer Business Technology Association",
    bullets: [
      "managed 100+ student inquiries",
      "hired/onboarded 20 members",
      "organized 10+ events/year",
    ],
    translation:
      "internal operations, hiring coordination, team support, stakeholder alignment",
  },
];

export default function ExperienceWindowContent() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCE_ITEMS[0].id);
  const selected = useMemo(
    () => EXPERIENCE_ITEMS.find((i) => i.id === selectedId) ?? EXPERIENCE_ITEMS[0],
    [selectedId]
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
          My Computer \ Portfolio \ Experience \ {selected.org}
        </div>
      </div>

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
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <SmallFolderIcon />
                {item.org}
              </span>
            </button>
          ))}
        </aside>

        <article className={styles.detailPane} aria-label="Selected experience details">
          <h3 className={styles.detailHeader}>{selected.org}</h3>
          <p className={styles.metaLine}>
            {selected.role ? `${selected.role}` : "Organization profile"}
            {selected.period ? ` · ${selected.period}` : ""}
          </p>

          {selected.positioning && (
            <>
              <p className={styles.sectionLabel}>Positioning</p>
              <ul className={styles.rowList}>
                {selected.positioning.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          )}

          {selected.bullets.length > 0 && (
            <>
              <p className={styles.sectionLabel}>Key points</p>
              <ul className={styles.rowList}>
                {selected.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          )}

          <p className={styles.sectionLabel}>Translation</p>
          <p>{selected.translation}</p>
        </article>
      </section>

      <div className={styles.statusBar}>
        <span>{EXPERIENCE_ITEMS.length} organizations</span>
        <span>Selected: {selected.org}</span>
      </div>
    </div>
  );
}

