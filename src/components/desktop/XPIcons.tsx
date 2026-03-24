"use client";

import { type DesktopIconId } from "@/data/portfolio";

type IP = { size?: number; white?: boolean };

/* ── Notepad / TXT ───────────────────────────────────────────────────────── */
function NotepadIcon({ size = 38, white = false }: IP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="19" height="25" rx="1"
        fill={white ? "rgba(255,255,255,0.9)" : "#ffffff"}
        stroke={white ? "rgba(255,255,255,0.55)" : "#b4bec8"} strokeWidth="0.8" />
      <path d="M19 2 L23 6 L19 6 Z"
        fill={white ? "rgba(200,220,255,0.5)" : "#ccdff5"}
        stroke={white ? "rgba(255,255,255,0.45)" : "#a8bcd0"} strokeWidth="0.7" />
      {!white && (
        <>
          <line x1="7" y1="11" x2="19" y2="11" stroke="#c4cdd8" strokeWidth="1" />
          <line x1="7" y1="15" x2="19" y2="15" stroke="#c4cdd8" strokeWidth="1" />
          <line x1="7" y1="19" x2="19" y2="19" stroke="#c4cdd8" strokeWidth="1" />
          <line x1="7" y1="23" x2="15" y2="23" stroke="#c4cdd8" strokeWidth="1" />
          {/* Pencil diagonal */}
          <rect x="17" y="17" width="3" height="11" rx="1.2"
            fill="#fdd835" stroke="#c8a200" strokeWidth="0.5"
            transform="rotate(-40 18.5 22.5)" />
        </>
      )}
    </svg>
  );
}

/* ── PDF Document ────────────────────────────────────────────────────────── */
function PDFDocIcon({ size = 38, white = false }: IP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="19" height="25" rx="1"
        fill={white ? "rgba(255,255,255,0.9)" : "#ffffff"}
        stroke={white ? "rgba(255,255,255,0.55)" : "#b4bec8"} strokeWidth="0.8" />
      <path d="M19 2 L23 6 L19 6 Z"
        fill={white ? "rgba(255,200,200,0.4)" : "#ffe0e0"}
        stroke={white ? "rgba(255,255,255,0.45)" : "#d4a4a4"} strokeWidth="0.7" />
      {/* Header band */}
      <rect x="4" y="2" width="15" height="6.5" rx="1"
        fill={white ? "rgba(255,255,255,0.35)" : "#d32f2f"} />
      {!white && (
        <>
          <text x="5.5" y="8" fontSize="4" fontWeight="900" fill="white"
            fontFamily="Tahoma, Verdana, sans-serif">PDF</text>
          <line x1="7" y1="13" x2="19" y2="13" stroke="#c4cdd8" strokeWidth="1" />
          <line x1="7" y1="17" x2="19" y2="17" stroke="#c4cdd8" strokeWidth="1" />
          <line x1="7" y1="21" x2="15" y2="21" stroke="#c4cdd8" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

/* ── Person / About ──────────────────────────────────────────────────────── */
function PersonIcon({ size = 38, white = false }: IP) {
  const c = white ? "rgba(255,255,255,0.85)" : "#4a8fe0";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="10" r="6" fill={c} />
      <path d="M5 28 Q5 19 16 19 Q27 19 27 28 Z" fill={c} />
    </svg>
  );
}

/* ── Briefcase / Experience ──────────────────────────────────────────────── */
function BriefcaseIcon({ size = 38, white = false }: IP) {
  const body = white ? "rgba(255,255,255,0.85)" : "#c8922a";
  const edge = white ? "rgba(255,255,255,0.5)" : "#8a5c10";
  const band = white ? "rgba(255,255,255,0.38)" : "#b07820";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Handle */}
      <path d="M11 13 L11 9 Q11 6 16 6 Q21 6 21 9 L21 13"
        stroke={edge} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Body */}
      <rect x="3" y="13" width="26" height="16" rx="2"
        fill={body} stroke={edge} strokeWidth="0.8" />
      {/* Center band */}
      <rect x="3" y="19" width="26" height="3" fill={band} />
      {/* Clasp */}
      <rect x="13" y="17" width="6" height="6" rx="1"
        fill={body} stroke={edge} strokeWidth="0.7" />
    </svg>
  );
}

/* ── Folder / Projects ───────────────────────────────────────────────────── */
function FolderIcon({ size = 38, white = false }: IP) {
  const body = white ? "rgba(255,255,255,0.85)" : "#f5c842";
  const edge = white ? "rgba(255,255,255,0.5)" : "#c8a010";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Tab */}
      <path d="M3 11 L3 10 Q3 9 4 9 L13 9 L15 11 Z"
        fill={body} stroke={edge} strokeWidth="0.7" />
      {/* Body */}
      <rect x="3" y="11" width="26" height="18" rx="1.5"
        fill={body} stroke={edge} strokeWidth="0.7" />
      {/* Shine strip */}
      <rect x="3" y="11" width="26" height="6" rx="1.5"
        fill="rgba(255,255,255,0.28)" />
    </svg>
  );
}

