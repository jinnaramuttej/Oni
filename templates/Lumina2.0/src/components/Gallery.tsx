import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { SMILE_CASES } from "../lib/data";

/**
 * Interactive before/after comparison slider.
 * The "before" layer carries a muted clinical grade; the "after" is the
 * true photograph — simulating whitening/alignment results honestly,
 * with a consent note beneath.
 */
function CompareSlider({ image, label }: { image: string; label: string }) {
  const [pos, setPos] = useState(50);
  const track = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = track.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) update(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={track}
      role="group"
      aria-label={`Before and after comparison — ${label}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      className="group relative aspect-[4/5] cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-900/5 transition-shadow duration-500 hover:shadow-card-hover sm:aspect-[5/4] lg:aspect-[4/5]"
    >
      {/* After (base, true image) */}
      <img
        src={image}
        alt={`${label} — after treatment`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute right-3.5 top-3.5 z-10 rounded-full bg-navy-900/60 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
        After
      </span>

      {/* Before (graded overlay, clipped) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover [filter:sepia(0.35)_saturate(0.7)_brightness(0.85)_contrast(0.9)]"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-navy-800 backdrop-blur-sm">
          Before
        </span>
      </div>

      {/* Divider + handle */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_12px_rgb(0_0_0/0.25)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-teal-600 shadow-lg ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
          <ChevronsLeftRight className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>

      {/* Accessible control */}
      <input
        type="range"
        min={4}
        max={96}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal after photo"
        className="absolute inset-0 z-20 h-full w-full opacity-0"
      />
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-10 h-[28rem] w-[28rem] rounded-full bg-aqua-100/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Smile gallery"
          title="Real patients. Quietly remarkable results."
          lede="Drag the handle to compare. Every treatment plan is personal — what stays constant is the natural, confident result."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SMILE_CASES.map((c, i) => (
            <Reveal key={c.initials} delay={i * 110} as="figure">
              <CompareSlider image={c.image} label={`${c.treatment} result`} />
              <figcaption className="mt-4 flex items-center justify-between px-1">
                <div>
                  <p className="font-display text-sm font-semibold text-navy-800">{c.treatment}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Patient {c.initials} · Completed in {c.timeline}
                  </p>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-teal-600 ring-1 ring-teal-100">
                  Completed
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-center text-xs leading-relaxed text-slate-400">
            <ShieldCheck className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
            Photos shared with written patient consent. Sliders show an illustrative
            simulation of typical results — individual outcomes vary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
