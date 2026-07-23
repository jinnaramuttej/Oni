import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "../utils/cn";
import { Button, Reveal, SectionHeading } from "./ui";
import { FAQS } from "../lib/data";

function FAQItem({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <Reveal as="li" delay={index * 60}>
      <div
        className={cn(
          "overflow-hidden rounded-[1.25rem] border bg-white transition-all duration-500",
          open ? "border-teal-200 shadow-card-hover" : "border-slate-100 shadow-card hover:border-teal-100",
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          id={`faq-button-${index}`}
          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-500 lg:px-7"
        >
          <span className="font-display text-[0.98rem] font-semibold tracking-tight text-navy-800">
            {q}
          </span>
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-400",
              open ? "rotate-180 bg-teal-500 text-white" : "bg-slate-100 text-slate-500",
            )}
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </span>
        </button>
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-button-${index}`}
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <p className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-500 lg:px-7">
              {a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Good to know"
              title="Questions, answered honestly"
              lede="The things patients ask us most — coverage, anxiety, whitening safety, and everything between."
            />
            <Reveal delay={220} className="mt-9 hidden lg:block">
              <div className="rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-teal-50 to-aqua-100/60 p-7">
                <MessageCircleQuestion className="h-7 w-7 text-teal-500" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-navy-800">
                  Still curious about something?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Send us a message and a real coordinator — not a bot — will reply
                  within the hour during opening times.
                </p>
                <Button href="#booking" variant="outline" className="mt-5">
                  Ask a question
                </Button>
              </div>
            </Reveal>
          </div>

          <ul className="space-y-3.5">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
