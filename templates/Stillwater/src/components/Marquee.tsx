import { Sparkle } from "lucide-react";

const WORDS = [
  "Presence",
  "Balance",
  "Breath",
  "Stillness",
  "Nature",
  "Harmony",
  "Clarity",
  "Healing",
  "Trust",
  "Intentional living",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <section aria-hidden className="marquee overflow-hidden border-y border-pebble/35 bg-ivory py-7">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10">
            {row.map((w, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className="font-serif text-2xl font-light italic tracking-wide text-eucalyptus-deep/80">
                  {w}
                </span>
                <Sparkle size={12} strokeWidth={1.25} className="text-clay/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
