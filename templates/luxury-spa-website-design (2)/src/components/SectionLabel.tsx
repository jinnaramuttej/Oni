import FadeIn from './FadeIn';

interface SectionLabelProps {
  label: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export default function SectionLabel({
  label,
  title,
  description,
  align = 'center',
  light = false,
}: SectionLabelProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const labelColor = light ? 'text-champagne-light' : 'text-champagne';
  const titleColor = light ? 'text-white' : 'text-charcoal';
  const descColor = light ? 'text-white/70' : 'text-charcoal-light';

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <FadeIn>
        <span
          className={`inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase ${labelColor} mb-4`}
        >
          {label}
        </span>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2
          className={`font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-tight ${titleColor}`}
        >
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className={`mt-6 text-base md:text-lg leading-relaxed font-light ${descColor}`}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
