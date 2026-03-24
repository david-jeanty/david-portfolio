"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";

export default function AboutWindowContent() {
  const [activeTab, setActiveTab] = useState<"academia" | "personal">("academia");

  return (
    <div>
      <div className={styles.menuBar}>
        {["File", "Edit", "View", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <section className={styles.dialogCard}>
        <div className={styles.dialogHeader}>Profile Properties</div>
        <div className={styles.dialogBody}>
          <div className={styles.tabRow} role="tablist" aria-label="About tabs">
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "academia" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab("academia")}
              role="tab"
              aria-selected={activeTab === "academia"}
            >
              Academia
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "personal" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab("personal")}
              role="tab"
              aria-selected={activeTab === "personal"}
            >
              Personal
            </button>
          </div>

          <p>
            I built this portfolio like a desktop because that is how I like to
            work: structured, curious, and easy to navigate. I am usually the
            person who wants to understand how a system works, where it breaks,
            and how to make it clearer for everyone using it.
          </p>

          {activeTab === "academia" ? (
            <div className={`${styles.fieldGrid} ${styles.aboutGrid}`}>
              <div className={styles.fieldLabel}>Program</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.identity.degree}
              </div>

              <div className={styles.fieldLabel}>University</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.identity.institution}
              </div>

              <div className={styles.fieldLabel}>Languages</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.identity.languages.join(" / ")}
              </div>

              <div className={styles.fieldLabel}>Leadership</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.extracurriculars.join(", ")}
              </div>

              <div className={styles.fieldLabel}>What I am aiming for</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                <ul className={styles.rowList}>
                  {portfolioData.about.professionalGoals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className={`${styles.fieldGrid} ${styles.aboutGrid}`}>
              <div className={styles.fieldLabel}>How I think</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                Structured before flashy
                <br />
                Curious about process and people
                <br />
                Focused on practical, usable solutions
              </div>

              <div className={styles.fieldLabel}>Outside of work</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.personal.summary}
              </div>

              <div className={styles.fieldLabel}>Hobbies</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.personal.hobbies.join(", ")}
              </div>

              <div className={styles.fieldLabel}>Spotify</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.personal.spotifyUrl ? (
                  <a
                    href={portfolioData.about.personal.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open playlist
                  </a>
                ) : (
                  portfolioData.about.personal.spotifyPlaceholder
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
