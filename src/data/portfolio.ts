export type DesktopIconId =
  | "resume"
  | "about"
  | "experience"
  | "workbench"
  | "contact"
  | "games"
  | "internal-only"
  | "internal-media";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  metric: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
  };
  summary: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    languages: string[];
    degree: string;
    institution: string;
  };
  about: {
    headlineLines: string[];
    paragraph: string;
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
      id: "currently-using" | "currently-learning" | "projects-in-progress" | "next-builds";
      label: string;
      items: Array<{
        name: string;
        status: "using" | "learning" | "in-progress" | "planned";
        summary: string;
        rationale: string;
        roleConnection: string;
        featured?: boolean;
      }>;
    }>;
  };
  contact: {
    email: string;
    linkedin: string;
    location: string;
    availability: string;
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
    title: "Business Analyst & Tech Consultant",
    tagline:
      "I like making messy operations easier to run.",
    location: "Ottawa, ON",
    languages: ["English", "French"],
    degree: "BCom, Business Technology Management",
    institution: "University of Ottawa",
  },
  about: {
    headlineLines: [
      "Reporting, follow-up, and fewer dropped balls.",
      "CRM workflows, clean handoff, and communication that actually helps.",
      "A BTM student learning by doing.",
    ],
    paragraph:
      "I am a Business Technology Management student at the University of Ottawa with experience in KPI tracking, CRM-based follow-through, stakeholder communication, and structured work in fast-paced environments.",
    professionalGoals: [
      "Build a strong early-career foundation in operations, business systems, or customer-facing process work.",
      "Work on teams where reporting, CRM workflows, and stakeholder communication all matter.",
      "Keep getting better at turning messy workflows into clearer, more reliable execution.",
    ],
    extracurriculars: [
      "Vice President, Internal Affairs at the Telfer Business Technology Association",
      "Student Ambassador supporting campus tours and CRM-based student follow-up",
      "Claude Builder Club @ uOttawa initiative",
    ],
    personal: {
      summary:
        "Outside of work and school, I usually gravitate toward hobbies and interests that reward patience, consistency, curiosity, and gradual improvement. They help me slow down, stay grounded, and enjoy the process.",
      hobbies: ["Guitar", "Baking", "Running", "Travel"],
      askMeAbout:
        "Baking has probably become the most fun one to talk about lately - ask me about my brown butter ube cookies.",
    },
  },
  experience: [
    {
      company: "StraNexus Inc.",
      role: "Strategy & Operations Intern",
      period: "Jan. 2026 - Apr. 2026",
      metric: {
        value: 16,
        suffix: " pipelines mapped",
        label: "Academic Recruitment Strategy",
      },
      summary:
        "Built and managed the workflow side of StraNexus's outreach effort, keeping contact data, follow-up, and reporting organized across 31 universities and 15 Ontario programs.",
    },
    {
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
    },
    {
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
    },
    {
      company: "Telfer Business Technology Association",
      role: "Vice President, Internal Affairs",
      period: "Apr. 2024 - Apr. 2025",
      metric: {
        value: 20,
        suffix: " hired",
        label: "Team Members Recruited",
      },
      summary:
        "Helped run the internal side of a 100+ member student association, supporting communication, coordination, and follow-through across the team.",
    },
  ],
  workbench: {
    title: "Workbench",
    sections: [
      {
        id: "currently-using",
        label: "Currently Using",
        items: [
          {
            name: "Excel",
            status: "using",
            summary: "Used for KPI tracking, report review, and structured analysis with tools like PivotTables, VLOOKUP/XLOOKUP, and conditional formatting.",
            rationale: "It is still my clearest tool for turning operational activity into something measurable, organized, and easy to review.",
            roleConnection: "Supports reporting, visibility, and cleaner follow-through when there are a lot of moving parts.",
          },
          {
            name: "Google Sheets / Google Workspace",
            status: "using",
            summary: "Used for shared reporting, documentation, team coordination, and keeping information visible across day-to-day workflows.",
            rationale: "A lot of good execution depends on clear handoff, organized notes, and documents people can actually use.",
            roleConnection: "Useful when work depends on shared visibility, handoffs, and people staying aligned.",
          },
          {
            name: "CRM platforms",
            status: "using",
            summary: "Used to manage inquiries, outreach, follow-up, and contact records in a more organized and trackable way.",
            rationale: "I am interested in systems that help teams stay responsive without losing details or letting next steps slip.",
            roleConnection: "Helps keep inquiries, follow-up, and contact records from getting messy.",
          },
          {
            name: "Microsoft Outlook",
            status: "using",
            summary: "Used for professional communication, calendar coordination, and keeping email-based follow-up organized.",
            rationale: "It is a simple but important part of how communication, timing, and next steps stay on track.",
            roleConnection: "Supports day-to-day communication, timing, and follow-up when a lot of coordination happens by email.",
          },
          {
            name: "Pipeline / follow-up tracking",
            status: "using",
            summary: "Used to keep status updates, outreach sequencing, and next actions clear across multiple contacts and moving parts.",
            rationale: "I like workflows that make progress visible and make follow-through easier to maintain.",
            roleConnection: "Supports cleaner sequencing, clearer next steps, and better visibility across moving work.",
          },
          {
            name: "English / French",
            status: "using",
            summary: "Used in both customer-facing and team settings where clear communication affects trust, accuracy, and follow-through.",
            rationale: "I see communication as part of execution, not something separate from it.",
            roleConnection: "Helps when the work depends on clarity, trust, and people staying on the same page.",
          },
        ],
      },
      {
        id: "currently-learning",
        label: "Currently Learning",
        items: [
          {
            name: "Salesforce",
            status: "learning",
            summary: "Salesforce certification is in progress as I build stronger familiarity with CRM structure, workflows, and reporting habits.",
            rationale: "It is one of the clearest platforms to learn for roles centered on pipeline visibility, follow-up, and customer-facing process work.",
            roleConnection: "Supports cleaner CRM structure, better visibility, and more reliable follow-up habits.",
          },
          {
            name: "SQL",
            status: "learning",
            summary: "Building stronger query fluency so I can move from spreadsheet-based analysis into more scalable reporting workflows.",
            rationale: "I want to get better at pulling the right information directly and using it to answer practical business questions.",
            roleConnection: "Useful when reporting needs to scale beyond spreadsheets without losing clarity.",
          },
          {
            name: "Power BI",
            status: "learning",
            summary: "Learning dashboard design and reporting habits that make performance easier to understand at a glance.",
            rationale: "I want information to be easier for other people to use, not just accurate in the background.",
            roleConnection: "Supports clearer reporting when people need to spot issues and act quickly.",
          },
        ],
      },
      {
        id: "projects-in-progress",
        label: "Projects in Progress",
        items: [
          {
            name: "Claude Builder Club @ uOttawa",
            status: "in-progress",
            summary: "Co-founding an Anthropic-supported student builder community focused on AI workshops, demos, and giving more students a place to build and share projects on campus.",
            rationale: "I like the community side of AI just as much as the tools themselves, especially when it creates momentum for people who want to make things together.",
            roleConnection: "Supports community building, event coordination, and turning interest into something tangible on campus.",
            featured: true,
          },
          {
            name: "University workflow / grade tracker",
            status: "in-progress",
            summary: "A side project for keeping courses, deadlines, grades, and academic progress easier to track in one place.",
            rationale: "It comes from the same habit I bring to work: if a system feels messy, I usually want to make it clearer and easier to use.",
            roleConnection: "Supports personal organization, clearer visibility, and less friction in everyday planning.",
          },
        ],
      },
      {
        id: "next-builds",
        label: "Next Builds",
        items: [
          {
            name: "Sales / ops reporting dashboard",
            status: "planned",
            summary: "A dashboard concept focused on making pipeline or operational performance easier to review, share, and act on.",
            rationale: "It would connect reporting practice with the kind of visibility teams need to prioritize follow-up.",
            roleConnection: "Supports shared visibility, easier review, and clearer performance follow-up.",
          },
          {
            name: "Data hygiene / audit workflow project",
            status: "planned",
            summary: "A workflow-focused project centered on cleaning records, flagging inconsistencies, and improving reporting reliability.",
            rationale: "I want one project that shows how small process improvements can make data easier to trust and use.",
            roleConnection: "Supports cleaner records, more reliable reporting, and fewer avoidable errors downstream.",
          },
          {
            name: "Salesforce reporting workflow",
            status: "planned",
            summary: "A planned build focused on CRM reporting, status tracking, and cleaner follow-up visibility inside a Salesforce-style workflow.",
            rationale: "It would let me connect certification learning to a process that feels realistic and business-facing.",
            roleConnection: "Supports CRM visibility, status tracking, and cleaner follow-up across a shared process.",
          },
          {
            name: "Process handoff tracker",
            status: "planned",
            summary: "A lightweight tracker concept for making ownership, follow-up, and next actions clearer across a shared workflow.",
            rationale: "I am interested in tools that reduce confusion and make execution more consistent without adding complexity.",
            roleConnection: "Supports cleaner handoff, clearer ownership, and fewer missed next steps.",
          },
        ],
      },
    ],
  },
  contact: {
    email: "jeantydiangelo@gmail.com",
    linkedin: "linkedin.com/in/davidjeanty",
    location: "Ottawa, ON",
    availability:
      "Open to BA, product operations, and tech consulting opportunities in the Kanata North ecosystem and beyond.",
  },
  desktop: {
    resumeFileName: "Resume.pdf",
    icons: [
      { id: "resume", label: "Resume.pdf" },
      { id: "experience", label: "Experience" },
      { id: "about", label: "About Me" },
      { id: "contact", label: "Contact" },
      { id: "workbench", label: "Workbench" },
      { id: "games", label: "Games" },
      { id: "internal-only", label: "Internal" },
      { id: "internal-media", label: "Internal Media", hidden: true },
    ],
  },
};
