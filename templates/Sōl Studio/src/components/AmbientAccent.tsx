interface AmbientAccentProps {
  className?: string;
  variant?: 'circle' | 'blob';
  color?: string;
}

export default function AmbientAccent({
  className = '',
  variant = 'circle',
  color = 'bg-sage/10'
}: AmbientAccentProps) {
  if (variant === 'blob') {
    return (
      <div
        className={`absolute pointer-events-none animate-breathe ${color} ${className}`}
        style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
        aria-hidden="true"
      />
    );
  }
  
  return (
    <div
      className={`absolute pointer-events-none rounded-full animate-breathe ${color} ${className}`}
      aria-hidden="true"
    />
  );
}
