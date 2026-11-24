import pins from "./walkthrough-pins.json";

type PinFile = keyof typeof pins;

export type WalkthroughPin = { label: string; box: number[] };

export type WalkthroughStep = {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  pins: WalkthroughPin[];
};

const steps: { file: PinFile; id: string; title: string; caption: string; alt: string }[] = [
  {
    file: "slack-01-sidebar",
    id: "company",
    title: "The company",
    caption:
      "I don't have access to Tinder's data, so I made up a dating app called After Party to test with. It has its own Slack workspace, with a channel for each team and one for the leads.",
    alt: "Slack sidebar for the Afterparty workspace, listing channels including pem-backend, pem-ios, pem-leads, post-event-matching and release-train.",
  },
  {
    file: "slack-02-team-channel",
    id: "teams",
    title: "The teams",
    caption:
      "Each team has a channel where people post quick updates as they work. These are the backend engineers on Post-Event Matching, a feature that matches people who went to the same event.",
    alt: "Four messages in the backend team channel: a question about cold brew, a ticket running in staging, a cleanup change queued for the next release, and a ticket in review. Each is tagged Backend Engineer.",
  },
  {
    file: "slack-03-busy-channel",
    id: "noise",
    title: "The noise",
    caption:
      "A TPM reads updates like these across every channel, plus the tickets behind them. Most are routine, but some change the plan. The last one says the iPhone version of the screen that shows who else was at the event won't make the Nov 23 launch.",
    alt: "Four messages in the post-event-matching channel from a localization specialist, a data scientist, a localization lead and a trust and safety engineer, ending with a note that the iPhone version of the event screen isn't in the Nov 23 launch.",
  },
  {
    file: "slack-04-brief-top",
    id: "brief",
    title: "The brief",
    caption:
      "Brief Writer reads the tickets and messages and posts one brief in the leads channel. It starts with the decisions the leads need to make and the deadline for each one.",
    alt: "Brief Writer's Slack post titled Decision brief: Post-Event Matching, with a numbered list of decisions needed and a deadline after each one.",
  },
  {
    file: "slack-05-brief-evidence",
    id: "evidence",
    title: "The evidence",
    caption:
      "Each decision gets its own reply in the thread. It explains the risk, rates the impact and how sure it is, and lists the exact tickets and messages it's based on, so anyone can check.",
    alt: "Brief Writer's thread reply about the Android version of the event screen using an old data connection that the next release removes, followed by Impact, Confidence and Evidence lines listing ticket and message IDs.",
  },
  {
    file: "slack-06-mismatch",
    id: "catch",
    title: "The catch",
    caption:
      "It also compares what people say in their updates with what the tickets actually show. Here, leads were told the iPhone team had nothing changing dates, but the tickets show Apple rejected the build and that screen had already slipped a week, to Nov 30. Brief Writer flags the gap.",
    alt: "A section of the brief titled Where status and the record disagree, with two bullets, one saying leads were told the iPhone team had nothing changing dates while that screen was already on hold.",
  },
  {
    file: "slack-07-options",
    id: "options",
    title: "A person makes the call",
    caption:
      "Brief Writer lays out the options, with an upside and a downside for each. Then the TPM adds a recommendation, and the leads make the final call, so a person always decides, not the bot.",
    alt: "The Options part of a brief reply, listing options A, B and C, each with an upside and a downside.",
  },
  {
    file: "slack-08-unseen-brief",
    id: "testing",
    title: "How I tested it",
    caption:
      "To test it, I borrowed an approach from Tinder's Photo Feedback team: build examples where you already know the answer. I planted problems in two programs Brief Writer had never seen, wrote the answer key first, and it found every problem in both.",
    alt: "The top of a decision brief for Ledgerline, a test program Brief Writer had never seen, with a numbered list of decisions needed.",
  },
];

export const walkthroughSteps: WalkthroughStep[] = steps.map(({ file, ...step }) => ({
  ...step,
  src: `/images/tinder/walkthrough/${file}.webp`,
  width: pins[file].width,
  height: pins[file].height,
  pins: pins[file].pins,
}));
