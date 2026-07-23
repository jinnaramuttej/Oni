import { useState, type FormEvent } from "react";
import { CalendarDays, Clock, Users } from "lucide-react";
import { IMG } from "../data/images";
import { Reveal } from "../hooks/useReveal";

const inputCls =
  "w-full border-b border-ivory/15 bg-transparent py-3.5 text-sm font-light text-ivory placeholder:text-ivory-faint focus:border-gold focus:outline-none transition-colors duration-500 [color-scheme:dark]";

export default function Reservation() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="reserve" className="relative overflow-hidden py-28 lg:py-40">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMG.tableForTwo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-8">Reservations</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
              Twelve tables.
              <br />
              One <em className="italic text-gold-soft">sitting</em>.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-md text-[0.9375rem] font-light leading-8 text-ivory-dim">
              The book opens on the first of each month at noon, sixty days in
              advance. For parties beyond six, or the chef's counter, write to
              us directly.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 space-y-3 text-sm font-light text-ivory-dim">
              <p>
                <span className="text-gold">Dinner</span> — Tuesday to Saturday,
                from 19:00
              </p>
              <p>
                <span className="text-gold">Dress</span> — Elegant. Jackets
                appreciated, never required.
              </p>
              <p>
                <span className="text-gold">Enquiries</span> —{" "}
                <a
                  href="mailto:table@maisonlumiere.fr"
                  className="gold-link text-ivory"
                >
                  table@maisonlumiere.fr
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal delay={200} className="lg:col-span-6 lg:col-start-7">
          <div className="lux-card p-8 md:p-12">
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="font-serif text-5xl text-gold">✦</span>
                <h3 className="mt-6 font-serif text-3xl text-ivory">
                  Request received
                </h3>
                <p className="mt-4 max-w-sm text-sm font-light leading-7 text-ivory-dim">
                  Our maître d' will confirm your table within the day. We look
                  forward to receiving you at Maison Lumière.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[0.625rem] uppercase tracking-[0.3em] text-ivory-faint">
                      Name
                    </span>
                    <input required placeholder="Full name" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[0.625rem] uppercase tracking-[0.3em] text-ivory-faint">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-ivory-faint">
                      <CalendarDays size={13} strokeWidth={1.25} /> Date
                    </span>
                    <input required type="date" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-ivory-faint">
                      <Clock size={13} strokeWidth={1.25} /> Time
                    </span>
                    <select className={inputCls} defaultValue="19:30">
                      {["19:00", "19:30", "20:00", "20:30", "21:00"].map((t) => (
                        <option key={t} value={t} className="bg-charcoal">
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-ivory-faint">
                      <Users size={13} strokeWidth={1.25} /> Guests
                    </span>
                    <select className={inputCls} defaultValue="2">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} className="bg-charcoal">
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-[0.625rem] uppercase tracking-[0.3em] text-ivory-faint">
                    Occasion or notes{" "}
                    <span className="normal-case tracking-normal">(optional)</span>
                  </span>
                  <textarea
                    rows={3}
                    placeholder="Allergies, celebrations, the chef's counter…"
                    className={`${inputCls} resize-none`}
                  />
                </label>
                <button type="submit" className="btn-gold w-full justify-center sm:w-auto">
                  Request a Table
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
