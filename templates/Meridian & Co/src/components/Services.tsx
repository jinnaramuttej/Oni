import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Scale,
  ReceiptText,
  Building2,
  Users,
  ShieldCheck,
  BarChart3,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, SectionHeading } from "../lib/ui";

type Service = { icon: LucideIcon; title: string; desc: string };

const SERVICES: Service[] = [
  {
    icon: BookOpen,
    title: "Accounting & Bookkeeping",
    desc: "Cloud-based books, monthly reconciliations and MIS reporting that keep every rupee accounted for.",
  },
  {
    icon: Scale,
    title: "Tax Planning & Income Tax",
    desc: "Proactive structuring, advance-tax management and airtight ITRs for companies, LLPs and HNIs.",
  },
  {
    icon: ReceiptText,
    title: "GST Services",
    desc: "Registration, e-invoicing, return filing and ITC reconciliation — with a spotless notice history.",
  },
  {
    icon: Building2,
    title: "Business Registration",
    desc: "Pvt Ltd, LLP, partnership and startup incorporation with ROC, DPIIT and FEMA handled end to end.",
  },
  {
    icon: Users,
    title: "Payroll Management",
    desc: "Accurate payroll, TDS, PF/ESI and professional-tax compliance for teams of 5 to 5,000.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory, internal and tax audits concluded with findings your board can actually act on.",
  },
  {
    icon: BarChart3,
    title: "Financial Consulting & Virtual CFO",
    desc: "Budgeting, cash-flow discipline, fundraising readiness and unit-economics that investors trust.",
  },
  {
    icon: ClipboardCheck,
    title: "Corporate Compliance",
    desc: "ROC annual filings, board minutes, secretarial records and regulatory calendars, on autopilot.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-mist py-24 md:py-32" aria-label="Our services">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                One firm for the entire <span className="text-green-700">financial lifecycle.</span>
              </>
            }
            description="Eight practices, one accountable team — so nothing falls through the gaps between your accountant, tax advisor and company secretary."
          />
          <Reveal delay={220}>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-2xl border border-navy-200 bg-white px-6 py-3.5 text-sm font-extrabold text-navy-800 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-green-700/40 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              Discuss your requirement
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 100 + Math.floor(i / 4) * 60} className="h-full">
              <li className="h-full">
                <article className="group relative flex h-full flex-col rounded-[20px] border border-slate-200/90 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-green-700/25 hover:shadow-lift">
                  <span className="mb-6 inline-grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-navy-600 transition-all duration-500 group-hover:bg-green-700 group-hover:text-white group-hover:shadow-glow-emerald">
                    <service.icon className="h-[22px] w-[22px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.05rem] font-extrabold leading-snug tracking-tight text-navy-800">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-600">{service.desc}</p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-green-700 transition-colors hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 rounded-lg"
                    aria-label={`Book a consultation for ${service.title}`}
                  >
                    Book a consultation
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
