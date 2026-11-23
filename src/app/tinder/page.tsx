import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";
import ToolStack from "@/components/portfolio/ToolStack";
import { modernPortfolio } from "@/data/modern-portfolio";
import ProfileDeck from "./ProfileDeck";
import styles from "./tinder.module.css";

const title = "David Jeanty for Tinder";

export const metadata: Metadata = {
  title,
  description: "David Jeanty’s Technical Program Management internship application and the decisions behind Brief Writer.",
  robots: { index: false, follow: false },
};

const demoVideo = "/decision-brief-demo.mp4";

const sources = [
  { title: "Technical Program Management Intern", url: "https://jobs.lever.co/matchgroup/107da1ee-5b8a-4a1b-9d75-5ba3d597116c" },
  { title: "Senior TPM, Recs, Revenue, and Engagement", url: "https://jobs.lever.co/matchgroup/4a1ba25e-109a-44b8-b330-6f6ef31e9171" },
  { title: "Senior TPM, Events (IRL)", url: "https://lifeattinder.com/positions/38a680c1-07a6-438e-9448-b677b5f044e0-losangelescalifornia", note: "Role filled" },
  { title: "Senior TPM, Trust & Safety", url: "https://lifeattinder.com/positions/b263e3b8-adc5-4b7c-aceb-28aae688b9d3-losangelescalifornia" },
  { title: "Agents That Prove Their Work: Inside Agentis", url: "https://lifeattinder.com/blog/agents-that-prove-their-work-inside-agentis-tinders-ai-agent-platform" },
  { title: "Merlin: The Tinder Harness Around AI Coding Agents", url: "https://lifeattinder.com/blog/merlin-the-tinder-harness" },
  { title: "When Your Model Hates Helicopters", url: "https://lifeattinder.com/blog/llm-features-you-can-bet-on" },
] as const;

function SourceRef({ number }: { number: number }) {
  return <a className={styles.sourceRef} href={`#source-${number}`} aria-label={`Source ${number}`}>[{number}]</a>;
}

function ProfileDisclosure({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <details id={id} className={styles.disclosure}>
      <summary>{heading}</summary>
      <div className={styles.disclosureBody}>{children}</div>
    </details>
  );
}

const decisions = [
  { issue: "The Android deck still reads attendees v1, which the R4 build removes.", deadline: "Before the R4 build cut." },
  { issue: "The fraud notification due for R4 has no owner, spec or decision.", deadline: "By the Nov 19, 2 p.m. launch review." },
  { issue: "The manual fraud fallback and daily ban export may miss the 24-hour window.", deadline: "Before Nov 23." },
  { issue: "The Thanksgiving-week R5 release now carries the iOS deck, push notifications and possibly the fraud notification.", deadline: "No deadline stated." },
];

const riskOptions = [
  [
    "A. Switch Android ticket PEM-117 to v2 before R4 and retest with consent data.",
    "Matches the privacy-approved interface and keeps the R4 date for Android.",
    "Reopens a ticket already in review and requires a retest at the release freeze.",
  ],
  [
    "B. Keep v1 past R4 and delay the backend code cleanup.",
    "Android ships as built with no code change.",
    "v1 returns attendees who did not consent, which conflicts with the privacy review.",
  ],
  [
    "C. Pull the Android deck from R4 too.",
    "Removes the interface mismatch risk from R4.",
    "R4 ships with no deck on either platform.",
  ],
];

