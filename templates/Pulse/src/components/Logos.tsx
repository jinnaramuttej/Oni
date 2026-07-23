import {
  Aperture,
  Boxes,
  CloudSun,
  Hexagon,
  Layers,
  Mountain,
  Orbit,
  PenTool,
} from "lucide-react";
import { Reveal } from "./ui";

const COMPANIES = [
  { icon: Orbit, name: "Northwind" },
  { icon: Hexagon, name: "Vantek" },
  { icon: Layers, name: "Statlery" },
  { icon: Mountain, name: "Kernel & Co" },
  { icon: CloudSun, name: "Helios" },
  { icon: PenTool, name: "Arcadia" },
  { icon: Boxes, name: "Lumen" },
  { icon: Aperture, name: "Forge" },
];

export default function Logos() {
  const row = [...COMPANIES, ...COMPANIES];

  return (
    <section aria-label="Trusted by leading companies" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-mute/70">
            Trusted by data-driven teams at 4,000+ companies
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mask-fade-x relative mt-8 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-14 pr-14">
              {row.map((c, i) => (
                <span
                  key={`${c.name}-${i}`}
                  className="flex select-none items-center gap-2.5 text-mute/45 transition-colors duration-300 hover:text-mute/90"
                  aria-hidden={i >= COMPANIES.length}
                >
                  <c.icon className="size-[18px]" strokeWidth={1.8} aria-hidden />
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {c.name}
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
