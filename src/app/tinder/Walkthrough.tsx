"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { WalkthroughStep } from "./walkthrough-steps";
import styles from "./walkthrough.module.css";

function pinStyle(step: WalkthroughStep, box: number[]): CSSProperties {
  const [left, top, width, height] = box;
  return {
    left: `${(left / step.width) * 100}%`,
    top: `${(top / step.height) * 100}%`,
    width: `${(width / step.width) * 100}%`,
    height: `${(height / step.height) * 100}%`,
  };
}

function Step({ step, index, onOpen }: { step: WalkthroughStep; index: number; onOpen: (step: WalkthroughStep, trigger: HTMLButtonElement) => void }) {
  const [active, setActive] = useState<number | null>(null);
  const headingId = `walkthrough-${step.id}`;
  // Captures are 2x retina, so half the native width is their 1:1 size on screen.
  const maxWidth = step.width / 2;

  return (
    <li className={styles.step} aria-labelledby={headingId}>
      <div className={styles.text}>
        <p className={styles.number}>Step {index + 1}</p>
        <h3 id={headingId}>{step.title}</h3>
        <p className={styles.caption}>{step.caption}</p>
      </div>

      <div className={styles.media}>
        <div className={styles.card}>
          <button
            type="button"
            className={styles.shot}
            style={{ maxWidth }}
            onClick={(event) => onOpen(step, event.currentTarget)}
            aria-label={`Open full size: ${step.alt}`}
          >
            <Image
              src={step.src}
              alt={step.alt}
              width={step.width}
              height={step.height}
              sizes={`(min-width: 900px) min(${maxWidth}px, 800px), min(${maxWidth}px, calc(100vw - 72px))`}
              loading="lazy"
            />
            {step.pins.map((pin, pinIndex) => (
              <span
                key={pin.label}
                className={styles.pin}
                style={pinStyle(step, pin.box)}
                data-active={active === pinIndex || undefined}
                aria-hidden="true"
              >
                <span className={styles.pinNumber}>{pinIndex + 1}</span>
              </span>
            ))}
          </button>
        </div>
      </div>

      <ol className={styles.callouts} aria-label={`Labels on the ${step.title.toLowerCase()} screenshot`}>
        {step.pins.map((pin, pinIndex) => (
          <li
            key={pin.label}
            onMouseEnter={() => setActive(pinIndex)}
            onMouseLeave={() => setActive(null)}
          >
            <span className={styles.calloutNumber} aria-hidden="true">{pinIndex + 1}</span>
            {pin.label}
          </li>
        ))}
      </ol>
    </li>
  );
}

export default function Walkthrough({ steps }: { steps: WalkthroughStep[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<WalkthroughStep | null>(null);

  function show(step: WalkthroughStep, button: HTMLButtonElement) {
    trigger.current = button;
    setOpen(step);
    dialog.current?.showModal();
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <Step key={step.id} step={step} index={index} onOpen={show} />
        ))}
      </ol>

      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label={open ? `${open.title}, full size` : "Screenshot, full size"}
        onClose={() => {
          setOpen(null);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <button type="button" className={styles.close} onClick={close} autoFocus>
          Close
        </button>
        {open && (
          // Full-size view shows the native file as is, at its 1:1 retina size.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={open.src}
            alt={open.alt}
            width={open.width / 2}
            height={open.height / 2}
            className={styles.full}
          />
        )}
      </dialog>
    </>
  );
}
