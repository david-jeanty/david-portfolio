"use client";

import Image from "next/image";
import { type DesktopIconId } from "@/data/portfolio";

type IP = { size?: number; white?: boolean };

function RasterIcon({ src, size = 38 }: { src: string; size?: number }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      unoptimized
      style={{ display: "block", objectFit: "contain" }}
    />
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

/* ── Gear / Workbench ───────────────────────────────────────────────────── */
function GearIcon({ size = 38, white = false }: IP) {
  const fill = white ? "rgba(255,255,255,0.9)" : "#f2c84b";
  const edge = white ? "rgba(255,255,255,0.65)" : "#9c6e0d";
  const core = white ? "rgba(255,255,255,0.25)" : "#5d97da";
  const shine = white ? "rgba(255,255,255,0.32)" : "#ffe798";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4.8 L18 4.8 L18.7 7.1 C19.5 7.3 20.2 7.6 20.9 8 L23 6.8 L24.4 8.2
           L23.2 10.3 C23.6 11 23.9 11.7 24.1 12.5 L26.4 13.2 L26.4 15.2 L24.1 15.9
           C23.9 16.7 23.6 17.4 23.2 18.1 L24.4 20.2 L23 21.6 L20.9 20.4
           C20.2 20.8 19.5 21.1 18.7 21.3 L18 23.6 L16 23.6 L15.3 21.3
           C14.5 21.1 13.8 20.8 13.1 20.4 L11 21.6 L9.6 20.2 L10.8 18.1
           C10.4 17.4 10.1 16.7 9.9 15.9 L7.6 15.2 L7.6 13.2 L9.9 12.5
           C10.1 11.7 10.4 11 10.8 10.3 L9.6 8.2 L11 6.8 L13.1 8
           C13.8 7.6 14.5 7.3 15.3 7.1 Z"
        fill={fill}
        stroke={edge}
        strokeWidth="0.65"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 8.9 C15.4 7.6 18.3 7.3 20.9 8.3"
        stroke={shine}
        strokeWidth="1"
        strokeLinecap="round"
        opacity={white ? 0.75 : 0.95}
      />
      <circle cx="17" cy="14.2" r="4.2" fill={core} stroke={edge} strokeWidth="0.7" />
      <circle cx="17" cy="14.2" r="1.8" fill={white ? "rgba(255,255,255,0.88)" : "#d8ebff"} />
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
    case "resume":             return <RasterIcon src="/resume-icon.png" size={size} />;
    case "about":              return <RasterIcon src="/about-icon.png" size={size} />;
    case "experience":         return <RasterIcon src="/experience-icon.png" size={size} />;
    case "workbench":          return <RasterIcon src="/workbench-icon.png" size={size} />;
    case "contact":            return <RasterIcon src="/contact-icon.png" size={size} />;
    case "games":              return <RasterIcon src="/games-icon.png" size={size} />;
    case "internal-only":      return <RasterIcon src="/internal-alert-icon.png" size={size} />;
    case "internal-media":     return <RasterIcon src="/internal-alert-icon.png" size={size} />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Public: title-bar badge icon (14 × 14, white variant)
══════════════════════════════════════════════════════════════════════════ */
export function TitleBarIcon({ id }: { id: DesktopIconId }) {
  switch (id) {
    case "resume":             return <RasterIcon src="/resume-icon.png" size={14} />;
    case "about":              return <RasterIcon src="/about-icon.png" size={14} />;
    case "experience":         return <RasterIcon src="/experience-icon.png" size={14} />;
    case "workbench":          return <RasterIcon src="/workbench-icon.png" size={14} />;
    case "contact":            return <RasterIcon src="/contact-icon.png" size={14} />;
    case "games":              return <RasterIcon src="/games-icon.png" size={14} />;
    case "internal-only":      return <RasterIcon src="/internal-alert-icon.png" size={14} />;
    case "internal-media":     return <RasterIcon src="/internal-alert-icon.png" size={14} />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Public: small in-window icons
══════════════════════════════════════════════════════════════════════════ */

/** Yellow folder — Experience left pane items */
export function SmallFolderIcon({ size = 15 }: { size?: number }) {
  return <FolderIcon size={size} />;
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
  return <GearIcon size={size} />;
}
