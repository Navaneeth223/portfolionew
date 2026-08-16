'use client';

import React from 'react';
import { skillGroups } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-line">
      <RevealOnScroll className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-signal uppercase tracking-widest">
            // 02. TECHNICAL CAPABILITIES
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Stack & Modern Tooling
          </h2>
        </div>

        {/* 6 Skill Group Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="bg-surface border border-line p-6 hover:border-signaldim transition-colors space-y-4 rounded-none group"
            >
              {/* Category Title */}
              <div className="font-mono text-xs text-signal uppercase tracking-wider flex items-center justify-between">
                <span>{group.title}</span>
                <span className="text-inkfaint text-[10px]">0{idx + 1}</span>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="px-3 py-1.5 bg-surface2 border border-line text-inkdim text-xs font-mono rounded-md hover:border-signal hover:text-signal hover:shadow-[0_0_10px_rgba(124,255,158,0.2)] transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