function SampleBrief() {
  return (
    <div className={styles.sample}>
      <header className={styles.sampleHeader}>
        <h3>Post-Event Matching</h3>
        <p className={styles.meta}>Synthetic program · Nov 19, 2026</p>
      </header>

      <div className={styles.sampleSection}>
        <h4>Decisions needed</h4>
        <ol className={styles.decisions}>
          {decisions.map(({ issue, deadline }) => (
            <li key={issue}>
              {issue}
              <span className={styles.meta}>{deadline}</span>
            </li>
          ))}
        </ol>
        <p className={styles.meta}>
          Where the record gives no clear deadline, the TPM sets one.
        </p>
      </div>

      <div className={styles.sampleSection}>
        <p className={styles.meta}>Lead risk 1</p>
        <h4>The Android deck still reads attendees v1, which the R4 build removes</h4>
        <p>
          The Android deck, the screen that shows attendees, is in review for release R4. Its ticket
          (PEM-117) still calls for <code>GET /v1</code> with the <code>attendees</code> field.
          The backend switched to a new interface, v2, which returns consenting attendees only in{" "}
          <code>visible_attendees</code>, and will remove v1 in the R4 build. The backend handoff
          went only to iOS, and Android&apos;s sync used the kickoff document. The Android deck could fail
          at launch or show attendees who did not consent.
        </p>
        <dl className={styles.evidence}>
          <div><dt>Impact</dt><dd>High. Android is the only deck in R4, and v1 goes away in the same build.</dd></div>
          <div><dt>Confidence</dt><dd>High. The tickets directly contradict each other, and the only recorded handoff went to iOS.</dd></div>
          <div><dt>Evidence</dt><dd>PEM-117, PEM-104, MSG-012, MSG-039, MSG-040, MSG-041, MSG-042, MSG-103, MSG-104, MSG-134</dd></div>
        </dl>
        <h5>Decision needed</h5>
        <p>Before the R4 build cut, who moves Android to v2, or does v1 removal wait until Android is confirmed on v2?</p>
        <ul className={styles.options} aria-label="Options for the Android deck">
          {riskOptions.map(([option, upside, downside]) => (
            <li key={option}>
              <p><strong>{option}</strong></p>
              <dl>
                <div><dt>Upside</dt><dd>{upside}</dd></div>
                <div><dt>Downside</dt><dd>{downside}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
        <div className={styles.recommendation}>
          <h5>What I’d recommend as the TPM</h5>
          <p>
            I recommend A, with C as the fallback. Make the decision at the Nov 19, 2 p.m. launch review.
            The Android lead owns the switch to v2, asks the release manager for a freeze exception, and
            must pass a retest with consent data by end of day Friday, Nov 20, ahead of the Nov 23 release.
            If the retest fails or misses the deadline, pull the Android deck from R4 (C). Rule out B.
            The privacy review led to v2, and keeping v1 would bypass that decision.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TinderPage() {
  const { name, email, linkedin } = modernPortfolio.identity;
  const { tools } = modernPortfolio.tinderProject;
  const hasDemo = existsSync(join(process.cwd(), "public", demoVideo));

  return (
    <ModernPortfolioFrame
      reportFooter={(
        <footer className={styles.footer}>
          <p>{name}</p>
          <a href={linkedin}>LinkedIn ↗</a>
        </footer>
      )}
    >
      <article className={styles.profile} aria-labelledby="profile-name">
        <ProfileDeck name={name} linkedin={linkedin} email={email} />

        {hasDemo && (
          <section className={styles.section} aria-labelledby="video">
            <h2 id="video">Project walkthrough</h2>
            <video className={styles.video} src={demoVideo} controls playsInline preload="metadata" />
          </section>
        )}

        <section className={styles.section} aria-labelledby="why-me">
          <h2 id="why-me">Why me</h2>
          <dl className={styles.highlights}>
            <div>
              <dt>I make the trade-offs clear.</dt>
              <dd>At the IRB, I compared Azure DevOps with ServiceNow and recommended the switch the IT director approved.</dd>
            </div>
            <div>
              <dt>I build and revise.</dt>
              <dd>I built <a href="/interndex">Interndex</a>, an internship tracker, and revised it based on feedback from students.</dd>
            </div>
            <div>
              <dt>I keep work moving.</dt>
              <dd>On an IBM pro bono project, I track the team’s deadlines and help a nonprofit review how it handles donor and participant data.</dd>
            </div>
          </dl>
        </section>

        <section className={styles.section} aria-labelledby="built">
          <div className={styles.projectHeader}>
            <h2 id="built">Brief Writer</h2>
            <ToolStack tools={tools} />
          </div>
          <p className={styles.lede}>
            I built a Slack tool that reads tickets and messages, flags decisions that need attention, and gives leads a deadline, options, and the evidence behind them.
          </p>

          <div className={styles.projectGrid}>
            <figure>
              <Image
                src="/brief-writer-slack.webp"
                alt="Brief Writer’s Slack message listing decisions and conflicting status updates for Post-Event Matching"
                width={1112}
                height={772}
                sizes="(min-width: 1040px) 525px, (min-width: 760px) 52vw, 88vw"
                className={styles.briefImage}
              />
              <figcaption>Slack output for After Party, a fictional dating app.</figcaption>
            </figure>

            <div className={styles.mismatch}>
              <h3 id="mismatch">The status looked fine.</h3>
              <dl className={styles.evidence}>
                <div>
                  <dt>What leads heard <span className={styles.meta}>MSG-087</span></dt>
                  <dd>iOS reported “nothing that changes dates yet.”</dd>
                </div>
                <div>
                  <dt>What the records showed <span className={styles.meta}>MSG-075, PEM-111</span></dt>
                  <dd>App Review had rejected the build the day before. The attendee deck was paused and moved to the next release.</dd>
                </div>
              </dl>
              <p>Brief Writer put both updates side by side so leads could revisit the release scope.</p>
            </div>
          </div>
          <a className={styles.pdfLink} href="/brief_v2.pdf" download>Download the full sample brief (PDF) <span aria-hidden="true">↓</span></a>

          <div className={styles.disclosures}>
            <ProfileDisclosure id="sample-brief" heading="Read the sample brief">
              <SampleBrief />
            </ProfileDisclosure>

            <ProfileDisclosure id="research" heading="Research and design decisions">
              <p>
                The TPM postings pointed to early escalation, clear trade-offs, and recommendations people can act on.{" "}
                <SourceRef number={1} /> <SourceRef number={2} /> <SourceRef number={3} /> <SourceRef number={4} />
              </p>
              <p>
                I planned to build a status writer. When I read that Agentis already writes a weekly PM report, I shifted to what happens after the report arrives. <SourceRef number={5} />
              </p>
              <p id="workflow">
                Merlin made Slack the natural place for review. Brief Writer posts the options there, cites the records, and leaves the decision to a person. <SourceRef number={6} /> <SourceRef number={5} />
              </p>
            </ProfileDisclosure>

            <ProfileDisclosure id="evaluation" heading="Testing, trade-offs, and limits">
              <p>
                Following Tinder’s Photo Feedback evaluation, I wrote an answer key first and planted risks alongside decoys. Brief Writer found every planted problem in two previously unseen synthetic programs, Ledgerline and Courier. <SourceRef number={7} />
              </p>
              <p>
                For a bias check, a separate agent rebuilt the risk rules from public sources without seeing my main test or answer key. It surfaced about as many issues on that test.
              </p>
              <p id="recall">
                <strong>Why I prioritized recall.</strong> A missed dependency can derail a launch. I kept well-supported, high-impact issues at the top of the brief and routed weaker signals to a watch list.
              </p>
              <p id="limits">
                <strong>Where it fell short.</strong> In the main test, Brief Writer missed some risks with sparse records or evidence spread across threads. A live program would be the next test.
              </p>
            </ProfileDisclosure>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="sources">
          <h2 id="sources">Sources</h2>
          <ol className={styles.sources}>
            {sources.map((source, index) => (
              <li id={`source-${index + 1}`} key={source.url}>
                <a href={source.url}>{source.title}</a>
                {"note" in source && <span className={styles.meta}> · {source.note}</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.interview}`} aria-labelledby="interview">
          <div>
            <h2 id="interview">Let’s talk</h2>
            <p>I’d love to interview for the Technical Program Management internship in LA this summer.</p>
          </div>
          <a className={styles.contactLink} href={`mailto:${email}`}>Email me <span aria-hidden="true">↗</span></a>
        </section>
      </article>
    </ModernPortfolioFrame>
  );
}
