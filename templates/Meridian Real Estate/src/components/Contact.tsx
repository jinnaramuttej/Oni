import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { CITIES } from "../data";
import { CONTAINER, Diamond, Reveal, SectionHead } from "./ui";

const CHANNELS = [
  {
    icon: MapPin,
    label: "Visit the Atelier",
    line1: "432 Park Avenue, Floor 71",
    line2: "New York, NY 10022",
  },
  {
    icon: Phone,
    label: "Call the Private Office",
    line1: "+1 212 555 0184",
    line2: "Mon — Sat, 9:00 — 19:00 EST",
  },
  {
    icon: Mail,
    label: "Write to Us",
    line1: "privateoffice@meridian.estate",
    line2: "Replies within one business day",
  },
  {
    icon: Clock3,
    label: "Quiet Hours",
    line1: "By appointment, day or night",
    line2: "Discretion observed at all times",
  },
];

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact information" className="py-24 md:py-36">
      <div className={CONTAINER}>
        <SectionHead
          center
          overline="Contact"
          title={
            <>
              The door is <em className="font-normal italic text-gold-deep">always open</em>
            </>
          }
          copy="Whether you are ready to move or simply wondering aloud — we would rather hear the question early than the regret late."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <div className="group h-full rounded-[20px] border border-ink/[0.06] bg-white p-8 text-center shadow-soft transition-all duration-700 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold/40 bg-ivory text-gold-deep transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                  <c.icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-deep">{c.label}</h3>
                <p className="mt-3 font-serif text-[19px] font-medium leading-snug text-ink">{c.line1}</p>
                <p className="mt-1.5 text-[12.5px] tracking-wide text-slate-500">{c.line2}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
            {CITIES.slice(0, 8).map((city, i) => (
              <span key={city} className="flex items-center gap-5">
                <span className="px-2 font-serif text-lg italic text-slate-500">{city}</span>
                {i < 7 && <Diamond className="border-linen" />}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
