import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { testimonials } from "../data";
import { IconArrowRight, IconArrowDown, IconQuote, IconStar } from "./icons";

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={["reveal grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-paper px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Client voices
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              The work, in the words of{" "}
              <span className="italic font-medium text-emerald-700">the people we work with.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar key={i} className="h-4 w-4 text-gold-400" />
              ))}
              <span className="ml-2 text-[13px] text-slate-500">
                <span className="font-semibold text-navy-700">4.9 / 5</span> across 280+ Google reviews
              </span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-paper p-8 sm:p-12 lg:col-span-8">
            <IconQuote className="h-10 w-10 text-emerald-600/70" />
            <div className="relative mt-6 min-h-[200px]">
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.name}
                  className={[
                    "absolute inset-0 transition-all duration-700",
                    i === active
                      ? "opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 translate-y-3",
                  ].join(" ")}
                >
                  <p className="font-display text-[24px] sm:text-[28px] lg:text-[32px] font-medium leading-[1.3] tracking-[-0.015em] text-navy-700">
                    "{t.quote}"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-navy-700 font-display text-[14px] font-semibold text-white">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-[14.5px] font-semibold text-navy-700">
                        {t.name}
                      </div>
                      <div className="text-[12.5px] text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={[
                      "h-1.5 rounded-full transition-all",
                      i === active
                        ? "w-10 bg-navy-700"
                        : "w-4 bg-slate-300 hover:bg-slate-400",
                    ].join(" ")}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
                  }
                  aria-label="Previous"
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-navy-700 transition hover:border-navy-700"
                >
                  <IconArrowDown className="h-4 w-4 rotate-90" />
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % testimonials.length)}
                  aria-label="Next"
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-navy-700 transition hover:border-navy-700"
                >
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-4">
            {[
              {
                metric: "₹ 12.4 Cr",
                label: "Tax saved across the top 50 clients in FY25.",
              },
              {
                metric: "4.2×",
                label: "Median client revenue growth across 3 years of advisory.",
              },
              {
                metric: "10 days",
                label: "From signed engagement to first close — every time.",
              },
            ].map((c) => (
              <div
                key={c.metric}
                className="group rounded-[20px] border border-slate-200/80 bg-white p-6 transition-all hover:-translate-y-1 hover:border-navy-700/30 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.14)]"
              >
                <div className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em] text-emerald-700">
                  {c.metric}
                </div>
                <div className="mt-3 text-[13.5px] leading-[1.6] text-slate-500">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
