'use client';

import React from 'react';
import { moreWork } from '@/lib/data';
import { ExternalLink } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function MoreWork() {
  return (
    <section id="more-work" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-line">
      <RevealOnScroll className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-signal uppercase tracking-widest">
            // 05. ADDITIONAL DEPLOYED CLIENT SITES & EXPERIMENTS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Archive & Commercial Work (20+ Shipped)
          </h2>
        </div>

        {/* 3 Categories Grid */}
        <div className="space-y-12">
          {Object.entries(moreWork).map(([category, items], cIdx) => (
            <div key={cIdx} className="space-y-4">
              <div className="font-mono text-xs text-inkdim uppercase tracking-wider flex items-center gap-3 border-b border-line pb-2">
                <span className="text-signal">//</span>
                <span className="text-ink font-semibold">{category}</span>
                <span className="text-inkfaint">({items.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(([name, url], itemIdx) => (
                  <a
                    key={itemIdx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-surface border border-line p-4 hover:border-signal/60 hover:bg-surface2 transition-all flex items-center justify-between rounded-none"
                  >
                    <span className="font-mono text-xs text-inkdim group-hover:text-ink transition-colors truncate pr-2">
                      {name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-inkfaint group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
