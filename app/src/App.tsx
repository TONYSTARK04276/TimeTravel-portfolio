import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimeConsole } from '@/sections/TimeConsole';
import { EraOrigin } from '@/sections/EraOrigin';
import { EraBuilder } from '@/sections/EraBuilder';
import { EraArchitect } from '@/sections/EraArchitect';
import { EraFuture } from '@/sections/EraFuture';
import { Contact } from '@/sections/Contact';
import { TimelineNav, TimelineNavMobile } from '@/components/TimelineNav';
import { CustomCursor } from '@/components/CustomCursor';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Cursor types for each era
const eraCursors = ['terminal', 'pointer', 'energy', 'holographic'] as const;

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentEra, setCurrentEra] = useState(0);
  const [cursorType, setCursorType] = useState<typeof eraCursors[number]>('terminal');
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Handle entry from TimeConsole
  const handleEnter = () => {
    setHasEntered(true);
    // Smooth scroll to first era after entry animation
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  // Setup GSAP ScrollTrigger for era detection
  useEffect(() => {
    if (!hasEntered) return;

    // Clear any existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    // Create triggers for each era section
    const sections = gsap.utils.toArray<HTMLElement>('.era-section');
    
    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentEra(index);
          setCursorType(eraCursors[index] || 'terminal');
        },
        onEnterBack: () => {
          setCurrentEra(index);
          setCursorType(eraCursors[index] || 'terminal');
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [hasEntered]);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-mono text-cyan"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      {/* Custom Cursor - only on desktop */}
      {!prefersReducedMotion && (
        <CustomCursor type={cursorType} />
      )}

      {/* Time Console Entry */}
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <TimeConsole key="console" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={hasEntered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={cn(
          'relative',
          !hasEntered && 'pointer-events-none'
        )}
      >
        {/* Timeline Navigation */}
        {hasEntered && (
          <>
            <TimelineNav 
              currentEra={currentEra} 
              onEraChange={setCurrentEra}
              className="hidden md:flex"
            />
            <TimelineNavMobile 
              currentEra={currentEra} 
              onEraChange={setCurrentEra}
            />
          </>
        )}

        {/* Era Sections */}
        <div className="relative">
          {/* Era 1: The Origin */}
          <div className="era-wrapper" data-era="0">
            <EraOrigin />
          </div>

          {/* Era 2: The Builder */}
          <div className="era-wrapper" data-era="1">
            <EraBuilder />
          </div>

          {/* Era 3: The Architect */}
          <div className="era-wrapper" data-era="2">
            <EraArchitect />
          </div>

          {/* Era 4: The Future */}
          <div className="era-wrapper" data-era="3">
            <EraFuture />
          </div>

          {/* Contact / Timeline End */}
          <div className="era-wrapper" data-era="end">
            <Contact />
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        {hasEntered && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-cyan/20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-cyan"
              style={{ 
                scaleX: 0,
                transformOrigin: 'left',
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.1,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}

        {/* Era transition overlay */}
        <TransitionOverlay currentEra={currentEra} />
      </motion.main>
    </div>
  );
}

// Transition overlay component
function TransitionOverlay({ currentEra }: { currentEra: number }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevEraRef = useRef(currentEra);

  useEffect(() => {
    if (prevEraRef.current !== currentEra) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        prevEraRef.current = currentEra;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentEra]);

  if (!isTransitioning) return null;

  const eraColors = [
    'rgba(0, 255, 136, 0.1)',
    'rgba(0, 240, 255, 0.1)',
    'rgba(0, 102, 255, 0.1)',
    'rgba(255, 0, 102, 0.1)',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: `radial-gradient(circle at center, ${eraColors[currentEra]} 0%, transparent 70%)`,
      }}
    />
  );
}

export default App;
