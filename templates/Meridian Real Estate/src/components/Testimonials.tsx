import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS, img } from "../data";
import { cn } from "../utils/cn";
import { CONTAINER, Overline, Reveal } from "./ui";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[index];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      aria-label="Client testimonials"
      className="relative overflow-hidden bg-forest py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ——— Ornamental quote mark ——— */}
      <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif text-[26rem] leading-none text-ivory/[0.05]">
        &ldquo;
      </span>

      <div className={cn(CONTAINER, "relative flex flex-col items-center text-center")}>
        <Reveal>
          <Overline tone="light" center>
            Private Words
          </Overline>
        </Reveal>

        <div key={index} className="quote-in mt-10 flex max-w-4xl flex-col items-center">
          <div className="flex gap-1.5" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="fill-gold text-gold" />
            ))}
          </div>

          <blockquote className="mt-8">
            <p className="font-serif text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.35] text-ivory">
              &ldquo;{t.quote}&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-10 flex items-center gap-4">
            <img
              src={img(t.photo, 160, 160)}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-14 rounded-full border-2 border-gold/60 object-cover"
            />
            <span className="text-left">
              <span className="block font-serif text-lg font-medium text-ivory">{t.name}</span>
              <span className="mt-0.5 block text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold">
                {t.context}
              </span>
            </span>
          </figcaption>
        </div>

        {/* ——— Controls ——— */}
        <div className="mt-12 flex items-center gap-6">
          <button
            onClick={() => setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            aria-label="Previous testimonial"
            className="grid size-12 place-items-center rounded-full border border-ivory/25 text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === index ? "w-10 bg-gold" : "w-4 bg-ivory/25 hover:bg-ivory/50"
                )}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((index + 1) % TESTIMONIALS.length)}
            aria-label="Next testimonial"
            className="grid size-12 place-items-center rounded-full border border-ivory/25 text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
}
