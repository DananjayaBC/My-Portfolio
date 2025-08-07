"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface OrbitConfig {
  width: number;
  height: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  duration: number;
  delay: number;
  opacity: number;
  isDotted: boolean;
  color: string;
}

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const orbitsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Clear any existing orbits
    orbitsRef.current.forEach((orbit) => {
      if (orbit.parentNode) {
        orbit.parentNode.removeChild(orbit);
      }
    });
    orbitsRef.current = [];

    // Orbit configurations for different 3D orientations
    const orbitConfigs: OrbitConfig[] = [
      {
        width: 400,
        height: 200,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 25,
        delay: 0,
        opacity: 0.5,
        isDotted: false,
        color: "white",
      },
      {
        width: 300,
        height: 150,
        rotationX: 60,
        rotationY: 0,
        rotationZ: 30,
        duration: 20,
        delay: 3,
        opacity: 0.4,
        isDotted: true,
        color: "rgb(221, 214, 254)", // pale lavender
      },
      {
        width: 500,
        height: 250,
        rotationX: 0,
        rotationY: 45,
        rotationZ: 0,
        duration: 30,
        delay: 8,
        opacity: 0.45,
        isDotted: false,
        color: "white",
      },
      {
        width: 350,
        height: 175,
        rotationX: 30,
        rotationY: 30,
        rotationZ: 45,
        duration: 22,
        delay: 12,
        opacity: 0.35,
        isDotted: false,
        color: "rgb(221, 214, 254)",
      },
      {
        width: 450,
        height: 300,
        rotationX: 45,
        rotationY: 15,
        rotationZ: 60,
        duration: 35,
        delay: 16,
        opacity: 0.3,
        isDotted: true,
        color: "white",
      },
      {
        width: 250,
        height: 125,
        rotationX: 75,
        rotationY: 45,
        rotationZ: 15,
        duration: 18,
        delay: 6,
        opacity: 0.4,
        isDotted: false,
        color: "rgb(221, 214, 254)",
      },
      {
        width: 600,
        height: 180,
        rotationX: 15,
        rotationY: 60,
        rotationZ: 30,
        duration: 40,
        delay: 20,
        opacity: 0.25,
        isDotted: false,
        color: "white",
      },
      {
        width: 320,
        height: 160,
        rotationX: 50,
        rotationY: 20,
        rotationZ: 75,
        duration: 26,
        delay: 10,
        opacity: 0.35,
        isDotted: true,
        color: "rgb(221, 214, 254)",
      },
    ];

    const createOrbitalPaths = () => {
      const container = containerRef.current;
      if (!container) return;

      orbitConfigs.forEach((config, index) => {
        // Create orbit container for 3D positioning
        const orbitContainer = document.createElement("div");
        orbitContainer.className =
          "absolute top-1/2 left-1/2 pointer-events-none";
        orbitContainer.style.transform = `
          translate(-50%, -50%)
          rotateX(${config.rotationX}deg)
          rotateY(${config.rotationY}deg)
        `;
        orbitContainer.style.transformStyle = "preserve-3d";

        // Create the elliptical path (optional - shows the track)
        const path = document.createElement("div");
        path.className = "absolute top-1/2 left-1/2";
        path.style.width = `${config.width}px`;
        path.style.height = `${config.height}px`;
        path.style.transform = "translate(-50%, -50%)";
        path.style.border = config.isDotted
          ? `1px dotted ${config.color}`
          : `1px solid ${config.color}`;
        path.style.borderRadius = "50%";
        path.style.opacity = (config.opacity * 0.3).toString(); // Make paths more subtle
        path.style.filter = "blur(0.5px)";

        // Create the moving object (circle/dot)
        const movingObject = document.createElement("div");
        movingObject.className = "absolute";
        movingObject.style.width = config.isDotted ? "3px" : "4px";
        movingObject.style.height = config.isDotted ? "3px" : "4px";
        movingObject.style.backgroundColor = config.color;
        movingObject.style.borderRadius = "50%";
        movingObject.style.opacity = config.opacity.toString();
        movingObject.style.filter = "blur(0.3px)";
        movingObject.style.boxShadow = `0 0 8px ${
          config.color === "white"
            ? "rgba(255,255,255,0.6)"
            : "rgba(221,214,254,0.6)"
        }`;

        // Position the moving object initially
        movingObject.style.left = `${config.width / 2}px`;
        movingObject.style.top = "50%";
        movingObject.style.transform = "translate(-50%, -50%)";

        // Add elements to containers
        orbitContainer.appendChild(path);
        orbitContainer.appendChild(movingObject);
        container.appendChild(orbitContainer);
        orbitsRef.current.push(orbitContainer);

        // Animate the moving object along the elliptical path
        gsap.set(movingObject, {
          transformOrigin: `${-config.width / 2}px center`,
        });

        gsap.to(movingObject, {
          rotation: 360,
          duration: config.duration,
          delay: config.delay,
          repeat: -1,
          ease: "none",
        });

        // Add subtle scale animation to the moving object
        gsap.to(movingObject, {
          scale: 1.3,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: config.delay + 2,
        });

        // Add breathing effect to some paths
        if (index % 3 === 0) {
          gsap.to(path, {
            scale: 1.02,
            duration: 6 + index * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: config.delay,
          });
        }
      });
    };

    createOrbitalPaths();

    // Cleanup function
    return () => {
      orbitsRef.current.forEach((orbit) => {
        if (orbit.parentNode) {
          orbit.parentNode.removeChild(orbit);
        }
      });
      gsap.killTweensOf(orbitsRef.current);
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
      {/* Deep space background with nebula effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>

      {/* Purple nebula clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/30 via-transparent to-transparent opacity-40"></div>
        <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-blue-900/25 via-purple-800/15 to-transparent opacity-50 blur-xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-900/20 via-purple-900/10 to-transparent opacity-60 blur-2xl"></div>
      </div>

      {/* Subtle blue nebula wisps */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse animation-duration-8000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse animation-duration-12000 animation-delay-4000"></div>
        <div className="absolute top-2/3 left-1/6 w-64 h-64 bg-indigo-600/6 rounded-full blur-2xl animate-pulse animation-duration-10000 animation-delay-2000"></div>
      </div>

      {/* Distant stars effect */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white rounded-full opacity-80 animate-pulse animation-duration-3000"></div>
        <div className="absolute top-[25%] right-[20%] w-0.5 h-0.5 bg-purple-200 rounded-full opacity-60 animate-pulse animation-duration-4000"></div>
        <div className="absolute bottom-[30%] left-[10%] w-1 h-1 bg-blue-200 rounded-full opacity-70 animate-pulse animation-duration-5000"></div>
        <div className="absolute top-[60%] right-[10%] w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse animation-duration-6000"></div>
        <div className="absolute bottom-[20%] right-[30%] w-1 h-1 bg-purple-100 rounded-full opacity-80 animate-pulse animation-duration-3500"></div>
        <div className="absolute top-[40%] left-[5%] w-0.5 h-0.5 bg-blue-100 rounded-full opacity-60 animate-pulse animation-duration-4500"></div>
        <div className="absolute bottom-[10%] left-[40%] w-1 h-1 bg-white rounded-full opacity-70 animate-pulse animation-duration-5500"></div>
        <div className="absolute top-[80%] right-[40%] w-0.5 h-0.5 bg-purple-200 rounded-full opacity-50 animate-pulse animation-duration-2800"></div>
      </div>

      {/* Subtle atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/5 via-transparent to-transparent"></div>

      {/* Orbital paths will be inserted here by the useEffect */}
    </div>
  );
};

export default AnimatedBackground;
