import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";
import { modernPortfolio } from "@/data/modern-portfolio";
import styles from "./decision-brief.module.css";

export const metadata: Metadata = {
  title: "AI Decision Brief Writer | David Jeanty",
  description: "A project case study on turning synthetic tickets and Slack messages into a decision brief.",
  robots: { index: false, follow: false },
};

const demoVideo = "/decision-brief-demo.mp4";

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

const statusMismatches = [
  { issue: "Leads were told R4 holds for Android while the staggered launch is unresolved.", confidence: "Medium" },
  { issue: "Leads were told iOS had nothing changing dates while the deck was already paused.", confidence: "High" },
  { issue: "Leads were told backend has nothing open for R4 while work marked ready is still in progress.", confidence: "High" },
];

const results = [
  ["Post-Event Matching", "10 of 14", "79% to 93%", "1 of 4", "4 to 5"],
  ["Ledgerline", "6 of 6", "78% to 89%", "0 of 3", "5 to 6"],
  ["Courier", "8 of 8", "75% to 91%", "1 of 4", "5 to 6"],
];

function BriefTable({
  label,
  columns,
  rows,
}: {
  label: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <table className={styles.table} aria-label={label} role="table">
      <thead role="rowgroup">
        <tr role="row">
          {columns.map((title) => <th key={title} scope="col" role="columnheader">{title}</th>)}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map(([heading, ...values]) => (
          <tr key={heading} role="row">
            <th scope="row" role="rowheader">{heading}</th>
            {values.map((value, index) => (
              <td key={columns[index + 1]} role="cell">
                <span className={styles.cellLabel} aria-hidden="true">{columns[index + 1]}</span>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

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
          As the tool wrote them. Where the record gives no clear deadline, the TPM sets one; my recommendation
          for risk 1 sets Fri, Nov 20.
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
        <BriefTable label="Options for the Android deck" columns={["Option", "Upside", "Downside"]} rows={riskOptions} />
        <div className={styles.recommendation}>
          <h5>My TPM recommendation</h5>
          <p>
            I recommend A, with C as the fallback. Make the decision at the Nov 19, 2 p.m. launch review.
            The Android lead owns the switch to v2, asks the release manager for a freeze exception, and
            must pass a retest with consent data by end of day Friday, Nov 20, ahead of the Nov 23 release.
            If the retest fails or misses the deadline, pull the Android deck from R4 (C). Rule out B.
            The privacy review led to v2, and keeping v1 would bypass that decision.
          </p>
          <p className={styles.meta}>David Jeanty</p>
        </div>
      </div>

      <div className={styles.sampleSection}>
        <h4>Where status and the record disagree</h4>
        <ul className={styles.mismatches}>
          {statusMismatches.map(({ issue, confidence }) => (
            <li key={issue}>
              {issue}
              <span className={styles.meta}>Worth watching · Medium impact · {confidence} confidence</span>
            </li>
          ))}
        </ul>
      </div>

      <a className={styles.download} href="/brief_v2.pdf" download>Download the full synthetic brief (PDF)</a>
    </div>
  );
}

export default function DecisionBriefPage() {
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
          <p className={styles.label}>Project case study · Synthetic data</p>
          <div>
            <h1>AI Decision Brief Writer</h1>
            <p className={styles.heroSummary}>
              An AI tool that turns a program&apos;s tickets and Slack messages into a decision-ready brief for
              leaders. The AI lays out risks, evidence and options. The technical program manager (TPM) makes the call.
            </p>
            <p className={`${styles.meta} ${styles.runCost}`}>
              Built with Python and the Claude API. Each brief costs about 15 to 30 cents to run.
            </p>
          </div>
        </header>

        <section className={styles.row} aria-labelledby="problem">
          <h2 id="problem" className={styles.label}>The problem</h2>
          <div className={styles.prose}>
            <p>Leaders get status updates. When a release is at risk, they need to know what to decide and what each option costs.</p>
            <p>“Watermelon status” is green outside and red inside. The update says the work is on track, while the team&apos;s own tickets or Slack messages show a problem.</p>
          </div>
        </section>

        <section className={styles.row} aria-labelledby="workflow">
          <h2 id="workflow" className={styles.label}>How it works</h2>
          <ol className={styles.workflow} aria-label="Steps from program records to a recommendation" role="list">
            <li>Tickets and Slack</li>
            <li>AI brief writer</li>
            <li>
              Decision brief
              <ul>
                <li>Decisions needed</li>
                <li>Lead risks</li>
                <li>Where status and the record disagree</li>
                <li>Worth watching</li>
              </ul>
            </li>
            <li>TPM adds a recommendation</li>
          </ol>
        </section>

        <section className={styles.row} aria-labelledby="sample">
          <h2 id="sample" className={styles.label}>Sample brief</h2>
          <SampleBrief />
        </section>

        <section className={styles.row} aria-labelledby="testing">
          <h2 id="testing" className={styles.label}>How I tested it honestly</h2>
          <div className={styles.prose}>
            <p>
              I built a synthetic program with 14 hidden problems and 4 decoys (things that look like problems but aren&apos;t).
              I kept the answer key with the grader. Before every AI call, a guard blocked prompts containing the
              answer key&apos;s labels, field names or text.
            </p>
            <p>
              To check whether the original rubric gave away the answers, I compared it with a second version whose
              risk patterns came only from public sources. The rubric is the brief writer&apos;s guide to spotting risks.
              Both versions scored in the same range, 10 to 12 of 14. A keyword search found 0 of 14 and a neutral
              summary found 2 of 14.
            </p>
            <p>
              Two separate AI agents each wrote another synthetic program without seeing my original program, its
              answer key or the brief writer&apos;s prompts. The grader scored both tests without anyone reading their keys.
            </p>
            <h3>Version 2 results</h3>
            <p className={styles.meta}>Three runs per synthetic program. Problems credited stayed the same across all three runs for each program. Precision is the share of findings the grader counted as valid.</p>
            <BriefTable
              label="Version 2 results across the three synthetic programs"
              columns={["Program", "Problems credited", "Precision", "Decoys flagged", "Lead risks per brief"]}
              rows={results}
            />
            <p className={styles.meta}>
              On Post-Event Matching, the tool caught all three problems it was built for (status that hides trouble,
              and a decision nobody made) in every run. Every flagged decoy stayed in “Worth watching.”
            </p>
          </div>
        </section>

        <section className={styles.row} aria-labelledby="ship">
          <h2 id="ship" className={styles.label}>What I chose not to ship</h2>
          <div className={styles.prose}>
            <p>The v4 fact-checker compared each positive update given to leaders with the team&apos;s earlier records. It added about 30 AI calls per run.</p>
            <details className={styles.criteria}>
              <summary>Show the six criteria</summary>
              <h3>The criteria I set before the test</h3>
              <ol className={styles.list}>
                <li>Find at least 10 of 14 problems in every main-program run.</li>
                <li>Connect the six-hour job to the “all green” update in at least two of three main-program runs, and make it a lead risk in at least two.</li>
                <li>Keep a headline that names the iOS status mismatch in at least two of three main-program runs.</li>
                <li>Keep precision at 75% or higher in every main-program run.</li>
                <li>On Courier, match v2&apos;s total for status mismatches across three runs, or beat it by at least one if v2 leaves room to improve.</li>
                <li>Keep every flagged decoy out of the lead risks on both programs.</li>
              </ol>
            </details>
            <p>
              V4 met four of the six criteria. It connected the six-hour job to the green update and kept the iOS
              mismatch as a lead in all three main-program runs. The six-hour job stayed in “Worth watching” every
              time. Precision fell to 74% and 71% in two runs. V4 briefs had 19 to 23 findings, up from 12 to 14 in v2.
            </p>
            <p>
              I kept v2. It already found every planted problem in both outside test programs. The extra checks
              made the main brief longer and less precise, and the new six-hour finding still stayed off the lead list.
            </p>
          </div>
        </section>

        <section className={styles.row} aria-labelledby="limits">
          <h2 id="limits" className={styles.label}>Known limits</h2>
          <ul className={`${styles.prose} ${styles.list}`}>
            <li><strong>AI-written data.</strong> All three programs are synthetic. The main program and its key were written in the same sessions. The status mismatch rule came after I saw the main-program scores, and the other two tests were too easy to show which version worked better.</li>
            <li><strong>12 of 14 is the main test&apos;s ceiling.</strong> Two hidden problems have no evidence the grader can credit from tickets or Slack, the tool&apos;s only inputs.</li>
            <li><strong>One finding earns credit for one problem.</strong> If the brief combines two problems, the grader credits one. The second can show up as a miss even when the brief describes it.</li>
          </ul>
        </section>

        {hasDemo && (
          <section className={styles.row} aria-labelledby="demo">
            <h2 id="demo" className={styles.label}>Demo video</h2>
            <video className={styles.video} src={demoVideo} controls preload="metadata" aria-label="Decision brief walkthrough" />
          </section>
        )}
      </article>
    </ModernPortfolioFrame>
  );
}
