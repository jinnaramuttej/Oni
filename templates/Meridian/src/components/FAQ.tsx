import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { faqs } from "../data";
import { IconPlus, IconMinus } from "./icons";

export default function FAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={["reveal grid grid-cols-1 gap-12 lg:grid-cols-12", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Frequently asked
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[48px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              The questions we get{" "}
              <span className="italic font-medium text-emerald-700">most often.</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.7] text-slate-500">
              Have something more specific in mind? Reach out — we usually
              reply within four working hours.
            </p>
            <a
              href="mailto:hello@meridianca.in"
              className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700 hover:text-emerald-700"
            >
              hello@meridianca.in →
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-slate-200 overflow-hidden rounded-[20px] border border-slate-200/80 bg-white">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-paper sm:px-8 sm:py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16px] font-semibold text-navy-700 sm:text-[17.5px]">
                        {f.q}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-navy-700 transition">
                        {isOpen ? <IconMinus className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}
                      </span>
                    </button>
                    <div
                      className={[
                        "grid transition-all duration-500 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-[14.5px] leading-[1.7] text-slate-500 sm:px-8 sm:pb-7">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
