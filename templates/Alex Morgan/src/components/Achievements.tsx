import Reveal from "./Reveal";
import { Award, Trophy, Users, Star, ArrowUpRight } from "lucide-react";

const achievements = [
  {
    metric: "Awwwards",
    label: "Site of the Day ×3",
    icon: Award,
  },
  {
    metric: "Clients",
    label: "50+ happy customers",
    icon: Users,
  },
  {
    metric: "NPS",
    label: "94 average score",
    icon: Star,
  },
  {
    metric: "Revenue",
    label: "$2M+ generated",
    icon: Trophy,
  },
];

export default function Achievements() {
  return (
    <section className="relative border-t border-gray-100 bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
            Achievements
          </span>
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Selected achievements
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-3 max-w-md text-base text-slate-custom/70">
                Recognition and results that reflect the quality and impact of
                the work delivered over the years.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {achievements.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={100 + i * 80}>
                  <div className="group flex flex-col rounded-[20px] border border-gray-100 bg-off-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-premium-card-hover hover:-translate-y-0.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-premium-sm transition-all duration-300 group-hover:shadow-premium-md">
                      <Icon className="h-5 w-5 text-matte-black" />
                    </div>
                    <span className="mt-4 text-2xl font-bold tracking-tight text-matte-black">
                      {item.metric}
                    </span>
                    <span className="mt-1 text-xs text-slate-custom/60">
                      {item.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={300}>
          <div className="mt-16 flex flex-col items-center gap-3 rounded-[20px] border border-gray-100 bg-off-white p-8 text-center sm:flex-row sm:text-left sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-matte-black">
                Want to see the full portfolio?
              </h3>
              <p className="mt-1 text-sm text-slate-custom/70">
                I maintain a curated collection of every project I&apos;ve shipped.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-[18px] bg-matte-black px-6 py-3 text-sm font-medium text-white shadow-premium-button transition-all duration-300 hover:bg-neutral-800 hover:shadow-premium-button-hover hover:-translate-y-0.5"
            >
              Request full portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
