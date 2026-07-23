import Reveal from "./Reveal";
import {
  Mail,
  MapPin,
  Calendar,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-gray-100 px-6 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-subtle-blue/2 to-muted-purple/2 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
          {/* Left - Info */}
          <div className="lg:col-span-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
                Get in Touch
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Let&apos;s create
                <br />
                <span className="text-gradient-blue">something great</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-base leading-relaxed text-slate-custom/80">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Whether you need a
                design partner or a hands-on developer — let&apos;s talk.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-custom/70">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-gray">
                    <Mail className="h-4 w-4 text-matte-black" />
                  </div>
                  <span>hello@alexmorgan.dev</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-custom/70">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-gray">
                    <MapPin className="h-4 w-4 text-matte-black" />
                  </div>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-custom/70">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-gray">
                    <Calendar className="h-4 w-4 text-matte-black" />
                  </div>
                  <span>Available for remote &amp; onsite</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            <Reveal delay={150}>
              <form
                className="rounded-[20px] border border-gray-100 bg-white p-6 shadow-premium-card sm:p-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-slate-custom/60 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-gray-200 bg-off-white px-4 py-3 text-sm text-matte-black placeholder:text-slate-custom/40 transition-all duration-200 focus:border-subtle-blue/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-subtle-blue/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-slate-custom/60 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-off-white px-4 py-3 text-sm text-matte-black placeholder:text-slate-custom/40 transition-all duration-200 focus:border-subtle-blue/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-subtle-blue/10"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="project" className="block text-xs font-medium uppercase tracking-wider text-slate-custom/60 mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="project"
                      className="w-full rounded-xl border border-gray-200 bg-off-white px-4 py-3 text-sm text-slate-custom/70 transition-all duration-200 focus:border-subtle-blue/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-subtle-blue/10"
                    >
                      <option value="">Select a service</option>
                      <option value="design">Product Design</option>
                      <option value="development">Front-End Development</option>
                      <option value="system">Design System</option>
                      <option value="consulting">UX Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-slate-custom/60 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-off-white px-4 py-3 text-sm text-matte-black placeholder:text-slate-custom/40 transition-all duration-200 focus:border-subtle-blue/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-subtle-blue/10"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-matte-black px-7 py-3.5 text-sm font-medium text-white shadow-premium-button transition-all duration-300 hover:bg-neutral-800 hover:shadow-premium-button-hover hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
                  >
                    Send Message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
