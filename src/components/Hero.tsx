"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const NAME = "David Jeanty";

function useScramble(target: string, startDelay = 200) {
  const [displayed, setDisplayed] = useState(
    target.split("").map(() => " ")
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    const chars = target.split("");
    const resolved: boolean[] = new Array(chars.length).fill(false);
    const intervals: ReturnType<typeof setInterval>[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    chars.forEach((char, i) => {
      if (char === " ") {
        resolved[i] = true;
        return;
      }

      const delay = startDelay + i * 60;

      const t = setTimeout(() => {
        let ticks = 0;
        const maxTicks = 6 + Math.floor(Math.random() * 4);

        const interval = setInterval(() => {
          if (ticks >= maxTicks) {
            clearInterval(interval);
            resolved[i] = true;
            setDisplayed((prev) => {
              const next = [...prev];
              next[i] = char;
              return next;
            });
            if (resolved.every(Boolean)) setDone(true);
            return;
          }
          setDisplayed((prev) => {
            const next = [...prev];
            next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            return next;
          });
          ticks++;
        }, 40);

        intervals.push(interval);
      }, delay);

      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [target, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useScramble(NAME, 400);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Radial emerald glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Bilingual badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 mb-8"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-body text-emerald-400/80 tracking-widest uppercase">
            EN · FR
          </span>
        </div>

        {/* Name with scramble */}
        <h1 className="font-heading font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none mb-6 select-none">
          {displayed.join("")}
        </h1>

        {/* Tagline */}
        <p
          className="font-body text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}
        >
          I close the gap between{" "}
          <span className="text-emerald-400">operational problems</span> and{" "}
          <span className="text-emerald-400">technical solutions</span>.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          <a
            href="/resume.pdf"
            download
            className="tap-target group flex items-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:scale-105 emerald-glow"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
            Download Resume
          </a>
          <a
            href="https://linkedin.com/in/davidjeanty"
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-emerald-400/50 text-white/80 hover:text-white font-heading font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.8s ease 1s",
        }}
      >
        <span className="text-white/30 text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
