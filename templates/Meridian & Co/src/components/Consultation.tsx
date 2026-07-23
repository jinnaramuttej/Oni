import { useState, type FormEvent, type ReactNode } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import { Reveal, SectionHeading } from "../lib/ui";

const SERVICE_OPTIONS = [
  "Accounting & Bookkeeping",
  "Income Tax Planning",
  "GST & Indirect Tax",
  "Business Registration",
  "Payroll Management",
  "Virtual CFO / Advisory",
  "Audit & Assurance",
  "Corporate Compliance",
];

const CONTACT_ROWS = [
  { icon: Phone, label: "Speak to a CA", value: "+91 22 4890 2200" },
  { icon: Mail, label: "Email the firm", value: "hello@meridianco.in" },
  { icon: MapPin, label: "Visit us", value: "Level 9, Platina Tower, BKC, Mumbai 400 051" },
  { icon: Clock, label: "Working hours", value: "Mon – Sat · 9:30 AM – 7:00 PM IST" },
] as const;

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-800 placeholder:font-medium placeholder:text-slate-400 transition-all duration-200 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/25";

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}

export default function Consultation() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="bg-mist py-24 md:py-32" aria-label="Schedule a consultation">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-navy-800 shadow-lift">
            {/* Geometry */}
            <div aria-hidden="true" className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[40px] border-white/[0.05]" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[32px] border-white/[0.05]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />

            <div className="relative z-10 grid gap-12 p-7 md:p-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-16">
              {/* Left: pitch + contact info */}
              <div>
                <SectionHeading
                  dark
                  eyebrow="Schedule a consultation"
                  title={
                    <>
                      Your first conversation is <span className="text-green-300">free — and useful.</span>
                    </>
                  }
                  description="Tell us where the friction is. Within one business day, a partner (not a bot) will map your situation and propose a fixed-fee engagement."
                />

                <ul className="mt-10 space-y-4">
                  {CONTACT_ROWS.map((row, i) => (
                    <Reveal key={row.label} delay={i * 90}>
                      <li className="flex items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                          <row.icon className="h-[18px] w-[18px] text-green-300" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-200/70">{row.label}</p>
                          <p className="mt-0.5 text-sm font-bold text-white">{row.value}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={380}>
                  <p className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-gold-400/40 bg-gold-500/10 px-5 py-2.5 text-sm font-bold text-gold-300">
                    <ShieldCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                    Fully confidential · covered by ICAI professional standards
                  </p>
                </Reveal>
              </div>

              {/* Right: booking form card */}
              <Reveal delay={150}>
                <div className="rounded-[24px] bg-white p-6 shadow-lift md:p-9">
                  {status === "success" ? (
                    <div className="flex min-h-[480px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-green-700/10">
                        <CheckCircle2 className="h-8 w-8 text-green-700" aria-hidden="true" />
                      </span>
                      <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy-800">Request received.</h3>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                        A partner will reach out within <strong className="text-navy-800">4 business hours</strong> with a
                        proposed time and a short pre-call checklist.
                      </p>
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-extrabold text-navy-700">
                        <CalendarCheck className="h-4 w-4 text-green-700" aria-hidden="true" />
                        Calendar invite lands in your inbox shortly
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} aria-label="Consultation booking form">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-extrabold tracking-tight text-navy-800">Book your slot</h3>
                        <span className="rounded-full bg-green-700/10 px-3 py-1 text-[11px] font-extrabold text-green-700">
                          Free 30 min
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-slate-500">Takes under a minute — no documents needed yet.</p>

                      <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <Field label="Full name">
                          <input required name="name" type="text" autoComplete="name" placeholder="Aditya Rao" className={inputCls} />
                        </Field>
                        <Field label="Work email">
                          <input required name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls} />
                        </Field>
                        <Field label="Phone">
                          <input required name="phone" type="tel" autoComplete="tel" placeholder="+91 98200 00000" className={inputCls} />
                        </Field>
                        <Field label="Service of interest">
                          <select required name="service" defaultValue="" className={inputCls}>
                            <option value="" disabled>
                              Select a practice
                            </option>
                            {SERVICE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Preferred date" className="sm:col-span-2">
                          <input required name="date" type="date" className={inputCls} />
                        </Field>
                        <Field label="What should we prepare for?" className="sm:col-span-2">
                          <textarea
                            name="message"
                            rows={3}
                            placeholder="e.g. We're a 25-person SaaS company that needs GST e-invoicing and a monthly MIS setup…"
                            className={`${inputCls} resize-none`}
                          />
                        </Field>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-green-700 px-7 py-4 text-[0.95rem] font-extrabold text-white shadow-glow-emerald transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 disabled:translate-y-0 disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden="true" />
                            Securing your slot…
                          </>
                        ) : (
                          <>
                            Request consultation
                            <Send className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                      <p className="mt-4 text-center text-xs font-medium leading-5 text-slate-500">
                        By submitting, you agree to be contacted about your enquiry. We never share your details.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
