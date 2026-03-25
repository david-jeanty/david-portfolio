"use client";

import Image from "next/image";
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
          <section className={styles.onboardingNote} aria-label="Navigation guidance">
            <div className={styles.onboardingIntro}>
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
                <p className={styles.onboardingTitle}>Welcome</p>
                <p>
                  Hi, I&apos;m David. I built this portfolio like a small desktop
                  because I like systems that feel organized, interactive, and
                  easy to explore.
                </p>
                <p>
                  I&apos;m currently looking for Fall 2026 internship
                  opportunities in business analysis, product operations, and
                  tech consulting.
                </p>
                <p>
                  Windows can be opened, moved, resized, minimized, and
                  restored. Good places to start are Experience, Resume.pdf,
                  Workbench, and Contact.
                </p>
              </div>
            </div>
          </section>

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
                Thoughtful before flashy
                <br />
                Curious about systems and people
                <br />
                Focused on practical, usable solutions
              </div>

              <div className={styles.fieldLabel}>Outside of work</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.personal.summary}
              </div>

              <div className={styles.fieldLabel}>Top interests right now</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                Lately, the ones I come back to most are guitar, baking,
                running, and travel.
              </div>

              <div className={styles.fieldLabel}>Baking note</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.personal.askMeAbout}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
