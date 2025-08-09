"use client";

import { HeroSection } from "@/components/ui/hero-odyssey";
import { Features } from "@/components/ui/features-8";
import ProjectsSection from "@/components/ui/projects-section";

const DemoOne = () => {
  return (
    <main className="w-full">
      <section className="flex w-full h-screen justify-center items-center">
        <HeroSection />
      </section>
      <Features />
      <ProjectsSection />
    </main>
  );
};

export { DemoOne };
