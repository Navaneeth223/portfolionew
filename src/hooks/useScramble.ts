'use client';

import { useState, useEffect, useCallback } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#0123456789';

export function useScramble(targetText: string, speed = 30, revealDelay = 3) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  const startScramble = useCallback(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(targetText);
      setIsDone(true);
      return;
    }

    let step = 0;
    const maxSteps = targetText.length * revealDelay;
    
    const interval = setInterval(() => {
      step++;
      const currentReveal = Math.floor(step / revealDelay);
      
      let result = '';
      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === ' ') {
          result += ' ';
          continue;
        }
        if (i < currentReveal) {
          result += targetText[i];
        } else {
          const randomIndex = Math.floor(Math.random() * GLYPHS.length);
          result += GLYPHS[randomIndex];
        }
      }

      setDisplayText(result);

      if (step >= maxSteps) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed, revealDelay]);

  useEffect(() => {
    startScramble();
  }, [startScramble]);

  return { displayText, isDone, replay: startScramble };
}
