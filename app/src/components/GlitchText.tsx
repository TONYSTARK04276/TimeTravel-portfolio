import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
  glitchDuration?: number;
}

export function GlitchText({
  text,
  className,
  glitchInterval = 3000,
  glitchDuration = 300,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  const generateGlitchText = useCallback(() => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return text
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        // Randomly replace characters
        if (Math.random() < 0.3) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return char;
      })
      .join('');
  }, [text]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsGlitching(true);
      
      // Rapid glitch changes
      let glitchCount = 0;
      const glitchIntervalId = setInterval(() => {
        setGlitchText(generateGlitchText());
        glitchCount++;
        if (glitchCount >= 5) {
          clearInterval(glitchIntervalId);
        }
      }, glitchDuration / 5);

      // End glitch
      setTimeout(() => {
        setGlitchText(text);
        setIsGlitching(false);
      }, glitchDuration);
    }, glitchInterval);

    return () => clearInterval(intervalId);
  }, [text, glitchInterval, glitchDuration, generateGlitchText]);

  return (
    <span 
      className={cn(
        'relative inline-block',
        isGlitching && 'glitch active',
        className
      )}
      data-text={glitchText}
    >
      {glitchText}
    </span>
  );
}

// One-time glitch effect on mount or trigger
interface TriggerGlitchProps {
  text: string;
  trigger: boolean;
  className?: string;
  onComplete?: () => void;
}

export function TriggerGlitch({
  text,
  trigger,
  className,
  onComplete,
}: TriggerGlitchProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setIsGlitching(true);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let glitchCount = 0;
    const maxGlitches = 8;

    const glitchInterval = setInterval(() => {
      const glitched = text
        .split('')
        .map((char) => {
          if (char === ' ') return ' ';
          if (Math.random() < 0.4) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        })
        .join('');
      
      setDisplayText(glitched);
      glitchCount++;

      if (glitchCount >= maxGlitches) {
        clearInterval(glitchInterval);
        setDisplayText(text);
        setIsGlitching(false);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(glitchInterval);
  }, [trigger, text, onComplete]);

  return (
    <span 
      className={cn(
        'relative inline-block',
        isGlitching && 'glitch active',
        className
      )}
      data-text={displayText}
    >
      {displayText}
    </span>
  );
}
