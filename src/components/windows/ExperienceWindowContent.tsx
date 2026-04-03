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
  summary: string;
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
    summary:
      "Built and managed the workflow side of StraNexus's outreach effort, keeping contact data, follow-up, and reporting organized across 31 universities and 15 Ontario programs.",
    bullets: [
      "Mapped faculty and program stakeholders to support more targeted outreach and cleaner sequencing.",
      "Built reporting that clarified pipeline gaps, priorities, and next steps across 4 practice areas and 17 client sectors.",
    ],
    translation:
      "strategy, stakeholder outreach, recruitment operations, process design, structured execution",
  },
  {
    id: "aritzia",
    org: "Aritzia",
    role: "Risk Associate",
    period: "Apr. 2024 - Aug. 2025",
    summary:
      "Worked in a high-volume retail environment where I tracked KPIs, reviewed trends, and followed up on operational issues before they became bigger problems.",
    bullets: [
      "Used Excel-based reporting tools to compare results against benchmarks, surface anomalies, and support faster action.",
      "Contributed to a $50K+ reduction in shrink while supporting consistency across a 1,000+ weekly-client operation and a 50+ person team.",
    ],
    translation:
      "operational analytics, anomaly detection, risk/compliance thinking, process improvement",
  },
  {
    id: "student-ambassador",
    org: "University of Ottawa",
    role: "Student Ambassador",
    period: "Sep. 2023 - Apr. 2024",
    summary:
      "Served as a front-line point of contact for uOttawa, helping prospective students and families make sense of programs, services, and next steps.",
    bullets: [
      "Delivered 75+ information sessions and managed high-volume follow-up through the university's CRM with organized, accurate communication.",
      "Worked in a role where clarity, responsiveness, and keeping details from slipping through the cracks mattered every day.",
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
    summary:
      "Helped run the internal side of a 100+ member student association, supporting communication, coordination, and follow-through across the team.",
    bullets: [
      "Worked with professors, administration, and the Career Centre while helping keep internal processes organized.",
      "Supported the delivery of 10+ events annually through planning, logistics, and execution follow-up.",
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

          <p style={{ margin: "4px 0 10px", lineHeight: 1.4 }}>
            <span style={{ fontWeight: 600 }}>{selected.summary}</span>
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
              <p className={styles.sectionLabel}>Selected examples</p>
              <ul className={styles.rowList}>
                {selected.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          )}

          <p className={styles.sectionLabel}>What this involved</p>
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
