'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { profile } from '@/lib/data';

const RADIUS = 72;
const BTN_SIZE = 40;
const STAGGER = 40; // ms

type MenuItemDef = {
  id: string;
  label: string;
  icon: React.ReactNode;
  angle: number;
  action: () => void;
};

export default function RadialContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shockRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);

  const close = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    setOpen(false);

    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.to(items, {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: 'power3.in',
      stagger: 0.025,
    });
    gsap.to(dotRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.18,
      ease: 'power2.in',
    });
  }, []);

  const ANGLES = [-90, -30, 30, 90];

  const buildItems = (closeFn: () => void): MenuItemDef[] => [
    {
      id: 'email',
      label: 'Email',
      icon: <Mail size={16} strokeWidth={1.5} />,
      angle: -90,
      action: () => { window.location.href = `mailto:${profile.email}`; closeFn(); },
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: <GithubIcon className="w-4 h-4" />,
      angle: -30,
      action: () => { window.open(profile.github, '_blank', 'noopener,noreferrer'); closeFn(); },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <LinkedinIcon className="w-4 h-4" />,
      angle: 30,
      action: () => { window.open(profile.linkedin, '_blank', 'noopener,noreferrer'); closeFn(); },
    },
    {
      id: 'top',
      label: 'Top',
      icon: <ArrowUp size={16} strokeWidth={1.5} />,
      angle: 90,
      action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeFn(); },
    },
  ];

  // Memoised items
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = React.useMemo(() => buildItems(close), [close]);

  const openMenu = useCallback((x: number, y: number) => {
    isOpenRef.current = true;
    setPos({ x, y });
    setOpen(true);
  }, []);

  // Animate when open changes to true
  useEffect(() => {
    if (!open) return;

    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(els, { x: 0, y: 0, scale: 0, opacity: 0 });
    gsap.set(dotRef.current, { scale: 0, opacity: 0 });

    gsap.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: 'back.out(2)',
      delay: 0.05,
    });

    els.forEach((el, i) => {
      const rad = (ANGLES[i] * Math.PI) / 180;
      const tx = Math.cos(rad) * RADIUS;
      const ty = Math.sin(rad) * RADIUS;
      gsap.to(el, {
        x: tx,
        y: ty,
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: 'back.out(1.8)',
        delay: (i * STAGGER) / 1000,
      });
    });

    // Shockwave ripple
    const shock = shockRef.current;
    if (shock) {
      shock.classList.remove('rcm-shockwave--active');
      void shock.offsetWidth; // force reflow
      shock.classList.add('rcm-shockwave--active');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pos]);

  // Global event listeners
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      e.preventDefault();
      if (isOpenRef.current) {
        close();
        setTimeout(() => openMenu(e.clientX, e.clientY), 60);
      } else {
        openMenu(e.clientX, e.clientY);
      }
    };

    const onLeftClick = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      if (isOpenRef.current) close();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenRef.current) close();
    };

    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('click', onLeftClick);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('click', onLeftClick);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close, openMenu]);

  if (!open) return null;

  return (
    <>
      {/* Shockwave ripple */}
      <div
        ref={shockRef}
        className="rcm-shockwave"
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />

      {/* Menu root — anchored at click point */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      >
        {/* Center dot */}
        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'var(--color-ink)',
            transform: 'translate(-50%, -50%) scale(0)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />

        {/* Items */}
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={(e) => { e.stopPropagation(); item.action(); }}
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              transform: 'translate(-50%, -50%) scale(0)',
              opacity: 0,
              pointerEvents: open ? 'auto' : 'none',
              cursor: 'pointer',
              userSelect: 'none',
              zIndex: 9999,
            }}
          >
            <div
              className="rcm-btn"
              aria-label={item.label}
              style={{ width: BTN_SIZE, height: BTN_SIZE }}
            >
              {item.icon}
            </div>
            <span className="rcm-label">{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
