export type DesktopIconId =
  | "resume"
  | "about"
  | "experience"
  | "workbench"
  | "contact"
  | "internal-only"
  | "internal-media";

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  secondaryRoleLine?: string;
  metric?: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
  };
  summary: string;
  bullets: string[];
  translation: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    degree: string;
    institution: string;
  };
  about: {
    headlineLines: string[];
    paragraph: string;
    strengths: string[];
    currentFocus: string[];
    professionalGoals: string[];
    extracurriculars: string[];
    personal: {
      summary: string;
      hobbies: string[];
      askMeAbout: string;
    };
  };
  experience: ExperienceItem[];
  workbench: {
    title: string;
    sections: Array<{
      id:
        | "currently-using"
        | "currently-learning"
        | "recent-builds"
        | "projects-in-progress"
        | "next-builds";
      label: string;
      summary: string;
      items: Array<{
        name: string;
        status: "using" | "learning" | "built" | "in-progress" | "planned";
        summary: string;
        rationale: string;
        roleConnection: string;
        featured?: boolean;
        link?: {
          label: string;
          url: string;
        };
      }>;
    }>;
  };
  contact: {
    email: string;
    linkedin: string;
    location: string;
    availability: string;
    preferredIntro: string;
    responseNote: string;
  };
  desktop: {
    resumeFileName: string;
    icons: Array<{
      id: DesktopIconId;
      label: string;
      hidden?: boolean;
    }>;
  };
}

