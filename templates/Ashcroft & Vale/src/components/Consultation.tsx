import { useState } from "react";
import { faqs, practiceAreas } from "../data";
import { Button, Eyebrow, Icons } from "./ui";
import { cn } from "../utils/cn";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="reveal border-b border-ink/10" data-delay={index * 60}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-xl text-ink">{q}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-bronze transition-transform duration-300",
            open && "rotate-45 border-gold bg-gold text-white"
          )}
        >
          <span className="h-4 w-4">
            <Icons.plus />
          </span>
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500",
          open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <p className="overflow-hidden leading-relaxed text-slate-warm">{a}</p>
      </div>
    </div>
  );
}

export function Consultation() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Booking */}
      <section id="consultation" className="bg-navy py-24 text-ivory lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Left copy */}
            <div>
              <Eyebrow dark>Consultation</Eyebrow>
              <h2 className="reveal mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ivory text-balance sm:text-5xl" data-delay="60">
                Begin with a confidential conversation.
              </h2>
              <p className="reveal mt-6 text-lg leading-relaxed text-ivory/70" data-delay="120">
                Share a few details and a senior attorney will respond within one
                business day to arrange your private consultation — in person or
                virtually, entirely at your convenience.
              </p>

              <ul className="mt-9 space-y-4">
                {[
                  "Direct access to a partner-level attorney",
                  "Strictly confidential, no obligation",
                  "Clear assessment of your options and next steps",
                ].map((item) => (
                  <li key={item} className="reveal flex items-center gap-3 text-ivory/85">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <span className="h-3.5 w-3.5">
                        <Icons.check />
                      </span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="reveal mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                <a href="tel:+12125550140" className="group flex items-center gap-3">
                  <span className="h-6 w-6 text-gold"><Icons.phone /></span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ivory/50">Call directly</span>
                    <span className="font-serif text-lg text-ivory group-hover:text-gold-soft">+1 (212) 555-0140</span>
                  </span>
                </a>
                <a href="mailto:counsel@ashcroftvale.com" className="group flex items-center gap-3">
                  <span className="h-6 w-6 text-gold"><Icons.mail /></span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ivory/50">Email us</span>
                    <span className="font-serif text-lg text-ivory group-hover:text-gold-soft">counsel@ashcroftvale.com</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="reveal rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10" data-delay="120">
              {submitted ? (
                <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <span className="h-8 w-8"><Icons.check /></span>
                  </span>
                  <h3 className="mt-6 font-serif text-3xl text-ivory">Thank you.</h3>
                  <p className="mt-3 max-w-sm text-ivory/70">
                    Your request has been received. A senior attorney will contact you
                    within one business day.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" id="name" placeholder="Jane Doe" />
                    <Field label="Email" id="email" type="email" placeholder="jane@email.com" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" id="phone" type="tel" placeholder="+1 (___) ___-____" />
                    <div>
                      <label htmlFor="area" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ivory/60">
                        Practice Area
                      </label>
                      <select
                        id="area"
                        className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-ink/40 px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
                        defaultValue=""
                      >
                        <option value="" disabled className="text-ink">Select an area</option>
                        {practiceAreas.map((p) => (
                          <option key={p.title} className="text-ink">{p.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ivory/60">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Briefly describe your matter…"
                      className="w-full resize-none rounded-[var(--radius-btn)] border border-white/15 bg-ink/40 px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full" icon={<Icons.arrowRight />}>
                    Request My Consultation
                  </Button>
                  <p className="text-center text-xs text-ivory/45">
                    Your information is protected and treated in strict confidence.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory paper-texture py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="reveal text-center">
            <Eyebrow className="justify-center">Frequently Asked</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Questions, answered.
            </h2>
          </div>
          <div className="mt-12">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ivory/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-ink/40 px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
