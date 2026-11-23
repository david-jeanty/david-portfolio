"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modernPortfolio, type ExperienceRecord } from "@/data/modern-portfolio";
import styles from "./Portfolio.module.css";

function RoleDetail({ role }: { role: ExperienceRecord }) {
  return (
    <>
      <p className={styles.detailLead}>{role.summary}</p>
      <ul className={styles.detailList}>
        {role.details.map((detail) => <li key={detail}>{detail}</li>)}
      </ul>
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
      <aside className={styles.experienceDetail} aria-live="polite">
        <p className={styles.label}>Selected role</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <p className={styles.detailCompany}>{selected.company}</p>
            <p className={styles.detailRole}>{selected.role}</p>
            <p className={styles.detailPeriod}>{selected.period}</p>
            <RoleDetail role={selected} />
          </motion.div>
        </AnimatePresence>
      </aside>

      <section className={styles.experienceIndex} aria-label="Experience index">
        <h1>Experience</h1>
        <ol>
          {modernPortfolio.experience.map((item, index) => {
            const selectedRow = item.id === selected.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={selectedRow ? styles.experienceRowActive : ""}
                  onMouseEnter={() => setSelectedId(item.id)}
                  onFocus={() => setSelectedId(item.id)}
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={selectedRow}
                >
                  <span className={styles.experienceNumber}>{String(index + 1).padStart(2, "0")}</span>
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
