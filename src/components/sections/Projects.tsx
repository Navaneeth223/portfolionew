'use client';

import React from 'react';
import { projects, Project } from '@/lib/data';
import { useTilt } from '@/hooks/useTilt';
import { ExternalLink, Info, Terminal } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

const GRADIENT_STYLES = [
  // MindVault: Multi-LLM / AI mesh
  'radial-gradient(circle at 30% 30%, rgba(124,255,158,0.18), transparent 60%), radial-gradient(circle at 80% 70%, rgba(30,60,40,0.5), transparent)',
  // PDFforge: Conic toolkit sweep
  'conic-gradient(from 180deg at 50% 50%, rgba(124,255,158,0.15), rgba(20,23,15,0.95), rgba(62,92,70,0.3))',
  // Transport Management System: Blueprint operations grid
  'radial-gradient(circle at 50% 40%, rgba(124,255,158,0.2), transparent 70%), linear-gradient(135deg, rgba(20,23,15,0.9), rgba(10,12,9,0.95))',
  // Job Portal: Candidate portal spectrum
  'radial-gradient(circle at 20% 80%, rgba(124,255,158,0.15), transparent 60%), radial-gradient(circle at 80% 20%, rgba(50,90,65,0.3), transparent)',
  // OmniCut: Media utility pulse
  'radial-gradient(ellipse at center, rgba(124,255,158,0.16), rgba(11,13,10,0.95))',
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useTilt<HTMLDivElement>(6);
  const gradientStyle = GRADIENT_STYLES[index % GRADIENT_STYLES.length];

  return (
    <div
      ref={cardRef}
      className="bg-surface border border-line hover:border-signal/60 transition-all duration-300 rounded-none overflow-hidden group flex flex-col justify-between transform-gpu"
    >
      {/* Generative Visual Header */}
      <div
        className="h-48 sm:h-56 relative w-full border-b border-line p-6 flex flex-col justify-between overflow-hidden"
        style={{ background: gradientStyle }}
      >
        {/* Subtle Cyber Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(242,240,230,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,230,0.1) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs">
          <span className="text-signal font-bold tracking-widest uppercase">
            PROJECT // 0{index + 1}
          </span>
          <Terminal className="w-4 h-4 text-inkfaint group-hover:text-signal transition-colors" />
        </div>

        {/* Big Decorative Title Background */}
        <div className="relative z-10 font-display font-black text-3xl sm:text-4xl text-ink tracking-tight group-hover:translate-x-1 transition-transform">
          {project.title}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between bg-surface">
        <div className="space-y-4">
          <p className="font-sans text-sm sm:text-base text-inkdim leading-relaxed">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 bg-surface2 border border-line text-[11px] font-mono text-inkdim rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Link or Demo Note */}
        <div className="border-t border-line/60 pt-4 font-mono text-xs">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-signal hover:underline font-semibold uppercase tracking-wider group/link"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <div className="flex items-start gap-2 text-inkfaint bg-surface2 p-3 border border-line">
              <Info className="w-4 h-4 text-signal shrink-0 mt-0.5" />
              <span className="leading-snug">{project.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-line">
      <RevealOnScroll className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-signal uppercase tracking-widest">
            // 04. FEATURED CASE STUDIES
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Featured Systems & Deployments
          </h2>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} project={proj} index={idx} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
