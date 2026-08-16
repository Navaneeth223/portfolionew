'use client';

import React, { useState, useEffect } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/data';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Stack' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-line py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Monogram Logo Mark */}
        <a
          href="#hero"
          className="group flex items-center gap-3 font-mono text-sm tracking-tight focus-visible:outline-none"
          aria-label="Navaneeth KV Home"
        >
          <span className="w-8 h-8 border border-line bg-surface flex items-center justify-center font-display font-bold text-ink group-hover:border-signal group-hover:text-signal transition-colors rounded-none">
            NK
          </span>
          <span className="text-inkdim group-hover:text-ink transition-colors font-mono text-xs hidden sm:inline-block">
            {profile.name} // {profile.role}
          </span>
        </a>

        {/* Desktop Links & Magnetic CTA */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-inkdim hover:text-signal transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}

          {/* Magnetic CTA */}
          <a
            ref={magneticRef}
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-signal text-signal bg-surface hover:bg-signal hover:text-bg font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded-none shadow-[0_0_12px_rgba(124,255,158,0.15)]"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-ink border border-line bg-surface hover:border-signal"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-down Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-line px-6 py-6 font-mono text-sm space-y-4 animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-inkdim hover:text-signal py-1 border-b border-line/40"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between w-full mt-4 px-4 py-3 bg-signal text-bg font-mono font-semibold text-xs uppercase tracking-wider"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
