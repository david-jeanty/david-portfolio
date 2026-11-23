import ProjectPresentation from "@/components/portfolio/ProjectPresentation";
import ToolStack from "@/components/portfolio/ToolStack";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/Portfolio.module.css";

export default function InterndexPage() {
  const project = modernPortfolio.work;

  return (
    <div className={styles.workGrid}>
      <div className={styles.workIntro}><p className={styles.label}>Independent project</p></div>
      <div className={styles.workIntro}>
        <h1 className={styles.pageTitle}>{project.name}</h1>
        <p className={styles.workDescription}>{project.description}</p>
        <p className={styles.workMeta}>{project.role} · {project.period}</p>
        <div className={styles.workStack}><ToolStack tools={project.tools} label="Interndex stack" /></div>
        <div className={styles.functionLinks}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">Open Interndex</a>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Explore the demo</a>
        </div>
      </div>

      <div className={styles.workMediaLabel}><p className={styles.label}>Product</p></div>
      <div className={styles.workMedia}><ProjectPresentation /></div>

      <div><p className={styles.label}>Case study</p></div>
      <div className={styles.workDetails}>
        {project.caseStudy.map(({ title, description }) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
