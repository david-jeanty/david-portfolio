import type { Metadata } from "next";
import Image from "next/image";
import PersonalIndex from "@/components/portfolio/PersonalIndex";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/Portfolio.module.css";
import catalog from "@/components/portfolio/PortfolioCatalog.module.css";

export const metadata: Metadata = {
  title: "About — David Jeanty",
};

export default function AboutPage() {
  return (
    <div className={catalog.page}>
      <div className={styles.aboutProfile}>
        <div className={styles.aboutIntro}>
          <h1 className={styles.pageTitle}>About</h1>
          <p>{modernPortfolio.introduction}</p>
          <p className={styles.metaLine}>
            {modernPortfolio.identity.citizenship} · Based in {modernPortfolio.identity.location}.
          </p>
        </div>
        <Image
          className={styles.aboutPhoto}
          src="/about-photo.webp"
          alt="Three people wearing mouse-ear headbands smiling for a selfie"
          width={1400}
          height={1400}
          sizes="(max-width: 620px) 88vw, 320px"
        />
      </div>

      <section className={styles.aboutRow} aria-labelledby="currently">
        <h2 id="currently" className={styles.label}>Currently</h2>
        <ul className={styles.factList}>
          {modernPortfolio.currently.map((item) => (
            <li key={item.title}><span>{item.title} · {item.context}</span></li>
          ))}
        </ul>
      </section>

      <section className={styles.aboutRow} aria-labelledby="outside-work">
        <h2 id="outside-work" className={styles.label}>Outside work</h2>
        <PersonalIndex />
      </section>
    </div>
  );
}
