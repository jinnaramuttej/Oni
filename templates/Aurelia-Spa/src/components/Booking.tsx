import { useState } from "react";
import { Reveal } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { Check, Clock, Phone } from "lucide-react";

const treatmentOptions = [
  "The Golden Ritual",
  "Hinoki Forest Bathing",
  "Champagne & Silk Renewal",
  "Massage Therapy",
  "Facial Treatment",
  "Body Therapy",
  "Aromatherapy",
  "Wellness Ritual",
  "Spa Package",
  "Membership Enquiry",
];

const inputBase =
  "w-full rounded-2xl border border-stone bg-cream/50 px-4 py-3.5 text-sm text-charcoal placeholder-charcoal/40 transition-all duration-300 focus:border-gold focus:bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/20";
const labelBase =
  "block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-charcoal/55";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="booking" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid overflow-hidden rounded-card shadow-card lg:grid-cols-2">
          {/* Image / concierge side */}
          <div className="relative min-h-[340px] lg:min-h-full">
            <img
              src="/images/wellness-pool.jpg"
              alt="Serene candlelit spa pool"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30" />
            <div className="relative flex h-full flex-col justify-end p-10 lg:p-14">
              <SectionLabel tone="light">Reserve Your Visit</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ivory lg:text-5xl">
                Begin the journey
              </h2>
              <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-ivory/75">
                Share a few details and our concierge will confirm your suite,
                therapist, and arrival within twenty-four hours.
              </p>
              <div className="mt-10 space-y-4 text-sm text-ivory/80">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  Open daily · 8:00 – 21:00
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  +33 4 93 00 0000
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="bg-ivory p-10 lg:p-14">
            {submitted ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-pill bg-sage/20">
                  <Check className="h-8 w-8 text-sage" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-serif text-3xl font-light text-charcoal">
                  Request received
                </h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-charcoal/60">
                  Thank you. Our concierge will be in touch within twenty-four hours
                  to confirm every detail of your visit.
                </p>
                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => setSubmitted(false)}
                >
                  Make another request
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <h3 className="font-serif text-2xl font-light text-charcoal">
                  Booking request
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelBase} htmlFor="name">Full name</label>
                    <input id="name" name="name" required className={`${inputBase} mt-2`} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={labelBase} htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className={`${inputBase} mt-2`} placeholder="you@email.com" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelBase} htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" className={`${inputBase} mt-2`} placeholder="+33 …" />
                  </div>
                  <div>
                    <label className={labelBase} htmlFor="treatment">Treatment</label>
                    <select id="treatment" name="treatment" className={`${inputBase} mt-2`} defaultValue={treatmentOptions[0]}>
                      {treatmentOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelBase} htmlFor="date">Preferred date</label>
                    <input id="date" name="date" type="date" className={`${inputBase} mt-2`} />
                  </div>
                  <div>
                    <label className={labelBase} htmlFor="time">Preferred time</label>
                    <input id="time" name="time" type="time" className={`${inputBase} mt-2`} />
                  </div>
                </div>

                <div>
                  <label className={labelBase} htmlFor="notes">Notes</label>
                  <textarea id="notes" name="notes" rows={3} className={`${inputBase} mt-2 resize-none`} placeholder="Any preferences, allergies, or requests…" />
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Request Booking
                </Button>
                <p className="text-center text-xs font-light text-charcoal/45">
                  No payment required to request — we confirm availability first.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
