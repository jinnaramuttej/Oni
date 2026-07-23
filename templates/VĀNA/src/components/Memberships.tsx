import React from "react";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

const PLANS_DATA: Plan[] = [
  {
    name: "Intro Pass",
    price: "$49",
    period: "14 Days",
    description: "Our welcoming pass designed for newcomers to slow down, explore, and find their rhythm in our studio.",
    features: [
      "Unlimited Yoga & Meditation classes",
      "1 Complimentary Breathwork session",
      "Mat & towel rental included",
      "10% discount on boutique retail",
    ],
    isPopular: false,
    ctaText: "Begin Your Path",
  },
  {
    name: "Essential Path",
    price: "$140",
    period: "Month",
    description: "Perfect for those cultivating a balanced, consistent practice while honoring busy weekly schedules.",
    features: [
      "8 Studio classes per month",
      "Access to all Yoga & Meditation styles",
      "Priority online booking",
      "Bring a friend for free (1/month)",
      "15% off workshops & events",
    ],
    isPopular: true,
    ctaText: "Select Essential",
  },
  {
    name: "Unlimited Sanctuary",
    price: "$195",
    period: "Month",
    description: "Complete immersion in mindful living. Unlimited access to our physical space and rich offerings.",
    features: [
      "Unlimited Yoga, Meditation & Breathwork",
      "Complimentary Sound Bath sessions",
      "2 guest passes per month",
      "20% discount on seasonal retreats",
      "Early booking access (14 days ahead)",
      "Complimentary tea ritual after class",
    ],
    isPopular: false,
    ctaText: "Claim Your Sanctuary",
  },
];

export default function Memberships() {
  return (
    <section
      id="memberships"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden paper-texture"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Memberships
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
            Invest in your inner peace
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
            Choose a commitment level that matches your intention. No registration fees, no locking contracts—just a simple, elegant invitation to practice.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS_DATA.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-[24px] p-8 md:p-10 flex flex-col justify-between border transition-all duration-500 relative ${
                plan.isPopular
                  ? "bg-sand border-eucalyptus/40 shadow-md transform lg:-translate-y-4"
                  : "bg-ivory border-stone/30 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-eucalyptus text-ivory px-4 py-1 rounded-full text-[10px] tracking-widest uppercase font-sans">
                  Most Harmonious
                </span>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-charcoal/60 font-sans min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline mb-8">
                  <span className="font-serif text-4xl md:text-5xl font-light text-charcoal">
                    {plan.price}
                  </span>
                  <span className="text-xs text-charcoal/60 font-sans ml-2">
                    / {plan.period}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-stone/30 my-6" />

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-charcoal/80 font-sans font-light">
                      <Check className="w-4 h-4 text-eucalyptus mr-3 mt-0.5 stroke-[2]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => {
                    const el = document.getElementById("booking");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-4 rounded-[20px] font-sans text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    plan.isPopular
                      ? "bg-eucalyptus text-ivory hover:bg-sage hover:text-charcoal shadow-sm"
                      : "bg-stone/20 text-charcoal hover:bg-eucalyptus hover:text-ivory"
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Mentorship Banner */}
        <div className="mt-16 bg-stone/20 border border-stone/30 rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[10px] tracking-widest uppercase text-eucalyptus font-sans font-medium block mb-2">
              Private Path
            </span>
            <h3 className="font-serif text-2xl font-light text-charcoal mb-4">
              Private One-on-One Mentorship
            </h3>
            <p className="text-sm text-charcoal/70 font-sans font-light leading-relaxed">
              Experience a deeply personalized path. Our lead instructors offer bespoke private sessions blending structural biomechanics, somatic breathwork, and tailored meditations to support your unique physical and spiritual needs.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-[20px] bg-ivory border border-stone/30 text-charcoal hover:bg-eucalyptus hover:text-ivory font-sans text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Inquire About Private Sessions
          </button>
        </div>
      </div>
    </section>
  );
}
