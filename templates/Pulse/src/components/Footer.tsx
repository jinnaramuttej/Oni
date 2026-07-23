import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { EASE, Logo, PulseDot } from "./ui";

/* ── brand marks (inline to avoid heavy deps) ─────────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.3 17.41Z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.51a3.02 3.02 0 0 0-2.12-2.14C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.38.52A3.02 3.02 0 0 0 .5 6.51 31.6 31.6 0 0 0 0 12c0 1.83.17 3.66.5 5.49a3.02 3.02 0 0 0 2.12 2.14c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3.02 3.02 0 0 0 2.12-2.14c.33-1.83.5-3.66.5-5.49 0-1.83-.17-3.66-.5-5.49ZM9.6 15.6V8.4l6.25 3.6-6.25 3.6Z" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Product",
    links: ["Analytics", "Pulse Copilot", "Funnels & Cohorts", "Automations", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Customers", "Press kit", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Guides", "Status", "Community"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA", "Subprocessors"],
  },
];

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub" },
  { icon: XIcon, label: "X / Twitter" },
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: YoutubeIcon, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* ── CTA banner ── */}
      <section id="cta" aria-label="Get started" className="scroll-mt-24 px-5 pb-24 pt-8 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-7xl"
        >
          <div className="ring-grad relative overflow-hidden rounded-[28px]">
            <div className="noise relative rounded-[27px] bg-graphite px-6 py-16 text-center sm:px-12 sm:py-24">
              {/* ambient */}
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_80%_at_50%_100%,black,transparent)]" />
                <div className="absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.16] blur-[110px]" />
                <div className="absolute bottom-[-200px] left-1/2 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-cyan/[0.07] blur-[110px]" />
              </div>

              <div className="relative">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                  className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-charcoal/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute"
                >
                  <PulseDot />
                  2,341 teams joined this month
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
                  className="mx-auto mt-7 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-mist sm:text-6xl"
                >
                  Make your next decision{" "}
                  <span className="text-grad">the obvious one.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                  className="mx-auto mt-5 max-w-md text-base leading-7 text-mute sm:text-lg"
                >
                  Connect your first event stream today. Your future self — the
                  one with answers — will thank you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
                  className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
                >
                  <a
                    href="#pricing"
                    className="btn-sheen group inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[18px] bg-mist px-8 text-base font-semibold text-charcoal shadow-[0_12px_48px_-12px_rgb(124_58_237/0.6),inset_0_1px_0_rgb(255_255_255/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.985] sm:w-auto"
                  >
                    Start Free
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                  <a
                    href="#pricing"
                    className="inline-flex h-[52px] w-full items-center justify-center rounded-[18px] border border-line bg-charcoal/50 px-8 text-base font-medium text-mist backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] active:translate-y-0 active:scale-[0.985] sm:w-auto"
                  >
                    Book Demo
                  </a>
                </motion.div>

                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-mute/80"
                >
                  {["No credit card required", "Cancel anytime", "SOC 2 certified"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <Check className="size-3.5 text-cyan" aria-hidden />
                      {t}
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── footer body ── */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* brand */}
            <div className="lg:col-span-4">
              <a href="#top" aria-label="Pulse — back to top">
                <Logo />
              </a>
              <p className="mt-5 max-w-xs text-sm leading-6 text-mute">
                Real-time product analytics with an AI copilot. Built for teams
                who'd rather ship than wait for data.
              </p>
              <div className="mt-6 flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href="#top"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-mute transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-mist focus-visible:outline-2 focus-visible:outline-accent-soft"
                  >
                    <s.icon className="size-[18px]" aria-hidden />
                  </a>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] py-2 pl-3 pr-4">
                <PulseDot />
                <span className="text-xs font-medium text-mute">All systems operational</span>
              </div>
            </div>

            {/* link columns */}
            <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-mute/60">
                    {col.title}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#top"
                          className="text-sm text-mute transition-colors duration-200 hover:text-mist"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
            <p className="text-[13px] text-mute/60">
              © {new Date().getFullYear()} Pulse Analytics, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-mute/50">
              <span>SOC 2 Type II</span>
              <span aria-hidden>·</span>
              <span>GDPR</span>
              <span aria-hidden>·</span>
              <span>Made for builders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
