import { AnimatedSection } from './AnimatedSection';
import { Smile, ScanLine, Sparkles, CircleDot, ShieldCheck, Baby, ArrowRight, Clock } from 'lucide-react';

const treatments = [
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Veneers, bonding, and smile makeovers designed to give you a naturally radiant, confident smile.',
    duration: '1–3 visits',
    image: 'https://images.pexels.com/photos/3762400/pexels-photo-3762400.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    icon: ScanLine,
    title: 'Invisalign & Orthodontics',
    description: 'Clear aligners and modern orthodontic solutions for straighter teeth — discreetly and comfortably.',
    duration: '6–18 months',
    image: 'https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    icon: Smile,
    title: 'Teeth Whitening',
    description: 'Professional in-office and take-home whitening treatments for a brilliantly bright, stain-free smile.',
    duration: '45–60 min',
    image: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    icon: CircleDot,
    title: 'Dental Implants',
    description: 'Permanent, natural-looking tooth replacements using titanium implants and precision-crafted crowns.',
    duration: '2–6 months',
    image: 'https://images.pexels.com/photos/5355698/pexels-photo-5355698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    icon: ShieldCheck,
    title: 'Preventive Care',
    description: 'Comprehensive cleanings, exams, and digital X-rays to keep your oral health in peak condition.',
    duration: '30–45 min',
    image: 'https://images.pexels.com/photos/6627353/pexels-photo-6627353.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    icon: Baby,
    title: 'Family & Pediatric',
    description: 'Gentle, age-appropriate dental care for every member of your family — from toddlers to grandparents.',
    duration: '30–45 min',
    image: 'https://images.pexels.com/photos/3845553/pexels-photo-3845553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
];

export function Treatments() {
  return (
    <section id="treatments" className="py-24 lg:py-32 bg-light-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full bg-teal-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full bg-sky-accent/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">Our Treatments</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
            Comprehensive Dental Care,{' '}
            <span className="text-teal-primary">Tailored to You</span>
          </h2>
          <p className="mt-4 text-lg text-slate-text/70 leading-relaxed">
            From preventive care to advanced cosmetic procedures, our specialists deliver personalized treatments using the latest dental technology.
          </p>
        </AnimatedSection>

        {/* Treatment Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <AnimatedSection key={treatment.title} delay={index * 100}>
              <div className="group bg-white rounded-[20px] overflow-hidden border border-gray-100/80 shadow-sm card-hover h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center border border-white/30">
                      <treatment.icon className="w-5 h-5 text-teal-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-teal-primary transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-sm text-slate-text/70 leading-relaxed flex-1">
                    {treatment.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-text/50">
                      <Clock className="w-3.5 h-3.5" />
                      {treatment.duration}
                    </div>
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-primary hover:text-teal-600 transition-colors group/link"
                    >
                      Book Now
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
