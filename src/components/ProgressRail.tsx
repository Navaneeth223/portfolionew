'use client';

import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: '~/' },
  { id: 'about', label: '~/about' },
  { id: 'skills', label: '~/stack' },
  { id: 'projects', label: '~/work' },
  { id: 'experience', label: '~/timeline' },
  { id: 'contact', label: '~/contact' },
];

export default function ProgressRail() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine active section based on top position
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-8 font-mono select-none"
      aria-label="Section Navigation"
    >
      {/* Vertical Rail Line Container */}
      <div className="relative h-64 w-[2px] bg-line ml-3">
        {/* Proportional Scroll Fill */}
        <div
          className="absolute top-0 left-0 w-full bg-signal transition-all duration-150 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Section Ticks */}
      <nav className="flex flex-col gap-5 -mt-64 text-xs">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group flex items-center gap-3 text-left focus-visible:outline-none"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Tick Dot */}
              <span
                className={`w-2.5 h-2.5 rounded-none border transition-all duration-200 ${
                  isActive
                    ? 'bg-signal border-signal scale-110 shadow-[0_0_8px_rgba(124,255,158,0.5)]'
                    : 'bg-surface border-line group-hover:border-signaldim'
                }`}
              />

              {/* Tick Label */}
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-signal font-semibold tracking-wider'
                    : 'text-inkfaint group-hover:text-inkdim'
                }`}
              >
                {sec.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
