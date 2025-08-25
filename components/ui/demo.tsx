"use client";

import { HeroSection } from "@/components/ui/hero-odyssey";
import { Features } from "@/components/ui/features-8";
import ProjectsSection from "@/components/ui/projects-section";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import ContactSection from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";
import { Hexagon, Github, Twitter } from "lucide-react";

const DemoOne = () => {
  return (
    <main className="w-full">
      <section className="w-full">
        <HeroSection />
      </section>
      <Features />
      <ProjectsSection />
      <TestimonialsSection
        title="Trusted by developers worldwide"
        description="Join thousands of developers who are already building the future with our AI platform"
        testimonials={[
          {
            author: {
              name: "Emma Thompson",
              handle: "@emmaai",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
            },
            text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
            href: "https://twitter.com/emmaai",
          },
          {
            author: {
              name: "David Park",
              handle: "@davidtech",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            },
            text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
            href: "https://twitter.com/davidtech",
          },
          {
            author: {
              name: "Sofia Rodriguez",
              handle: "@sofiaml",
              avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            },
            text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive.",
          },
        ]}
      />
      <ContactSection />
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Dana Jay"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/#projects", label: "Projects" },
          { href: "/#about", label: "About" },
          { href: "/blog", label: "Blog" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{ text: "© 2025 Dana Jay", license: "All rights reserved" }}
      />
    </main>
  );
};

export { DemoOne };
