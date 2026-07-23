import Reveal from "./Reveal";

const CLIENTS = [
  "Aether", "Vantage", "Kinfolk", "Orbital", "Halcyon", "Meridian Bank",
  "Northlane", "Fabrique", "Solstice", "Ember Co.", "Loop Studio", "Pinnacle",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="flex overflow-hidden scrollbar-none">
      <div
        className={`flex shrink-0 items-center gap-16 pr-16 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((client, i) => (
          <span
            key={`${client}-${i}`}
            className="shrink-0 font-display text-3xl font-semibold tracking-tight text-mist/40 transition-colors duration-300 hover:text-paper sm:text-4xl"
          >
            {client}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section aria-labelledby="clients-heading" className="relative border-y border-white/10 bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-14">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
            <span className="h-px w-10 bg-mist/60" />
            Trusted By
          </p>
          <h2 id="clients-heading" className="sr-only">
            Selected Clients
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col gap-6">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
