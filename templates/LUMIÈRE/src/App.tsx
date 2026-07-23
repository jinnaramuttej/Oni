import { useState, useEffect } from 'react';
import { 
  Camera, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown,
  Heart,
  CheckCircle,
  Quote
} from 'lucide-react';

// Premium photography data
const portfolioItems = [
  { id: 1, category: 'Portrait', title: 'Ethereal Moments', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', size: 'large' },
  { id: 2, category: 'Wedding', title: 'Golden Hour Vows', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', size: 'medium' },
  { id: 3, category: 'Fashion', title: 'Urban Elegance', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', size: 'medium' },
  { id: 4, category: 'Landscape', title: 'Mountain Serenity', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', size: 'large' },
  { id: 5, category: 'Architecture', title: 'Modern Lines', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', size: 'medium' },
  { id: 6, category: 'Lifestyle', title: 'Candid Stories', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', size: 'medium' },
  { id: 7, category: 'Portrait', title: 'Soulful Gaze', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', size: 'medium' },
  { id: 8, category: 'Travel', title: 'Wanderlust', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', size: 'large' },
];

const services = [
  { 
    icon: Camera, 
    title: 'Portrait Photography', 
    description: 'Capturing the essence of your personality through artistic portraiture that tells your unique story.',
    price: 'From $500'
  },
  { 
    icon: Heart, 
    title: 'Wedding & Events', 
    description: 'Documenting your most precious moments with cinematic storytelling and timeless elegance.',
    price: 'From $3,500'
  },
  { 
    icon: Star, 
    title: 'Fashion & Editorial', 
    description: 'Creating stunning visual narratives for brands, magazines, and creative campaigns.',
    price: 'From $2,000'
  },
  { 
    icon: Award, 
    title: 'Commercial Photography', 
    description: 'Elevating your brand with professional imagery that connects with your audience.',
    price: 'From $1,500'
  },
];

const testimonials = [
  {
    name: 'Isabella Martinez',
    role: 'Creative Director, Vogue',
    content: 'The most exceptional photographer I have worked with. Every image tells a story that transcends the ordinary.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
  },
  {
    name: 'Alexander Chen',
    role: 'Founder, Luxury Brands Co.',
    content: 'An artist who understands light, emotion, and composition at the highest level. Truly world-class work.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    name: 'Sophia Williams',
    role: 'Bride',
    content: 'Our wedding photos are absolute masterpieces. Every moment was captured with such grace and artistry.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
  },
];

const awards = [
  { year: '2024', title: 'International Photography Awards', category: 'Portrait Photographer of the Year' },
  { year: '2023', title: 'World Press Photo', category: 'Honorable Mention' },
  { year: '2023', title: 'Sony World Photography Awards', category: 'Professional Winner' },
  { year: '2022', title: 'Hasselblad Masters', category: 'Finalist' },
];

const publications = [
  'Vogue', 'Harper\'s Bazaar', 'National Geographic', 'Architectural Digest', 'GQ', 'Elle'
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Intersection Observer for fade-up animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
      
      return () => observer.disconnect();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const categories = ['All', 'Portrait', 'Wedding', 'Fashion', 'Landscape', 'Architecture', 'Lifestyle', 'Travel'];
  
  const filteredPortfolio = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAFAFA] font-sans antialiased">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center">
                <Camera className="w-5 h-5 text-[#0D0D0D]" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-serif tracking-wide">LUMIÈRE</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Portfolio', 'Services', 'About', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm tracking-wide text-[#737373] hover:text-[#FAFAFA] transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('booking')}
                className="px-6 py-2.5 bg-[#B58B52] text-[#0D0D0D] text-sm font-medium tracking-wide rounded-full hover:bg-[#C9A066] transition-all duration-300 hover:shadow-lg hover:shadow-[#B58B52]/20"
              >
                Book Session
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-[#FAFAFA]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 py-6 bg-[#0D0D0D]/98 backdrop-blur-md border-t border-[#1A1A1A]">
            {['Portfolio', 'Services', 'About', 'Testimonials', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 text-[#737373] hover:text-[#FAFAFA] transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('booking')}
              className="w-full mt-4 px-6 py-3 bg-[#B58B52] text-[#0D0D0D] font-medium rounded-full"
            >
              Book Session
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
            alt="Hero photography"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#0D0D0D]/40 to-[#0D0D0D]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" data-animate>
          <p className={`text-[#B58B52] tracking-[0.3em] text-sm mb-6 transition-all duration-1000 ${
            visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            FINE ART PHOTOGRAPHY STUDIO
          </p>
          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 transition-all duration-1000 delay-200 ${
            visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Capturing Moments,<br />
            <span className="text-[#B58B52]">Creating Legacy</span>
          </h1>
          <p className={`text-[#737373] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
            visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Where artistic vision meets technical excellence. Every frame tells a story, 
            every image evokes emotion, every moment becomes timeless.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
            visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="group px-8 py-4 bg-[#B58B52] text-[#0D0D0D] font-medium tracking-wide rounded-full hover:bg-[#C9A066] transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="px-8 py-4 border border-[#737373] text-[#FAFAFA] font-medium tracking-wide rounded-full hover:border-[#B58B52] hover:text-[#B58B52] transition-all duration-300"
            >
              Book a Session
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#737373]" />
        </div>
      </section>

      {/* Featured Collections */}
      <section id="portfolio" className="py-24 lg:py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">CURATED WORK</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Featured Collections</h2>
            <p className="text-[#737373] max-w-2xl mx-auto leading-relaxed">
              A selection of our most celebrated work, showcasing the breadth of our artistic vision 
              and technical mastery across diverse genres.
            </p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#B58B52] text-[#0D0D0D]'
                    : 'bg-[#1A1A1A] text-[#737373] hover:text-[#FAFAFA] hover:bg-[#262626]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
            visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {filteredPortfolio.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                  item.size === 'large' ? 'md:col-span-2 lg:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/5] lg:aspect-auto lg:h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[#B58B52] text-sm tracking-wide mb-1">{item.category}</p>
                  <h3 className="font-serif text-xl">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 transition-all duration-700 delay-600 ${
            visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <button className="group px-8 py-4 border border-[#737373] text-[#FAFAFA] font-medium tracking-wide rounded-full hover:border-[#B58B52] hover:text-[#B58B52] transition-all duration-300 inline-flex items-center gap-2">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-8 bg-[#1A1A1A]" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">WHAT WE OFFER</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Photography Services</h2>
            <p className="text-[#737373] max-w-2xl mx-auto leading-relaxed">
              From intimate portraits to grand celebrations, we bring artistic excellence 
              and technical precision to every project.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${
            visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 bg-[#0D0D0D] rounded-2xl border border-[#262626] hover:border-[#B58B52]/50 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-6 h-6 text-[#0D0D0D]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl mb-3">{service.title}</h3>
                <p className="text-[#737373] leading-relaxed mb-4">{service.description}</p>
                <p className="text-[#B58B52] font-medium">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${
              visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554048612-387768052bf7?w=800&q=80"
                  alt="Photographer portrait"
                  className="rounded-2xl w-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] rounded-2xl -z-10" />
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${
              visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">THE ARTIST</p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Behind the Lens</h2>
              <p className="text-[#737373] leading-relaxed mb-6">
                With over 15 years of experience capturing life's most meaningful moments, 
                I believe that photography is more than just images—it's about preserving emotions, 
                telling stories, and creating visual legacies that transcend time.
              </p>
              <p className="text-[#737373] leading-relaxed mb-8">
                My approach combines classical composition techniques with contemporary aesthetics, 
                resulting in imagery that feels both timeless and fresh. Every session is a collaboration, 
                where we work together to bring your vision to life.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="font-serif text-3xl text-[#B58B52]">15+</p>
                  <p className="text-[#737373] text-sm">Years Experience</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-[#B58B52]">500+</p>
                  <p className="text-[#737373] text-sm">Projects Completed</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-[#B58B52]">50+</p>
                  <p className="text-[#737373] text-sm">Awards Won</p>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-[#B58B52] text-[#0D0D0D] font-medium tracking-wide rounded-full hover:bg-[#C9A066] transition-all duration-300 inline-flex items-center gap-2"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 px-6 lg:px-8 bg-[#1A1A1A]" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">CLIENT STORIES</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Words of Appreciation</h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${
            visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-8 bg-[#0D0D0D] rounded-2xl border border-[#262626]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="w-8 h-8 text-[#B58B52] mb-6 opacity-50" />
                <p className="text-[#FAFAFA] leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-[#737373] text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Publications */}
      <section className="py-24 lg:py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className={`transition-all duration-700 ${
              visibleSections.has('awards') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">RECOGNITION</p>
              <h2 className="font-serif text-4xl md:text-5xl mb-8">Awards & Honors</h2>
              <div className="space-y-6">
                {awards.map((award, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center flex-shrink-0">
                      <Award className="w-7 h-7 text-[#0D0D0D]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[#B58B52] font-medium">{award.year}</p>
                      <p className="font-serif text-xl">{award.title}</p>
                      <p className="text-[#737373]">{award.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${
              visibleSections.has('awards') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">FEATURED IN</p>
              <h2 className="font-serif text-4xl md:text-5xl mb-8">Publications</h2>
              <div className="grid grid-cols-2 gap-4">
                {publications.map((pub, index) => (
                  <div
                    key={pub}
                    className="p-6 bg-[#1A1A1A] rounded-xl text-center border border-[#262626] hover:border-[#B58B52]/50 transition-colors duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="font-serif text-lg">{pub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#1A1A1A]" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('bts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">THE PROCESS</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Behind the Scenes</h2>
            <p className="text-[#737373] max-w-2xl mx-auto leading-relaxed">
              A glimpse into our creative process, from concept development to final execution.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${
            visibleSections.has('bts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {[
              'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
              'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
              'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=600&q=80',
              'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=600&q=80',
            ].map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={image}
                  alt={`Behind the scenes ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[#B58B52]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 lg:py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('booking') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">RESERVE YOUR SESSION</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Book Your Experience</h2>
            <p className="text-[#737373] leading-relaxed">
              Ready to create something extraordinary? Let's discuss your vision and bring it to life.
            </p>
          </div>

          <div className={`bg-[#1A1A1A] rounded-3xl p-8 md:p-12 transition-all duration-700 delay-200 ${
            visibleSections.has('booking') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#737373] mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#262626] rounded-xl text-[#FAFAFA] focus:outline-none focus:border-[#B58B52] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#737373] mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#262626] rounded-xl text-[#FAFAFA] focus:outline-none focus:border-[#B58B52] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#737373] mb-2">Service Type</label>
                  <select className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#262626] rounded-xl text-[#FAFAFA] focus:outline-none focus:border-[#B58B52] transition-colors">
                    <option>Portrait Photography</option>
                    <option>Wedding & Events</option>
                    <option>Fashion & Editorial</option>
                    <option>Commercial Photography</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#737373] mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#262626] rounded-xl text-[#FAFAFA] focus:outline-none focus:border-[#B58B52] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#737373] mb-2">Tell Us About Your Project</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#262626] rounded-xl text-[#FAFAFA] focus:outline-none focus:border-[#B58B52] transition-colors resize-none"
                  placeholder="Share your vision, ideas, and any specific requirements..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#B58B52] text-[#0D0D0D] font-medium tracking-wide rounded-full hover:bg-[#C9A066] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Request Booking
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[#262626]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center gap-2 text-[#737373]">
                  <CheckCircle className="w-5 h-5 text-[#B58B52]" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#737373]">
                  <CheckCircle className="w-5 h-5 text-[#B58B52]" />
                  <span>Flexible Scheduling</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#737373]">
                  <CheckCircle className="w-5 h-5 text-[#B58B52]" />
                  <span>Custom Packages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-8 bg-[#1A1A1A]" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-[#B58B52] tracking-[0.2em] text-sm mb-4">GET IN TOUCH</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Let's Create Together</h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${
            visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="p-8 bg-[#0D0D0D] rounded-2xl text-center border border-[#262626]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#0D0D0D]" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-[#737373]">hello@lumiere.studio</p>
            </div>
            <div className="p-8 bg-[#0D0D0D] rounded-2xl text-center border border-[#262626]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#0D0D0D]" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium mb-2">Phone</h3>
              <p className="text-[#737373]">+1 (555) 123-4567</p>
            </div>
            <div className="p-8 bg-[#0D0D0D] rounded-2xl text-center border border-[#262626]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#0D0D0D]" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium mb-2">Studio</h3>
              <p className="text-[#737373]">New York, NY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B58B52] to-[#8B6B3D] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#0D0D0D]" strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif tracking-wide">LUMIÈRE</span>
              </div>
              <p className="text-[#737373] leading-relaxed max-w-sm">
                Fine art photography studio dedicated to capturing life's most meaningful moments 
                with artistic excellence and timeless elegance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Portfolio', 'Services', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-[#737373] hover:text-[#B58B52] transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#737373] hover:text-[#B58B52] hover:bg-[#262626] transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#737373] hover:text-[#B58B52] hover:bg-[#262626] transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#737373] hover:text-[#B58B52] hover:bg-[#262626] transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#737373] text-sm">
              © 2024 Lumière Studio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-[#737373]">
              <a href="#" className="hover:text-[#B58B52] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#B58B52] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
