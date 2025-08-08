"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      // Set initial states to prevent flashing with GPU-optimized transforms
      gsap.set(".about-title", {
        y: 30,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(".about-avatar", {
        x: -30,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(".about-description", {
        x: 30,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(".about-extended p", {
        y: 15,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(".stats-item", {
        y: 20,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });

      // Create main timeline with optimized settings
      const tl = gsap.timeline({
        defaults: {
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        },
      });

      // Animate section title
      tl.to(".about-title", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "willChange",
      })
        // Animate avatar and description together
        .to(
          ".about-avatar",
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            clearProps: "willChange",
          },
          "-=0.4"
        )
        .to(
          ".about-description",
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            clearProps: "willChange",
          },
          "-=0.4"
        )
        // Animate extended description
        .to(
          ".about-extended p",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "willChange",
          },
          "-=0.2"
        )
        // Animate stats section
        .to(
          ".stats-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "willChange",
          },
          "-=0.1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/50 to-black transform-gpu"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="about-title text-4xl md:text-5xl font-bold mb-16 will-change-transform">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
        </div>

        {/* Avatar and Content Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 mb-16">
          {/* Avatar - Left Side */}
          <div className="about-avatar flex-shrink-0 will-change-transform transform-gpu">
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 p-1 hover:scale-105 transition-transform duration-300 ease-out">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden transform-gpu">
                {/* Placeholder Avatar */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white text-6xl md:text-7xl lg:text-8xl font-bold transform-gpu">
                  DJ
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mt-6">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 will-change-transform"
                aria-label="GitHub Profile"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/dananjaya97"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:border-blue-500/50 hover:scale-110 transition-all duration-300 will-change-transform"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:border-cyan-500/50 hover:scale-110 transition-all duration-300 will-change-transform"
                aria-label="Twitter Profile"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@danajay.dev"
                className="group w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 will-change-transform"
                aria-label="Email Contact"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="flex-1 text-center lg:text-left will-change-transform transform-gpu">
            <p className="about-description text-lg md:text-xl text-gray-300 leading-relaxed mb-8 will-change-transform">
              I&apos;m Dana Jay, a passionate full-stack developer and UI/UX
              designer with {new Date().getFullYear() - 2019}+ years of
              experience creating digital solutions that make a difference. I
              specialize in building modern web applications that blend
              beautiful design with powerful functionality, turning complex
              problems into simple, intuitive user experiences.
            </p>

            {/* Extended Description */}
            <div className="about-extended space-y-6 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                My journey in web development started with curiosity and has
                evolved into a passion for creating meaningful digital
                experiences. I believe that great software should not only work
                flawlessly but also feel intuitive and delightful to use.
              </p>

              <p>
                When I&apos;m not coding, you&apos;ll find me exploring the
                latest design trends, experimenting with new technologies, or
                contributing to open-source projects. I&apos;m always eager to
                learn and stay up-to-date with the rapidly evolving world of web
                development.
              </p>

              <p>
                I approach every project with attention to detail, a focus on
                performance, and a commitment to delivering solutions that
                exceed expectations. Whether it&apos;s a simple landing page or
                a complex web application, I bring the same level of dedication
                and craftsmanship to every project.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "75+", label: "Projects Completed" },
            { number: "5+", label: "Years Experience" },
            { number: "22+", label: "Technologies" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="stats-item text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200 ease-out will-change-transform transform-gpu"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
