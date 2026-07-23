import { ArrowRight, BadgeCheck, ArrowDown, Briefcase, Star } from "lucide-react";
import { avatars, site } from "../data/site";
import { Reveal } from "./Reveal";
import { btnPrimary, btnSecondary } from "../utils/classes";

const trustAvatars = [avatars.marcus, avatars.aisha, avatars.elena, avatars.daniel];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Ambient backdrop: geometric grid + restrained glows */}
      <div
        className="bg-grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-20%] left-[-12%] h-[380px] w-[380px] rounded-full bg-grape/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* ——— Introduction ——— */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 shadow-card backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-500" />
                </span>
                Booking new projects · Q3 2026
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-8 font-display text-[2.75rem] leading-[1.04] font-semibold tracking-[-0.025em] text-ink sm:text-6xl xl:text-7xl">
                I design &amp; build digital products{" "}
                <span className="text-slate-400">that feel effortless.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
                I&apos;m {site.name} — a Berlin-based product designer and front-end engineer. For
                over a decade I&apos;ve helped startups and global brands turn complex problems into
                fast, elegant interfaces people genuinely enjoy.
              </p>
            </Reveal>

            <Reveal delay={270}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#contact" className={btnPrimary}>
                  Hire Me
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="#work" className={btnSecondary}>
                  View Projects
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex -space-x-2.5">
                  {trustAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      loading="lazy"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-paper"
                    />
                  ))}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-paper ring-2 ring-paper">
                    60+
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    5.0 rated · trusted by 60+ clients worldwide
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ——— Portrait composition ——— */}
          <div className="lg:col-span-5">
            <Reveal delay={240} className="relative">
              {/* Offset panel behind the portrait */}
              <div
                className="absolute inset-0 -z-10 translate-x-4 translate-y-5 rotate-[2.5deg] rounded-[32px] border border-ink/[0.06] bg-mist"
                aria-hidden="true"
              />

              <figure className="relative">
                <div className="overflow-hidden rounded-[28px] shadow-lift ring-1 ring-ink/10">
                  <img
                    src="/images/portrait.jpg"
                    alt="Portrait of Adrian Cole, product designer and front-end engineer"
                    width={640}
                    height={800}
                    fetchPriority="high"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.02]"
                  />
                </div>

                {/* Caption bar — glass panel */}
                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/75 px-5 py-4 shadow-soft backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">{site.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {site.role}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-paper">
                    <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                    Verified Pro
                  </span>
                </figcaption>

                {/* Floating stat card */}
                <div
                  className="absolute -left-3 top-10 hidden animate-float rounded-2xl border border-ink/[0.06] bg-white p-4 pr-5 shadow-lift sm:block md:-left-10"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-xl font-semibold leading-none text-ink">120+</p>
                      <p className="mt-1.5 text-xs font-medium text-slate-500">Projects shipped</p>
                    </div>
                  </div>
                </div>

                {/* Floating quote card */}
                <div
                  className="absolute -right-2 bottom-24 hidden animate-float-late rounded-2xl border border-ink/[0.06] bg-white p-4 pr-5 shadow-lift sm:block md:-right-8"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-2 max-w-[170px] text-xs font-medium leading-relaxed text-slate-600">
                    &ldquo;Delivered beyond expectations, ahead of schedule.&rdquo;
                  </p>
                  <p className="mt-2 text-[11px] font-semibold tracking-wide text-slate-400">
                    — CTO, VANTAGE
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* ——— Scroll indicator ——— */}
        <Reveal delay={500}>
          <div className="mt-20 flex justify-center md:mt-24">
            <a
              href="#about"
              className="group flex flex-col items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 transition-colors hover:text-ink"
              aria-label="Scroll down to the about section"
            >
              Scroll to explore
              <span className="relative h-12 w-px overflow-hidden bg-ink/10">
                <span className="absolute left-0 top-0 h-4 w-px animate-scroll-dot bg-ink" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
