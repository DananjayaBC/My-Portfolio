"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TechStack from "./components/TechStack";
import AboutMe from "./components/AboutMe";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMobileMenu = () => {
    console.log("Toggle mobile menu clicked, current state:", isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!isClient) return;
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".hero-content > *", { y: 50, opacity: 0 });
      gsap.set(".nav-item", { y: -20, opacity: 0 });

      // Navigation animation
      gsap.to(".nav-item", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });

      // Hero content animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(".status-badge", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          ".hero-title",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ".hero-description",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".hero-buttons",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          ".scroll-indicator",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.1"
        );

      // Continuous floating animation for the hero content
      gsap.to(".hero-content", {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isClient]);

  // Handle mobile menu body scroll lock and escape key
  useEffect(() => {
    const body = document.body;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
      body.classList.add("menu-open");
      document.addEventListener("keydown", handleEscape);
    } else {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleEscape);
    }

    // Cleanup function
    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center p-6 lg:p-8"
      >
        <div className="nav-item text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Dana
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#about"
            className="nav-item hover:text-purple-400 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#projects"
            className="nav-item hover:text-purple-400 transition-colors duration-300"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="nav-item hover:text-purple-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden nav-item mobile-menu-button relative w-10 h-10 flex flex-col justify-center items-center group z-30 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-gradient-to-b from-gray-900/98 to-black/98 backdrop-blur-md border-l border-purple-500/30 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col p-8 pt-20 space-y-8 h-full">
            <a
              href="#about"
              onClick={toggleMobileMenu}
              className="text-2xl font-light text-white hover:text-purple-400 transition-all duration-300 border-b border-gray-700/50 pb-4 hover:pl-2"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={toggleMobileMenu}
              className="text-2xl font-light text-white hover:text-purple-400 transition-all duration-300 border-b border-gray-700/50 pb-4 hover:pl-2"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={toggleMobileMenu}
              className="text-2xl font-light text-white hover:text-purple-400 transition-all duration-300 border-b border-gray-700/50 pb-4 hover:pl-2"
            >
              Contact
            </a>

            {/* Social Links */}
            <div className="pt-8 mt-auto border-t border-gray-700/50">
              <p className="text-sm text-gray-400 mb-4">Let&apos;s connect</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                >
                  <span className="text-sm text-purple-400">💼</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
                >
                  <span className="text-sm text-cyan-400">📧</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center hover:bg-pink-500/30 transition-colors"
                >
                  <span className="text-sm text-pink-400">🔗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 lg:px-8"
      >
        <div className="hero-content text-center max-w-4xl mx-auto">
          {/* Status badge */}
          <div className="status-badge inline-flex items-center px-4 py-2 mb-8 bg-gray-800/50 border border-gray-700/50 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-300">Available for work</span>
          </div>

          {/* Main heading */}
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Hi, I&apos;m</span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dana Jay
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-light mb-6 text-gray-300">
            Full-Stack Developer & UI/UX Designer
          </h2>

          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I craft digital experiences that blend beautiful design with
            powerful functionality. Passionate about creating solutions that
            make a difference.
          </p>

          {/* CTA buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/40 will-change-transform">
              <span className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] scale-110 group-hover:scale-100"></div>
            </button>

            <button className="group relative px-8 py-4 border border-gray-600 rounded-lg font-semibold text-white transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-purple-400 hover:bg-purple-400/15 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-400/30 overflow-hidden will-change-transform">
              <span className="flex items-center relative z-10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                Get In Touch
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] scale-110 group-hover:scale-100"></div>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xs text-gray-500 mb-2">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border border-gray-600 rounded-full flex justify-center items-center">
              <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-transparent rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Technology Stack Section */}
      <TechStack />

      {/* About Me Section */}
      <AboutMe />
    </div>
  );
}
