"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "./Portfolio.module.css";

export default function PersonalIndex() {
  const [selectedId, setSelectedId] = useState(modernPortfolio.personal[0].id);
  const selected = modernPortfolio.personal.find((item) => item.id === selectedId) ?? modernPortfolio.personal[0];

  return (
    <section className={styles.personalIndex} aria-label="Outside work index">
      <div className={styles.personalTabs} role="group" aria-label="Choose an interest">
        {modernPortfolio.personal.map((item, index) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              className={active ? styles.personalTabActive : ""}
              onClick={() => setSelectedId(item.id)}
              aria-pressed={active}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
              {active ? <motion.i layoutId="personal-index-rule" /> : null}
            </button>
          );
        })}
      </div>

      <div className={styles.personalPanel} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            className={styles.personalPanelInner}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -7 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.personalSource}>
              <span>{selected.source}</span>
              <span>{selected.status}</span>
            </div>
            <p>{selected.note}</p>
            {selected.href ? (
              <a href={selected.href} target="_blank" rel="noopener noreferrer">Open source ↗</a>
            ) : (
              <span className={styles.personalPending}>Source ready to connect</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
