import { cn } from '../utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-500 ease-out rounded-[20px] cursor-pointer';

  const variants = {
    primary:
      'bg-champagne text-white hover:bg-champagne-dark shadow-sm hover:shadow-md',
    secondary:
      'bg-charcoal text-white hover:bg-charcoal-light shadow-sm hover:shadow-md',
    outline:
      'border border-champagne text-champagne hover:bg-champagne hover:text-white',
    ghost:
      'text-charcoal hover:text-champagne',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-sm',
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
