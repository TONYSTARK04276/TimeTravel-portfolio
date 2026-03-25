import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const skills = [
  { name: 'C / C++', level: 90, color: '#00f0ff', icon: '🚀' },
  { name: 'JavaScript', level: 95, color: '#f7df1e', icon: '🟨' },
  { name: 'HTML / CSS', level: 98, color: '#ff4b2b', icon: '🌐' },
  { name: 'SQL & ChromaDB', level: 85, color: '#00ff88', icon: '🗄️' },
  { name: 'GitHub', level: 92, color: '#ffffff', icon: '🐙' },
];

const builderContent = {
  eraLabel: 'ERA 2: THE BUILDER',
  headline: 'Crafting Digital Experiences',
  body: 'Modern frameworks, clean architecture, and scalable solutions. The builder era brought structure and sophistication to every project.',
};

function SkillCard({ 
  skill, 
  index 
}: { 
  skill: typeof skills[0]; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.165, 0.84, 0.44, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative p-6 rounded-2xl',
        'glass glass-hover',
        'transition-all duration-300',
        'cursor-pointer'
      )}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        {/* Icon */}
        <div className="text-3xl mb-4">{skill.icon}</div>
        
        {/* Name */}
        <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
        
        {/* Progress bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: skill.color }}
          />
        </div>
        
        {/* Level */}
        <div className="mt-2 text-right">
          <span className="text-sm font-mono" style={{ color: skill.color }}>
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-20"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${skill.color} 50%)`,
          borderTopRightRadius: '1rem',
        }}
      />
    </motion.div>
  );
}

export function EraBuilder() {
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
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(0, 240, 255, 0.15) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 70% 80%, rgba(0, 102, 255, 0.15) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: 40 + i * 10,
              height: 40 + i * 10,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <div 
              className="w-full h-full border border-cyan/20 rounded-lg"
              style={{ transform: `rotate(${i * 15}deg)` }}
            />
          </motion.div>
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
            className="inline-block font-mono text-sm text-cyan/60 tracking-widest mb-4"
          >
            {builderContent.eraLabel}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6"
          >
            {builderContent.headline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            {builderContent.body}
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Assembly animation indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="font-mono text-sm text-white/40">
              Systems Operational
            </span>
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
