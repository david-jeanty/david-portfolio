"use client";

import { useMemo, useState } from "react";
import styles from "./WindowApps.module.css";
import { SmallFolderIcon } from "@/components/desktop/XPIcons";

type ExperienceNode = {
  id: string;
  org: string;
  role?: string;
  period?: string;
  secondaryRoleLine?: string;
  positioning?: string[];
  bullets: string[];
  translation: string;
};

const EXPERIENCE_ITEMS: ExperienceNode[] = [
  {
    id: "stranexus",
    org: "StraNexus Inc.",
    role: "Strategy & Operations Intern",
    period: "Jan. 2026 - Apr. 2026",
    bullets: [
      "assessed StraNexus's existing recruitment approach, identified structural gaps in program targeting and outreach, and developed a replacement strategy mapped to 16 high-fit academic pipelines across 31 universities",
      "executed stakeholder outreach to faculty contacts and student organizations across 15 Ontario programs, establishing new recruitment channels and building relationships to support the firm's Apprentice Consultant pipeline",
      "delivered a structured campus engagement framework including contact mapping, follow-up protocols, and program prioritization criteria aligned to StraNexus's 4 practice areas and 17 client sectors",
    ],
    translation:
      "strategy, stakeholder outreach, recruitment operations, process design, structured execution",
  },
  {
    id: "aritzia",
    org: "Aritzia",
    role: "Risk Associate",
    period: "Apr. 2024 - Aug. 2025",
    bullets: [
      "built and maintained Excel-based loss tracking models to map transactional data quarter-over-quarter, cross-referencing shrink rates against market trends and accuracy benchmarks to surface systemic vulnerabilities, supporting mitigation actions that reduced shrink by $50K+",
      "tracked daily KPIs across a 1,000+ weekly client environment, flagged anomalies in compliance and asset protection metrics, and recommended process adjustments to operational and floor teams",
      "partnered with managers and a 50+ person team to align on controls execution, translating analytical findings into actionable follow-up and reinforcing consistent outcomes",
    ],
    translation:
      "operational analytics, anomaly detection, risk/compliance thinking, process improvement",
  },
  {
    id: "student-ambassador",
    org: "University of Ottawa",
    role: "Student Ambassador",
    period: "Sep. 2023 - Apr. 2024",
    bullets: [
      "delivered 75+ campus tours and engaged 2,500+ prospective students, translating complex programs and processes into clear, persuasive guidance",
      "responded to 2,000+ student inquiries via uOttawa's CRM platform by gathering context, providing accurate information, and documenting next steps for follow-through",
    ],
    translation:
      "stakeholder communication, CRM workflow, information triage, clear client-facing guidance",
  },
  {
    id: "tbta",
    org: "Telfer Business Technology Association",
    role: "Vice President, Internal Affairs",
    period: "Apr. 2024 - Apr. 2025",
    secondaryRoleLine: "First Year Representative · Sep. 2023 - Apr. 2024",
    bullets: [
      "managed 100+ student inquiries and served as liaison between MIS professors, Telfer administration, and the Career Centre to align stakeholders and resolve issues quickly",
      "hired and onboarded 20 members by coordinating internal operations, role assignments, and execution follow-up",
      "planned and delivered 10+ events/year by coordinating venues, vendors, and logistics while aligning communications and budgets",
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
          {selected.role || selected.period ? (
            <>
              <p className={styles.metaLine}>
                {selected.role ?? ""}
                {selected.period ? `${selected.role ? " · " : ""}${selected.period}` : ""}
              </p>
              {selected.secondaryRoleLine ? (
                <p className={styles.metaLine}>{selected.secondaryRoleLine}</p>
              ) : null}
            </>
          ) : null}

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
