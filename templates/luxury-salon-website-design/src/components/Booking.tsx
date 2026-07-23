import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  ConciergeBell,
  Leaf,
  Phone,
} from "lucide-react";
import Reveal from "./Reveal";
import { SERVICES, STYLISTS, TIME_SLOTS } from "../data";
import { cn } from "../utils/cn";

const promises = [
  {
    icon: ConciergeBell,
    title: "Concierge reply within 2 hours",
    text: "A real person confirms every request — never a bot.",
  },
  {
    icon: Leaf,
    title: "A consultation, always",
    text: "Every service begins with an unhurried conversation.",
  },
  {
    icon: Clock,
    title: "Your time is honored",
    text: "Appointments run on schedule. Cancellation is free up to 24h.",
  },
];

const inputCls =
  "peer w-full rounded-[16px] border border-charcoal/12 bg-ivory/70 px-5 py-4 text-[14.5px] font-light text-charcoal placeholder:text-taupe/60 outline-none transition-all duration-300 focus:border-rosegold focus:bg-ivory focus:shadow-[0_0_0_4px_rgba(199,156,138,0.15)]";

export default function Booking() {
  const [service, setService] = useState(SERVICES[0].id);
  const [stylist, setStylist] = useState("first-available");
  const [slot, setSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      if (id) setService(id);
    };
    window.addEventListener("prefill-service", handler);
    return () => window.removeEventListener("prefill-service", handler);
  }, []);

  const chosen = SERVICES.find((s) => s.id === service);

  return (
    <section id="booking" className="relative overflow-hidden bg-blush py-28 md:py-40">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-ivory/80 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-6 md:px-10 lg:grid-cols-12">
        {/* Left — invitation */}
        <div className="lg:col-span-5">
          <Reveal y={24}>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rosegold/70" />
              <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
                Reservations
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-charcoal md:text-5xl lg:text-[3.4rem]">
              Reserve your <span className="italic">moment</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed font-light text-taupe">
              Tell us what you're dreaming of. Our concierge will call to
              confirm your artist, timing, and a few beautiful details —
              including how you take your tea.
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={0.24 + i * 0.08} y={28}>
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rosegold/35 bg-ivory/70 text-metallic">
                    <p.icon size={17} strokeWidth={1.25} />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium text-charcoal">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-light text-taupe">
                      {p.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <a
              href="tel:+12125550184"
              className="group mt-10 inline-flex items-center gap-4 rounded-[20px] border hairline bg-ivory/60 px-6 py-4 transition-all duration-500 hover:border-rosegold/50 hover:bg-ivory"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-metallic">
                <Phone size={16} strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-[10px] tracking-[0.3em] text-taupe uppercase">
                  Prefer to call?
                </span>
                <span className="mt-0.5 block font-serif text-lg text-charcoal">
                  +1 212 555 0184
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Right — form card */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15} y={56}>
            <div className="relative overflow-hidden rounded-[28px] border hairline bg-ivory/80 p-7 shadow-lift backdrop-blur-xl md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[430px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-metallic/12 text-metallic"
                    >
                      <Check size={30} strokeWidth={1.5} />
                    </motion.span>
                    <h3 className="mt-7 font-serif text-4xl font-medium text-charcoal italic">
                      Request received
                    </h3>
                    <p className="mt-4 max-w-sm text-[14px] leading-relaxed font-light text-taupe">
                      {chosen?.name}
                      {slot ? ` · ${slot}` : ""} — our concierge will call
                      within two hours to confirm the details of your visit.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="link-lux mt-8 text-[12px] font-medium tracking-[0.26em] text-charcoal uppercase"
                    >
                      Make another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} strokeWidth={1.5} className="text-metallic" />
                      <h3 className="font-serif text-2xl font-medium text-charcoal">
                        Appointment request
                      </h3>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                          Full name
                        </span>
                        <input required placeholder="Charlotte Beaumont" className={inputCls} />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                          Phone
                        </span>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (212) 000-0000"
                          className={inputCls}
                        />
                      </label>
                      <div className="relative">
                        <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                          Service
                        </span>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className={cn(inputCls, "appearance-none pr-12")}
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} — from ${s.price}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className="pointer-events-none absolute right-5 bottom-[18px] text-taupe"
                        />
                      </div>
                      <div className="relative">
                        <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                          Artist
                        </span>
                        <select
                          value={stylist}
                          onChange={(e) => setStylist(e.target.value)}
                          className={cn(inputCls, "appearance-none pr-12")}
                        >
                          <option value="first-available">First available</option>
                          {STYLISTS.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.name} · {s.role}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className="pointer-events-none absolute right-5 bottom-[18px] text-taupe"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                        Preferred date
                      </span>
                      <input type="date" required className={inputCls} />
                    </div>

                    <div className="mt-6">
                      <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                        Preferred time
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSlot(t)}
                            className={cn(
                              "rounded-full border px-4.5 py-2.5 text-[12px] font-medium tracking-[0.08em] transition-all duration-300",
                              slot === t
                                ? "border-metallic bg-metallic text-ivory shadow-btn"
                                : "border-charcoal/15 bg-ivory/60 text-charcoal/70 hover:border-rosegold hover:text-charcoal"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <span className="mb-2 block text-[10.5px] font-medium tracking-[0.26em] text-taupe uppercase">
                        Notes for your artist <span className="text-taupe/60 normal-case">(optional)</span>
                      </span>
                      <textarea
                        rows={3}
                        placeholder="Inspiration links, sensitivities, the occasion…"
                        className={cn(inputCls, "resize-none")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-[18px] bg-metallic py-4.5 text-[12.5px] font-medium tracking-[0.24em] text-ivory uppercase shadow-btn transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-charcoal transition-transform duration-500 ease-out group-hover:translate-x-0" />
                      <span className="relative">Request Appointment</span>
                    </button>
                    <p className="mt-4 text-center text-[11px] font-light tracking-wide text-taupe">
                      No payment required — we simply hold your chair.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
