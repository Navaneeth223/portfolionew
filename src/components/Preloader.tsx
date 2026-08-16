'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

const LOG_MESSAGES = [
  'booting portfolio.exe',
  'installing react, next.js, node.js, django',
  'linking 25+ shipped projects',
  'connecting druv360 — status: online',
  'ready',
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(100);
      setLogIndex(LOG_MESSAGES.length - 1);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 200);
      return;
    }

    let current = 0;
    const duration = 1800; // ms total
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        setCount(100);
        setLogIndex(LOG_MESSAGES.length - 1);
        clearInterval(timer);

        // Slide up preloader panel after reaching 100%
        setTimeout(() => {
          gsap.to('#preloader-container', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsVisible(false);
              if (onComplete) onComplete();
            },
          });
        }, 300);
      } else {
        const MathCount = Math.floor(current);
        setCount(MathCount);
        // Map count percentage to log index
        const idx = Math.min(
          Math.floor((MathCount / 100) * LOG_MESSAGES.length),
          LOG_MESSAGES.length - 1
        );
        setLogIndex(idx);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      id="preloader-container"
      className="fixed inset-0 z-50 bg-bg text-ink flex flex-col justify-between p-6 md:p-12 font-mono border-b border-line selection:bg-signal selection:text-bg"
    >
      {/* Top Meta Header */}
      <div className="flex items-center justify-between text-xs text-inkfaint uppercase tracking-wider">
        <span>System Boot // Navaneeth KV</span>
        <span>Muscat / Kerala</span>
      </div>

      {/* Center Boot Terminal Log */}
      <div className="max-w-xl mx-auto w-full my-auto space-y-4">
        <div className="flex items-center gap-2 text-signal text-sm">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse-signal" />
          <span>[INITIALIZING ENVIRONMENT]</span>
        </div>

        <div className="bg-surface border border-line p-6 rounded-none space-y-2 text-sm">
          {LOG_MESSAGES.slice(0, logIndex + 1).map((msg, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-signaldim select-none">&gt;</span>
              <span
                className={
                  idx === logIndex ? 'text-ink font-semibold' : 'text-inkdim'
                }
              >
                {msg}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Counter */}
      <div className="space-y-3 max-w-xl mx-auto w-full">
        <div className="flex justify-between items-baseline font-mono text-sm">
          <span className="text-inkdim">DEPL_PROGRESS</span>
          <span className="text-signal text-2xl font-bold font-display">
            {count.toString().padStart(3, '0')}%
          </span>
        </div>

        {/* Thin signal green progress bar */}
        <div className="h-1 w-full bg-surface2 overflow-hidden relative">
          <div
            className="h-full bg-signal transition-all duration-75 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
