import {
  ArrowRight,
  Braces,
  Plug,
  Unplug,
  Webhook,
} from "lucide-react";
import { Eyebrow, Reveal, Stagger, StaggerItem } from "./ui";

const TOOLS = [
  { m: "Sl", name: "Slack", cat: "Messaging" },
  { m: "St", name: "Stripe", cat: "Payments" },
  { m: "Se", name: "Segment", cat: "CDP" },
  { m: "Sn", name: "Snowflake", cat: "Warehouse" },
  { m: "Hs", name: "HubSpot", cat: "CRM" },
  { m: "Sf", name: "Salesforce", cat: "CRM" },
  { m: "No", name: "Notion", cat: "Docs" },
  { m: "Fg", name: "Figma", cat: "Design" },
  { m: "Li", name: "Linear", cat: "Issues" },
  { m: "Gh", name: "GitHub", cat: "Code" },
  { m: "Bq", name: "BigQuery", cat: "Warehouse" },
  { m: "Zp", name: "Zapier", cat: "Automation" },
];

const POINTS = [
  {
    icon: Plug,
    title: "40+ native connectors",
    body: "Events, payments, CRM, and warehouses sync bidirectionally — no middleware, no CSV rituals.",
  },
  {
    icon: Webhook,
    title: "Realtime webhooks",
    body: "Push insight back into your tools the moment it happens. Alerts where your team already lives.",
  },
  {
    icon: Braces,
    title: "A real API, fully documented",
    body: "REST and GraphQL with typed SDKs for TypeScript, Python, and Go. If you can name it, you can query it.",
  },
];

export default function Integrations() {
  return (
    <section id="integrations" aria-label="Integrations" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* tile grid */}
        <Reveal className="order-2 lg:order-1">
          <Stagger className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {TOOLS.map((t) => (
              <StaggerItem key={t.name}>
                <div className="group flex h-[92px] flex-col items-center justify-center gap-1.5 rounded-[20px] border border-line bg-graphite/60 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-graphite">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-line bg-charcoal font-display text-[13px] font-bold text-mute transition-all duration-500 group-hover:border-accent/30 group-hover:text-mist">
                    {t.m}
                  </span>
                  <span className="text-[11px] font-medium text-mist/80">{t.name}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-mute/50 transition-colors duration-500 group-hover:text-cyan/80">
                    {t.cat}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* copy */}
        <div className="order-1 max-w-lg lg:order-2 lg:justify-self-end">
          <Reveal>
            <Eyebrow icon={<Unplug className="size-3.5" />}>Integrations</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-mist sm:text-5xl">
              Plugs into the stack
              <br />
              <span className="text-grad">you already run.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-8 text-mute sm:text-lg">
              Connect in two clicks, backfill in minutes. Pulse meets your data
              where it lives — and sends answers back to where your team works.
            </p>
          </Reveal>

          <Stagger className="mt-9 space-y-5" delay={0.2}>
            {POINTS.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] transition-colors duration-300 group-hover:border-cyan/30 group-hover:bg-cyan/10">
                    <p.icon className="size-[18px] text-mute transition-colors duration-300 group-hover:text-cyan" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-mist">{p.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-mute">{p.body}</p>
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
              Browse all 40+ integrations
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
