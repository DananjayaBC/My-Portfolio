import ContactSection from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";
import { Hexagon, Github, Twitter } from "lucide-react";

export const metadata = {
  title: "Contact | Dana Jay",
  description: "Get in touch to discuss your next project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
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
        copyright={{ text: "© 2024 Dana Jay", license: "All rights reserved" }}
      />
    </main>
  );
}
