import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import ModernPortfolioFrame from "@/components/portfolio/ModernPortfolioFrame";
import { modernPortfolio } from "@/data/modern-portfolio";
import BuildVideo from "./BuildVideo";
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
const briefPdf = "/after-party-decision-brief.pdf";

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
    heading: "What Tinder’s job posts and blog asked for",
    text: "Tinder’s TPM postings ask for recommendations, and one asks TPMs to automate status reporting and still bring a recommended path forward. Tinder’s blog shows its AI agent platform, Agentis, already writes a PM’s weekly report. So I built for the step after the report: deciding what to do.",
    path: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5",
    sources: [1, 2, 5],
  },
  {
    id: "prioritization",
    heading: "The biggest risks come first",
    text: "High-impact, well-supported risks lead the brief, each with a deadline, options and evidence.",
    path: "M5 22V3h14l-3 4 3 4H5",
    tone: "red",
  },
  {
    id: "watch-list",
    heading: "Smaller risks go on a watch list",
    text: "Weaker signals go to a watch list instead of the top of the brief.",
    path: "M5 22V3h14l-3 4 3 4H5",
    tone: "amber",
  },
  {
    id: "ownership",
    heading: "It flags work nobody owns",
    text: "The fraud alert that was supposed to ship with the Nov 23 launch had no owner, spec or decision. Brief Writer flagged it.",
    path: "M5 20V10a7 7 0 0 1 14 0v10l-3-3-4 3-4-3-3 3Z",
  },
  {
    id: "decoys",
    heading: "It ignored problems that only looked serious",
    text: "I also planted fake problems that look serious at first glance. None of them showed up as top risks.",
    path: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2-6h4",
  },
  {
    id: "workflow",
    heading: "A person makes every decision",
    text: "Brief Writer posts the options in Slack, cites the records, and leaves the decision to a person, like the approval steps in Tinder’s own agent tools.",
    path: "M3 20c0-3 2-5 6-5s6 2 6 5M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-6a3 3 0 0 1 0 6m1 3c2 .4 3 2 3 5",
    sources: [6, 5],
  },
  {
    id: "recall",
    heading: "It leans toward flagging too much",
    text: "I tuned it to flag anything that might be a risk. A false alarm takes a few minutes to dismiss. A missed risk can delay a launch.",
    path: "M4 4h16v12H9l-5 4V4Z",
  },
  {
    id: "evaluation",
    heading: "Tested on programs it had never seen",
    text: "Following Tinder’s Photo Feedback evaluation, I wrote an answer key first, then tested Brief Writer on two programs it had never seen, Ledgerline and Courier. It found every planted problem.",
    path: "m3 3 18 18M10 6a10 10 0 0 1 12 6m-3 3c-2 2-4 3-7 3-5 0-8-3-10-6 1-2 2-3 4-4",
    sources: [7],
  },
  {
    id: "bias-check",
    heading: "A separate check on my own test",
    text: "To make sure I hadn’t tuned it to my own test, a separate AI agent rebuilt the risk rules from public sources without seeing my test or answer key. Its version found about as many problems.",
    path: "M16 17h-5l-4 4v-4H3V5h14v9m2 4h2V9",
  },
  {
    id: "limits",
    heading: "Where it can miss things",
    text: "It can miss a risk when the records are sparse or the evidence is spread across threads. A live program would be the next test.",
    path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v5m0 3h.01",
  },
] as const;

// Each part of the role, in the internship post's own words, with the evidence for it.
const fit = [
  {
    part: "Keep everyone in the know",
    role: "clear weekly status updates, with issues flagged early.",
    did: "Brief Writer reads a week of tickets and Slack messages and writes one brief for the leads channel. It opens with the decisions leads need to make, each with a deadline.",
  },
  {
    part: "Turn big ideas into real plans",
    role: "track dependencies and call out what’s at risk before it slips.",
    did: "In my test program, the backend team changed how the app loads event attendees and told only the iPhone team. Brief Writer caught that the Android app still used the old version, which the same release removes, and made it the top risk.",
  },
  {
    part: "Partner across teams",
    role: "chase down action items and remove blockers.",
    did: "Legal added a requirement for an in-app fraud alert, but its ticket had no owner, spec or release date. Brief Writer flagged it, laid out the options, and asked leads to name an owner before the launch review.",
  },
  {
    part: "Drive best practices, including AI",
    role: "improve how work moves from idea to launch, including where AI fits in.",
    did: "In Brief Writer, AI drafts the brief, and the TPM reviews it and adds a recommendation before it goes to leads. At the IRB, I compared Azure DevOps with ServiceNow and recommended the switch the IT director approved.",
  },
];

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
        <div className={styles.hero}>
        <header className={styles.caseHeader}>
          <p className={styles.kicker}>{title}</p>
          <h1 id="page-title">What I’d bring to Tinder’s TPM internship</h1>
          <p className={styles.videoSummary}>I keep teams informed, catch risks before they slip, get the right people to a decision, and use AI to do it faster. To show it, I studied Tinder’s TPM job posts and engineering blog, then built Brief Writer, an AI tool in Slack that reads a team’s tickets and messages and drafts a decision brief for leads.</p>
        </header>

        {hasDemo && (
          <section id="video" className={styles.videoSection} aria-label="Brief Writer walkthrough">
            <BuildVideo src={demoVideo} />
          </section>
        )}
        </div>

        <section className={walkthroughStyles.walkthrough} id="walkthrough" aria-labelledby="walkthrough-title">
          <div className={walkthroughStyles.heading}>
            <div>
              <h2 id="walkthrough-title">Inside After Party</h2>
              <p className={walkthroughStyles.intro}>These are real screenshots from the Slack workspace I built to test Brief Writer, in the order a TPM would use it.</p>
            </div>
            <a className={walkthroughStyles.briefLink} href={briefPdf} target="_blank" rel="noopener">Read the full brief (PDF) ↗</a>
          </div>
          <Walkthrough steps={walkthroughSteps} />
        </section>

        <div className={styles.closing}>
        <section className={styles.caseStudy} aria-labelledby="case-study">
          <div className={styles.caseStudyIntro}>
            <h2 id="case-study">How I built and tested it</h2>
            <p className={styles.testSummary}>Brief Writer found every problem I planted in two made-up programs it had never seen.</p>
          </div>

          <div className={styles.casePanels}>

          <details className={styles.disclosure} name="case-study" id="testing">
            <summary>How I tested it, and where it falls short</summary>
            <div className={styles.disclosureBody}>
              <DecisionNotes items={testingNotes} />
            </div>
          </details>

          <details className={styles.disclosure} name="case-study" id="design-decisions">
            <summary>The research behind it and the choices I made</summary>
            <div className={styles.disclosureBody}>
              <DecisionNotes items={designNotes} />
            </div>
          </details>

          <details className={styles.disclosure} name="case-study" id="why-me">
            <summary>How I match each part of the role</summary>
            <div className={styles.disclosureBody}>
              <p className={styles.fitIntro}>The internship post describes four parts of the job. For each one, here’s what the role asks for and what I’ve done.</p>
              <ol className={styles.fit}>
                {fit.map(({ part, role, did }) => (
                  <li key={part}>
                    <h3>{part}</h3>
                    <p><span className={styles.fitLabel}>The role:</span> {role}</p>
                    <p><span className={styles.fitLabel}>What I did:</span> {did}</p>
                  </li>
                ))}
              </ol>
            </div>
          </details>
          </div>
        </section>

        <Interview name={name} email={email} />
        </div>

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
