'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Refs for persistent physics state without triggering useEffect re-runs
  const stateRef = useRef({
    mouseX: -100,
    mouseY: -100,
    lastX: -100,
    lastY: -100,
    isHovered: false,
    initialized: false,
  });

  useEffect(() => {
    // Disable on coarse pointer (touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial centering offsets via GSAP once
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const state = stateRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      if (!state.initialized) {
        state.lastX = e.clientX;
        state.lastY = e.clientY;
        state.initialized = true;
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.set(ring, { x: e.clientX, y: e.clientY });
      }

      // Smooth precision dot tracking
      gsap.to(dot, {
        x: state.mouseX,
        y: state.mouseY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    // Continuous physics render loop for trailing ring velocity stretch & elastic follow
    let animFrameId: number;

    const updatePhysics = () => {
      animFrameId = requestAnimationFrame(updatePhysics);

      if (!state.initialized) return;

      const velX = state.mouseX - state.lastX;
      const velY = state.mouseY - state.lastY;

      state.lastX += (state.mouseX - state.lastX) * 0.15;
      state.lastY += (state.mouseY - state.lastY) * 0.15;

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      // Organic velocity stretch
      const stretch = Math.min(speed * 0.015, 0.4);
      const scaleX = state.isHovered ? 1.6 : 1 + stretch;
      const scaleY = state.isHovered ? 1.6 : 1 - stretch * 0.5;

      gsap.set(ring, {
        x: state.lastX,
        y: state.lastY,
        rotation: speed > 2 && !state.isHovered ? angle : 0,
        scaleX,
        scaleY,
      });
    };

    animFrameId = requestAnimationFrame(updatePhysics);
    window.addEventListener('mousemove', handleMouseMove);

    // Global Event Delegation for Interactive Elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('#projects > div, #more-work a');

      if (clickable || projectCard) {
        state.isHovered = true;

        if (projectCard) {
          setCursorText('VIEW');
        } else if (clickable?.getAttribute('href')?.startsWith('mailto:')) {
          setCursorText('TALK');
        } else if (clickable?.getAttribute('target') === '_blank') {
          setCursorText('OPEN');
        } else {
          setCursorText('');
        }

        gsap.to(ring, {
          borderColor: '#7CFF9E',
          backgroundColor: 'rgba(124, 255, 158, 0.12)',
          duration: 0.25,
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: '#7CFF9E',
          duration: 0.2,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('#projects > div, #more-work a');

      if (clickable || projectCard) {
        state.isHovered = false;
        setCursorText('');

        gsap.to(ring, {
          borderColor: 'rgba(124, 255, 158, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          duration: 0.25,
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#7CFF9E',
          duration: 0.2,
        });
      }
    };

    // Click feedback pulse
    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1, ease: 'power2.in' });
      gsap.to(dot, { scale: 1.8, duration: 0.1, ease: 'power2.in' });
    };

    const handleMouseUp = () => {
      gsap.to(ring, {
        scale: state.isHovered ? 1.6 : 1,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.4)',
      });
      gsap.to(dot, {
        scale: state.isHovered ? 0.5 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animFrameId);
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Precision Core Signal Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-signal rounded-full pointer-events-none z-50 shadow-[0_0_12px_rgba(124,255,158,0.8)]"
      />

      {/* Trailing Elastic Physics Ring with Contextual Hover State */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-signal/40 rounded-full pointer-events-none z-50 flex items-center justify-center transition-colors duration-200"
      >
        {/* Contextual Micro-Label (VIEW / TALK / OPEN) */}
        {cursorText && (
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-bold text-signal tracking-widest uppercase select-none animate-in fade-in zoom-in-75 duration-150"
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
