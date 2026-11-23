import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/HomePage.module.css";

export const metadata: Metadata = {
  description: "David Jeanty studies Business Technology Management at the University of Ottawa and builds Interndex, a job-search workspace.",
};

export default function HomePage() {
  const { identity, work } = modernPortfolio;

  return (
    <div className={styles.homeStage}>
      <h1 className="sr-only">{identity.name}</h1>

      <section className={styles.row} aria-labelledby="summary-title">
        <h2 id="summary-title">Summary</h2>
        <div className={styles.summary}>
          <p>
            I’m a {identity.program} student at uOttawa and a dual U.S.–Canadian citizen.
            {" "}I love building cool things.
          </p>
          <Link href="/about">Learn more</Link>
        </div>
      </section>

      <section className={styles.row} aria-labelledby="featured-title">
        <h2 id="featured-title">Featured work</h2>
        <Link href="/interndex" className={styles.screenshotLink} aria-label="Explore Interndex">
          <Image
            className={styles.screenshot}
            src={work.demoImage}
            alt="Interndex dashboard showing sample applications, upcoming deadlines, and saved opportunities"
            width={1440}
            height={980}
            sizes="(max-width: 620px) 90vw, 50vw"
            loading="eager"
          />
        </Link>
      </section>
    </div>
  );
}
