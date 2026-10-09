'use client';

import React from 'react';
import { Award, Microscope, CheckCircle2 } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">04. Academic Foundation</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mt-1">
            Education, Laboratory Rigor & Leadership
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Materials science fundamentals paired with hands-on testing protocols, mathematical modeling, and university society leadership.
          </p>
        </div>

        {/* Dedicated Standalone Spotlight: Honors & Awards */}
        <div className="mt-10 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-slate-900/60 p-6 md:p-8 technical-glow-amber">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/40">
                    National Award Winner
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Awarded March 2026 @ Sheffield
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                  Winner — IOM3 Undergraduate Outreach Challenge
                </h3>
                <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  Awarded 1st place nationally by the Institute of Materials, Minerals and Mining for excellence in translating complex physical metallurgy concepts (atomic slip planes, dislocation movement, and defect kinetics) into intuitive, accessible public demonstrations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Grid: Sheffield & A-Levels (Separated from awards) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* University of Sheffield */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
                  Undergraduate (Year 2)
                </span>
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  On Track for 1st
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100">The University of Sheffield</h3>
              <p className="text-sm font-medium text-slate-400 mt-0.5">
                MEng / BEng Materials Science and Engineering (2025 – 2029/30)
              </p>

              {/* Coursework Modules */}
              <div className="mt-5 space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
                  Core Laboratory & Analytical Modules:
                </span>
                
                <div className="text-xs text-slate-300 space-y-1.5 font-mono">
                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-cyan-400 font-bold">CMB107:</span> Materials Characterisation & Microstructure (Tensile, Hardness, Microscopy)
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-cyan-400 font-bold">CMB106/233:</span> Functional & Magnetic Materials (Domain Kinetics, Hysteresis, Semiconductors)
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-cyan-400 font-bold">CMB119:</span> Polymer Science & Technology (Polymerization Kinetics, Morphology, Spectroscopy)
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-cyan-400 font-bold">MAT1220:</span> Engineering Mathematics (Laplace Transforms, Vectors, Differential Equations)
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership & Activities (Formula student removed) */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
                Societies & Leadership:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  🏆 UoS Rounders Club Captain (2026/27)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  🔬 Materials Science Society
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Education: A-Levels (Cleanly isolated) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full">
                  A-Levels & GCSEs
                </span>
                <span className="font-mono text-xs text-slate-300 font-bold">
                  Grades: AAB
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100">Cramlington Learning Village</h3>
              <p className="text-sm font-medium text-slate-400 mt-0.5">
                September 2018 – July 2025
              </p>

              {/* Subject Breakdown */}
              <div className="mt-5 space-y-2.5 font-mono text-xs">
                <span className="text-slate-500 uppercase tracking-wider block">
                  Subject Breakdown:
                </span>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Mathematics</span>
                  <span className="text-cyan-400 font-bold px-2 py-0.5 bg-cyan-950/80 rounded border border-cyan-800/40">Grade A</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Physics</span>
                  <span className="text-cyan-400 font-bold px-2 py-0.5 bg-cyan-950/80 rounded border border-cyan-800/40">Grade A</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Geography</span>
                  <span className="text-slate-300 font-bold px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Grade B</span>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">
                    • Bronze Duke of Edinburgh's Award (2022) — Volunteering, physical endurance, and teamwork expeditions.
                  </span>
                </div>
              </div>
            </div>

            {/* Part-Time Operational Consistency */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
                Work Consistency:
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                High-volume operational experience across McDonald's kitchen crew and Wetherspoons floor associate, proving reliability, teamwork, and fast problem solving under pressure.
              </p>
            </div>
          </div>
        </div>

        {/* Laboratory & Technical Competencies Matrix */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            <span>Hands-On Engineering & Laboratory Competencies</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Mechanical Testing</span>
              </span>
              <ul className="text-slate-400 space-y-1">
                <li>• Tensile testing (ASTM E8)</li>
                <li>• Hardness testing (Vickers/Brinell)</li>
                <li>• Stress-strain analysis (σ-ε)</li>
                <li>• Failure & necking observation</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Microstructure & Analysis</span>
              </span>
              <ul className="text-slate-400 space-y-1">
                <li>• Optical metallography</li>
                <li>• Phase diagram interpretation</li>
                <li>• Grain size estimation</li>
                <li>• Crystallographic indexing</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>CAD & Prototyping</span>
              </span>
              <ul className="text-slate-400 space-y-1">
                <li>• Blender & SolidWorks CAD</li>
                <li>• FDM 3D Printing (PETG/PLA)</li>
                <li>• Iterative tolerance tuning</li>
                <li>• Mechanical assembly</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Computation & Informatics</span>
              </span>
              <ul className="text-slate-400 space-y-1">
                <li>• Python (NumPy, SciPy)</li>
                <li>• Next.js / TypeScript data tools</li>
                <li>• Materials Project REST API</li>
                <li>• OpenRocket aerodynamics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
