"use client";

import { useFadeIn } from "./useFadeIn";

export default function About() {
  const { ref, visible } = useFadeIn();

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`fade-in-section ${visible ? "visible" : ""}`}
        >
          <p className="font-heading text-xs tracking-[0.2em] text-emerald-400 uppercase mb-6">
            About
          </p>

          <div className="space-y-6">
            <p className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              Most business students learn to analyze problems.
            </p>
            <p className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white/50 leading-tight">
              Most tech students learn to build solutions.
            </p>
            <p className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight">
              <span className="text-white">I&apos;ve spent three years doing both</span>
              <span className="text-white/40"> — tracking KPIs in high-volume operations, managing stakeholders in regulated financial environments, and studying the systems that connect them.</span>
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Degree", value: "BCom, Business Technology Management" },
              { label: "Institution", value: "University of Ottawa" },
              { label: "Languages", value: "English · French" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-white/8 rounded-2xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <p className="font-body text-xs text-white/30 tracking-widest uppercase mb-2">
                  {item.label}
                </p>
                <p className="font-body text-white/80 text-sm leading-snug">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
