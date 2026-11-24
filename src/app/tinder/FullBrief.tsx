import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import styles from "./walkthrough.module.css";

// The brief Brief Writer posted to Slack, as saved in its output file.
const source = readFileSync(join(process.cwd(), "src", "app", "tinder", "full-brief.md"), "utf8");

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|(?<!\w)_[^_]+_(?!\w)|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("_") && part.endsWith("_")) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function cells(row: string) {
  return row.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function render(markdown: string) {
  const blocks: ReactNode[] = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = blocks.length;

    if (!line.trim()) {
      i += 1;
    } else if (line.startsWith("#")) {
      const level = line.match(/^#+/)![0].length;
      blocks.push(<p key={key} className={styles.briefHeading} data-level={level}><strong>{line.replace(/^#+\s*/, "")}</strong></p>);
      i += 1;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[-|\s]+\|$/.test(lines[i])) rows.push(cells(lines[i]));
        i += 1;
      }
      const [, ...options] = rows;
      blocks.push(
        <div key={key} className={styles.briefOptions}>
          <p><strong>Options</strong></p>
          {options.map(([option, upside, downside]) => (
            <div key={option}>
              <p><strong>{option}</strong></p>
              <p>Upside: {inline(upside)}</p>
              <p>Downside: {inline(downside)}</p>
            </div>
          ))}
        </div>,
      );
    } else if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const items: string[] = [];
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) {
        items.push(lines[i].replace(/^(- |\d+\. )/, ""));
        i += 1;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(<List key={key}>{items.map((item) => <li key={item}>{inline(item)}</li>)}</List>);
    } else {
      blocks.push(<p key={key}>{inline(line)}</p>);
      i += 1;
    }
  }

  return blocks;
}

export default function FullBrief() {
  return (
    <details className={styles.fullBrief}>
      <summary>Read the full brief</summary>
      <div className={styles.briefBody}>{render(source)}</div>
    </details>
  );
}
