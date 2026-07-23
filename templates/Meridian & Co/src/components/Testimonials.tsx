import { Star, Quote } from "lucide-react";
import { Reveal, SectionHeading, LazyImage } from "../lib/ui";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Meridian closed our compliance gaps in one quarter and rebuilt our MIS from scratch. Board meetings have never been this decisive.",
    name: "Arjun Patel",
    role: "Co-founder",
    company: "Loopware · SaaS",
    avatar:
      "https://images.pexels.com/photos/37148282/pexels-photo-37148282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  },
  {
    quote:
      "Their GST practice is surgical. We recovered input credits we didn't know existed — and haven't received a single notice since engaging them.",
    name: "Sneha Iyer",
    role: "Chief Financial Officer",
    company: "RetailVerse · 12-store chain",
    avatar:
      "https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  },
  {
    quote:
      "Audits that used to consume my team for months now wrap in weeks — with findings we actually act on. That's a different class of CA firm.",
    name: "Rajiv Malhotra",
    role: "Managing Director",
    company: "Precitech Industries",
    avatar:
      "https://images.pexels.com/photos/36645466/pexels-photo-36645466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-navy-800 py-24 md:py-32" aria-label="Client testimonials">
      {/* Decorative dotted field */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div aria-hidden="true" className="absolute -left-32 top-0 h-72 w-72 rounded-full border-[40px] border-white/[0.04]" />

      <div className="container-x relative z-10">
        <SectionHeading
          dark
          align="center"
          eyebrow="Client voices"
          title={
            <>
              Trusted where it matters —{" "}
              <span className="text-green-300">with other people's money.</span>
            </>
          }
          description="A 98% retention rate is earned balance-sheet by balance-sheet. Here's what long-term clients say."
        />

        <ul className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} className="h-full">
              <li className="h-full">
                <figure className="group relative flex h-full flex-col rounded-[24px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-lift">
                  <Quote className="h-8 w-8 text-gold-400/70 transition-colors duration-500 group-hover:text-gold-400" aria-hidden="true" />
                  <blockquote className="mt-5 flex-1">
                    <p className="text-[0.95rem] leading-7 text-navy-50/90">{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                    <LazyImage src={t.avatar} alt={`Portrait of ${t.name}`} className="h-12 w-12 shrink-0 rounded-full ring-2 ring-white/20" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold tracking-tight text-white">{t.name}</p>
                      <p className="truncate text-xs font-semibold text-navy-200/75">
                        {t.role} — {t.company}
                      </p>
                    </div>
                    <div className="ml-auto shrink-0">
                      <Stars />
                    </div>
                  </figcaption>
                </figure>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Aggregate rating strip */}
        <Reveal delay={250}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-5 text-center backdrop-blur-sm sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <p className="text-3xl font-extrabold tracking-tight text-white">4.9</p>
              <div>
                <Stars />
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-navy-200/70">Google · 212 reviews</p>
              </div>
            </div>
            <span aria-hidden="true" className="hidden h-8 w-px bg-white/10 sm:block" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-navy-200/70">
              <span className="block text-lg font-extrabold normal-case tracking-tight text-green-300">98%</span>
              clients renew annually
            </p>
            <span aria-hidden="true" className="hidden h-8 w-px bg-white/10 sm:block" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-navy-200/70">
              <span className="block text-lg font-extrabold normal-case tracking-tight text-green-300">24 hrs</span>
              median response time
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
