const WORDS = [
  "Luxury",
  "Beauty",
  "Confidence",
  "Transformation",
  "Self-Care",
  "Elegance",
  "Craft",
  "Serenity",
];

export default function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="mx-8 font-serif text-2xl font-light text-charcoal/45 italic md:text-3xl">
            {w}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-rosegold/50" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y hairline bg-cream py-6">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div className="animate-marquee flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
