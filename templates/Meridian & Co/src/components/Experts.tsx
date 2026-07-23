import { ExternalLink, Mail } from "lucide-react";
import { Reveal, SectionHeading, LazyImage } from "../lib/ui";

type Expert = {
  name: string;
  role: string;
  focus: string;
  tags: string[];
  image: string;
};

const EXPERTS: Expert[] = [
  {
    name: "Rakesh Mehra",
    role: "Managing Partner · FCA",
    focus: "Tax & Audit",
    tags: ["Tax litigation", "Assurance"],
    image:
      "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
  },
  {
    name: "Ananya Sharma",
    role: "Partner · ACA",
    focus: "GST & Indirect Tax",
    tags: ["E-invoicing", "ITC strategy"],
    image:
      "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
  },
  {
    name: "Vikram Kapoor",
    role: "Partner · FCA",
    focus: "Virtual CFO & Advisory",
    tags: ["Fundraising", "Cash flow"],
    image:
      "https://images.pexels.com/photos/18165006/pexels-photo-18165006.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
  },
  {
    name: "Priya Nair",
    role: "Director · Payroll & Compliance",
    focus: "People Operations",
    tags: ["Payroll", "ROC, PF & ESI"],
    image:
      "https://images.pexels.com/photos/20022702/pexels-photo-20022702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640",
  },
];

export default function Experts() {
  return (
    <section id="experts" className="bg-mist py-24 md:py-32" aria-label="Meet the experts">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Meet the experts"
            title={
              <>
                Chartered minds behind <span className="text-green-700">your numbers.</span>
              </>
            }
            description="Forty-two CAs, company secretaries and payroll specialists — led by partners who still review every critical filing personally."
          />
          <Reveal delay={220}>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-card">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-700" />
              </span>
              <p className="text-sm font-bold text-slate-600">
                <span className="font-extrabold text-navy-800">3 partners</span> available for new engagements
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 xl:grid-cols-4">
          {EXPERTS.map((expert, i) => (
            <Reveal key={expert.name} delay={i * 110}>
              <li className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200/90 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <div className="relative">
                    <LazyImage
                      src={expert.image}
                      alt={`Portrait of ${expert.name}`}
                      className="aspect-[4/5]"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    {/* Contact affordances appear on hover */}
                    <div className="absolute bottom-4 right-4 flex translate-y-2 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <a
                        href="#contact"
                        aria-label={`Schedule a call with ${expert.name}`}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-navy-700 shadow-card backdrop-blur transition-colors hover:bg-green-700 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a
                        href="#contact"
                        aria-label={`Email ${expert.name}`}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-navy-700 shadow-card backdrop-blur transition-colors hover:bg-green-700 hover:text-white"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-700 backdrop-blur">
                      {expert.focus}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-extrabold tracking-tight text-navy-800">{expert.name}</h3>
                    <p className="mt-0.5 text-xs font-extrabold uppercase tracking-[0.12em] text-green-700">{expert.role}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-navy-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
