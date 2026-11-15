import ProjectPresentation from "@/components/portfolio/ProjectPresentation";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/Portfolio.module.css";

export default function InterndexPage() {
  const project = modernPortfolio.work;

  return (
    <div className={styles.workGrid}>
      <div className={styles.workIntro}><p className={styles.label}>Independent project</p></div>
      <div className={styles.workIntro}>
        <h1>{project.name}</h1>
        <p className={styles.workDescription}>{project.description}</p>
        <p className={styles.workMeta}>{project.status}</p>
      </div>

      <div className={styles.workMediaLabel}><p className={styles.label}>Homepage + product</p></div>
      <div className={styles.workMedia}><ProjectPresentation /></div>

      <div className={styles.workFooter}><p className={styles.label}>Details</p></div>
      <div className={styles.workFooter}>
        <div className={styles.functionLinks}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">Open Interndex ↗</a>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Explore the demo ↗</a>
        </div>
        <p className={styles.toolLine}>{project.tools.join("   ")}</p>
      </div>
    </div>
  );
}
