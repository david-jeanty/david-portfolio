"use client";

import Image from "next/image";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";

export default function AboutWindowContent() {
  const [activeTab, setActiveTab] = useState<"background" | "how-i-work" | "personal">(
    "background"
  );

  return (
    <div className={styles.aboutApp}>
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
          <section className={styles.heroPanel} aria-label="Profile snapshot">
            <div className={styles.heroContentGrid}>
              <div className={styles.onboardingPhotoFrame}>
                <Image
                  src="/david-headshot.JPG"
                  alt="David Jeanty"
                  width={104}
                  height={104}
                  className={styles.onboardingPhoto}
                />
              </div>

              <div className={styles.onboardingCopy}>
                <p className={styles.heroEyebrow}>Welcome</p>
                <h3 className={styles.heroTitle}>{portfolioData.identity.title}</h3>
                <p>{portfolioData.identity.tagline}</p>
                <p>{portfolioData.about.paragraph}</p>
              </div>
            </div>

            <div className={styles.heroStatsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Based in</span>
                <strong className={styles.statValue}>{portfolioData.identity.location}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Studying</span>
                <strong className={styles.statValue}>{portfolioData.identity.degree}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Working in</span>
                <strong className={styles.statValue}>AI Enablement, CRM, Strategy, and Operations</strong>
              </div>
            </div>
          </section>

          <div className={styles.tabRow} role="tablist" aria-label="About tabs">
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "background" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab("background")}
              role="tab"
              aria-selected={activeTab === "background"}
            >
              Background
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "how-i-work" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab("how-i-work")}
              role="tab"
              aria-selected={activeTab === "how-i-work"}
            >
              How I Work
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

          {activeTab === "background" ? (
            <div className={`${styles.fieldGrid} ${styles.aboutGrid}`}>
              <div className={styles.fieldLabel}>Program</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.identity.degree}
              </div>

              <div className={styles.fieldLabel}>University</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.identity.institution}
              </div>

              <div className={styles.fieldLabel}>Involvement</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                <ul className={styles.rowList}>
                  {portfolioData.about.extracurriculars.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.fieldLabel}>Where I am most interested in contributing</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                <ul className={styles.rowList}>
                  {portfolioData.about.professionalGoals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : activeTab === "how-i-work" ? (
            <div className={styles.splitPanelGrid}>
              <section className={styles.infoPanel}>
                <p className={styles.sectionLabel}>Core strengths</p>
                <ul className={styles.rowList}>
                  {portfolioData.about.strengths.map((strength) => (
                    <li key={strength}>{strength}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.infoPanel}>
                <p className={styles.sectionLabel}>What I optimize for</p>
                <ul className={styles.rowList}>
                  {portfolioData.about.headlineLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.infoPanel}>
                <p className={styles.sectionLabel}>Current focus</p>
                <ul className={styles.rowList}>
                  {portfolioData.about.currentFocus.map((focus) => (
                    <li key={focus}>{focus}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.calloutCard}>
                <p className={styles.sectionLabel}>Best fit</p>
                <p className={styles.calloutText}>
                  Teams working across AI enablement, CRM, strategy, or operations that need someone
                  curious, organized, and comfortable turning ambiguity into clearer next steps.
                </p>
              </section>
            </div>
          ) : (
            <div className={styles.splitPanelGrid}>
              <section className={styles.infoPanel}>
                <p className={styles.sectionLabel}>Outside of work</p>
                <p>{portfolioData.about.personal.summary}</p>
              </section>

              <section className={styles.infoPanel}>
                <p className={styles.sectionLabel}>Interests</p>
                <div className={styles.hobbyRow}>
                  {portfolioData.about.personal.hobbies.map((hobby) => (
                    <span key={hobby} className={styles.hobbyChip}>
                      {hobby}
                    </span>
                  ))}
                </div>
              </section>

              <section className={styles.calloutCard}>
                <p className={styles.sectionLabel}>Ask me about</p>
                <p className={styles.calloutText}>{portfolioData.about.personal.askMeAbout}</p>
              </section>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
