import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../data";
import { Reveal, Eyebrow } from "./Reveal";
import { scrollToId } from "../lib/scroll";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="grain relative overflow-hidden bg-sand-deep/40 py-28 lg:py-36">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="10">Questions</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ink sm:text-[2.9rem]">
                Asked <em className="font-normal italic text-eucalyptus-deep">quietly</em>, answered honestly
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[14.5px] font-light leading-[1.95] text-charcoal/75">
                If your question isn't here, write to us. Elena reads every
                email herself, usually over tea, usually within a day.
              </p>
              <button
                onClick={() => scrollToId("booking")}
                className="link-quiet mt-6 inline-block text-[12px] font-medium uppercase tracking-[0.2em] text-eucalyptus-deep"
              >
                hello@stillwater.studio
              </button>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.05} y={24}>
                  <li className="border-t border-charcoal/12 last:border-b">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className="font-serif text-xl font-normal leading-snug text-ink sm:text-[22px]">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          isOpen
                            ? "border-eucalyptus bg-eucalyptus text-ivory"
                            : "border-charcoal/20 text-charcoal/60"
                        }`}
                      >
                        <Plus size={15} strokeWidth={1.5} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-8 text-[14.5px] font-light leading-[2] text-charcoal/80">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
