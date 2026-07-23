import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";
import { EASE, Eyebrow, Reveal } from "./ui";

const ITEMS = [
  {
    q: "How long does setup actually take?",
    a: "Most teams see live data in under five minutes. Drop our snippet into your app or install one of the typed SDKs (TypeScript, Python, Go, iOS, Android), and events start streaming immediately. Historical backfill from your warehouse or previous tool runs in the background.",
  },
  {
    q: "Do I need to know SQL to use Pulse?",
    a: "No. Copilot turns plain-English questions into queries and shows you — in full — what it ran. Analysts can drop into SQL or the query builder whenever they want deeper control, but nobody is blocked on them.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your events, users, and content are never used to train models — ours or anyone else's. Copilot reasons over your schema and query results at request time only, inside an isolated environment, with full audit logging.",
  },
  {
    q: "How is Pulse different from GA4 or Mixpanel?",
    a: "Three things: everything is real-time (no sampling, no 24-hour delay), Pulse is warehouse-native so your data stays under your control, and Copilot means anyone on the team — not just analysts — gets defensible answers in seconds.",
  },
  {
    q: "Can I migrate historical data from my current tool?",
    a: "Yes. We include a free guided migration from Mixpanel, Amplitude, and GA4, including event-name mapping and identity stitching. Enterprise plans get a dedicated engineer for the cutover so nothing breaks mid-quarter.",
  },
  {
    q: "What happens when my trial ends?",
    a: "You drop gracefully onto the free Starter plan — nothing is deleted, no dashboards break, and no card is charged. Upgrade whenever you're ready; your data and history are right where you left them.",
  },
];

function Item({
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
    <div
      className={cn(
        "overflow-hidden rounded-[20px] border transition-colors duration-500",
        open ? "border-white/15 bg-graphite" : "border-line bg-graphite/50 hover:bg-graphite/80"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-trigger-${index}`}
        className="flex w-full items-center gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-soft sm:px-7"
      >
        <span className="font-mono text-[11px] text-mute/50">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex-1 font-display text-base font-semibold tracking-[-0.01em] text-mist sm:text-lg">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
            open ? "border-accent/40 bg-accent/15 text-accent-soft" : "border-line text-mute"
          )}
          aria-hidden
        >
          <Plus className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="px-6 pb-6 pl-[52px] text-[15px] leading-7 text-mute sm:px-7 sm:pl-[60px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow icon={<HelpCircle className="size-3.5" />}>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-mist sm:text-5xl">
              Questions, <span className="text-grad">answered.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-base leading-7 text-mute">
              Everything teams usually ask before switching. Still curious?{" "}
              <a href="#cta" className="font-medium text-mist underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan">
                Talk to us
              </a>
              .
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={0.05 * i}>
              <Item
                q={item.q}
                a={item.a}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
