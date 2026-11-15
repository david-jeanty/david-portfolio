import PersonalIndex from "@/components/portfolio/PersonalIndex";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/Portfolio.module.css";

export default function AboutPage() {
  return (
    <div className={styles.pageGrid}>
      <div className={styles.labelCell}><p className={styles.label}>About</p></div>
      <div className={`${styles.contentCell} ${styles.aboutIntro}`}>
        <p>{modernPortfolio.introduction}</p>
        <p className={styles.metaLine}>
          {modernPortfolio.identity.citizenship} · Based in {modernPortfolio.identity.location}.
        </p>
      </div>

      <div className={styles.labelCell}><p className={styles.label}>Currently</p></div>
      <div className={styles.contentCell}>
        <ol className={styles.factList}>
          {modernPortfolio.currently.map((item) => (
            <li key={item.title}><span>{item.title} · {item.context}</span></li>
          ))}
        </ol>
      </div>

      <div className={styles.labelCell}><p className={styles.label}>Outside work</p></div>
      <div className={styles.contentCell}>
        <PersonalIndex />
      </div>
    </div>
  );
}
