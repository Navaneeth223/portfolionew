'use client';

import React from 'react';
import { profile } from '@/lib/data';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 lg:px-12 max-w-7xl mx-auto font-mono text-xs text-inkfaint flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 border-t border-line/40">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-signal rounded-none" />
        <span>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-signal transition-colors"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-signal transition-colors"
        >
          LinkedIn
        </a>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 p-2 bg-surface border border-line text-inkdim hover:border-signal hover:text-signal transition-colors rounded-none"
          aria-label="Back to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
