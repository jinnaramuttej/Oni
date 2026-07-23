import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeaderProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        'max-w-3xl transition-all duration-700',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
    >
      <span
        className={cn(
          'inline-flex items-center gap-3 text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase',
          dark ? 'text-gold-light' : 'text-gold'
        )}
      >
        <span className={cn('w-8 h-px', dark ? 'bg-gold-light' : 'bg-gold')} />
        {eyebrow}
        <span className={cn('w-8 h-px', dark ? 'bg-gold-light' : 'bg-gold')} />
      </span>
      <h2
        className={cn(
          'mt-4 md:mt-6 font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.1] font-light',
          dark ? 'text-white' : 'text-charcoal'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 md:mt-6 text-base md:text-lg leading-relaxed font-light',
            dark ? 'text-white/60' : 'text-slate'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
