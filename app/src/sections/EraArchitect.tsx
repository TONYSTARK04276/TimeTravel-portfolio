import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import { cn } from '@/lib/utils';
import { Layout, Users } from 'lucide-react';

const projects = [
  {
    id: 'crm',
    name: 'CRM System (Internship Project)',
    description: 'Developed a Customer Relationship Management (CRM) system during internship. Built frontend using HTML, CSS, and JavaScript. Implemented features for managing and tracking customer data. Collaborated in a team to complete the project within deadline.',
    icon: Layout,
    color: '#00f0ff',
    features: ['Customer Tracking', 'Data Management', 'Team Collaboration'],
    link: 'http://crmpro.xo.je/',
  },
  {
    id: 'roster',
    name: 'Roster IQ',
    description: 'Intelligent workforce management with predictive scheduling.',
    icon: Users,
    color: '#ff0066',
    features: ['Smart Scheduling', 'Demand Forecasting', 'Optimization Engine'],
  },
];

const architectContent = {
  eraLabel: 'ERA 3: THE ARCHITECT',
  headline: 'Building Intelligent Systems',
  body: 'Where code meets cognition. AI-powered solutions that learn, adapt, and transform data into decisions.',
};

function ProjectCard({ 
  project, 
  index,
  isActive,
  onClick,
}: { 
  project: typeof projects[0]; 
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = project.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.165, 0.84, 0.44, 1]
      }}
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-2xl cursor-pointer',
        'transition-all duration-500',
        isActive ? 'glass' : 'bg-white/5 hover:bg-white/10',
        'border',
        isActive ? 'border-opacity-50' : 'border-transparent hover:border-white/10'
      )}
      style={{
        borderColor: isActive ? project.color : undefined,
      }}
    >
      {/* Glow effect */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-2xl opacity-30 blur-xl transition-opacity"
          style={{
            background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon 
              className="w-6 h-6" 
              style={{ color: project.color }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              {project.name}
            </h3>
            <div 
              className="flex items-center gap-2 text-xs font-mono"
              style={{ color: project.color }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
              SYSTEM ONLINE
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-white/50"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Project Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan hover:underline"
          >
            View Project
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {/* Active indicator line */}
      {isActive && (
        <motion.div
          layoutId="activeProject"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full"
          style={{ backgroundColor: project.color }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

export function EraArchitect() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showContent, setShowContent] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="era-section bg-black relative overflow-hidden"
    >
      {/* Particle network background */}
      <div className="absolute inset-0">
        <ParticleNetwork
          particleCount={80}
          connectionDistance={140}
          colors={['#00f0ff', '#0066ff', '#ff0066']}
          speed={0.3}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(0, 102, 255, 0.2) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, rgba(0, 240, 255, 0.15) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Header */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-sm text-electric-blue/60 tracking-widest mb-4"
            >
              {architectContent.eraLabel}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6"
            >
              {architectContent.headline}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 mb-8"
            >
              {architectContent.body}
            </motion.p>

            {/* Data flow visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block"
            >
              <div className="relative h-32">
                {/* Animated data streams */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: 0,
                      right: 0,
                    }}
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scaleX: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
                
                {/* Nodes */}
                {[0, 50, 100].map((left, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan"
                    style={{ left: `${left}%` }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Projects */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isActive={activeProject === index}
                onClick={() => setActiveProject(index)}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Neural Nodes', value: '10K+' },
            { label: 'Data Points', value: '1M+' },
            { label: 'Predictions', value: '99.9%' },
            { label: 'Uptime', value: '99.99%' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold font-display text-cyan mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-white/40 font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
