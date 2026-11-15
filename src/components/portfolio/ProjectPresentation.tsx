import Image from "next/image";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "./Portfolio.module.css";

export default function ProjectPresentation() {
  const project = modernPortfolio.work;
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectPresentation}>
      <Image
        src={project.homepageImage}
        alt="Interndex public homepage"
        fill
        sizes="(max-width: 800px) 92vw, 58vw"
        className={styles.projectPrimaryImage}
        priority
      />
      <span className={styles.projectInset} aria-hidden="true">
        <Image
          src={project.demoImage}
          alt=""
          fill
          sizes="(max-width: 800px) 34vw, 19vw"
          className={styles.projectInsetImage}
        />
      </span>
      <span className={styles.projectView}>Open Interndex ↗</span>
    </a>
  );
}
