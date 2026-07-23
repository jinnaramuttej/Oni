import { useState, useEffect, useRef, ReactNode } from 'react';
import {
  Menu,
  X,
  ArrowDown,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  Quote,
  Camera,
  Eye,
  Heart,
  Frame,
  Sun,
  Users,
  CheckCircle2,
  CalendarDays,
  Send,
  Clock,
  Sparkles
} from 'lucide-react';

// Instagram icon replacement as SVG since it's not in lucide
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ============================================
// UTILITY COMPONENTS
// ============================================

interface IntersectionObserverProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

function FadeInSection({ children, className = '', threshold = 0.1, delay = 0 }: IntersectionObserverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================
// NAVIGATION
// ============================================

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-matte-black/95 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative z-10">
            <span className="font-serif text-2xl lg:text-3xl tracking-wider text-pure-white">
              LUMIÈRE
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-warm-gray uppercase">
              Studio
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest uppercase text-pure-white/80 hover:text-muted-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="px-6 py-3 bg-muted-gold text-matte-black text-sm tracking-widest uppercase rounded-full hover:bg-pure-white transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-pure-white" />
            ) : (
              <Menu className="w-6 h-6 text-pure-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-matte-black/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-3xl text-pure-white hover:text-muted-gold transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-4 bg-muted-gold text-matte-black text-sm tracking-widest uppercase rounded-full"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen overflow-hidden grain-overlay">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt="Featured photography"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-matte-black/70 via-transparent to-matte-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-matte-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 lg:pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-6">
            Visual Storytelling Since 2008
          </p>
        </div>

        <h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-8 text-pure-white"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <span className="block fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            Capturing
          </span>
          <span className="block text-gradient fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            Moments
          </span>
          <span className="block fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
            That Last
          </span>
        </h1>

        <p
          className="max-w-xl text-lg text-pure-white/70 mb-10 leading-relaxed fade-in-up"
          style={{ animationDelay: '1.1s', animationFillMode: 'both' }}
        >
          Where artistry meets emotion. Every frame tells a story, every shadow holds meaning,
          every light reveals truth.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 fade-in-up"
          style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-pure-white text-matte-black text-sm tracking-widest uppercase rounded-full hover:bg-muted-gold transition-all duration-300"
          >
            View Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#booking"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-pure-white/30 text-pure-white text-sm tracking-widest uppercase rounded-full hover:border-muted-gold hover:text-muted-gold transition-all duration-300"
          >
            Book a Session
            <CalendarDays className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] text-pure-white/50 uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-pure-white/50 scroll-indicator" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentImage
                ? 'bg-muted-gold h-8'
                : 'bg-pure-white/30 hover:bg-pure-white/50'
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================
// INTRO SECTION
// ============================================

function IntroSection() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeInSection>
            <div className="space-y-8">
              <p className="text-muted-gold text-sm tracking-[0.4em] uppercase">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                Every Image{' '}
                <span className="text-gradient">Tells a Story</span>
              </h2>
              <p className="text-lg text-pure-white/60 leading-relaxed">
                At Lumière Studio, we believe photography is more than capturing moments—it's 
                preserving emotions, crafting narratives, and creating timeless art that speaks 
                to the soul.
              </p>
              <p className="text-lg text-pure-white/60 leading-relaxed">
                Our approach blends technical mastery with artistic intuition, resulting in 
                images that are both visually stunning and deeply meaningful.
              </p>
              <div className="flex gap-12 pt-4">
                <div>
                  <span className="block text-4xl font-serif text-muted-gold">15+</span>
                  <span className="text-sm text-warm-gray">Years Experience</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif text-muted-gold">2K+</span>
                  <span className="text-sm text-warm-gray">Projects Done</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif text-muted-gold">50+</span>
                  <span className="text-sm text-warm-gray">Awards Won</span>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                  alt="Photographer at work"
                  className="w-full h-full object-cover image-zoom"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-muted-gold text-matte-black p-6 rounded-2xl">
                <Camera className="w-8 h-8 mb-2" />
                <span className="block font-serif text-xl">Artisan Crafted</span>
                <span className="text-sm">Since 2008</span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEATURED COLLECTIONS
// ============================================

