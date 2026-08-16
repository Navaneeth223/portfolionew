'use client';

import React from 'react';
import { profile } from '@/lib/data';
import { useScramble } from '@/hooks/useScramble';
import { useMagnetic } from '@/hooks/useMagnetic';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Contact() {
  const { displayText: headingText } = useScramble("LET'S BUILD SOMETHING REAL", 30, 3);
  const emailCtaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section id="contact" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-line">
      <RevealOnScroll className="space-y-12 max-w-4xl">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-signal uppercase tracking-widest">
            // 06. INITIATE DISCUSSION
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight select-none">
            {headingText || "LET'S BUILD SOMETHING REAL"}
          </h2>
        </div>

        <p className="font-sans text-lg sm:text-xl text-inkdim leading-relaxed max-w-2xl">
          Available for remote full-stack roles, contract engineering, and high-impact freelance projects worldwide.
        </p>

        {/* Primary Magnetic CTA */}
        <div className="pt-4">
          <a
            ref={emailCtaRef}
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-4 px-8 py-5 bg-signal text-bg font-mono font-extrabold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(124,255,158,0.3)] rounded-none"
          >
            <Mail className="w-5 h-5" />
            <span>{profile.email}</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Secondary Socials & De-emphasized Phones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-line/60 pt-8 font-mono text-xs text-inkdim">
          {/* Social Profiles */}
          <div className="space-y-3">
            <div className="text-inkfaint uppercase tracking-wider text-[10px]">
              NETWORK_PROFILES
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-signal transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-signal" />
                <span>github.com/Navaneeth223</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-signal transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-signal" />
                <span>linkedin.com/in/navaneeth-kv-270386214</span>
              </a>
            </div>
          </div>

          {/* De-emphasized Phone Lines */}
          <div className="space-y-3">
            <div className="text-inkfaint uppercase tracking-wider text-[10px]">
              DIRECT_TELECOM_LINES
            </div>
            <div className="flex flex-col gap-2">
              {profile.phones.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 text-inkfaint">
                  <Phone className="w-3.5 h-3.5 text-signaldim" />
                  <span>
                    {p.label}: <strong className="text-inkdim font-mono">{p.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
