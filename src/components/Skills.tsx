"use client";

import { useFadeIn } from "./useFadeIn";

const currentSkills = [
  "Excel",
  "SQL",
  "Python",
  "Google Workspace",
  "CRM Platforms",
  "French / English",
];

const buildingSkills = [
  "Power BI",
  "Tableau",
  "Claude API",
  "AI Workflow Automation",
];

function Pill({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-body transition-all duration-300 border ${
        accent
          ? "border-emerald-400/30 bg-emerald-400/8 text-emerald-400 hover:bg-emerald-400/15"
          : "border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.07]"
      }`}
    >
      {accent && (
        <span className="w-1 h-1 rounded-full bg-emerald-400 mr-2 animate-pulse" />
      )}
      {label}
    </span>
  );
}

export default function Skills() {
  const { ref, visible } = useFadeIn();

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`fade-in-section ${visible ? "visible" : ""}`}
        >
          <p className="font-heading text-xs tracking-[0.2em] text-emerald-400 uppercase mb-4">
            Skills
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-14">
            Tools of the trade.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Currently using */}
            <div className="border border-white/8 rounded-2xl p-8 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <p className="font-heading font-semibold text-white text-lg">
                  Currently using
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {currentSkills.map((s) => (
                  <Pill key={s} label={s} />
                ))}
              </div>
            </div>

            {/* Currently building */}
            <div className="border border-emerald-400/15 rounded-2xl p-8 bg-emerald-400/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-heading font-semibold text-white text-lg">
                  Currently building
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {buildingSkills.map((s) => (
                  <Pill key={s} label={s} accent />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
