export type DesktopIconId =
  | "readme"
  | "resume"
  | "about"
  | "experience"
  | "workbench"
  | "contact"
  | "games"
  | "internal-only";

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
    readMeFileName: string;
    resumeFileName: string;
    readMeText: string;
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
      "I close the gap between operational problems and technical solutions.",
    location: "Ottawa, ON",
    languages: ["English", "French"],
    degree: "BCom, Business Technology Management",
    institution: "University of Ottawa",
  },
  about: {
    headlineLines: [
      "Most business students learn to analyze problems.",
      "Most tech students learn to build solutions.",
      "I've spent three years doing both.",
    ],
    paragraph:
      "Tracking KPIs in high-volume operations, managing stakeholders in regulated financial environments, and studying the systems that connect them.",
    professionalGoals: [
      "Build a strong foundation in business analysis, product operations, or tech consulting.",
      "Work on teams where analytical thinking and stakeholder communication both matter.",
      "Keep building practical systems that make operations clearer and easier to improve.",
    ],
    extracurriculars: [
      "VP Internal Affairs, Telfer Business Technology Association",
      "Student Ambassador and campus-facing student support work",
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
      company: "CIBC Wood Gundy",
      role: "Incoming Student Wealth Associate",
      period: "Summer 2026",
      metric: {
        value: 1,
        prefix: "#",
        suffix: " role incoming",
        label: "Private Wealth Operations",
      },
      summary:
        "Navigating regulated financial environments where precision and compliance are not optional.",
    },
    {
      company: "Aritzia",
      role: "Risk Associate",
      period: "Apr 2024 - Aug 2025",
      metric: {
        value: 50,
        prefix: "$",
        suffix: "K+ reduced",
        label: "Shrinkage Reduction",
      },
      summary:
        "KPI dashboards, anomaly detection, and operational analytics at scale, directly transferable to BA and product operations.",
    },
    {
      company: "Telfer Business Technology Association",
      role: "VP Internal Affairs",
      period: "2023 - Present",
      metric: {
        value: 20,
        suffix: " hired",
        label: "Team Members Recruited",
      },
      summary:
        "End-to-end stakeholder management: hiring, onboarding, and running 10+ events per year for a 100+ member student organization.",
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
            summary: "Daily spreadsheet analysis, KPI tracking, and structured problem solving.",
            rationale: "It is still the fastest tool for operational analysis and clean stakeholder handoff.",
            roleConnection: "Directly supports BA and product operations work where clarity, speed, and business context matter.",
          },
          {
            name: "Python",
            status: "using",
            summary: "Used to think through data, automate repeatable steps, and test analytical ideas.",
            rationale: "I like tools that reduce manual work and make processes more reliable.",
            roleConnection: "Useful for tech consulting and ops environments where lightweight automation creates leverage.",
          },
          {
            name: "Google Workspace",
            status: "using",
            summary: "Docs, Sheets, Slides, and coordination workflows for team execution.",
            rationale: "A lot of work depends on organized communication, not just analysis.",
            roleConnection: "Supports cross-functional collaboration, documentation, and stakeholder-ready output.",
          },
          {
            name: "CRM platforms",
            status: "using",
            summary: "Experience handling outreach, inquiries, and contact workflows at scale.",
            rationale: "I care about how systems support real people and follow-through.",
            roleConnection: "Relevant to product operations, client-facing execution, and service process work.",
          },
          {
            name: "English / French",
            status: "using",
            summary: "Bilingual communication across customer-facing and team environments.",
            rationale: "Clear communication is part of the work, not a soft extra.",
            roleConnection: "Useful in stakeholder-heavy BA, consulting, and operations roles.",
          },
        ],
      },
      {
        id: "currently-learning",
        label: "Currently Learning",
        items: [
          {
            name: "SQL",
            status: "learning",
            summary: "Building stronger query fluency for structured analysis and reporting.",
            rationale: "I want to move from spreadsheet logic into more scalable data work.",
            roleConnection: "Core for BA, analytics-adjacent product ops, and data-informed consulting work.",
          },
          {
            name: "Power BI",
            status: "learning",
            summary: "Learning dashboard design and business-facing reporting workflows.",
            rationale: "I want analysis to be easier for other people to understand and act on.",
            roleConnection: "Supports recruiter-facing proof of business storytelling and decision support.",
          },
          {
            name: "Tableau",
            status: "learning",
            summary: "Exploring visual analytics and presentation-ready dashboard habits.",
            rationale: "I am comparing how different BI tools shape analysis and communication.",
            roleConnection: "Useful for consulting-style presentation and translating raw data into decisions.",
          },
          {
            name: "Claude API projects",
            status: "learning",
            summary: "Using API-based projects to understand AI-native workflows, not just prompting.",
            rationale: "I learn fastest by building simple systems around new tools.",
            roleConnection: "Relevant to product ops and consulting work where experimentation and implementation meet.",
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
            summary: "Featured initiative: co-founding uOttawa's first Anthropic-affiliated AI builder club, launching Fall 2026.",
            rationale: "It is a way to turn curiosity into community, momentum, and real builder experience.",
            roleConnection: "Signals initiative, stakeholder coordination, and product-minded leadership.",
            featured: true,
          },
          {
            name: "Claude API / campus AI tool",
            status: "in-progress",
            summary: "An applied AI build direction focused on a useful student or campus workflow.",
            rationale: "I want my learning to produce something concrete, practical, and testable.",
            roleConnection: "Shows product thinking, experimentation, and implementation interest.",
          },
        ],
      },
      {
        id: "next-builds",
        label: "Next Builds",
        items: [
          {
            name: "Wealth management dashboard",
            status: "planned",
            summary: "A planned dashboard concept aligned with private wealth and business reporting contexts.",
            rationale: "It connects my finance-facing experience with dashboard and decision-support skills.",
            roleConnection: "High-signal for BA and consulting roles tied to financial operations.",
          },
          {
            name: "SQL analytics project",
            status: "planned",
            summary: "A structured analytics build to practice querying, reporting, and business framing.",
            rationale: "I want a project that proves SQL growth through a realistic use case.",
            roleConnection: "Direct proof of analytical development for BA and product ops paths.",
          },
          {
            name: "Power BI dashboard",
            status: "planned",
            summary: "A dashboard-focused build centered on communicating metrics clearly.",
            rationale: "I want to pair analysis with polished stakeholder-facing presentation.",
            roleConnection: "Useful for recruiter review because it shows both technical growth and communication.",
          },
          {
            name: "Workflow automation concept",
            status: "planned",
            summary: "A lightweight automation idea focused on reducing repetitive manual work.",
            rationale: "I am interested in systems that make teams faster and more consistent.",
            roleConnection: "Fits product ops and consulting work where process improvement matters.",
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
    readMeFileName: "Read Me First.txt",
    resumeFileName: "Resume.pdf",
    readMeText:
      "Welcome. This desktop portfolio is designed for structured exploration. Start with About, Experience, Resume, and Workbench.",
    icons: [
      { id: "readme", label: "Read Me First.txt" },
      { id: "resume", label: "Resume.pdf" },
      { id: "about", label: "About Me" },
      { id: "experience", label: "Experience" },
      { id: "workbench", label: "Workbench" },
      { id: "contact", label: "Contact" },
      { id: "games", label: "Games", hidden: true },
      { id: "internal-only", label: "Internal Only", hidden: true },
    ],
  },
};
