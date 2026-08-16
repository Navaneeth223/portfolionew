'use client';

import React, { useEffect, useRef } from 'react';
import { experience, education, certifications } from '@/lib/data';
import { gsap } from '@/lib/gsap';
import { GraduationCap, Award, Briefcase } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { scaleY: 1 });
      return;
    }

    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#timeline-container',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-line">
      <RevealOnScroll className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-signal uppercase tracking-widest">
            // 03. CHRONOLOGICAL EXPERIENCE & CREDENTIALS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Experience & Credentials
          </h2>
        </div>

        {/* 2-column Grid: Timeline (Left) & Education/Certs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Work Experience Timeline */}
          <div className="lg:col-span-8 relative space-y-12 pl-6 sm:pl-8" id="timeline-container">
            {/* Background Line */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-line" />

            {/* Scroll Scrubbed Active Green Line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-signal origin-top"
            />

            {experience.map((item, idx) => (
              <div key={idx} className="relative space-y-3 group">
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-bg border-2 border-signal rounded-none group-hover:scale-125 transition-transform" />

                <div className="bg-surface border border-line p-6 sm:p-8 hover:border-signaldim transition-colors space-y-4 rounded-none">
                  {/* Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-signal font-bold">0{idx + 1}.</span>
                      <span className="text-ink font-semibold uppercase tracking-wider">
                        {item.company}
                      </span>
                    </div>
                    <span className="text-inkfaint border border-line px-2 py-0.5 bg-surface2">
                      {item.date}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-signal" />
                    <span>{item.role}</span>
                  </h3>

                  {/* Bullet Points */}
                  <ul className="space-y-2 font-sans text-sm text-inkdim leading-relaxed">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-signal font-mono select-none mt-1">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Companion Panel: Education & Certifications */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education Card */}
            <div className="bg-surface border border-line p-6 space-y-3 rounded-none">
              <div className="flex items-center gap-2 text-signal font-mono text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-ink">
                  {education.degree}
                </h4>
                <div className="font-mono text-xs text-inkdim">
                  {education.school} · {education.date}
                </div>
              </div>

              <p className="font-sans text-xs text-inkfaint leading-relaxed border-t border-line/60 pt-2">
                Coursework: {education.coursework}
              </p>
            </div>

            {/* Certifications Card */}
            <div className="bg-surface border border-line p-6 space-y-4 rounded-none">
              <div className="flex items-center gap-2 text-signal font-mono text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Certifications</span>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="border-b border-line/40 pb-2 last:border-0 last:pb-0 space-y-0.5"
                  >
                    <div className="font-sans text-sm font-medium text-ink">
                      {cert.name}
                    </div>
                    <div className="font-mono text-xs text-inkfaint">
                      {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