/* ── Wrench / Currently Building ─────────────────────────────────────────── */
function WrenchIcon({ size = 38, white = false }: IP) {
  const f = white ? "rgba(255,255,255,0.85)" : "#4878c0";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* C-shaped open-end wrench head */}
      <rect x="3" y="4" width="5" height="22" rx="2.5" fill={f} />
      <rect x="3" y="4" width="16" height="5" rx="2.5" fill={f} />
      <rect x="3" y="21" width="16" height="5" rx="2.5" fill={f} />
      {/* Handle (angled) */}
      <rect x="14" y="12" width="5" height="18" rx="2.5"
        fill={f} transform="rotate(28 16.5 21)" />
    </svg>
  );
}

/* ── Envelope / Contact ──────────────────────────────────────────────────── */
function EnvelopeIcon({ size = 38, white = false }: IP) {
  const body  = white ? "rgba(255,255,255,0.85)" : "#ffffff";
  const edge  = white ? "rgba(255,255,255,0.6)" : "#6090c0";
  const flap  = white ? "rgba(255,255,255,0.55)" : "#5580b8";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="28" height="20" rx="1.5"
        fill={body} stroke={edge} strokeWidth="1" />
      <path d="M2 8 L16 20 L30 8"
        stroke={flap} strokeWidth="1.2" fill="none" />
      <line x1="2"  y1="28" x2="13" y2="18" stroke={edge} strokeWidth="0.8" opacity="0.45" />
      <line x1="30" y1="28" x2="19" y2="18" stroke={edge} strokeWidth="0.8" opacity="0.45" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Public: desktop icon art (38 × 38 by default)
══════════════════════════════════════════════════════════════════════════ */
export function DesktopIconArt({ id, size = 38 }: { id: DesktopIconId; size?: number }) {
  switch (id) {
    case "readme":             return <NotepadIcon size={size} />;
    case "resume":             return <PDFDocIcon size={size} />;
    case "about":              return <PersonIcon size={size} />;
    case "experience":         return <BriefcaseIcon size={size} />;
    case "workbench":          return <WrenchIcon size={size} />;
    case "contact":            return <EnvelopeIcon size={size} />;
    case "games":              return <FolderIcon size={size} />;
    case "internal-only":      return <FolderIcon size={size} />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Public: title-bar badge icon (14 × 14, white variant)
══════════════════════════════════════════════════════════════════════════ */
export function TitleBarIcon({ id }: { id: DesktopIconId }) {
  switch (id) {
    case "readme":             return <NotepadIcon size={14} white />;
    case "resume":             return <PDFDocIcon size={14} white />;
    case "about":              return <PersonIcon size={14} white />;
    case "experience":         return <BriefcaseIcon size={14} white />;
    case "workbench":          return <WrenchIcon size={14} white />;
    case "contact":            return <EnvelopeIcon size={14} white />;
    case "games":              return <FolderIcon size={14} white />;
    case "internal-only":      return <FolderIcon size={14} white />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Public: small in-window icons
══════════════════════════════════════════════════════════════════════════ */

/** Yellow folder — Experience left pane items */
export function SmallFolderIcon({ size = 15 }: { size?: number }) {
  return <FolderIcon size={size} />;
}

/** Plain document page — Projects table rows */
export function SmallFileIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="8" height="11" rx="0.5"
        fill="white" stroke="#b0b8c4" strokeWidth="0.7" />
      <path d="M8 1 L10 3 L8 3 Z" fill="#cce0f8" stroke="#a8bcd0" strokeWidth="0.5" />
      <line x1="3.5" y1="5" x2="8.5" y2="5" stroke="#c4cdd8" strokeWidth="0.7" />
      <line x1="3.5" y1="7" x2="8.5" y2="7" stroke="#c4cdd8" strokeWidth="0.7" />
      <line x1="3.5" y1="9" x2="7"   y2="9" stroke="#c4cdd8" strokeWidth="0.7" />
    </svg>
  );
}

/** Envelope — Contact email field */
export function SmallEnvelopeIcon({ size = 13 }: { size?: number }) {
  return <EnvelopeIcon size={size} />;
}

/** Chain link — Contact LinkedIn field */
export function SmallLinkIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1"  y="5" width="5" height="3" rx="1.5"
        fill="none" stroke="#6090c0" strokeWidth="1.2" />
      <rect x="7"  y="5" width="5" height="3" rx="1.5"
        fill="none" stroke="#6090c0" strokeWidth="1.2" />
    </svg>
  );
}

/** Location pin — Contact location field */
export function SmallPinIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 1 Q9.5 1 10 4 Q10.5 7 6.5 12 Q2.5 7 3 4 Q3.5 1 6.5 1 Z"
        fill="#e05050" stroke="#b04040" strokeWidth="0.6" />
      <circle cx="6.5" cy="4.5" r="1.3" fill="white" />
    </svg>
  );
}

/** Wrench — Currently Building in-window header */
export function SmallWrenchIcon({ size = 16 }: { size?: number }) {
  return <WrenchIcon size={size} />;
}
