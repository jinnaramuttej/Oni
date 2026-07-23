import { Gauge } from "lucide-react";
import { CountUp, Reveal, Stagger, StaggerItem } from "./ui";

const STATS = [
  { value: 2.1, decimals: 1, suffix: "B", label: "events processed daily", note: "across 4,000+ workspaces" },
  { value: 38, decimals: 0, suffix: "ms", label: "median query latency", note: "p95 stays under 120ms" },
  { value: 99.99, decimals: 2, suffix: "%", label: "uptime SLA", note: "independently audited" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "average rating", note: "from 1,200+ verified reviews" },
];

export default function Metrics() {
  return (
    <section aria-label="Performance metrics" className="relative py-8 sm:py-12">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="ring-grad overflow-hidden rounded-[24px]">
          <div className="relative rounded-[23px] bg-graphite px-6 py-10 sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_100%_at_50%_0%,black,transparent)]" aria-hidden />
            <Stagger className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {STATS.map((s, i) => (
                <StaggerItem
                  key={s.label}
                  className={`flex flex-col items-center text-center lg:border-l lg:border-line lg:first:border-l-0 lg:px-6 ${i === 0 ? "lg:pl-0" : ""}`}
                >
                  <span className="font-display text-[42px] font-semibold leading-none tracking-[-0.03em] text-mist sm:text-5xl">
                    <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </span>
                  <span className="mt-3 flex items-center gap-1.5 text-sm font-medium text-mist/85">
                    <Gauge className="size-3.5 text-cyan" aria-hidden />
                    {s.label}
                  </span>
                  <span className="mt-1 text-[13px] text-mute/70">{s.note}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
