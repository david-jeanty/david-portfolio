"""Find pin positions for the /tinder walkthrough screenshots with tesseract OCR.

Reads the native-size Slack captures, finds each callout's anchor phrase, and
writes the phrase's bounding box (native pixels) to
src/app/tinder/walkthrough-pins.json. Pins are never placed by hand.

Run: python3 -I scripts/tinder-walkthrough-pins.py
"""

import csv
import json
import re
import subprocess
import sys
from pathlib import Path

CAPTURES = Path.home() / "tinder-video" / "public" / "captures" / "slack"
OUT = Path(__file__).resolve().parent.parent / "src" / "app" / "tinder" / "walkthrough-pins.json"

# file -> list of (callout label, anchor phrase, occurrence index)
ANCHORS = {
    "slack-01-sidebar.png": [
        ("Workspace name", "Afterparty", 0),
        ("Team channels", "pem-ios", 0),
        ("Leads channel", "pem-leads", 0),
    ],
    "slack-02-team-channel.png": [
        ("A status update", "107 running in staging, deleting at 30d", 0),
        ("Role tag", "Backend Engineer", 1),
        ("Off-topic message", "who finished the cold brew", 0),
    ],
    "slack-03-busy-channel.png": [
        ("Localization update", "consent strings done for ES, FR, DE.", 0),
        ("Item marked done", "marked our R4 item done", 0),
        ("The iPhone update", "ios deck isn't in R4", 0),
    ],
    "slack-04-brief-top.png": [
        ("Brief Writer's post", "Brief Writer", 0),
        ("Decisions needed", "Decisions needed", 0),
        ("Deadline", "Deadline: before the R4 build cut.", 0),
    ],
    "slack-05-brief-evidence.png": [
        ("The risk", "Android deck PEM-117 still lists", 0),
        ("Impact and confidence", "Impact:", 0),
        ("Tickets and messages cited", "Evidence:", 0),
    ],
    "slack-06-mismatch.png": [
        ("Mismatch section", "Where status and the record disagree", 0),
        ("The iPhone update", "Leads were told iOS had nothing changing dates", 0),
        ("Impact and confidence", "confidence high)", 0),
    ],
    "slack-07-options.png": [
        ("Option A", "A. Android switches PEM-117 to v2", 0),
        ("Upside and downside", "Upside: Matches the privacy-approved contract", 0),
        ("Option C", "C. Pull the Android deck from R4 too", 0),
    ],
    "slack-08-unseen-brief.png": [
        ("Unseen test program", "unseen test program", 0),
        ("Decisions needed", "Decisions needed", 0),
    ],
}


def norm(text: str) -> str:
    return re.sub(r"[^a-z0-9]", "", text.lower())


def ocr_words(path: Path):
    tsv = subprocess.run(
        ["tesseract", str(path), "-", "tsv"], capture_output=True, text=True, check=True
    ).stdout
    words = []
    for row in csv.DictReader(tsv.splitlines(), delimiter="\t", quoting=csv.QUOTE_NONE):
        text = (row.get("text") or "").strip()
        if row["level"] != "5" or not text:
            continue
        words.append({
            "text": text,
            "key": norm(text),
            "line": (row["block_num"], row["par_num"], row["line_num"]),
            "box": [int(row["left"]), int(row["top"]), int(row["width"]), int(row["height"])],
        })
    return words


def find(words, phrase: str, occurrence: int):
    tokens = [norm(t) for t in phrase.split() if norm(t)]
    hits = []
    for i in range(len(words) - len(tokens) + 1):
        run = words[i:i + len(tokens)]
        if all(w["key"] == t for w, t in zip(run, tokens)) and len({w["line"] for w in run}) == 1:
            hits.append(run)
    if len(hits) <= occurrence:
        return None
    run = hits[occurrence]
    left = min(w["box"][0] for w in run)
    top = min(w["box"][1] for w in run)
    right = max(w["box"][0] + w["box"][2] for w in run)
    bottom = max(w["box"][1] + w["box"][3] for w in run)
    return [left, top, right - left, bottom - top]


def size(path: Path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
                         capture_output=True, text=True, check=True).stdout
    nums = re.findall(r"pixel(?:Width|Height): (\d+)", out)
    return int(nums[0]), int(nums[1])


def main():
    result, missing = {}, []
    for file, anchors in ANCHORS.items():
        path = CAPTURES / file
        words = ocr_words(path)
        width, height = size(path)
        pins = []
        for label, phrase, occurrence in anchors:
            box = find(words, phrase, occurrence)
            if box is None:
                missing.append(f"{file}: {phrase!r}")
                continue
            pins.append({"label": label, "anchor": phrase, "box": box})
        result[file.replace(".png", "")] = {"width": width, "height": height, "pins": pins}
    OUT.write_text(json.dumps(result, indent=2) + "\n")
    print(f"wrote {OUT}")
    if missing:
        print("not found by OCR:\n  " + "\n  ".join(missing))
        sys.exit(1)


if __name__ == "__main__":
    main()
