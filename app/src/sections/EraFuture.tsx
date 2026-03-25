import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { AIAgents } from '@/components/AIAgents';
import { cn } from '@/lib/utils';
import { Cpu, Globe, Zap, Shield } from 'lucide-react';

const futureContent = {
  eraLabel: 'ERA 4: THE FUTURE',
  headline: 'Agentic Intelligence & Web3',
  body: 'Autonomous AI agents interacting with decentralized systems. The future is not just built—it\'s unleashed.',
  project: {
    name: 'Web3 Agentic AI',
    description: 'Self-governing AI agents that operate across blockchain networks, executing complex strategies without human intervention.',
    features: [
      { icon: Cpu, label: 'Autonomous Agents', desc: 'Self-directed decision making' },
      { icon: Globe, label: 'Multi-Chain', desc: 'Cross-network operations' },
      { icon: Zap, label: 'Real-time', desc: 'Instant execution' },
      { icon: Shield, label: 'Secure', desc: 'Cryptographic verification' },
    ],
  },
};

function HolographicCard({ 
  feature, 
  index 
}: { 
  feature: typeof futureContent.project.features[0]; 
  index: number;
}) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.165, 0.84, 0.44, 1]
      }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className={cn(
        'relative p-5 rounded-xl',
        'bg-gradient-to-br from-white/5 to-transparent',
        'border border-cyan/20',
        'backdrop-blur-sm',
        'transform-gpu perspective-1000'
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Holographic shine */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.1) 0%, transparent 50%, rgba(255,0,102,0.1) 100%)',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-cyan/10">
            <Icon className="w-5 h-5 text-cyan" />
          </div>
          <span className="text-sm font-semibold text-white">{feature.label}</span>
        </div>
        <p className="text-xs text-white/50">{feature.desc}</p>
      </div>

      {/* Corner glow */}
      <div className="absolute -top-px -right-px w-8 h-8 overflow-hidden rounded-tr-xl">
        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan/20 blur-xl transform translate-x-1/2 -translate-y-1/2" />
      </div>
    </motion.div>
  );
}

export function EraFuture() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="era-section bg-black relative overflow-hidden"
    >
      {/* AI Agents background */}
      <div className="absolute inset-0">
        <AIAgents
          agentCount={20}
          colors={['#00f0ff', '#ff0066', '#0066ff', '#00ff88']}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 0, 102, 0.2) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 0% 100%, rgba(0, 240, 255, 0.15) 0%, transparent 40%)',
          }}
        />
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#00f0ff', '#ff0066', '#0066ff'][i % 3],
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-sm text-magenta/60 tracking-widest mb-4"
          >
            {futureContent.eraLabel}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6"
          >
            <span className="bg-gradient-to-r from-cyan via-electric-blue to-magenta bg-clip-text text-transparent">
              {futureContent.headline}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            {futureContent.body}
          </motion.p>
        </div>

        {/* Project showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            'relative p-8 md:p-12 rounded-3xl',
            'bg-gradient-to-br from-white/5 via-white/3 to-transparent',
            'border border-white/10',
            'backdrop-blur-md'
          )}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, transparent, #00f0ff, #ff0066, #0066ff, transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-px rounded-3xl bg-black/90" />
          </div>

          <div className="relative z-10">
            {/* Project header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {futureContent.project.name}
                </h3>
                <p className="text-white/60 max-w-xl">
                  {futureContent.project.description}
                </p>
              </div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-magenta/10 border border-magenta/30"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(255,0,102,0.2)',
                    '0 0 20px rgba(255,0,102,0.4)',
                    '0 0 10px rgba(255,0,102,0.2)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-magenta animate-pulse" />
                <span className="text-sm font-mono text-magenta">LIVE</span>
              </motion.div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {futureContent.project.features.map((feature, index) => (
                <HolographicCard 
                  key={feature.label} 
                  feature={feature} 
                  index={index}
                />
              ))}
            </div>

            {/* Agent activity visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono text-white/40">AGENT ACTIVITY</span>
                <span className="text-sm font-mono text-cyan">24 ACTIVE AGENTS</span>
              </div>
              <div className="flex gap-1 h-12 items-end">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      backgroundColor: i % 3 === 0 ? '#ff0066' : i % 3 === 1 ? '#00f0ff' : '#0066ff',
                    }}
                    animate={{
                      height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">
            The timeline continues forward...
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyan text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
