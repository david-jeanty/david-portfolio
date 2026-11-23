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

const results = [
  ["Post-Event Matching (main test)", "10 of 14", "79% to 93%", "0"],
  ["Ledgerline (never seen)", "6 of 6", "78% to 89%", "0"],
  ["Courier (never seen)", "8 of 8", "75% to 91%", "0"],
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
      </details>

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
          <div>
            <h1>AI Decision Brief Writer</h1>
            <p className={styles.heroSummary}>
              I built an AI tool that reads a program&apos;s tickets and Slack and tells leaders what they need to decide.
              The AI lays out the risks and options. The TPM makes the call.
            </p>
            <p className={`${styles.meta} ${styles.runCost}`}>
              Built in one week with Python and the Claude API. About 15 to 30 cents per brief. All program data is made up.
            </p>
          </div>
        </header>

        {hasDemo && (
          <section className={styles.row} aria-labelledby="demo">
            <h2 id="demo" className={styles.label}>Demo video</h2>
            <video className={styles.video} src={demoVideo} controls preload="metadata" aria-label="Decision brief walkthrough" />
          </section>
        )}

        <section className={styles.row} aria-labelledby="short-version">
          <h2 id="short-version" className={styles.label}>The short version</h2>
          <ul className={`${styles.prose} ${styles.list}`}>
            <li><strong>The problem:</strong> Leaders get status updates. What they need is the decision, and what each option costs.</li>
            <li><strong>What it does:</strong> Finds risks across tickets and Slack, including &quot;watermelon status&quot;: an update that says green while the team&apos;s own messages say red.</li>
            <li><strong>The result:</strong> It caught every planted problem in two test programs it had never seen (6 of 6 and 8 of 8), and 10 of 14 on the main test.</li>
            <li><strong>The call I&apos;m proudest of:</strong> I built a bigger version, set the bar before testing it, and didn&apos;t ship it. It made the brief longer without catching more.</li>
          </ul>
        </section>

        <section className={styles.row} aria-labelledby="why">
          <h2 id="why" className={styles.label}>Why I built it</h2>
          <div className={styles.prose}>
            <p>Before writing any code, I spent a day studying how Tinder builds.</p>
            <ul className={styles.list}>
              <li>
                <strong>Tinder&apos;s <a href="https://www.lifeattinder.com/blog/agents-that-prove-their-work-inside-agentis-tinders-ai-agent-platform">engineering blog</a>.</strong>{" "}
                Tinder runs about 200 internal AI agents, and one already writes a PM&apos;s weekly report. So I skipped status reports and built the next step: turning status into a decision.
              </li>
              <li>
                <strong><a href="https://jobs.lever.co/matchgroup/38a680c1-07a6-438e-9448-b677b5f044e0">Tinder&apos;s TPM job postings</a>.</strong>{" "}
                One asks for &quot;recommendations that shape decisions, not just status updates.&quot; That line became my spec.
              </li>
              <li>
                <strong>Tinder&apos;s own AI rules.</strong> From <a href="https://www.lifeattinder.com/blog/llm-features-you-can-bet-on">&quot;LLM Features You Can Bet On&quot;</a>: define what a right answer looks like before building, choose precision or recall on purpose, and study the failures. I followed all three.
              </li>
              <li>
                <strong><a href="https://www.lifeattinder.com/positions/107da1ee-5b8a-4a1b-9d75-5ba3d597116c-losangelescalifornia">The intern role itself</a>.</strong>{" "}
                Escalate risks early, and help figure out how AI fits into building product.
              </li>
              <li><strong>Coffee chats with working TPMs</strong> about what actually slows a program down.</li>
            </ul>
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

        <section className={styles.row} aria-labelledby="decisions">
          <h2 id="decisions" className={styles.label}>Decisions I made</h2>
          <ul className={`${styles.prose} ${styles.list}`}>
            <li><strong>Recall over precision.</strong> A missed risk can sink a launch. A false alarm costs a few minutes. To keep the noise down, only high-impact risks go to the top.</li>
            <li><strong>The AI never picks.</strong> It lays out options and tradeoffs. The recommendation is mine, like the human approval step in Tinder&apos;s own agent tools.</li>
            <li><strong>I checked whether my score was rigged.</strong> I wrote the test data, so I rebuilt the tool&apos;s rules from public sources only. Same score.</li>
            <li><strong>I tested on programs I&apos;d never seen.</strong> A separate AI wrote two more fake programs, and I never read their answer keys.</li>
            <li>
              <strong>I didn&apos;t ship v4.</strong> It added a fact-checker. It connected one problem v2 missed, but briefs grew from about 13 risks to about 21 and got less precise. I kept the simpler version.
              <details className={styles.disclosure}>
                <summary>Show the six criteria</summary>
                <ol className={styles.list}>
                  <li>Find at least 10 of 14 problems in every main-program run.</li>
                  <li>Connect the six-hour job to the “all green” update in at least two of three main-program runs, and make it a lead risk in at least two.</li>
                  <li>Keep a headline that names the iOS status mismatch in at least two of three main-program runs.</li>
                  <li>Keep precision at 75% or higher in every main-program run.</li>
                  <li>On Courier, match v2&apos;s total for status mismatches across three runs, or beat it by at least one if v2 leaves room to improve.</li>
                  <li>Keep every flagged decoy out of the lead risks on both programs.</li>
                </ol>
              </details>
            </li>
          </ul>
        </section>

        <section className={styles.row} aria-labelledby="sample">
          <h2 id="sample" className={styles.label}>Sample brief</h2>
          <SampleBrief />
        </section>

        <section className={styles.row} aria-labelledby="results">
          <h2 id="results" className={styles.label}>Results</h2>
          <div className={styles.prose}>
            <p className={styles.meta}>3 runs each</p>
            <BriefTable
              label="Results across the three test programs"
              columns={["Program", "Problems found", "Findings that were real", "Decoys raised as top risks"]}
              rows={results}
            />
            <p className={styles.meta}>10 of 14 is close to the ceiling: 2 problems leave no trace in tickets or Slack.</p>
          </div>
        </section>

        <section className={styles.row} aria-labelledby="limits">
          <details className={`${styles.disclosure} ${styles.limits}`}>
            <summary id="limits">Limits</summary>
            <ul className={`${styles.prose} ${styles.list}`}>
              <li>All three programs are made up, and AI wrote them. Real Slack is messier.</li>
              <li>I wrote the main test myself. That&apos;s why I added the outside tests.</li>
              <li>When a status update and the problem it hides sit in different threads, the tool doesn&apos;t always connect them. That&apos;s what I&apos;d fix next.</li>
            </ul>
          </details>
        </section>
      </article>
    </ModernPortfolioFrame>
  );
}
