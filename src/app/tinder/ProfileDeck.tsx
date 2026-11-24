import Image from "next/image";
import portfolio from "@/components/portfolio/Portfolio.module.css";
import styles from "./tinder.module.css";

const icons = {
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM12 10h.01",
  school: "m2 9 10-5 10 5-10 5-10-5Zm5 3v5c3 3 7 3 10 0v-5M22 9v6",
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
  return (
    <header className={styles.hero} id="swipe">
      <div className={styles.deck}>
        <div className={styles.slide}>
          <div className={styles.photo}>
            <Image
              src="/tinder-profile-photo.webp"
              alt="David and two others wearing mouse-ear headbands and smiling for a selfie"
              fill
              sizes="(min-width: 580px) 420px, 100vw"
              preload
            />
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.identity}>
              <div className={styles.likesYou}><Icon name="likesYou" /> Likes You <Icon name="chevron" /></div>
              <h1 id="profile-name" className={portfolio.pageTitle}>{name}</h1>
              <p><Icon name="pin" /> Ottawa · Looking for Tinder TPM in Los Angeles</p>
              <p><Icon name="school" /> Business Technology Management · uOttawa</p>
            </div>
            <div className={styles.deckActions} aria-hidden="true">
              <span className={styles.rewind}><Icon name="rewind" /></span>
              <span className={styles.pass}><Icon name="pass" /></span>
              <span className={styles.superLike}><Icon name="star" /></span>
              <span className={styles.like}>
                <svg viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="profile-like" x1="0%" y1="0%" x2="85%" y2="90%">
                      <stop stopColor="#d0eb54" />
                      <stop offset="1" stopColor="#35c969" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#profile-like)" d={icons.heart} />
                </svg>
              </span>
              <span className={styles.send}><Icon name="send" /></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
