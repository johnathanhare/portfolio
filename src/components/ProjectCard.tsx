'use client';

import React from 'react';
import { ArrowUpRight, Cpu, Wrench, ChevronRight } from 'lucide-react';
import { ProjectData } from './ProjectDrawer';

interface ProjectCardProps {
  project: ProjectData;
  onOpenDrawer: (project: ProjectData) => void;
}

export default function ProjectCard({ project, onOpenDrawer }: ProjectCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenDrawer(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDrawer(project);
        }
      }}
      className="group relative rounded-2xl border border-slate-800 bg-slate-950/70 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/50 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col h-full md:min-h-[385px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
    >
      {/* Top Header & Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-slate-400 border border-slate-800 px-2 py-0.5 rounded bg-slate-900">
            {project.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        {/* Short Summary */}
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          {project.shortDesc}
        </p>
      </div>

      {/* Key Specs Grey Boxes (Anchored at identical vertical position above bottom line) */}
      <div className="mt-auto pt-5">
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          {project.specs.slice(0, 2).map((s, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded p-2.5 h-[52px] flex flex-col justify-center">
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider">{s.label}</span>
              <span className="text-slate-300 font-semibold truncate block mt-0.5">{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDrawer(project);
          }}
          className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 hover:underline transition"
        >
          <span>Inspect Technical Details</span>
          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition"
            title="Launch External Tool"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
