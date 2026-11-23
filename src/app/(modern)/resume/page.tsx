import Image from "next/image";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "@/components/portfolio/Portfolio.module.css";

export default function ResumePage() {
  const resume = modernPortfolio.resume;

  return (
    <div className={styles.resumeSheet}>
      <div className={styles.resumeIntro}><p className={styles.label}>Résumé</p></div>
      <div className={styles.resumeIntro}>
        <h1>{modernPortfolio.identity.name}</h1>
        <p>{modernPortfolio.identity.program}</p>
        <p className={styles.metaLine}>
          {modernPortfolio.identity.location} · Updated {resume.updated}
        </p>
      </div>

      <div><p className={styles.label}>File</p></div>
      <div className={styles.resumeActions}>
        <a href={resume.file} target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
        <a href={resume.file} download>Download PDF ↓</a>
      </div>

      <div className={styles.resumePreviewLabel}><p className={styles.label}>Preview</p></div>
      <div className={styles.resumePreview}>
        <Image
          className={styles.resumeImage}
          src={resume.preview}
          alt="Preview of David Jeanty’s résumé"
          fill
          sizes="(max-width: 900px) 70vw, 54vw"
          priority
        />
      </div>
    </div>
  );
}
