"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "./Portfolio.module.css";

export default function CurrentSignal() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % modernPortfolio.currently.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [paused, reduceMotion]);

  return (
    <div
      className={styles.currentSignal}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.currentSignalViewport} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {modernPortfolio.currently[activeIndex].statement}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className={styles.currentSignalControls} role="group" aria-label="Choose an introduction">
        {modernPortfolio.currently.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.title}
              type="button"
              className={active ? styles.currentSignalActive : ""}
              onClick={() => setActiveIndex(index)}
              aria-pressed={active}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.shortLabel}</strong>
              <small>{item.title}</small>
              {active ? <motion.i layoutId="current-signal-marker" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
