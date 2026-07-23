import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionLabel } from "./ui";
import { therapists } from "../lib/data";

export function Therapists() {
  return (
    <section id="therapists" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">Meet the Therapists</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
            Hands you can trust
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-charcoal/65">
            A small, senior team of practitioners — each chosen as much for their
            intuition as their craft. Your therapist is paired to your needs, not
            the other way around.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {therapists.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <article className="group h-full">
                <div className="relative overflow-hidden rounded-card shadow-soft">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif text-2xl font-light text-charcoal">{t.name}</h3>
                  <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-gold">
                    {t.role}
                  </p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-charcoal/65">
                    {t.bio}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
