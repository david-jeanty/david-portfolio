"use client";

import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";
import { SmallEnvelopeIcon, SmallLinkIcon, SmallPinIcon } from "@/components/desktop/XPIcons";

export default function ContactWindowContent() {
  const linkedinUrl = `https://${portfolioData.contact.linkedin}`;
  const resumeUrl = `/${portfolioData.desktop.resumeFileName}`;

  return (
    <div>
      <div className={styles.menuBar}>
        {["File", "Edit", "View", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <section className={styles.simpleListSurface}>
        <section className={styles.sectionIntroCard}>
          <div>
            <p className={styles.sectionIntroEyebrow}>Professional contact</p>
            <h3 className={styles.sectionIntroTitle}>Easy ways to reach me</h3>
            <p className={styles.sectionIntroCopy}>{portfolioData.contact.responseNote}</p>
          </div>

          <div className={styles.contactAvailabilityCard}>
            <span className={styles.contactAvailabilityLabel}>Availability</span>
            <strong className={styles.contactAvailabilityValue}>
              {portfolioData.contact.availability}
            </strong>
          </div>
        </section>

        <div className={styles.contactGrid}>
          <section className={styles.contactCard}>
            <p className={styles.contactCardTitle}>
              <SmallEnvelopeIcon />
              Email
            </p>
            <p className={styles.contactCardValue}>
              <a href={`mailto:${portfolioData.contact.email}`}>{portfolioData.contact.email}</a>
            </p>
          </section>

          <section className={styles.contactCard}>
            <p className={styles.contactCardTitle}>
              <SmallLinkIcon />
              LinkedIn
            </p>
            <p className={styles.contactCardValue}>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                {portfolioData.contact.linkedin}
              </a>
            </p>
          </section>

          <section className={styles.contactCard}>
            <p className={styles.contactCardTitle}>
              <SmallPinIcon />
              Location
            </p>
            <p className={styles.contactCardValue}>{portfolioData.contact.location}</p>
          </section>

          <section className={styles.contactCard}>
            <p className={styles.contactCardTitle}>Best fit</p>
            <p className={styles.contactCardValue}>{portfolioData.contact.preferredIntro}</p>
          </section>
        </div>

        <div className={styles.actionRow}>
          <a
            href={`mailto:${portfolioData.contact.email}?subject=Opportunity%20Inquiry&body=Hi%20David%2C%0A%0AI'd%20like%20to%20connect%20about%20a%20role%20or%20opportunity.%0A%0AThanks!`}
            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
            aria-label="Email about opportunities"
          >
            Email David
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
            aria-label="Open LinkedIn profile"
          >
            Open LinkedIn
          </a>

          <a href={resumeUrl} download className={styles.actionButton} aria-label="Download resume">
            Download Resume
          </a>
        </div>
      </section>

      <div className={styles.statusBar}>
        <span>4 contact fields</span>
        <span>Professional contact open</span>
      </div>
    </div>
  );
}
