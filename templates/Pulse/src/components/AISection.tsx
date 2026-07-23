import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarClock,
  Languages,
  LineChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Eyebrow, Reveal, Stagger, StaggerItem } from "./ui";

const CAPABILITIES = [
  {
    icon: Languages,
    title: "Plain-English querying",
    body: "Type a question the way you'd ask a colleague. Copilot translates it into precise queries — and shows its work.",
  },
  {
    icon: TrendingUp,
    title: "Proactive, not reactive",
    body: "Insights surface before you ask: churn risks, expansion signals, and funnel regressions ranked by revenue impact.",
  },
  {
    icon: CalendarClock,
    title: "Narratives on a schedule",
    body: "Weekly digests written for humans land in Slack every Monday — what changed, why, and what to do next.",
  },
];

const PROMPT_CHIPS = [
  "Which feature drove retention?",
  "Forecast Q3 MRR",
  "Compare EU vs NA activation",
];

const GEN_BARS = [38, 62, 44, 80, 58, 92, 71];

function CopilotShowcase() {
  return (
    <div className="relative" aria-hidden>
      {/* ambient glow */}
      <div className="absolute -inset-8 rounded-[40px] bg-accent/[0.09] blur-[70px]" />

      {/* trailing card */}
      <div className="absolute -bottom-6 -left-4 w-64 rotate-[-4deg] rounded-2xl border border-line bg-graphite-2/80 p-4 shadow-2xl backdrop-blur sm:-left-8">
        <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-mute">
          <CalendarClock className="size-3 text-cyan" />
          Monday digest
        </p>
        <p className="mt-2 text-[11px] leading-5 text-mute">
          Retention climbed to <span className="font-semibold text-mist">64%</span> after
          the onboarding revamp. Expansion revenue beat target by 12%.
        </p>
        <div className="mt-2.5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-mute">
          <Bot className="size-3 text-accent-soft" />
          Written by Copilot · 8:00 AM
        </p>
      </div>

      {/* main chat card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="ring-grad relative ml-auto rounded-[22px]"
      >
        <div className="rounded-[21px] bg-graphite p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full border border-line bg-charcoal/60 px-3 py-1.5">
              <Sparkles className="size-3.5 text-accent-soft" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Copilot session</span>
            </span>
            <span className="font-mono text-[10px] text-mute/60">09:41 UTC</span>
          </div>

          {/* question */}
          <div className="mt-5 ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-mist/90">
            How did the May launch affect activation by channel?
          </div>

          {/* answer */}
          <div className="mt-4 rounded-2xl rounded-tl-md border border-accent/20 bg-accent/[0.05] p-4">
            <p className="flex items-start gap-2 text-[13px] leading-6 text-mute">
              <Sparkles className="mt-1 size-3.5 shrink-0 text-accent-soft" />
              <span>
                Activation rose to <strong className="font-semibold text-mist">41.8%</strong>{" "}
                (+6.2 pts). Product-launch traffic converted{" "}
                <strong className="font-semibold text-mist">2.3×</strong> better than
                paid. Here's the breakdown:
              </span>
            </p>

            {/* generated chart */}
            <div className="mt-4 rounded-xl border border-line bg-charcoal/70 p-3.5">
              <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-mute">
                <BarChart3 className="size-3 text-cyan" />
                activation by channel · generated
              </p>
              <div className="mt-3 flex h-20 items-end gap-2">
                {GEN_BARS.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-1 rounded-t ${
                      i === 5
                        ? "bg-gradient-to-t from-accent to-cyan shadow-[0_0_20px_rgb(34_211_238/0.35)]"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-wider text-mute/60">
                <span>Paid</span><span>Social</span><span>Direct</span><span>Organic</span><span>Referral</span><span>Launch</span><span>Email</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {["funnels_v3", "utm_sources", "cohorts_may"].map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-md border border-line bg-charcoal/70 px-2 py-1 font-mono text-[9px] text-mute">
                  <LineChart className="size-2.5 text-cyan" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* follow-ups */}
          <div className="mt-4 flex flex-wrap gap-2">
            {PROMPT_CHIPS.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.12 }}
                className="cursor-default rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-mute transition-colors hover:border-cyan/30 hover:text-mist"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AISection() {
  return (
    <section id="copilot" aria-label="AI Copilot" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* section ambient */}
      <div className="pointer-events-none absolute left-[-200px] top-1/3 h-96 w-96 rounded-full bg-accent/[0.07] blur-[120px]" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* copy */}
        <div className="max-w-lg">
          <Reveal>
            <Eyebrow icon={<Sparkles className="size-3.5" />}>Pulse Copilot</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-mist sm:text-5xl">
              Ask in plain English.
              <br />
              <span className="text-grad">Get answers you can defend.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-8 text-mute sm:text-lg">
              Copilot sits inside every chart, funnel, and cohort. It knows your
              schema, respects your definitions, and cites the exact query
              behind every answer.
            </p>
          </Reveal>

          <Stagger className="mt-9 space-y-5" delay={0.2}>
            {CAPABILITIES.map((c) => (
              <StaggerItem key={c.title}>
                <div className="group flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                    <c.icon className="size-[18px] text-mute transition-colors duration-300 group-hover:text-accent-soft" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-mist">{c.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-mute">{c.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3}>
            <a
              href="#pricing"
              className="group mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-mist transition-colors hover:text-cyan"
            >
              Try Copilot on your data
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* visual */}
        <Reveal delay={0.15} className="lg:pl-8">
          <CopilotShowcase />
        </Reveal>
      </div>
    </section>
  );
}
