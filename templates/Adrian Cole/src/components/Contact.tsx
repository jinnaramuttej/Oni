import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, Send, ShieldCheck } from "lucide-react";
import { site, socialLinks } from "../data/site";
import { btnPrimary, inputField } from "../utils/classes";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type FormState = "idle" | "sending" | "sent";

export function Contact() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    window.setTimeout(() => setState("sent"), 1200);
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-mist py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="08"
          eyebrow="Contact"
          title="Tell me about your project."
          description="Share a few details and I'll get back to you within one business day with honest thoughts on scope, timeline and fit."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ——— Info rail ——— */}
          <div className="space-y-5 lg:col-span-5">
            <Reveal>
              <div className="rounded-card bg-white p-7 shadow-card ring-1 ring-ink/[0.04]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-sm font-semibold text-ink">2 project slots open for Q3</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  I take on a maximum of two engagements at a time — so your project gets senior
                  attention, never a handoff to juniors.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-card bg-white p-7 shadow-card ring-1 ring-ink/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Prefer email?
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-3 inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-accent md:text-[1.7rem]"
                >
                  {site.email}
                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
                <ul className="mt-6 space-y-3.5 border-t border-ink/[0.06] pt-6 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {site.location} · CET
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-slate-400" />
                    Replies within 24 hours
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <ul className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-ink/[0.07] bg-white px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-soft"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-ink">{social.label}</span>
                        <span className="mt-0.5 block text-[11px] font-medium text-slate-400">
                          {social.handle}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ——— Form ——— */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="h-full rounded-card bg-white p-8 shadow-soft ring-1 ring-ink/[0.04] md:p-10">
              {state === "sent" ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
                    Message received.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                    Thanks for reaching out — I&apos;ll reply personally within one business day.
                    Talk soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="mt-8 text-sm font-semibold text-accent transition-colors hover:text-ink"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input id="name" name="name" type="text" required placeholder="Jane Cooper" className={inputField} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputField} />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-semibold text-ink">
                        Company <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <input id="company" name="company" type="text" placeholder="Acme Inc." className={inputField} />
                    </div>
                    <div>
                      <label htmlFor="budget" className="mb-2 block text-sm font-semibold text-ink">
                        Budget <span className="text-accent">*</span>
                      </label>
                      <select id="budget" name="budget" required defaultValue="" className={inputField}>
                        <option value="" disabled>
                          Select a range
                        </option>
                        <option>€3k – €8k</option>
                        <option>€8k – €15k</option>
                        <option>€15k – €30k</option>
                        <option>€30k+</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                        Project details <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="What are you building? What does success look like? Any timeline in mind?"
                        className={`${inputField} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
                    <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <ShieldCheck className="h-4 w-4" />
                      No newsletters, no spam — just a personal reply.
                    </p>
                    <button type="submit" disabled={state === "sending"} className={`${btnPrimary} disabled:translate-y-0 disabled:opacity-70`}>
                      {state === "sending" ? (
                        <>
                          Sending
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-14 flex items-center justify-center gap-2.5 text-center text-sm font-medium text-slate-400">
            <Mail className="h-4 w-4" />
            Currently booking projects starting August 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
