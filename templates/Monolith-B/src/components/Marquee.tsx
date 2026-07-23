import { Asterisk } from "lucide-react";

const items = [
  "Awwwards SOTD",
  "FWA of the Day",
  "Type Directors Club",
  "D&AD Pencil",
  "Red Dot Winner",
  "CSS Design Awards",
  "European Design Awards",
  "Brand New Winner",
];

export default function Marquee() {
  return (
    <section
      aria-label="Recognition"
      className="border-y border-white/10 bg-[#0A0A0A] py-6 md:py-8"
    >
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16 font-display text-4xl md:text-6xl">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="flex items-center gap-16">
              <span className="tracking-tight">{it}</span>
              <Asterisk
                className="h-8 w-8 shrink-0 text-[#C6FF3D] md:h-10 md:w-10"
                strokeWidth={1}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
