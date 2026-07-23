import { useReveal } from "../hooks/useReveal";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconClock,
  IconArrowUpRight,
  IconLinkedin,
  IconTwitter,
  IconInstagram,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

const offices = [
  {
    city: "Mumbai",
    role: "Headquarters",
    address: "Level 14, Platina Tower, BKC, Mumbai 400 051",
    phone: "+91 22 4000 0000",
    email: "mumbai@meridianca.in",
  },
  {
    city: "Bengaluru",
    role: "Tech & SaaS practice",
    address: "91 Springboard, Koramangala, Bengaluru 560 034",
    phone: "+91 80 4000 0000",
    email: "blr@meridianca.in",
  },
  {
    city: "Singapore",
    role: "Global expansion",
    address: "1 Raffles Place, #20-61, Singapore 048616",
    phone: "+65 0000 0000",
    email: "sg@meridianca.in",
  },
];

type IconC = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

function ContactPill({
  icon: Icon,
  label,
  value,
}: {
  icon: IconC;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </div>
        <div className="text-[13.5px] font-semibold text-navy-700">{value}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={["reveal", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-paper px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Get in touch
              </div>
              <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
                Three offices, one{" "}
                <span className="italic font-medium text-emerald-700">dedicated team.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
              <ContactPill
                icon={IconPhone}
                label="Call us"
                value="+91 22 4000 0000"
              />
              <ContactPill
                icon={IconMail}
                label="Email"
                value="hello@meridianca.in"
              />
              <ContactPill
                icon={IconClock}
                label="Hours"
                value="Mon — Sat · 9 to 7"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {offices.map((o) => (
            <div
              key={o.city}
              className="group flex flex-col rounded-[20px] border border-slate-200/80 bg-paper p-7 transition-all hover:-translate-y-1 hover:border-navy-700/30 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.16)]"
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-[28px] font-semibold tracking-[-0.02em] text-navy-700">
                  {o.city}
                </div>
                <IconArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-700" />
              </div>
              <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                {o.role}
              </div>
              <div className="my-6 h-px w-full bg-slate-200" />
              <div className="space-y-3 text-[13.5px] text-slate-500">
                <div className="flex items-start gap-2.5">
                  <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" />
                  <span>{o.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <IconPhone className="h-4 w-4 text-navy-700" />
                  <a href={`tel:${o.phone}`} className="hover:text-navy-700">
                    {o.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <IconMail className="h-4 w-4 text-navy-700" />
                  <a href={`mailto:${o.email}`} className="hover:text-navy-700">
                    {o.email}
                  </a>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2">
                {[IconLinkedin, IconTwitter, IconInstagram].map((I, idx) => {
                  const Icon = I;
                  return (
                    <a
                      key={idx}
                      href="#"
                      className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-navy-700 hover:text-navy-700"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
