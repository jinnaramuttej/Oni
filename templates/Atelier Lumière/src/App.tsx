import { useState, useEffect, useRef } from 'react';
import {
  ArrowDown, ArrowUpRight, Menu, X, Camera, Star,
  MapPin, Mail, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const collections = [
  {
    id: 'weddings',
    title: 'Eternal Moments',
    category: 'Wedding Photography',
    subtitle: 'Intimate ceremonies, raw emotion, timeless frames.',
    image: '/images/collection-weddings.jpg',
    span: 'row-span-2',
  },
  {
    id: 'landscape',
    title: 'The Horizon',
    category: 'Landscape',
    subtitle: 'Where light meets wilderness.',
    image: '/images/collection-landscape.jpg',
  },
  {
    id: 'portrait',
    title: 'Inner Light',
    category: 'Portrait',
    subtitle: 'The soul revealed through shadow and glow.',
    image: '/images/collection-portrait.jpg',
    span: 'col-span-2',
  },
];

const portfolio = [
  { id: 1, title: 'Noir Architecture', category: 'Architecture', image: '/images/portfolio-4.jpg', aspect: 'tall' },
  { id: 2, title: 'Golden Hour', category: 'Portrait', image: '/images/portfolio-2.jpg', aspect: 'wide' },
  { id: 3, title: 'The Atelier', category: 'Fashion', image: '/images/portfolio-1.jpg', aspect: 'tall' },
  { id: 4, title: 'Morning Ritual', category: 'Lifestyle', image: '/images/portfolio-3.jpg', aspect: 'wide' },
  { id: 5, title: 'Luxurium', category: 'Product', image: '/images/portfolio-5.jpg', aspect: 'tall' },
  { id: 6, title: 'Ethereal', category: 'Editorial', image: '/images/collection-portrait.jpg', aspect: 'square' },
];

const services = [
  {
    id: 1,
    title: 'Fine Art Portraits',
    description: 'Editorial-grade portraits that reveal the essence of your presence. Every frame is crafted with intention.',
    features: ['Studio & natural light', 'Art direction included', 'Retouching & color grading'],
    image: '/images/portfolio-2.jpg',
  },
  {
    id: 2,
    title: 'Wedding Stories',
    description: 'Full-day documentation that captures the soul of your celebration — from quiet anticipation to unfiltered joy.',
    features: ['Full-day coverage', 'Second photographer', 'Album design service'],
    image: '/images/collection-weddings.jpg',
  },
  {
    id: 3,
    title: 'Brand & Editorial',
    description: 'Visual narratives that elevate your brand identity. Cinematic lighting, artful composition, premium delivery.',
    features: ['Creative direction', 'Location scouting', 'Commercial licensing'],
    image: '/images/portfolio-1.jpg',
  },
];

const testimonials = [
  {
    id: 1,
    quote: 'Every image felt like a painting — there is a depth and emotional intelligence here that very few photographers possess.',
    author: 'Isabella Marchetti',
    role: 'Fashion Director, Vogue Italia',
  },
  {
    id: 2,
    quote: 'The studio did not just document our wedding — they discovered the poetry of it. The photographs are timeless art.',
    author: 'James & Claire Whitmore',
    role: 'Private Clients',
  },
  {
    id: 3,
    quote: 'Working with Atelier Lumière felt like collaborating with a museum curator. Each frame was deliberate, beautiful, and deeply considered.',
    author: 'Marcus Chen',
    role: 'Creative Director, Maison Noir',
  },
];

const awards = [
  { title: 'World Photography Awards — Gold', source: 'International Photography Association', year: '2024' },
  { title: 'Fine Art Portrait Series — Best in Show', source: 'LensCulture', year: '2024' },
  { title: 'Editorial Wedding Photography — Winner', source: 'Harper\'s Bazaar Wedding', year: '2023' },
  { title: 'Leica Master Photographer — Honoree', source: 'Leica Camera', year: '2023' },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Collections', href: '#collections' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#FAFAFA] overflow-x-hidden font-body selection:bg-[#B58B52]/25">
      {/* Film grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ---------------------------------- NAVIGATION ------------------ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto max-w-[92vw] md:max-w-[1400px] px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
          <a href="#" className="group flex items-center gap-3" aria-label="Atelier Lumière Home">
            <div className="w-10 h-10 rounded-full border border-[#B58B52]/40 flex items-center justify-center group-hover:border-[#B58B52] transition-colors">
              <Camera className="w-4 h-4 text-[#B58B52]" strokeWidth={1.2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-editorial text-xl md:text-2xl tracking-tight text-[#FAFAFA]">Atelier Lumière</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#737373] mt-0.5">Fine Art Photography</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.18em] text-[#A8A8A8] hover:text-[#FAFAFA] transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#B58B52]/60 group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] bg-[#B58B52]/10 border border-[#B58B52]/25 text-[#B58B52] hover:bg-[#B58B52]/20 hover:border-[#B58B52]/40 px-6 py-3 rounded-[18px] transition-all duration-300 font-medium"
          >
            Book a Session
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#FAFAFA] p-2 -mr-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X strokeWidth={1.2} /> : <Menu strokeWidth={1.2} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-[#0D0D0D]/98 backdrop-blur-xl border-t border-white/[0.05]"
            >
              <div className="flex flex-col px-8 py-8 gap-6">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-editorial text-2xl text-[#FAFAFA]/90 hover:text-[#B58B52] transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 text-[11px] uppercase tracking-[0.2em] border border-[#B58B52]/40 text-[#B58B52] px-6 py-3 rounded-[18px] text-center">
                  Book a Session
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------------------------------- HERO ---------------------- */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        aria-label="Hero"
      >
        <img
          src="/images/hero.jpg"
          alt="Photographer standing on a mist-covered hill at dawn"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] animate-[scaleIn_1.8s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#0D0D0D]/20 to-[#0D0D0D]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/40" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-28 md:pb-36 px-6 md:px-10 md:px-16 max-w-[92vw] md:max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#B58B52] mb-6 font-medium">
              Fine Art Photography Studio
            </p>
            <h1 className="font-editorial text-[clamp(3rem,10vw,9rem)] leading-[0.88] tracking-[-0.04em] text-[#FAFAFA] mb-8">
              <span className="italic font-light">Light</span>, <span className="italic font-light">Memory</span> & <span className="italic font-light">Form</span>
            </h1>
            <p className="text-[#A8A8A8] text-base md:text-xl leading-[1.7] max-w-xl mb-10 font-light tracking-tight">
              Where imagery transcends documentation. A studio devoted to the craft of visual storytelling — intimate, cinematic, and profoundly human.
            </p>
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] bg-[#FAFAFA] text-[#0D0D0D] hover:bg-[#B58B52] px-8 py-4 rounded-[18px] transition-all duration-500 font-medium shadow-[0_8px_30px_rgba(181,139,82,0.15)] hover:shadow-[0_12px_40px_rgba(181,139,82,0.25)]"
              >
                View Portfolio
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#FAFAFA] hover:text-[#B58B52] border border-white/15 hover:border-[#B58B52]/30 px-8 py-4 rounded-[18px] transition-all duration-400"
              >
                Book a Session
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#collections"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#737373] hover:text-[#FAFAFA] transition-colors duration-300"
          aria-label="Scroll to collections"
        >
          <span>Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" strokeWidth={1} />
          </motion.div>
        </a>
      </section>

      {/* Thin divider */}
      <div className="divider-thin max-w-[92vw] mx-auto" />

      {/* ---------------------------------- FEATURED COLLECTIONS ------- */}
      <section id="collections" className="relative px-6 md:px-10 md:px-16 pt-28 md:pt-36 pb-24 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Featured collections">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-3 font-medium">Curated Works</p>
            <h2 className="font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#FAFAFA]">Featured <span className="italic font-light">Collections</span></h2>
          </div>
          <a href="#portfolio" className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#FAFAFA] transition-colors self-start md:self-auto">
            Full Portfolio <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[420px] md:auto-rows-[520px]">
          {collections.map((c, i) => (
            <motion.a
              href="#portfolio"
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-[20px] group ${c.span || ''}`}
              aria-label={`Collection: ${c.title}`}
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-[#0D0D0D]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#B58B52] mb-2">{c.category}</p>
                <h3 className="font-editorial text-3xl md:text-4xl text-[#FAFAFA] mb-2 tracking-tight">{c.title}</h3>
                <p className="text-sm text-[#A8A8A8] max-w-xs leading-relaxed">{c.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <div className="divider-thin max-w-[92vw] mx-auto" />

      {/* ---------------------------------- PORTFOLIO GALLERY --------- */}
      <section id="portfolio" className="relative px-6 md:px-10 md:px-16 pt-28 md:pt-36 pb-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Portfolio">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-4 font-medium">Selected Works</p>
          <h2 className="font-editorial text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.035em] text-[#FAFAFA] mb-6">The <span className="italic font-light">Portfolio</span></h2>
          <p className="text-[#737373] text-base md:text-lg leading-relaxed font-light">A selection of editorial, portrait, and commercial works. Each story told with light, intention, and respect for the subject.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {portfolio.map((item) => (
            <a
              href="#contact"
              key={item.id}
              className="break-inside-avoid group relative overflow-hidden rounded-[20px] bg-[#1A1A1A] block"
              aria-label={`Portfolio: ${item.title}`}
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-[#0D0D0D]/85 via-[#0D0D0D]/30 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#B58B52] mb-1">{item.category}</p>
                <h3 className="font-editorial text-xl md:text-2xl text-[#FAFAFA] tracking-tight">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="divider-thin max-w-[92vw] mx-auto" />

      {/* ---------------------------------- SERVICES ------------------ */}
      <section id="services" className="relative px-6 md:px-10 md:px-16 pt-28 md:pt-36 pb-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Services">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-3 font-medium">What We Offer</p>
            <h2 className="font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#FAFAFA]">Photography <span className="italic font-light">Services</span></h2>
          </div>
          <p className="text-[#737373] text-sm md:text-base leading-relaxed max-w-md">Every service includes pre-consultation, art direction, premium retouching, and archival digital delivery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[20px] bg-[#1A1A1A] border border-white/[0.05] hover:border-[#B58B52]/20 transition-all duration-500"
            >
              <div className="h-72 md:h-80 overflow-hidden">
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-editorial text-2xl md:text-3xl text-[#FAFAFA] mb-4 tracking-tight">{s.title}</h3>
                <p className="text-[#A8A8A8] text-sm leading-[1.75] mb-6">{s.description}</p>
                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#737373]">
                      <span className="w-1 h-1 rounded-full bg-[#B58B52]/60 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------------------------- ABOUT -------------------- */}
      <section id="about" className="relative px-6 md:px-10 md:px-16 pt-8 md:pt-12 pb-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="About the photographer">
        <div className="divider-thin max-w-[92vw] mx-auto mb-0" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-28 md:pt-36">
          <div className="relative">
            <img
              src="/images/photographer.jpg"
              alt="Photographer in the studio"
              loading="lazy"
              className="w-full h-[520px] md:h-[640px] object-cover rounded-[20px] shadow-2xl shadow-black/40"
            />
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-[#1A1A1A] border border-white/[0.06] rounded-[20px] p-6 md:p-8 shadow-2xl shadow-black/60 max-w-[280px]">
              <blockquote className="font-editorial text-xl md:text-2xl leading-[1.3] text-[#FAFAFA] mb-4 italic">
                "The camera is not the instrument that captures light — it is the tool of your vision."
              </blockquote>
              <cite className="text-[10px] uppercase tracking-[0.2em] text-[#737373] not-italic">Isabella Marchetti</cite>
            </div>
          </div>

          <div className="lg:pl-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-3 font-medium">The Artist</p>
            <h2 className="font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#FAFAFA] mb-8">Elena <span className="italic font-light">Voss</span></h2>
            <div className="space-y-5 text-[#A8A8A8] text-[15px] leading-[1.8] font-light tracking-tight">
              <p>Elena Voss is an award-winning photographer whose work spans editorial, fine art portraiture, and documentary storytelling. Her studio — Atelier Lumière — was founded on a single conviction: that photography is not merely visual documentation, but an act of emotional preservation.</p>
              <p>Over fifteen years, her images have appeared in Vogue Italia, Harper's Bazaar, Leica Magazine, and the permanent collections of the International Photography Foundation. Her approach combines classical art direction with a modern understanding of light, texture, and narrative.</p>
              <p>Every session is a collaboration. Elena does not simply take photographs — she creates environments where authenticity can unfold. The result is an archive of images that feel as alive in twenty years as they do today.</p>
            </div>
            <div className="mt-10 flex items-center gap-8 md:gap-10">
              <div className="text-center">
                <span className="font-editorial text-3xl md:text-4xl text-[#B58B52]">15+</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#737373] mt-1">Years</p>
              </div>
              <div className="w-px h-10 bg-white/[0.1]" />
              <div className="text-center">
                <span className="font-editorial text-3xl md:text-4xl text-[#B58B52]">200+</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#737373] mt-1">Stories</p>
              </div>
              <div className="w-px h-10 bg-white/[0.1]" />
              <div className="text-center">
                <span className="font-editorial text-3xl md:text-4xl text-[#B58B52]">8</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#737373] mt-1">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-thin max-w-[92vw] mx-auto" />

      {/* ---------------------------------- TESTIMONIALS --------------- */}
      <section className="relative px-6 md:px-10 md:px-16 pt-28 md:pt-36 pb-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Client testimonials">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-3 font-medium">Client Words</p>
          <h2 className="font-editorial text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-[#FAFAFA]">What They <span className="italic font-light">Say</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1A1A1A] border border-white/[0.05] rounded-[20px] p-8 md:p-10 hover:border-[#B58B52]/15 transition-all duration-500 relative overflow-hidden"
            >
              <div className="text-6xl font-editorial text-[#B58B52]/15 leading-none mb-6 select-none">"</div>
              <p className="text-[#FAFAFA]/85 text-base md:text-lg leading-[1.75] mb-8 font-light tracking-tight">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B58B52]/15 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-[#B58B52]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[13px] text-[#FAFAFA] font-medium tracking-tight">{t.author}</p>
                  <p className="text-[11px] text-[#737373]">{t.role}</p>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* ---------------------------------- AWARDS ------------------- */}
      <section className="relative px-6 md:px-10 md:px-16 py-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Awards and publications">
        <div className="divider-thin max-w-[92vw] mx-auto mb-0" />
        <div className="pt-28 md:pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-3 font-medium">Recognition</p>
            <h2 className="font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#FAFAFA] mb-8">Awards & <span className="italic font-light">Publications</span></h2>
            <p className="text-[#A8A8A8] text-base md:text-lg leading-[1.8] font-light tracking-tight max-w-md">
              These honors reflect years of dedicated craft. Every image is a conversation between vision and discipline.
            </p>
          </div>
          <div className="space-y-0">
            {awards.map((a) => (
              <a
                key={a.title}
                href="#"
                className="group flex items-start justify-between gap-6 py-6 border-b border-white/[0.06] hover:border-[#B58B52]/30 transition-colors"
              >
                <div>
                  <h3 className="font-editorial text-xl md:text-2xl text-[#FAFAFA] mb-1 group-hover:text-[#B58B52] transition-colors tracking-tight">{a.title}</h3>
                  <p className="text-[12px] text-[#737373]">{a.source}</p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-[11px] text-[#B58B52] uppercase tracking-[0.15em]">{a.year}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#A8A8A8]/40 group-hover:text-[#B58B52] transition-colors" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-thin max-w-[92vw] mx-auto" />

      {/* ---------------------------------- BEHIND THE SCENES ---------- */}
      <section id="behind" className="relative px-6 md:px-10 md:px-16 pt-28 md:pt-36 pb-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Behind the scenes">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 relative overflow-hidden rounded-[20px] h-[480px] md:h-[600px]">
            <img
              src="/images/featured-editorial.jpg"
              alt="Behind the scenes in the studio"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 to-transparent" />
          </div>
          <div className="lg:col-span-5 bg-[#1A1A1A] border border-white/[0.05] rounded-[20px] p-8 md:p-12 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-4 font-medium">Process</p>
            <h2 className="font-editorial text-[clamp(2rem,4.5vw,3.2rem)] leading-[0.95] tracking-[-0.03em] text-[#FAFAFA] mb-8">Behind <span className="italic font-light">The Lens</span></h2>
            <div className="space-y-6 text-[#A8A8A8] text-sm md:text-base leading-[1.8] font-light tracking-tight">
              <p>Every session begins with conversation — understanding not just what you want to see, but how you want to feel. Then we design light, space, and mood together.</p>
              <p>From pre-shoot art direction to post-production, every decision is guided by the story we are telling. The studio is a space of collaboration, not command.</p>
            </div>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#B58B52] hover:text-[#FAFAFA] transition-colors group">
              Start Your Story
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------- BOOKING ------------------ */}
      <section id="contact" className="relative px-6 md:px-10 md:px-16 pt-8 pb-28 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Booking">
        <div className="divider-thin max-w-[92vw] mx-auto mb-0" />
        <div className="pt-28 md:pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B58B52] mb-3 font-medium">Booking</p>
            <h2 className="font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#FAFAFA] mb-8">Begin Your <span className="italic font-light">Story</span></h2>
            <p className="text-[#A8A8A8] text-base md:text-lg leading-[1.8] font-light tracking-tight mb-10 max-w-md">
              Sessions are limited each month to ensure every client receives the full depth of attention and craft they deserve.
            </p>

            <div className="space-y-6">
              <a href="#" className="flex items-center gap-5 group" aria-label="Email studio">
                <div className="w-12 h-12 rounded-[16px] bg-[#1A1A1A] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:border-[#B58B52]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#B58B52]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-0.5">Email</p>
                  <p className="text-[#FAFAFA] text-sm tracking-tight group-hover:text-[#B58B52] transition-colors">hello@atelierlumiere.com</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-5 group" aria-label="Call studio">
                <div className="w-12 h-12 rounded-[16px] bg-[#1A1A1A] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:border-[#B58B52]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#B58B52]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-0.5">Phone</p>
                  <p className="text-[#FAFAFA] text-sm tracking-tight group-hover:text-[#B58B52] transition-colors">+1 (212) 884-7392</p>
                </div>
              </a>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-[16px] bg-[#1A1A1A] border border-white/[0.05] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#B58B52]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#737373] mb-0.5">Studio</p>
                  <p className="text-[#FAFAFA] text-sm tracking-tight">NoHo, New York</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="bg-[#1A1A1A] border border-white/[0.06] rounded-[20px] p-8 md:p-10 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you. Your inquiry has been received. We will reach out within 24 hours.');
            }}
            aria-label="Booking inquiry form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2.5">Name</label>
                <input id="name" type="text" required placeholder="Your name" className="w-full bg-[#0D0D0D] border border-white/[0.08] rounded-[14px] px-5 py-3.5 text-sm text-[#FAFAFA] placeholder:text-[#737373]/50 focus:outline-none focus:border-[#B58B52]/30 focus:ring-1 focus:ring-[#B58B52]/20 transition-all" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2.5">Email</label>
                <input id="email" type="email" required placeholder="you@email.com" className="w-full bg-[#0D0D0D] border border-white/[0.08] rounded-[14px] px-5 py-3.5 text-sm text-[#FAFAFA] placeholder:text-[#737373]/50 focus:outline-none focus:border-[#B58B52]/30 focus:ring-1 focus:ring-[#B58B52]/20 transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="service" className="block text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2.5">Service</label>
              <select id="service" required className="w-full bg-[#0D0D0D] border border-white/[0.08] rounded-[14px] px-5 py-3.5 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#B58B52]/30 focus:ring-1 focus:ring-[#B58B52]/20 transition-all appearance-none cursor-pointer">
                <option value="">Select a service</option>
                <option>Fine Art Portraits</option>
                <option>Wedding Stories</option>
                <option>Brand & Editorial</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2.5">Your Vision</label>
              <textarea id="message" rows={4} required placeholder="Tell us about your story..." className="w-full bg-[#0D0D0D] border border-white/[0.08] rounded-[14px] px-5 py-3.5 text-sm text-[#FAFAFA] placeholder:text-[#737373]/50 focus:outline-none focus:border-[#B58B52]/30 focus:ring-1 focus:ring-[#B58B52]/20 transition-all resize-none" />
            </div>
            <button
              type="submit"
              className="w-full bg-[#B58B52]/10 border border-[#B58B52]/30 text-[#B58B52] hover:bg-[#B58B52]/20 hover:border-[#B58B52]/50 px-8 py-4 rounded-[18px] transition-all duration-400 text-[11px] uppercase tracking-[0.2em] font-medium"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* ---------------------------------- FOOTER ------------------- */}
      <footer className="relative border-t border-white/[0.06] px-6 md:px-10 md:px-16 pt-16 pb-8 max-w-[92vw] md:max-w-[1400px] mx-auto" aria-label="Footer">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">
          <div className="lg:col-span-2">
            <a href="#" className="group flex items-center gap-3 mb-6" aria-label="Atelier Lumière Home">
              <div className="w-10 h-10 rounded-full border border-[#B58B52]/40 flex items-center justify-center group-hover:border-[#B58B52] transition-colors">
                <Camera className="w-4 h-4 text-[#B58B52]" strokeWidth={1.2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-editorial text-xl tracking-tight text-[#FAFAFA]">Atelier Lumière</span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#737373] mt-0.5">Fine Art Photography</span>
              </div>
            </a>
            <p className="text-[#737373] text-sm leading-[1.8] max-w-sm font-light tracking-tight">
              A studio dedicated to the art of visual storytelling. Crafting imagery that endures — intimate, elegant, and profoundly human.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#737373] mb-5 font-medium">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="text-sm text-[#A8A8A8] hover:text-[#FAFAFA] transition-colors tracking-tight">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#737373] mb-5 font-medium">Social</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-[#A8A8A8] hover:text-[#FAFAFA] transition-colors tracking-tight">Instagram</a></li>
              <li><a href="#" className="text-sm text-[#A8A8A8] hover:text-[#FAFAFA] transition-colors tracking-tight">Pinterest</a></li>
              <li><a href="#" className="text-sm text-[#A8A8A8] hover:text-[#FAFAFA] transition-colors tracking-tight">Behance</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-[10px] text-[#737373]/60 tracking-wide">© 2025 Atelier Lumière. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-[#737373]/60 hover:text-[#FAFAFA] transition-colors tracking-wide">Privacy</a>
            <a href="#" className="text-[10px] text-[#737373]/60 hover:text-[#FAFAFA] transition-colors tracking-wide">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
