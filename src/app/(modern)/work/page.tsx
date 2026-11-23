import type { Metadata } from "next";
import Link from "next/link";
import ToolStack from "@/components/portfolio/ToolStack";
import styles from "@/components/portfolio/PortfolioCatalog.module.css";
import portfolio from "@/components/portfolio/Portfolio.module.css";
import { modernPortfolio } from "@/data/modern-portfolio";

export const metadata: Metadata = {
  title: "Work — David Jeanty",
};

export default function WorkPage() {
  const { work, tinderProject, toolGroups } = modernPortfolio;
  const projects = [
    {
      name: work.name,
      context: "Independent project",
      year: "2026",
      description: work.shortDescription,
      href: "/interndex",
      tools: work.tools,
    },
    tinderProject,
  ];

  return (
    <div className={styles.page}>
      <h1 className={`${portfolio.pageTitle} ${styles.heading}`}>Work</h1>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.sectionTitle}>Projects</h2>
        <ul className={styles.projects}>
          {projects.map((project) => (
            <li key={project.href}>
              <article className={styles.project}>
                <div>
                  <h3><Link href={project.href}>{project.name}</Link></h3>
                  <p className={styles.meta}>{project.context} · {project.year}</p>
                </div>
                <ToolStack tools={project.tools} label={`${project.name} stack`} />
                <p>{project.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.toolsSection} aria-labelledby="toolkit-heading">
        <h2 id="toolkit-heading" className={styles.sectionTitle}>Tools I’ve used</h2>
        <dl>
          {toolGroups.map(({ title, tools }) => (
            <div key={title} className={styles.toolGroup}>
              <dt>{title}</dt>
              <dd><ToolStack tools={tools} label={title} /></dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
