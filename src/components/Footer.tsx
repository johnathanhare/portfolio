'use client';

import React, { useState } from 'react';
import { Mail, Download, Check, ArrowUp, MapPin, Calendar, ExternalLink } from 'lucide-react';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('johnathanhare07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Recruiter Placement Call To Action Card */}
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-12 technical-glow relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-mono text-emerald-300 mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for 2027/28 Industrial Placement</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
              Let's Discuss Placement Opportunities.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              I am actively seeking a 12-month Year in Industry placement starting Summer 2027. If your team is advancing materials development, physical testing, failure analysis, or computational materials selection, I would love to connect.
            </p>

            {/* Quick Placement Constraints */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                <span>Target: Summer 2027 (12 Months)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>Location: Sheffield & UK-Wide (Open to Relocation)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 font-mono text-xs md:text-sm font-bold transition shadow-lg shadow-cyan-500/20"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    <span>johnathanhare07@gmail.com</span>
                  </>
                )}
              </button>

              <a
                href="/Johnathan_Hare_CV.pdf"
                download="Johnathan_Hare_CV.pdf"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-mono text-xs md:text-sm text-slate-200 hover:border-slate-600 transition"
              >
                <Download className="h-4 w-4 text-slate-400" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-xs text-slate-400 hover:text-cyan-400 hover:border-cyan-800 transition"
              >
                <LinkedInIcon className="h-4 w-4 text-sky-400" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 border-t border-slate-800/80 pt-8">
          <div>
            © 2026 Johnathan Hare. Built with Next.js, Three.js & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
