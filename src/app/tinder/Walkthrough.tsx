"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import type { WalkthroughStep } from "./walkthrough-steps";
import styles from "./walkthrough.module.css";

// The viewer opens on the brief, the screenshot that shows the product best.
const START = 3;
// Tallest the screenshot may be on desktop, so the section fits on one screen.
const STAGE_HEIGHT = 440;

function pinStyle(step: WalkthroughStep, box: number[]): CSSProperties {
  const [left, top, width, height] = box;
  return {
    left: `${(left / step.width) * 100}%`,
    top: `${(top / step.height) * 100}%`,
    width: `${(width / step.width) * 100}%`,
    height: `${(height / step.height) * 100}%`,
  };
}

function Shot({ step, onOpen, capHeight, eager = false }: { step: WalkthroughStep; onOpen: (button: HTMLButtonElement) => void; capHeight?: number; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  // Captures are 2x retina, so half the native width is their 1:1 size on screen.
  const natural = step.width / 2;
  const maxWidth = capHeight ? Math.min(natural, (capHeight * step.width) / step.height) : natural;

  return (
    <button
      type="button"
      className={styles.shot}
      style={{ maxWidth }}
      onClick={(event) => onOpen(event.currentTarget)}
      aria-label={`Open full size: ${step.alt}`}
    >
      <Image
        src={step.src}
        alt={step.alt}
        width={step.width}
        height={step.height}
        sizes={`(min-width: 900px) min(${Math.round(maxWidth)}px, 760px), min(${natural}px, calc(100vw - 72px))`}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
      />
      {loaded && step.pins.map((pin, index) => (
        <span key={pin.label} className={styles.pin} style={pinStyle(step, pin.box)} aria-hidden="true">
          <span className={styles.pinNumber}>{index + 1}</span>
        </span>
      ))}
    </button>
  );
}

function Callouts({ step }: { step: WalkthroughStep }) {
  return (
    <ol className={styles.callouts} aria-label="Labels on the screenshot">
      {step.pins.map((pin, index) => (
        <li key={pin.label}>
          <span className={styles.calloutNumber} aria-hidden="true">{index + 1}</span>
          {pin.label}
        </li>
      ))}
    </ol>
  );
}

export default function Walkthrough({ steps }: { steps: WalkthroughStep[] }) {
  const [active, setActive] = useState(START);
  const [open, setOpen] = useState<WalkthroughStep | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [desktop, setDesktop] = useState(false);

  // On desktop, load every screenshot up front so switching steps is instant.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  function select(index: number, focus = false) {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    if (focus) stepButtons.current[next]?.focus();
    // On phones the list is an accordion, so keep the opened step in view.
    if (window.matchMedia("(max-width: 899px)").matches) {
      requestAnimationFrame(() => stepButtons.current[next]?.scrollIntoView({ block: "start", behavior: "smooth" }));
    }
  }

  function onListKey(event: KeyboardEvent<HTMLOListElement>) {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key in moves) {
      event.preventDefault();
      select(active + moves[event.key], true);
    }
  }

  function openFull(target: WalkthroughStep, button: HTMLButtonElement) {
    trigger.current = button;
    setOpen(target);
    dialog.current?.showModal();
  }

  return (
    <>
      <div className={styles.viewer}>
        <ol className={styles.stepList} onKeyDown={onListKey}>
          {steps.map((item, index) => {
            const current = index === active;
            return (
              <li key={item.id} className={styles.stepItem} data-active={current || undefined}>
                <button
                  type="button"
                  ref={(element) => { stepButtons.current[index] = element; }}
                  className={styles.stepButton}
                  aria-expanded={current}
                  aria-controls={`step-detail-${item.id}`}
                  onClick={() => select(index)}
                >
                  <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                  <span>{item.short}</span>
                </button>
                {current && (
                  <div className={styles.stepDetail} id={`step-detail-${item.id}`}>
                    <p className={styles.caption}>{item.caption}</p>
                    <div className={`${styles.card} ${styles.mobileOnly}`}>
                      <Shot step={item} onOpen={(button) => openFull(item, button)} />
                    </div>
                    <Callouts step={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className={`${styles.stage} ${styles.desktopOnly}`}>
          <div className={styles.stageCard} style={{ minHeight: STAGE_HEIGHT + 44 }}>
            {steps.map((item, index) => (desktop || index === active) && (
              <div key={item.id} className={styles.stageShot} hidden={index !== active}>
                <Shot step={item} capHeight={STAGE_HEIGHT} eager={desktop} onOpen={(button) => openFull(item, button)} />
              </div>
            ))}
          </div>
          <div className={styles.controls}>
            <button type="button" onClick={() => select(active - 1)} aria-label="Previous step">← Back</button>
            <span aria-live="polite">Step {active + 1} of {steps.length}</span>
            <button type="button" onClick={() => select(active + 1)} aria-label="Next step">Next →</button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label={open ? `${open.short}, full size` : "Screenshot, full size"}
        onClose={() => {
          setOpen(null);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} autoFocus>
          Close
        </button>
        {open && (
          // Full-size view shows the file as is, at its 1:1 retina size.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={open.src} alt={open.alt} width={open.width / 2} height={open.height / 2} className={styles.full} />
        )}
      </dialog>
    </>
  );
}
