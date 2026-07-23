import { Aperture, Box, Circle, Command, Globe, Hexagon, Triangle, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

const clients = [
  { name: "Northwind", icon: Triangle },
  { name: "Lumina Health", icon: Circle },
  { name: "Vantage", icon: Hexagon },
  { name: "Helix Labs", icon: Aperture },
  { name: "Orbital", icon: Globe },
  { name: "Brightline", icon: Zap },
  { name: "Mono & Co", icon: Command },
  { name: "Ferrostack", icon: Box },
];

export function LogoStrip() {
  return (
    <section aria-label="Selected clients" className="border-y border-ink/[0.06] bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            Trusted by forward-thinking teams
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mask-fade-x mt-10 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-16 pr-16 hover:[animation-play-state:paused]">
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={`${client.name}-${i}`}
                  aria-hidden={i >= clients.length}
                  className="flex shrink-0 items-center gap-2.5 text-ink/35 transition-colors duration-300 hover:text-ink"
                >
                  <client.icon className="h-5 w-5" strokeWidth={1.75} />
                  <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">
                    {client.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
