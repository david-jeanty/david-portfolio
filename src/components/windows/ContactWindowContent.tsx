"use client";

import { portfolioData } from "@/data/portfolio";
import styles from "./WindowApps.module.css";
import { SmallEnvelopeIcon, SmallLinkIcon, SmallPinIcon } from "@/components/desktop/XPIcons";

export default function ContactWindowContent() {
  const linkedinUrl = `https://${portfolioData.contact.linkedin}`;

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
        <ul className={styles.contactList}>
          <li>
            <span className={styles.contactLine}>
              <SmallEnvelopeIcon />
              Email:{" "}
              <a href={`mailto:${portfolioData.contact.email}`}>
                {portfolioData.contact.email}
              </a>
            </span>
          </li>
          <li>
            <span className={styles.contactLine}>
              <SmallLinkIcon />
              LinkedIn:{" "}
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                {portfolioData.contact.linkedin}
              </a>
            </span>
          </li>
          <li>
            <span className={styles.contactLine}>
              <SmallPinIcon />
              Location: {portfolioData.contact.location}
            </span>
          </li>
        </ul>

        <h3>Coffee chat / networking</h3>
        <p style={{ marginBottom: 14 }}>
          Open to recruiter conversations and quick networking chats. If you
          want to connect, send a note and I’ll respond.
        </p>

        <a
          href={`mailto:${portfolioData.contact.email}?subject=Coffee%20chat&body=Hi%20David%2C%0A%0AI%E2%80%99d%20love%20to%20chat%20about%20opportunities.%0A%0AThanks!`}
          className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
          aria-label="Email for a coffee chat"
        >
          Email for a coffee chat
        </a>
      </section>

      <div className={styles.statusBar}>
        <span>3 contact fields</span>
        <span>Networking open</span>
      </div>
    </div>
  );
}
