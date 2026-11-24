import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";
import { modernPortfolio } from "@/data/modern-portfolio";
import BuildVideo from "./BuildVideo";
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

const rationale = [
  {
    id: "research",
    heading: "Did my research before the first date",
    text: "The TPM postings asked for recommendations, not just status. Agentis already assembles a PM’s weekly report, and the Recs posting asks a TPM to automate status reporting and still bring a recommended path forward. So I built for what comes after the report.",
    path: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5",
    sources: [1, 2, 5],
  },
  {
    id: "prioritization",
    heading: "Red flags go first",
    text: "High-impact, well-supported risks lead the brief, each with a deadline, options and evidence.",
    path: "M5 22V3h14l-3 4 3 4H5",
    tone: "red",
  },
  {
    id: "watch-list",
    heading: "Yellow flags get watched",
    text: "Weaker signals go to a watch list instead of the top of the brief.",
    path: "M5 22V3h14l-3 4 3 4H5",
    tone: "amber",
  },
  {
    id: "ownership",
    heading: "Ghosted",
    text: "The fraud notification due for R4 had no owner, spec or decision. Brief Writer flagged it.",
    path: "M5 20V10a7 7 0 0 1 14 0v10l-3-3-4 3-4-3-3 3Z",
  },
  {
    id: "decoys",
    heading: "Decoy checks",
    text: "I planted decoys that look scary but aren’t. None of them made it into the lead risks.",
    path: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2-6h4",
  },
  {
    id: "workflow",
    heading: "Wingman, not matchmaker",
    text: "Brief Writer posts the options in Slack, cites the records, and leaves the decision to a person, like the approval steps in Tinder’s own agent tools.",
    path: "M3 20c0-3 2-5 6-5s6 2 6 5M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-6a3 3 0 0 1 0 6m1 3c2 .4 3 2 3 5",
    sources: [6, 5],
  },
  {
    id: "recall",
    heading: "I’d rather double-text than get ghosted",
    text: "Recall over precision. A false alarm costs a few minutes. A missed risk can sink a launch.",
    path: "M4 4h16v12H9l-5 4V4Z",
  },
  {
    id: "evaluation",
    heading: "Test results",
    text: "Following Tinder’s Photo Feedback evaluation, I wrote an answer key first, then tested Brief Writer on two programs it had never seen, Ledgerline and Courier. It found every planted problem.",
    path: "m3 3 18 18M10 6a10 10 0 0 1 12 6m-3 3c-2 2-4 3-7 3-5 0-8-3-10-6 1-2 2-3 4-4",
    sources: [7],
  },
  {
    id: "bias-check",
    heading: "Got a second opinion",
    text: "A separate agent rebuilt the risk rules from public sources without seeing my main test or answer key. It surfaced about as many issues on that test.",
    path: "M16 17h-5l-4 4v-4H3V5h14v9m2 4h2V9",
  },
  {
    id: "limits",
    heading: "Known limits",
    text: "It can miss a risk when the records are sparse or the evidence is spread across threads. A live program would be the next test.",
    path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v5m0 3h.01",
  },
] as const;

function Interview({ name, email }: { name: string; email: string }) {
  return (
    <section className={styles.interview} id="interview" aria-labelledby="match-title" tabIndex={-1}>
      <h2 id="match-title">Is it a match?</h2>
      <div className={styles.matchCards}>
        <div className={styles.candidateCard} id="swipe">
          <ProfileDeck name={name} />
        </div>
        <span className={styles.matchHeart} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="29" height="29" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinejoin="round">
            <path d="M12 21 4 13a5.5 5.5 0 0 1 8-7.5 5.5 5.5 0 0 1 8 7.5Z" />
          </svg>
        </span>
        <div className={`${styles.matchCard} ${styles.roleCard}`}>
          <p>The role</p>
          <div className={styles.matchCardCopy}>
            <strong>Technical Program Management Intern</strong>
            <p>Tinder · Los Angeles · Summer 2027</p>
          </div>
        </div>
      </div>
      <p>I’d love to interview for the Technical Program Management internship in LA this summer.</p>
      <a className={styles.contactLink} href={`mailto:${email}`}>Email me</a>
    </section>
  );
}

type RationaleItem = (typeof rationale)[number];
const testingIds = ["evaluation", "decoys", "bias-check", "limits"];
const testingNotes = testingIds.flatMap((id) => rationale.filter((item) => item.id === id));
const designNotes = rationale.filter((item) => !testingNotes.includes(item));

