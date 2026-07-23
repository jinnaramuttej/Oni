import { Reveal } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { MapPin, Clock, Phone, Mail, ArrowRight } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "12 Promenade des Sources\n06400 Côte d'Azur, France",
  },
  { icon: Clock, label: "Hours", value: "Monday – Sunday\n8:00 – 21:00" },
  { icon: Phone, label: "Reservations", value: "+33 4 93 00 0000" },
  { icon: Mail, label: "Email", value: "reservations@aurelia-spa.com" },
];

export function Contact() {
  return (
    <section id="contact" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>Visit Us</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
                Find your way to stillness
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-charcoal/65">
                Tucked along the Côte d'Azur, our sanctuary is a short transfer from
                Nice and a world away from the everyday. Private transfers can be
                arranged with your booking.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 space-y-7">
                {contactDetails.map((d) => (
                  <div key={d.label} className="flex items-start gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-beige">
                      <d.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <dt className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/45">
                        {d.label}
                      </dt>
                      <dd className="mt-1 whitespace-pre-line text-base font-light text-charcoal">
                        {d.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-12">
                <Button href="https://maps.google.com" variant="primary">
                  Get directions
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="group overflow-hidden rounded-card shadow-card">
              <img
                src="/images/contact-spa.jpg"
                alt="Aurelia spa building set within nature"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            {/* Floating hours card */}
            <div className="absolute -bottom-6 -left-4 rounded-card bg-cream/95 px-7 py-5 shadow-card backdrop-blur-sm lg:-left-8">
              <p className="font-serif text-2xl text-charcoal">Côte d'Azur</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-charcoal/50">
                Open daily · 8:00 – 21:00
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
