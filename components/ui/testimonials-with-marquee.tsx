"use client";
import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  TestimonialAuthor,
} from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className={cn(
        "relative bg-gradient-to-b from-black via-[#0b1a30] to-black sm:bg-black text-white overflow-hidden",
        "min-h-[100svh] px-0",
        "flex items-center justify-center text-center",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-b from-[#1e386b]/20 to-black/0 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-b from-[#1e386b]/10 to-black/0 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group w-full overflow-hidden p-2 [--gap:1.5rem] sm:[--gap:2rem] [--duration:40s]">
            <div className="testimonial-scroller flex">
              <div className="flex shrink-0 flex-row flex-nowrap justify-start [gap:var(--gap)]">
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`set1-${i}`}
                    className="flex-none"
                    {...testimonial}
                  />
                ))}
              </div>
              <div
                className="flex shrink-0 flex-row flex-nowrap justify-start [gap:var(--gap)] ml-[var(--gap)]"
                aria-hidden="true"
              >
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`set2-${i}`}
                    className="flex-none"
                    {...testimonial}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-black sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-black sm:block" />
        </div>
        <style jsx>{`
          .testimonial-scroller {
            animation: testimonial-scroll var(--duration) linear infinite;
            will-change: transform;
          }
          :global(.group:hover) .testimonial-scroller {
            animation-play-state: paused;
          }
          @keyframes testimonial-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
