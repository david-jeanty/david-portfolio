import Image from "next/image";
import styles from "./PortfolioCatalog.module.css";

const icons: Partial<Record<string, string>> = {
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  Supabase: "supabase",
  "Chrome extension": "googlechrome",
  MCP: "modelcontextprotocol",
  Claude: "claude",
  "Claude Code": "claude",
  Cursor: "cursor",
  Python: "python",
  GitHub: "github",
  Jira: "jira",
  Slack: "slack",
  HubSpot: "hubspot",
  Salesforce: "salesforce",
  "Google Sheets": "googlesheets",
  React: "react",
};

export default function ToolStack({ tools, label = "Tool stack" }: { tools: readonly string[]; label?: string }) {
  return (
    <ul className={styles.toolStack} aria-label={label}>
      {tools.map((tool) => {
        const icon = icons[tool];
        return (
          <li key={tool}>
            {icon && <Image src={`/tool-icons/${icon}.svg`} alt="" width={16} height={16} unoptimized />}
            {tool}
          </li>
        );
      })}
    </ul>
  );
}