export const portfolioData: PortfolioData = {
  identity: {
    name: "David Jeanty",
    title: "BCom Student | AI Enablement, CRM, Strategy & Operations",
    tagline:
      "Bridging business, technology, and operations through practical systems thinking.",
    location: "Ottawa, Ontario, Canada",
    degree: "BCom, Honours Business Technology Management (French Immersion)",
    institution: "University of Ottawa",
  },
  about: {
    headlineLines: [
      "Clear systems over scattered effort.",
      "Practical technology over flashy complexity.",
      "Reliable follow-through from idea to execution.",
    ],
    paragraph:
      "I am a Business Technology Management student at the University of Ottawa focused on AI enablement, CRM, strategy, and operations. I recently joined the Information & Data Management technical team at the Immigration and Refugee Board of Canada, supporting SharePoint, Power BI, and related Information Management initiatives. Before that, I audited CRM pipelines and campaign performance at Fidus Systems and built outreach reporting at StraNexus. Across all of it, I focus on making information clearer, workflows easier to manage, and next steps more reliable.",
    strengths: [
      "I break down messy workflows into simple steps, owners, and next actions.",
      "I use CRM habits, reporting, and documentation to keep work visible and easier to manage.",
      "I communicate clearly across stakeholders when priorities, timing, and details need to stay aligned.",
    ],
    currentFocus: [
      "Learning how AI tools can support better documentation, follow-up, reporting, and internal workflows.",
      "Building stronger Power BI, SharePoint, and SQL fluency for information management and reporting work.",
      "Looking for teams where strategy, systems thinking, and practical execution all matter.",
    ],
    professionalGoals: [
      "Build an early-career foundation in business analysis, operations, or customer-facing systems work.",
      "Join teams where reporting, CRM workflows, and stakeholder communication all matter.",
      "Keep getting better at making execution simpler, clearer, and more dependable.",
    ],
    extracurriculars: [
      "Vice President, Internal Affairs at the Telfer Business Technology Association",
      "Director, Marketing (Social Media) at the Telfer Business Technology Association",
      "Student Ambassador supporting campus tours and CRM-based student follow-up",
    ],
    personal: {
      summary:
        "Outside of work and school, I usually gravitate toward hobbies that reward patience, consistency, curiosity, and gradual improvement. They help me slow down, stay grounded, and enjoy the process instead of rushing to the result.",
      hobbies: ["Guitar", "Baking", "Running", "Being slow at running", "Travel", "Vibecoding"],
      askMeAbout:
        "Baking has become the most fun one to talk about lately, especially brown butter ube cookies and whatever dessert I am trying to improve next.",
    },
  },
  experience: [
    {
      id: "irb",
      company: "Immigration and Refugee Board of Canada",
      role: "Information Management Services Assistant",
      period: "Sep. 2026 - Present",
      summary:
        "Recently joined the Information & Data Management technical team, supporting the systems and initiatives that keep organizational information organized and accessible.",
      bullets: [
        "Supporting SharePoint, Power BI, and related Information Management initiatives as part of the Information & Data Management technical team.",
      ],
      translation:
        "information management, SharePoint, Power BI, data management, public sector operations",
    },
    {
      id: "fidus",
      company: "Fidus Systems",
      role: "Marketing Intern",
      period: "May 2026 - Sep. 2026",
      metric: {
        value: 46,
        suffix: " videos audited",
        label: "YouTube AI-Readiness Audit",
      },
      summary:
        "Audited marketing systems and campaign performance in a mid-sized B2B technology environment, turning findings into clear recommendations for marketing leadership.",
      bullets: [
        "Audited the HubSpot-Salesforce lead pipeline, finding broken campaign attribution and an automation tool reinstalled three times in seven weeks, and recommended pausing the project when missing Salesforce access prevented a complete implementation.",
        "Compared a LinkedIn campaign with historical performance, found CPM was 15-20 times higher than the previous benchmark, and summarized the findings and recommended changes for marketing leadership.",
        "Worked with marketing management to refine a six-pillar YouTube audit, replacing qualitative scoring with defined calculations and adding an AI-readiness analysis across 46 videos.",
      ],
      translation:
        "CRM auditing, campaign performance analysis, marketing operations, AI readiness, B2B technology marketing",
    },
    {
      id: "stranexus",
      company: "StraNexus Inc.",
      role: "Strategy & Operations Intern",
      period: "Jan. 2026 - Apr. 2026",
      metric: {
        value: 45,
        suffix: "% pipeline growth",
        label: "B2B Talent Pipeline",
      },
      summary:
        "Built the research and reporting side of StraNexus's university outreach, keeping partner data, follow-up, and priorities organized across 31 university partners.",
      bullets: [
        "Researched 60+ post-secondary programs across Ontario, Michigan, and New York, building a structured outreach tracker that expanded the B2B talent pipeline by 45% across 31 university partners.",
        "Managed outreach reporting across four practice areas and 17 industry sectors, reducing the time required to identify and contact university partners by 20%.",
      ],
      translation:
        "strategy, stakeholder outreach, recruitment operations, process design, structured execution",
    },
    {
      id: "aritzia",
      company: "Aritzia",
      role: "Risk Associate",
      period: "Apr. 2024 - Aug. 2025",
      metric: {
        value: 50,
        prefix: "$",
        suffix: "K+ reduced",
        label: "Shrinkage Reduction",
      },
      summary:
        "Worked in a high-volume retail environment where I tracked KPIs, reviewed trends, and followed up on operational issues before they became bigger problems.",
      bullets: [
        "Used Excel-based reporting tools to compare results against benchmarks, surface anomalies, and support faster action.",
        "Contributed to a $50K+ reduction in shrink while supporting consistency across a 1,000+ weekly-client operation and a 50+ person team.",
      ],
      translation:
        "operational analytics, anomaly detection, risk/compliance thinking, process improvement",
    },
    {
      id: "student-ambassador",
      company: "University of Ottawa",
      role: "Student Ambassador",
      period: "Sep. 2023 - Apr. 2024",
      metric: {
        value: 2500,
        suffix: "+ students engaged",
        label: "Campus Outreach",
      },
      summary:
        "Served as a front-line point of contact for uOttawa, helping prospective students and families make sense of programs, services, and next steps.",
      bullets: [
        "Delivered 75+ information sessions and managed high-volume follow-up through the university's CRM with organized, accurate communication.",
        "Worked in a role where clarity, responsiveness, and keeping details from slipping through the cracks mattered every day.",
      ],
      translation:
        "stakeholder communication, CRM workflow, information triage, clear client-facing guidance",
    },
    {
      id: "tbta",
      company: "Telfer Business Technology Association",
      role: "Vice President, Internal Affairs",
      period: "Apr. 2024 - Apr. 2025",
      secondaryRoleLine: "First Year Representative · Sep. 2023 - Apr. 2024",
      metric: {
        value: 20,
        suffix: " hired",
        label: "Team Members Recruited",
      },
      summary:
        "Helped run the internal side of a 100+ member student association, supporting communication, coordination, and follow-through across the team.",
      bullets: [
        "Worked with professors, administration, and the Career Centre while helping keep internal processes organized.",
        "Supported the delivery of 10+ events annually through planning, logistics, and execution follow-up.",
      ],
      translation:
        "internal operations, hiring coordination, team support, stakeholder alignment",
    },
  ],
  workbench: {
    title: "Workbench",
    sections: [
      {
        id: "currently-using",
        label: "Currently Using",
        summary:
          "Tools and habits I already rely on to keep reporting, coordination, and day-to-day execution organized.",
        items: [
          {
            name: "SharePoint",
            status: "using",
            summary: "Used to support Information Management initiatives at the Immigration and Refugee Board of Canada, where shared documents and knowledge need to stay organized.",
            rationale: "A lot of organizational knowledge lives in SharePoint, so clear structure makes it easier for people to find what they need.",
            roleConnection: "Supports information management, cleaner document organization, and easier access to shared knowledge.",
          },
          {
            name: "Power BI",
            status: "using",
            summary: "Used for dashboard development and data visualization, including Information Management work at the Immigration and Refugee Board of Canada.",
            rationale: "Good dashboards make performance easier to read at a glance and easier to act on.",
            roleConnection: "Supports clearer reporting when people need to spot issues and act quickly.",
          },
          {
            name: "HubSpot CRM",
            status: "using",
            summary: "Used for CRM tracking, contact organization, lead context, and keeping marketing or outreach activity structured.",
            rationale: "It is a practical system for connecting campaign activity, stakeholder context, and next-step visibility.",
            roleConnection: "Supports cleaner CRM records, better campaign context, and more organized sales-to-marketing workflows.",
          },
          {
            name: "Salesforce",
            status: "using",
            summary: "Used and studied for CRM structure, reporting logic, pipeline visibility, and customer-facing workflow design.",
            rationale: "It is one of the clearest platforms for understanding how teams organize accounts, activity, reporting, and handoffs.",
            roleConnection: "Supports CRM visibility, workflow design, reporting habits, and better customer-facing operations.",
          },
          {
            name: "Jira",
            status: "using",
            summary: "Used to organize work, document requirements, track tickets, and make project status easier to understand.",
            rationale: "It gives teams a clearer way to move from requests and feedback into visible, trackable execution.",
            roleConnection: "Supports project coordination, requirements tracking, workflow visibility, and implementation follow-through.",
          },
          {
            name: "Claude",
            status: "using",
            summary: "Used for AI-assisted workflow thinking, research synthesis, drafting, documentation, and exploring practical business use cases.",
            rationale: "It helps turn scattered context into clearer drafts, plans, and structured outputs without losing the business goal.",
            roleConnection: "Supports AI enablement, knowledge retrieval, workflow experimentation, and clearer communication.",
          },
          {
            name: "Excel",
            status: "using",
            summary: "Used for KPI tracking, report review, and structured analysis with tools like PivotTables, VLOOKUP/XLOOKUP, and conditional formatting.",
            rationale: "It is still useful for turning operational activity into something measurable, organized, and easy to review.",
            roleConnection: "Supports reporting, visibility, and cleaner analysis when business data needs structure.",
          },
          {
            name: "Google Sheets / Google Workspace",
            status: "using",
            summary: "Used for shared reporting, documentation, team coordination, and keeping information visible across day-to-day workflows.",
            rationale: "It supports shared work when notes, trackers, and documents need to stay accessible.",
            roleConnection: "Useful when work depends on shared visibility, handoffs, and people staying aligned.",
          },
        ],
      },
      {
        id: "currently-learning",
        label: "Currently Learning",
        summary:
          "Skills I am actively building because they translate well into reporting, CRM, and operations-heavy roles.",
        items: [
          {
            name: "SQL",
            status: "learning",
            summary: "Building stronger query fluency so I can move from spreadsheet-based analysis into more scalable reporting workflows.",
            rationale: "I want to get better at pulling the right information directly and using it to answer practical business questions.",
            roleConnection: "Useful when reporting needs to scale beyond spreadsheets without losing clarity.",
          },
        ],
      },
      {
        id: "recent-builds",
        label: "Recent Builds",
        summary:
          "Projects I finished recently, each one built around a real workflow problem.",
        items: [
          {
            name: "Interndex",
            status: "built",
            summary: "Built and deployed an internship-tracking platform that captures job postings through a Chrome extension and converts them into structured, searchable application records.",
            rationale: "I defined the application workflows, access rules, and AI interactions (MCP), then tested the product across job sites to improve capture accuracy and reliability.",
            roleConnection: "Supports product thinking, workflow design, and testing a full-stack application end to end.",
            featured: true,
            link: {
              label: "Open Interndex",
              url: "https://www.interndex.dev",
            },
          },
          {
            name: "Web Audit Tool (SEO/GEO/AEO)",
            status: "built",
            summary: "Built a research-based audit that evaluated 130-135 website pages across SEO, GEO, and AEO, combining PowerShell crawl data with Google Search Console and PageSpeed Insights findings.",
            rationale: "Raised the internal audit score from 64 to 88/100 and reduced tracked issues from 240 to 11 across eight audit runs by prioritizing, implementing, and verifying website fixes.",
            roleConnection: "Supports technical analysis, issue prioritization, and verifying that fixes hold up over repeated runs.",
          },
          {
            name: "Reddit Workflow",
            status: "built",
            summary: "Built a three-stage AI workflow in Claude Code (skill chaining) that triages manually sourced Reddit threads, drafts replies, and extracts relevant case studies for review.",
            rationale: "Triaged 50+ threads during the first test, producing 15 qualifying draft replies and keeping human approval mandatory before anything could be posted.",
            roleConnection: "Supports AI enablement, human-in-the-loop review, and repeatable engagement workflows.",
          },
        ],
      },
      {
        id: "projects-in-progress",
        label: "Projects in Progress",
        summary:
          "Projects that show where my curiosity is going right now and how I like to turn ideas into systems.",
        items: [
          {
            name: "University workflow / grade tracker",
            status: "in-progress",
            summary: "A side project for keeping courses, deadlines, grades, and academic progress easier to track in one place.",
            rationale: "It comes from the same habit I bring to work: if a system feels messy, I usually want to make it clearer and easier to use.",
            roleConnection: "Supports personal organization, clearer visibility, and less friction in everyday planning.",
          },
        ],
      },
    ],
  },
  contact: {
    email: "jeantydiangelo@gmail.com",
    linkedin: "linkedin.com/in/davidjeanty",
    location: "Ottawa, Ontario, Canada",
    availability:
      "Open to BA, product operations, and tech consulting opportunities in the Kanata North ecosystem and beyond.",
    preferredIntro:
      "Best fit: business analysis, operations, CRM workflow, and customer-facing coordination roles.",
    responseNote:
      "Email is the fastest way to reach me. I am happy to share my resume, talk through my experience, or compare notes on where I could add value quickly.",
  },
  desktop: {
    resumeFileName: "David_Jeanty_Resume.pdf",
    icons: [
      { id: "resume", label: "Resume.pdf" },
      { id: "experience", label: "Experience" },
      { id: "about", label: "About Me" },
      { id: "contact", label: "Contact" },
      { id: "workbench", label: "Workbench" },
      { id: "internal-only", label: "Internal" },
      { id: "internal-media", label: "Internal Media", hidden: true },
    ],
  },
};
