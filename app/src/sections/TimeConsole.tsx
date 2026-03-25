import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalText } from '@/components/TerminalText';
import { cn } from '@/lib/utils';

interface TimeConsoleProps {
  onEnter: () => void;
}

const bootSequence = [
  { text: 'Loading Temporal Interface...', delay: 0 },
  { text: 'Calibrating Timeline...', delay: 800 },
  { text: 'User Detected: Mohit Hudda', delay: 1600 },
  { text: 'Timeline Status: ACTIVE', delay: 2400 },
];

export function TimeConsole({ onEnter }: TimeConsoleProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showVortex, setShowVortex] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress through boot sequence
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setCurrentLine(index + 1);
        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setShowVortex(true);
            setTimeout(() => setShowButton(true), 1000);
          }, 500);
        }
      }, line.delay);
    });
  }, []);

  const handleEnter = useCallback(() => {
    setIsExiting(true);
    setTimeout(onEnter, 1500);
  }, [onEnter]);

  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 bg-black',
        'flex flex-col items-center justify-center',
        isExiting && 'pointer-events-none'
      )}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(20px)',
      }}
      transition={{ duration: 1.5, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Boot sequence text */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="font-mono text-sm md:text-base space-y-4">
          {bootSequence.map((line, index) => (
            <AnimatePresence key={index}>
              {currentLine > index && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-terminal-green">[</span>
                  <span className="text-white/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-terminal-green">]</span>
                  <TerminalText
                    text={line.text}
                    className="terminal-green"
                    speed={30}
                    showCursor={currentLine === index + 1 && index === bootSequence.length - 1}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Timeline Vortex */}
        <AnimatePresence>
          {showVortex && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1 }}
              className="mt-16 flex flex-col items-center"
            >
              {/* Vortex rings */}
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: `rgba(0, 240, 255, ${0.1 + i * 0.15})`,
                      transform: `scale(${1 - i * 0.15})`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1 - i * 0.15, 1 - i * 0.15 + 0.05, 1 - i * 0.15],
                    }}
                    transition={{
                      rotate: {
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      },
                    }}
                  />
                ))}
                
                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-cyan/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* Era markers */}
                {['01', '02', '03', '04'].map((era, i) => (
                  <motion.div
                    key={era}
                    className="absolute font-mono text-xs text-cyan/60"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {era}
                  </motion.div>
                ))}
              </div>

              {/* Enter Timeline Button */}
              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className={cn(
                      'mt-12 px-8 py-4',
                      'font-mono text-lg text-black',
                      'bg-cyan rounded-full',
                      'transition-all duration-300',
                      'hover:shadow-glow-cyan',
                      'focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-black'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span>Enter Timeline</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit animation overlay */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cyan/20"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,240,255,0.3) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
