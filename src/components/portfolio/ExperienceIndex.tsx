"use client";

import { useState } from "react";
import { modernPortfolio, type ExperienceRecord } from "@/data/modern-portfolio";
import ToolStack from "./ToolStack";
import styles from "./Portfolio.module.css";

function RoleDetail({ role }: { role: ExperienceRecord }) {
  return (
    <>
      <ul className={styles.detailList}>
        {role.details.map((detail) => <li key={detail}>{detail}</li>)}
      </ul>
      {role.tools && role.tools.length > 0 && (
        <div className={styles.roleTools}>
          <p className={styles.label}>Tools used</p>
          <ToolStack tools={role.tools} label={`Tools at ${role.company}`} />
        </div>
      )}
    </>
  );
}

export default function ExperienceIndex() {
  const [selectedId, setSelectedId] = useState("irb");
  const selected =
    modernPortfolio.experience.find((item) => item.id === selectedId) ??
    modernPortfolio.experience[0];

  return (
    <div className={styles.experienceComposition}>
      <h1 className={styles.pageTitle}>Experience</h1>
      <aside className={styles.experienceDetail} aria-live="polite">
        <h2 className={styles.detailCompany}>{selected.company}</h2>
        <p className={styles.detailRole}>{selected.role}</p>
        <p className={styles.detailPeriod}>{selected.period}</p>
        <RoleDetail role={selected} />
      </aside>

      <section className={styles.experienceIndex} aria-label="Experience index">
        <ol>
          {modernPortfolio.experience.map((item) => {
            const selectedRow = item.id === selected.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={selectedRow ? styles.experienceRowActive : ""}
                  onMouseEnter={() => {
                    if (window.matchMedia("(width > 620px) and (hover: hover)").matches) {
                      setSelectedId(item.id);
                    }
                  }}
                  onFocus={() => setSelectedId(item.id)}
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={selectedRow}
                >
                  <span className={styles.experienceTitle}>
                    <strong>{item.company}</strong>
                    <small>{item.role}</small>
                  </span>
                  <span className={styles.experiencePeriod}>{item.period}</span>
                </button>
                {selectedRow && (
                  <div className={styles.mobileRoleDetail} aria-live="polite">
                    <RoleDetail role={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
