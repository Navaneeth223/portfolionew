'use client';

import { useState, useEffect } from 'react';

export function useCountUp(end: number, duration = 1500, startOnView = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const pct = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easeVal = pct === 1 ? 1 : 1 - Math.pow(2, -10 * pct);
      setCount(Math.floor(easeVal * end));

      if (pct < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startOnView]);

  return count;
}
