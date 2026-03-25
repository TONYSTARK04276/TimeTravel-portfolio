# Mohit Hudda Portfolio — Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, navigation | Neon glow variant, rounded-full |
| Card | Project displays | Glassmorphism styling |
| Dialog | Mobile menu overlay | Full-screen, dark theme |
| Separator | Visual dividers | Gradient accent |

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| TimeConsole | Entry boot sequence | `sections/TimeConsole.tsx` |
| TerminalText | Typewriter effect | `components/TerminalText.tsx` |
| EraOrigin | Era 1 terminal UI | `sections/EraOrigin.tsx` |
| EraBuilder | Era 2 modern UI | `sections/EraBuilder.tsx` |
| EraArchitect | Era 3 AI systems | `sections/EraArchitect.tsx` |
| EraFuture | Era 4 Web3/futuristic | `sections/EraFuture.tsx` |
| TimelineNav | Fixed era navigation | `components/TimelineNav.tsx` |
| ParticleNetwork | Neural network visualization | `components/ParticleNetwork.tsx` |
| GlitchText | Glitch effect text | `components/GlitchText.tsx` |
| CustomCursor | Era-specific cursors | `components/CustomCursor.tsx` |
| WormholeTransition | Era transition effect | `components/WormholeTransition.tsx` |

### Hooks
| Hook | Purpose |
|------|---------|
| useScrollProgress | Track scroll position across eras |
| useTypewriter | Terminal typing effect |
| useMousePosition | Cursor tracking for effects |
| useInView | Intersection observer for animations |

---

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Boot sequence text | Framer Motion | AnimatePresence + stagger children | Medium |
| Typewriter effect | Custom hook | useState + setInterval per char | Medium |
| Terminal cursor blink | CSS | @keyframes blink animation | Low |
| Timeline vortex rotation | CSS/Three.js | @keyframes rotate or R3F mesh rotation | Medium |
| Era snap transitions | GSAP ScrollTrigger | Pin + snap to section centers | High |
| Component assembly | Framer Motion | layoutId + AnimatePresence | Medium |
| Skill card hover depth | CSS | transform: translateZ + perspective | Low |
| Neural network particles | Canvas/Three.js | Particle system with connections | High |
| Data flow streams | SVG + GSAP | Animated stroke-dashoffset | Medium |
| AI agent autonomous movement | Canvas | Velocity-based particle movement | Medium |
| Wormhole transition | Three.js Shader | Custom GLSL distortion shader | High |
| Glitch text effect | CSS/JS | Random char swap + clip-path | Medium |
| Scanline overlay | CSS | Repeating gradient animation | Low |
| Glow pulse effects | CSS | @keyframes box-shadow pulse | Low |
| Magnetic hover buttons | Framer Motion | useMotionValue + spring physics | Medium |
| Parallax depth layers | GSAP ScrollTrigger | Multiple scroll speeds per layer | Medium |

---

## Animation Library Choices

### Primary: GSAP + ScrollTrigger
**Rationale**: Best-in-class scroll-linked animations, precise control over pinning and snapping
- Era section pinning
- Scroll progress tracking
- Complex timeline sequences
- Snap-to-section behavior

### Secondary: Framer Motion
**Rationale**: Excellent React integration, declarative animations, AnimatePresence for mount/unmount
- Component entrance/exit animations
- Hover/tap interactions
- Layout animations
- Staggered children

### Tertiary: CSS Animations
**Rationale**: Performance-critical, simple repetitive animations
- Cursor blinking
- Continuous rotations
- Glow pulsing
- Scanlines

### 3D/Canvas: Three.js + React Three Fiber
**Rationale**: Complex particle systems and shader effects
- Neural network visualization (Era 3)
- AI agent particles (Era 4)
- Wormhole transition shader
- Timeline vortex (entry)

---

## Project File Structure

```
app/
├── src/
│   ├── sections/
│   │   ├── TimeConsole.tsx      # Entry boot sequence
│   │   ├── EraOrigin.tsx        # Era 1: Terminal style
│   │   ├── EraBuilder.tsx       # Era 2: Modern UI
│   │   ├── EraArchitect.tsx     # Era 3: AI systems
│   │   ├── EraFuture.tsx        # Era 4: Web3/Future
│   │   └── Contact.tsx          # Final contact section
│   ├── components/
│   │   ├── TerminalText.tsx     # Typewriter component
│   │   ├── GlitchText.tsx       # Glitch effect
│   │   ├── TimelineNav.tsx      # Fixed era navigation
│   │   ├── CustomCursor.tsx     # Era-specific cursors
│   │   ├── ParticleNetwork.tsx  # Neural network viz
│   │   ├── AIAgents.tsx         # Autonomous AI agents
│   │   ├── WormholeTransition.tsx # Shader transition
│   │   ├── SkillCard.tsx        # Animated skill card
│   │   ├── ProjectCard.tsx      # Project display card
│   │   └── Scanlines.tsx        # Scanline overlay
│   ├── hooks/
│   │   ├── useScrollProgress.ts # Global scroll tracking
│   │   ├── useTypewriter.ts     # Typing effect
│   │   ├── useMousePosition.ts  # Mouse tracking
│   │   └── useInView.ts         # Intersection observer
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/
│   └── assets/                  # Static assets
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Dependencies

### Core
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0"
}
```

### Animation
```json
{
  "gsap": "^3.12.0",
  "@gsap/react": "^2.1.0",
  "framer-motion": "^11.0.0",
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.92.0"
}
```

### UI
```json
{
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-dialog": "^1.0.0",
  "lucide-react": "^0.300.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

---

## Implementation Phases

### Phase 1: Foundation
1. Initialize project with Vite + React + TypeScript
2. Install and configure Tailwind CSS
3. Install animation libraries (GSAP, Framer Motion, Three.js)
4. Set up project file structure
5. Create global styles and CSS variables

### Phase 2: Core Components
1. Build TerminalText component with typewriter
2. Create CustomCursor system
3. Implement TimelineNav
4. Build GlitchText effect
5. Create Scanlines overlay

### Phase 3: Era Sections
1. TimeConsole (entry) with boot sequence
2. EraOrigin with terminal aesthetic
3. EraBuilder with modern UI
4. EraArchitect with particle network
5. EraFuture with AI agents

### Phase 4: Transitions & Polish
1. Implement GSAP ScrollTrigger pinning
2. Add snap-to-section behavior
3. Create wormhole transition shader
4. Add era transition effects
5. Fine-tune all animations

### Phase 5: Responsive & Deploy
1. Mobile adaptations
2. Performance optimization
3. Build and deploy

---

## Performance Considerations

### GPU Acceleration
- All animations use `transform` and `opacity`
- `will-change` applied strategically
- Canvas elements use `requestAnimationFrame`

### Particle Optimization
- Max 100 particles on desktop, 30 on mobile
- Connection distance limited (100px)
- Frame skipping for low-end devices

### Lazy Loading
- Three.js components lazy loaded
- Shader compilation deferred until needed

### Reduced Motion
- Respect `prefers-reduced-motion`
- Disable complex effects when enabled
- Keep essential navigation functional

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Three.js features may require WebGL 2.0 support
