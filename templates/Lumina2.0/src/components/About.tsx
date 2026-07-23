import { Award, CheckCircle2, ShieldCheck, Timer } from "lucide-react";
import { Img, Reveal, SectionHeading } from "./ui";
import { IMAGES, PROCESS_STEPS, STATS } from "../lib/data";

const promises = [
  "Every cost explained before we begin — no surprises, ever",
  "Sedation and comfort options for anxious patients",
  "Digital impressions — no more messy molds",
  "Recalls & reminders that respect your schedule",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Subtle decorative geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-aqua-100 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-40 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Layered imagery */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <Reveal>
              <Img
                src={IMAGES.interior}
                alt="Bright, minimalist Lumina treatment suite with a modern dental chair and equipment"
                containerClassName="aspect-[4/5] rounded-[1.75rem] shadow-soft ring-1 ring-slate-900/5"
                className="transition-transform duration-700 hover:scale-[1.02]"
              />
            </Reveal>

            <Reveal delay={200} className="absolute -bottom-10 -right-4 w-1/2 sm:-right-8 sm:w-3/5">
              <Img
                src={IMAGES.consult}
                alt="Dentist explaining a digital smile plan to a patient during a relaxed consultation"
                containerClassName="aspect-[5/4] rounded-3xl shadow-soft ring-8 ring-white"
              />
            </Reveal>

            <Reveal
              delay={320}
              className="absolute -top-5 -right-3 sm:-right-6"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-600">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold text-navy-800">AAO Accredited</span>
                  <span className="block text-xs text-slate-500">Sterilization certified</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Lumina"
              title={
                <>
                  A dental studio designed to feel{" "}
                  <span className="text-teal-500">nothing like a clinic.</span>
                </>
              }
              lede="We rebuilt every detail of the dental visit — from warm lighting and quiet operatories to honest pricing and 3D-guided precision — so that caring for your smile becomes something you look forward to."
            />

            <ul className="mt-8 space-y-3.5">
              {promises.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 80} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-[0.95rem] leading-relaxed text-slate-600">{item}</span>
                </Reveal>
              ))}
            </ul>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-slate-100 pt-10 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal as="div" key={stat.label} delay={i * 90}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold tracking-tight text-navy-800 lg:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Patient journey */}
        <div className="mt-28 lg:mt-36">
          <SectionHeading
            eyebrow="Your visit, step by step"
            title="Precision care, from hello to healthy smile"
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 100}>
                <article className="group relative h-full overflow-hidden rounded-[1.25rem] border border-slate-100 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-100 hover:shadow-card-hover">
                  <div
                    aria-hidden="true"
                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-aqua-100/60 transition-transform duration-500 group-hover:scale-125"
                  />
                  <p className="relative font-display text-sm font-bold tracking-[0.2em] text-teal-500">
                    {step.step}
                  </p>
                  <h3 className="relative mt-4 font-display text-lg font-semibold tracking-tight text-navy-800">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-slate-500">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Award className="h-4 w-4 text-teal-500" aria-hidden="true" /> American Dental Association member
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <Timer className="h-4 w-4 text-teal-500" aria-hidden="true" /> Average wait time under 4 minutes
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
