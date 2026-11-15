"use client";

import { useEffect, useState } from "react";
import styles from "./Portfolio.module.css";

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  hour: "numeric",
  minute: "2-digit",
});

export default function OttawaClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    const initialFrame = window.requestAnimationFrame(update);
    const interval = window.setInterval(update, 30_000);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <time className={styles.ottawaClock} suppressHydrationWarning>
      Ottawa{time ? ` · ${time}` : ""}
    </time>
  );
}
