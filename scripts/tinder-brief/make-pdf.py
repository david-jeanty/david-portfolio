"""Render the After Party decision brief (full-brief.md) to public/after-party-decision-brief.pdf.

Builds a print-styled HTML page from the Markdown, then prints it with headless Chrome.
Run: python3 -I scripts/tinder-brief/make-pdf.py
"""

import html
import re
import subprocess
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SOURCE = HERE / "full-brief.md"
OUT = ROOT / "public" / "after-party-decision-brief.pdf"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CSS = """
@page { size: Letter; margin: 0.7in 0.75in; }
body { font: 10.5pt/1.45 Helvetica, Arial, sans-serif; color: #1b1817; }
h1 { font-size: 20pt; margin: 0 0 8pt; }
h2 { font-size: 13.5pt; margin: 18pt 0 6pt; padding-bottom: 3pt; border-bottom: 1px solid #c9bfb8; }
h3 { font-size: 11.5pt; margin: 14pt 0 4pt; }
p { margin: 0 0 7pt; }
ul, ol { margin: 0 0 8pt; padding-left: 18pt; }
li { margin-bottom: 4pt; }
table { width: 100%; border-collapse: collapse; margin: 4pt 0 9pt; font-size: 9.5pt; }
th, td { border: 1px solid #c9bfb8; padding: 4pt 6pt; text-align: left; vertical-align: top; }
th { background: #f3ece6; }
tr, li, h3 { break-inside: avoid; }
h2, h3 { break-after: avoid; }
.note { color: #5e5450; font-size: 9pt; margin-bottom: 14pt; }
"""


def inline(text: str) -> str:
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"(?<!\w)_([^_]+)_(?!\w)", r"<em>\1</em>", text)
    return text


def to_html(markdown: str) -> str:
    out, lines, i = [], markdown.split("\n"), 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
        elif line.startswith("#"):
            level = len(line) - len(line.lstrip("#"))
            out.append(f"<h{level}>{inline(line.lstrip('#').strip())}</h{level}>")
            if level == 1:
                out.append('<p class="note">A synthetic program for a made-up dating app, After Party. Drafted by Brief Writer from tickets and Slack; TPM recommendations added by David Jeanty.</p>')
            i += 1
        elif line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                if not re.fullmatch(r"\|[-|\s]+\|", lines[i].strip()):
                    rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            head, *body = rows
            out.append("<table><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr>")
            out.extend("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>" for row in body)
            out.append("</table>")
        elif re.match(r"^(- |\d+\. )", line):
            tag = "ol" if re.match(r"^\d+\. ", line) else "ul"
            items = []
            while i < len(lines) and re.match(r"^(- |\d+\. )", lines[i]):
                items.append(f"<li>{inline(re.sub(r'^(- |\d+\. )', '', lines[i]))}</li>")
                i += 1
            out.append(f"<{tag}>{''.join(items)}</{tag}>")
        else:
            out.append(f"<p>{inline(line)}</p>")
            i += 1
    return "\n".join(out)


def main():
    page = f"<!doctype html><html><head><meta charset='utf-8'><title>Decision brief: Post-Event Matching</title><style>{CSS}</style></head><body>{to_html(SOURCE.read_text())}</body></html>"
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "brief.html"
        src.write_text(page)
        subprocess.run(
            ["perl", "-e", "alarm 60; exec @ARGV", CHROME, "--headless=new", "--disable-gpu",
             f"--user-data-dir={tmp}/profile", "--no-pdf-header-footer", "--virtual-time-budget=4000",
             f"--print-to-pdf={OUT}", src.as_uri()],
            check=True, capture_output=True,
        )
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
