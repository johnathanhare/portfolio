'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CadViewer from '@/components/CadViewer';
import ProjectCard from '@/components/ProjectCard';
import ProjectDrawer, { ProjectData } from '@/components/ProjectDrawer';
import EducationSection from '@/components/EducationSection';
import Footer from '@/components/Footer';
import { Layers, Compass, Sparkles, Terminal } from 'lucide-react';

const PROJECTS: ProjectData[] = [
  {
    id: 'materials-dashboard',
    title: 'Materials Informatics & Ashby Property Selection Dashboard',
    category: 'Computational Materials / Web App',
    badge: 'Live Interactive Tool',
    shortDesc: 'Full-stack computational materials selection platform featuring 65 verified commercial materials across 5 families, Recharts log-scale mathematical domains, and Materials Project quantum API integration.',
    specs: [
      { label: 'Materials Plotted', val: '65 Verified Materials' },
      { label: 'Families Covered', val: 'Metals, Polymers, Ceramics, Composites, Natural' },
      { label: 'Data Accuracy', val: 'MatWeb, NIST & Ashby Citations' },
      { label: 'API Integration', val: 'The Materials Project (DFT Elasticity)' }
    ],
    overview: [
      'Engineered an interactive engineering dashboard designed to solve the materials selection problem formulated by Prof. M. F. Ashby. Allows engineers to dynamically plot and evaluate performance indices across Young’s modulus, yield strength, density, and bulk modulus.',
      'Includes an integrated API client to dynamically query and visualize first-principles quantum calculations from the Materials Project database alongside commercial engineering handbooks.'
    ],
    engineeringChallenges: [
      'Logarithmic Axis Rendering: Standard Cartesian charts fail when visualizing materials spanning orders of magnitude (aerogels at 0.001 GPa up to diamond at 1000 GPa). Recharts throws unhandled exceptions if non-positive or undefined values are plotted on log axes.',
      'Database Purity & Cross-Referencing: Open DFT crystal databases contain only inorganic crystals and lack commercial polymers and woods. Required rigorous schema-validation pipelines to verify empirical mechanical properties.'
    ],
    solutions: [
      'Implemented robust data pre-filtering and mathematical domain boundaries (domain={[min * 0.5, max * 1.5]}) to ensure zero-crash logarithmic rendering.',
      'Wrapped the chart in an SVG transformation layer using react-zoom-pan-pinch to enable smooth trackpad panning and zooming without re-rendering the Recharts SVG tree.',
      'Derived missing isotropic Bulk Modulus values using Young’s modulus and Poisson’s ratio equations: K = E / [3(1 - 2ν)].'
    ],
    keyOutcomes: [
      'Completed and verified exactly 65 materials across all 5 standard engineering families.',
      'Zero-crash, fully interactive logarithmic scatter plot with dynamic family filtering and color-coded keys.',
      'Integrated an AI materials selection copilot with automated mechanical suitability recommendations.'
    ],
    tags: ['Materials Informatics', 'Ashby Charts', 'Next.js', 'TypeScript', 'Recharts', 'Python', 'The Materials Project API'],
    liveLink: 'http://localhost:3000'
  },
  {
    id: 'rocketry',
    title: 'Aerodynamic Rocketry Iteration: Taranis IV & BAR',
    category: 'Aerospace Prototyping / Additive Manufacturing',
    badge: 'Blender & CAD Flight Models',
    shortDesc: 'Physical engineering iteration series sculpted in Blender and engineered in CAD. Spans Taranis IV (the final iteration of the Taranis family) and BAR (a bigger, better, and more streamlined design that worked flawlessly on its first flight).',
    specs: [
      { label: 'Rocket Series', val: 'Taranis IV & BAR Modular' },
      { label: 'Modeling Tools', val: 'Blender & Parametric CAD' },
      { label: 'Material Selection', val: 'PLA+' },
      { label: 'Aerodynamics', val: 'OpenRocket (.ork) Simulation' }
    ],
    overview: [
      'Documented complete physical engineering design cycles across the Taranis and BAR rocket platforms, moving from early flight stability testing to soft parachute recovery.',
      'Taranis IV stands as the final iteration of the Taranis family, while BAR provides a bigger, better, and more streamlined design sculpted in Blender and engineered in CAD that worked flawlessly on its first flight.'
    ],
    engineeringChallenges: [
      'Early Apogee Instability: Initial launch configurations experienced mid-flight tumbling caused by an inadequate stability margin between Center of Gravity and Center of Pressure.',
      'Motor Heat Dissipation: Engine burn temperatures caused localized softening in the areas around the motor',
      'Rapid Iteration: Early iterations required entire reprints due to inexperience with CAD and tolerances'
    ],
    solutions: [
      'Simulated aerodynamic stability in OpenRocket, designing swept trapezoidal fins for Taranis IV (final iteration of the Taranis family) to establish a rock-solid 1.5-caliber margin.',
      'Engineered a multi-section modular architecture for BAR (Engine Bay, Mid Section, Top Section, Nosecone) in Blender and CAD for rapid component replacement.',
      'Engineered heat-deflecting air gaps and reinforced engine collar geometry in PLA+ to prevent motor burn deformation.'
    ],
    keyOutcomes: [
      'BAR worked flawlessly on its first flight with soft parachute recovery.',
      'Taranis IV established 100% flight stability as the final evolution of the Taranis family.',
      'Native STL files rendered live in the site’s interactive 3D WebGL viewport.'
    ],
    tags: ['BAR Rocket', 'Taranis IV', 'Blender', 'CAD', '3D Printing', 'OpenRocket', 'Aerodynamics', 'Failure Analysis', 'PLA+']
  },
  {
    id: 'tensile-tester',
    title: 'Desktop Mini Tensile Testing Rig (Active R&D Build)',
    category: 'Mechanical Design / Sensor Instrumentation',
    badge: 'Active R&D Prototype',
    shortDesc: 'Desktop mechanical tensile testing frame designed to acquire live stress-strain curves (σ-ε) for 3D printed polymer specimens. Combines dual leadscrews, a 500N load cell, and ESP32 telemetry.',
    specs: [
      { label: 'Load Capacity', val: '500 N (50 kg S-Beam Load Cell)' },
      { label: 'Signal Conditioning', val: '24-Bit HX711 ADC @ 80 Hz' },
      { label: 'Drive Assembly', val: 'Dual Tr8x8 Leadscrews & NEMA 17' },
      { label: 'Testing Standard', val: 'ASTM E8 / D638 Scaled Specimens' }
    ],
    overview: [
      'Developing an affordable, accessible desktop tensile tester to mechanically characterize 3D-printed polymer specimens (PLA, PETG, ABS, TPU) directly at the workstation.',
      'Acquires real-time force and crosshead displacement to compute engineering stress (σ = F/A₀), engineering strain (ε = ΔL/L₀), yield strength, and Young’s modulus.'
    ],
    engineeringChallenges: [
      'Frame Compliance Compensation: 3D-printed load frames experience elastic deflection under load, which skews specimen displacement measurements if uncalibrated.',
      'Microvolt Signal Acquisition: Strain gauge load cell signals operate in the millivolt/microvolt range, vulnerable to stepper motor EMI.'
    ],
    solutions: [
      'Engineered high-infill triangular truss ribbing across the frame pillars to maximize torsional and bending stiffness.',
      'Implemented machine compliance baseline subtraction in firmware to decouple frame deflection from actual specimen gauge strain.',
      'Integrated shielded twisted-pair wiring and hardware low-pass filtering on the 24-bit ADC.'
    ],
    keyOutcomes: [
      'CAD assembly finalized; load cell calibration and electronics integration underway.',
      'Target performance: capture elastic deformation, yield point, necking, and ultimate tensile failure within 3% of commercial testing rigs.'
    ],
    tags: ['Tensile Testing', 'Load Cells', 'ESP32', 'Arduino', 'ASTM E8', 'SolidWorks', 'Instrumentation']
  },
  {
    id: 'iom3-outreach',
    title: 'Winner — IOM3 Undergraduate Outreach Challenge (Awarded March 2026)',
    category: 'National Award / Science Communication',
    badge: '1st Place National Prize',
    shortDesc: 'Awarded 1st place nationally in March 2026 by the Institute of Materials, Minerals and Mining for excellence in translating complex metallurgical phenomena and crystal defect kinetics into accessible public demonstrations at the University of Sheffield.',
    specs: [
      { label: 'Awarding Body', val: 'Institute of Materials, Minerals and Mining (IOM3)' },
      { label: 'Scope', val: 'National UK Competition' },
      { label: 'Discipline', val: 'Physical Metallurgy & Crystal Kinetics' },
      { label: 'Award Date', val: 'March 2026 @ University of Sheffield' }
    ],
    overview: [
      'Participated in and won the national March 2026 IOM3 Undergraduate Outreach Challenge, designed to inspire the next generation of engineers by demystifying materials science.',
      'Authored and presented interactive physical models illustrating dislocation movement, slip planes, and work hardening in metals.'
    ],
    engineeringChallenges: [
      'Conceptual Abstraction: Communicating microscopic metallurgical concepts (such as Taylor dislocation pinning and grain boundary impedance) to non-technical audiences without sacrificing scientific rigor.'
    ],
    solutions: [
      'Created intuitive mechanical bubble-raft and magnetic analogues to physically visualize atomic slip and shear stresses.',
      'Defended the educational methodology and metallurgical foundations before a panel of senior IOM3 materials fellows and industry judges.'
    ],
    keyOutcomes: [
      'Awarded national 1st place by IOM3.',
      'Demonstrated high-level technical communication and presentation capabilities critical for industrial placement R&D teams.'
    ],
    tags: ['IOM3', 'Materials Science', 'Science Communication', 'Metallurgy', 'Public Outreach', 'National Award']
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 bg-blueprint-grid selection:bg-cyan-500 selection:text-slate-950">
      {/* Background radial glow */}
      <div className="pointer-events-none fixed inset-0 bg-radial-gradient" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* 3D CAD Viewport Section */}
      <section id="cad-viewer" className="py-12 md:py-16 border-t border-slate-800/80 bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">02. Interactive 3D CAD Lab</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mt-1">
              Inspect Physical CAD Geometry in 3D
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Use your mouse or trackpad to rotate, zoom, and inspect 3D engineering components directly in real-time WebGL.
            </p>
          </div>

          <CadViewer />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 md:py-24 border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">03. Engineering Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mt-1">
                The 4 Core Engineering Pillars
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                Tangible physical prototypes, computational informatics tools, and nationally recognized materials science achievements.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl">
              <Compass className="h-4 w-4 text-cyan-400" />
              <span>Click any project to inspect technical specs</span>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onOpenDrawer={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education & Laboratory Rigor Section */}
      <EducationSection />

      {/* Footer & Placement CTA */}
      <Footer />

      {/* Interactive Deep-Dive Drawer Modal */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
