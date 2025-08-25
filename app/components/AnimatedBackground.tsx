"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface DataStream {
  id: number;
  startX: number;
  startY: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  width: number;
  particles: Particle[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const streamsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) {
      console.log("AnimatedBackground: Not mounted or no container", {
        mounted,
        hasContainer: !!containerRef.current,
      });
      return;
    }

    console.log("AnimatedBackground: Starting data stream animation setup");

    // Clear any existing animations and timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    streamsRef.current.forEach((stream) => {
      if (stream.parentNode) {
        stream.parentNode.removeChild(stream);
      }
    });

    particlesRef.current.forEach((particle) => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });

    streamsRef.current = [];
    particlesRef.current = [];

    // Data stream configurations for flowing diagonal lines
    const streamConfigs: DataStream[] = [
      {
        id: 1,
        startX: window.innerWidth + 100,
        startY: -50,
        length: 200,
        speed: 8,
        opacity: 0.4,
        color: "rgba(255, 255, 255, 0.6)",
        width: 1,
        particles: [],
      },
      {
        id: 2,
        startX: window.innerWidth + 200,
        startY: -100,
        length: 150,
        speed: 6,
        opacity: 0.3,
        color: "rgba(221, 214, 254, 0.5)",
        width: 0.8,
        particles: [],
      },
      {
        id: 3,
        startX: window.innerWidth + 50,
        startY: 50,
        length: 180,
        speed: 10,
        opacity: 0.35,
        color: "rgba(255, 255, 255, 0.4)",
        width: 1.2,
        particles: [],
      },
      {
        id: 4,
        startX: window.innerWidth + 300,
        startY: -30,
        length: 120,
        speed: 7,
        opacity: 0.25,
        color: "rgba(196, 181, 253, 0.4)",
        width: 0.6,
        particles: [],
      },
      {
        id: 5,
        startX: window.innerWidth + 150,
        startY: 100,
        length: 160,
        speed: 9,
        opacity: 0.3,
        color: "rgba(255, 255, 255, 0.5)",
        width: 0.9,
        particles: [],
      },
      {
        id: 6,
        startX: window.innerWidth + 250,
        startY: 150,
        length: 140,
        speed: 5,
        opacity: 0.2,
        color: "rgba(167, 139, 250, 0.3)",
        width: 0.7,
        particles: [],
      },
    ];

    const createDataStreams = () => {
      const container = containerRef.current;
      const streamContainer = container?.querySelector(
        "#stream-container"
      ) as HTMLElement;

      if (!container || !streamContainer) {
        console.log("AnimatedBackground: No container found", {
          container: !!container,
          streamContainer: !!streamContainer,
        });
        return;
      }

      console.log(
        "AnimatedBackground: Creating data streams for",
        streamConfigs.length,
        "streams"
      );

      streamConfigs.forEach((config, index) => {
        console.log(`Creating stream ${index + 1}:`, config);

        // Create stream line element
        const streamLine = document.createElement("div");
        streamLine.className = "absolute pointer-events-none stream-line";
        streamLine.style.position = "absolute";
        streamLine.style.left = `${config.startX}px`;
        streamLine.style.top = `${config.startY}px`;
        streamLine.style.width = `${config.length}px`;
        streamLine.style.height = `${config.width}px`;
        streamLine.style.background = `linear-gradient(135deg, transparent 0%, ${config.color} 20%, ${config.color} 80%, transparent 100%)`;
        streamLine.style.opacity = config.opacity.toString();
        streamLine.style.transform = "rotate(45deg)";
        streamLine.style.transformOrigin = "0 0";
        streamLine.style.filter = "blur(0.5px)";
        streamLine.style.zIndex = "10";

        // Add subtle glow effect
        streamLine.style.boxShadow = `0 0 8px ${config.color}`;

        streamContainer.appendChild(streamLine);
        streamsRef.current.push(streamLine);

        // Create particles along the stream
        const particleCount = Math.floor(config.length / 25);
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute pointer-events-none data-particle";

          const particleSize = Math.random() * 2 + 1;
          particle.style.width = `${particleSize}px`;
          particle.style.height = `${particleSize}px`;
          particle.style.background = config.color;
          particle.style.borderRadius = "50%";
          particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
          particle.style.filter = "blur(0.3px)";
          particle.style.boxShadow = `0 0 6px ${config.color}`;
          particle.style.zIndex = "15";

          // Position particle along the stream path
          const offsetX = Math.cos(Math.PI / 4) * (i * 25);
          const offsetY = Math.sin(Math.PI / 4) * (i * 25);
          particle.style.left = `${config.startX + offsetX}px`;
          particle.style.top = `${config.startY + offsetY}px`;

          streamContainer.appendChild(particle);
          particlesRef.current.push(particle);

          // Animate particle movement
          const particleSpeed = config.speed + Math.random() * 3;
          const delay = Math.random() * 2 + index * 0.5;

          gsap.set(particle, {
            x: 0,
            y: 0,
          });

          gsap.to(particle, {
            x: -(window.innerWidth + 300),
            y: window.innerHeight + 300,
            duration: particleSpeed + Math.random() * 4,
            delay: delay,
            repeat: -1,
            ease: "none",
            onRepeat: () => {
              // Randomize particle properties on repeat
              particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
              const newSize = Math.random() * 2 + 1;
              particle.style.width = `${newSize}px`;
              particle.style.height = `${newSize}px`;
            },
          });

          // Add subtle scale animation for breathing effect
          gsap.to(particle, {
            scale: Math.random() * 0.5 + 0.8,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: delay + Math.random(),
          });
        }

        // Animate the main stream line
        gsap.set(streamLine, {
          x: 0,
          y: 0,
        });

        gsap.to(streamLine, {
          x: -(window.innerWidth + 400),
          y: window.innerHeight + 400,
          duration: config.speed + 2,
          delay: index * 0.3,
          repeat: -1,
          ease: "none",
          onRepeat: () => {
            // Vary opacity slightly on repeat
            streamLine.style.opacity = (
              config.opacity +
              Math.random() * 0.1 -
              0.05
            ).toString();
          },
        });

        // Add subtle opacity pulsing
        gsap.to(streamLine, {
          opacity: config.opacity * 0.7,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2,
        });

        console.log(`Successfully set up stream ${index + 1}`);
      });
    };

    // Start animations after a small delay to ensure DOM is ready
    animationTimeoutRef.current = setTimeout(() => {
      createDataStreams();
      console.log("AnimatedBackground: Data streams created");
    }, 100);

    // Cleanup function
    return () => {
      console.log("AnimatedBackground: Cleaning up");

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      streamsRef.current.forEach((stream) => {
        if (stream.parentNode) {
          stream.parentNode.removeChild(stream);
        }
      });

      particlesRef.current.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });

      gsap.killTweensOf("*"); // Kill all GSAP animations for this component
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
      style={{ perspective: "1000px" }}
    >
      {/* Very dark background with subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-black"></div>

      {/* Deep magenta-purple nebula effect - very subtle */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-950/20 via-transparent to-transparent opacity-30"></div>
        <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-violet-950/15 via-purple-950/10 to-transparent opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-950/15 via-purple-950/8 to-transparent opacity-50 blur-3xl"></div>
      </div>

      {/* Additional depth layers - very dark */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl animate-pulse animation-duration-12000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-900/8 rounded-full blur-3xl animate-pulse animation-duration-16000 animation-delay-4000"></div>
        <div className="absolute top-2/3 left-1/6 w-64 h-64 bg-indigo-900/4 rounded-full blur-2xl animate-pulse animation-duration-14000 animation-delay-2000"></div>
      </div>

      {/* Sparse distant stars - minimal and subtle */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[15%] left-[20%] w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse animation-duration-4000"></div>
        <div className="absolute top-[35%] right-[25%] w-0.5 h-0.5 bg-purple-200 rounded-full opacity-40 animate-pulse animation-duration-6000"></div>
        <div className="absolute bottom-[40%] left-[15%] w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse animation-duration-5000"></div>
        <div className="absolute top-[70%] right-[15%] w-0.5 h-0.5 bg-violet-200 rounded-full opacity-30 animate-pulse animation-duration-7000"></div>
        <div className="absolute bottom-[25%] right-[35%] w-0.5 h-0.5 bg-purple-100 rounded-full opacity-60 animate-pulse animation-duration-4500"></div>
        <div className="absolute top-[50%] left-[8%] w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse animation-duration-5500"></div>
      </div>

      {/* Subtle atmospheric glow - barely visible */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-950/10 via-transparent to-transparent"></div>

      {/* Data streams container */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        id="stream-container"
      >
        {/* Flowing data streams will be inserted here by the useEffect */}
      </div>
    </div>
  );
};

export default AnimatedBackground;
