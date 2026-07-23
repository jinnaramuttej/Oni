import { useInView } from '../hooks/useInView';

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ tag, title, description, align = 'center', light = false }: SectionHeaderProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`mb-16 lg:mb-20 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-xl'} ${
        isInView ? 'animate-fade-up' : 'opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="gold-line" />
        <span className={`text-[12px] font-semibold tracking-[0.2em] uppercase ${light ? 'text-gold/80' : 'text-gold'}`}>
          {tag}
        </span>
        <div className="gold-line" />
      </div>
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight ${light ? 'text-ivory' : 'text-midnight'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base lg:text-lg leading-relaxed ${light ? 'text-ivory/60' : 'text-slate-custom'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
