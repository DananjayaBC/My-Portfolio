"use client";

import { useEffect, useRef } from "react";

const technologies = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
  },
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
  },
  {
    name: "Tailwind CSS",
    logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    color: "#06B6D4",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: "#FF9900",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
  },
  {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: "#4FC08D",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
  },
  {
    name: "GraphQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "#E10098",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    color: "#764ABC",
  },
  {
    name: "Sass",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    color: "#CC6699",
  },
  {
    name: "Webpack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    color: "#8DD6F9",
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
  },
];

export default function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the content for seamless loop
    const scrollContent = scrollContainer.querySelector(".scroll-content");
    if (scrollContent) {
      const clone = scrollContent.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scrollContainer.appendChild(clone);
    }

    // Start the animation
    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      position -= speed;

      // Reset position when first set of items has completely scrolled out
      if (Math.abs(position) >= (scrollContent?.scrollWidth || 0)) {
        position = 0;
      }

      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="w-full h-[100px] bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-cyan-900/10 border-y border-blue-500/20 overflow-hidden relative">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex items-center h-full whitespace-nowrap will-change-transform"
      >
        <div className="scroll-content flex items-center space-x-12 h-full px-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group flex-shrink-0 relative flex items-center space-x-3"
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-8 h-8 object-contain transition-all duration-500 ease-out group-hover:w-9 group-hover:h-9 filter group-hover:drop-shadow-lg"
                  style={{
                    filter: "brightness(0.9) contrast(1.1)",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.target as HTMLImageElement
                    ).style.filter = `brightness(1.2) contrast(1.2) drop-shadow(0 0 8px ${tech.color}40)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.filter =
                      "brightness(0.9) contrast(1.1)";
                  }}
                />

                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                  style={{
                    background: `radial-gradient(circle, ${tech.color}20 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Technology Name */}
              <span
                className="text-lg font-semibold text-gray-300 transition-all duration-500 ease-out group-hover:text-white group-hover:scale-105"
                style={{
                  textShadow: "0 0 0 transparent",
                  transition: "all 0.5s ease-out",
                }}
                onMouseEnter={(e) => {
                  (
                    e.target as HTMLSpanElement
                  ).style.textShadow = `0 0 12px ${tech.color}60`;
                  (e.target as HTMLSpanElement).style.color = tech.color;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLSpanElement).style.textShadow =
                    "0 0 0 transparent";
                  (e.target as HTMLSpanElement).style.color = "";
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
