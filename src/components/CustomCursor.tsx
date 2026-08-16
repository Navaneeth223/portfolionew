'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable on coarse pointer (touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;

    let velX = 0;
    let velY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Fast dot tracking
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    // Physics ticker loop for trailing ring velocity stretch & smooth follow
    let animFrameId: number;

    const updatePhysics = () => {
      animFrameId = requestAnimationFrame(updatePhysics);

      // Compute velocity
      velX = mouseX - lastX;
      velY = mouseY - lastY;

      lastX += (mouseX - lastX) * 0.15;
      lastY += (mouseY - lastY) * 0.15;

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      // Velocity squish/stretch parameters
      const stretch = Math.min(speed * 0.015, 0.4);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.6;

      gsap.set(ring, {
        x: lastX,
        y: lastY,
        rotation: speed > 2 ? angle : 0,
        scaleX: isHovered ? 1.6 : scaleX,
        scaleY: isHovered ? 1.6 : scaleY,
      });
    };

    animFrameId = requestAnimationFrame(updatePhysics);

    window.addEventListener('mousemove', handleMouseMove);

    // Global Event Delegation for Interactive Element Hover Reactions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('#projects > div, #more-work a');

      if (clickable || projectCard) {
        setIsHovered(true);

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
        setIsHovered(false);
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

    // Click pulse reactions
    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(ring, { scale: 0.8, duration: 0.1, ease: 'power2.in' });
      gsap.to(dot, { scale: 1.8, duration: 0.1, ease: 'power2.in' });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(ring, {
        scale: isHovered ? 1.6 : 1,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.4)',
      });
      gsap.to(dot, {
        scale: isHovered ? 0.5 : 1,
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
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHovered]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-signal rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(124,255,158,0.8)]"
      />

      {/* Trailing Elastic Physics Ring with Contextual Hover State */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-signal/40 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200"
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
