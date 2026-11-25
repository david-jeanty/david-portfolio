"use client";

import { useRef, useState } from "react";
import styles from "./tinder.module.css";

const poster = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cpath fill='%231b1817' d='M0 0h16v9H0z'/%3E%3C/svg%3E";

export default function BuildVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"ready" | "watching" | "ended">("ready");

  function play() {
    video.current?.play().catch(() => setPhase("watching"));
    video.current?.focus();
  }

  return (
    <div className={styles.player}>
      <video
        ref={video}
        className={styles.video}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label="Watch the build"
        onPlay={() => setPhase("watching")}
        onEnded={() => setPhase("ended")}
        onSeeking={() => setPhase((current) => current === "ended" ? "watching" : current)}
      />
      {phase === "ready" && (
        <div className={styles.playerOverlay}>
          <button className={styles.playButton} type="button" onClick={play}>
            <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
              <path fill="currentColor" d="m8 4 13 8-13 8Z" />
            </svg>
            Watch the build
          </button>
          <p className={styles.videoNote}>About 90 seconds</p>
        </div>
      )}
      {phase === "ended" && (
        <div className={`${styles.playerOverlay} ${styles.endScreen}`}>
          <p>So, what do you think?</p>
          <a className={styles.playButton} href="#interview">Is it a match?</a>
        </div>
      )}
    </div>
  );
}
