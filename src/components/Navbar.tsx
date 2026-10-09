'use client';

import React, { useState } from 'react';
import { Download, Mail, Check, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('johnathanhare07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Recruiter Status Badge */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 font-mono text-sm font-black text-slate-950">
              JH
            </span>
            <span className="font-mono text-sm font-bold tracking-tight text-slate-100 hidden sm:inline">
              Johnathan Hare <span className="text-cyan-400">/ MEng</span>
            </span>
          </a>

          {/* Status Pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-[11px] font-mono text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Seeking 2027/28 Industrial Placement</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
          <a href="#overview" className="hover:text-cyan-400 transition-colors">01. Overview</a>
          <a href="#cad-viewer" className="hover:text-cyan-400 transition-colors">02. 3D CAD Lab</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">03. Projects</a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">04. Education</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">05. Contact</a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          {/* Email Copy Button */}
          <button
            onClick={copyEmail}
            title="Copy email to clipboard"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-slate-700 hover:text-slate-100 transition"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span className="hidden sm:inline">Copy Email</span>
              </>
            )}
          </button>

          {/* Download CV Button */}
          <a
            href="/Johnathan_Hare_CV.pdf"
            download="Johnathan_Hare_CV.pdf"
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition shadow-sm shadow-cyan-500/20"
          >
            <Download className="h-3.5 w-3.5" />
            <span>CV (PDF)</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden rounded-lg border border-slate-800 text-slate-400 hover:text-slate-100"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2 pb-2 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Seeking 2027/28 Industrial Placement</span>
          </div>
          <a 
            href="#overview" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-cyan-400"
          >
            01. Overview
          </a>
          <a 
            href="#cad-viewer" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-cyan-400"
          >
            02. 3D CAD Lab
          </a>
          <a 
            href="#projects" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-cyan-400"
          >
            03. Projects
          </a>
          <a 
            href="#education" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-cyan-400"
          >
            04. Education
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-cyan-400"
          >
            05. Contact
          </a>
        </div>
      )}
    </nav>
  );
}
