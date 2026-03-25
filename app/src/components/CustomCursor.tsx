import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

type CursorType = 'default' | 'terminal' | 'pointer' | 'energy' | 'holographic';

interface CustomCursorProps {
  type?: CursorType;
  className?: string;
}

export function CustomCursor({ type = 'default', className }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const cursorStyles = {
    default: {
      size: 20,
      render: (
        <div className="w-5 h-5 rounded-full border-2 border-cyan shadow-glow-cyan" />
      ),
    },
    terminal: {
      size: 12,
      render: (
        <div className="font-mono text-terminal-green text-lg leading-none">
          █
        </div>
      ),
    },
    pointer: {
      size: 24,
      render: (
        <div className="w-6 h-6 rounded-full bg-cyan/20 border border-cyan backdrop-blur-sm" />
      ),
    },
    energy: {
      size: 30,
      render: (
        <div className="relative">
          <div className="absolute inset-0 w-8 h-8 rounded-full bg-magenta/30 animate-ping" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan to-magenta shadow-glow-cyan" />
        </div>
      ),
    },
    holographic: {
      size: 40,
      render: (
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-cyan/50 animate-spin-slow" 
               style={{ borderStyle: 'dashed' }} />
          <div className="absolute inset-2 w-6 h-6 rounded-full bg-cyan/20 backdrop-blur-sm" />
          <div className="absolute inset-0 w-10 h-10 rounded-full shadow-glow-cyan" />
        </div>
      ),
    },
  };

  const style = cursorStyles[type];

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[9999]',
        'mix-blend-difference',
        className
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {style.render}
    </motion.div>
  );
}

// Cursor that changes based on the current era
interface EraCursorProps {
  currentEra: number;
}

export function EraCursor({ currentEra }: EraCursorProps) {
  const cursorTypes: CursorType[] = [
    'terminal',    // Era 1: Origin
    'pointer',     // Era 2: Builder
    'energy',      // Era 3: Architect
    'holographic', // Era 4: Future
  ];

  const type = cursorTypes[currentEra] || 'default';

  return <CustomCursor type={type} />;
}

// Hover cursor wrapper
interface HoverCursorProps {
  children: React.ReactNode;
  hoverType?: CursorType;
  className?: string;
}

export function HoverCursor({ 
  children, 
  hoverType = 'pointer',
  className 
}: HoverCursorProps) {
  const [currentType, setCurrentType] = useState<CursorType>('default');

  return (
    <div 
      className={cn(className)}
      onMouseEnter={() => setCurrentType(hoverType)}
      onMouseLeave={() => setCurrentType('default')}
    >
      <CustomCursor type={currentType} />
      {children}
    </div>
  );
}
