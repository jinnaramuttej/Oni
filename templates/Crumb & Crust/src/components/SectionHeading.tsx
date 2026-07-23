import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({ subtitle, title, description, align = 'center', light = false }: SectionHeadingProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12 lg:mb-16 transition-all duration-700',
        align === 'center' ? 'text-center' : 'text-left',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {subtitle && (
        <span className={cn(
          'inline-block text-xs uppercase tracking-[0.25em] mb-4 font-medium',
          light ? 'text-gold/80' : 'text-caramel'
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        'font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight',
        light ? 'text-ivory' : 'text-chocolate'
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 max-w-2xl text-base lg:text-lg font-light leading-relaxed',
          align === 'center' ? 'mx-auto' : '',
          light ? 'text-white/60' : 'text-warm-gray'
        )}>
          {description}
        </p>
      )}
      {/* Decorative divider */}
      <div className={cn(
        'mt-6 flex items-center gap-3',
        align === 'center' ? 'justify-center' : 'justify-start'
      )}>
        <div className={cn('h-px w-12', light ? 'bg-gold/30' : 'bg-caramel/30')} />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill={light ? '#C7A96B' : '#C08A52'} opacity="0.5" />
        </svg>
        <div className={cn('h-px w-12', light ? 'bg-gold/30' : 'bg-caramel/30')} />
      </div>
    </div>
  );
}
