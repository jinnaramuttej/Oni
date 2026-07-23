import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowUpRight, Calculator, FileText, Receipt, Building2, Wallet, TrendingUp, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Calculator,
    title: 'Accounting & Bookkeeping',
    description: 'Comprehensive financial record management with real-time reporting, ensuring your books are always audit-ready and compliant.',
    features: ['Financial Statements', 'Ledger Management', 'Reconciliation'],
  },
  {
    icon: FileText,
    title: 'Tax Planning & Filing',
    description: 'Strategic tax optimization that minimizes liability while maximizing savings. Expert filing for individuals and businesses alike.',
    features: ['Income Tax', 'Corporate Tax', 'Tax Advisory'],
  },
  {
    icon: Receipt,
    title: 'GST Services',
    description: 'End-to-end GST compliance including registration, return filing, refund claims, and audit support for seamless operations.',
    features: ['GST Registration', 'Return Filing', 'Compliance'],
  },
  {
    icon: Building2,
    title: 'Business Registration',
    description: 'Hassle-free company incorporation, LLP formation, and startup registration with complete documentation support.',
    features: ['Company Formation', 'LLP Registration', 'Startup India'],
  },
  {
    icon: Wallet,
    title: 'Payroll Management',
    description: 'Automated payroll processing, statutory compliance, and employee benefits administration for businesses of all sizes.',
    features: ['Salary Processing', 'PF & ESI', 'TDS Compliance'],
  },
  {
    icon: TrendingUp,
    title: 'Financial Consulting',
    description: 'Data-driven financial strategy, investment advisory, and business growth planning for sustainable long-term success.',
    features: ['Business Strategy', 'Investment Advisory', 'Risk Assessment'],
  },
  {
    icon: BarChart3,
    title: 'Audit & Assurance',
    description: 'Independent statutory and internal audits with detailed findings, actionable recommendations, and full compliance assurance.',
    features: ['Statutory Audit', 'Internal Audit', 'Due Diligence'],
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 lg:py-32 bg-surface">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-1.5 mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs font-semibold text-emerald tracking-wider uppercase">Our Services</span>
          </div>
          <h2
            className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight mb-4 transition-all duration-600 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Comprehensive Financial
            <br />
            Solutions
          </h2>
          <p
            className={`text-base lg:text-lg text-slate-text leading-relaxed transition-all duration-600 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From foundational accounting to strategic consulting, our services are
            designed to support every stage of your business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group relative rounded-[20px] bg-white border border-gray-100 p-7 lg:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] hover:border-emerald/15 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${i === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ transitionDelay: isVisible ? `${200 + i * 80}ms` : '0ms' }}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/[0.04] mb-5 group-hover:bg-emerald/10 transition-all duration-300">
                <service.icon className="w-5.5 h-5.5 text-navy group-hover:text-emerald transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-navy mb-3 group-hover:text-emerald transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-slate-text leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((f, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center rounded-lg bg-surface px-3 py-1 text-xs font-medium text-slate-text"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-emerald transition-colors duration-300"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Hover accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