function DecisionNotes({ items }: { items: readonly RationaleItem[] }) {
  return (
    <ul className={styles.rationale}>
      {items.map((item) => (
        <li id={item.id} key={item.id}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-tone={"tone" in item ? item.tone : undefined}
            aria-hidden="true"
          >
            <path d={item.path} />
          </svg>
          <div>
            <h3>{item.heading}</h3>
            <p>
              {item.text}
              {"sources" in item && item.sources.map((number) => (
                <span key={number}> <SourceRef number={number} /></span>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TinderPage() {
  const { name, email, linkedin } = modernPortfolio.identity;
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
      <article className={styles.profile} aria-labelledby="page-title">
        <header className={styles.caseHeader}>
          <p className={styles.kicker}>{title}</p>
          <h1 id="page-title">I built Brief Writer.</h1>
          <p className={styles.videoSummary}>A Slack tool that finds launch risks in tickets and threads, then gives leads options and the evidence to make the call.</p>
        </header>

        {hasDemo && (
          <section id="video" className={styles.videoSection} aria-label="Brief Writer walkthrough">
            <BuildVideo src={demoVideo} />
          </section>
        )}

        <section className={styles.caseStudy} aria-labelledby="case-study">
          <div className={styles.caseStudyHeading}>
            <h2 id="case-study">The case study</h2>
            <a className={styles.pdfLink} href="/brief_v2.pdf" download>Sample brief (PDF) ↓</a>
          </div>
          <p className={styles.testSummary}>Brief Writer found every planted problem in two synthetic programs it had never seen.</p>

          <details className={styles.disclosure} id="built">
            <summary>Brief Writer and sample output</summary>
            <div className={styles.disclosureBody}>
              <div className={styles.mismatch}>
                <h3 id="mismatch">Looked like a green flag.</h3>
                <dl className={styles.evidence}>
                  <div>
                    <dt>What leads heard <span className={styles.meta}>· MSG-087</span></dt>
                    <dd>iOS reported “nothing that changes dates yet.”</dd>
                  </div>
                  <div>
                    <dt>What the records showed <span className={styles.meta}>· MSG-075, PEM-111</span></dt>
                    <dd>App Review had rejected the build the day before. The attendee deck was paused and moved to the next release.</dd>
                  </div>
                </dl>
                <p>It was a red flag. Brief Writer put both side by side so leads could revisit the release scope.</p>
              </div>
              <figure>
                <Image
                  src="/brief-writer-slack.webp"
                  alt="Brief Writer’s Slack message listing decisions and conflicting status updates for Post-Event Matching"
                  width={1112}
                  height={772}
                  sizes="(min-width: 824px) 760px, 92vw"
                  className={styles.briefImage}
                />
                <figcaption>Slack output for After Party, a fictional dating app.</figcaption>
              </figure>
              <details id="sample-brief" className={styles.disclosure}>
                <summary>Read the sample brief</summary>
                <div className={styles.disclosureBody}>
                  <SampleBrief />
                </div>
              </details>
            </div>
          </details>

          <details className={styles.disclosure} id="testing">
            <summary>Testing and limitations</summary>
            <div className={styles.disclosureBody}>
              <DecisionNotes items={testingNotes} />
            </div>
          </details>

          <details className={styles.disclosure} id="design-decisions">
            <summary>Research and design decisions</summary>
            <div className={styles.disclosureBody}>
              <DecisionNotes items={designNotes} />
            </div>
          </details>

          <details className={styles.disclosure} id="sources">
            <summary>Sources</summary>
            <ol className={styles.sources}>
              {sources.map((source, index) => (
                <li id={`source-${index + 1}`} key={source.url}>
                  <a href={source.url}>{source.title}</a>
                  {"note" in source && <span className={styles.meta}> · {source.note}</span>}
                </li>
              ))}
            </ol>
          </details>

          <details className={styles.disclosure} id="why-me">
            <summary>Why me</summary>
            <dl className={styles.highlights}>
              <div>
                <dt>Decisions from data and research.</dt>
                <dd>At the IRB, I compared Azure DevOps with ServiceNow and recommended the switch the IT director approved.</dd>
              </div>
              <div>
                <dt>The big picture out of the weeds.</dt>
                <dd>Brief Writer reads every ticket and Slack thread and pulls out the few decisions leads need to make.</dd>
              </div>
              <div>
                <dt>Ruthless prioritization.</dt>
                <dd>Brief Writer puts well-supported, high-impact risks at the top and moves weaker signals to a watch list.</dd>
              </div>
            </dl>
          </details>
        </section>

        <Interview name={name} email={email} />
      </article>
    </ModernPortfolioFrame>
  );
}
