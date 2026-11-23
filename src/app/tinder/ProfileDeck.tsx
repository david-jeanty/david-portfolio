"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import portfolio from "@/components/portfolio/Portfolio.module.css";
import styles from "./tinder.module.css";

const slides = [
  { label: "For you", image: "/about-photo.webp", alt: "David and two others wearing mouse-ear headbands and smiling for a selfie" },
  { label: "Brief Writer", image: "/brief-writer-slack.webp", alt: "Brief Writer’s decision brief in Slack" },
  { label: "Interndex", image: "/interndex-demo.png", alt: "Interndex’s internship tracking dashboard" },
] as const;

const icons = {
  menu: "M3 7h18M3 17h18M8 4v6m8 4v6",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM12 10h.01",
  school: "m2 9 10-5 10 5-10 5-10-5Zm5 3v5c3 3 7 3 10 0v-5M22 9v6",
  up: "m7 11 5-5 5 5m-5-5v12",
  rewind: "M4 11a8 8 0 1 1 2 7m-2-7V5m0 6h6",
  pass: "m5 5 14 14M19 5 5 19",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
  heart: "M12 21S3 15 3 9.3a4.7 4.7 0 0 1 9-2 4.7 4.7 0 0 1 9 2C21 15 12 21 12 21Z",
  send: "m21 3-5.6 18-4.1-8.3L3 8.6 21 3Zm0 0-9.7 9.7",
  cards: "M8 3h11v16H8zM4 7v14h11",
  work: "M3 7h18v13H3zM8 7V4h8v3M3 12h18",
  home: "m3 11 9-8 9 8m-3-2v11H6V9",
  contact: "M3 5h18v12H9l-5 4v-4H3z",
  user: "M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-4 14c0-4 3.6-7 8-7s8 3 8 7H4Z",
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

export default function ProfileDeck({ name, linkedin, email }: { name: string; linkedin: string; email: string }) {
  const [active, setActive] = useState(0);
  const swipeStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const slide = slides[active];

  function move(step: number) {
    setActive((current) => (current + step + slides.length) % slides.length);
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    swipeStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = swipeStart.current;
    if (start?.id !== event.pointerId) return;
    swipeStart.current = null;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) >= 45 && Math.abs(distanceX) > Math.abs(distanceY)) {
      move(distanceX < 0 ? 1 : -1);
    } else if (Math.hypot(distanceX, distanceY) < 8) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      move(event.clientX < left + width / 2 ? -1 : 1);
    }
  }

  function handleArrowKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  }

  return (
    <header className={styles.hero} id="swipe">
      <div className={styles.deck} onKeyDown={handleArrowKey}>
        <div className={styles.slide}>
          <div
            className={styles.swipeArea}
            onPointerDown={startSwipe}
            onPointerUp={finishSwipe}
            onLostPointerCapture={() => { swipeStart.current = null; }}
          >
            {active === 0 && (
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="(min-width: 580px) 440px, 100vw"
                className={styles.photoBackdrop}
                draggable={false}
              />
            )}
            <div className={active === 0 ? styles.photo : styles.projectSlide}>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(min-width: 580px) 440px, 100vw"
                preload={active === 0}
                draggable={false}
              />
            </div>
          </div>

          <div className={styles.cardTop}>
            <div className={styles.topNav}>
              <details className={styles.menu}>
                <summary aria-label="Portfolio menu"><Icon name="menu" /></summary>
                <div className={styles.menuLinks}>
                  <Link href="/experience">Experience</Link>
                  <Link href="/involvement">Involvement</Link>
                </div>
              </details>
              <div className={styles.galleryControls} role="group" aria-label="Profile slides">
                {slides.map(({ label }, index) => (
                  <button key={label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
                    {label}
                  </button>
                ))}
              </div>
              <Link href="/resume">Résumé</Link>
            </div>
            <div className={styles.progress} aria-hidden="true">
              {slides.map(({ label }, index) => <span key={label} data-active={index === active} />)}
            </div>
            <p className={styles.srOnly} aria-live="polite">{slide.label}, slide {active + 1} of {slides.length}</p>
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.identity}>
              <div className={styles.nameRow}>
                <h1 id="profile-name" className={portfolio.pageTitle}>{name}</h1>
                <a className={styles.openProfile} href="#why-me" aria-label="Read the full profile" title="Read the full profile">
                  <Icon name="up" />
                </a>
              </div>
              <p><Icon name="pin" /> Ottawa · Looking for Tinder TPM in Los Angeles</p>
              <p><Icon name="school" /> Business Technology Management · uOttawa</p>
            </div>
            <div className={styles.deckActions} role="group" aria-label="Profile actions">
              <button type="button" aria-label="Previous slide" title="Previous slide" onClick={() => move(-1)}><Icon name="rewind" /></button>
              <button type="button" aria-label="Next slide" title="Next slide" onClick={() => move(1)}><Icon name="pass" /></button>
              <a className={styles.superLike} href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Super Like · Connect on LinkedIn" title="Super Like · Connect on LinkedIn">
                <Icon name="star" />
              </a>
              <a className={styles.projectAction} href="#built" aria-label="See the project" title="See the project"><Icon name="heart" /></a>
              <a className={styles.sendAction} href={`mailto:${email}`} aria-label="Email David" title="Email David"><Icon name="send" /></a>
            </div>
          </div>
        </div>

        <nav className={styles.deckNav} aria-label="Portfolio shortcuts">
          <a href="#swipe" aria-current="location"><Icon name="cards" />Swipe</a>
          <Link href="/work"><Icon name="work" />Work</Link>
          <Link href="/"><Icon name="home" />Home</Link>
          <a href="#interview"><Icon name="contact" />Contact</a>
          <Link href="/about"><Icon name="user" />About</Link>
        </nav>
      </div>
    </header>
  );
}
