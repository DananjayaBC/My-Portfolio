"use client";

import React, { useState } from "react";

const CONTACT_EMAIL = "hello@example.com";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;
    setIsSubmitting(true);
    // Demo submit – replace with your API call or Formspree
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setIsSent(true);
    setFullName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-black via-[#0b1a30] to-black sm:bg-black text-white min-h-[100svh] flex items-center"
    >
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-b from-[#1e386b]/25 to-black/0 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-b from-[#1e386b]/15 to-black/0 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12 text-center">
          <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 ring-1 ring-white/10 backdrop-blur">
            Let’s collaborate
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Let’s build something great together
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">
            Have a project in mind or just want to say hi? Send a message and
            I’ll get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact info / socials */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-30" />
            <div className="relative">
              <h3 className="text-xl font-medium">Prefer not to use forms?</h3>
              <p className="mt-2 text-gray-400">
                Reach me directly via email or connect on socials.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition-colors hover:bg-black/50"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white/80"
                    >
                      <path
                        d="M4 6h16v12H4z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">{CONTACT_EMAIL}</span>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300">
                    Email
                  </span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-black/50"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.23v3.3c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-black/50"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5Zm.02 4.9H2V22h3V8.4Zm4 0H6.98V22H10V15c0-1.87.38-3.68 2.67-3.68 2.26 0 2.29 2.1 2.29 3.8V22h3v-7.54c0-3.72-1.98-5.46-4.63-5.46-2.14 0-3.1 1.18-3.64 2.01h.04V8.4Z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-gray-400">
                    Based in Planet Earth • Available for remote work
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#1e386b]/40 to-black/20 opacity-40 blur-md" />
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-1 block text-sm text-gray-300"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none ring-0 focus:border-white/20 focus:bg-white/10"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none ring-0 focus:border-white/20 focus:bg-white/10"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell me a bit about your project, timeline, and goals."
                    className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none ring-0 focus:border-white/20 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1e386b] to-black px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending…</span>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m3 12 18-8-8 18-2.5-7L3 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Send message
                    </>
                  )}
                </button>

                {isSent ? (
                  <div className="text-sm text-emerald-400">
                    Thanks! I’ll get back to you shortly.
                  </div>
                ) : (
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      "Inquiry from portfolio"
                    )}&body=${encodeURIComponent(
                      `${fullName}\n${email}\n\n${message}`
                    )}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-300 underline-offset-4 hover:underline"
                  >
                    Or email me directly
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
