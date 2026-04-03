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
                  Hi, I&apos;m David. I built this portfolio like a desktop
                  because I like work that feels organized, easy to navigate,
                  and a little tactile. I&apos;m a BTM student at uOttawa, and
                  I&apos;m usually most useful where there are moving parts,
                  unclear follow-up, or reporting that needs to be cleaned up.
                </p>
                <p>
                  You can open, move, resize, minimize, and restore each
                  window. Good places to start are Resume, Experience, About
                  Me, and Contact.
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
              Background
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
            I tend to do my best work in the middle of moving parts: keeping
            workflows clear, noticing what needs attention, and making the
            next step obvious to the people involved.
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

              <div className={styles.fieldLabel}>Involvement</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.extracurriculars.join(", ")}
              </div>

              <div className={styles.fieldLabel}>Where I’m most interested in contributing</div>
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
                Structured in fast-paced environments
                <br />
                Curious about systems, workflows, and people
                <br />
                Focused on practical communication and follow-through
              </div>

              <div className={styles.fieldLabel}>Outside of work</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                {portfolioData.about.personal.summary}
              </div>

              <div className={styles.fieldLabel}>Top interests right now</div>
              <div className={`${styles.fieldValue} ${styles.infoPanel}`}>
                Outside of school and work, I still like hobbies that reward
                patience and consistency: guitar, baking, running, and travel.
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
