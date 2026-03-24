"use client";

import { useFadeIn } from "./useFadeIn";

export default function Contact() {
  const { ref, visible } = useFadeIn();

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          ref={ref}
          className={`fade-in-section ${visible ? "visible" : ""}`}
        >
          <p className="font-heading text-xs tracking-[0.2em] text-emerald-400 uppercase mb-4">
            Contact
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-6xl text-white mb-6 leading-tight">
            Let&apos;s talk.
          </h2>
          <p className="font-body text-white/40 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Open to BA, product ops, and tech consulting opportunities in the
            Kanata North ecosystem and beyond.
          </p>

          {/* Contact cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="mailto:jeantydiangelo@gmail.com"
              className="tap-target group flex items-center gap-3 w-full sm:w-auto px-6 py-4 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-body text-xs text-white/30 uppercase tracking-widest mb-0.5">
                  Email
                </p>
                <p className="font-body text-white/70 group-hover:text-white text-sm transition-colors">
                  jeantydiangelo@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/davidjeanty"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target group flex items-center gap-3 w-full sm:w-auto px-6 py-4 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-body text-xs text-white/30 uppercase tracking-widest mb-0.5">
                  LinkedIn
                </p>
                <p className="font-body text-white/70 group-hover:text-white text-sm transition-colors">
                  linkedin.com/in/davidjeanty
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto px-6 py-4 border border-white/10 rounded-2xl bg-white/[0.02]">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-body text-xs text-white/30 uppercase tracking-widest mb-0.5">
                  Location
                </p>
                <p className="font-body text-white/70 text-sm">Ottawa, ON</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 pt-8">
            <p className="font-body text-white/20 text-sm">
              Built by David Jeanty · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
