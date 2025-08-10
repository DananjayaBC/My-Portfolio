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
        // Full viewport height on all screens with dynamic viewport fallback
        "h-[100svh] supports-[height:100dvh]:h-[100dvh]",
        "px-4 sm:px-6 lg:px-8 py-12 sm:py-20",
        "flex items-center justify-center text-center",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-b from-[#1e386b]/20 to-black/0 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-b from-[#1e386b]/10 to-black/0 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center sm:gap-16">
        <div className="mb-12 w-full px-4 text-center">
          <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 ring-1 ring-white/10 backdrop-blur">
            Testimonials
          </p>
          <h2 className="mx-auto mt-4 max-w-[720px] text-balance text-4xl font-semibold sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">{description}</p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group mobile-scroll w-full overflow-x-auto sm:overflow-hidden p-2 -mx-4 px-4 snap-x snap-mandatory [--gap:1.5rem] sm:[--gap:2rem] [--duration:40s]">
            <div className="testimonial-scroller flex">
              <div className="flex shrink-0 flex-row flex-nowrap justify-start [gap:var(--gap)]">
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`set1-${i}`}
                    className="flex-none snap-start"
                    {...testimonial}
                  />
                ))}
              </div>
              <div
                className="hidden shrink-0 flex-row flex-nowrap justify-start [gap:var(--gap)] ml-[var(--gap)] sm:flex"
                aria-hidden="true"
              >
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`set2-${i}`}
                    className="flex-none snap-start"
                    {...testimonial}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-black sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-black sm:block" />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 sm:hidden">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M7 12H3m0 0 2.5 2.5M3 12l2.5-2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 12h4m0 0-2.5 2.5M21 12l-2.5-2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm">Swipe to explore</span>
        </div>
        <style jsx>{`
          /* Hide scrollbar on mobile swipe container */
          .mobile-scroll::-webkit-scrollbar {
            display: none;
          }
          .mobile-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @media (min-width: 640px) {
            .testimonial-scroller {
              animation: testimonial-scroll var(--duration) linear infinite;
              will-change: transform;
            }
            :global(.group:hover) .testimonial-scroller {
              animation-play-state: paused;
            }
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
