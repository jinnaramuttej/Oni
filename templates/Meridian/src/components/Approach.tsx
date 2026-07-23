import { useReveal } from "../hooks/useReveal";
import {
  IconArrowRight,
  IconShield,
  IconTarget,
  IconHandshake,
  IconActivity,
  IconCheck,
} from "./icons";

const steps = [
  {
    n: "01",
    title: "Discovery & scoping",
    desc: "A 30-minute call to understand your business, stage, current pain and what good looks like in 90 days.",
  },
  {
    n: "02",
    title: "Partner-led proposal",
    desc: "Within 48 hours, a partner drafts a transparent scope, fixed monthly retainer and a 90-day delivery plan.",
  },
  {
    n: "03",
    title: "Onboard & integrate",
    desc: "We plug into your stack — Xero, QuickBooks, Zoho, Tally or even spreadsheets — and own the close from day one.",
  },
  {
    n: "04",
    title: "Quarterly review",
    desc: "Every quarter, your partner walks you through numbers, risks and opportunities on a live working session.",
  },
];

const principles = [
  {
    icon: IconShield,
    title: "Partner-led, always",
    body: "Every engagement is owned by a chartered accountant with 12+ years of practice. No juniors in the room, no hand-me-downs.",
  },
  {
    icon: IconTarget,
    title: "Proactive, not reactive",
    body: "We surface tax-saving opportunities and risks before they become invoices or notices. Your year-end is planned in April.",
  },
  {
    icon: IconHandshake,
    title: "Transparent pricing",
    body: "Fixed monthly retainers, scoped clearly. You always know what you pay for and what you get — no surprise hourly bills.",
  },
  {
    icon: IconActivity,
    title: "Data-driven advice",
    body: "Real-time dashboards, monthly benchmarking and AI-assisted analysis. We make decisions with you, on the numbers.",
  },
];

export default function Approach() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  return (
    <section id="approach" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            ref={r1.ref}
            className={["lg:col-span-5 reveal", r1.visible ? "is-visible" : ""].join(" ")}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              How we work
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              A modern firm, built around{" "}
              <span className="italic font-medium text-emerald-700">your numbers.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-slate-500">
              We've re-engineered the traditional CA firm — replacing binders
              and billable hours with pods, dashboards and proactive advice.
              Here's what that looks like in practice.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#book-call"
                className="group inline-flex items-center gap-2 rounded-[16px] bg-navy-700 px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-navy-800"
              >
                Start a conversation
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#team"
                className="inline-flex items-center gap-2 rounded-[16px] border border-slate-200 bg-white px-5 py-3 text-[14px] font-semibold text-navy-700 transition hover:border-navy-700"
              >
                Meet the partners
              </a>
            </div>
          </div>

          <div
            ref={r2.ref}
            className={["lg:col-span-7 reveal", r2.visible ? "is-visible" : ""].join(" ")}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={[
                      "group relative rounded-[20px] border border-slate-200/80 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.14)] reveal",
                      r2.visible ? "is-visible" : "",
                    ].join(" ")}
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-[16.5px] font-semibold text-navy-700">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.65] text-slate-500">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="mt-20 rounded-[28px] border border-slate-200/80 bg-white p-7 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                The Meridian way
              </p>
              <h3 className="mt-2 font-display text-[28px] md:text-[34px] font-semibold tracking-[-0.02em] text-navy-700">
                From first call to first close — in 10 working days.
              </h3>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-slate-500">
              A four-step process, refined across 1,200+ client engagements.
              Predictable, partner-led, paperless.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="group relative bg-white p-7 transition-colors hover:bg-paper"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-[14px] font-semibold text-slate-300">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-slate-200 transition-colors group-hover:bg-emerald-300" />
                  <IconCheck className="h-4 w-4 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h4 className="mt-6 text-[16.5px] font-semibold text-navy-700">
                  {s.title}
                </h4>
                <p className="mt-1.5 text-[13.5px] leading-[1.65] text-slate-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
