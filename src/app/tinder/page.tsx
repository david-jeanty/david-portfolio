import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";
import portfolio from "@/components/portfolio/Portfolio.module.css";
import { modernPortfolio } from "@/data/modern-portfolio";
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

function ReportSection({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <section className={styles.row} aria-labelledby={id}>
      <h2 id={id} className={styles.label}>{heading}</h2>
      <div className={styles.prose}>{children}</div>
    </section>
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

      <details className={`${styles.disclosure} ${styles.sampleDisclosure}`}>
        <summary>See one risk in full</summary>
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
      </details>

      <a className={styles.download} href="/brief_v2.pdf" download>Download the full synthetic brief (PDF)</a>
    </div>
  );
}

export default function TinderPage() {
  const { name, email, linkedin } = modernPortfolio.identity;
  const hasDemo = existsSync(join(process.cwd(), "public", demoVideo));

  return (
    <ModernPortfolioFrame
      reportFooter={(
        <footer className={styles.footer}>
          <div className={styles.row}>
            <p>{name}</p>
            <address>
              <a href={`mailto:${email}`}>Email</a>
              <a href={linkedin}>LinkedIn</a>
            </address>
          </div>
        </footer>
      )}
    >
      <article className={styles.article}>
        <header className={`${styles.row} ${styles.hero}`}>
          <Image
            src="/tinder-headshot.jpg"
            alt={name}
            width={280}
            height={500}
            sizes="(min-width: 760px) 138px, 96px"
            className={styles.headshot}
            preload
          />
          <div>
            <h1 className={portfolio.pageTitle}>{title}</h1>
            <p className={styles.heroSummary}>
              I’m a Business Technology Management student at uOttawa applying for Tinder’s Technical Program Management internship in Los Angeles.
            </p>
          </div>
        </header>

        {hasDemo && (
          <ReportSection id="video" heading="Video">
            <video
              className={styles.video}
              src={demoVideo}
              controls
              playsInline
              preload="metadata"
              aria-label="Brief Writer project walkthrough"
            />
          </ReportSection>
        )}

        <ReportSection id="research" heading="The research">
          <p>
            I used the internship and senior TPM postings to figure out what the tool should help someone do.
            The internship calls for early risk escalation. The Recs posting pairs reporting automation with a recommended
            path forward. Events asks TPMs to turn trade-offs into recommendations, and Trust &amp; Safety asks
            them to make technical risks actionable for people outside engineering.{" "}
            <SourceRef number={1} /> <SourceRef number={2} /> <SourceRef number={3} /> <SourceRef number={4} />
          </p>
          <p>
            Merlin takes a ticket, posts a plan in Slack, and waits for someone to approve it before it starts
            editing code. That gave me a model for where the tool should live and where it should stop. <SourceRef number={6} />
          </p>
          <p>
            My first idea was a weekly status writer. Then I read that Agentis already assembles a PM’s weekly report
            from team conversations and documentation. I built a tool for the step after the report arrives. It
            works out what needs a decision, what evidence matters, and what the team can do next. <SourceRef number={5} /> <SourceRef number={2} />
          </p>
        </ReportSection>

        <ReportSection id="built" heading="What I built">
          <p>
            After Party is a fictional dating app launching Post-Event Matching, with synthetic tickets, release dates,
            and Slack threads across its teams.
          </p>
          <p>
            Brief Writer reads the tickets and messages and posts a brief in the leads’ channel. It shows what needs
            deciding, when, and what each option would cost the team, with the records behind each finding.
          </p>

          <section className={styles.mismatch} aria-labelledby="mismatch">
            <h3 id="mismatch">When status and the record disagree</h3>
            <dl className={styles.evidence}>
              <div>
                <dt>What leads heard</dt>
                <dd>iOS reported “nothing that changes dates yet.” <span className={styles.meta}>MSG-087</span></dd>
              </div>
              <div>
                <dt>What the records showed</dt>
                <dd>The day before, App Review had rejected the build. The iOS attendee deck was paused and later moved to the next release. <span className={styles.meta}>MSG-075, PEM-111</span></dd>
              </div>
            </dl>
            <p>Brief Writer surfaced the mismatch so leads could revisit what the release would actually include.</p>
          </section>

          <SampleBrief />
        </ReportSection>

        <ReportSection id="workflow" heading="Built the way Tinder builds">
          <p>
            The brief lands in Slack, where the teams are already talking. I followed Merlin’s example of keeping
            the plan and evidence available in the same workspace where people review the work. <SourceRef number={6} />
          </p>
          <p>
            Brief Writer lays out the options and their trade-offs. A person reviews the evidence and decides
            what to do. Agentis’s approval gates gave me a model for that handoff. <SourceRef number={5} />
          </p>
        </ReportSection>

        <ReportSection id="evaluation" heading="How I know it works">
          <p>
            Tinder’s Photo Feedback team needed examples with known answers to test a new feature. I used the
            same approach and wrote an answer key first. I planted delivery risks in After Party and added
            decoys that looked worrying but had an explanation elsewhere in the record. <SourceRef number={7} />
          </p>
          <p>
            I then tested Brief Writer on Ledgerline and Courier, synthetic programs created separately from
            After Party. I kept their answer keys out of the tool and scored the briefs against those keys afterward.
            It found every planted problem in those two programs.
          </p>
          <p>
            I also wanted to see whether writing the main test had influenced its rules. I rebuilt the risk patterns
            using public sources. A separate agent drafted the patterns without seeing the test or the answer key.
            The tool found about as many problems on the main test with those rules.
          </p>
        </ReportSection>

        <ReportSection id="recall" heading="Recall over precision">
          <p>
            I’d rather have a lead review an extra warning than find out after launch that a dependency was missed.
            Brief Writer looks broadly for risks, then reserves the top of the brief for high-impact issues with
            enough evidence to discuss. Lower-confidence findings go on the watch list. <SourceRef number={7} />
          </p>
        </ReportSection>

        <ReportSection id="limits" heading="Limits">
          <p>
            On my main test, Brief Writer missed some problems. Some left almost no trace in the tickets or Slack,
            and the tool can miss a connection when the pieces sit in separate threads.
          </p>
          <p>
            All of the tests used synthetic records. The next check I’d want is whether the same process holds up
            with the noise and missing context of a live program.
          </p>
        </ReportSection>

        <ReportSection id="interview" heading="Let’s talk">
          <p>I’d love to interview for the Technical Program Management internship in LA this summer.</p>
          <p><a href={`mailto:${email}`}>Email me</a></p>
        </ReportSection>

        <ReportSection id="sources" heading="Sources">
          <p className={styles.meta}>The same sources as the video end card, captured in November 2026.</p>
          <ol className={styles.sources}>
            {sources.map((source, index) => (
              <li id={`source-${index + 1}`} key={source.url}>
                <a href={source.url}>{source.title}</a>
                {"note" in source && <span className={styles.meta}> · {source.note}</span>}
              </li>
            ))}
          </ol>
        </ReportSection>
      </article>
    </ModernPortfolioFrame>
  );
}
