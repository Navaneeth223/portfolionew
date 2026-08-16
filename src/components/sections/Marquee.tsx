'use client';

import React from 'react';

const TECH_ITEMS = [
  'React.js',
  'Next.js',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
  'Three.js',
  'Django',
  'AWS',
  'Docker',
  'Redis',
  'GSAP',
];

export default function Marquee() {
  // Multiply items for seamless continuous looping
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-8 bg-surface border-y border-line overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8 font-mono text-xs text-inkdim">
        {marqueeItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="hover:text-signal transition-colors tracking-widest uppercase font-semibold whitespace-nowrap">
              {item}
            </span>
            <span className="text-signaldim select-none">✦</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
