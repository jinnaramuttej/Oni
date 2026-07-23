import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  Coffee,
  Phone,
  Plus,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";
import { BARBERS, CONTACT, FAQS, IMG, PACKAGES, SERVICES, TESTIMONIALS } from "../data";
import { CONTAINER, EASE, Grain, Kicker, Reveal, Section, SectionHead, Btn } from "./ui";

/* ---------------------------- TESTIMONIALS ---------------------------- */
function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const cur = TESTIMONIALS[i];

  return (
    <Section id="reviews" className="relative overflow-hidden bg-coal py-24 md:py-36">
      <Grain opacity={0.04} />
      <div
        className={`${CONTAINER} relative z-[2] flex flex-col items-center text-center`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex w-full items-center justify-between">
          <Kicker index="09" label="Word of Mouth" />
          <span className="font-editorial text-lg italic text-brass">
            0{i + 1} <span className="text-bone/30">/ 0{TESTIMONIALS.length}</span>
          </span>
        </div>

        <Reveal className="mt-14 w-full max-w-4xl">
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} size={14} className="fill-brass text-brass" strokeWidth={1} />
            ))}
          </div>

          <div className="relative mt-10 min-h-[240px] sm:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <blockquote className="font-editorial text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium italic leading-[1.35] text-bone/90">
                  "{cur.quote}"
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-display text-[15px] font-semibold uppercase tracking-[0.2em] text-bone">
                    {cur.name}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
                    {cur.meta}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* controls */}
        <div className="mt-12 flex items-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-300 hover:border-brass/60 hover:text-brass"
          >
            <ArrowLeft size={16} strokeWidth={1.6} />
          </button>
          <div className="flex items-center gap-2.5 px-2">
            {TESTIMONIALS.map((_, d) => (
              <button
                key={d}
                aria-label={`Go to testimonial ${d + 1}`}
                onClick={() => setI(d)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  d === i ? "w-8 bg-brass" : "w-3 bg-bone/20 hover:bg-bone/40"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => setI((i + 1) % TESTIMONIALS.length)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-300 hover:border-brass/60 hover:text-brass"
          >
            <ArrowRight size={16} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------- BOOKING ------------------------------- */
const FIELD =
  "dark-scheme w-full rounded-[14px] border border-bone/[0.12] bg-ink/60 px-4 py-3.5 text-[14px] text-bone outline-none transition-colors duration-300 placeholder:text-bone/25 focus:border-brass/60";
const LABEL = "mb-2.5 block text-[10.5px] font-semibold uppercase tracking-[0.26em] text-steel";

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => `${s.name} — $${s.price}`),
  ...PACKAGES.map((p) => `${p.name} (Package) — $${p.price}`),
];
const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"];

type FormState = { name: string; phone: string; service: string; barber: string; date: string; time: string };
const EMPTY: FormState = { name: "", phone: "", service: SERVICE_OPTIONS[0], barber: "First available", date: "", time: TIMES[2] };

function Booking() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [done, setDone] = useState(false);
  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <Section id="booking" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="bg-hairline pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className={`${CONTAINER} relative z-[2]`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Kicker index="10" label="Reserve Your Chair" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight text-bone sm:text-5xl lg:text-[3.4rem]">
                Book the chair.
                <span className="block font-editorial font-medium lowercase italic tracking-normal text-brass">
                  Own the hour.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-bone/55">
                Sixty seconds to reserve. No payment now — we confirm by text within the
                hour and hold your barber, your slot, and your pour.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {[
                { icon: CalendarCheck2, t: "Guaranteed slot, guaranteed barber", n: "Walk-ins gamble. Booking is the only sure thing." },
                { icon: Coffee, t: "The lounge standard, included", n: "Espresso or a quiet pour while you wait — though you rarely wait." },
                { icon: BellRing, t: "Text reminders that respect you", n: "One confirmation, one reminder. That's the whole conversation." },
              ].map((r, idx) => (
                <Reveal key={r.t} delay={0.15 + idx * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-[12px] border border-bone/10 bg-graphite/50">
                      <r.icon size={16} strokeWidth={1.5} className="text-brass" />
                    </span>
                    <div>
                      <p className="font-display text-[14px] font-medium uppercase tracking-[0.12em] text-bone">
                        {r.t}
                      </p>
                      <p className="mt-1 text-[12.5px] text-bone/45">{r.n}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <a
                href={`tel:${CONTACT.phone}`}
                className="mt-10 flex items-center justify-between rounded-[18px] border border-brass/25 bg-gradient-to-r from-leather/15 to-transparent p-6 transition-colors duration-500 hover:border-brass/50"
              >
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-brass">
                    Prefer a voice?
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-wide text-bone">
                    {CONTACT.phone}
                  </p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 text-brass">
                  <Phone size={18} strokeWidth={1.5} />
                </span>
              </a>
            </Reveal>
          </div>

          {/* form card */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[20px] border border-bone/[0.09] bg-coal/85 backdrop-blur">
                <img
                  src={IMG.bookingSide}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-12 rounded-[18px] object-cover opacity-[0.08] img-duotone"
                />
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="relative z-[1] flex min-h-[480px] flex-col items-center justify-center p-10 text-center"
                    >
                      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-brass/30 bg-brass/[0.08]">
                        <CheckCircle2 size={34} strokeWidth={1.4} className="text-brass" />
                      </span>
                      <h3 className="mt-8 font-display text-3xl font-semibold uppercase tracking-wide text-bone">
                        Consider it held
                        <span className="text-brass">.</span>
                      </h3>
                      <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-bone/55">
                        {form.name.split(" ")[0] || "Friend"}, your chair is penciled in for{" "}
                        <span className="text-brass">{form.time}</span>
                        {form.date && (
                          <>
                            {" "}on <span className="text-brass">{new Date(form.date + "T00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                          </>
                        )}{" "}
                        — {form.service.split(" — ")[0]} with{" "}
                        <span className="text-brass">{form.barber}</span>. Confirmation
                        text lands within the hour.
                      </p>
                      <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <Btn
                          variant="ghost"
                          onClick={() => {
                            setDone(false);
                            setForm(EMPTY);
                          }}
                        >
                          Book another
                        </Btn>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="relative z-[1] p-7 sm:p-10"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setDone(true);
                      }}
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="bk-name" className={LABEL}>Full name *</label>
                          <input id="bk-name" required value={form.name} onChange={set("name")} placeholder="Jack Donovan" className={FIELD} />
                        </div>
                        <div>
                          <label htmlFor="bk-phone" className={LABEL}>Phone *</label>
                          <input id="bk-phone" required type="tel" value={form.phone} onChange={set("phone")} placeholder="(312) 000-0000" className={FIELD} />
                        </div>
                        <div>
                          <label htmlFor="bk-service" className={LABEL}>Service</label>
                          <select id="bk-service" value={form.service} onChange={set("service")} className={FIELD}>
                            {SERVICE_OPTIONS.map((o) => (
                              <option key={o} value={o} className="bg-coal">{o}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="bk-barber" className={LABEL}>Barber</label>
                          <select id="bk-barber" value={form.barber} onChange={set("barber")} className={FIELD}>
                            <option className="bg-coal">First available</option>
                            {BARBERS.map((b) => (
                              <option key={b.name} value={b.name} className="bg-coal">{b.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="bk-date" className={LABEL}>Preferred date *</label>
                          <input id="bk-date" required type="date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} className={FIELD} />
                        </div>
                        <div>
                          <label htmlFor="bk-time" className={LABEL}>Preferred time</label>
                          <select id="bk-time" value={form.time} onChange={set("time")} className={FIELD}>
                            {TIMES.map((t) => (
                              <option key={t} className="bg-coal">{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-9">
                        <Btn className="w-full py-4.5">Hold My Chair</Btn>
                        <p className="mt-5 text-center text-[11.5px] uppercase tracking-[0.22em] text-steel">
                          No payment now · Free rescheduling · Confirmation by text
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------- FAQ --------------------------------- */
function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }): ReactNode {
  return (
    <div className="border-b border-bone/[0.08]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className={`font-display text-lg font-medium uppercase tracking-[0.08em] transition-colors duration-300 sm:text-xl ${open ? "text-brass" : "text-bone group-hover:text-brass"}`}>
          {q}
        </span>
        <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-all duration-500 ${open ? "rotate-45 border-brass bg-brass/10 text-brass" : "border-bone/15 text-bone/60 group-hover:border-brass/50 group-hover:text-brass"}`}>
          <Plus size={17} strokeWidth={1.6} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 text-[14px] leading-relaxed text-bone/50">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" className="relative bg-coal py-24 md:py-36">
      <div className={CONTAINER}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                index="11"
                kicker="Good to Know"
                title={
                  <>
                    Straight answers,
                    <span className="block">
                      straight
                      <span className="font-editorial font-medium lowercase italic tracking-normal text-brass">
                        {" "}
                        razor.
                      </span>
                    </span>
                  </>
                }
                sub="The questions men actually ask at the counter — answered the way we'd answer them there."
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border-t border-bone/[0.08]">
                {FAQS.map((f, i) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Convert() {
  return (
    <>
      <Testimonials />
      <Booking />
      <Faq />
    </>
  );
}
