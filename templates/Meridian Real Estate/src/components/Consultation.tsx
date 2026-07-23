import { useState, type FormEvent } from "react";
import { ArrowRight, Check, CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";
import { CONSULT_IMG, img } from "../data";
import { cn } from "../utils/cn";
import { CONTAINER, Overline, Reveal } from "./ui";

const PROMISES = [
  "Off-market access before public listing",
  "Private valuation within 24 hours",
  "Global relocation & legal coordination",
];

const inputCls =
  "w-full rounded-[14px] border border-ink/10 bg-ivory px-4.5 py-3.5 text-[14.5px] font-medium text-ink placeholder:text-slate-400 transition-colors duration-400 focus:border-gold-deep focus:bg-white focus:outline-none";

const labelCls = "mb-2 block text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500";

export default function Consultation() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="consultation" aria-label="Book a private consultation" className="bg-mist py-24 md:py-36">
      <div className={CONTAINER}>
        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-ink/[0.05] bg-white shadow-lift lg:grid lg:grid-cols-2">
            {/* ——— Left: imagery + promise ——— */}
            <div className="relative min-h-[420px] lg:min-h-full">
              <img
                src={img(CONSULT_IMG.photo, 1100, 1300)}
                alt={CONSULT_IMG.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest/30 to-ink/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-11">
                <Overline tone="light">Private Consultation</Overline>
                <h2 className="mt-5 max-w-md font-serif text-[clamp(2.1rem,3.6vw,3rem)] font-medium leading-[1.08] text-ivory">
                  Forty-five minutes that <em className="font-normal italic text-gold">change everything</em>
                </h2>
                <ul className="mt-8 space-y-4">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex items-center gap-3.5 text-[13.5px] font-medium tracking-wide text-ivory/85">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold/20 backdrop-blur">
                        <Check size={12} strokeWidth={3} className="text-gold" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex items-center gap-4 border-t border-ivory/15 pt-7">
                  <img
                    src="https://images.pexels.com/photos/9623645/pexels-photo-9623645.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=120&h=120"
                    alt=""
                    loading="lazy"
                    className="size-12 rounded-full border-2 border-gold/70 object-cover"
                  />
                  <p className="text-[12.5px] leading-relaxed text-ivory/70">
                    <span className="block font-serif text-base text-ivory">Alexander Whitmore</span>
                    Principal Broker — your first conversation
                  </p>
                </div>
              </div>
            </div>

            {/* ——— Right: the form ——— */}
            <div className="p-8 md:p-12 lg:p-14">
              {sent ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid size-20 place-items-center rounded-full bg-forest/10">
                    <CheckCircle2 size={38} strokeWidth={1.4} className="text-forest" />
                  </span>
                  <h3 className="mt-8 font-serif text-4xl font-medium text-ink">Request received</h3>
                  <p className="mt-4 max-w-sm text-[14px] leading-[1.9] text-slate-600">
                    Thank you. A senior advisor will contact you within one business
                    day — from a private number, always with discretion.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-10 rounded-[14px] border border-ink/20 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-gold-deep hover:text-gold-deep"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-[clamp(1.9rem,3vw,2.5rem)] font-medium leading-tight text-ink">
                    Begin the conversation
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.85] text-slate-600">
                    No obligation, no pressure — only clarity on what is possible.
                  </p>

                  <form onSubmit={onSubmit} className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-first" className={labelCls}>First name</label>
                      <input id="c-first" required autoComplete="given-name" placeholder="Charlotte" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-last" className={labelCls}>Last name</label>
                      <input id="c-last" required autoComplete="family-name" placeholder="Beaumont" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={labelCls}>Email</label>
                      <input id="c-email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className={labelCls}>Phone</label>
                      <input id="c-phone" type="tel" autoComplete="tel" placeholder="+1 (___) ___ ____" className={inputCls} />
                    </div>
                    <div className="relative sm:col-span-2">
                      <label htmlFor="c-interest" className={labelCls}>I am interested in</label>
                      <select id="c-interest" className={cn(inputCls, "lux-select cursor-pointer pr-10")}>
                        <option>Buying a residence</option>
                        <option>Selling a residence</option>
                        <option>Buying &amp; selling</option>
                        <option>A private valuation</option>
                        <option>Investment advisory</option>
                      </select>
                      <ChevronDown size={15} className="pointer-events-none absolute bottom-4 right-4 text-slate-400" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="c-msg" className={labelCls}>
                        A few words <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        id="c-msg"
                        rows={4}
                        placeholder="Tell us about the home you are imagining…"
                        className={cn(inputCls, "resize-none")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-[16px] bg-gold px-8 py-4.5 text-[12px] font-bold uppercase tracking-[0.2em] text-ink shadow-gold transition-all duration-500 hover:-translate-y-0.5 hover:bg-ink hover:text-ivory sm:col-span-2"
                    >
                      Request Private Consultation
                      <ArrowRight size={15} strokeWidth={2.2} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                    </button>

                    <p className="flex items-center justify-center gap-2.5 text-center text-[11.5px] tracking-wide text-slate-400 sm:col-span-2">
                      <ShieldCheck size={14} className="text-forest" />
                      Strictly confidential. Your details are never shared.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
