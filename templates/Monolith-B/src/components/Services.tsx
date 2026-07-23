import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Brand Identity",
    tagline: "Systems, not logos.",
    deliverables: [
      "Naming & verbal identity",
      "Wordmarks & type systems",
      "Guidelines & governance",
      "Editorial art direction",
    ],
    image:
      "https://images.pexels.com/photos/7598024/pexels-photo-7598024.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
  {
    n: "02",
    title: "Digital Product",
    tagline: "Interfaces with character.",
    deliverables: [
      "Product & UX strategy",
      "Interface design systems",
      "Interaction & motion design",
      "Front-end engineering",
    ],
    image:
      "https://images.pexels.com/photos/6322366/pexels-photo-6322366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
  {
    n: "03",
    title: "Film & Motion",
    tagline: "Stories worth sitting through.",
    deliverables: [
      "Concept & direction",
      "Cinematography & editing",
      "3D & motion graphics",
      "Sound design",
    ],
    image:
      "https://images.pexels.com/photos/11113377/pexels-photo-11113377.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
  {
    n: "04",
    title: "Spatial & Print",
    tagline: "Objects you can hold.",
    deliverables: [
      "Publications & books",
      "Packaging & signage",
      "Exhibition design",
      "Experiential campaigns",
    ],
    image:
      "https://images.pexels.com/photos/34022883/pexels-photo-34022883.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section
      id="services"
      className="relative border-t border-white/10 bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid grid-cols-12 items-end gap-6 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              <span className="h-px w-10 bg-[#A3A3A3]" />
              [ 04 ] Capabilities
            </div>
            <h2 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-tight md:text-[7.5vw]">
              Four studios,
              <br />
              <em className="italic">one obsession.</em>
            </h2>
          </div>
          <div className="col-span-12 max-w-md md:col-span-4 md:col-start-9">
            <p className="text-base leading-relaxed text-white/70">
              We work across brand, digital, film and print — with a single
              creative direction team keeping the language consistent from your
              wordmark to your website's 404 page.
            </p>
          </div>
        </div>

        {/* Interactive list */}
        <div className="grid grid-cols-12 gap-10">
          {/* List */}
          <div className="col-span-12 md:col-span-7">
            <ul>
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={s.n}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group border-t border-white/10 last:border-b"
                  >
                    <button
                      onClick={() => setActive(i)}
                      className="flex w-full items-center justify-between gap-6 py-8 text-left transition-colors md:py-12"
                    >
                      <div className="flex items-baseline gap-6 md:gap-10">
                        <span
                          className={`font-mono text-xs uppercase tracking-[0.24em] transition-colors ${
                            isActive ? "text-[#C6FF3D]" : "text-[#A3A3A3]"
                          }`}
                        >
                          {s.n}
                        </span>
                        <span
                          className={`font-display text-4xl leading-none tracking-tight transition-all duration-500 md:text-6xl ${
                            isActive
                              ? "translate-x-2 text-white"
                              : "text-white/60 group-hover:text-white/90"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      <span
                        className={`hidden font-mono text-xs italic tracking-tight transition-all md:inline ${
                          isActive ? "text-white opacity-100" : "opacity-0"
                        }`}
                      >
                        {s.tagline}
                      </span>
                    </button>
                    {/* Expanded content */}
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="flex flex-wrap gap-2 pb-8">
                          {s.deliverables.map((d) => (
                            <li
                              key={d}
                              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preview image */}
          <div className="col-span-12 md:col-span-5">
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#161616]">
                {services.map((s, i) => (
                  <img
                    key={s.n}
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                      i === active
                        ? "scale-100 opacity-100"
                        : "scale-110 opacity-0"
                    }`}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                      Now viewing / {current.n}
                    </div>
                    <div className="mt-1 font-display text-3xl">
                      {current.title}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0A0A0A]"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
