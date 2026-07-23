import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Factory,
  HeartPulse,
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  Briefcase,
  HeartHandshake,
} from "lucide-react";
import { Reveal, SectionHeading } from "../lib/ui";

type Industry = { icon: LucideIcon; name: string; clients: string };

const INDUSTRIES: Industry[] = [
  { icon: Rocket, name: "Startups & SaaS", clients: "140+ clients" },
  { icon: Factory, name: "Manufacturing", clients: "90+ clients" },
  { icon: HeartPulse, name: "Healthcare", clients: "60+ clients" },
  { icon: ShoppingBag, name: "Retail & D2C", clients: "110+ clients" },
  { icon: Building2, name: "Real Estate", clients: "75+ clients" },
  { icon: UtensilsCrossed, name: "Hospitality", clients: "45+ clients" },
  { icon: Briefcase, name: "Professional Services", clients: "130+ clients" },
  { icon: HeartHandshake, name: "Non-profits", clients: "30+ clients" },
];

export default function Industries() {
  return (
    <section className="bg-white py-24 md:py-28" aria-label="Industries we serve">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Industries served"
          title={
            <>
              Sector depth, <span className="text-green-700">not generic advice.</span>
            </>
          }
          description="Every engagement is staffed by CAs who have closed books, audits and tax cycles inside your industry — with benchmarks to match."
        />

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:mt-16 lg:grid-cols-4 md:gap-5">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name} delay={(i % 4) * 90}>
              <li>
                <div className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-green-700/25 hover:shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-100 text-navy-600 transition-colors duration-500 group-hover:bg-green-700 group-hover:text-white">
                    <industry.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-navy-800">{industry.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">{industry.clients}</p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            Don't see your industry?{" "}
            <a
              href="#contact"
              className="font-extrabold text-green-700 underline decoration-gold-400 decoration-2 underline-offset-4 transition-colors hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 rounded-sm"
            >
              Ask us about it
            </a>{" "}
            — we likely serve a peer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
