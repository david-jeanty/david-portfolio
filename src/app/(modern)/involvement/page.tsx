import type { Metadata } from "next";
import styles from "@/components/portfolio/PortfolioCatalog.module.css";
import portfolio from "@/components/portfolio/Portfolio.module.css";
import { modernPortfolio } from "@/data/modern-portfolio";

export const metadata: Metadata = {
  title: "Involvement — David Jeanty",
};

export default function InvolvementPage() {
  return (
    <div className={styles.page}>
      <h1 className={`${portfolio.pageTitle} ${styles.heading}`}>Involvement</h1>

      {modernPortfolio.involvement.map((item) => (
        <section key={item.id} className={styles.involvement} aria-labelledby={item.id}>
          <header>
            <h2 id={item.id}>{item.organization}</h2>
            <p className={styles.meta}>{item.role} · {item.period}</p>
          </header>
          <div className={styles.involvementCopy}>
            <p>{item.description}</p>
            <ul>
              {item.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
