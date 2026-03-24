"use client";

import { useFadeIn } from "./useFadeIn";
import CountUp from "./CountUp";

const experiences = [
  {
    company: "CIBC Wood Gundy",
    role: "Incoming Student Wealth Associate",
    period: "Summer 2026",
    type: "incoming",
    metric: { end: 1, suffix: " role incoming", prefix: "#" },
    metricLabel: "Private Wealth Operations",
    translation:
      "Navigating regulated financial environments where precision and compliance aren't optional.",
    color: "from-red-500/10 to-transparent",
    dot: "bg-red-400",
    logo: "CW",
  },
  {
    company: "Aritzia",
    role: "Risk Associate",
    period: "Apr 2024 – Aug 2025",
    type: "past",
    metric: { end: 50, suffix: "K+ reduced", prefix: "$" },
    metricLabel: "Shrinkage Reduction",
    translation:
      "KPI dashboards, anomaly detection, and operational analytics at scale — directly transferable to BA and product ops.",
    color: "from-violet-500/10 to-transparent",
    dot: "bg-violet-400",
    logo: "AR",
  },
  {
    company: "Telfer Business Technology Association",
    role: "VP Internal Affairs",
    period: "2023 – Present",
    type: "current",
    metric: { end: 20, suffix: " hired", prefix: "" },
    metricLabel: "Team Members Recruited",
    translation:
      "End-to-end stakeholder management — hiring, onboarding, and running 10+ events/year for a 100+ member student org.",
    color: "from-emerald-500/10 to-transparent",
    dot: "bg-emerald-400",
    logo: "BT",
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const { ref, visible } = useFadeIn(0.1);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="group relative border border-white/8 rounded-2xl p-7 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-400 overflow-hidden">
        {/* Gradient bg */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-60 pointer-events-none`}
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center font-heading font-bold text-xs text-white/60">
                {exp.logo}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white text-lg leading-tight">
                  {exp.company}
                </h3>
                <p className="font-body text-white/40 text-sm mt-0.5">
                  {exp.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full ${exp.dot}`} />
              <span className="font-body text-white/30 text-xs">
                {exp.period}
              </span>
            </div>
          </div>

          {/* Metric count-up */}
          <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/8">
            <p className="font-heading font-extrabold text-4xl text-white mb-1">
              <CountUp
                end={exp.metric.end}
                suffix={exp.metric.suffix}
                prefix={exp.metric.prefix}
                trigger={visible}
              />
            </p>
            <p className="font-body text-white/30 text-xs tracking-widest uppercase">
              {exp.metricLabel}
            </p>
          </div>

          {/* Translation */}
          <p className="font-body text-emerald-400 text-sm leading-relaxed">
            → {exp.translation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, visible } = useFadeIn();

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`fade-in-section mb-14 ${visible ? "visible" : ""}`}
        >
          <p className="font-heading text-xs tracking-[0.2em] text-emerald-400 uppercase mb-4">
            Experience
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Where I&apos;ve operated.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
