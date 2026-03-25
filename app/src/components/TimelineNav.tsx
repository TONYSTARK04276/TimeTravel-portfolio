import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Era {
  id: number;
  label: string;
  shortLabel: string;
  color: string;
}

const eras: Era[] = [
  { id: 0, label: 'Origin', shortLabel: '01', color: '#00ff88' },
  { id: 1, label: 'Builder', shortLabel: '02', color: '#00f0ff' },
  { id: 2, label: 'Architect', shortLabel: '03', color: '#0066ff' },
  { id: 3, label: 'Future', shortLabel: '04', color: '#ff0066' },
];

interface TimelineNavProps {
  currentEra: number;
  onEraChange?: (era: number) => void;
  className?: string;
}

export function TimelineNav({ currentEra, onEraChange, className }: TimelineNavProps) {
  const [hoveredEra, setHoveredEra] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show navigation after scrolling past entry
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEra = (eraIndex: number) => {
    const targetY = (eraIndex + 1) * window.innerHeight; // +1 for entry section
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
    onEraChange?.(eraIndex);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
          className={cn(
            'fixed right-6 top-1/2 -translate-y-1/2 z-50',
            'flex flex-col items-end gap-4',
            className
          )}
        >
          {eras.map((era, index) => {
            const isActive = currentEra === index;
            const isHovered = hoveredEra === index;

            return (
              <button
                key={era.id}
                onClick={() => scrollToEra(index)}
                onMouseEnter={() => setHoveredEra(index)}
                onMouseLeave={() => setHoveredEra(null)}
                className={cn(
                  'group relative flex items-center gap-3',
                  'transition-all duration-300',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-full'
                )}
              >
                {/* Label */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-mono uppercase tracking-widest text-white/70"
                      style={{ color: isActive ? era.color : undefined }}
                    >
                      {era.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Indicator */}
                <div
                  className={cn(
                    'relative w-3 h-3 rounded-full transition-all duration-300',
                    isActive ? 'scale-125' : 'scale-100',
                    'border-2'
                  )}
                  style={{
                    borderColor: isActive ? era.color : 'rgba(255,255,255,0.3)',
                    backgroundColor: isActive ? era.color : 'transparent',
                    boxShadow: isActive ? `0 0 10px ${era.color}` : 'none',
                  }}
                >
                  {/* Pulse ring for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ borderColor: era.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>

                {/* Line connector */}
                {index < eras.length - 1 && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-px h-4 bg-white/10"
                  />
                )}
              </button>
            );
          })}

          {/* Progress indicator */}
          <div className="mt-4 text-right">
            <span className="text-xs font-mono text-white/40">
              {String(currentEra + 1).padStart(2, '0')} / 04
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Horizontal version for mobile
export function TimelineNavMobile({ currentEra, onEraChange }: TimelineNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEra = (eraIndex: number) => {
    const targetY = (eraIndex + 1) * window.innerHeight;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
    onEraChange?.(eraIndex);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full glass"
        >
          {eras.map((era, index) => {
            const isActive = currentEra === index;
            return (
              <button
                key={era.id}
                onClick={() => scrollToEra(index)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all duration-300',
                  isActive ? 'scale-125' : 'scale-100 opacity-50 hover:opacity-75'
                )}
                style={{
                  backgroundColor: isActive ? era.color : 'rgba(255,255,255,0.5)',
                  boxShadow: isActive ? `0 0 8px ${era.color}` : 'none',
                }}
                aria-label={`Go to ${era.label} era`}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
