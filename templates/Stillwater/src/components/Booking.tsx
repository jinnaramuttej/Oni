import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  CheckCircle2,
  ChevronDown,
  Leaf,
} from "lucide-react";
import { CLASSES, PRACTICES, RETREATS } from "../data";
import { Reveal, Eyebrow } from "./Reveal";

const inputCls =
  "w-full rounded-[16px] border border-pebble/70 bg-ivory px-5 py-4 text-[14.5px] font-light text-ink placeholder:text-charcoal/40 transition-all duration-500 focus:border-eucalyptus focus:shadow-[0_0_0_4px_rgb(127_145_114/0.12)] focus:outline-none";

const labelCls = "mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal/60";

export default function Booking() {
  const [sent, setSent] = useState(false);
  const [level, setLevel] = useState("New to practice");

  return (
    <section id="booking" className="relative overflow-hidden bg-ivory py-28 lg:py-36">
      <div className="pointer-events-none absolute -left-32 top-24 h-[340px] w-[340px] rounded-full bg-sand/90 blur-2xl animate-drift" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-[32px] shadow-lift">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ——— The invitation ——— */}
            <div className="grain relative bg-deep p-9 text-ivory sm:p-14">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-moss/20 blur-2xl animate-drift-slow" />
              <Reveal>
                <Eyebrow index="11" tone="dark">Begin here</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] sm:text-[2.9rem]">
                  Your first class is <em className="font-normal italic text-sage">on us.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-[14.5px] font-light leading-[1.95] text-ivory/70">
                  Tell us a little about yourself and choose a time that suits.
                  We'll set aside a mat by the window, a cup of tea afterwards,
                  and absolutely no judgment about your hamstrings.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <ul className="mt-12 space-y-7 text-[14px]">
                  {[
                    {
                      icon: MapPin,
                      title: "14 Alder Lane, Sellwood",
                      sub: "Portland, Oregon 97202 — beside the river path",
                    },
                    {
                      icon: Clock3,
                      title: "Open daily",
                      sub: "Mon–Fri 6:15 am – 9:30 pm · Weekends 8 am – 8 pm",
                    },
                    { icon: Phone, title: "(503) 555-0164", sub: "Weekdays from 8 am — Maya usually answers" },
                    { icon: Mail, title: "hello@stillwater.studio", sub: "We reply within a day, always kindly" },
                  ].map(({ icon: Icon, title, sub }) => (
                    <li key={title} className="flex gap-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/15 bg-ivory/5 text-sage">
                        <Icon size={16} strokeWidth={1.5} />
                      </span>
                      <div>
                        <p className="font-medium tracking-wide text-ivory">{title}</p>
                        <p className="mt-1 font-light leading-[1.7] text-ivory/55">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* ——— The form ——— */}
            <div className="bg-sand/60 p-9 sm:p-14">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mist text-eucalyptus-deep">
                    <CheckCircle2 size={34} strokeWidth={1.25} />
                  </span>
                  <h3 className="mt-8 font-serif text-3xl font-normal text-ink">Your mat is waiting</h3>
                  <p className="mt-4 max-w-sm text-[14.5px] font-light leading-[1.95] text-charcoal/75">
                    We've noted your request and will confirm by email within a
                    few hours. Arrive ten minutes early — the kettle is on by
                    then.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="link-quiet mt-8 text-[12px] font-medium uppercase tracking-[0.2em] text-eucalyptus-deep"
                  >
                    Book another visit
                  </button>
                </motion.div>
              ) : (
                <Reveal delay={0.1}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <div>
                      <label htmlFor="bk-name" className={labelCls}>First name</label>
                      <input id="bk-name" required placeholder="Ada" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="bk-last" className={labelCls}>Last name</label>
                      <input id="bk-last" required placeholder="Lindgren" className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-email" className={labelCls}>Email</label>
                      <input id="bk-email" type="email" required placeholder="you@example.com" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="bk-class" className={labelCls}>Choose your practice</label>
                      <div className="relative">
                        <select id="bk-class" required defaultValue="" className={`${inputCls} appearance-none pr-12`}>
                          <option value="" disabled>Select…</option>
                          <optgroup label="Yoga classes">
                            {CLASSES.map((c) => (
                              <option key={c.name}>{c.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Meditation & breathwork">
                            {PRACTICES.map((p) => (
                              <option key={p.title}>{p.title}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Retreats">
                            {RETREATS.map((r) => (
                              <option key={r.name}>{r.name} retreat</option>
                            ))}
                          </optgroup>
                        </select>
                        <ChevronDown size={15} strokeWidth={1.5} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-charcoal/50" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="bk-date" className={labelCls}>Preferred date</label>
                      <input id="bk-date" type="date" required className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <span className={labelCls}>Your experience</span>
                      <div className="flex flex-wrap gap-2">
                        {["New to practice", "Some experience", "Seasoned"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setLevel(opt)}
                            aria-pressed={level === opt}
                            className={`rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-500 ${
                              level === opt
                                ? "bg-eucalyptus text-ivory shadow-[0_10px_22px_-10px_rgb(127_145_114/0.6)]"
                                : "border border-pebble/70 bg-ivory text-charcoal/65 hover:border-eucalyptus/50"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-note" className={labelCls}>
                        Anything we should know? <span className="normal-case tracking-normal text-charcoal/40">(injuries, hopes, hesitations)</span>
                      </label>
                      <textarea id="bk-note" rows={3} placeholder="Take your time — we will." className={`${inputCls} resize-none`} />
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-3 rounded-[20px] bg-eucalyptus px-8 py-5 text-[13px] font-medium uppercase tracking-[0.2em] text-ivory shadow-[0_18px_36px_-14px_rgb(127_145_114/0.65)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-eucalyptus-deep"
                      >
                        <Leaf size={15} strokeWidth={1.5} />
                        Reserve my free first class
                      </button>
                      <p className="mt-4 text-center text-[11.5px] font-light leading-[1.8] text-charcoal/50">
                        No card required · Cancel or move anytime · We never share your details
                      </p>
                    </div>
                  </form>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
