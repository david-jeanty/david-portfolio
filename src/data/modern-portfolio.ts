export type ModernPageId = "home" | "about" | "interndex" | "experience" | "resume";

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
    "I’m a Business Technology Management student at the University of Ottawa and an Information Analyst Intern at the Immigration and Refugee Board of Canada. I’m incoming at IBM and building Interndex, a job-search agent for AI-native applicants.",
  currently: [
    {
      title: "Information Analyst Intern",
      context: "Immigration and Refugee Board of Canada",
      statement: "I’m an Information Analyst Intern at the Immigration and Refugee Board of Canada.",
      shortLabel: "Current role",
    },
    {
      title: "Incoming Intern",
      context: "IBM",
      statement: "I’m incoming at IBM.",
      shortLabel: "Incoming",
    },
    {
      title: "Building Interndex",
      context: "Job-search agent for AI-native applicants",
      statement: "I’m building Interndex, a job-search agent for AI-native applicants.",
      shortLabel: "Building",
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
      "A job-search workspace and agent for AI-native applicants: save opportunities, track applications, keep deadlines and context together, and connect an MCP-compatible AI when useful.",
    shortDescription:
      "Keep job postings, applications, and the context around them in one place.",
    status: "Live · evolving",
    tools: ["Next.js", "TypeScript", "Supabase", "MCP", "Chrome extension"],
    url: "https://www.interndex.dev",
    demoUrl: "https://www.interndex.dev/demo",
    homepageImage: "/interndex-home.png",
    demoImage: "/interndex-demo.png",
  },
  experience: [
    {
      id: "ibm",
      company: "IBM",
      role: "Intern",
      period: "Incoming",
      summary: "I’ll be joining IBM as an intern.",
      details: [
        "Role details will be added when they are ready to share.",
      ],
    },
    {
      id: "irb",
      company: "Immigration and Refugee Board of Canada",
      role: "Information Analyst Intern",
      period: "Sep. 2026 — Present",
      summary: "I support the team responsible for how information is organized and accessed across the organization.",
      details: [
        "Supporting SharePoint, Power BI, and information-management initiatives.",
        "Working with the technical team that keeps organizational information accessible and organized.",
      ],
    },
    {
      id: "fidus",
      company: "Fidus Systems",
      role: "Marketing Intern",
      period: "May 2026 — Sep. 2026",
      summary: "I worked on the systems and measurement behind B2B marketing.",
      details: [
        "Audited CRM attribution and campaign performance.",
        "Helped turn a YouTube review into a defined, calculation-based audit across 46 videos.",
      ],
    },
    {
      id: "stranexus",
      company: "StraNexus Inc.",
      role: "Strategy & Operations Intern",
      period: "Jan. 2026 — Apr. 2026",
      summary: "I organized the research and reporting behind a university outreach program.",
      details: [
        "Built a structured outreach tracker across 31 university partners.",
        "Organized research, reporting, and follow-up across four practice areas.",
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
