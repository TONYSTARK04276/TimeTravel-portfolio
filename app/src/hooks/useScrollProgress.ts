import { useState, useEffect, useRef } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastUpdateRef.current < 16) {
          rafRef.current = null;
          return;
        }
        lastUpdateRef.current = now;
        
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        setProgress(Math.min(1, Math.max(0, scrollProgress)));
        
        // Determine current section based on scroll position
        const sectionHeight = window.innerHeight;
        const rawSection = window.scrollY / sectionHeight;
        setCurrentSection(Math.floor(rawSection));
        
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { progress, currentSection };
}

export function useSectionProgress(sectionIndex: number) {
  const [sectionProgress, setSectionProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const sectionHeight = window.innerHeight;
        const sectionStart = sectionIndex * sectionHeight;
        const sectionEnd = sectionStart + sectionHeight;
        const scrollY = window.scrollY;
        
        const inView = scrollY >= sectionStart - sectionHeight / 2 && 
                      scrollY < sectionEnd + sectionHeight / 2;
        setIsInView(inView);
        
        if (inView) {
          const progress = (scrollY - sectionStart) / sectionHeight;
          setSectionProgress(Math.min(1, Math.max(0, progress)));
        }
        
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionIndex]);

  return { sectionProgress, isInView };
}
