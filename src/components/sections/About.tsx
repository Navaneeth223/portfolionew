'use client';

import React from 'react';
import { profile, stats } from '@/lib/data';
import { useCountUp } from '@/hooks/useCountUp';
import RevealOnScroll from '@/components/RevealOnScroll';

function StatCard({ item }: { item: (typeof stats)[0] }) {
  const count = useCountUp(item.value || 0, 1500, true);

  return (
    <div className="bg-surface border border-line p-6 hover:border-signaldim transition-colors flex flex-col justify-between rounded-none">
      <div className="font-mono text-xs text-inkfaint uppercase tracking-wider mb-2">
        {item.status ? 'AVAILABILITY' : 'METRIC'}
      </div>

      {item.status ? (
        <div className="flex items-center gap-3 my-auto">
          <span className="w-3 h-3 rounded-full bg-signal animate-pulse-signal" />
          <span className="font-display text-lg sm:text-xl font-bold text-signal">
            {item.label}
          </span>
        </div>
      ) : (
        <div className="my-auto">
          <div className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight">
            {count}
            <span className="text-signal">{item.suffix}</span>
          </div>
          <div className="font-mono text-xs text-inkdim mt-2 uppercase tracking-wide">
            {item.label}
          </div>
        </div>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-line">
      <RevealOnScroll className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-signal uppercase tracking-widest">
            // 01. SYSTEMS ARCHITECTURE & PROFILE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Engineering for real-world impact
          </h2>
        </div>

        {/* Asymmetric 2-column Grid: Wide Bio Column & 4 Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6 font-sans text-base sm:text-lg text-inkdim leading-relaxed">
            <p>
              I build and ship full-stack products — React and Next.js on the front end, Node,
              Django and PostgreSQL underneath. Four years in, currently building a real-time
              recruitment platform at <span className="text-ink font-semibold">Druv360</span>, and running an
              independent freelance practice alongside it.
            </p>
            <p>
              AI-assisted daily: <span className="text-signal font-mono text-sm">Claude Code</span>,{' '}
              <span className="text-signal font-mono text-sm">Cursor</span> and{' '}
              <span className="text-signal font-mono text-sm">Gemini CLI</span> are part of how I write and
              ship software, not a side experiment.
            </p>
            <div className="pt-4 font-mono text-xs text-inkfaint border-t border-line/50 flex flex-wrap gap-4">
              <span>LOCATION: {profile.location}</span>
              <span>·</span>
              <span>CURRENT: {profile.currentCity}</span>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {stats.map((st, idx) => (
              <StatCard key={idx} item={st} />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
