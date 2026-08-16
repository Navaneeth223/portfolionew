'use client';

import React from 'react';
import { profile } from '@/lib/data';
import { useScramble } from '@/hooks/useScramble';
import { useMagnetic } from '@/hooks/useMagnetic';
import { ArrowDown, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Hero() {
  const { displayText: nameText } = useScramble(profile.name, 35, 4);
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.3);
  const secondaryCtaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section
      id="hero"
      className="min-h-screen pt-32 pb-16 flex flex-col justify-between px-6 lg:px-12 max-w-7xl mx-auto relative z-10"
    >
      {/* Top Eyebrow Status */}
      <RevealOnScroll className="w-full">
        <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-surface border border-line rounded-none font-mono text-xs text-inkdim">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse-signal" />
          <span className="text-signal uppercase tracking-wider font-semibold">
            Status
          </span>
          <span className="text-line">|</span>
          <span>{profile.remote}</span>
        </div>
      </RevealOnScroll>

      {/* Main Asymmetric Content Block */}
      <div className="my-auto pt-8 pb-12 max-w-4xl space-y-8">
        {/* Scramble Title */}
        <h1 className="font-display font-extrabold tracking-tight text-ink leading-[1.05] text-[clamp(2.5rem,7.5vw,5.5rem)] select-none">
          {nameText || profile.name}
        </h1>

        {/* Subheading / Role */}
        <div className="font-mono text-sm sm:text-base text-signal flex items-center gap-3 uppercase tracking-wider">
          <span className="text-signaldim">//</span>
          <span>{profile.roleLong}</span>
          <span className="text-signaldim">·</span>
          <span className="text-inkdim">{profile.currentCity}</span>
        </div>

        {/* Verbatim Summary Paragraph */}
        <p className="font-sans text-lg sm:text-xl text-inkdim leading-relaxed max-w-3xl">
          {profile.summary}
        </p>

        {/* CTAs & Social Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            ref={primaryCtaRef}
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-signal text-bg font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(124,255,158,0.25)] rounded-none"
          >
            <Mail className="w-4 h-4" />
            <span>Initiate Contact</span>
          </a>

          <a
            ref={secondaryCtaRef}
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 border border-line bg-surface text-ink font-mono text-xs uppercase tracking-wider hover:border-signal hover:text-signal transition-colors rounded-none"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repos</span>
            <ExternalLink className="w-3.5 h-3.5 text-inkfaint" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 border border-line bg-surface text-inkdim hover:border-signal hover:text-signal transition-colors rounded-none"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom HUD Readout & Scroll Cue */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-line/60 pt-6 font-mono text-xs text-inkfaint">
        {/* HUD Stats */}
        <div className="flex items-center gap-6">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase text-inkfaint block">SYS_REPOS</span>
            <span className="text-ink font-semibold">200+ active</span>
          </div>
          <div className="h-6 w-[1px] bg-line" />
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase text-inkfaint block">SYS_SHIPPED</span>
            <span className="text-ink font-semibold">25+ production</span>
          </div>
          <div className="h-6 w-[1px] bg-line" />
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase text-inkfaint block">WORKFLOW</span>
            <span className="text-signal font-semibold">AI-Assisted</span>
          </div>
        </div>

        {/* Scroll Cue */}
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-inkdim hover:text-signal transition-colors uppercase tracking-widest group"
        >
          <span>Scroll down</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
