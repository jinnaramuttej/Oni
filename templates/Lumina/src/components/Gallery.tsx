import { AnimatedSection } from './AnimatedSection';
import { ArrowRight } from 'lucide-react';

const galleryItems = [
  {
    title: 'Smile Makeover',
    procedure: 'Veneers & Whitening',
    image: 'https://images.pexels.com/photos/3762400/pexels-photo-3762400.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Clear Aligners',
    procedure: 'Invisalign Treatment',
    image: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    span: 'col-span-1 sm:col-span-2 row-span-1',
  },
  {
    title: 'Dental Implants',
    procedure: 'Full Restoration',
    image: 'https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    span: 'col-span-1 sm:col-span-2 row-span-1',
  },
  {
    title: 'Teeth Whitening',
    procedure: 'Professional Whitening',
    image: 'https://images.pexels.com/photos/3845759/pexels-photo-3845759.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Cosmetic Bonding',
    procedure: 'Composite Veneers',
    image: 'https://images.pexels.com/photos/3762441/pexels-photo-3762441.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Full Smile Design',
    procedure: 'Complete Transformation',
    image: 'https://images.pexels.com/photos/7803063/pexels-photo-7803063.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Orthodontic Care',
    procedure: 'Alignment & Perfection',
    image: 'https://images.pexels.com/photos/3845551/pexels-photo-3845551.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600',
    span: 'col-span-1 row-span-1',
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-light-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">Smile Gallery</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
            Real Patients,{' '}
            <span className="text-teal-primary">Real Transformations</span>
          </h2>
          <p className="mt-4 text-lg text-slate-text/70 leading-relaxed">
            See the life-changing results our patients have achieved. Every smile tells a story of renewed confidence.
          </p>
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 80} className={item.span}>
              <div className="group relative h-64 sm:h-72 rounded-[20px] overflow-hidden cursor-pointer">
                <img
                  src={item.image}
                  alt={`${item.title} - ${item.procedure} result at Lumina Dental`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm text-teal-light font-medium">{item.procedure}</p>
                  <h3 className="text-lg font-bold text-white font-heading">{item.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
