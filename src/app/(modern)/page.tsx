import CurrentSignal from "@/components/portfolio/CurrentSignal";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/Portfolio.module.css";

export default function HomePage() {
  return (
    <div className={styles.homeStage}>
      <div className={styles.homeIntroduction}>
        <p className={styles.homeHello}>Hey, I’m David.</p>
        <CurrentSignal />
        <p className={styles.homeIdentity}>
          {modernPortfolio.identity.program} at {modernPortfolio.identity.school}<br />
          {modernPortfolio.identity.location} · {modernPortfolio.identity.citizenship}
        </p>
      </div>
    </div>
  );
}
