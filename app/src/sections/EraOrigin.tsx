import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TerminalLines } from '@/components/TerminalText';
import { cn } from '@/lib/utils';

const learningCommands = [
  'learn(html)',
  'learn(css)',
  'learn(javascript)',
  'compile(foundation)',
];

const originContent = {
  eraLabel: 'ERA 1: THE ORIGIN',
  headline: 'Where It All Began',
  body: 'The journey started with raw HTML, CSS, and JavaScript. Every line of code was a discovery. Every bug was a lesson. The foundation was being built, one tag at a time.',
};

export function EraOrigin() {
  const [showContent, setShowContent] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [glitchTrigger, setGlitchTrigger] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowContent(true);
        setTimeout(() => {
          setShowCommands(true);
          // Trigger occasional glitches
          const glitchInterval = setInterval(() => {
            setGlitchTrigger(true);
            setTimeout(() => setGlitchTrigger(false), 200);
          }, 5000);
          return () => clearInterval(glitchInterval);
        }, 1500);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'era-section bg-black relative',
        'scanlines grid-bg'
      )}
    >
      {/* Terminal window frame */}
      <div className="relative w-full max-w-5xl mx-auto px-6 py-12">
        {/* Window chrome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
          className="relative bg-black/80 border border-terminal-green/30 rounded-lg overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal-green/20 bg-terminal-green/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-xs text-terminal-green/60">
                mohit@origin:~ — terminal
              </span>
            </div>
            <div className="w-16" />
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-10 min-h-[60vh]">
            {/* Era label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="font-mono text-xs text-terminal-green/50 tracking-widest">
                {originContent.eraLabel}
              </span>
            </motion.div>

            {/* Headline with glitch */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h2 
                className={cn(
                  'font-mono text-4xl md:text-6xl lg:text-7xl font-bold terminal-green',
                  glitchTrigger && 'glitch active'
                )}
                data-text={originContent.headline}
              >
                {originContent.headline}
              </h2>
            </motion.div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-base md:text-lg text-white/70 max-w-2xl mb-10 leading-relaxed"
            >
              {originContent.body}
            </motion.p>

            {/* Learning commands */}
            {showCommands && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <div className="text-terminal-green/50 text-sm mb-4">
                  $ initializing_learning_sequence...
                </div>
                <TerminalLines
                  lines={learningCommands}
                  speed={60}
                  lineDelay={400}
                  prefix="> "
                  lineClassName="text-terminal-green text-sm md:text-base"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="pt-4 text-terminal-amber"
                >
                  <span className="text-sm">[SUCCESS] Foundation compiled successfully.</span>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Blinking cursor at bottom */}
          <div className="absolute bottom-4 left-6">
            <span className="font-mono text-terminal-green animate-blink">_</span>
          </div>
        </motion.div>

        {/* Side decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="flex flex-col gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-terminal-green/20 rounded-full"
                style={{
                  opacity: 0.3 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating binary */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-terminal-green/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
