export type ModernPageId = "home" | "about" | "interndex" | "experience" | "resume" | "work" | "involvement";

export type ExperienceRecord = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  details: string[];
};

export type PersonalRecord = {
  id: "guitar" | "running" | "films" | "training" | "baking";
  label: string;
  source: string;
  status: string;
  note: string;
  href: string | null;
};

export const modernPortfolio = {
  identity: {
    name: "David Jeanty",
    location: "Ottawa, Canada",
    citizenship: "Dual U.S.–Canadian citizen",
    school: "University of Ottawa",
    program: "Business Technology Management",
    email: "jeantydiangelo@gmail.com",
    linkedin: "https://linkedin.com/in/davidjeanty",
  },
  introduction:
    "I’m a Business Technology Management student at the University of Ottawa and an Information Management Analyst Intern at the Immigration and Refugee Board of Canada. I’m joining IBM Consulting’s Federal Practice in January 2027 and building Interndex, a job-search workspace for students.",
  currently: [
    {
      title: "Information Management Analyst Intern",
      context: "Immigration and Refugee Board of Canada",
    },
    {
      title: "Incoming Business Transformation Consulting Intern",
      context: "IBM Consulting",
    },
    {
      title: "Building Interndex",
      context: "Job-search workspace for students",
    },
  ],
  personal: [
    {
      id: "guitar",
      label: "Guitar",
      source: "Video archive",
      status: "Clips not published yet",
      note: "A place for selected playing clips, songs I am learning, and the recordings worth keeping.",
      href: null,
    },
    {
      id: "running",
      label: "Running",
      source: "Strava",
      status: "Profile link needed",
      note: "Recent runs, distance, pace, and consistency can flow into this panel once a public Strava profile is connected.",
      href: null,
    },
    {
      id: "films",
      label: "Films",
      source: "Letterboxd",
      status: "Profile link needed",
      note: "Recent watches, favourites, ratings, and the films I keep thinking about belong here.",
      href: null,
    },
    {
      id: "training",
      label: "Training",
      source: "Lift",
      status: "Profile link needed",
      note: "A compact view of recent sessions and progress, using the public data I choose to share.",
      href: null,
    },
    {
      id: "baking",
      label: "Baking",
      source: "Recipe log",
      status: "Small archive in progress",
      note: "Only the recipes I have actually made—and would make again—will appear here.",
      href: null,
    },
  ] satisfies PersonalRecord[],
  work: {
    name: "Interndex",
    description:
      "I built Interndex for students keeping their job searches in spreadsheets. Its Chrome extension saves postings in one click, and its web app keeps applications and deadlines together.",
    shortDescription:
      "Keep job postings, applications, and the context around them in one place.",
    role: "Founder and product lead",
    period: "Aug. 2026 — Present",
    tools: ["Next.js", "TypeScript", "Supabase", "Chrome extension", "MCP", "Claude Code", "Cursor", "Codex"],
    caseStudy: [
      {
        title: "What I built",
        description:
          "I took Interndex from idea to launch on my own across 70+ pull requests. I built the web app, the Chrome extension, and the Supabase backend.",
      },
      {
        title: "What I learned from users",
        description:
          "I interviewed 15 early adopters and compared existing trackers. The interviews helped me focus on students who already use AI tools to research jobs but still track their applications in spreadsheets.",
      },
      {
        title: "Why I changed the design",
        description:
          "Early tests showed that the Python parser misread fields across different job boards. I moved that step to a Model Context Protocol (MCP) integration so students can use their own AI assistant to read and save a posting.",
      },
    ],
    url: "https://www.interndex.dev",
    demoUrl: "https://www.interndex.dev/demo",
    homepageImage: "/interndex-home.png",
    demoImage: "/interndex-demo.png",
  },
  tinderProject: {
    name: "Brief Writer",
    context: "Tinder TPM project",
    year: "2026",
    description: "A Slack-based tool that turns project tickets and messages into a decision brief with evidence and options.",
    href: "/tinder",
    tools: ["Python", "Claude", "Slack"],
  },
  toolGroups: [
    { title: "Web and development", tools: ["Next.js", "React", "TypeScript", "Python", "Supabase", "GitHub", "Chrome extension", "PowerShell"] },
    { title: "Reporting and analysis", tools: ["Power BI", "Excel", "SQL", "Google Sheets"] },
    { title: "Project and CRM workflows", tools: ["Azure DevOps", "SharePoint", "Jira", "Slack", "Google Workspace", "HubSpot", "Salesforce"] },
    { title: "AI-assisted development", tools: ["Claude", "Claude Code", "Cursor", "Codex", "MCP"] },
  ],
  involvement: [
    {
      id: "ibm-pro-bono",
      organization: "IBM Pro Bono Initiative",
      role: "Pro Bono Consultant",
      period: "Sep. 2026 — Present",
      description: "I work with a five-person team advising a national nonprofit on how it handles donor and participant data. I help keep the assessment moving and make the findings useful for the client.",
      contributions: [
        "Maintain the timeline, track deliverables, and follow up on action items across the governance review and CRM assessment.",
        "Compare the nonprofit’s privacy and governance practices with 30 comparable charities and prioritize gaps by the risk to donor and participant data.",
      ],
    },
    {
      id: "telfer-bta",
      organization: "Telfer Business Technology Association",
      role: "Vice President, Internal Affairs",
      period: "Apr. 2024 — Apr. 2025",
      description: "I joined as a first-year representative and later served as VP of Internal Affairs. I helped run recruiting and onboarding, coordinate events, and work with professors, administration, and the Career Centre.",
      contributions: [
        "Helped deliver 10+ events across the year by coordinating teams, budgets, venues, and vendors.",
        "Onboarded 20 new members and helped clarify who owned what so new volunteers could get started.",
      ],
    },
  ],
  experience: [
    {
      id: "ibm",
      company: "IBM Consulting",
      role: "Incoming Business Transformation Consulting Intern",
      period: "Jan. — Apr. 2027",
      summary: "I’ll join IBM Consulting’s Federal Practice in January 2027.",
      details: [
        "Selected to support business transformation engagements for Canadian federal government clients.",
      ],
    },
    {
      id: "irb",
      company: "Immigration and Refugee Board of Canada",
      role: "Information Management Analyst Intern",
      period: "Sep. — Dec. 2026",
      summary: "I helped the IT team choose a service-request platform and give leadership a clearer view of incoming work.",
      details: [
        "Compared ServiceNow and Azure DevOps on cost, retraining, and Microsoft 365 dependencies. The director approved my recommendation, and the team uses Azure DevOps to track 250+ requests a month.",
        "Built the IT director’s first Power BI operations dashboard using 5M+ records across 50+ sites. It surfaced SharePoint as the top request category and informed staffing and training decisions.",
      ],
    },
    {
      id: "fidus",
      company: "Fidus Systems",
      role: "Marketing Analyst Intern",
      period: "May 2026 — Sep. 2026",
      summary: "I built audit workflows to help the marketing team understand how buyers discover Fidus online.",
      details: [
        "Built a Claude-assisted audit for 130+ website pages and the YouTube channel. The team adopted it as its standard, and tracked issues fell 95% over eight runs.",
        "Reviewed 46 YouTube videos and found technical webinars were rarely surfaced to buyers. The team adopted new standards for titles, descriptions, and transcripts.",
      ],
    },
    {
      id: "stranexus",
      company: "StraNexus Inc.",
      role: "Business Development & Strategy Intern",
      period: "Jan. 2026 — Apr. 2026",
      summary: "I turned recruiting goals into a university outreach plan and built the tools to manage it.",
      details: [
        "Built a workflow to evaluate 30+ university programs, cutting a week of research to one day. The firm adopted all 16 recommendations.",
        "Built a tracker with automated follow-ups for 31 institutions and led outreach to 15 priority programs across three regions.",
      ],
    },
    {
      id: "aritzia",
      company: "Aritzia",
      role: "Risk Associate",
      period: "Apr. 2024 — Aug. 2025",
      summary: "I used reporting and pattern recognition to support a high-volume retail team.",
      details: [
        "Used reporting to surface anomalies and support faster follow-up.",
        "Contributed to a $50K+ reduction in shrink.",
      ],
    },
    {
      id: "uottawa",
      company: "University of Ottawa",
      role: "Student Ambassador",
      period: "Sep. 2023 — Apr. 2024",
      summary: "I helped prospective students and families navigate the university clearly.",
      details: [
        "Delivered 75+ information sessions for prospective students and families.",
        "Managed high-volume follow-up through the university CRM.",
      ],
    },
  ] satisfies ExperienceRecord[],
  resume: {
    file: "/David_Jeanty_Resume.pdf",
    preview: "/david-matchgroup-resume-preview.png",
    label: "David Jeanty — Résumé",
    updated: "2026",
  },
  archive: {
    href: "/archive",
    label: "Previous portfolio — Windows XP",
  },
  calendar: {
    // Add { month: 1-12, day: 1-31 } when David wants to publish his birthday.
    birthday: null as null | { month: number; day: number },
  },
} as const;
