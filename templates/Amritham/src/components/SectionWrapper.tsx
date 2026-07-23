import { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: 'ivory' | 'warm-white' | 'brown' | 'ivory-dark';
}

export function SectionWrapper({ children, className = '', id, bg = 'ivory' }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const bgClass = {
    'ivory': 'bg-ivory',
    'warm-white': 'bg-warm-white',
    'brown': 'bg-brown-dark text-ivory',
    'ivory-dark': 'bg-ivory-dark',
  }[bg];

  return (
    <section
      id={id}
      ref={ref}
      className={`fade-up ${isVisible ? 'visible' : ''} ${bgClass} ${className}`}
    >
      {children}
    </section>
  );
}
