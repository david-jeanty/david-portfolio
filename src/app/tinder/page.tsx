import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";
import { modernPortfolio } from "@/data/modern-portfolio";
import BuildVideo from "./BuildVideo";
import FullBrief from "./FullBrief";
import ProfileDeck from "./ProfileDeck";
import styles from "./tinder.module.css";
import Walkthrough from "./Walkthrough";
import { walkthroughSteps } from "./walkthrough-steps";
import walkthroughStyles from "./walkthrough.module.css";

const title = "David Jeanty for Tinder";

export const metadata: Metadata = {
  title,
  description: "David Jeanty’s Technical Program Management internship application and the decisions behind Brief Writer.",
  robots: { index: false, follow: false },
};

const demoVideo = "/decision-brief-demo.mp4";

const sources = [
  { title: "Technical Program Management Intern", url: "https://jobs.lever.co/matchgroup/107da1ee-5b8a-4a1b-9d75-5ba3d597116c" },
  { title: "Sr. TPM, Recs, Revenue, and Engagement", url: "https://jobs.lever.co/matchgroup/4a1ba25e-109a-44b8-b330-6f6ef31e9171" },
  { title: "Sr. TPM, Events (IRL)", url: "https://lifeattinder.com/positions/38a680c1-07a6-438e-9448-b677b5f044e0-losangelescalifornia", note: "(role filled)" },
  { title: "Sr. TPM, Trust & Safety", url: "https://lifeattinder.com/positions/b263e3b8-adc5-4b7c-aceb-28aae688b9d3-losangelescalifornia" },
  { title: "Agents That Prove Their Work: Inside Agentis", url: "https://lifeattinder.com/blog/agents-that-prove-their-work-inside-agentis-tinders-ai-agent-platform" },
  { title: "Merlin: The Tinder Harness Around AI Coding Agents", url: "https://lifeattinder.com/blog/merlin-the-tinder-harness" },
  { title: "When Your Model Hates Helicopters", url: "https://lifeattinder.com/blog/llm-features-you-can-bet-on" },
] as const;

function SourceRef({ number }: { number: number }) {
  return <a className={styles.sourceRef} href={`#source-${number}`} aria-label={`Source ${number}`}>[{number}]</a>;
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
    text: "The fraud alert that was supposed to ship with the Nov 23 launch had no owner, spec or decision. Brief Writer flagged it.",
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
          <h1 id="page-title">I read Tinder’s TPM job posts and built what they ask for.</h1>
          <p className={styles.videoSummary}>Brief Writer turns team updates into decisions, with options and evidence.</p>
        </header>

        {hasDemo && (
          <section id="video" className={styles.videoSection} aria-label="Brief Writer walkthrough">
            <BuildVideo src={demoVideo} />
          </section>
        )}

        <section className={walkthroughStyles.walkthrough} id="walkthrough" aria-labelledby="walkthrough-title">
          <h2 id="walkthrough-title">Inside After Party</h2>
          <p className={walkthroughStyles.intro}>These are real screenshots from the Slack workspace I built to test Brief Writer, in the order a TPM would use it.</p>
          <Walkthrough steps={walkthroughSteps} />
          <FullBrief />
        </section>

        <section className={styles.caseStudy} aria-labelledby="case-study">
          <div className={styles.caseStudyHeading}>
            <h2 id="case-study">The case study</h2>
            <a className={styles.pdfLink} href="/brief_v2.pdf" download>Sample brief (PDF) ↓</a>
          </div>
          <p className={styles.testSummary}>Brief Writer found every problem I planted in two made-up programs it had never seen.</p>

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

        <div className={walkthroughStyles.sources} id="sources">
          <h3>Sources</h3>
          <ol className={walkthroughStyles.sourceList}>
            {sources.map((source, index) => (
              <li id={`source-${index + 1}`} key={source.url}>
                <a href={source.url}>{source.title}</a>
                {"note" in source && <span className={styles.meta}> {source.note}</span>}
              </li>
            ))}
          </ol>
          <p className={walkthroughStyles.accessed}>Accessed Nov 2026</p>
        </div>
      </article>
    </ModernPortfolioFrame>
  );
}
