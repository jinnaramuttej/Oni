import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import {
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconClock,
  IconLock,
  IconSparkles,
  IconUsers,
} from "./icons";

const services = [
  "Tax planning",
  "Audit & assurance",
  "GST & indirect tax",
  "Payroll",
  "Fractional CFO",
  "Global expansion",
];

export default function Consultation() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<string | null>("Tax planning");
  const [step, setStep] = useState<"form" | "done">("form");

  return (
    <section
      id="book-call"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={[
            "reveal overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-paper to-white",
            visible ? "is-visible" : "",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left - intro */}
            <div className="relative bg-navy-700 p-8 text-white sm:p-12 lg:col-span-5 lg:p-14">
              <div className="absolute inset-0 bg-grid-light opacity-50" />
              <div className="absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full bg-emerald-600/20 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80">
                  <IconSparkles className="h-3 w-3 text-gold-300" />
                  Book a consultation
                </div>
                <h2 className="mt-5 font-display text-[36px] sm:text-[42px] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                  A 30-minute conversation,{" "}
                  <span className="italic font-medium text-emerald-300">on the house.</span>
                </h2>
                <p className="mt-5 text-[15px] leading-[1.7] text-white/70">
                  Walk us through your business and current finance function.
                  We'll come prepared with a point of view and a few questions
                  — no sales pitch, no obligation.
                </p>

                <ul className="mt-8 space-y-3.5">
                  {[
                    { icon: IconCalendar, t: "Pick a slot that works for you" },
                    { icon: IconUsers, t: "Meet a partner, not a sales rep" },
                    { icon: IconCheck, t: "Get a 90-day action plan" },
                  ].map((it) => {
                    const I = it.icon;
                    return (
                      <li
                        key={it.t}
                        className="flex items-center gap-3 text-[14px] text-white/85"
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-emerald-300 ring-1 ring-white/10">
                          <I className="h-4 w-4" />
                        </span>
                        {it.t}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
                        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                      ].map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-9 w-9 rounded-full border-2 border-navy-700 object-cover"
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">
                        Senior partners on call
                      </div>
                      <div className="text-[11.5px] text-white/60">
                        Avg. response time · 4 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - form */}
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-14">
              {step === "form" ? (
                <>
                  <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <span className="text-navy-700">01</span>
                    <span className="h-px w-8 bg-slate-300" />
                    <span>Your details</span>
                    <span className="h-px w-8 bg-slate-200" />
                    <span>Schedule</span>
                    <span className="h-px w-8 bg-slate-200" />
                    <span>Done</span>
                  </div>

                  <h3 className="mt-6 font-display text-[26px] font-semibold tracking-[-0.015em] text-navy-700">
                    Tell us a little about your business
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep("done");
                    }}
                    className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
                  >
                    <Field label="Full name" placeholder="Ananya Sharma" required />
                    <Field
                      label="Work email"
                      type="email"
                      placeholder="ananya@brightline.com"
                      required
                    />
                    <Field label="Company" placeholder="Brightline D2C" />
                    <Field label="Annual revenue" placeholder="e.g. ₹ 8 Cr">
                      <select className="w-full appearance-none rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-[14.5px] text-navy-700 outline-none transition focus:border-navy-700">
                        <option>Pre-revenue</option>
                        <option>Under ₹ 1 Cr</option>
                        <option>₹ 1 — 10 Cr</option>
                        <option>₹ 10 — 50 Cr</option>
                        <option>₹ 50 Cr+</option>
                      </select>
                    </Field>

                    <div className="sm:col-span-2">
                      <label className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                        What can we help with?
                      </label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {services.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelected(s)}
                            className={[
                              "rounded-full border px-4 py-2 text-[13px] font-medium transition",
                              selected === s
                                ? "border-navy-700 bg-navy-700 text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:border-navy-700/40 hover:text-navy-700",
                            ].join(" ")}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                        Anything specific you'd like to discuss?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Optional — share context, timelines or a specific problem."
                        className="mt-2 w-full resize-none rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-[14.5px] text-navy-700 outline-none transition focus:border-navy-700"
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex items-center gap-1.5 text-[12px] text-slate-500">
                        <IconLock className="h-3.5 w-3.5" />
                        Your data is encrypted. We never share.
                      </div>
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2 rounded-[16px] bg-emerald-600 px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(21,128,61,0.5)] transition hover:bg-emerald-700"
                      >
                        Request consultation
                        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <IconCheck className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-6 font-display text-[28px] font-semibold tracking-[-0.015em] text-navy-700">
                    Thank you — we'll be in touch shortly.
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-slate-500">
                    A senior partner will review your details and reach out
                    within 4 working hours to find a time that works for you.
                  </p>
                  <div className="mt-7 flex items-center gap-2 text-[13px] text-slate-500">
                    <IconClock className="h-4 w-4" />
                    Avg. response time · 4 hours
                  </div>
                  <button
                    onClick={() => setStep("form")}
                    className="mt-8 text-[13.5px] font-semibold text-navy-700 underline-offset-4 hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
  children,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
        {label} {required && <span className="text-emerald-600">*</span>}
      </label>
      {children ?? (
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          className="mt-2 w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-[14.5px] text-navy-700 outline-none transition placeholder:text-slate-400 focus:border-navy-700"
        />
      )}
    </div>
  );
}
