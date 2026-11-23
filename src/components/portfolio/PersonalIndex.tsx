"use client";

import { useState } from "react";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "./Portfolio.module.css";

export default function PersonalIndex() {
  const [selectedId, setSelectedId] = useState(modernPortfolio.personal[0].id);
  const selected = modernPortfolio.personal.find((item) => item.id === selectedId) ?? modernPortfolio.personal[0];

  return (
    <section className={styles.personalIndex} aria-label="Outside work index">
      <div className={styles.personalTabs} role="group" aria-label="Choose an interest">
        {modernPortfolio.personal.map((item) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              className={active ? styles.personalTabActive : ""}
              onClick={() => setSelectedId(item.id)}
              aria-pressed={active}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className={styles.personalPanel} aria-live="polite">
        <div className={styles.personalPanelInner}>
          <div className={styles.personalSource}>
            <span>{selected.source}</span>
            <span>{selected.status}</span>
          </div>
          <p>{selected.note}</p>
          {selected.href && (
            <a href={selected.href} target="_blank" rel="noopener noreferrer">Open source ↗</a>
          )}
        </div>
      </div>
    </section>
  );
}
