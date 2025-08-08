"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  maxParticles?: number;
  particleSpeed?: number;
  particleLife?: number;
  colors?: string[];
}

export default function ParticleSystem({
  maxParticles = 100,
  particleSpeed = 2,
  particleLife = 60,
  colors = [
    "rgba(168, 85, 247, 0.6)",
    "rgba(244, 114, 182, 0.6)",
    "rgba(56, 189, 248, 0.6)",
    "rgba(255, 255, 255, 0.4)",
  ],
}: ParticleSystemProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // Create a new particle at the mouse position
  const createParticle = useCallback(
    (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * particleSpeed + 2;
      const size = Math.random() * 2 + 1; // Smaller particles (1-3px)

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: particleLife,
        maxLife: particleLife,
        size,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    },
    [particleSpeed, particleLife, colors]
  );

  // Update particle positions and properties
  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Apply slight gravity and air resistance
      particle.vy += 0.02;
      particle.vx *= 0.995;
      particle.vy *= 0.995;

      // Update life and opacity
      particle.life--;
      particle.opacity = particle.life / particle.maxLife;

      // Remove dead particles
      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }, []);

  // Render particles on canvas
  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    updateParticles();
    renderParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles]);

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create particles if mouse is over the canvas area
      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

      mouseRef.current = { x, y };

      // Create particles when mouse moves (increased probability and particles)
      if (Math.random() < 0.8 && particlesRef.current.length < maxParticles) {
        // Create multiple particles for a dust effect
        for (let i = 0; i < Math.random() * 5 + 3; i++) {
          const offsetX = (Math.random() - 0.5) * 30;
          const offsetY = (Math.random() - 0.5) * 30;
          particlesRef.current.push(createParticle(x + offsetX, y + offsetY));
        }
      }
    },
    [createParticle, maxParticles]
  );

  // Resize canvas to match container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial canvas setup
    resizeCanvas();

    // Set up event listeners on document instead of canvas
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    // Start animation loop
    animate();

    return () => {
      // Cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [animate, handleMouseMove, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20"
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
