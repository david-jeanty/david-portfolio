"use client";

import { useRef, useState } from "react";
import styles from "./tinder.module.css";

const poster = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cpath fill='%231b1817' d='M0 0h16v9H0z'/%3E%3C/svg%3E";

export default function BuildVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

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
        aria-labelledby="video-heading"
        onPlay={() => setShowPlayButton(false)}
      />
      {showPlayButton && (
        <button
          className={styles.playButton}
          type="button"
          aria-label="Play the build"
          onClick={() => {
            video.current?.play().catch(() => setShowPlayButton(false));
            video.current?.focus();
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path fill="currentColor" d="m8 4 13 8-13 8Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
