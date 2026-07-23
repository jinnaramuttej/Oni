import { useState, type FormEvent } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button, Reveal, SectionHeading } from "./ui";
import { CONTACT, TREATMENTS } from "../lib/data";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-slate-400 shadow-[0_1px_2px_rgb(30_58_95/0.04)] transition-all duration-300 focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-500/15";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";

const reassurances = [
  { icon: Zap, text: "Confirmation within 15 minutes during opening hours" },
  { icon: ShieldCheck, text: "No payment details taken — pay only at your visit" },
  { icon: Sparkles, text: "New patients: exam + X-ray + consultation for $89" },
];

export function Booking() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-aqua-100/80 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Book an appointment"
          title="Your healthiest smile is 60 seconds away"
          lede="Request a time that suits you — no phone tag, no payment upfront. We'll confirm by text or call, whichever you prefer."
        />

        <Reveal delay={140} className="mt-14">
          <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] shadow-soft ring-1 ring-slate-900/5 lg:grid-cols-[2fr_3fr]">
            {/* Side panel */}
            <aside className="relative flex flex-col bg-navy-800 p-8 text-white lg:p-10">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.06]">
                <defs>
                  <pattern id="booking-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.6" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#booking-dots)" />
              </svg>

              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-aqua-300 ring-1 ring-teal-400/25">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  New patient offer
                </p>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight lg:text-[1.7rem]">
                  First visit: exam, digital X-ray &amp; personal plan —{" "}
                  <span className="text-aqua-300">$89</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-100/70">
                  Leave with a clear picture of your oral health and an honest,
                  itemized roadmap — whether or not you choose us for treatment.
                </p>

                <ul className="mt-7 space-y-4">
                  {reassurances.map((r) => (
                    <li key={r.text} className="flex items-start gap-3 text-sm text-navy-100/85">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                        <r.icon className="h-3.5 w-3.5 text-aqua-300" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      {r.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-100/50">
                    Prefer to talk?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href={CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {CONTACT.phone}
                    </a>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      Text us
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="bg-white p-8 lg:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-50 ring-8 ring-teal-50/50">
                    <CheckCircle2 className="h-8 w-8 text-teal-500" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-navy-800">
                    Request received
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
                    Thank you — our care team will confirm your appointment within
                    15 minutes during opening hours. If it&apos;s urgent, call us
                    at <span className="font-semibold text-navy-800">{CONTACT.phone}</span>.
                  </p>
                  <Button variant="secondary" className="mt-7" onClick={() => setSent(false)}>
                    Book another appointment
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Appointment request form">
                  <div>
                    <label htmlFor="bk-name" className={labelClass}>
                      Full name
                    </label>
                    <input id="bk-name" name="name" type="text" required autoComplete="name" placeholder="Jordan Ellis" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className={labelClass}>
                      Phone
                    </label>
                    <input id="bk-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(310) 555-0100" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-email" className={labelClass}>
                      Email <span className="font-normal normal-case text-slate-400">(optional)</span>
                    </label>
                    <input id="bk-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-treatment" className={labelClass}>
                      Treatment
                    </label>
                    <select id="bk-treatment" name="treatment" className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Choose a treatment…
                      </option>
                      <option>New patient exam &amp; consultation ($89)</option>
                      {TREATMENTS.map((t) => (
                        <option key={t.name}>{t.name}</option>
                      ))}
                      <option>Not sure — help me decide</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bk-date" className={labelClass}>
                      Preferred date
                    </label>
                    <input id="bk-date" name="date" type="date" min={today} required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="bk-time" className={labelClass}>
                      Preferred time
                    </label>
                    <select id="bk-time" name="time" className={inputClass} defaultValue="Morning (8–12)">
                      <option>Morning (8–12)</option>
                      <option>Midday (12–15)</option>
                      <option>Afternoon (15–19)</option>
                      <option>First available</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-notes" className={labelClass}>
                      Anything we should know? <span className="font-normal normal-case text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      id="bk-notes"
                      name="notes"
                      rows={3}
                      placeholder="Anxiety, sensitivity, insurance questions, previous work…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full">
                      <CalendarCheck className="h-4.5 w-4.5 transition-transform duration-300 group-hover/btn:rotate-6" aria-hidden="true" />
                      Request Appointment
                    </Button>
                    <p className="mt-3.5 text-center text-xs leading-relaxed text-slate-400">
                      By requesting, you agree to be contacted about scheduling.
                      We never share your details — HIPAA-compliant, always.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
