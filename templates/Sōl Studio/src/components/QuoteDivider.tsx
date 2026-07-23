import RevealSection from './RevealSection';

interface QuoteDividerProps {
  quote: string;
  attribution?: string;
  bgClass?: string;
}

export default function QuoteDivider({ quote, attribution, bgClass = 'bg-eucalyptus' }: QuoteDividerProps) {
  return (
    <section className={`${bgClass} py-24 lg:py-32`}>
      <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
        <RevealSection>
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white/90 italic">
            "{quote}"
          </blockquote>
          {attribution && (
            <p className="mt-6 text-[12px] font-light tracking-widest uppercase text-white/50">
              — {attribution}
            </p>
          )}
        </RevealSection>
      </div>
    </section>
  );
}
