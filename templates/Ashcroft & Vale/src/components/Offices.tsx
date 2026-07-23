import { offices } from "../data";
import { Icons, SectionHeading } from "./ui";

export function Offices() {
  return (
    <section id="contact" className="bg-ink py-24 text-ivory lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          align="center"
          eyebrow="Office Locations"
          title="A global presence, a local commitment"
          intro="Visit us at one of our principal offices, situated within the world's foremost financial and legal centres."
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {offices.map((o, i) => (
            <article
              key={o.city}
              className="reveal group overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
              data-delay={i * 90}
            >
              <div className="relative overflow-hidden">
                <img
                  src={o.image}
                  alt={`${o.city} skyline`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <h3 className="absolute bottom-4 left-6 font-serif text-3xl text-ivory">
                  {o.city}
                </h3>
              </div>
              <div className="space-y-4 p-7">
                <p className="flex items-start gap-3 text-ivory/75">
                  <span className="mt-0.5 h-5 w-5 shrink-0 text-gold"><Icons.pin /></span>
                  {o.address}
                </p>
                <a
                  href={`tel:${o.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-ivory/75 transition-colors hover:text-gold-soft"
                >
                  <span className="h-5 w-5 shrink-0 text-gold"><Icons.phone /></span>
                  {o.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
