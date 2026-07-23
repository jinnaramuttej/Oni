import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0">
        <img
          src="/images/contact-bg.jpg"
          alt=""
          role="presentation"
          loading="lazy"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
              <span className="h-px w-10 bg-mist/60" />
              Let's Talk
            </p>
            <h2 className="font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
              Have a bold idea?
              <br />
              Let's build it.
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 max-w-lg text-balance text-lg leading-relaxed text-mist">
            Tell us about your vision — a new brand, product, or experience.
            We reply to every serious inquiry within 48 hours.
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="mailto:hello@novum.studio" variant="primary">
              Start a Project
              <ArrowUpRight size={18} />
            </MagneticButton>
            <a
              href="mailto:hello@novum.studio"
              className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-paper"
            >
              <Mail size={16} />
              hello@novum.studio
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5 rounded-3xl border border-white/10 bg-charcoal/70 p-6 backdrop-blur-md sm:p-8"
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mist">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-paper placeholder:text-mist/50 focus:border-violet-light focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mist">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-paper placeholder:text-mist/50 focus:border-violet-light focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mist">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us what you're building..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-paper placeholder:text-mist/50 focus:border-violet-light focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-paper px-6 py-4 text-sm font-semibold text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(109,40,217,0.35)]"
              >
                Send Inquiry
                <ArrowUpRight size={18} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
