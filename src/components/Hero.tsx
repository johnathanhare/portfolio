'use client';

import React, { useState } from 'react';
import { Download, Mail, ArrowDown, Award, Check, Sparkles, Terminal } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('johnathanhare07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="overview" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Engineering Eyebrow Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 rounded-md border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs text-cyan-300">
            <Terminal className="h-3.5 w-3.5" />
            <span>THE UNIVERSITY OF SHEFFIELD // MATERIALS SCIENCE & ENGINEERING</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-md">
            <Award className="h-3 w-3" />
            <span>IOM3 National Award Winner (March 2026)</span>
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-100 max-w-4xl leading-[1.1]">
          Engineering Materials from <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">Microstructure</span> to Mechanical Performance.
        </h1>

        {/* Subhead / Value Proposition */}
        <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
          I am a 2nd-year undergraduate on track for a <span className="text-white font-semibold">First-Class Honours (1st)</span> degree at Sheffield. My work bridges physical mechanical characterisation, metallurgy, and hands-on 3D CAD rapid prototyping with modern materials data informatics.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/Johnathan_Hare_CV.pdf"
            download="Johnathan_Hare_CV.pdf"
            className="flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 font-mono text-xs md:text-sm font-bold transition shadow-lg shadow-cyan-500/20"
          >
            <Download className="h-4 w-4" />
            <span>Download CV (PDF)</span>
          </a>

          <button
            onClick={copyEmail}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-slate-600 px-5 py-3 font-mono text-xs md:text-sm text-slate-200 transition"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Email Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 text-slate-400" />
                <span>johnathanhare07@gmail.com</span>
              </>
            )}
          </button>

          <a
            href="#projects"
            className="flex items-center gap-1.5 px-4 py-3 font-mono text-xs text-slate-400 hover:text-cyan-400 transition"
          >
            <span>Explore Engineering Work</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* At-A-Glance Engineering Telemetry Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-800/80 pt-8 font-mono">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Academic Standing</span>
            <span className="text-lg font-bold text-slate-100">1st Class Track</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">UoS Materials Engineering</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">National Prize</span>
            <span className="text-lg font-bold text-amber-400">IOM3 Winner</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Awarded March 2026</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Materials Database</span>
            <span className="text-lg font-bold text-cyan-400">65 Verified</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Ashby Selection Web App</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Prototyping Tools</span>
            <span className="text-lg font-bold text-slate-100">CAD & FDM 3D</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">SolidWorks / Fusion 360</span>
          </div>
        </div>
      </div>
    </section>
  );
}
