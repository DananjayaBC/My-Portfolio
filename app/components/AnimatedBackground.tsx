"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Clear any existing particles
    particlesRef.current.forEach((particle) => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    particlesRef.current = [];

    // Create particles with predetermined positions to avoid hydration issues
    const createParticles = () => {
      const container = containerRef.current;
      if (!container) return;

      // Predefined positions for consistent rendering
      const positions = [
        { x: 5, y: 15 },
        { x: 25, y: 35 },
        { x: 45, y: 55 },
        { x: 65, y: 75 },
        { x: 85, y: 25 },
        { x: 15, y: 85 },
        { x: 35, y: 65 },
        { x: 55, y: 45 },
        { x: 75, y: 15 },
        { x: 95, y: 85 },
        { x: 10, y: 50 },
        { x: 30, y: 20 },
        { x: 50, y: 80 },
        { x: 70, y: 40 },
        { x: 90, y: 70 },
        { x: 20, y: 60 },
        { x: 40, y: 10 },
        { x: 60, y: 90 },
        { x: 80, y: 30 },
        { x: 12, y: 78 },
      ];

      positions.forEach((pos, index) => {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-20";
        particle.style.left = pos.x + "%";
        particle.style.top = pos.y + "%";

        container.appendChild(particle);
        particlesRef.current.push(particle);
      });
    };

    createParticles();

    // Animate particles with GSAP
    particlesRef.current.forEach((particle, index) => {
      const delay = index * 0.2;
      const duration = 12 + (index % 8) * 2;

      gsap.set(particle, {
        scale: 0.5 + (index % 4) * 0.2,
        opacity: 0.1 + (index % 5) * 0.05,
      });

      // Floating animation
      gsap.to(particle, {
        y: `+=${(index % 2 === 0 ? 1 : -1) * (40 + index * 3)}`,
        x: `+=${(index % 3 === 0 ? 1 : -1) * (30 + index * 2)}`,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Scale animation
      gsap.to(particle, {
        scale: `+=${0.3 + (index % 3) * 0.1}`,
        duration: 4 + (index % 3),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: delay * 1.5,
      });
    });

    // Animate gradient overlays - rotation disabled
    // const gradientOverlay = containerRef.current.querySelector('.gradient-overlay');
    // if (gradientOverlay) {
    //   gsap.to(gradientOverlay, {
    //     rotation: 360,
    //     duration: 100,
    //     repeat: -1,
    //     ease: 'none',
    //     transformOrigin: 'center center'
    //   });
    // }

    // Cleanup function
    return () => {
      particlesRef.current.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      gsap.killTweensOf(particlesRef.current);
    };
  }, [mounted]);

  // Don't render anything until mounted on client
  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Main animated gradient overlay */}
      <div className="gradient-overlay absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900/10 to-blue-900/20"></div>

      {/* Layered gradient effects for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-conic from-purple-400/15 via-pink-400/8 to-cyan-400/15"></div>

      {/* Animated mesh background with larger orbs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/12 rounded-full blur-2xl animate-pulse animation-delay-3000"></div>
        <div className="absolute bottom-1/3 right-1/2 w-88 h-88 bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Additional moving gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/5 to-transparent opacity-60 animate-pulse animation-delay-500"></div>

      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
