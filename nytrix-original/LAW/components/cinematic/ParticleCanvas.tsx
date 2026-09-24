/**
 * ============================================================
 * CINEMATIC PARTICLE CANVAS
 * Floating dust particles with depth and glow effects
 * Netflix-level visual quality
 * ============================================================
 */

import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  depth: number;
  pulse: number;
  pulseSpeed: number;
}

interface ParticleCanvasProps {
  particleCount?: number;
  className?: string;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ 
  particleCount = 80,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);
  const isTabletRef = useRef(false);

  // Detect device type for performance optimization
  useEffect(() => {
    const checkDevice = () => {
      isMobileRef.current = window.innerWidth < 640;
      isTabletRef.current = window.innerWidth >= 640 && window.innerWidth < 1024;
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Adjust particle count based on device
  const getAdjustedParticleCount = useCallback(() => {
    if (isMobileRef.current) return Math.floor(particleCount * 0.3); // 30% on mobile
    if (isTabletRef.current) return Math.floor(particleCount * 0.6); // 60% on tablet
    return particleCount; // Full on desktop
  }, [particleCount]);

  const colors = [
    'rgba(37, 99, 235, 0.6)',    // Primary blue
    'rgba(0, 245, 255, 0.5)',    // Cyan accent
    'rgba(212, 175, 55, 0.4)',   // Gold
    'rgba(248, 250, 252, 0.3)',  // White dust
    'rgba(139, 92, 246, 0.4)',   // Purple
  ];

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const depth = Math.random() * 3 + 1;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: (Math.random() * 3 + 0.5) / depth,
      speedX: (Math.random() - 0.5) * 0.3 / depth,
      speedY: (Math.random() * 0.5 + 0.1) / depth,
      opacity: (Math.random() * 0.5 + 0.2) / depth,
      color: colors[Math.floor(Math.random() * colors.length)],
      depth,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    };
  }, []);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const adjustedCount = getAdjustedParticleCount();
    particlesRef.current = Array.from({ length: adjustedCount }, () => 
      createParticle(canvas)
    );
  }, [getAdjustedParticleCount, createParticle]);

  const drawParticle = useCallback((
    ctx: CanvasRenderingContext2D, 
    particle: Particle,
    canvas: HTMLCanvasElement
  ) => {
    // Pulsating effect
    particle.pulse += particle.pulseSpeed;
    const pulseScale = 1 + Math.sin(particle.pulse) * 0.3;
    const size = particle.size * pulseScale;
    
    // Mouse interaction - subtle attraction
    const dx = mouseRef.current.x - particle.x;
    const dy = mouseRef.current.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150 / particle.depth) {
      const force = (150 / particle.depth - distance) * 0.0003;
      particle.speedX += dx * force;
      particle.speedY += dy * force;
    }

    // Apply velocity with damping
    particle.speedX *= 0.99;
    particle.speedY *= 0.99;
    
    // Update position
    particle.x += particle.speedX;
    particle.y -= particle.speedY; // Rising effect

    // Boundary wrap
    if (particle.y < -10) {
      particle.y = canvas.height + 10;
      particle.x = Math.random() * canvas.width;
    }
    if (particle.x < -10) particle.x = canvas.width + 10;
    if (particle.x > canvas.width + 10) particle.x = -10;

    // Draw glow
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, size * 4
    );
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size * 4, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw core
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
    ctx.fill();
  }, []);

  const drawConnections = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[]
  ) => {
    // Skip connections on mobile for better performance
    if (isMobileRef.current) return;
    
    // Limit connections on tablet
    const maxConnections = isTabletRef.current ? 50 : 100;
    let connectionCount = 0;
    
    for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
      for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only connect particles at similar depths
        const depthDiff = Math.abs(particles[i].depth - particles[j].depth);
        
        if (distance < 100 && depthDiff < 1) {
          const opacity = (1 - distance / 100) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          connectionCount++;
        }
      }
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort by depth for proper layering
    const sortedParticles = [...particlesRef.current].sort((a, b) => b.depth - a.depth);
    
    // Draw connections first (behind particles)
    drawConnections(ctx, sortedParticles);
    
    // Draw particles
    sortedParticles.forEach(particle => {
      drawParticle(ctx, particle, canvas);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [drawParticle, drawConnections]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  }, [initParticles]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Touch support for mobile
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, animate, handleMouseMove, handleTouchMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleCanvas;
