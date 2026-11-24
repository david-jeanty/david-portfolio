import Image from "next/image";
import { useId } from "react";
import styles from "./tinder.module.css";

const icons = {
  likesYou: "M14.5 19S7.8 14.8 7.8 10.5a3.8 3.8 0 0 1 6.7-2.2 3.8 3.8 0 0 1 6.7 2.2c0 4.3-6.7 8.5-6.7 8.5ZM3 8h5M2 11h5m-4 3h6m-4 3h6",
  chevron: "m9 5 7 7-7 7",
  rewind: "M11 5a7.7 7.7 0 1 1-6.6 11.6M11 1.8 6.1 5.3 11 8.2Z",
  pass: "m6 6 12 12M18 6 6 18",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
  heart: "M12 21S3 15 3 9.3a4.7 4.7 0 0 1 9-2 4.7 4.7 0 0 1 9 2C21 15 12 21 12 21Z",
  send: "M21.3 3.1 3.2 9.8c-1.1.4-1.1 1.8.1 2.1l5 1.3 8.9-6.2-7 8.1 2.6 5.4c.5 1 1.8.8 2.2-.2l7.3-15.8c.4-.8-.3-1.7-1-1.4Z",
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

export default function ProfileDeck({ name }: { name: string }) {
  const heartGradient = useId();

  return (
    <div className={styles.deck}>
      <div className={styles.slide}>
        <div className={styles.photo}>
          <Image
            src="/tinder-profile-photo.webp"
            alt="David and two others wearing mouse-ear headbands and smiling for a selfie"
            fill
            sizes="(min-width: 900px) 202px, (min-width: 560px) 210px, 44vw"
          />
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.identity}>
            <div className={styles.likesYou}><Icon name="likesYou" /> Likes You <Icon name="chevron" /></div>
            <p className={styles.cardName}>
              {name}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polygon
                  points="12,1.3 14.4,3.2 17.3,2.7 18.4,5.6 21.3,6.7 20.8,9.6 22.7,12 20.8,14.4 21.3,17.3 18.4,18.4 17.3,21.3 14.4,20.8 12,22.7 9.6,20.8 6.7,21.3 5.6,18.4 2.7,17.3 3.2,14.4 1.3,12 3.2,9.6 2.7,6.7 5.6,5.6 6.7,2.7 9.6,3.2"
                  fill="#108df0"
                  stroke="#a5e6ff"
                  strokeLinejoin="round"
                />
                <path d="m7.7 12.2 2.8 2.8 5.8-5.8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>
          <div className={styles.deckActions} aria-hidden="true">
            <span className={styles.rewind}><Icon name="rewind" /></span>
            <span className={styles.pass}><Icon name="pass" /></span>
            <span className={styles.superLike}><Icon name="star" /></span>
            <span className={styles.like}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                  <linearGradient id={heartGradient} x1="0%" y1="0%" x2="85%" y2="90%">
                    <stop stopColor="#d0eb54" />
                    <stop offset="1" stopColor="#35c969" />
                  </linearGradient>
                </defs>
                <path fill={`url(#${heartGradient})`} d={icons.heart} />
              </svg>
            </span>
            <span className={styles.send}><Icon name="send" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
