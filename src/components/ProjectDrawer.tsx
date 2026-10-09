'use client';

import React from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, AlertTriangle, Layers, Activity } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  badge: string;
  shortDesc: string;
  specs: { label: string; val: string }[];
  overview: string[];
  engineeringChallenges: string[];
  solutions: string[];
  keyOutcomes: string[];
  tags: string[];
  liveLink?: string;
  githubLink?: string;
}

interface ProjectDrawerProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative h-full w-full max-w-2xl bg-slate-900 border-l border-slate-800 p-6 md:p-8 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                {project.category}
              </span>
              <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800/40">
                {project.badge}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        {(project.liveLink || project.githubLink) && (
          <div className="flex items-center gap-3 my-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition"
              >
                <span>Launch Live Tool</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
              >
                <span>Inspect Repository</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Technical Specification Matrix */}
        <div className="my-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>Technical Specification Matrix</span>
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {project.specs.map((s, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
                <span className="text-slate-500 block text-[10px] uppercase">{s.label}</span>
                <span className="text-slate-200 font-semibold">{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">Project Brief & Objectives</h4>
            {project.overview.map((para, idx) => (
              <p key={idx} className="mb-2 text-slate-300">{para}</p>
            ))}
          </div>

          {/* Engineering Challenges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <span>Key Engineering Challenges Encountered</span>
            </h4>
            <ul className="space-y-2">
              {project.engineeringChallenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Methodology */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>Applied Solutions & Technical Decisions</span>
            </h4>
            <ul className="space-y-2">
              {project.solutions.map((sol, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Outcomes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verified Outcomes & Impact</span>
            </h4>
            <ul className="space-y-2">
              {project.keyOutcomes.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tag Badges */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, idx) => (
                <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