function FeaturedCollections() {
  const collections = [
    {
      id: 1,
      title: 'Ethereal Portraits',
      category: 'Portrait Photography',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      count: '24 Images'
    },
    {
      id: 2,
      title: 'Sacred Unions',
      category: 'Wedding Photography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      count: '36 Images'
    },
    {
      id: 3,
      title: 'Urban Landscapes',
      category: 'Architecture',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      count: '18 Images'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-matte-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
                Curated Works
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
                Featured Collections
              </h2>
            </div>
            <a
              href="#portfolio"
              className="group mt-6 lg:mt-0 inline-flex items-center gap-2 text-pure-white/60 hover:text-muted-gold transition-colors"
            >
              View All Collections
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <FadeInSection key={collection.id} delay={index * 150}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-sm text-muted-gold tracking-widest uppercase">
                      {collection.count}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 p-3 bg-pure-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-4 h-4 text-pure-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-gold tracking-widest uppercase mb-2">
                  {collection.category}
                </p>
                <h3 className="font-serif text-2xl group-hover:text-muted-gold transition-colors duration-300">
                  {collection.title}
                </h3>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO GALLERY
// ============================================

function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'portrait', 'wedding', 'landscape', 'fashion', 'editorial'];

  const projects = [
    {
      id: 1,
      title: 'Golden Hour Dreams',
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Coastal Serenity',
      category: 'landscape',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'Eternal Vows',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      featured: true
    },
    {
      id: 4,
      title: 'Urban Elegance',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
      featured: false
    },
    {
      id: 5,
      title: 'Morning Light',
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
      featured: false
    },
    {
      id: 6,
      title: 'City Stories',
      category: 'editorial',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      featured: true
    },
    {
      id: 7,
      title: 'Autumn Romance',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      featured: false
    },
    {
      id: 8,
      title: 'Nordic Lights',
      category: 'landscape',
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
      featured: true
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-charcoal grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
              Our Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
              Portfolio Gallery
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 text-sm tracking-widest uppercase rounded-full transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-muted-gold text-matte-black'
                      : 'bg-transparent border border-pure-white/20 text-pure-white/60 hover:border-muted-gold hover:text-muted-gold'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project, index) => (
            <FadeInSection key={project.id} delay={index * 100}>
              <article className="break-inside-avoid group cursor-pointer">
                <div className={`relative rounded-2xl overflow-hidden ${
                  project.featured ? 'aspect-[3/4]' : 'aspect-square'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs text-muted-gold tracking-widest uppercase block mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl text-pure-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-3 bg-pure-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pure-white/20">
                      <Heart className="w-4 h-4 text-pure-white" />
                    </button>
                    <button className="p-3 bg-pure-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pure-white/20">
                      <Eye className="w-4 h-4 text-pure-white" />
                    </button>
                  </div>
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="text-center mt-16">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-pure-white/20 text-pure-white text-sm tracking-widest uppercase rounded-full hover:border-muted-gold hover:text-muted-gold transition-all duration-300"
            >
              Load More Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ============================================
// SERVICES SECTION
// ============================================

function ServicesSection() {
  const services = [
    {
      icon: Camera,
      title: 'Portrait Sessions',
      description: 'Intimate, emotive portraits that capture your authentic self with artistic flair and timeless elegance.',
      price: 'From $450'
    },
    {
      icon: Heart,
      title: 'Wedding Photography',
      description: 'Documentary-style wedding coverage that preserves every precious moment of your celebration.',
      price: 'From $3,500'
    },
    {
      icon: Sun,
      title: 'Landscape & Travel',
      description: 'Breathtaking vistas and travel stories captured with cinematic precision and emotional depth.',
      price: 'From $250'
    },
    {
      icon: Frame,
      title: 'Editorial & Fashion',
      description: 'High-end editorial work for magazines, brands, and fashion campaigns with distinctive vision.',
      price: 'Custom Quote'
    },
    {
      icon: Sparkles,
      title: 'Commercial Projects',
      description: 'Professional imagery for brands that demands exceptional quality and creative direction.',
      price: 'Custom Quote'
    },
    {
      icon: Users,
      title: 'Workshops & Mentoring',
      description: 'Learn the craft from a seasoned professional through immersive hands-on experiences.',
      price: 'From $150'
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-matte-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
              What We Offer
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Photography Services
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-pure-white/60">
              Every service is tailored to your unique vision, delivering images that exceed 
              expectations and stand the test of time.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <FadeInSection key={service.title} delay={index * 100}>
              <article className="group p-8 rounded-2xl border border-pure-white/10 hover:border-muted-gold/50 transition-all duration-500 bg-charcoal/50 hover:bg-charcoal">
                <service.icon className="w-10 h-10 text-muted-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-serif text-xl mb-3">{service.title}</h3>
                <p className="text-pure-white/60 leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-gold font-medium">{service.price}</span>
                  <ArrowRight className="w-4 h-4 text-pure-white/30 group-hover:text-muted-gold group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// ABOUT SECTION
// ============================================

function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-charcoal grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeInSection>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Portrait of the photographer"
                  className="w-full h-full object-cover image-zoom"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-muted-gold/30 rounded-2xl -z-10" />
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="space-y-8">
              <p className="text-muted-gold text-sm tracking-[0.4em] uppercase">
                The Artist
              </p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Meet{' '}
                <span className="text-gradient">Alexander Lumière</span>
              </h2>
              <div className="space-y-6 text-pure-white/60 leading-relaxed">
                <p>
                  With over fifteen years behind the lens, I've dedicated my career to the art 
                  of visual storytelling. My journey began on the streets of Paris, where I 
                  discovered that photography is the universal language of emotion.
                </p>
                <p>
                  Having trained at the Royal Academy of Fine Arts and mentored under masters 
                  like Henri Cartier-Bresson's protégés, I bring a unique blend of classical 
                  technique and contemporary vision to every project.
                </p>
                <p>
                  My work has been featured in Vogue, National Geographic, and displayed in 
                  galleries from New York to Tokyo. But my greatest achievement remains the 
                  trust my clients place in me to capture their most meaningful moments.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-gold">
                  <Award className="w-4 h-4" />
                  <span>Hasselblad Ambassador</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-gold">
                  <Star className="w-4 h-4" />
                  <span>WPPI Master</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-gold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AGPA Member</span>
                </div>
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-muted-gold text-matte-black text-sm tracking-widest uppercase rounded-full hover:bg-pure-white transition-all duration-300"
              >
                Work With Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS
// ============================================

function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Lumière Studio didn't just photograph our wedding—they captured the very essence of our love story. Every image is a masterpiece we'll treasure forever.",
      author: "Isabella & Marcus Chen",
      role: "Wedding Clients",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80"
    },
    {
      id: 2,
      quote: "Working with Alexander transformed how I see myself. The portrait session was less about photography and more about discovering beauty I never knew existed.",
      author: "Sofia Andersson",
      role: "Portrait Client",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
    },
    {
      id: 3,
      quote: "The commercial campaign exceeded every expectation. The team's creative vision and attention to detail elevated our brand beyond what we imagined possible.",
      author: "James Richardson",
      role: "Creative Director, Aura Cosmetics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 lg:py-32 bg-matte-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
              Client Stories
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
              Words of Appreciation
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-muted-gold/30 mx-auto mb-8" />
            
            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === activeTestimonial
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8 text-pure-white/90">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <cite className="block text-pure-white font-medium not-italic">
                        {testimonial.author}
                      </cite>
                      <span className="text-sm text-warm-gray">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-muted-gold w-8'
                      : 'bg-pure-white/20 hover:bg-pure-white/40'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ============================================
// AWARDS SECTION
// ============================================

function AwardsSection() {
  const awards = [
    { year: '2024', title: 'International Photography Awards', category: 'Gold, Portrait' },
    { year: '2024', title: 'Sony World Photography', category: 'Finalist, Documentary' },
    { year: '2023', title: 'WPPI Awards', category: 'Grand Prize, Wedding' },
    { year: '2023', title: 'Hasselblad Masters', category: 'Winner, People' },
    { year: '2022', title: 'Lumu Awards', category: 'Best Editorial Series' },
    { year: '2022', title: 'Analog Awards', category: 'Gold, Commercial' }
  ];

  const publications = [
    'Vogue Italia', 'National Geographic', 'Harper\'s Bazaar',
    'The New York Times', 'Wallpaper*', 'Kinfolk'
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Awards */}
          <FadeInSection>
            <div>
              <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
                Recognition
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12">
                Awards & Honors
              </h2>
              
              <div className="space-y-6">
                {awards.map((award, index) => (
                  <FadeInSection key={index} delay={index * 100}>
                    <div className="flex gap-6 pb-6 border-b border-pure-white/10">
                      <span className="text-muted-gold font-serif text-xl w-16 shrink-0">
                        {award.year}
                      </span>
                      <div>
                        <h3 className="font-medium text-lg">{award.title}</h3>
                        <p className="text-warm-gray text-sm">{award.category}</p>
                      </div>
                      <Award className="w-5 h-5 text-muted-gold/50 ml-auto shrink-0" />
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Publications & Gallery */}
          <FadeInSection delay={200}>
            <div className="space-y-12">
              <div>
                <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
                  Featured In
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
                  Publications
                </h2>
                
                <div className="flex flex-wrap gap-4">
                  {publications.map((pub) => (
                    <span
                      key={pub}
                      className="px-6 py-3 border border-pure-white/20 rounded-full text-pure-white/60 hover:border-muted-gold hover:text-muted-gold transition-colors duration-300"
                    >
                      {pub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80"
                    alt="Behind the scenes"
                    className="w-full h-full object-cover image-zoom"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="p-6 bg-pure-white/20 backdrop-blur-sm rounded-full hover:bg-muted-gold transition-colors duration-300 group">
                      <Play className="w-8 h-8 text-pure-white group-hover:text-matte-black ml-1" />
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-muted-gold text-matte-black px-6 py-3 rounded-full text-sm font-medium">
                  Watch Our Story
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ============================================
// BEHIND THE SCENES
// ============================================

function BehindTheScenesSection() {
  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We begin with an in-depth consultation to understand your vision, style, and the story you want to tell.'
    },
    {
      step: '02',
      title: 'Creative Direction',
      description: 'Our team crafts a detailed creative brief, location scouting, mood boards, and timeline for your session.'
    },
    {
      step: '03',
      title: 'The Session',
      description: 'An immersive, enjoyable experience where artistry meets comfort. We guide you every step of the way.'
    },
    {
      step: '04',
      title: 'Curation & Delivery',
      description: 'Meticulous post-production and artistic editing ensure every delivered image meets our exacting standards.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-matte-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
              Our Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Behind the Lens
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-pure-white/60">
              Every masterpiece begins with intention. Here's how we transform your vision 
              into timeless imagery.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <FadeInSection key={step.step} delay={index * 150}>
              <article className="relative">
                <span className="block font-serif text-6xl text-muted-gold/20 mb-4">
                  {step.step}
                </span>
                <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                <p className="text-pure-white/60 leading-relaxed">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-12 h-px bg-gradient-to-r from-muted-gold/50 to-transparent" />
                )}
              </article>
            </FadeInSection>
          ))}
        </div>

        {/* Gallery Preview */}
        <FadeInSection>
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&q=80',
              'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80',
              'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
              'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400&q=80'
            ].map((img, index) => (
              <div key={index} className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={img}
                  alt={`Behind the scenes ${index + 1}`}
                  className="w-full h-full object-cover image-zoom"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ============================================
// BOOKING SECTION
// ============================================

function BookingSection() {
  const [selectedPackage, setSelectedPackage] = useState('signature');

  const packages = [
    {
      id: 'essential',
      name: 'Essential',
      price: '$450',
      features: [
        '1-hour session',
        '1 location',
        '15 edited images',
        'Online gallery',
        'Personal use license'
      ]
    },
    {
      id: 'signature',
      name: 'Signature',
      price: '$850',
      features: [
        '2-hour session',
        '2 locations',
        '40 edited images',
        'Online gallery',
        'Print-ready files',
        'Styling consultation',
        'Rush delivery available'
      ],
      popular: true
    },
    {
      id: 'luxe',
      name: 'Luxe Experience',
      price: '$1,800',
      features: [
        'Full day coverage',
        'Multiple locations',
        '100+ edited images',
        'Private gallery',
        'Fine art prints',
        'Hair & makeup included',
        'Custom album design',
        'Priority support'
      ]
    }
  ];

  return (
    <section id="booking" className="py-24 lg:py-32 bg-charcoal grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
              Begin Your Journey
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Book Your Session
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-pure-white/60">
              Select the experience that speaks to you, and let's create something extraordinary together.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {packages.map((pkg, index) => (
            <FadeInSection key={pkg.id} delay={index * 150}>
              <article
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative p-8 rounded-2xl border cursor-pointer transition-all duration-500 ${
                  selectedPackage === pkg.id
                    ? 'border-muted-gold bg-muted-gold/10 scale-[1.02]'
                    : 'border-pure-white/10 hover:border-pure-white/30'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-8 px-4 py-1 bg-muted-gold text-matte-black text-xs tracking-widest uppercase rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-2xl mb-2">{pkg.name}</h3>
                <p className="text-4xl font-serif text-muted-gold mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-pure-white/70">
                      <CheckCircle2 className="w-4 h-4 text-muted-gold shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? 'bg-muted-gold text-matte-black'
                      : 'bg-pure-white/10 text-pure-white hover:bg-pure-white/20'
                  }`}
                >
                  Select Package
                </button>
              </article>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="max-w-2xl mx-auto">
            <div className="bg-matte-black p-8 lg:p-12 rounded-2xl border border-pure-white/10">
              <h3 className="font-serif text-2xl mb-6 text-center">Request a Booking</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-pure-white/60 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-charcoal border border-pure-white/10 rounded-lg text-pure-white focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-pure-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-charcoal border border-pure-white/10 rounded-lg text-pure-white focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-pure-white/60 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-charcoal border border-pure-white/10 rounded-lg text-pure-white focus:border-muted-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-pure-white/60 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-charcoal border border-pure-white/10 rounded-lg text-pure-white focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-pure-white/60 mb-2">Tell Us About Your Vision</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-charcoal border border-pure-white/10 rounded-lg text-pure-white focus:border-muted-gold focus:outline-none transition-colors resize-none"
                    placeholder="Share your ideas, inspiration, and what matters most to you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-muted-gold text-matte-black rounded-full text-sm tracking-widest uppercase font-medium hover:bg-pure-white transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ============================================
// CONTACT SECTION
// ============================================

function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-matte-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeInSection>
            <div>
              <p className="text-muted-gold text-sm tracking-[0.4em] uppercase mb-4">
                Get in Touch
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
                Let's Create{' '}
                <span className="text-gradient">Together</span>
              </h2>
              <p className="text-lg text-pure-white/60 mb-12">
                Whether you have a clear vision or simply a feeling you want to capture, 
                we're here to bring your story to life. Every great photograph begins with 
                a conversation.
              </p>

              <div className="space-y-6">
                <a href="mailto:hello@lumierestudio.com" className="flex items-center gap-4 text-pure-white/60 hover:text-muted-gold transition-colors">
                  <div className="p-3 bg-charcoal rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>hello@lumierestudio.com</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-4 text-pure-white/60 hover:text-muted-gold transition-colors">
                  <div className="p-3 bg-charcoal rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </a>
                <div className="flex items-center gap-4 text-pure-white/60">
                  <div className="p-3 bg-charcoal rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>123 Artisan Avenue, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-4 text-pure-white/60">
                  <div className="p-3 bg-charcoal rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <a href="#" className="p-3 bg-charcoal rounded-lg hover:bg-muted-gold hover:text-matte-black transition-all duration-300" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-charcoal rounded-lg hover:bg-muted-gold hover:text-matte-black transition-all duration-300" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
                  alt="Studio location"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 lg:-left-12 bg-muted-gold text-matte-black p-6 rounded-2xl">
                <div className="text-3xl font-serif mb-1">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  const footerLinks = {
    'Services': ['Portrait Photography', 'Wedding Coverage', 'Commercial Work', 'Editorial', 'Workshops'],
    'Company': ['About Us', 'Our Team', 'Careers', 'Press', 'Blog'],
    'Support': ['FAQs', 'Contact', 'Privacy Policy', 'Terms of Service', 'Accessibility']
  };

  return (
    <footer className="bg-charcoal border-t border-pure-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="font-serif text-2xl lg:text-3xl tracking-wider text-pure-white">
                LUMIÈRE
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-warm-gray uppercase">
                Studio
              </span>
            </a>
            <p className="text-pure-white/60 leading-relaxed max-w-sm mb-6">
              Where artistry meets emotion. Creating timeless visual stories for discerning 
              clients since 2008.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-matte-black rounded-lg hover:bg-muted-gold hover:text-matte-black transition-all duration-300" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-matte-black rounded-lg hover:bg-muted-gold hover:text-matte-black transition-all duration-300" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-matte-black rounded-lg hover:bg-muted-gold hover:text-matte-black transition-all duration-300" aria-label="Phone">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-serif text-lg mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-pure-white/60 hover:text-muted-gold transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-pure-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-pure-white/40">
            © {new Date().getFullYear()} Lumière Studio. All rights reserved.
          </p>
          <p className="text-sm text-pure-white/40">
            Crafted with <Heart className="w-4 h-4 text-muted-gold inline" /> in New York
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================

function App() {
  return (
    <div className="min-h-screen bg-matte-black text-pure-white overflow-x-hidden">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />

      <Navigation />
      <main>
        <HeroSection />
        <IntroSection />
        <FeaturedCollections />
        <PortfolioGallery />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <AwardsSection />
        <BehindTheScenesSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
