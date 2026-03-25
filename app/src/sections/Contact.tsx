import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const contactContent = {
  headline: 'Continue The Journey',
  body: "The timeline extends forward. Let's build the next era together.",
  email: 'mohithudda41@gmail.com',
  phone: '8930818725',
  address: 'Palwal, Haryana',
  socials: [
    { name: 'GitHub', icon: Github, url: 'https://github.com/mohithudda' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/mohit-hudda' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/mohithudda' },
  ],
};

// ... inside Contact component ...
// I'll also add phone and address display.

function SocialLink({ 
  social, 
  index 
}: { 
  social: typeof contactContent.socials[0]; 
  index: number;
}) {
  const Icon = social.icon;
  
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.165, 0.84, 0.44, 1]
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'group flex items-center gap-3 p-4 rounded-xl',
        'glass glass-hover',
        'transition-all duration-300'
      )}
    >
      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan/10 transition-colors">
        <Icon className="w-5 h-5 text-white/60 group-hover:text-cyan transition-colors" />
      </div>
      <span className="flex-1 text-white/80 group-hover:text-white transition-colors">
        {social.name}
      </span>
      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-cyan transition-colors" />
    </motion.a>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [showContent, setShowContent] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

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
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Animated rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block font-mono text-sm text-cyan/60 tracking-widest mb-4"
        >
          TIMELINE END // NEW BEGINNING
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6"
        >
          {contactContent.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/60 max-w-xl mx-auto mb-12"
        >
          {contactContent.body}
        </motion.p>

        {/* Email CTA */}
        <motion.a
          href={`mailto:${contactContent.email}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
          className={cn(
            'inline-flex items-center gap-4 px-8 py-4 rounded-full',
            'bg-cyan text-black font-semibold text-lg',
            'transition-all duration-300',
            'hover:shadow-glow-cyan',
            'focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-black'
          )}
        >
          <Mail className="w-5 h-5" />
          <span>Get In Touch</span>
          <motion.span
            animate={{ x: emailHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.span>
        </motion.a>

        {/* Contact info display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 space-y-2"
        >
          <div>
            <a 
              href={`mailto:${contactContent.email}`}
              className="font-mono text-cyan/60 hover:text-cyan transition-colors"
            >
              {contactContent.email}
            </a>
          </div>
          <div className="font-mono text-white/40 text-sm">
            {contactContent.phone}
          </div>
          <div className="font-mono text-white/40 text-sm">
            {contactContent.address}
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {contactContent.socials.map((social, index) => (
            <SocialLink key={social.name} social={social} index={index} />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl text-white">Mohit Hudda</span>
              <span className="text-white/30">|</span>
              <span className="font-mono text-sm text-white/40">Developer</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span className="font-mono">© 2024</span>
              <span className="w-1 h-1 rounded-full bg-cyan/50" />
              <span className="font-mono">Temporal Portfolio</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to top hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          className="p-3 rounded-full glass text-white/40 hover:text-cyan transition-colors"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
