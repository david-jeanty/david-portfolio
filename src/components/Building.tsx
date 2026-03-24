"use client";

import { useFadeIn } from "./useFadeIn";

export default function Building() {
  const { ref, visible } = useFadeIn();

  return (
    <section id="building" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`fade-in-section ${visible ? "visible" : ""}`}
        >
          <p className="font-heading text-xs tracking-[0.2em] text-emerald-400 uppercase mb-4">
            Currently Building
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-12">
            What&apos;s next.
          </h2>

          <div className="relative border border-emerald-400/20 rounded-2xl p-8 md:p-12 bg-white/[0.02] overflow-hidden">
            {/* Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)",
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center gap-8">
              {/* Icon */}
              <div className="shrink-0 w-16 h-16 rounded-2xl border border-emerald-400/30 bg-emerald-400/8 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Claude Builder Club @ uOttawa
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-xs font-body bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                    Launching Fall 2026
                  </span>
                </div>
                <p className="font-body text-white/50 text-base leading-relaxed mb-4">
                  Co-founding uOttawa&apos;s first Anthropic-affiliated AI builder
                  club — a space for students to build real products with Claude
                  API, explore AI-native workflows, and connect with the
                  emerging AI ecosystem in Ottawa.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Anthropic Affiliated", "AI Product Building", "Fall 2026"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-body border border-white/10 text-white/40"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
