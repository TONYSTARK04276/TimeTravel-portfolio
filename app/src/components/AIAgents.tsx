import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Agent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  trail: { x: number; y: number }[];
  targetX: number;
  targetY: number;
  state: 'idle' | 'moving' | 'interacting';
}

interface AIAgentsProps {
  className?: string;
  agentCount?: number;
  colors?: string[];
}

export function AIAgents({
  className,
  agentCount = 15,
  colors = ['#00f0ff', '#ff0066', '#0066ff', '#00ff88'],
}: AIAgentsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentsRef = useRef<Agent[]>([]);
  const animationRef = useRef<number | null>(null);

  const initAgents = useCallback((width: number, height: number) => {
    agentsRef.current = Array.from({ length: agentCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      size: Math.random() * 4 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
      targetX: Math.random() * width,
      targetY: Math.random() * height,
      state: 'idle',
    }));
  }, [agentCount, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initAgents(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const agents = agentsRef.current;
      const time = Date.now() * 0.001;

      agents.forEach((agent, i) => {
        // Autonomous behavior - pick new target occasionally
        if (Math.random() < 0.01 || 
            Math.abs(agent.x - agent.targetX) < 10 && 
            Math.abs(agent.y - agent.targetY) < 10) {
          agent.targetX = Math.random() * canvas.width;
          agent.targetY = Math.random() * canvas.height;
          agent.state = 'moving';
        }

        // Check for nearby agents to interact
        let nearestAgent: Agent | undefined;
        let nearestDist = Infinity;

        agents.forEach((other, j) => {
          if (i === j) return;
          const dx = agent.x - other.x;
          const dy = agent.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < nearestDist && dist < 100) {
            nearestDist = dist;
            nearestAgent = other;
          }
        });

        // Interaction behavior
        if (nearestAgent && nearestDist < 80) {
          agent.state = 'interacting';
          // Draw connection
          ctx.beginPath();
          ctx.moveTo(agent.x, agent.y);
          ctx.lineTo(nearestAgent.x, nearestAgent.y);
          const gradient = ctx.createLinearGradient(
            agent.x, agent.y, nearestAgent.x, nearestAgent.y
          );
          gradient.addColorStop(0, agent.color + '60');
          gradient.addColorStop(1, nearestAgent.color + '60');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Exchange energy visual
          if (Math.random() < 0.1) {
            const midX = (agent.x + nearestAgent.x) / 2;
            const midY = (agent.y + nearestAgent.y) / 2;
            ctx.beginPath();
            ctx.arc(midX, midY, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }

        // Move towards target
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          const maxSpeed = agent.state === 'interacting' ? 0.3 : 1;
          agent.vx += (dx / dist) * 0.05;
          agent.vy += (dy / dist) * 0.05;

          // Limit speed
          const speed = Math.sqrt(agent.vx ** 2 + agent.vy ** 2);
          if (speed > maxSpeed) {
            agent.vx = (agent.vx / speed) * maxSpeed;
            agent.vy = (agent.vy / speed) * maxSpeed;
          }
        }

        // Update position
        agent.x += agent.vx;
        agent.y += agent.vy;

        // Keep in bounds with wrap
        if (agent.x < -20) agent.x = canvas.width + 20;
        if (agent.x > canvas.width + 20) agent.x = -20;
        if (agent.y < -20) agent.y = canvas.height + 20;
        if (agent.y > canvas.height + 20) agent.y = -20;

        // Update trail
        agent.trail.push({ x: agent.x, y: agent.y });
        if (agent.trail.length > 15) {
          agent.trail.shift();
        }

        // Draw trail
        if (agent.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
          for (let j = 1; j < agent.trail.length; j++) {
            ctx.lineTo(agent.trail[j].x, agent.trail[j].y);
          }
          const trailGradient = ctx.createLinearGradient(
            agent.trail[0].x, agent.trail[0].y,
            agent.x, agent.y
          );
          trailGradient.addColorStop(0, 'transparent');
          trailGradient.addColorStop(1, agent.color + '40');
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw agent
        const pulse = Math.sin(time * 3 + i) * 0.2 + 1;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          agent.x, agent.y, 0,
          agent.x, agent.y, agent.size * 3 * pulse
        );
        glowGradient.addColorStop(0, agent.color + '50');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size * 3 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = agent.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(
          agent.x - agent.size * 0.3, 
          agent.y - agent.size * 0.3, 
          agent.size * 0.3, 
          0, Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });

      // Draw crypto flow lines occasionally
      if (Math.random() < 0.05) {
        const startAgent = agents[Math.floor(Math.random() * agents.length)];
        const endAgent = agents[Math.floor(Math.random() * agents.length)];
        if (startAgent !== endAgent) {
          // Animate energy transfer
          const progress = (Date.now() % 1000) / 1000;
          const x = startAgent.x + (endAgent.x - startAgent.x) * progress;
          const y = startAgent.y + (endAgent.y - startAgent.y) * progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ffffff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initAgents]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
    />
  );
}
